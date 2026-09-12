import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AiRequestBody = {
  message?: unknown;
  liveResearch?: unknown;
};

function cleanText(value: unknown, maxLength = 3500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function cleanBoolean(value: unknown) {
  return value === true;
}

function extractAnswer(result: any) {
  if (
    typeof result?.output_text === "string" &&
    result.output_text.trim()
  ) {
    return result.output_text.trim();
  }

  let answer = "";

  if (Array.isArray(result?.output)) {
    for (const item of result.output) {
      if (!Array.isArray(item?.content)) continue;

      for (const content of item.content) {
        if (
          content?.type === "output_text" &&
          typeof content?.text === "string"
        ) {
          answer += content.text;
        }
      }
    }
  }

  return answer.trim();
}

function extractResearchSources(result: any) {
  const sources: Array<{
    title: string;
    url: string;
  }> = [];

  const seen = new Set<string>();

  if (!Array.isArray(result?.output)) {
    return sources;
  }

  for (const item of result.output) {
    if (item?.type !== "web_search_call") continue;

    const sourceList =
      Array.isArray(item?.action?.sources)
        ? item.action.sources
        : [];

    for (const source of sourceList) {
      const url =
        typeof source?.url === "string"
          ? source.url
          : "";

      if (!url || seen.has(url)) continue;

      seen.add(url);

      sources.push({
        title:
          typeof source?.title === "string"
            ? source.title
            : url,
        url,
      });

      if (sources.length >= 5) {
        return sources;
      }
    }
  }

  return sources;
}

export async function POST(request: Request) {
  try {
    const apiKey =
      process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "AI Trip Planner is not connected yet. OPENAI_API_KEY is missing.",
        },
        { status: 503 }
      );
    }

    let body: AiRequestBody;

    try {
      body =
        (await request.json()) as AiRequestBody;
    } catch {
      return NextResponse.json(
        {
          error:
            "Invalid AI request.",
        },
        { status: 400 }
      );
    }

    const message = cleanText(
      body.message,
      3500
    );

    const liveResearch =
      cleanBoolean(body.liveResearch);

    if (!message) {
      return NextResponse.json(
        {
          error:
            "Please tell the AI Trip Planner what kind of Himalayan journey you want.",
        },
        { status: 400 }
      );
    }

    const instructions = `
You are Himalayan26 AI Trip Planner.

You plan journeys in Nepal, Bhutan, Tibet and the Indian Himalaya.

Known Himalayan26 tours:
- Everest Base Camp — Nepal — 14 days — Challenging
- Annapurna Classic — Nepal — 10 days — Moderate
- Langtang Valley — Nepal — 8 days — Moderate
- Manaslu Circuit — Nepal — 15 days — Challenging
- Upper Mustang — Nepal — 11 days — Moderate
- Bhutan Mountain & Culture — Bhutan — 9 days — Easy–Moderate
- Tibet High Plateau — Tibet — 12 days — Moderate
- Ladakh High Altitude — India — 10 days — Moderate
- Kailash Mansarovar Journey — Tibet — 15 days — Moderate

Be concise and practical.

When live research is enabled:
- research only information directly relevant to the request
- prioritize official or authoritative sources
- check permits, entry rules, current travel updates, and conditions only when relevant
- do not perform broad background research
- do not repeat the same fact from multiple sources
- never invent current conditions

Use this structure:

## Recommended journey

## Suggested itinerary

Use a short Markdown table.

## Current permits and travel rules

## Conditions and important updates

## Safety and altitude

## Next step

Keep the whole answer compact.
`;

    const input = liveResearch
      ? `
LIVE RESEARCH IS ENABLED.

Research only the most important current information needed for this request.

Traveler request:
${message}
`
      : `
LIVE RESEARCH IS DISABLED.

Traveler request:
${message}
`;

    const requestBody: Record<
      string,
      unknown
    > = {
      model: "gpt-5.6-luna",
      instructions,
      input,
      max_output_tokens: 850,
    };

    if (liveResearch) {
      requestBody.tools = [
        {
          type: "web_search",
          search_context_size: "low",
        },
      ];
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          requestBody
        ),
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      console.error(
        "OpenAI API error:",
        result
      );

      const errorMessage =
        result?.error?.message ||
        "The AI Trip Planner could not respond right now.";

      if (
        response.status === 429 ||
        errorMessage
          .toLowerCase()
          .includes("rate limit")
      ) {
        return NextResponse.json(
          {
            error:
              "Live research is temporarily busy. Please wait a moment and try again.",
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: errorMessage,
        },
        {
          status:
            response.status >= 400
              ? response.status
              : 500,
        }
      );
    }

    const answer =
      extractAnswer(result);

    if (!answer) {
      return NextResponse.json(
        {
          error:
            "The AI Trip Planner returned an empty response.",
        },
        { status: 502 }
      );
    }

    const sources =
      liveResearch
        ? extractResearchSources(result)
        : [];

    return NextResponse.json({
      ok: true,
      answer,
      liveResearch,
      sources,
    });
  } catch (error) {
    console.error(
      "AI route error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong with the AI Trip Planner.",
      },
      { status: 500 }
    );
  }
}

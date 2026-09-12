import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AiRequestBody = {
  message?: unknown;
  liveResearch?: unknown;
};

function cleanText(
  value: unknown,
  maxLength = 5000
) {
  if (typeof value !== "string") {
    return "";
  }

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
      if (!Array.isArray(item?.content)) {
        continue;
      }

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
    if (
      item?.type !== "web_search_call"
    ) {
      continue;
    }

    const action = item?.action;

    if (
      Array.isArray(action?.sources)
    ) {
      for (const source of action.sources) {
        const url =
          typeof source?.url === "string"
            ? source.url
            : "";

        if (!url || seen.has(url)) {
          continue;
        }

        seen.add(url);

        sources.push({
          title:
            typeof source?.title === "string"
              ? source.title
              : url,
          url,
        });
      }
    }
  }

  return sources.slice(0, 8);
}

export async function POST(
  request: Request
) {
  try {
    const apiKey =
      process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "AI Trip Planner is not connected yet. OPENAI_API_KEY is missing.",
        },
        {
          status: 503,
        }
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
        {
          status: 400,
        }
      );
    }

    const message = cleanText(
      body.message,
      5000
    );

    const liveResearch =
      cleanBoolean(body.liveResearch);

    if (!message) {
      return NextResponse.json(
        {
          error:
            "Please tell the AI Trip Planner what kind of Himalayan journey you want.",
        },
        {
          status: 400,
        }
      );
    }

    const currentDate =
      new Date().toISOString();

    const instructions = `
You are Himalayan26 AI Trip Planner and Himalayan travel research assistant.

Current server date:
${currentDate}

You specialize in:
- Nepal
- Bhutan
- Tibet
- Indian Himalaya

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

Your job is to create useful, professional Himalayan travel plans.

When LIVE WEB RESEARCH is enabled:
- Search the web for information that could have changed.
- Prioritize official government, tourism authority, park, embassy, weather, transportation, and other authoritative sources.
- Research relevant current travel advisories.
- Research entry or visa information when relevant.
- Research permits and trekking regulations when relevant.
- Research trail, road, border, airport, or transportation conditions when relevant.
- Research current or recent weather information when useful.
- Clearly distinguish confirmed current information from general planning advice.
- Never claim something is current unless web research supports it.
- Do not invent permit prices, closures, entry rules, weather, or availability.
- Mention dates for time-sensitive information whenever possible.

When LIVE WEB RESEARCH is disabled:
- Do not claim that information is live or current.
- Clearly explain when changing rules or conditions should be checked before travel.

Output style:
- professional
- clear
- concise but useful
- easy for travelers to scan
- no hype
- no fake certainty

Use this structure when appropriate:

## Recommended journey

A short personalized recommendation.

## Why this trip fits

- bullet points

## Suggested itinerary

Use a Markdown table when helpful:

| Day | Plan |
|---|---|
| 1 | ... |

## Best season and conditions

Include current findings only if live research supports them.

## Permits, entry and regulations

State clearly what must still be verified.

## Safety and altitude

Include proper acclimatization guidance.
Do not provide medical diagnosis.

## Current travel updates

Only include this section when live research is enabled.

## Next step

Encourage the traveler to explore the matching Himalayan26 tour or submit a booking request.

Important:
- Never pretend Himalayan26 has confirmed availability unless it actually has.
- Never fabricate prices.
- Existing listed Himalayan26 tour prices may be treated as website reference prices only if provided in the website context.
- Government requirements, permits, border restrictions, weather, flight conditions, and trail conditions can change.
`;

    const input = liveResearch
      ? `
LIVE WEB RESEARCH: ENABLED.

Use web search for current information relevant to this request.

Traveler request:
${message}
`
      : `
LIVE WEB RESEARCH: DISABLED.

Answer from general planning knowledge only and clearly flag anything time-sensitive for verification.

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
      max_output_tokens: 1800,
    };

    if (liveResearch) {
      requestBody.tools = [
        {
          type: "web_search",
          search_context_size: "medium",
        },
      ];
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          Authorization:
            `Bearer ${apiKey}`,
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

      return NextResponse.json(
        {
          error:
            result?.error?.message ||
            "The AI Trip Planner could not respond right now.",
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
        {
          status: 502,
        }
      );
    }

    const sources =
      liveResearch
        ? extractResearchSources(
            result
          )
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
      {
        status: 500,
      }
    );
  }
}

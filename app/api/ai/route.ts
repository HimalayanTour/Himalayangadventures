import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

type AiRequestBody = {
  message?: unknown;
  liveResearch?: unknown;
};

type ResearchSource = {
  title: string;
  url: string;
};

function cleanText(value: unknown, maxLength = 2000) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function extractAnswer(result: any) {
  if (
    typeof result?.output_text === "string" &&
    result.output_text.trim()
  ) {
    return result.output_text.trim();
  }

  if (!Array.isArray(result?.output)) {
    return "";
  }

  let answer = "";

  for (const item of result.output) {
    if (!Array.isArray(item?.content)) {
      continue;
    }

    for (const content of item.content) {
      if (
        content?.type === "output_text" &&
        typeof content?.text === "string"
      ) {
        answer += `${content.text}\n`;
      }
    }
  }

  return answer.trim();
}

function extractSources(result: any): ResearchSource[] {
  const sources: ResearchSource[] = [];
  const seen = new Set<string>();

  function addSource(url: unknown, title: unknown) {
    if (
      typeof url !== "string" ||
      !url.startsWith("http") ||
      seen.has(url)
    ) {
      return;
    }

    seen.add(url);

    sources.push({
      url,
      title:
        typeof title === "string" && title.trim()
          ? title.trim()
          : url,
    });
  }

  if (!Array.isArray(result?.output)) {
    return sources;
  }

  for (const item of result.output) {
    if (
      item?.type === "web_search_call" &&
      Array.isArray(item?.action?.sources)
    ) {
      for (const source of item.action.sources) {
        addSource(source?.url, source?.title);
      }
    }

    if (!Array.isArray(item?.content)) {
      continue;
    }

    for (const content of item.content) {
      if (!Array.isArray(content?.annotations)) {
        continue;
      }

      for (const annotation of content.annotations) {
        if (annotation?.type === "url_citation") {
          addSource(
            annotation?.url,
            annotation?.title
          );
        }
      }
    }
  }

  return sources.slice(0, 5);
}

async function callOpenAI(
  apiKey: string,
  body: Record<string, unknown>
) {
  const response = await fetch(
    "https://api.openai.com/v1/responses",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    }
  );

  let result: any = null;

  try {
    result = await response.json();
  } catch {
    result = {};
  }

  return {
    response,
    result,
  };
}

function getApiError(
  response: Response,
  result: any
) {
  const rawMessage =
    result?.error?.message ||
    "The AI Trip Planner could not respond.";

  if (
    response.status === 429 ||
    rawMessage.toLowerCase().includes("rate limit")
  ) {
    return {
      status: 429,
      message:
        "Live research reached the API rate limit. Please try again later or turn off Live Research.",
    };
  }

  return {
    status:
      response.status >= 400
        ? response.status
        : 500,
    message: rawMessage,
  };
}

const normalInstructions = `
You are Himalayan26 AI Trip Planner.

Recommend Himalayan journeys in Nepal, Bhutan, Tibet and the Indian Himalaya.

Available Himalayan26 tours:
- Everest Base Camp — Nepal — 14 days — Challenging
- Annapurna Classic — Nepal — 10 days — Moderate
- Langtang Valley — Nepal — 8 days — Moderate
- Manaslu Circuit — Nepal — 15 days — Challenging
- Upper Mustang — Nepal — 11 days — Moderate
- Bhutan Mountain & Culture — Bhutan — 9 days — Easy–Moderate
- Tibet High Plateau — Tibet — 12 days — Moderate
- Ladakh High Altitude — India — 10 days — Moderate
- Kailash Mansarovar Journey — Tibet — 15 days — Moderate

Be professional, concise, practical and safety-conscious.

Use this structure:

## Recommended journey

## Suggested itinerary

| Day | Plan |
|---|---|

## Safety and altitude

## Next step
`;

const researchInstructions = `
You are Himalayan26 AI Trip Planner.

Create a concise Himalayan travel plan.

Use web search ONLY for current facts that may change, such as:
- entry or visa rules
- trekking permits
- official access restrictions
- important current travel conditions

Prefer official government, embassy, tourism authority and national park sources.

Do not search for general inspiration or basic itinerary information.

Do not invent current information.
If a current fact cannot be verified, clearly say it must be rechecked.

Himalayan26 tours:
Everest Base Camp, Annapurna Classic, Langtang Valley, Manaslu Circuit,
Upper Mustang, Bhutan Mountain & Culture, Tibet High Plateau,
Ladakh High Altitude, Kailash Mansarovar Journey.

Keep the answer compact.

Use:

## Recommended journey

## Suggested itinerary

| Day | Plan |
|---|---|

## Current permits and travel rules

## Conditions and important updates

## Safety and altitude

## Next step
`;

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "OPENAI_API_KEY is missing.",
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
          error: "Invalid AI request.",
        },
        {
          status: 400,
        }
      );
    }

    const message = cleanText(body.message);
    const liveResearch =
      body.liveResearch === true;

    if (!message) {
      return NextResponse.json(
        {
          error:
            "Please describe the Himalayan journey you want.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------
    // NORMAL AI
    // --------------------------------

    if (!liveResearch) {
      const ai = await callOpenAI(
        apiKey,
        {
          model: "gpt-5.6-luna",

          reasoning: {
            effort: "none",
          },

          instructions:
            normalInstructions,

          input: message,

          max_output_tokens: 1200,
        }
      );

      if (!ai.response.ok) {
        console.error(
          "OpenAI normal request failed:",
          ai.result
        );

        const error = getApiError(
          ai.response,
          ai.result
        );

        return NextResponse.json(
          {
            error: error.message,
          },
          {
            status: error.status,
          }
        );
      }

      const answer =
        extractAnswer(ai.result);

      if (!answer) {
        return NextResponse.json(
          {
            error:
              "The AI could not create a trip plan. Please try again.",
          },
          {
            status: 502,
          }
        );
      }

      return NextResponse.json({
        ok: true,
        answer,
        liveResearch: false,
        sources: [],
      });
    }

    // --------------------------------
    // LIVE RESEARCH
    // ONE WEB SEARCH CALL MAXIMUM
    // --------------------------------

    const research = await callOpenAI(
      apiKey,
      {
        model: "gpt-5.6-luna",

        reasoning: {
          effort: "none",
        },

        instructions:
          researchInstructions,

        input: message,

        tools: [
          {
            type: "web_search",
            search_context_size: "low",
          },
        ],

        tool_choice: "auto",

        max_tool_calls: 1,

        include: [
          "web_search_call.action.sources",
        ],

        max_output_tokens: 1400,
      }
    );

    if (!research.response.ok) {
      console.error(
        "OpenAI live research failed:",
        research.result
      );

      const error = getApiError(
        research.response,
        research.result
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: error.status,
        }
      );
    }

    const answer =
      extractAnswer(research.result);

    const sources =
      extractSources(research.result);

    if (!answer) {
      console.error(
        "Live research returned no final text:",
        {
          status:
            research.result?.status,
          incompleteReason:
            research.result
              ?.incomplete_details
              ?.reason || null,
          outputTypes:
            Array.isArray(
              research.result?.output
            )
              ? research.result.output.map(
                  (item: any) =>
                    item?.type
                )
              : [],
        }
      );

      return NextResponse.json(
        {
          error:
            "Live research could not finish the trip plan. Please try again or turn off Live Research.",
        },
        {
          status: 502,
        }
      );
    }

    return NextResponse.json({
      ok: true,
      answer,
      liveResearch: true,
      sources,
    });
  } catch (error) {
    console.error(
      "AI route unexpected error:",
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

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
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function extractAnswer(result: any) {
  if (
    typeof result?.output_text === "string" &&
    result.output_text.trim()
  ) {
    return result.output_text.trim();
  }

  if (!Array.isArray(result?.output)) return "";

  let answer = "";

  for (const item of result.output) {
    if (!Array.isArray(item?.content)) continue;

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

    if (!Array.isArray(item?.content)) continue;

    for (const content of item.content) {
      if (!Array.isArray(content?.annotations)) continue;

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

  let result: any = {};

  try {
    result = await response.json();
  } catch {
    result = {};
  }

  return { response, result };
}

const plannerInstructions = `
You are Himalayan26 AI Trip Planner.

You create professional Himalayan journeys for:
- Nepal
- Bhutan
- Tibet
- Indian Himalaya

Himalayan26 tours:
- Everest Base Camp — Nepal — 14 days — Challenging
- Annapurna Classic — Nepal — 10 days — Moderate
- Langtang Valley — Nepal — 8 days — Moderate
- Manaslu Circuit — Nepal — 15 days — Challenging
- Upper Mustang — Nepal — 11 days — Moderate
- Bhutan Mountain & Culture — Bhutan — 9 days — Easy–Moderate
- Tibet High Plateau — Tibet — 12 days — Moderate
- Ladakh High Altitude — India — 10 days — Moderate
- Kailash Mansarovar Journey — Tibet — 15 days — Moderate

Be concise, professional, practical and safety-conscious.

Never present potentially changing visa, permit, border,
weather or access information as currently verified unless
live research was actually performed.

Use:

## Recommended journey

## Suggested itinerary

| Day | Plan |
|---|---|

## Travel requirements

## Safety and altitude

## Next step
`;

const researchInstructions = `
You are Himalayan26 AI Trip Planner.

Create a concise Himalayan trip plan.

Use web search only for current facts that can change:
entry rules, permits, official restrictions and important
current travel conditions.

Prefer official government, embassy, tourism authority
and national park sources.

Do not invent current information.

Himalayan26 tours include Everest Base Camp,
Annapurna Classic, Langtang Valley, Manaslu Circuit,
Upper Mustang, Bhutan Mountain & Culture,
Tibet High Plateau, Ladakh High Altitude and
Kailash Mansarovar Journey.

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

async function createNormalPlan(
  apiKey: string,
  message: string
) {
  return callOpenAI(apiKey, {
    model: "gpt-5.6-luna",

    reasoning: {
      effort: "none",
    },

    instructions: plannerInstructions,

    input: message,

    max_output_tokens: 1200,
  });
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is missing." },
        { status: 503 }
      );
    }

    let body: AiRequestBody;

    try {
      body =
        (await request.json()) as AiRequestBody;
    } catch {
      return NextResponse.json(
        { error: "Invalid AI request." },
        { status: 400 }
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
        { status: 400 }
      );
    }

    // NORMAL AI
    if (!liveResearch) {
      const ai =
        await createNormalPlan(apiKey, message);

      if (!ai.response.ok) {
        console.error(
          "OpenAI normal request failed:",
          ai.result
        );

        return NextResponse.json(
          {
            error:
              ai.result?.error?.message ||
              "The AI Trip Planner could not respond.",
          },
          {
            status:
              ai.response.status >= 400
                ? ai.response.status
                : 500,
          }
        );
      }

      const answer =
        extractAnswer(ai.result);

      if (!answer) {
        return NextResponse.json(
          {
            error:
              "The AI could not create a trip plan.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        ok: true,
        answer,
        liveResearch: false,
        researchUnavailable: false,
        sources: [],
      });
    }

    // TRY LIVE RESEARCH
    const research = await callOpenAI(
      apiKey,
      {
        model: "gpt-5.6-luna",

        reasoning: {
          effort: "none",
        },

        instructions: researchInstructions,

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

    // -----------------------------------------
    // RATE LIMIT FALLBACK
    // -----------------------------------------
    if (research.response.status === 429) {
      console.warn(
        "Live research rate limited. Using normal AI fallback."
      );

      const fallback =
        await createNormalPlan(
          apiKey,
          `${message}

Important: Live web research is currently unavailable.
Do not claim that current permits, visa rules, border
rules, weather, trail conditions or access restrictions
were verified live. Clearly tell the traveler that these
items must be checked with official sources before travel.`
        );

      if (!fallback.response.ok) {
        console.error(
          "Fallback AI request failed:",
          fallback.result
        );

        return NextResponse.json(
          {
            error:
              "Live research is currently unavailable and the backup planner could not respond.",
          },
          { status: 503 }
        );
      }

      const fallbackAnswer =
        extractAnswer(fallback.result);

      if (!fallbackAnswer) {
        return NextResponse.json(
          {
            error:
              "The backup trip planner could not create a response.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        ok: true,
        answer: fallbackAnswer,

        // IMPORTANT:
        // Never tell the frontend research succeeded.
        liveResearch: false,

        researchUnavailable: true,

        researchMessage:
          "Live web research is temporarily unavailable. This plan was created without live verification. Please confirm current permits, entry rules and travel conditions with official sources before booking.",

        sources: [],
      });
    }

    if (!research.response.ok) {
      console.error(
        "OpenAI live research failed:",
        research.result
      );

      return NextResponse.json(
        {
          error:
            research.result?.error?.message ||
            "Live research could not respond.",
        },
        {
          status:
            research.response.status >= 400
              ? research.response.status
              : 500,
        }
      );
    }

    const answer =
      extractAnswer(research.result);

    const sources =
      extractSources(research.result);

    if (!answer) {
      return NextResponse.json(
        {
          error:
            "Live research completed but could not create the final trip plan.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      answer,
      liveResearch: true,
      researchUnavailable: false,
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
      { status: 500 }
    );
  }
}

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

  let result: any = {};

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

const tibetTours = `
Himalayan Adventures currently specializes only in Tibet.

CURRENT TIBET JOURNEYS

1. Lhasa Classic Journey
Slug: lhasa-classic
Duration: 5 days
Difficulty: Easy–Moderate
Starting planning price: $1,290
Focus: Lhasa, culture, monasteries and acclimatization

2. Lhasa to Everest Base Camp
Slug: lhasa-everest-base-camp
Duration: 8 days
Difficulty: Moderate
Starting planning price: $1,890
Focus: Lhasa, Gyantse, Shigatse, Tibetan Plateau and Everest region

3. Lhoka (Southern Tibet)
Slug: lhoka-southern-tibet
Duration: 7 days
Difficulty: Easy–Moderate
Starting planning price: $1,590
Focus: southern Tibet, Lhoka, culture, valleys, monasteries and historic places

4. Tibet High Plateau
Slug: tibet-high-plateau
Duration: 12 days
Difficulty: Moderate
Starting planning price: $2,190
Focus: high plateau landscapes, culture and remote travel

5. Kailash & Mansarovar Journey
Slug: kailash-mansarovar-journey
Duration: 15 days
Difficulty: Moderate
Starting planning price: $2,890
Focus: western Tibet, Mount Kailash, Lake Manasarovar and pilgrimage landscapes

6. Mount Kailash Kora
Slug: kailash-kora
Duration: 13 days
Difficulty: Challenging
Starting planning price: $2,690
Focus: Mount Kailash, Kora, altitude and western Tibet

7. Lhasa & Namtso Lake
Slug: namtso-lake
Duration: 7 days
Difficulty: Moderate
Starting planning price: $1,690
Focus: Lhasa, Namtso and high-altitude lake landscapes

8. Tibet Photography Journey
Slug: tibet-photography
Duration: 10 days
Difficulty: Moderate
Starting planning price: $2,390
Focus: photography, culture, landscapes and slower observational travel

9. Tibet Culture & Monasteries
Slug: tibet-culture-monasteries
Duration: 9 days
Difficulty: Easy–Moderate
Starting planning price: $1,990
Focus: Tibetan culture, monasteries, heritage and living traditions

All prices above are starting planning prices.
They are not guaranteed final quotations.
`;

const plannerInstructions = `
You are Himalayan26 AI, the Tibet Trip Planner for Himalayan Adventures.

Himalayan Adventures currently specializes only in Tibet.

Do not present Nepal, Bhutan or Indian Himalaya tours as Himalayan Adventures products.

If a traveler asks about another destination, explain briefly that Himalayan Adventures currently specializes in Tibet.

${tibetTours}

Your job is to create useful, realistic and professional Tibet journey ideas.

Use information supplied by the traveler when available, including:

- number of days
- dates or season
- number of travelers
- preferred pace
- places they want to visit
- culture
- photography
- pilgrimage
- landscapes
- comfort preferences
- altitude experience
- physical difficulty preferences

When one of the existing Himalayan Adventures journeys is a good match, mention its exact name.

Do not invent:
- additional Himalayan Adventures tours
- guaranteed departures
- confirmed availability
- hotels
- inclusions
- permit approvals
- final prices

Always describe listed prices as starting planning prices.

Tibet is a high-altitude destination.

Encourage sensible acclimatization and realistic pacing, particularly for:
- Everest
- Namtso
- Mount Kailash
- western Tibet
- high plateau routes

Do not diagnose medical conditions.

Do not guarantee safe acclimatization.

Travel documentation, permits, regional access, transportation arrangements, weather and regulations can change.

Unless live web research was actually completed for this request, do not claim that current rules or conditions were verified.

When live research was not used, clearly explain that important current requirements must be confirmed before booking.

Use this response structure:

## Recommended journey

Explain which Tibet journey or route best matches the traveler.

## Suggested itinerary

| Day | Plan |
|---|---|

Create a realistic planning-level itinerary.

Do not describe it as a confirmed operating itinerary.

## Why this route fits

Explain why the route matches the request.

## Travel requirements

Explain that current documentation, permits and route access must be confirmed.

If live research was not used, clearly state that these details were not verified live.

## Safety and altitude

Give useful high-level altitude and pacing guidance.

## Planning price

If an existing journey matches, give its listed starting planning price.

Clearly state that it is not a final quotation.

## Next step

Recommend confirming dates, final route, travel requirements, availability and final price before booking.
`;

const researchInstructions = `
You are Himalayan26 AI, the Tibet Trip Planner for Himalayan Adventures.

Himalayan Adventures currently specializes only in Tibet.

${tibetTours}

Create a concise, useful and realistic Tibet trip plan.

For this request you may use web search.

Use live search selectively for information that can change, especially:

- current travel documentation
- current permit information
- regional or route access
- important transportation changes
- significant official travel restrictions
- important current travel conditions

Prefer authoritative sources where available.

For legal, permit, border, entry or regulatory questions, prefer:
- government sources
- embassy or consular sources
- official transportation sources
- other authoritative primary sources

Do not use a travel blog or tour-company marketing page as the only proof of a current legal or permit requirement if authoritative information is available.

If reliable current information cannot be established, say that confirmation is still required.

Never invent:
- current permit rules
- current access
- closures
- prices
- availability
- regulations

Do not claim that something was verified unless the research actually supports it.

When an existing Himalayan Adventures Tibet journey matches the request, mention it by its exact name.

Do not invent Himalayan Adventures products.

All listed tour prices are starting planning prices, not final quotations.

Recommend realistic acclimatization and pacing.

Use this response structure:

## Recommended journey

## Suggested itinerary

| Day | Plan |
|---|---|

## Why this route fits

## Current travel requirements

Clearly distinguish researched information from anything that still requires confirmation.

## Conditions and important updates

Only include current information relevant to this traveler.

## Safety and altitude

## Planning price

Clearly identify any listed price as a starting planning price.

## Next step

Recommend confirming the final itinerary, documentation, permits, route access, availability and final price before booking.
`;

async function createNormalPlan(
  apiKey: string,
  message: string
) {
  return callOpenAI(apiKey, {
    model: "gpt-6-luna",

    instructions: plannerInstructions,

    input: message,

    max_output_tokens: 1600,
  });
}

async function createResearchPlan(
  apiKey: string,
  message: string
) {
  return callOpenAI(apiKey, {
    model: "gpt-6-luna",

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

    max_output_tokens: 1700,
  });
}

async function createFallbackPlan(
  apiKey: string,
  message: string
) {
  const fallbackMessage = `
${message}

IMPORTANT:

Live web research is currently unavailable.

Create the Tibet journey using normal planning knowledge and the Himalayan Adventures Tibet journey collection.

Do not claim that current travel documentation, permits, regional access, entry requirements, regulations, weather, transportation conditions or restrictions were verified live.

Clearly tell the traveler that current requirements and important conditions must be confirmed before booking.
`;

  return createNormalPlan(
    apiKey,
    fallbackMessage
  );
}

export async function POST(request: Request) {
  try {
    const apiKey =
      process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error(
        "OPENAI_API_KEY is missing."
      );

      return NextResponse.json(
        {
          error:
            "The AI service is not configured.",
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

    const message =
      cleanText(body.message);

    const liveResearch =
      body.liveResearch === true;

    if (!message) {
      return NextResponse.json(
        {
          error:
            "Please describe the Tibet journey you want.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * -----------------------------------------
     * NORMAL AI PLANNER
     * -----------------------------------------
     */

    if (!liveResearch) {
      const ai =
        await createNormalPlan(
          apiKey,
          message
        );

      if (!ai.response.ok) {
        console.error(
          "OpenAI normal planner failed:",
          ai.response.status,
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
        console.error(
          "OpenAI returned no planner text:",
          ai.result
        );

        return NextResponse.json(
          {
            error:
              "The AI Trip Planner did not return a journey plan.",
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

        researchUnavailable: false,

        researchMessage: "",

        sources: [],
      });
    }

    /*
     * -----------------------------------------
     * LIVE WEB RESEARCH
     * -----------------------------------------
     */

    const research =
      await createResearchPlan(
        apiKey,
        message
      );

    /*
     * If live research fails for ANY reason,
     * use the normal planner as a backup.
     */

    if (!research.response.ok) {
      console.warn(
        "Live research unavailable. Trying normal planner fallback:",
        research.response.status,
        research.result
      );

      const fallback =
        await createFallbackPlan(
          apiKey,
          message
        );

      if (!fallback.response.ok) {
        console.error(
          "Normal fallback planner failed:",
          fallback.response.status,
          fallback.result
        );

        return NextResponse.json(
          {
            error:
              fallback.result?.error?.message ||
              "The AI Trip Planner could not respond.",
          },
          {
            status:
              fallback.response.status >= 400
                ? fallback.response.status
                : 503,
          }
        );
      }

      const fallbackAnswer =
        extractAnswer(
          fallback.result
        );

      if (!fallbackAnswer) {
        console.error(
          "Fallback returned no text:",
          fallback.result
        );

        return NextResponse.json(
          {
            error:
              "The backup Tibet trip planner could not create a response.",
          },
          {
            status: 502,
          }
        );
      }

      return NextResponse.json({
        ok: true,

        answer: fallbackAnswer,

        liveResearch: false,

        researchUnavailable: true,

        researchMessage:
          "Live web research is temporarily unavailable. This Tibet plan was created without live verification. Please confirm current travel documentation, permits, route access and important travel conditions before booking.",

        sources: [],
      });
    }

    /*
     * -----------------------------------------
     * LIVE RESEARCH SUCCESS
     * -----------------------------------------
     */

    const answer =
      extractAnswer(
        research.result
      );

    const sources =
      extractSources(
        research.result
      );

    if (!answer) {
      console.warn(
        "Research succeeded but returned no final text. Trying normal planner."
      );

      const fallback =
        await createFallbackPlan(
          apiKey,
          message
        );

      if (!fallback.response.ok) {
        return NextResponse.json(
          {
            error:
              "The AI Trip Planner could not create a response.",
          },
          {
            status: 502,
          }
        );
      }

      const fallbackAnswer =
        extractAnswer(
          fallback.result
        );

      if (!fallbackAnswer) {
        return NextResponse.json(
          {
            error:
              "The AI Trip Planner could not create a response.",
          },
          {
            status: 502,
          }
        );
      }

      return NextResponse.json({
        ok: true,

        answer: fallbackAnswer,

        liveResearch: false,

        researchUnavailable: true,

        researchMessage:
          "Live research did not produce a usable result. This Tibet plan was created without live verification.",

        sources: [],
      });
    }

    return NextResponse.json({
      ok: true,

      answer,

      liveResearch: true,

      researchUnavailable: false,

      researchMessage: "",

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

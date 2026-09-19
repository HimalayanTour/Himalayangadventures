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

const tibetTours = `
Himalayan Adventures currently specializes only in Tibet.

Current Tibet journey collection:

1. Lhasa Classic Journey
- Slug: lhasa-classic
- Duration: 5 days
- Difficulty: Easy–Moderate
- Starting planning price: $1,290
- Focus: Lhasa, culture, monasteries and acclimatization

2. Lhasa to Everest Base Camp
- Slug: lhasa-everest-base-camp
- Duration: 8 days
- Difficulty: Moderate
- Starting planning price: $1,890
- Focus: Lhasa, Gyantse, Shigatse, Tibetan Plateau and Everest region

3. Lhasa, Gyantse & Shigatse
- Slug: lhasa-shigatse-gyantse
- Duration: 7 days
- Difficulty: Easy–Moderate
- Starting planning price: $1,590
- Focus: central Tibet, culture, monasteries and historic towns

4. Tibet High Plateau
- Slug: tibet-high-plateau
- Duration: 12 days
- Difficulty: Moderate
- Starting planning price: $2,190
- Focus: high plateau landscapes, culture and remote travel

5. Kailash & Mansarovar Journey
- Slug: kailash-mansarovar-journey
- Duration: 15 days
- Difficulty: Moderate
- Starting planning price: $2,890
- Focus: western Tibet, Mount Kailash, Lake Manasarovar and pilgrimage landscapes

6. Mount Kailash Kora
- Slug: kailash-kora
- Duration: 13 days
- Difficulty: Challenging
- Starting planning price: $2,690
- Focus: Mount Kailash, Kora, altitude and western Tibet

7. Lhasa & Namtso Lake
- Slug: namtso-lake
- Duration: 7 days
- Difficulty: Moderate
- Starting planning price: $1,690
- Focus: Lhasa, Namtso and high-altitude lake landscapes

8. Tibet Photography Journey
- Slug: tibet-photography
- Duration: 10 days
- Difficulty: Moderate
- Starting planning price: $2,390
- Focus: photography, culture, landscapes and slower observational travel

9. Tibet Culture & Monasteries
- Slug: tibet-culture-monasteries
- Duration: 9 days
- Difficulty: Easy–Moderate
- Starting planning price: $1,990
- Focus: Tibetan culture, monasteries, heritage and living traditions

These prices are starting planning prices, not guaranteed final quotations.
`;

const plannerInstructions = `
You are Himalayan26 AI, a specialist Tibet Trip Planner for Himalayan Adventures.

The company currently offers Tibet journeys only.

Do not recommend Nepal, Bhutan or Indian Himalaya tours as Himalayan Adventures products.

If a traveler asks for Nepal, Bhutan, India or another destination, politely explain that Himalayan Adventures currently specializes in Tibet and, when useful, suggest a Tibet journey that matches the traveler's interests.

${tibetTours}

Your job is to help travelers shape useful, realistic Tibet journey ideas.

Personalize recommendations using the traveler's:
- available number of days
- season or dates
- group size
- preferred pace
- cultural interests
- photography interests
- pilgrimage interests
- landscape interests
- comfort preferences
- altitude experience
- physical difficulty preferences

When an existing Himalayan Adventures Tibet journey is a good match, mention it by its exact name.

Do not invent additional Himalayan Adventures products, confirmed departures, guaranteed availability, inclusions, hotels, permit approvals or prices.

Do not claim that a planning price is a final quotation.

Altitude is an important part of Tibet travel. Encourage sensible acclimatization and realistic pacing, especially for Everest, Namtso, Mount Kailash and other high-altitude routes.

Do not give medical diagnoses or guarantee that a traveler will acclimatize safely.

Travel documentation, permits, route access, local regulations, transportation arrangements, weather and other conditions can change.

Never present potentially changing travel rules, permits, entry requirements, route access, border information, weather or local conditions as currently verified unless live research was actually performed for this request.

When live research was not performed, clearly tell the traveler which important current details should be verified before booking.

Do not fabricate current rules.

Be professional, practical, concise and helpful.

Prefer realistic Tibet pacing over trying to include too many places.

Use this response structure:

## Recommended journey

Explain which Tibet journey or route best matches the request and why.

## Suggested itinerary

| Day | Plan |
|---|---|

Create a practical planning-level itinerary appropriate to the traveler's requested duration.

Do not imply that this is a confirmed operating itinerary.

## Why this route fits

Briefly connect the recommendation to the traveler's interests, pace and available time.

## Travel requirements

Explain which current documentation, permits, route access or other travel requirements should be verified.

If live research was not used, explicitly say these details were not verified live.

## Safety and altitude

Give practical high-level altitude and pacing considerations appropriate to the route.

## Planning price

If an existing Himalayan Adventures journey matches the request, you may state its listed starting planning price.

Clearly identify it as a starting planning price and not a final quotation.

## Next step

Recommend confirming dates, final itinerary, current travel requirements, availability and final price before booking.
`;

const researchInstructions = `
You are Himalayan26 AI, a specialist Tibet Trip Planner for Himalayan Adventures.

The company currently offers Tibet journeys only.

Do not recommend Nepal, Bhutan or Indian Himalaya tours as Himalayan Adventures products.

If a traveler asks for another destination, explain that Himalayan Adventures currently specializes in Tibet.

${tibetTours}

Create a concise, professional and realistic Tibet trip plan.

You have access to web search for this request.

Use web search selectively for current facts that can change and that materially affect the traveler's plan, such as:
- current travel documentation requirements
- permits
- route or regional access
- official restrictions
- important transportation or access changes
- significant current travel conditions

Prefer authoritative sources for current requirements.

Where appropriate, prioritize official government, embassy, consular, transport or other authoritative sources.

Do not treat travel blogs, tour-company marketing pages or forum posts as authoritative proof of current legal or permit requirements when better primary sources are available.

If authoritative information cannot be established, clearly say that the point still requires confirmation.

Do not invent current rules, permits, closures, prices, availability or access information.

Do not claim that web research verified something unless the research actually supports that statement.

When an existing Himalayan Adventures Tibet journey matches the request, mention it by its exact name.

Do not invent Himalayan Adventures products.

Starting prices are planning prices and are not guaranteed final quotations.

Altitude is an important part of Tibet travel. Recommend realistic acclimatization and pacing, especially for Everest, Namtso, Mount Kailash and other high-altitude routes.

Use this response structure:

## Recommended journey

## Suggested itinerary

| Day | Plan |
|---|---|

## Why this route fits

## Current travel requirements

Clearly distinguish information found through current research from details that still require confirmation.

## Conditions and important updates

Include only useful current information relevant to the requested journey.

## Safety and altitude

## Planning price

If applicable, identify the listed price as a starting planning price rather than a final quotation.

## Next step

Recommend confirming the final itinerary, documentation, permits, route access, availability and final price before booking.
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

    max_output_tokens: 1400,
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
            "Please describe the Tibet journey you want.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // NORMAL AI — NO LIVE WEB RESEARCH
    // -----------------------------------------
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
              "The AI could not create a Tibet trip plan.",
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

    // -----------------------------------------
    // LIVE RESEARCH
    // -----------------------------------------
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

        max_output_tokens: 1500,
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

Create the Tibet journey using the normal planning knowledge and the Himalayan Adventures Tibet collection.

Do not claim that current travel documentation, permits, route access, entry requirements, local regulations, weather, transportation conditions or restrictions were verified live.

Clearly tell the traveler that current requirements and conditions must be confirmed with appropriate official sources and local professionals before booking.`
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
              "The backup Tibet trip planner could not create a response.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        ok: true,
        answer: fallbackAnswer,

        // Never tell the frontend that
        // live research succeeded when fallback was used.
        liveResearch: false,

        researchUnavailable: true,

        researchMessage:
          "Live web research is temporarily unavailable. This Tibet plan was created without live verification. Please confirm current travel documentation, permits, route access and important travel conditions with appropriate official sources before booking.",

        sources: [],
      });
    }

    // -----------------------------------------
    // OTHER LIVE RESEARCH ERROR
    // -----------------------------------------
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
            "Live research completed but could not create the final Tibet trip plan.",
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

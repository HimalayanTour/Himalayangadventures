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

type OpenAIResult = {
  response: Response | null;
  result: any;
  timedOut: boolean;
};

type LocalTour = {
  name: string;
  slug: string;
  duration: number;
  difficulty: string;
  price: string;
  focus: string;
};

const LOCAL_TOURS: LocalTour[] = [
  {
    name: "Lhasa Classic Journey",
    slug: "lhasa-classic",
    duration: 5,
    difficulty: "Easy–Moderate",
    price: "$1,290",
    focus:
      "Lhasa, culture, monasteries and acclimatization",
  },
  {
    name: "Lhasa to Everest Base Camp",
    slug: "lhasa-everest-base-camp",
    duration: 8,
    difficulty: "Moderate",
    price: "$1,890",
    focus:
      "Lhasa, Gyantse, Shigatse, Tibetan Plateau and Everest region",
  },
  {
    name: "Lhoka (Southern Tibet)",
    slug: "lhoka-southern-tibet",
    duration: 7,
    difficulty: "Easy–Moderate",
    price: "$1,590",
    focus:
      "southern Tibet, Lhoka, culture, valleys, monasteries and historic places",
  },
  {
    name: "Tibet High Plateau",
    slug: "tibet-high-plateau",
    duration: 12,
    difficulty: "Moderate",
    price: "$2,190",
    focus:
      "high plateau landscapes, culture and remote travel",
  },
  {
    name: "Kailash & Mansarovar Journey",
    slug: "kailash-mansarovar-journey",
    duration: 15,
    difficulty: "Moderate",
    price: "$2,890",
    focus:
      "western Tibet, Mount Kailash, Lake Manasarovar and pilgrimage landscapes",
  },
  {
    name: "Mount Kailash Kora",
    slug: "kailash-kora",
    duration: 13,
    difficulty: "Challenging",
    price: "$2,690",
    focus:
      "Mount Kailash, Kora, altitude and western Tibet",
  },
  {
    name: "Lhasa & Namtso Lake",
    slug: "namtso-lake",
    duration: 7,
    difficulty: "Moderate",
    price: "$1,690",
    focus:
      "Lhasa, Namtso and high-altitude lake landscapes",
  },
  {
    name: "Tibet Photography Journey",
    slug: "tibet-photography",
    duration: 10,
    difficulty: "Moderate",
    price: "$2,390",
    focus:
      "photography, culture, landscapes and slower observational travel",
  },
  {
    name: "Tibet Culture & Monasteries",
    slug: "tibet-culture-monasteries",
    duration: 9,
    difficulty: "Easy–Moderate",
    price: "$1,990",
    focus:
      "Tibetan culture, monasteries, heritage and living traditions",
  },
];

function cleanText(
  value: unknown,
  maxLength = 2000
) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .slice(0, maxLength);
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

function extractSources(
  result: any
): ResearchSource[] {
  const sources: ResearchSource[] = [];
  const seen = new Set<string>();

  function addSource(
    url: unknown,
    title: unknown
  ) {
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
        typeof title === "string" &&
        title.trim()
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
      Array.isArray(
        item?.action?.sources
      )
    ) {
      for (const source of item.action.sources) {
        addSource(
          source?.url,
          source?.title
        );
      }
    }

    if (!Array.isArray(item?.content)) {
      continue;
    }

    for (const content of item.content) {
      if (
        !Array.isArray(
          content?.annotations
        )
      ) {
        continue;
      }

      for (
        const annotation
        of content.annotations
      ) {
        if (
          annotation?.type ===
          "url_citation"
        ) {
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
  body: Record<string, unknown>,
  timeoutMs?: number
): Promise<OpenAIResult> {
  const controller =
    new AbortController();

  let timeout:
    | ReturnType<typeof setTimeout>
    | undefined;

  if (timeoutMs) {
    timeout = setTimeout(() => {
      controller.abort();
    }, timeoutMs);
  }

  try {
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

        body: JSON.stringify(body),

        cache: "no-store",

        signal:
          controller.signal,
      }
    );

    let result: any = {};

    try {
      result =
        await response.json();
    } catch {
      result = {};
    }

    return {
      response,
      result,
      timedOut: false,
    };
  } catch (error: any) {
    if (
      error?.name === "AbortError"
    ) {
      return {
        response: null,

        result: {
          error: {
            message:
              "Request timed out.",
          },
        },

        timedOut: true,
      };
    }

    throw error;
  } finally {
    if (timeout) {
      clearTimeout(timeout);
    }
  }
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
  return callOpenAI(
    apiKey,
    {
      model: "gpt-6-luna",

      instructions:
        plannerInstructions,

      input: message,

      max_output_tokens: 1600,
    },

    12000
  );
}

async function createResearchPlan(
  apiKey: string,
  message: string
) {
  return callOpenAI(
    apiKey,
    {
      model: "gpt-6-luna",

      instructions:
        researchInstructions,

      input: message,

      tools: [
        {
          type: "web_search",
          search_context_size:
            "low",
        },
      ],

      tool_choice: "auto",

      max_tool_calls: 1,

      include: [
        "web_search_call.action.sources",
      ],

      max_output_tokens: 1700,
    },

    12000
  );
}

/*
 * -----------------------------------------
 * LOCAL EMERGENCY PLANNER
 * -----------------------------------------
 *
 * This does NOT call OpenAI.
 *
 * It uses only the official journey
 * collection already defined in the site.
 *
 * Its purpose is to make sure customers
 * still receive a useful Tibet journey
 * when OpenAI is temporarily rate limited
 * or unavailable.
 */

function extractRequestedDays(
  message: string
) {
  const patterns = [
    /(\d{1,2})\s*[- ]?day/i,
    /(\d{1,2})\s*days/i,
    /for\s+(\d{1,2})\s*days/i,
  ];

  for (const pattern of patterns) {
    const match =
      message.match(pattern);

    if (match) {
      const value =
        Number(match[1]);

      if (
        Number.isFinite(value) &&
        value >= 1 &&
        value <= 60
      ) {
        return value;
      }
    }
  }

  return null;
}

function chooseLocalTour(
  message: string
): LocalTour {
  const text =
    message.toLowerCase();

  const requestedDays =
    extractRequestedDays(
      message
    );

  if (
    text.includes(
      "mansarovar"
    ) ||
    text.includes(
      "manasarovar"
    )
  ) {
    return LOCAL_TOURS.find(
      (tour) =>
        tour.slug ===
        "kailash-mansarovar-journey"
    )!;
  }

  if (
    text.includes(
      "kailash"
    ) &&
    (
      text.includes(
        "kora"
      ) ||
      text.includes(
        "trek"
      ) ||
      text.includes(
        "pilgrimage"
      )
    )
  ) {
    return LOCAL_TOURS.find(
      (tour) =>
        tour.slug ===
        "kailash-kora"
    )!;
  }

  if (
    text.includes(
      "kailash"
    )
  ) {
    return LOCAL_TOURS.find(
      (tour) =>
        tour.slug ===
        "kailash-mansarovar-journey"
    )!;
  }

  if (
    text.includes(
      "everest"
    ) ||
    text.includes(
      "base camp"
    ) ||
    text.includes(
      "ebc"
    )
  ) {
    return LOCAL_TOURS.find(
      (tour) =>
        tour.slug ===
        "lhasa-everest-base-camp"
    )!;
  }

  if (
    text.includes(
      "namtso"
    ) ||
    text.includes(
      "lake"
    )
  ) {
    return LOCAL_TOURS.find(
      (tour) =>
        tour.slug ===
        "namtso-lake"
    )!;
  }

  if (
    text.includes(
      "lhoka"
    ) ||
    text.includes(
      "southern tibet"
    ) ||
    text.includes(
      "south tibet"
    )
  ) {
    return LOCAL_TOURS.find(
      (tour) =>
        tour.slug ===
        "lhoka-southern-tibet"
    )!;
  }

  if (
    text.includes(
      "photo"
    ) ||
    text.includes(
      "photography"
    ) ||
    text.includes(
      "photographer"
    )
  ) {
    return LOCAL_TOURS.find(
      (tour) =>
        tour.slug ===
        "tibet-photography"
    )!;
  }

  if (
    text.includes(
      "monastery"
    ) ||
    text.includes(
      "monasteries"
    ) ||
    text.includes(
      "heritage"
    ) ||
    text.includes(
      "culture"
    )
  ) {
    if (
      requestedDays === 7
    ) {
      return LOCAL_TOURS.find(
        (tour) =>
          tour.slug ===
          "lhoka-southern-tibet"
      )!;
    }

    return LOCAL_TOURS.find(
      (tour) =>
        tour.slug ===
        "tibet-culture-monasteries"
    )!;
  }

  if (
    text.includes(
      "plateau"
    ) ||
    text.includes(
      "remote"
    )
  ) {
    return LOCAL_TOURS.find(
      (tour) =>
        tour.slug ===
        "tibet-high-plateau"
    )!;
  }

  /*
   * Generic trip:
   * match the official tour duration
   * closest to what the traveler asked for.
   *
   * A generic 7-day trip therefore matches
   * Lhoka (Southern Tibet).
   */

  if (
    requestedDays
  ) {
    const sorted =
      [...LOCAL_TOURS].sort(
        (a, b) => {
          const differenceA =
            Math.abs(
              a.duration -
                requestedDays
            );

          const differenceB =
            Math.abs(
              b.duration -
                requestedDays
            );

          if (
            differenceA !==
            differenceB
          ) {
            return (
              differenceA -
              differenceB
            );
          }

          /*
           * For equal matches,
           * prefer a culturally balanced
           * easier journey.
           */

          const preference =
            [
              "lhoka-southern-tibet",
              "lhasa-classic",
              "namtso-lake",
              "tibet-culture-monasteries",
              "lhasa-everest-base-camp",
              "tibet-photography",
              "tibet-high-plateau",
              "kailash-kora",
              "kailash-mansarovar-journey",
            ];

          return (
            preference.indexOf(
              a.slug
            ) -
            preference.indexOf(
              b.slug
            )
          );
        }
      );

    return sorted[0];
  }

  return LOCAL_TOURS.find(
    (tour) =>
      tour.slug ===
      "lhoka-southern-tibet"
  )!;
}

function itineraryForTour(
  tour: LocalTour
) {
  switch (tour.slug) {
    case "lhasa-classic":
      return [
        "Arrive in Lhasa. Keep the first day light and allow time to begin adjusting to the altitude.",
        "Explore central Lhasa at a gentle pace, with cultural visits planned around how you are feeling.",
        "Continue exploring important Lhasa cultural and monastery sites with an unhurried schedule.",
        "Allow another flexible day for cultural experiences, local neighborhoods and final sightseeing.",
        "Depart Lhasa or continue into another Tibet journey after final arrangements are confirmed.",
      ];

    case "lhasa-everest-base-camp":
      return [
        "Arrive in Lhasa and keep the day light for initial altitude adjustment.",
        "Explore Lhasa at a gentle pace with cultural sightseeing and rest time.",
        "Continue Lhasa sightseeing and allow another acclimatization day.",
        "Travel from Lhasa toward Gyantse and Shigatse through central Tibet.",
        "Continue from Shigatse toward the Everest region, allowing for a long high-altitude travel day.",
        "Experience the Everest region according to confirmed access, route conditions and local arrangements.",
        "Begin the return journey toward Shigatse.",
        "Travel from Shigatse back to Lhasa, allowing for road conditions and breaks.",
      ];

    case "lhoka-southern-tibet":
      return [
        "Arrive in Lhasa and take the day slowly to begin acclimatizing.",
        "Explore Lhasa at a gentle pace, allowing time for culture and rest.",
        "Continue exploring important cultural and monastery sites in Lhasa.",
        "Travel from Lhasa into the Lhoka area, allowing time for the drive and changing landscapes.",
        "Explore historic places, monasteries and cultural sites in southern Tibet.",
        "Spend another day experiencing Lhoka's valleys, local landscapes and cultural heritage at a flexible pace.",
        "Return toward Lhasa or continue according to the final confirmed travel arrangements.",
      ];

    case "namtso-lake":
      return [
        "Arrive in Lhasa and keep the day light for altitude adjustment.",
        "Explore Lhasa gently with cultural visits and plenty of rest time.",
        "Continue Lhasa sightseeing and allow another day for acclimatization.",
        "Travel toward the Namtso region, adjusting the day according to altitude, road and weather conditions.",
        "Experience the Namtso landscape with a conservative schedule appropriate for the higher elevation.",
        "Return toward Lhasa and keep the schedule flexible after the high-altitude excursion.",
        "Final Lhasa time and departure according to confirmed arrangements.",
      ];

    case "tibet-photography":
      return [
        "Arrive in Lhasa and begin adjusting to the altitude.",
        "Photograph Lhasa cultural areas at a relaxed pace.",
        "Continue Lhasa photography with monasteries, architecture and street life.",
        "Travel into the wider plateau landscape with photography stops where practical.",
        "Focus on cultural landscapes, changing light and rural scenery.",
        "Continue photography-oriented travel with time for observation rather than rushing.",
        "Include another landscape and cultural photography day based on the final route.",
        "Use a flexible day for weather, light and photographic opportunities.",
        "Return toward Lhasa while continuing to photograph plateau scenery.",
        "Final photography time in Lhasa and departure according to arrangements.",
      ];

    case "tibet-culture-monasteries":
      return [
        "Arrive in Lhasa and begin acclimatizing.",
        "Explore central Lhasa and important cultural areas.",
        "Visit major monastery and heritage sites at an unhurried pace.",
        "Continue cultural exploration in Lhasa with time for local neighborhoods.",
        "Travel into another cultural area of Tibet according to the confirmed route.",
        "Experience monasteries, historic places and local traditions.",
        "Continue cultural travel with realistic road time and rest breaks.",
        "Return toward Lhasa with flexible cultural stops where practical.",
        "Final Lhasa time and departure.",
      ];

    case "tibet-high-plateau":
      return [
        "Arrive in Lhasa and begin acclimatizing.",
        "Explore Lhasa gently and allow plenty of rest.",
        "Continue Lhasa cultural sightseeing and acclimatization.",
        "Begin traveling across the Tibetan Plateau with realistic road time.",
        "Experience broad plateau landscapes and cultural stops.",
        "Continue through higher and more remote plateau areas according to access and conditions.",
        "Allow a slower day for altitude, weather and road conditions.",
        "Continue the high plateau journey with flexible stops.",
        "Experience additional remote landscapes and cultural places.",
        "Begin the gradual return toward central Tibet.",
        "Continue toward Lhasa with appropriate breaks.",
        "Final Lhasa time and departure.",
      ];

    case "kailash-kora":
      return [
        "Arrive in Lhasa and begin acclimatizing.",
        "Explore Lhasa gently and continue altitude adjustment.",
        "Allow another Lhasa acclimatization day.",
        "Begin the long journey toward western Tibet.",
        "Continue west with realistic driving time and rest stops.",
        "Continue toward the Mount Kailash region according to confirmed route access.",
        "Use a flexible preparation and acclimatization day before the Kora.",
        "Begin the Mount Kailash Kora according to local conditions and traveler readiness.",
        "Continue the Kora with conservative pacing.",
        "Complete the Kora according to the confirmed operating plan.",
        "Begin the return journey east.",
        "Continue toward central Tibet with realistic driving time.",
        "Return toward Lhasa or depart according to the final confirmed arrangements.",
      ];

    case "kailash-mansarovar-journey":
      return [
        "Arrive in Lhasa and begin acclimatizing.",
        "Explore Lhasa gently with cultural sightseeing.",
        "Continue acclimatization in Lhasa.",
        "Begin traveling west across Tibet.",
        "Continue west with realistic road time.",
        "Continue through western Tibet toward the Kailash region.",
        "Experience Lake Manasarovar according to confirmed access and conditions.",
        "Prepare for the Mount Kailash area with a flexible acclimatization day.",
        "Begin the Mount Kailash experience according to the confirmed route.",
        "Continue the Kailash journey at a conservative pace.",
        "Complete the planned Kailash section according to local arrangements.",
        "Begin returning east through western Tibet.",
        "Continue the return journey toward central Tibet.",
        "Return toward Lhasa with appropriate rest and breaks.",
        "Final departure according to confirmed arrangements.",
      ];

    default:
      return [
        "Arrive in Tibet and begin with a light acclimatization day.",
        "Explore Lhasa gently with cultural sightseeing.",
        "Continue cultural exploration with realistic pacing.",
        "Travel into the wider Tibetan Plateau according to the selected route.",
        "Continue the journey with appropriate rest and flexible travel time.",
        "Experience additional cultural and landscape highlights.",
        "Return toward Lhasa or depart according to confirmed arrangements.",
      ];
  }
}

function buildLocalPlan(
  message: string
) {
  const tour =
    chooseLocalTour(
      message
    );

  const requestedDays =
    extractRequestedDays(
      message
    );

  const itinerary =
    itineraryForTour(
      tour
    );

  const itineraryRows =
    itinerary
      .map(
        (plan, index) =>
          `| ${index + 1} | ${plan} |`
      )
      .join("\n");

  const durationNote =
    requestedDays &&
    requestedDays !==
      tour.duration
      ? `You mentioned approximately ${requestedDays} days. The closest current Himalayan Adventures journey is ${tour.duration} days, so the final route should be adjusted with the travel team before booking.`
      : `This matches the ${tour.duration}-day planning length of the current journey.`;

  return `
## Recommended journey

**${tour.name}** is the closest match for your Tibet trip. It is a ${tour.duration}-day ${tour.difficulty} journey focused on ${tour.focus}.

${durationNote}

## Suggested itinerary

| Day | Plan |
|---|---|
${itineraryRows}

This is a planning-level itinerary, not a confirmed operating schedule. The final route may change after dates, transportation, access and local arrangements are confirmed.

## Why this route fits

This journey gives you a balanced Tibet experience using one of Himalayan Adventures' current Tibet routes. The itinerary keeps the first days relatively gentle and avoids treating high-altitude travel as a rushed sightseeing schedule.

## Travel requirements

Current travel documentation, permits, regional access, transportation arrangements and other requirements **have not been verified live for this request**.

These details can change and must be confirmed before booking.

## Safety and altitude

Tibet is a high-altitude destination. Keep the first days relatively light, allow time for rest and hydration, and avoid building the itinerary around aggressive daily travel.

Higher areas such as Everest, Namtso, Mount Kailash and remote plateau routes require additional attention to altitude, long drives, weather and local conditions.

No itinerary can guarantee safe acclimatization.

## Planning price

**${tour.name}** is currently listed with a **starting planning price of ${tour.price}**.

This is not a final quotation. Final pricing depends on confirmed dates, route, services, availability and operating arrangements.

## Next step

Send this journey to the Himalayan Adventures Tibet travel team with your preferred dates, number of travelers, accommodation preference and any changes you would like.

The team should confirm the final itinerary, current travel requirements, route access, availability and final price before booking.
`.trim();
}

function localResponse(
  message: string,
  liveResearchRequested: boolean,
  reason:
    | "rate_limit"
    | "timeout"
    | "unavailable"
    | "missing_key"
    | "empty_result" =
    "unavailable"
) {
  let researchMessage = "";

  if (
    liveResearchRequested
  ) {
    if (
      reason ===
      "rate_limit"
    ) {
      researchMessage =
        "Live web research is temporarily busy. Your Tibet journey was created using the Himalayan Adventures journey collection without live verification. Please confirm current travel documentation, permits, route access and important travel conditions before booking.";
    } else if (
      reason ===
      "timeout"
    ) {
      researchMessage =
        "Live web research took too long to respond. Your Tibet journey was created using the Himalayan Adventures journey collection without live verification. Please confirm current travel documentation, permits, route access and important travel conditions before booking.";
    } else {
      researchMessage =
        "Live web research is temporarily unavailable. Your Tibet journey was created using the Himalayan Adventures journey collection without live verification. Please confirm current travel documentation, permits, route access and important travel conditions before booking.";
    }
  }

  return NextResponse.json({
    ok: true,

    answer:
      buildLocalPlan(
        message
      ),

    liveResearch: false,

    researchUnavailable:
      liveResearchRequested,

    researchMessage,

    sources: [],

    fallback:
      "local",
  });
}

export async function POST(
  request: Request
) {
  try {
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
      cleanText(
        body.message
      );

    const liveResearch =
      body.liveResearch ===
      true;

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

    const apiKey =
      process.env.OPENAI_API_KEY;

    /*
     * -----------------------------------------
     * NO API KEY
     * -----------------------------------------
     *
     * Do not break the planner.
     * Use the local Tibet journey engine.
     */

    if (!apiKey) {
      console.warn(
        "OPENAI_API_KEY missing. Using local Tibet planner."
      );

      return localResponse(
        message,
        liveResearch,
        "missing_key"
      );
    }

    /*
     * -----------------------------------------
     * NORMAL AI MODE
     * -----------------------------------------
     */

    if (!liveResearch) {
      const ai =
        await createNormalPlan(
          apiKey,
          message
        );

      if (
        ai.timedOut
      ) {
        console.warn(
          "Normal AI timed out. Using local Tibet planner."
        );

        return localResponse(
          message,
          false,
          "timeout"
        );
      }

      if (
        !ai.response ||
        !ai.response.ok
      ) {
        console.warn(
          "Normal AI unavailable. Using local Tibet planner.",
          ai.response?.status
        );

        return localResponse(
          message,
          false,
          ai.response?.status ===
            429
            ? "rate_limit"
            : "unavailable"
        );
      }

      const answer =
        extractAnswer(
          ai.result
        );

      if (!answer) {
        console.warn(
          "Normal AI returned no usable answer. Using local Tibet planner."
        );

        return localResponse(
          message,
          false,
          "empty_result"
        );
      }

      return NextResponse.json({
        ok: true,

        answer,

        liveResearch: false,

        researchUnavailable:
          false,

        researchMessage:
          "",

        sources: [],
      });
    }

    /*
     * -----------------------------------------
     * LIVE RESEARCH MODE
     * -----------------------------------------
     */

    const research =
      await createResearchPlan(
        apiKey,
        message
      );

    /*
     * If live research hits a 429,
     * do NOT make another OpenAI call.
     *
     * The normal model is likely using
     * the same temporary token budget.
     *
     * Immediately use the local Tibet
     * planner instead.
     */

    if (
      research.response?.status ===
      429
    ) {
      console.warn(
        "Live research rate limited. Using local Tibet planner immediately."
      );

      return localResponse(
        message,
        true,
        "rate_limit"
      );
    }

    /*
     * If research timed out,
     * try normal AI once.
     */

    if (
      research.timedOut
    ) {
      console.warn(
        "Live research timed out. Trying normal planner."
      );

      const normal =
        await createNormalPlan(
          apiKey,
          message
        );

      if (
        normal.response?.ok
      ) {
        const answer =
          extractAnswer(
            normal.result
          );

        if (answer) {
          return NextResponse.json({
            ok: true,

            answer,

            liveResearch:
              false,

            researchUnavailable:
              true,

            researchMessage:
              "Live web research took too long to respond. This Tibet plan was created without live verification. Please confirm current travel documentation, permits, route access and important travel conditions before booking.",

            sources: [],
          });
        }
      }

      return localResponse(
        message,
        true,
        "timeout"
      );
    }

    /*
     * Other live-research errors:
     * try normal AI once.
     */

    if (
      !research.response ||
      !research.response.ok
    ) {
      console.warn(
        "Live research unavailable. Trying normal planner.",
        research.response?.status
      );

      const normal =
        await createNormalPlan(
          apiKey,
          message
        );

      if (
        normal.response?.ok
      ) {
        const answer =
          extractAnswer(
            normal.result
          );

        if (answer) {
          return NextResponse.json({
            ok: true,

            answer,

            liveResearch:
              false,

            researchUnavailable:
              true,

            researchMessage:
              "Live web research is temporarily unavailable. This Tibet plan was created without live verification. Please confirm current travel documentation, permits, route access and important travel conditions before booking.",

            sources: [],
          });
        }
      }

      return localResponse(
        message,
        true,
        normal.response?.status ===
          429
          ? "rate_limit"
          : "unavailable"
      );
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
        "Live research returned no usable answer. Trying normal planner."
      );

      const normal =
        await createNormalPlan(
          apiKey,
          message
        );

      if (
        normal.response?.ok
      ) {
        const normalAnswer =
          extractAnswer(
            normal.result
          );

        if (
          normalAnswer
        ) {
          return NextResponse.json({
            ok: true,

            answer:
              normalAnswer,

            liveResearch:
              false,

            researchUnavailable:
              true,

            researchMessage:
              "Live research did not produce a usable result. This Tibet plan was created without live verification.",

            sources: [],
          });
        }
      }

      return localResponse(
        message,
        true,
        "empty_result"
      );
    }

    return NextResponse.json({
      ok: true,

      answer,

      liveResearch: true,

      researchUnavailable:
        false,

      researchMessage: "",

      sources,
    });
  } catch (error) {
    /*
     * -----------------------------------------
     * LAST SAFETY NET
     * -----------------------------------------
     *
     * A temporary external service problem
     * should not show technical API errors
     * to the traveler.
     */

    console.error(
      "AI route unexpected error:",
      error
    );

    try {
      const clonedMessage =
        "Plan a Tibet journey";

      return localResponse(
        clonedMessage,
        false,
        "unavailable"
      );
    } catch {
      return NextResponse.json(
        {
          error:
            "The Tibet Trip Planner is temporarily unavailable. Please try again.",
        },
        {
          status: 503,
        }
      );
    }
  }
}

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AiRequestBody = {
  message?: unknown;
  liveResearch?: unknown;
};

type ResearchSource = {
  title: string;
  url: string;
};

function cleanText(
  value: unknown,
  maxLength = 3000
) {
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

  let answer = "";

  if (!Array.isArray(result?.output)) {
    return "";
  }

  for (const item of result.output) {
    if (!Array.isArray(item?.content)) {
      continue;
    }

    for (const content of item.content) {
      if (
        content?.type === "output_text" &&
        typeof content?.text === "string"
      ) {
        answer += content.text + "\n";
      }
    }
  }

  return answer.trim();
}

function extractSources(
  ...results: any[]
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

  for (const result of results) {
    if (!Array.isArray(result?.output)) {
      continue;
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
          const annotation of
            content.annotations
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
  }

  return sources.slice(0, 6);
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
        Authorization:
          `Bearer ${apiKey}`,
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    }
  );

  const result =
    await response.json();

  return {
    response,
    result,
  };
}

function apiErrorMessage(
  response: Response,
  result: any
) {
  const message =
    result?.error?.message ||
    "The AI Trip Planner could not respond.";

  if (
    response.status === 429 ||
    message
      .toLowerCase()
      .includes("rate limit")
  ) {
    return {
      status: 429,
      message:
        "Live research is temporarily busy. Please wait about one minute and try again.",
    };
  }

  return {
    status:
      response.status >= 400
        ? response.status
        : 500,
    message,
  };
}

const instructions = `
You are Himalayan26 AI Trip Planner.

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

Write for travelers.

Be:
- professional
- concise
- practical
- safety-conscious

When live web research is available:
- research only facts that can change
- prioritize official government, embassy, tourism authority, national park and other authoritative sources
- research entry rules when relevant
- research permits when relevant
- research important recent travel or access conditions
- never invent current information
- clearly say when something still needs verification
- remember future regulations may change before the travel date

Format the final answer like this:

## Recommended journey

Short personalized recommendation.

## Suggested itinerary

| Day | Plan |
|---|---|
| 1 | ... |

## Current permits and travel rules

Concise researched information.

## Conditions and important updates

Only important current findings.

## Safety and altitude

Short practical guidance.

## Next step

Recommend the relevant Himalayan26 tour or booking request.
`;

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
            "OPENAI_API_KEY is missing.",
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
      body.message
    );

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
    // NORMAL AI — NO LIVE WEB SEARCH
    // --------------------------------

    if (!liveResearch) {
      const first =
        await callOpenAI(
          apiKey,
          {
            model:
              "gpt-5.6-luna",

            reasoning: {
              effort: "none",
            },

            instructions,

            input: message,

            max_output_tokens:
              1800,
          }
        );

      if (!first.response.ok) {
        const error =
          apiErrorMessage(
            first.response,
            first.result
          );

        return NextResponse.json(
          {
            error:
              error.message,
          },
          {
            status:
              error.status,
          }
        );
      }

      const answer =
        extractAnswer(
          first.result
        );

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

    // ================================
    // LIVE WEB RESEARCH
    // ================================

    const research =
      await callOpenAI(
        apiKey,
        {
          model:
            "gpt-5.6-luna",

          reasoning: {
            effort: "none",
          },

          instructions,

          input: `
Create a Himalayan travel plan for this traveler.

Use live web search only for information that may have changed.

Traveler request:

${message}
`,

          tools: [
            {
              type: "web_search",
              search_context_size:
                "low",
            },
          ],

          tool_choice: "auto",

          include: [
            "web_search_call.action.sources",
          ],

          max_output_tokens:
            2800,
        }
      );

    if (!research.response.ok) {
      console.error(
        "OpenAI research request failed:",
        research.result
      );

      const error =
        apiErrorMessage(
          research.response,
          research.result
        );

      return NextResponse.json(
        {
          error:
            error.message,
        },
        {
          status:
            error.status,
        }
      );
    }

    let answer =
      extractAnswer(
        research.result
      );

    let continuationResult: any =
      null;

    // If web search happened but the model did not
    // have room to write the final answer,
    // continue the SAME response.
    if (
      !answer &&
      typeof research.result?.id ===
        "string"
    ) {
      console.log(
        "Research needs continuation:",
        {
          status:
            research.result?.status,
          incompleteReason:
            research.result
              ?.incomplete_details
              ?.reason ||
            null,
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

      const continuation =
        await callOpenAI(
          apiKey,
          {
            model:
              "gpt-5.6-luna",

            reasoning: {
              effort: "none",
            },

            previous_response_id:
              research.result.id,

            instructions,

            input:
              "Now write the final traveler-facing Himalayan26 trip plan using the research already completed. Do not perform another web search. Give the complete final answer now.",

            max_output_tokens:
              2200,
          }
        );

      continuationResult =
        continuation.result;

      if (
        !continuation.response.ok
      ) {
        console.error(
          "Continuation failed:",
          continuation.result
        );

        const error =
          apiErrorMessage(
            continuation.response,
            continuation.result
          );

        return NextResponse.json(
          {
            error:
              error.message,
          },
          {
            status:
              error.status,
          }
        );
      }

      answer =
        extractAnswer(
          continuation.result
        );
    }

    const sources =
      extractSources(
        research.result,
        continuationResult
      );

    if (!answer) {
      const diagnostic = {
        researchStatus:
          research.result?.status ||
          "unknown",

        incompleteReason:
          research.result
            ?.incomplete_details
            ?.reason ||
          "none",

        researchOutputTypes:
          Array.isArray(
            research.result?.output
          )
            ? research.result.output.map(
                (item: any) =>
                  item?.type
              )
            : [],

        continuationStatus:
          continuationResult?.status ||
          "not-run",

        continuationOutputTypes:
          Array.isArray(
            continuationResult?.output
          )
            ? continuationResult.output.map(
                (item: any) =>
                  item?.type
              )
            : [],
      };

      console.error(
        "AI live research produced no final text:",
        diagnostic
      );

      return NextResponse.json(
        {
          error:
            `Live research completed but no final answer was generated. Status: ${diagnostic.researchStatus}. Reason: ${diagnostic.incompleteReason}.`,
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

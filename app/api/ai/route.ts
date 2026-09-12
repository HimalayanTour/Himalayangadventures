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
    return answer;
  }

  for (const item of result.output) {
    if (
      item?.type !== "message" ||
      !Array.isArray(item?.content)
    ) {
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
      // Sources returned directly from web search
      if (
        item?.type === "web_search_call" &&
        Array.isArray(
          item?.action?.sources
        )
      ) {
        for (
          const source of
            item.action.sources
        ) {
          addSource(
            source?.url,
            source?.title
          );
        }
      }

      // Sources/citations attached to final text
      if (
        item?.type === "message" &&
        Array.isArray(item?.content)
      ) {
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

            if (
              annotation?.type ===
                "citation" &&
              annotation?.url
            ) {
              addSource(
                annotation.url,
                annotation.title
              );
            }
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
        Authorization: `Bearer ${apiKey}`,
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const result =
    await response.json();

  return {
    response,
    result,
  };
}

function makeApiError(
  response: Response,
  result: any
) {
  const rawMessage =
    result?.error?.message ||
    "The AI Trip Planner could not respond right now.";

  if (
    response.status === 429 ||
    rawMessage
      .toLowerCase()
      .includes("rate limit")
  ) {
    return {
      message:
        "Live research is temporarily busy. Please wait about one minute and try again.",
      status: 429,
    };
  }

  return {
    message: rawMessage,
    status:
      response.status >= 400
        ? response.status
        : 500,
  };
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
      3000
    );

    const liveResearch =
      body.liveResearch === true;

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

    const instructions = `
You are Himalayan26 AI Trip Planner.

You specialize in journeys in:
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

Write for travelers, not developers.

Be professional, practical and concise.

When web research is available:
- research only facts that can change
- prioritize official government, embassy, tourism authority, national park and other authoritative sources
- check entry rules when relevant
- check permits when relevant
- check important recent travel or access conditions
- do not waste searches on general destination descriptions
- never invent current facts
- state uncertainty when information cannot be confirmed
- future rules for the traveler's actual future travel date may change, so explain that current rules must be rechecked closer to departure

Use this format:

## Recommended journey

Brief recommendation.

## Suggested itinerary

| Day | Plan |
|---|---|
| 1 | ... |

## Current permits and travel rules

Use researched information when available.

## Conditions and important updates

Only include useful current findings.

## Safety and altitude

Short practical guidance.

## Next step

Recommend an appropriate Himalayan26 tour or booking request.

Keep the response compact enough for a travel website.
`;

    // Normal AI mode
    if (!liveResearch) {
      const {
        response,
        result,
      } = await callOpenAI(
        apiKey,
        {
          model: "gpt-5.6-luna",
          reasoning: {
            effort: "none",
          },
          instructions,
          input: message,
          max_output_tokens: 1000,
        }
      );

      if (!response.ok) {
        console.error(
          "OpenAI API error:",
          result
        );

        const apiError =
          makeApiError(
            response,
            result
          );

        return NextResponse.json(
          {
            error:
              apiError.message,
          },
          {
            status:
              apiError.status,
          }
        );
      }

      const answer =
        extractAnswer(result);

      if (!answer) {
        return NextResponse.json(
          {
            error:
              "The AI Trip Planner could not create the final response. Please try again.",
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

    // ---------------------------
    // LIVE RESEARCH — FIRST PASS
    // ---------------------------

    const firstCall =
      await callOpenAI(
        apiKey,
        {
          model: "gpt-5.6-luna",

          reasoning: {
            effort: "none",
          },

          instructions,

          input: `
Use live web research to answer this traveler request.

Focus only on important changing information such as permits, entry requirements and important current travel conditions.

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

          max_output_tokens: 1200,
        }
      );

    if (!firstCall.response.ok) {
      console.error(
        "OpenAI research error:",
        firstCall.result
      );

      const apiError =
        makeApiError(
          firstCall.response,
          firstCall.result
        );

      return NextResponse.json(
        {
          error:
            apiError.message,
        },
        {
          status:
            apiError.status,
        }
      );
    }

    let answer =
      extractAnswer(
        firstCall.result
      );

    let secondResult: any = null;

    // ------------------------------------------------
    // FALLBACK:
    // Research succeeded but no final text was written.
    // Continue from the researched response.
    // ------------------------------------------------

    if (
      !answer &&
      typeof firstCall.result?.id ===
        "string"
    ) {
      const secondCall =
        await callOpenAI(
          apiKey,
          {
            model:
              "gpt-5.6-luna",

            reasoning: {
              effort: "none",
            },

            previous_response_id:
              firstCall.result.id,

            input:
              "Using the research you just completed, now write the final traveler-facing answer. Do not perform more web searches. Follow the requested Himalayan26 format and keep it concise.",

            max_output_tokens: 1000,
          }
        );

      secondResult =
        secondCall.result;

      if (
        !secondCall.response.ok
      ) {
        console.error(
          "OpenAI continuation error:",
          secondCall.result
        );

        const apiError =
          makeApiError(
            secondCall.response,
            secondCall.result
          );

        return NextResponse.json(
          {
            error:
              apiError.message,
          },
          {
            status:
              apiError.status,
          }
        );
      }

      answer =
        extractAnswer(
          secondCall.result
        );
    }

    if (!answer) {
      console.error(
        "No final AI text.",
        {
          firstStatus:
            firstCall.result
              ?.status,
          firstId:
            firstCall.result?.id,
          firstOutputTypes:
            Array.isArray(
              firstCall.result
                ?.output
            )
              ? firstCall.result.output.map(
                  (item: any) =>
                    item?.type
                )
              : [],
          secondStatus:
            secondResult?.status,
        }
      );

      return NextResponse.json(
        {
          error:
            "Live research completed, but the final trip plan could not be generated. Please try again.",
        },
        {
          status: 502,
        }
      );
    }

    const sources =
      extractSources(
        firstCall.result,
        secondResult
      );

    return NextResponse.json({
      ok: true,
      answer,
      liveResearch: true,
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

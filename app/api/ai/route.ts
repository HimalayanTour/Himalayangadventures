import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AiRequestBody = {
  message?: unknown;
};

function cleanText(
  value: unknown,
  maxLength = 4000
) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
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
      4000
    );

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

    const systemPrompt = `
You are Himalayan26 AI Trip Planner.

You help travelers plan Himalayan journeys in:
- Nepal
- Bhutan
- Tibet
- Indian Himalaya

Your style:
- professional
- warm
- practical
- concise
- safety-conscious
- never overpromise
- never invent permits, prices, weather, or availability as confirmed facts

When useful, structure the answer with:
1. Recommended journey
2. Suggested duration
3. Best season
4. Difficulty
5. Suggested route
6. Accommodation style
7. Important preparation
8. Safety notes
9. Next step

Known Himalayan26 tours include:
- Everest Base Camp — Nepal — 14 days — Challenging
- Annapurna Classic — Nepal — 10 days — Moderate
- Langtang Valley — Nepal — 8 days — Moderate
- Manaslu Circuit — Nepal — 15 days — Challenging
- Upper Mustang — Nepal — 11 days — Moderate
- Bhutan Mountain & Culture — Bhutan — 9 days — Easy–Moderate
- Tibet High Plateau — Tibet — 12 days — Moderate
- Ladakh High Altitude — India — 10 days — Moderate
- Kailash Mansarovar Journey — Tibet — 15 days — Moderate

Important rules:
- If the traveler gives too little information, ask 1–3 useful follow-up questions.
- If discussing altitude, trekking difficulty, permits, visas, border restrictions, or current conditions, clearly state that final details must be verified before booking.
- Do not claim live weather or live availability unless the website separately provides it.
- Do not provide medical diagnosis.
- Encourage proper acclimatization for high-altitude trips.
- If the user appears ready to book, recommend using the booking form.
`;

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
        body: JSON.stringify({
          model: "gpt-5.6-luna",
          instructions:
            systemPrompt,
          input: message,
          max_output_tokens: 1200,
        }),
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

    let answer = "";

    if (
      typeof result.output_text ===
      "string"
    ) {
      answer =
        result.output_text.trim();
    }

    if (
      !answer &&
      Array.isArray(
        result.output
      )
    ) {
      for (const item of result.output) {
        if (
          !Array.isArray(
            item?.content
          )
        ) {
          continue;
        }

        for (
          const content of
            item.content
        ) {
          if (
            content?.type ===
              "output_text" &&
            typeof content.text ===
              "string"
          ) {
            answer +=
              content.text;
          }
        }
      }

      answer =
        answer.trim();
    }

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

    return NextResponse.json({
      ok: true,
      answer,
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

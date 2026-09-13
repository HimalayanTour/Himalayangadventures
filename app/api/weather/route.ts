import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const lat =
    url.searchParams.get("lat") || "27.9881";

  const lng =
    url.searchParams.get("lng") || "86.9250";

  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}` +
    `&longitude=${lng}` +
    `&current=temperature_2m,precipitation,wind_speed_10m,weather_code` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code` +
    `&timezone=auto` +
    `&forecast_days=7`;

  try {
    const response = await fetch(weatherUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            "Weather service unavailable",
        },
        {
          status: 502,
        }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      "Weather API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Weather service unavailable",
      },
      {
        status: 502,
      }
    );
  }
}

"use client";

import { useState } from "react";

type WeatherData = {
  current?: {
    temperature_2m?: number;
    precipitation?: number;
    wind_speed_10m?: number;
    weather_code?: number;
  };
  current_units?: {
    temperature_2m?: string;
    precipitation?: string;
    wind_speed_10m?: string;
  };
  daily?: {
    time?: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: number[];
    weather_code?: number[];
  };
  daily_units?: {
    temperature_2m_max?: string;
    temperature_2m_min?: string;
    precipitation_probability_max?: string;
  };
  timezone?: string;
  error?: string;
};

type LocationOption = {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  note: string;
};

const locations: LocationOption[] = [
  {
    id: "everest",
    name: "Everest Region",
    region: "Nepal",
    lat: 27.9881,
    lng: 86.925,
    note: "Useful for Everest Base Camp planning and high-altitude conditions.",
  },
  {
    id: "annapurna",
    name: "Annapurna Region",
    region: "Nepal",
    lat: 28.596,
    lng: 83.82,
    note: "Useful for Annapurna trekking conditions and mountain weather.",
  },
  {
    id: "langtang",
    name: "Langtang Region",
    region: "Nepal",
    lat: 28.211,
    lng: 85.568,
    note: "Useful for Langtang Valley planning and short-term weather checks.",
  },
  {
    id: "bhutan",
    name: "Paro / Bhutan",
    region: "Bhutan",
    lat: 27.43,
    lng: 89.416,
    note: "A useful reference point for Bhutan mountain and cultural journeys.",
  },
  {
    id: "lhasa",
    name: "Lhasa / Tibet",
    region: "Tibet",
    lat: 29.652,
    lng: 91.172,
    note: "A useful reference point for Tibet high-plateau travel.",
  },
  {
    id: "ladakh",
    name: "Leh / Ladakh",
    region: "India",
    lat: 34.1526,
    lng: 77.5771,
    note: "A useful reference point for Ladakh high-altitude journeys.",
  },
];

function weatherLabel(code?: number) {
  if (code === undefined) return "Unknown";

  if (code === 0) return "Clear sky";
  if ([1, 2].includes(code)) return "Mostly clear";
  if (code === 3) return "Overcast";
  if ([45, 48].includes(code)) return "Fog";
  if ([51, 53, 55].includes(code)) return "Drizzle";
  if ([61, 63, 65].includes(code)) return "Rain";
  if ([71, 73, 75, 77].includes(code)) return "Snow";
  if ([80, 81, 82].includes(code)) return "Rain showers";
  if ([85, 86].includes(code)) return "Snow showers";
  if ([95, 96, 99].includes(code)) return "Thunderstorms";

  return "Variable conditions";
}

function formatDate(date?: string) {
  if (!date) return "";

  const parsed = new Date(`${date}T00:00:00`);

  return parsed.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function WeatherConditionsPage() {
  const [selectedId, setSelectedId] =
    useState("everest");

  const [data, setData] =
    useState<WeatherData | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const selectedLocation =
    locations.find(
      (location) =>
        location.id === selectedId
    ) || locations[0];

  async function loadWeather() {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch(
        `/api/weather?lat=${selectedLocation.lat}&lng=${selectedLocation.lng}`
      );

      const result =
        (await response.json()) as WeatherData;

      if (!response.ok || result.error) {
        setError(
          result.error ||
            "Weather information could not be loaded."
        );
        return;
      }

      setData(result);
    } catch (error) {
      console.error(
        "Weather request failed:",
        error
      );

      setError(
        "Weather information could not be loaded."
      );
    } finally {
      setLoading(false);
    }
  }

  const forecastDays =
    data?.daily?.time || [];

  return (
    <main
      className="container"
      style={{
        paddingTop: 54,
        paddingBottom: 90,
      }}
    >
      <section
        className="card"
        style={{
          marginBottom: 24,
        }}
      >
        <span className="pill">
          LIVE WEATHER
        </span>

        <h1
          style={{
            marginTop: 16,
            fontSize:
              "clamp(40px, 7vw, 76px)",
            lineHeight: 1,
            maxWidth: 980,
          }}
        >
          Weather & Himalayan conditions
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            fontSize: 18,
            lineHeight: 1.7,
            marginTop: 18,
          }}
        >
          Check live weather and a
          7-day forecast for key
          Himalayan regions. Use this
          as a planning reference,
          not as a replacement for
          official advisories or
          local guide reports.
        </p>
      </section>

      <section className="card">
        <span className="pill">
          SELECT REGION
        </span>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
            marginTop: 20,
          }}
        >
          {locations.map((location) => {
            const active =
              selectedId === location.id;

            return (
              <button
                key={location.id}
                type="button"
                onClick={() => {
                  setSelectedId(
                    location.id
                  );
                  setData(null);
                  setError("");
                }}
                style={{
                  textAlign: "left",
                  padding: 16,
                  borderRadius: 16,
                  border: active
                    ? "1px solid rgba(93,229,201,0.75)"
                    : "1px solid rgba(255,255,255,0.10)",
                  background: active
                    ? "rgba(93,229,201,0.12)"
                    : "rgba(255,255,255,0.035)",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <strong
                  style={{
                    display: "block",
                  }}
                >
                  {location.name}
                </strong>

                <span
                  className="muted"
                  style={{
                    display: "block",
                    marginTop: 6,
                    fontSize: 14,
                  }}
                >
                  {location.region}
                </span>
              </button>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 20,
          }}
        >
          <button
            className="btn"
            type="button"
            onClick={loadWeather}
            disabled={loading}
          >
            {loading
              ? "Loading weather..."
              : `Load ${selectedLocation.name} forecast`}
          </button>
        </div>

        <p
          className="muted"
          style={{
            marginTop: 16,
            marginBottom: 0,
            lineHeight: 1.6,
          }}
        >
          {selectedLocation.note}
        </p>
      </section>

      {error && (
        <section
          className="card"
          style={{
            marginTop: 24,
          }}
        >
          <div className="notice">
            {error}
          </div>
        </section>
      )}

      {data && (
        <>
          <section
            className="card"
            style={{
              marginTop: 24,
            }}
          >
            <span className="pill">
              CURRENT CONDITIONS
            </span>

            <h2
              style={{
                marginTop: 14,
              }}
            >
              {selectedLocation.name}
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 16,
                marginTop: 20,
              }}
            >
              <ConditionCard
                label="Temperature"
                value={
                  data.current
                    ?.temperature_2m !==
                  undefined
                    ? `${data.current.temperature_2m}${data.current_units?.temperature_2m || "°C"}`
                    : "Unavailable"
                }
              />

              <ConditionCard
                label="Conditions"
                value={weatherLabel(
                  data.current
                    ?.weather_code
                )}
              />

              <ConditionCard
                label="Wind"
                value={
                  data.current
                    ?.wind_speed_10m !==
                  undefined
                    ? `${data.current.wind_speed_10m} ${data.current_units?.wind_speed_10m || "km/h"}`
                    : "Unavailable"
                }
              />

              <ConditionCard
                label="Precipitation"
                value={
                  data.current
                    ?.precipitation !==
                  undefined
                    ? `${data.current.precipitation}${data.current_units?.precipitation || " mm"}`
                    : "Unavailable"
                }
              />
            </div>

            {data.timezone && (
              <p
                className="muted"
                style={{
                  marginTop: 18,
                  marginBottom: 0,
                  fontSize: 14,
                }}
              >
                Forecast timezone:{" "}
                {data.timezone}
              </p>
            )}
          </section>

          <section
            className="card"
            style={{
              marginTop: 24,
              overflowX: "auto",
            }}
          >
            <span className="pill">
              7-DAY FORECAST
            </span>

            <h2
              style={{
                marginTop: 14,
              }}
            >
              Planning outlook
            </h2>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: 760,
                marginTop: 22,
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>
                    Day
                  </th>

                  <th style={thStyle}>
                    Conditions
                  </th>

                  <th style={thStyle}>
                    High
                  </th>

                  <th style={thStyle}>
                    Low
                  </th>

                  <th style={thStyle}>
                    Rain / snow chance
                  </th>
                </tr>
              </thead>

              <tbody>
                {forecastDays.map(
                  (date, index) => (
                    <tr key={date}>
                      <td style={tdStyle}>
                        {formatDate(date)}
                      </td>

                      <td style={tdStyle}>
                        {weatherLabel(
                          data.daily
                            ?.weather_code?.[
                            index
                          ]
                        )}
                      </td>

                      <td style={tdStyle}>
                        {data.daily
                          ?.temperature_2m_max?.[
                          index
                        ] !== undefined
                          ? `${data.daily.temperature_2m_max[index]}${data.daily_units?.temperature_2m_max || "°C"}`
                          : "—"}
                      </td>

                      <td style={tdStyle}>
                        {data.daily
                          ?.temperature_2m_min?.[
                          index
                        ] !== undefined
                          ? `${data.daily.temperature_2m_min[index]}${data.daily_units?.temperature_2m_min || "°C"}`
                          : "—"}
                      </td>

                      <td style={tdStyle}>
                        {data.daily
                          ?.precipitation_probability_max?.[
                          index
                        ] !== undefined
                          ? `${data.daily.precipitation_probability_max[index]}${data.daily_units?.precipitation_probability_max || "%"}`
                          : "—"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </section>

          <section
            className="card"
            style={{
              marginTop: 24,
            }}
          >
            <span className="pill">
              SAFETY NOTE
            </span>

            <h2
              style={{
                marginTop: 14,
              }}
            >
              Mountain weather can change quickly
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 900,
                lineHeight: 1.7,
              }}
            >
              Forecasts are useful for
              planning, but Himalayan
              weather can change quickly,
              especially at altitude.
              Always confirm trail,
              avalanche, road, flight,
              border and local access
              conditions with official
              sources and experienced
              local guides before travel.
            </p>
          </section>
        </>
      )}
    </main>
  );
}

function ConditionCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        padding: 18,
        borderRadius: 16,
        border:
          "1px solid rgba(255,255,255,0.10)",
        background:
          "rgba(255,255,255,0.03)",
      }}
    >
      <span
        className="muted"
        style={{
          fontSize: 14,
        }}
      >
        {label}
      </span>

      <strong
        style={{
          display: "block",
          marginTop: 8,
          fontSize: 22,
        }}
      >
        {value}
      </strong>
    </div>
  );
}

const thStyle = {
  textAlign: "left" as const,
  padding: "14px 16px",
  borderBottom:
    "1px solid rgba(255,255,255,0.16)",
};

const tdStyle = {
  padding: "15px 16px",
  borderBottom:
    "1px solid rgba(255,255,255,0.08)",
  verticalAlign: "top" as const,
};

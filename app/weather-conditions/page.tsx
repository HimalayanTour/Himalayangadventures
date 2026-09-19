"use client";

import { useCallback, useEffect, useState } from "react";

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

function weatherSymbol(code?: number) {
  if (code === 0) return "☀";
  if ([1, 2].includes(code ?? -1)) return "◐";
  if (code === 3) return "☁";
  if ([45, 48].includes(code ?? -1)) return "≋";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code ?? -1)) {
    return "☂";
  }
  if ([71, 73, 75, 77, 85, 86].includes(code ?? -1)) return "❄";
  if ([95, 96, 99].includes(code ?? -1)) return "ϟ";

  return "○";
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
  const [selectedId, setSelectedId] = useState("everest");
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selectedLocation =
    locations.find((location) => location.id === selectedId) || locations[0];

  const loadWeather = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/weather?lat=${selectedLocation.lat}&lng=${selectedLocation.lng}`,
        {
          cache: "no-store",
        }
      );

      const result = (await response.json()) as WeatherData;

      if (!response.ok || result.error) {
        setData(null);
        setError(
          result.error || "Weather information could not be loaded."
        );
        return;
      }

      setData(result);
    } catch (requestError) {
      console.error("Weather request failed:", requestError);

      setData(null);
      setError("Weather information could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [selectedLocation.lat, selectedLocation.lng]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  const forecastDays = data?.daily?.time || [];

  return (
    <main>
      {/* HERO */}
      <section
        style={{
          padding: "clamp(58px, 8vw, 100px) 0 48px",
          background:
            "radial-gradient(circle at 75% 10%, rgba(109,224,194,.13), transparent 32%)",
        }}
      >
        <div className="container">
          <div
            className="eyebrow"
            style={{
              marginBottom: 16,
              letterSpacing: ".18em",
            }}
          >
            LIVE HIMALAYAN CONDITIONS
          </div>

          <h1
            style={{
              fontSize: "clamp(48px, 8vw, 88px)",
              lineHeight: 0.94,
              letterSpacing: "-.055em",
              maxWidth: 1000,
              margin: 0,
            }}
          >
            Know the mountains
            <br />
            before you go.
          </h1>

          <p
            className="muted"
            style={{
              maxWidth: 820,
              fontSize: 18,
              lineHeight: 1.8,
              marginTop: 24,
              marginBottom: 0,
            }}
          >
            Explore current weather and a seven-day planning outlook for key
            Himalayan regions across Nepal, Bhutan, Tibet and Ladakh.
          </p>
        </div>
      </section>

      {/* LOCATION SELECTOR */}
      <section className="section">
        <div className="container">
          <div
            className="eyebrow"
            style={{
              marginBottom: 14,
              letterSpacing: ".15em",
            }}
          >
            SELECT A REGION
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 12,
            }}
          >
            {locations.map((location) => {
              const active = selectedId === location.id;

              return (
                <button
                  key={location.id}
                  type="button"
                  onClick={() => setSelectedId(location.id)}
                  aria-pressed={active}
                  style={{
                    textAlign: "left",
                    minHeight: 100,
                    padding: "17px",
                    borderRadius: 17,
                    border: active
                      ? "1px solid rgba(109,224,194,.75)"
                      : "1px solid rgba(255,255,255,.09)",
                    background: active
                      ? "linear-gradient(145deg, rgba(109,224,194,.16), rgba(109,224,194,.06))"
                      : "rgba(255,255,255,.035)",
                    color: "inherit",
                    cursor: "pointer",
                    transition:
                      "border-color .2s ease, background .2s ease, transform .2s ease",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      color: active ? "#6de0c2" : "#8fa5aa",
                      fontSize: 10,
                      fontWeight: 900,
                      letterSpacing: ".13em",
                      marginBottom: 8,
                    }}
                  >
                    {location.region.toUpperCase()}
                  </span>

                  <strong
                    style={{
                      display: "block",
                      fontSize: 16,
                    }}
                  >
                    {location.name}
                  </strong>
                </button>
              );
            })}
          </div>

          <p
            className="muted"
            style={{
              marginTop: 18,
              marginBottom: 0,
              lineHeight: 1.7,
            }}
          >
            {selectedLocation.note}
          </p>
        </div>
      </section>

      {/* LOADING */}
      {loading && (
        <section className="section">
          <div className="container">
            <div
              className="card"
              style={{
                minHeight: 220,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 36,
                    marginBottom: 14,
                  }}
                >
                  ◌
                </div>

                <strong>Loading live conditions...</strong>

                <p
                  className="muted"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  Checking {selectedLocation.name}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ERROR */}
      {!loading && error && (
        <section className="section">
          <div className="container">
            <div className="card">
              <div className="notice">{error}</div>

              <button
                className="btn"
                type="button"
                onClick={loadWeather}
                style={{
                  marginTop: 18,
                }}
              >
                Try again
              </button>
            </div>
          </div>
        </section>
      )}

      {/* WEATHER DASHBOARD */}
      {!loading && data && (
        <>
          <section className="section">
            <div className="container">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 18,
                  alignItems: "stretch",
                }}
              >
                {/* MAIN CURRENT WEATHER */}
                <div
                  className="card"
                  style={{
                    padding: "clamp(26px, 4vw, 42px)",
                    background:
                      "radial-gradient(circle at 85% 10%, rgba(109,224,194,.18), transparent 35%), linear-gradient(145deg, rgba(19,55,62,.96), rgba(10,28,35,.98))",
                  }}
                >
                  <div
                    className="eyebrow"
                    style={{ marginBottom: 14 }}
                  >
                    CURRENT CONDITIONS
                  </div>

                  <h2
                    style={{
                      fontSize: "clamp(30px, 4vw, 44px)",
                      marginTop: 0,
                      marginBottom: 28,
                    }}
                  >
                    {selectedLocation.name}
                  </h2>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 22,
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        fontSize: "clamp(54px, 8vw, 86px)",
                        lineHeight: 1,
                        color: "#6de0c2",
                      }}
                    >
                      {weatherSymbol(data.current?.weather_code)}
                    </div>

                    <div>
                      <strong
                        style={{
                          display: "block",
                          fontSize: "clamp(52px, 8vw, 84px)",
                          lineHeight: 0.9,
                          letterSpacing: "-.055em",
                        }}
                      >
                        {data.current?.temperature_2m !== undefined
                          ? `${data.current.temperature_2m}${data.current_units?.temperature_2m || "°C"}`
                          : "—"}
                      </strong>

                      <span
                        className="muted"
                        style={{
                          display: "block",
                          marginTop: 12,
                          fontSize: 17,
                        }}
                      >
                        {weatherLabel(data.current?.weather_code)}
                      </span>
                    </div>
                  </div>

                  {data.timezone && (
                    <p
                      className="muted"
                      style={{
                        marginTop: 30,
                        marginBottom: 0,
                        fontSize: 13,
                      }}
                    >
                      Forecast timezone: {data.timezone}
                    </p>
                  )}
                </div>

                {/* CURRENT DETAILS */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(2, minmax(0, 1fr))",
                    gap: 14,
                  }}
                >
                  <ConditionCard
                    label="Wind"
                    value={
                      data.current?.wind_speed_10m !== undefined
                        ? `${data.current.wind_speed_10m} ${
                            data.current_units?.wind_speed_10m || "km/h"
                          }`
                        : "Unavailable"
                    }
                  />

                  <ConditionCard
                    label="Precipitation"
                    value={
                      data.current?.precipitation !== undefined
                        ? `${data.current.precipitation}${
                            data.current_units?.precipitation || " mm"
                          }`
                        : "Unavailable"
                    }
                  />

                  <ConditionCard
                    label="Weather"
                    value={weatherLabel(data.current?.weather_code)}
                  />

                  <ConditionCard
                    label="Region"
                    value={selectedLocation.region}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 7 DAY FORECAST */}
          <section className="section">
            <div className="container">
              <div
                className="eyebrow"
                style={{
                  marginBottom: 14,
                  letterSpacing: ".15em",
                }}
              >
                SEVEN-DAY OUTLOOK
              </div>

              <h2
                style={{
                  fontSize: "clamp(36px, 5vw, 54px)",
                  marginTop: 0,
                  marginBottom: 14,
                }}
              >
                Plan for changing conditions.
              </h2>

              <p
                className="muted"
                style={{
                  maxWidth: 760,
                  lineHeight: 1.8,
                  marginBottom: 28,
                }}
              >
                Use the forecast as an early planning reference. Conditions at
                higher elevations can differ significantly from regional
                forecasts.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(145px, 1fr))",
                  gap: 12,
                }}
              >
                {forecastDays.map((date, index) => (
                  <div
                    className="card"
                    key={date}
                    style={{
                      padding: 18,
                    }}
                  >
                    <strong
                      style={{
                        display: "block",
                        fontSize: 15,
                      }}
                    >
                      {formatDate(date)}
                    </strong>

                    <div
                      aria-hidden="true"
                      style={{
                        color: "#6de0c2",
                        fontSize: 34,
                        marginTop: 18,
                        marginBottom: 10,
                      }}
                    >
                      {weatherSymbol(
                        data.daily?.weather_code?.[index]
                      )}
                    </div>

                    <div
                      className="muted"
                      style={{
                        minHeight: 42,
                        fontSize: 13,
                        lineHeight: 1.5,
                      }}
                    >
                      {weatherLabel(
                        data.daily?.weather_code?.[index]
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        marginTop: 15,
                        alignItems: "baseline",
                      }}
                    >
                      <strong
                        style={{
                          fontSize: 20,
                        }}
                      >
                        {data.daily?.temperature_2m_max?.[index] !==
                        undefined
                          ? `${data.daily.temperature_2m_max[index]}${
                              data.daily_units?.temperature_2m_max || "°C"
                            }`
                          : "—"}
                      </strong>

                      <span className="muted">
                        /
                        {data.daily?.temperature_2m_min?.[index] !==
                        undefined
                          ? ` ${data.daily.temperature_2m_min[index]}${
                              data.daily_units?.temperature_2m_min || "°C"
                            }`
                          : " —"}
                      </span>
                    </div>

                    <div
                      className="muted"
                      style={{
                        borderTop:
                          "1px solid rgba(255,255,255,.08)",
                        marginTop: 15,
                        paddingTop: 12,
                        fontSize: 12,
                      }}
                    >
                      Precipitation{" "}
                      <strong
                        style={{
                          color: "#eef6f7",
                        }}
                      >
                        {data.daily
                          ?.precipitation_probability_max?.[index] !==
                        undefined
                          ? `${data.daily.precipitation_probability_max[index]}${
                              data.daily_units
                                ?.precipitation_probability_max || "%"
                            }`
                          : "—"}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* SAFETY */}
      <section className="section">
        <div className="container">
          <div
            className="card"
            style={{
              padding: "clamp(28px, 5vw, 48px)",
              background:
                "linear-gradient(135deg, rgba(20,52,58,.9), rgba(9,27,34,.96))",
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 14,
                letterSpacing: ".15em",
              }}
            >
              MOUNTAIN REALITY
            </div>

            <h2
              style={{
                fontSize: "clamp(34px, 5vw, 50px)",
                maxWidth: 760,
                marginTop: 0,
                marginBottom: 16,
              }}
            >
              Weather is information,
              <br />
              not a guarantee.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 900,
                lineHeight: 1.8,
                marginBottom: 0,
              }}
            >
              Himalayan weather can change quickly, especially at altitude.
              Forecasts should not replace official safety information or
              experienced local guidance. Before travel, confirm trail,
              avalanche, road, flight, border and local access conditions with
              appropriate official sources and local professionals.
            </p>
          </div>
        </div>
      </section>
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
      className="card"
      style={{
        minHeight: 150,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <span
        className="eyebrow"
        style={{
          fontSize: 10,
          letterSpacing: ".12em",
        }}
      >
        {label}
      </span>

      <strong
        style={{
          display: "block",
          marginTop: 18,
          fontSize: "clamp(19px, 3vw, 27px)",
          lineHeight: 1.2,
        }}
      >
        {value}
      </strong>
    </div>
  );
}

 "use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type IntentOption = {
  id: string;
  label: string;
  description: string;
};

type TourMatch = {
  name: string;
  slug: string;
  destination: string;
  duration: string;
  difficulty: string;
  reason: string;
  tags: string[];
};

const moods: IntentOption[] = [
  {
    id: "quiet",
    label: "Quiet & Scenic",
    description:
      "Peaceful landscapes, slower travel and fewer crowds.",
  },
  {
    id: "adventure",
    label: "Adventure & Challenge",
    description:
      "High mountains, trekking and a strong sense of achievement.",
  },
  {
    id: "culture",
    label: "Culture & Heritage",
    description:
      "Monasteries, villages, traditions and local history.",
  },
  {
    id: "spiritual",
    label: "Spiritual & Reflective",
    description:
      "Sacred places, monasteries and meaningful journeys.",
  },
  {
    id: "luxury",
    label: "Comfort & Luxury",
    description:
      "Beautiful scenery with a more comfortable travel style.",
  },
  {
    id: "photography",
    label: "Photography",
    description:
      "Dramatic landscapes, culture and time for photography.",
  },
];

const difficultyOptions = [
  {
    id: "easy",
    label: "Easy",
  },
  {
    id: "moderate",
    label: "Moderate",
  },
  {
    id: "challenging",
    label: "Challenging",
  },
];

const durationOptions = [
  {
    id: "short",
    label: "Up to 9 days",
  },
  {
    id: "medium",
    label: "10–12 days",
  },
  {
    id: "long",
    label: "13+ days",
  },
];

const tours: TourMatch[] = [
  {
    name: "Everest Base Camp",
    slug: "everest-base-camp",
    destination: "Nepal",
    duration: "14 days",
    difficulty: "Challenging",
    reason:
      "A classic choice for travelers seeking adventure, iconic mountain scenery and a major trekking achievement.",
    tags: [
      "adventure",
      "photography",
      "challenging",
      "long",
    ],
  },
  {
    name: "Annapurna Classic",
    slug: "annapurna-classic",
    destination: "Nepal",
    duration: "10 days",
    difficulty: "Moderate",
    reason:
      "A balanced Himalayan journey combining scenery, villages and approachable trekking.",
    tags: [
      "quiet",
      "adventure",
      "culture",
      "photography",
      "moderate",
      "medium",
    ],
  },
  {
    name: "Langtang Valley",
    slug: "langtang-valley",
    destination: "Nepal",
    duration: "8 days",
    difficulty: "Moderate",
    reason:
      "A shorter, quieter trek with mountain scenery, villages and a more relaxed atmosphere.",
    tags: [
      "quiet",
      "culture",
      "photography",
      "moderate",
      "short",
    ],
  },
  {
    name: "Manaslu Circuit",
    slug: "manaslu-circuit",
    destination: "Nepal",
    duration: "15 days",
    difficulty: "Challenging",
    reason:
      "Ideal for experienced travelers wanting remote landscapes, fewer crowds and a demanding trek.",
    tags: [
      "quiet",
      "adventure",
      "photography",
      "challenging",
      "long",
    ],
  },
  {
    name: "Upper Mustang",
    slug: "upper-mustang",
    destination: "Nepal",
    duration: "11 days",
    difficulty: "Moderate",
    reason:
      "A distinctive journey through dramatic landscapes, ancient settlements and Tibetan-influenced culture.",
    tags: [
      "quiet",
      "culture",
      "spiritual",
      "photography",
      "moderate",
      "medium",
    ],
  },
  {
    name: "Bhutan Mountain & Culture",
    slug: "bhutan-mountain-culture",
    destination: "Bhutan",
    duration: "9 days",
    difficulty: "Easy–Moderate",
    reason:
      "A strong match for culture, spirituality, mountain scenery and a more comfortable pace.",
    tags: [
      "quiet",
      "culture",
      "spiritual",
      "luxury",
      "photography",
      "easy",
      "short",
    ],
  },
  {
    name: "Tibet High Plateau",
    slug: "tibet-high-plateau",
    destination: "Tibet",
    duration: "12 days",
    difficulty: "Moderate",
    reason:
      "A high-altitude cultural journey with monasteries, dramatic plateau landscapes and strong photography potential.",
    tags: [
      "culture",
      "spiritual",
      "photography",
      "moderate",
      "medium",
    ],
  },
  {
    name: "Ladakh High Altitude",
    slug: "ladakh-high-altitude",
    destination: "India",
    duration: "10 days",
    difficulty: "Moderate",
    reason:
      "Excellent for mountain scenery, Buddhist culture, photography and high-altitude exploration.",
    tags: [
      "adventure",
      "culture",
      "spiritual",
      "photography",
      "moderate",
      "medium",
    ],
  },
  {
    name: "Kailash Mansarovar Journey",
    slug: "kailash-mansarovar-journey",
    destination: "Tibet",
    duration: "15 days",
    difficulty: "Moderate",
    reason:
      "Best suited to travelers seeking a meaningful spiritual journey through one of the Himalaya’s most sacred regions.",
    tags: [
      "spiritual",
      "culture",
      "quiet",
      "moderate",
      "long",
    ],
  },
];

export default function TravelIntentPage() {
  const [mood, setMood] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [showResults, setShowResults] =
    useState(false);

  const matches = useMemo(() => {
    if (!showResults) return [];

    return tours
      .map((tour) => {
        let score = 0;

        if (mood && tour.tags.includes(mood)) {
          score += 3;
        }

        if (
          difficulty &&
          tour.tags.includes(difficulty)
        ) {
          score += 2;
        }

        if (
          duration &&
          tour.tags.includes(duration)
        ) {
          score += 2;
        }

        return {
          ...tour,
          score,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [
    mood,
    difficulty,
    duration,
    showResults,
  ]);

  function handleFindMatch() {
    if (!mood && !difficulty && !duration) {
      return;
    }

    setShowResults(true);
  }

  function resetPlanner() {
    setMood("");
    setDifficulty("");
    setDuration("");
    setShowResults(false);
  }

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
          TRAVEL INTENT
        </span>

        <h1
          style={{
            marginTop: 16,
            fontSize:
              "clamp(40px, 7vw, 76px)",
            lineHeight: 1,
            maxWidth: 950,
          }}
        >
          Start with how you want to feel.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 780,
            fontSize: 18,
            lineHeight: 1.7,
            marginTop: 18,
          }}
        >
          You do not need to know the name of
          a trek. Tell us the experience you
          want, your preferred difficulty and
          how much time you have. Himalayan26
          will suggest the journeys that fit
          you best.
        </p>
      </section>

      <section className="card">
        <span className="pill">
          STEP 1
        </span>

        <h2
          style={{
            marginTop: 14,
          }}
        >
          What kind of experience do you want?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
            marginTop: 20,
          }}
        >
          {moods.map((option) => {
            const active =
              mood === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setMood(option.id);
                  setShowResults(false);
                }}
                style={{
                  textAlign: "left",
                  padding: 18,
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
                    fontSize: 16,
                  }}
                >
                  {option.label}
                </strong>

                <span
                  className="muted"
                  style={{
                    display: "block",
                    marginTop: 8,
                    lineHeight: 1.5,
                  }}
                >
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section
        className="card"
        style={{
          marginTop: 24,
        }}
      >
        <span className="pill">
          STEP 2
        </span>

        <h2
          style={{
            marginTop: 14,
          }}
        >
          How challenging should it feel?
        </h2>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 18,
          }}
        >
          {difficultyOptions.map(
            (option) => {
              const active =
                difficulty === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setDifficulty(
                      option.id
                    );
                    setShowResults(false);
                  }}
                  style={{
                    padding: "12px 18px",
                    borderRadius: 999,
                    border: active
                      ? "1px solid rgba(93,229,201,0.75)"
                      : "1px solid rgba(255,255,255,0.12)",
                    background: active
                      ? "rgba(93,229,201,0.12)"
                      : "rgba(255,255,255,0.035)",
                    color: "inherit",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  {option.label}
                </button>
              );
            }
          )}
        </div>
      </section>

      <section
        className="card"
        style={{
          marginTop: 24,
        }}
      >
        <span className="pill">
          STEP 3
        </span>

        <h2
          style={{
            marginTop: 14,
          }}
        >
          How much time do you have?
        </h2>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 18,
          }}
        >
          {durationOptions.map(
            (option) => {
              const active =
                duration === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setDuration(option.id);
                    setShowResults(false);
                  }}
                  style={{
                    padding: "12px 18px",
                    borderRadius: 999,
                    border: active
                      ? "1px solid rgba(93,229,201,0.75)"
                      : "1px solid rgba(255,255,255,0.12)",
                    background: active
                      ? "rgba(93,229,201,0.12)"
                      : "rgba(255,255,255,0.035)",
                    color: "inherit",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  {option.label}
                </button>
              );
            }
          )}
        </div>
      </section>

      <section
        className="card"
        style={{
          marginTop: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <button
            className="btn"
            type="button"
            onClick={handleFindMatch}
            disabled={
              !mood &&
              !difficulty &&
              !duration
            }
          >
            Find my best journeys
          </button>

          <button
            type="button"
            onClick={resetPlanner}
            style={{
              padding: "12px 18px",
              borderRadius: 12,
              border:
                "1px solid rgba(255,255,255,0.12)",
              background:
                "rgba(255,255,255,0.035)",
              color: "inherit",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {showResults && (
        <section
          className="card"
          style={{
            marginTop: 24,
          }}
        >
          <span className="pill">
            YOUR MATCHES
          </span>

          <h2
            style={{
              marginTop: 14,
            }}
          >
            Journeys that match your intent
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 760,
              lineHeight: 1.7,
            }}
          >
            These recommendations are based
            on the experience, difficulty and
            duration you selected.
          </p>

          <div
            style={{
              display: "grid",
              gap: 18,
              marginTop: 24,
            }}
          >
            {matches.map(
              (tour, index) => (
                <article
                  key={tour.slug}
                  style={{
                    padding: 20,
                    borderRadius: 18,
                    border:
                      index === 0
                        ? "1px solid rgba(93,229,201,0.55)"
                        : "1px solid rgba(255,255,255,0.10)",
                    background:
                      index === 0
                        ? "rgba(93,229,201,0.08)"
                        : "rgba(255,255,255,0.025)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                      alignItems:
                        "center",
                    }}
                  >
                    {index === 0 && (
                      <span className="pill">
                        BEST MATCH
                      </span>
                    )}

                    <span
                      className="muted"
                      style={{
                        fontSize: 14,
                      }}
                    >
                      {tour.destination}
                    </span>
                  </div>

                  <h3
                    style={{
                      marginTop: 14,
                      marginBottom: 8,
                      fontSize: 24,
                    }}
                  >
                    {tour.name}
                  </h3>

                  <p
                    style={{
                      marginTop: 0,
                      fontWeight: 700,
                    }}
                  >
                    {tour.duration} ·{" "}
                    {tour.difficulty}
                  </p>

                  <p
                    className="muted"
                    style={{
                      lineHeight: 1.7,
                      maxWidth: 820,
                    }}
                  >
                    {tour.reason}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      flexWrap: "wrap",
                      marginTop: 18,
                    }}
                  >
                    <Link
                      className="btn"
                      href={`/tours/${tour.slug}`}
                    >
                      View this tour
                    </Link>

                    <Link
                      className="btn alt"
                      href="/ai-trip-planner"
                    >
                      Refine with AI
                    </Link>
                  </div>
                </article>
              )
            )}
          </div>
        </section>
      )}

      <section
        className="card"
        style={{
          marginTop: 24,
        }}
      >
        <span className="pill">
          WANT SOMETHING DIFFERENT?
        </span>

        <h2
          style={{
            marginTop: 14,
          }}
        >
          Turn your intent into a custom journey
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            lineHeight: 1.7,
          }}
        >
          If none of these journeys feels
          exactly right, our AI planner can
          help refine the trip or you can
          request a custom Himalayan journey.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 18,
          }}
        >
          <Link
            className="btn"
            href="/ai-trip-planner"
          >
            Ask the AI planner
          </Link>

          <Link
            className="btn alt"
            href="/contact-book"
          >
            Request a custom trip
          </Link>
        </div>
      </section>
    </main>
  );
}

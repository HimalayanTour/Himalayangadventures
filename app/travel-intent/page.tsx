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
      "Wide plateau landscapes, slower pacing and time to absorb Tibet.",
  },
  {
    id: "adventure",
    label: "Adventure & Challenge",
    description:
      "High-altitude routes, remote landscapes and physically demanding experiences.",
  },
  {
    id: "culture",
    label: "Culture & Heritage",
    description:
      "Historic towns, monasteries, traditions and Tibetan cultural experiences.",
  },
  {
    id: "spiritual",
    label: "Spiritual & Reflective",
    description:
      "Sacred landscapes, monasteries, pilgrimage traditions and meaningful travel.",
  },
  {
    id: "comfort",
    label: "Comfort & Pace",
    description:
      "A more measured Tibet journey with comfortable accommodation and sensible pacing.",
  },
  {
    id: "photography",
    label: "Photography",
    description:
      "Plateau landscapes, architecture, culture and more time for photography.",
  },
];

const difficultyOptions = [
  {
    id: "easy",
    label: "Easy–Moderate",
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
    label: "Up to 7 days",
  },
  {
    id: "medium",
    label: "8–12 days",
  },
  {
    id: "long",
    label: "13+ days",
  },
];

const tours: TourMatch[] = [
  {
    name: "Lhasa Classic Journey",
    slug: "lhasa-classic",
    destination: "Tibet",
    duration: "5 days",
    difficulty: "Easy–Moderate",
    reason:
      "A focused introduction to Lhasa for travelers interested in Tibetan culture, monasteries and a shorter journey with measured pacing.",
    tags: [
      "culture",
      "spiritual",
      "comfort",
      "easy",
      "short",
    ],
  },
  {
    name: "Lhasa to Everest Base Camp",
    slug: "lhasa-everest-base-camp",
    destination: "Tibet",
    duration: "8 days",
    difficulty: "Moderate",
    reason:
      "A strong choice for travelers drawn to Everest, dramatic Himalayan scenery, central Tibet and a more adventurous high-altitude route.",
    tags: [
      "adventure",
      "photography",
      "culture",
      "moderate",
      "medium",
    ],
  },
  {
    name: "Lhasa, Gyantse & Shigatse",
    slug: "lhasa-shigatse-gyantse",
    destination: "Tibet",
    duration: "7 days",
    difficulty: "Easy–Moderate",
    reason:
      "A balanced cultural journey through Lhasa and central Tibet with historic towns, monasteries and beautiful overland scenery.",
    tags: [
      "culture",
      "spiritual",
      "photography",
      "comfort",
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
      "Designed for travelers who want more time with Tibet's expansive plateau landscapes, culture and high-altitude environment.",
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
    name: "Kailash & Mansarovar Journey",
    slug: "kailash-mansarovar-journey",
    destination: "Tibet",
    duration: "15 days",
    difficulty: "Moderate",
    reason:
      "A longer western Tibet journey centered on sacred landscapes, Mount Kailash and Lake Manasarovar for travelers seeking reflection and pilgrimage context.",
    tags: [
      "spiritual",
      "culture",
      "quiet",
      "photography",
      "moderate",
      "long",
    ],
  },
  {
    name: "Mount Kailash Kora",
    slug: "kailash-kora",
    destination: "Tibet",
    duration: "13 days",
    difficulty: "Challenging",
    reason:
      "The strongest match for travelers seeking a physically demanding, high-altitude journey centered on the Mount Kailash Kora.",
    tags: [
      "adventure",
      "spiritual",
      "culture",
      "photography",
      "challenging",
      "long",
    ],
  },
  {
    name: "Lhasa & Namtso Lake",
    slug: "namtso-lake",
    destination: "Tibet",
    duration: "7 days",
    difficulty: "Moderate",
    reason:
      "A scenic Tibet journey combining Lhasa with the dramatic high-altitude landscapes around Namtso Lake.",
    tags: [
      "quiet",
      "photography",
      "culture",
      "moderate",
      "short",
    ],
  },
  {
    name: "Tibet Photography Journey",
    slug: "tibet-photography",
    destination: "Tibet",
    duration: "10 days",
    difficulty: "Moderate",
    reason:
      "Built for travelers who want more time to photograph Tibetan landscapes, architecture, culture and everyday visual details.",
    tags: [
      "photography",
      "quiet",
      "culture",
      "comfort",
      "moderate",
      "medium",
    ],
  },
  {
    name: "Tibet Culture & Monasteries",
    slug: "tibet-culture-monasteries",
    destination: "Tibet",
    duration: "9 days",
    difficulty: "Easy–Moderate",
    reason:
      "A culture-led journey focused on Tibetan heritage, monasteries and traditions with a more measured travel style.",
    tags: [
      "culture",
      "spiritual",
      "comfort",
      "photography",
      "easy",
      "medium",
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
      {/* HERO */}
      <section
        className="card"
        style={{
          marginBottom: 24,
          padding: "clamp(28px, 5vw, 52px)",
          background:
            "radial-gradient(circle at 85% 15%, rgba(93,229,201,.12), transparent 28%), linear-gradient(145deg, rgba(17,48,56,.92), rgba(8,27,34,.97))",
        }}
      >
        <span className="pill">
          TIBET TRAVEL INTENT
        </span>

        <h1
          style={{
            marginTop: 16,
            marginBottom: 0,
            fontSize:
              "clamp(40px, 7vw, 76px)",
            lineHeight: 1,
            maxWidth: 950,
          }}
        >
          Start with how you want Tibet to feel.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 800,
            fontSize: 18,
            lineHeight: 1.7,
            marginTop: 20,
            marginBottom: 0,
          }}
        >
          You do not need to know which Tibet route is right
          for you. Choose the experience you want, your
          preferred difficulty and how much time you have.
          Himalayan26 will match you with journeys from our
          Tibet collection.
        </p>
      </section>

      {/* STEP 1 */}
      <section className="card">
        <span className="pill">
          STEP 1
        </span>

        <h2
          style={{
            marginTop: 14,
          }}
        >
          What kind of Tibet experience do you want?
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 700,
            lineHeight: 1.65,
          }}
        >
          Choose the feeling or travel style that matters most
          to you.
        </p>

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
                  minHeight: 135,
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

      {/* STEP 2 */}
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
          How challenging should your journey feel?
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 720,
            lineHeight: 1.65,
          }}
        >
          Tibet is naturally high altitude, so difficulty is
          about more than walking distance. Route altitude,
          pacing and physical activity all matter.
        </p>

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

      {/* STEP 3 */}
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

        <p
          className="muted"
          style={{
            maxWidth: 720,
            lineHeight: 1.65,
          }}
        >
          More time can allow for slower pacing, additional
          acclimatization and journeys farther across the
          Tibetan Plateau.
        </p>

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

      {/* ACTIONS */}
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
            alignItems: "center",
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
            Find my Tibet journeys
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

      {/* RESULTS */}
      {showResults && (
        <section
          className="card"
          style={{
            marginTop: 24,
          }}
        >
          <span className="pill">
            YOUR TIBET MATCHES
          </span>

          <h2
            style={{
              marginTop: 14,
            }}
          >
            Journeys that match your travel intent
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 760,
              lineHeight: 1.7,
            }}
          >
            These suggestions are based on the experience,
            difficulty and duration you selected. They are a
            starting point for planning rather than a final
            recommendation.
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
                        CLOSEST MATCH
                      </span>
                    )}

                    <span
                      className="muted"
                      style={{
                        fontSize: 14,
                      }}
                    >
                      TIBET
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
                      View this journey
                    </Link>

                    <Link
                      className="btn alt"
                      href={`/ai-trip-planner?prompt=${encodeURIComponent(
                        `Help me plan the ${tour.name} in Tibet. I am interested in this journey and want to refine the itinerary, pacing and travel style.`
                      )}`}
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

      {/* CUSTOM */}
      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(24px, 4vw, 38px)",
          background:
            "linear-gradient(135deg, rgba(19,51,58,.92), rgba(8,27,34,.97))",
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
          Turn your intent into a private Tibet journey
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            lineHeight: 1.7,
          }}
        >
          If none of these journeys feels exactly right, use
          the AI planner to refine your priorities or request
          a private Tibet journey built around your dates,
          interests and preferred pace.
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
            Plan Tibet with AI
          </Link>

          <Link
            className="btn alt"
            href="/custom-journey"
          >
            Create a private journey
          </Link>
        </div>
      </section>

      {/* PLANNING NOTE */}
      <section
        style={{
          marginTop: 24,
          padding: "0 4px",
        }}
      >
        <p
          className="muted"
          style={{
            maxWidth: 900,
            margin: 0,
            fontSize: 13,
            lineHeight: 1.7,
          }}
        >
          Journey matching is a planning tool. Final itinerary,
          travel documentation, permits, route access,
          availability, local conditions and pricing should be
          confirmed for your actual travel dates before booking.
        </p>
      </section>
    </main>
  );
}

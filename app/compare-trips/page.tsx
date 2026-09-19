"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Tour = {
  name: string;
  slug: string;
  region: string;
  duration: number;
  price: number;
  difficulty: string;
  altitude: string;
  style: string;
  bestFor: string;
};

const tours: Tour[] = [
  {
    name: "Lhasa Classic Journey",
    slug: "lhasa-classic",
    region: "Lhasa",
    duration: 5,
    price: 1290,
    difficulty: "Easy–Moderate",
    altitude: "High altitude",
    style: "Culture & introduction to Tibet",
    bestFor:
      "First-time Tibet visitors, culture and a shorter journey",
  },
  {
    name: "Lhasa to Everest Base Camp",
    slug: "lhasa-everest-base-camp",
    region: "Lhasa · Central Tibet · Everest",
    duration: 8,
    price: 1890,
    difficulty: "Moderate",
    altitude: "Very high altitude",
    style: "Culture & Himalayan landscapes",
    bestFor:
      "Everest scenery, overland travel and a more adventurous route",
  },
  {
    name: "Lhoka (Southern Tibet)",
    slug: "lhoka-southern-tibet",
    region: "Lhoka · Southern Tibet",
    duration: 7,
    price: 1590,
    difficulty: "Easy–Moderate",
    altitude: "High altitude",
    style: "Culture, valleys & heritage",
    bestFor:
      "Southern Tibet, historic places, monasteries and a quieter cultural journey",
  },
  {
    name: "Tibet High Plateau",
    slug: "tibet-high-plateau",
    region: "Tibetan Plateau",
    duration: 12,
    price: 2190,
    difficulty: "Moderate",
    altitude: "High to very high altitude",
    style: "Plateau exploration",
    bestFor:
      "Expansive landscapes, photography and a longer Tibet experience",
  },
  {
    name: "Kailash & Mansarovar Journey",
    slug: "kailash-mansarovar-journey",
    region: "Western Tibet",
    duration: 15,
    price: 2890,
    difficulty: "Moderate",
    altitude: "Very high altitude",
    style: "Sacred landscapes & pilgrimage",
    bestFor:
      "Mount Kailash, Lake Manasarovar and a longer reflective journey",
  },
  {
    name: "Mount Kailash Kora",
    slug: "kailash-kora",
    region: "Western Tibet",
    duration: 13,
    price: 2690,
    difficulty: "Challenging",
    altitude: "Very high altitude",
    style: "High-altitude pilgrimage",
    bestFor:
      "Travelers specifically interested in the Mount Kailash Kora",
  },
  {
    name: "Lhasa & Namtso Lake",
    slug: "namtso-lake",
    region: "Lhasa · Namtso",
    duration: 7,
    price: 1690,
    difficulty: "Moderate",
    altitude: "High to very high altitude",
    style: "Culture & lake landscapes",
    bestFor:
      "Lhasa, dramatic lake scenery and photography",
  },
  {
    name: "Tibet Photography Journey",
    slug: "tibet-photography",
    region: "Tibet",
    duration: 10,
    price: 2390,
    difficulty: "Moderate",
    altitude: "High altitude",
    style: "Photography & slow observation",
    bestFor:
      "Landscape, architecture, culture and dedicated photography time",
  },
  {
    name: "Tibet Culture & Monasteries",
    slug: "tibet-culture-monasteries",
    region: "Central Tibet",
    duration: 9,
    price: 1990,
    difficulty: "Easy–Moderate",
    altitude: "High altitude",
    style: "Culture & monasteries",
    bestFor:
      "Tibetan heritage, monasteries and a culture-led itinerary",
  },
];

export default function CompareTripsPage() {
  const [firstSlug, setFirstSlug] = useState(
    "lhasa-classic"
  );

  const [secondSlug, setSecondSlug] = useState(
    "lhasa-everest-base-camp"
  );

  const firstTour = useMemo(
    () =>
      tours.find(
        (tour) => tour.slug === firstSlug
      ) ?? tours[0],
    [firstSlug]
  );

  const secondTour = useMemo(
    () =>
      tours.find(
        (tour) => tour.slug === secondSlug
      ) ?? tours[1],
    [secondSlug]
  );

  const sameTour =
    firstTour.slug === secondTour.slug;

  const comparisonRows = [
    {
      label: "Region",
      first: firstTour.region,
      second: secondTour.region,
    },
    {
      label: "Duration",
      first: `${firstTour.duration} days`,
      second: `${secondTour.duration} days`,
    },
    {
      label: "Starting price",
      first: `$${firstTour.price.toLocaleString()}`,
      second: `$${secondTour.price.toLocaleString()}`,
    },
    {
      label: "Difficulty",
      first: firstTour.difficulty,
      second: secondTour.difficulty,
    },
    {
      label: "Altitude profile",
      first: firstTour.altitude,
      second: secondTour.altitude,
    },
    {
      label: "Travel style",
      first: firstTour.style,
      second: secondTour.style,
    },
    {
      label: "Journey focus",
      first: firstTour.bestFor,
      second: secondTour.bestFor,
    },
  ];

  const priceDifference = Math.abs(
    firstTour.price - secondTour.price
  );

  const priceSummary =
    firstTour.price === secondTour.price
      ? "Both journeys have the same listed starting price."
      : firstTour.price < secondTour.price
        ? `${firstTour.name} starts $${priceDifference.toLocaleString()} lower than ${secondTour.name}.`
        : `${secondTour.name} starts $${priceDifference.toLocaleString()} lower than ${firstTour.name}.`;

  const durationDifference = Math.abs(
    firstTour.duration - secondTour.duration
  );

  const durationSummary =
    firstTour.duration === secondTour.duration
      ? "Both journeys have the same duration."
      : firstTour.duration < secondTour.duration
        ? `${firstTour.name} is ${durationDifference} ${
            durationDifference === 1 ? "day" : "days"
          } shorter than ${secondTour.name}.`
        : `${secondTour.name} is ${durationDifference} ${
            durationDifference === 1 ? "day" : "days"
          } shorter than ${firstTour.name}.`;

  const aiPrompt = encodeURIComponent(
    `Compare the ${firstTour.name} and ${secondTour.name} Tibet journeys for me. Explain the differences in duration, pace, altitude considerations, cultural experiences, landscapes and travel style. Help me understand which type of traveler each journey may suit.`
  );

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
          COMPARE TIBET JOURNEYS
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
          See two Tibet journeys side by side.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            fontSize: 18,
            lineHeight: 1.7,
            marginTop: 20,
            marginBottom: 0,
          }}
        >
          Compare two Himalayan26 Tibet journeys by
          duration, starting price, difficulty, altitude
          profile, travel style and journey focus before
          exploring the full itineraries.
        </p>
      </section>

      {/* SELECT */}
      <section className="card">
        <span className="pill">
          SELECT TWO JOURNEYS
        </span>

        <h2
          style={{
            marginTop: 14,
          }}
        >
          What would you like to compare?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            marginTop: 20,
          }}
        >
          <div>
            <label
              htmlFor="first-tour"
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 700,
              }}
            >
              First Tibet journey
            </label>

            <select
              id="first-tour"
              value={firstSlug}
              onChange={(event) =>
                setFirstSlug(event.target.value)
              }
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 12,
                border:
                  "1px solid rgba(255,255,255,0.12)",
                background: "#102129",
                color: "inherit",
              }}
            >
              {tours.map((tour) => (
                <option
                  key={tour.slug}
                  value={tour.slug}
                >
                  {tour.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="second-tour"
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 700,
              }}
            >
              Second Tibet journey
            </label>

            <select
              id="second-tour"
              value={secondSlug}
              onChange={(event) =>
                setSecondSlug(event.target.value)
              }
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 12,
                border:
                  "1px solid rgba(255,255,255,0.12)",
                background: "#102129",
                color: "inherit",
              }}
            >
              {tours.map((tour) => (
                <option
                  key={tour.slug}
                  value={tour.slug}
                >
                  {tour.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {sameTour && (
          <div
            className="notice"
            style={{
              marginTop: 18,
            }}
          >
            Select two different Tibet journeys to see a
            side-by-side comparison.
          </div>
        )}
      </section>

      {!sameTour && (
        <>
          {/* TABLE */}
          <section
            className="card"
            style={{
              marginTop: 24,
              overflowX: "auto",
            }}
          >
            <span className="pill">
              SIDE-BY-SIDE
            </span>

            <h2
              style={{
                marginTop: 14,
              }}
            >
              {firstTour.name} vs{" "}
              {secondTour.name}
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
                  <th
                    style={{
                      textAlign: "left",
                      padding: "14px 16px",
                      borderBottom:
                        "1px solid rgba(255,255,255,0.16)",
                    }}
                  >
                    Feature
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "14px 16px",
                      borderBottom:
                        "1px solid rgba(255,255,255,0.16)",
                    }}
                  >
                    {firstTour.name}
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "14px 16px",
                      borderBottom:
                        "1px solid rgba(255,255,255,0.16)",
                    }}
                  >
                    {secondTour.name}
                  </th>
                </tr>
              </thead>

              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <td
                      style={{
                        padding: "15px 16px",
                        borderBottom:
                          "1px solid rgba(255,255,255,0.08)",
                        fontWeight: 700,
                        verticalAlign: "top",
                      }}
                    >
                      {row.label}
                    </td>

                    <td
                      style={{
                        padding: "15px 16px",
                        borderBottom:
                          "1px solid rgba(255,255,255,0.08)",
                        verticalAlign: "top",
                        lineHeight: 1.6,
                      }}
                    >
                      {row.first}
                    </td>

                    <td
                      style={{
                        padding: "15px 16px",
                        borderBottom:
                          "1px solid rgba(255,255,255,0.08)",
                        verticalAlign: "top",
                        lineHeight: 1.6,
                      }}
                    >
                      {row.second}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* QUICK FACTS */}
          <section
            className="card"
            style={{
              marginTop: 24,
            }}
          >
            <span className="pill">
              QUICK DIFFERENCES
            </span>

            <h2
              style={{
                marginTop: 14,
              }}
            >
              The main differences at a glance
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 16,
                marginTop: 18,
              }}
            >
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
                <strong>
                  Starting price difference
                </strong>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.6,
                    marginBottom: 0,
                  }}
                >
                  {priceSummary}
                </p>
              </div>

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
                <strong>
                  Duration difference
                </strong>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.6,
                    marginBottom: 0,
                  }}
                >
                  {durationSummary}
                </p>
              </div>

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
                <strong>
                  Travel style
                </strong>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.6,
                    marginBottom: 0,
                  }}
                >
                  {firstTour.name}:{" "}
                  {firstTour.style}
                  <br />
                  <br />
                  {secondTour.name}:{" "}
                  {secondTour.style}
                </p>
              </div>

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
                <strong>
                  Altitude profile
                </strong>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.6,
                    marginBottom: 0,
                  }}
                >
                  {firstTour.name}:{" "}
                  {firstTour.altitude}
                  <br />
                  <br />
                  {secondTour.name}:{" "}
                  {secondTour.altitude}
                </p>
              </div>
            </div>
          </section>

          {/* NEXT STEP */}
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
              NEXT STEP
            </span>

            <h2
              style={{
                marginTop: 14,
              }}
            >
              Explore both Tibet journeys in detail
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 780,
                lineHeight: 1.7,
              }}
            >
              Review each journey or ask the AI planner to
              explain their differences based on your travel
              interests, preferred pace and available time.
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
                href={`/tours/${firstTour.slug}`}
              >
                View {firstTour.name}
              </Link>

              <Link
                className="btn"
                href={`/tours/${secondTour.slug}`}
              >
                View {secondTour.name}
              </Link>

              <Link
                className="btn alt"
                href={`/ai-trip-planner?prompt=${aiPrompt}`}
              >
                Compare with AI
              </Link>
            </div>
          </section>

          {/* NOTE */}
          <section
            style={{
              marginTop: 24,
              padding: "0 4px",
            }}
          >
            <p
              className="muted"
              style={{
                maxWidth: 920,
                margin: 0,
                fontSize: 13,
                lineHeight: 1.7,
              }}
            >
              Starting prices are planning estimates rather
              than final quotations. Final itinerary, current
              travel documentation, permits, route access,
              availability, local conditions and pricing
              should be confirmed for your travel dates before
              booking.
            </p>
          </section>
        </>
      )}
    </main>
  );
}

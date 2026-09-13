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
    name: "Everest Base Camp",
    slug: "everest-base-camp",
    region: "Nepal",
    duration: 14,
    price: 1490,
    difficulty: "Challenging",
    altitude: "5,545 m",
    style: "Classic high-altitude trekking",
    bestFor: "Iconic Everest views and major trekking goals",
  },
  {
    name: "Annapurna Classic",
    slug: "annapurna-classic",
    region: "Nepal",
    duration: 10,
    price: 1190,
    difficulty: "Moderate",
    altitude: "5,416 m",
    style: "Scenic trekking and village travel",
    bestFor: "First-time trekkers wanting variety and flexibility",
  },
  {
    name: "Langtang Valley",
    slug: "langtang-valley",
    region: "Nepal",
    duration: 8,
    price: 990,
    difficulty: "Moderate",
    altitude: "Around 4,980 m",
    style: "Shorter mountain trek",
    bestFor: "Quieter trekking and shorter itineraries",
  },
  {
    name: "Manaslu Circuit",
    slug: "manaslu-circuit",
    region: "Nepal",
    duration: 15,
    price: 1690,
    difficulty: "Challenging",
    altitude: "Around 5,106 m",
    style: "Remote circuit trekking",
    bestFor: "Experienced trekkers seeking fewer crowds",
  },
  {
    name: "Upper Mustang",
    slug: "upper-mustang",
    region: "Nepal",
    duration: 11,
    price: 1790,
    difficulty: "Moderate",
    altitude: "High-altitude desert",
    style: "Culture and dramatic landscapes",
    bestFor: "Ancient settlements, photography and Tibetan-influenced culture",
  },
  {
    name: "Bhutan Mountain & Culture",
    slug: "bhutan-mountain-culture",
    region: "Bhutan",
    duration: 9,
    price: 2490,
    difficulty: "Easy–Moderate",
    altitude: "Moderate altitude",
    style: "Culture, scenery and comfort",
    bestFor: "Culture, monasteries and a slower journey",
  },
  {
    name: "Tibet High Plateau",
    slug: "tibet-high-plateau",
    region: "Tibet",
    duration: 12,
    price: 2190,
    difficulty: "Moderate",
    altitude: "High plateau",
    style: "Culture and high-altitude touring",
    bestFor: "Monasteries, landscapes and photography",
  },
  {
    name: "Ladakh High Altitude",
    slug: "ladakh-high-altitude",
    region: "India",
    duration: 10,
    price: 1590,
    difficulty: "Moderate",
    altitude: "High-altitude region",
    style: "Mountain touring and culture",
    bestFor: "Photography, Buddhist culture and dramatic scenery",
  },
  {
    name: "Kailash Mansarovar Journey",
    slug: "kailash-mansarovar-journey",
    region: "Tibet",
    duration: 15,
    price: 2890,
    difficulty: "Moderate",
    altitude: "Very high altitude",
    style: "Spiritual pilgrimage",
    bestFor: "Sacred travel and meaningful spiritual journeys",
  },
];

export default function CompareTripsPage() {
  const [firstSlug, setFirstSlug] = useState(
    "everest-base-camp"
  );

  const [secondSlug, setSecondSlug] = useState(
    "annapurna-classic"
  );

  const firstTour = useMemo(
    () =>
      tours.find((tour) => tour.slug === firstSlug) ??
      tours[0],
    [firstSlug]
  );

  const secondTour = useMemo(
    () =>
      tours.find((tour) => tour.slug === secondSlug) ??
      tours[1],
    [secondSlug]
  );

  const sameTour = firstTour.slug === secondTour.slug;

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
      label: "Altitude",
      first: firstTour.altitude,
      second: secondTour.altitude,
    },
    {
      label: "Travel style",
      first: firstTour.style,
      second: secondTour.style,
    },
    {
      label: "Best for",
      first: firstTour.bestFor,
      second: secondTour.bestFor,
    },
  ];

  const cheaper =
    firstTour.price === secondTour.price
      ? "Both trips have the same starting price."
      : firstTour.price < secondTour.price
        ? `${firstTour.name} has the lower starting price.`
        : `${secondTour.name} has the lower starting price.`;

  const shorter =
    firstTour.duration === secondTour.duration
      ? "Both trips have the same duration."
      : firstTour.duration < secondTour.duration
        ? `${firstTour.name} is the shorter journey.`
        : `${secondTour.name} is the shorter journey.`;

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
          COMPARE TRIPS
        </span>

        <h1
          style={{
            marginTop: 16,
            fontSize: "clamp(40px, 7vw, 76px)",
            lineHeight: 1,
            maxWidth: 950,
          }}
        >
          Compare Himalayan journeys side by side.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 800,
            fontSize: 18,
            lineHeight: 1.7,
            marginTop: 18,
          }}
        >
          Choose any two Himalayan26 journeys and compare
          duration, difficulty, region, altitude, travel
          style and starting price before deciding which
          one fits you best.
        </p>
      </section>

      <section className="card">
        <span className="pill">
          SELECT YOUR TRIPS
        </span>

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
              First journey
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
              Second journey
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
            Select two different journeys to get a useful
            comparison.
          </div>
        )}
      </section>

      {!sameTour && (
        <>
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
              {firstTour.name} vs {secondTour.name}
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

          <section
            className="card"
            style={{
              marginTop: 24,
            }}
          >
            <span className="pill">
              QUICK DECISION
            </span>

            <h2
              style={{
                marginTop: 14,
              }}
            >
              What stands out?
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
                  Better for budget
                </strong>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.6,
                    marginBottom: 0,
                  }}
                >
                  {cheaper}
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
                  Better for limited time
                </strong>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.6,
                    marginBottom: 0,
                  }}
                >
                  {shorter}
                </p>
              </div>
            </div>
          </section>

          <section
            className="card"
            style={{
              marginTop: 24,
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
              Explore either journey in detail
            </h2>

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
                href="/ai-trip-planner"
              >
                Ask AI which fits me
              </Link>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

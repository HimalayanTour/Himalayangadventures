"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type TripStyle =
  | "Culture"
  | "Adventure"
  | "Spiritual"
  | "Photography"
  | "Comfort"
  | "Family"
  | "Private";

const regions = [
  "Lhasa & Central Tibet",
  "Lhasa to Everest",
  "Namtso & High Plateau",
  "Mount Kailash & Western Tibet",
  "Culture & Monasteries",
  "Photography Journey",
  "Not sure yet",
];

const tripStyles: TripStyle[] = [
  "Culture",
  "Adventure",
  "Spiritual",
  "Photography",
  "Comfort",
  "Family",
  "Private",
];

const accommodationOptions = [
  "Comfortable",
  "Premium",
  "Best available",
  "Best available in remote areas",
];

export default function CustomJourneyPage() {
  const [region, setRegion] =
    useState("Lhasa & Central Tibet");

  const [days, setDays] =
    useState("8");

  const [travelers, setTravelers] =
    useState("2");

  const [style, setStyle] =
    useState<TripStyle>("Culture");

  const [accommodation, setAccommodation] =
    useState("Comfortable");

  const [priorities, setPriorities] =
    useState("");

  const [generated, setGenerated] =
    useState(false);

  const summary = useMemo(() => {
    const dayCount = Number(days) || 0;
    const travelerCount =
      Number(travelers) || 0;

    return {
      dayCount,
      travelerCount,
      region,
      style,
      accommodation,
    };
  }, [
    days,
    travelers,
    region,
    style,
    accommodation,
  ]);

  function handleBuild(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setGenerated(true);
  }

  function resetBuilder() {
    setRegion("Lhasa & Central Tibet");
    setDays("8");
    setTravelers("2");
    setStyle("Culture");
    setAccommodation("Comfortable");
    setPriorities("");
    setGenerated(false);
  }

  const bookingMessage = [
    `Tibet region / journey focus: ${region}.`,
    priorities.trim()
      ? `Priorities: ${priorities.trim()}`
      : "Please help us create a balanced private Tibet itinerary.",
  ].join(" ");

  const aiPrompt = `Create a ${days}-day private Tibet journey for ${travelers} traveler${
    Number(travelers) === 1 ? "" : "s"
  }.

Journey focus: ${region}.
Travel style: ${style}.
Accommodation: ${accommodation}.
Priorities: ${
    priorities.trim() ||
    "Create a balanced Tibet itinerary with realistic pacing, cultural experiences and appropriate altitude acclimatization."
  }

Please suggest a realistic route, pacing and altitude considerations. Clearly identify any current travel documentation, permits or route-access details that still need verification.`;

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
          PRIVATE TIBET JOURNEY
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
          Build a Tibet journey around you.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 830,
            fontSize: 18,
            lineHeight: 1.7,
            marginTop: 20,
            marginBottom: 0,
          }}
        >
          Choose the part of Tibet you want to explore,
          your trip length, travel style, group size and
          preferred accommodation. Himalayan26 will turn
          those choices into a private-journey brief that
          you can refine with AI or send with your trip
          request.
        </p>
      </section>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* BUILDER */}
        <section className="card">
          <span className="pill">
            JOURNEY BUILDER
          </span>

          <h2
            style={{
              marginTop: 14,
            }}
          >
            Tell us how you want to experience Tibet
          </h2>

          <p
            className="muted"
            style={{
              lineHeight: 1.7,
              maxWidth: 650,
            }}
          >
            This creates a planning brief. You can change
            any detail later before requesting the journey.
          </p>

          <form
            onSubmit={handleBuild}
            style={{
              marginTop: 20,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 18,
              }}
            >
              <div className="field">
                <label htmlFor="region">
                  Tibet journey focus
                </label>

                <select
                  id="region"
                  value={region}
                  onChange={(event) => {
                    setRegion(
                      event.target.value
                    );
                    setGenerated(false);
                  }}
                >
                  {regions.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="field">
                <label htmlFor="days">
                  Number of days
                </label>

                <input
                  id="days"
                  type="number"
                  min="4"
                  max="30"
                  value={days}
                  onChange={(event) => {
                    setDays(
                      event.target.value
                    );
                    setGenerated(false);
                  }}
                />
              </div>

              <div className="field">
                <label htmlFor="travelers">
                  Travelers
                </label>

                <input
                  id="travelers"
                  type="number"
                  min="1"
                  max="30"
                  value={travelers}
                  onChange={(event) => {
                    setTravelers(
                      event.target.value
                    );
                    setGenerated(false);
                  }}
                />
              </div>

              <div className="field">
                <label htmlFor="accommodation">
                  Accommodation
                </label>

                <select
                  id="accommodation"
                  value={accommodation}
                  onChange={(event) => {
                    setAccommodation(
                      event.target.value
                    );
                    setGenerated(false);
                  }}
                >
                  {accommodationOptions.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* STYLE */}
            <div
              style={{
                marginTop: 24,
              }}
            >
              <strong>
                What kind of Tibet journey?
              </strong>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop: 12,
                }}
              >
                {tripStyles.map(
                  (item) => {
                    const active =
                      style === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setStyle(item);
                          setGenerated(false);
                        }}
                        style={{
                          padding:
                            "11px 16px",
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
                        {item}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* PRIORITIES */}
            <div
              className="field"
              style={{
                marginTop: 24,
              }}
            >
              <label htmlFor="priorities">
                Priorities, interests or special requests
              </label>

              <textarea
                id="priorities"
                rows={6}
                value={priorities}
                onChange={(event) => {
                  setPriorities(
                    event.target.value
                  );
                  setGenerated(false);
                }}
                placeholder="Example: We want Lhasa, Tibetan culture, monasteries, beautiful plateau landscapes, comfortable hotels, photography time and realistic altitude acclimatization."
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginTop: 22,
              }}
            >
              <button
                className="btn"
                type="submit"
              >
                Build my Tibet journey brief
              </button>

              <button
                type="button"
                onClick={resetBuilder}
                style={{
                  padding:
                    "12px 18px",
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
          </form>
        </section>

        {/* SUMMARY */}
        <section
          className="card"
          style={{
            position: "sticky",
            top: 92,
          }}
        >
          <span className="pill">
            YOUR TIBET JOURNEY
          </span>

          <h2
            style={{
              marginTop: 14,
            }}
          >
            Private journey summary
          </h2>

          {!generated && (
            <>
              <p
                className="muted"
                style={{
                  lineHeight: 1.7,
                }}
              >
                Complete the builder and click
                “Build my Tibet journey brief.” Your
                planning summary will appear here.
              </p>

              <div
                style={{
                  marginTop: 22,
                  padding: 18,
                  borderRadius: 16,
                  border:
                    "1px solid rgba(255,255,255,.09)",
                  background:
                    "rgba(255,255,255,.025)",
                }}
              >
                <strong>
                  Planning around altitude
                </strong>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.7,
                    marginBottom: 0,
                    marginTop: 8,
                  }}
                >
                  Tibet journeys should allow realistic
                  pacing and acclimatization. Longer and
                  more remote routes may require additional
                  planning time.
                </p>
              </div>
            </>
          )}

          {generated && (
            <>
              <div
                style={{
                  marginTop: 20,
                  display: "grid",
                  gap: 12,
                }}
              >
                <SummaryRow
                  label="Destination"
                  value="Tibet"
                />

                <SummaryRow
                  label="Journey focus"
                  value={summary.region}
                />

                <SummaryRow
                  label="Duration"
                  value={`${summary.dayCount} days`}
                />

                <SummaryRow
                  label="Travelers"
                  value={`${summary.travelerCount}`}
                />

                <SummaryRow
                  label="Travel style"
                  value={summary.style}
                />

                <SummaryRow
                  label="Accommodation"
                  value={summary.accommodation}
                />
              </div>

              {priorities.trim() && (
                <div
                  style={{
                    marginTop: 22,
                    padding: 16,
                    borderRadius: 14,
                    border:
                      "1px solid rgba(255,255,255,0.10)",
                    background:
                      "rgba(255,255,255,0.03)",
                  }}
                >
                  <strong>
                    Your priorities
                  </strong>

                  <p
                    className="muted"
                    style={{
                      lineHeight: 1.7,
                      marginBottom: 0,
                    }}
                  >
                    {priorities}
                  </p>
                </div>
              )}

              <div
                className="notice"
                style={{
                  marginTop: 22,
                  lineHeight: 1.65,
                }}
              >
                This is a planning brief, not a confirmed
                itinerary or reservation. Final travel
                documentation, permits, route access,
                transportation, accommodation
                availability, local conditions and pricing
                must be confirmed before booking.
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  marginTop: 22,
                }}
              >
                <Link
                  className="btn"
                  href={`/contact-book?destination=${encodeURIComponent(
                    "Tibet"
                  )}&days=${encodeURIComponent(
                    days
                  )}&travelers=${encodeURIComponent(
                    travelers
                  )}&style=${encodeURIComponent(
                    style
                  )}&accommodation=${encodeURIComponent(
                    accommodation
                  )}&message=${encodeURIComponent(
                    bookingMessage
                  )}`}
                >
                  Request this Tibet journey
                </Link>

                <Link
                  className="btn alt"
                  href={`/ai-trip-planner?prompt=${encodeURIComponent(
                    aiPrompt
                  )}`}
                >
                  Refine with AI
                </Link>
              </div>
            </>
          )}
        </section>
      </div>

      {/* HOW IT WORKS */}
      <section
        className="card"
        style={{
          marginTop: 24,
        }}
      >
        <span className="pill">
          HOW IT WORKS
        </span>

        <h2
          style={{
            marginTop: 14,
          }}
        >
          From an idea to a private Tibet journey
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginTop: 20,
          }}
        >
          <StepCard
            number="01"
            title="Choose your Tibet focus"
            text="Select the region or experience, duration, travel style, group size and accommodation level that fit you."
          />

          <StepCard
            number="02"
            title="Refine the journey"
            text="Use Himalayan26 AI to develop the idea further or send your brief with a private trip request."
          />

          <StepCard
            number="03"
            title="Confirm current details"
            text="Current travel documentation, permits, route access, logistics, availability and final pricing are confirmed for your travel dates."
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(26px, 5vw, 44px)",
          background:
            "linear-gradient(135deg, rgba(19,51,58,.92), rgba(8,27,34,.97))",
        }}
      >
        <span className="pill">
          NEED INSPIRATION?
        </span>

        <h2
          style={{
            marginTop: 14,
            maxWidth: 720,
          }}
        >
          Explore our Tibet journeys before building your own.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            lineHeight: 1.7,
          }}
        >
          Start with one of our existing Tibet journey
          concepts, compare routes or ask the AI planner to
          help shape an itinerary around your priorities.
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
            href="/tours"
          >
            Explore Tibet tours
          </Link>

          <Link
            className="btn alt"
            href="/ai-trip-planner"
          >
            Plan Tibet with AI
          </Link>

          <Link
            className="btn alt"
            href="/compare-trips"
          >
            Compare journeys
          </Link>
        </div>
      </section>
    </main>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        gap: 20,
        paddingBottom: 12,
        borderBottom:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span className="muted">
        {label}
      </span>

      <strong
        style={{
          textAlign: "right",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

function StepCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
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
      <span className="pill">
        {number}
      </span>

      <h3
        style={{
          marginTop: 14,
          marginBottom: 8,
        }}
      >
        {title}
      </h3>

      <p
        className="muted"
        style={{
          lineHeight: 1.7,
          marginBottom: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
}

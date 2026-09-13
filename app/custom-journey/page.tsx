"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type TripStyle =
  | "Adventure"
  | "Culture"
  | "Spiritual"
  | "Photography"
  | "Luxury"
  | "Family"
  | "Wellness";

const destinations = [
  "Nepal",
  "Bhutan",
  "Tibet",
  "Indian Himalaya",
];

const tripStyles: TripStyle[] = [
  "Adventure",
  "Culture",
  "Spiritual",
  "Photography",
  "Luxury",
  "Family",
  "Wellness",
];

const accommodationOptions = [
  "Comfortable",
  "Premium",
  "Luxury",
  "Best available in remote areas",
];

export default function CustomJourneyPage() {
  const [destination, setDestination] =
    useState("Nepal");

  const [days, setDays] =
    useState("10");

  const [travelers, setTravelers] =
    useState("2");

  const [style, setStyle] =
    useState<TripStyle>("Adventure");

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
      destination,
      style,
      accommodation,
    };
  }, [
    days,
    travelers,
    destination,
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
    setDestination("Nepal");
    setDays("10");
    setTravelers("2");
    setStyle("Adventure");
    setAccommodation("Comfortable");
    setPriorities("");
    setGenerated(false);
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
          CUSTOM JOURNEY
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
          Build a Himalayan journey around you.
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
          Choose your destination, trip style,
          duration, group size and comfort level.
          Himalayan26 will turn those choices into
          a clear private-journey brief you can send
          to our team.
        </p>
      </section>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1.1fr) minmax(320px, 0.9fr)",
          gap: 24,
          alignItems: "start",
        }}
      >
        <section className="card">
          <span className="pill">
            JOURNEY BUILDER
          </span>

          <h2
            style={{
              marginTop: 14,
            }}
          >
            Tell us what you want
          </h2>

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
                <label htmlFor="destination">
                  Destination
                </label>

                <select
                  id="destination"
                  value={destination}
                  onChange={(event) => {
                    setDestination(
                      event.target.value
                    );
                    setGenerated(false);
                  }}
                >
                  {destinations.map(
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
                  max="40"
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

            <div
              style={{
                marginTop: 24,
              }}
            >
              <strong>
                What kind of journey?
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
                placeholder="Example: We want mountain scenery, local culture, slower travel, comfortable hotels, good photography opportunities and two rest days."
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
                Build my journey brief
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

        <section className="card">
          <span className="pill">
            YOUR JOURNEY
          </span>

          <h2
            style={{
              marginTop: 14,
            }}
          >
            Private trip summary
          </h2>

          {!generated && (
            <p
              className="muted"
              style={{
                lineHeight: 1.7,
              }}
            >
              Complete the builder and click
              “Build my journey brief.” Your
              personalized trip summary will
              appear here.
            </p>
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
                  value={
                    summary.destination
                  }
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
                  label="Trip style"
                  value={
                    summary.style
                  }
                />

                <SummaryRow
                  label="Accommodation"
                  value={
                    summary.accommodation
                  }
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
                }}
              >
                This is a planning brief, not
                a confirmed itinerary. Permits,
                access rules, weather,
                transportation, accommodation
                availability and final pricing
                must still be checked before
                booking.
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
                    destination
                  )}&days=${encodeURIComponent(
                    days
                  )}&travelers=${encodeURIComponent(
                    travelers
                  )}&style=${encodeURIComponent(
                    style
                  )}&accommodation=${encodeURIComponent(
                    accommodation
                  )}&message=${encodeURIComponent(
                    priorities
                  )}`}
                >
                  Request this journey
                </Link>

                <Link
                  className="btn alt"
                  href={`/ai-trip-planner?prompt=${encodeURIComponent(
                    `Create a ${days}-day ${style.toLowerCase()} journey in ${destination} for ${travelers} traveler${
                      Number(travelers) === 1
                        ? ""
                        : "s"
                    }. Accommodation: ${accommodation}. Priorities: ${
                      priorities ||
                      "Create a balanced private Himalayan itinerary."
                    }`
                  )}`}
                >
                  Refine with AI
                </Link>
              </div>
            </>
          )}
        </section>
      </div>

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
          From idea to private itinerary
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
            title="Tell us your priorities"
            text="Choose the destination, duration, style and comfort level that fit you."
          />

          <StepCard
            number="02"
            title="Refine the journey"
            text="Use the AI planner or send the brief to our team for a more detailed itinerary."
          />

          <StepCard
            number="03"
            title="Verify the details"
            text="We confirm permits, logistics, availability, current conditions and final pricing."
          />
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

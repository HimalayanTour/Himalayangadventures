import Link from "next/link";

const researchAreas = [
  {
    number: "01",
    title: "Tibet route research",
    text:
      "Explore questions about Tibet routes, journey structure, altitude, pacing and the differences between Lhasa, Central Tibet, Everest, Namtso and western Tibet.",
  },
  {
    number: "02",
    title: "Current travel conditions",
    text:
      "Use live research as an additional planning layer for changing weather, route conditions, travel requirements and practical questions that need current information.",
  },
  {
    number: "03",
    title: "Journey comparison",
    text:
      "Compare Tibet journeys by duration, altitude profile, pace, cultural focus, landscapes and travel style before deciding which direction fits you.",
  },
  {
    number: "04",
    title: "Planning questions",
    text:
      "Research practical questions while shaping your Tibet itinerary, from trip length and acclimatization to photography, cultural interests and preparation.",
  },
];

const examples = [
  "Compare the Lhasa Classic Journey and Lhasa to Everest Base Camp for a first Tibet trip.",
  "How should altitude and acclimatization affect the pace of a Tibet itinerary?",
  "Compare a Tibet journey focused on Everest with one focused on Mount Kailash.",
  "What current information should I verify before planning travel to Tibet?",
];

export default function Page() {
  return (
    <main>
      <section className="section">
        <div className="container">
          {/* HERO */}

          <div
            className="card"
            style={{
              padding: "clamp(34px, 5vw, 64px)",
              background:
                "radial-gradient(circle at 85% 15%, rgba(109,224,194,.12), transparent 30%), linear-gradient(135deg, rgba(22,42,49,.96), rgba(13,73,75,.72))",
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 22,
                letterSpacing: ".18em",
              }}
            >
              AI RESEARCH · TIBET
            </div>

            <h1
              style={{
                maxWidth: 930,
                fontSize: "clamp(46px, 7vw, 76px)",
                lineHeight: 0.98,
                marginBottom: 24,
              }}
            >
              Research Tibet
              <br />
              before you decide.
            </h1>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              Use AI-assisted research to explore Tibet
              routes, compare journeys and investigate
              planning questions. When live research is
              available, the planner can also add current
              web information to questions that may change
              over time.
            </p>

            <div
              className="actions"
              style={{
                marginTop: 28,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <Link
                className="btn"
                href="/ai-trip-planner"
              >
                Start Tibet research
              </Link>

              <Link
                className="btn alt"
                href="/compare-trips"
              >
                Compare Tibet journeys
              </Link>
            </div>
          </div>

          {/* WHAT YOU CAN RESEARCH */}

          <div style={{ marginTop: 54 }}>
            <div
              className="eyebrow"
              style={{
                marginBottom: 14,
                letterSpacing: ".16em",
              }}
            >
              RESEARCH YOUR TIBET JOURNEY
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              Ask better questions before you travel.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              Tibet planning involves more than choosing a
              famous place. Altitude, route design, travel
              time, current access, weather and your own
              priorities can all affect the shape of a
              journey.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(230px, 1fr))",
                gap: 16,
              }}
            >
              {researchAreas.map((item) => (
                <div
                  key={item.number}
                  className="card"
                  style={{ padding: 24 }}
                >
                  <div
                    className="eyebrow"
                    style={{
                      marginBottom: 14,
                      letterSpacing: ".14em",
                    }}
                  >
                    RESEARCH {item.number}
                  </div>

                  <h3 style={{ marginBottom: 12 }}>
                    {item.title}
                  </h3>

                  <p
                    className="muted"
                    style={{
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* LIVE RESEARCH */}

          <div
            className="card"
            style={{
              marginTop: 54,
              padding: "clamp(28px, 4vw, 44px)",
              background:
                "linear-gradient(135deg, rgba(18,52,57,.88), rgba(16,35,42,.96))",
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 14,
                letterSpacing: ".16em",
              }}
            >
              LIVE TIBET RESEARCH
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              Add current web research when it matters.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                lineHeight: 1.8,
              }}
            >
              The Tibet AI Trip Planner includes a live
              research option that can add current web
              information to supported planning questions.
              This is especially useful for information
              that may change, such as travel requirements,
              route access, weather and transportation
              conditions.
            </p>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                lineHeight: 1.8,
                marginBottom: 0,
              }}
            >
              When live research is unavailable, the
              planner can still help organize your Tibet
              journey and will indicate that current web
              verification was not included.
            </p>

            <div
              className="actions"
              style={{
                marginTop: 24,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <Link
                className="btn"
                href="/ai-trip-planner"
              >
                Open Tibet AI Planner
              </Link>

              <Link
                className="btn alt"
                href="/weather-conditions"
              >
                Check Tibet conditions
              </Link>
            </div>
          </div>

          {/* RESEARCH VS PLANNING */}

          <div style={{ marginTop: 54 }}>
            <div
              className="eyebrow"
              style={{
                marginBottom: 14,
                letterSpacing: ".16em",
              }}
            >
              TWO PLANNING LAYERS
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 26,
              }}
            >
              Use AI planning and live research differently.
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 16,
              }}
            >
              <div
                className="card"
                style={{ padding: 26 }}
              >
                <div
                  className="eyebrow"
                  style={{
                    marginBottom: 12,
                  }}
                >
                  AI PLANNING
                </div>

                <h3>
                  Shape the journey.
                </h3>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.75,
                    marginBottom: 0,
                  }}
                >
                  Use the planner to think through duration,
                  pacing, interests, altitude, journey
                  style and which of our Tibet routes may
                  fit your priorities.
                </p>
              </div>

              <div
                className="card"
                style={{ padding: 26 }}
              >
                <div
                  className="eyebrow"
                  style={{
                    marginBottom: 12,
                  }}
                >
                  LIVE RESEARCH
                </div>

                <h3>
                  Check what may have changed.
                </h3>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.75,
                    marginBottom: 0,
                  }}
                >
                  Turn on live research when your question
                  depends on current information. Important
                  results should still be checked against
                  appropriate official or primary sources.
                </p>
              </div>
            </div>
          </div>

          {/* EXAMPLE QUESTIONS */}

          <div style={{ marginTop: 54 }}>
            <div
              className="eyebrow"
              style={{
                marginBottom: 14,
                letterSpacing: ".16em",
              }}
            >
              TRY ASKING
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 28,
              }}
            >
              Start with a real Tibet travel question.
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 16,
              }}
            >
              {examples.map((example, index) => (
                <div
                  key={example}
                  className="card"
                  style={{ padding: 24 }}
                >
                  <div
                    className="eyebrow"
                    style={{
                      marginBottom: 12,
                      letterSpacing: ".14em",
                    }}
                  >
                    EXAMPLE{" "}
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <p
                    style={{
                      fontSize: 17,
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    “{example}”
                  </p>
                </div>
              ))}
            </div>

            <div
              className="actions"
              style={{ marginTop: 24 }}
            >
              <Link
                className="btn"
                href="/ai-trip-planner"
              >
                Ask my Tibet question
              </Link>
            </div>
          </div>

          {/* CURRENT INFORMATION */}

          <div
            className="card"
            style={{
              marginTop: 54,
              padding: "clamp(26px, 4vw, 38px)",
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 12,
              }}
            >
              RESEARCH RESPONSIBLY
            </div>

            <h2
              style={{
                marginBottom: 14,
              }}
            >
              AI research is a planning tool, not the final
              authority.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 900,
                lineHeight: 1.8,
              }}
            >
              Travel documentation, permits, route access,
              local requirements, transportation, weather
              and operating conditions can change.
              Important travel decisions should be
              confirmed using current authoritative
              information and appropriate local
              professional guidance before booking or
              departure.
            </p>

            <div
              className="actions"
              style={{
                marginTop: 22,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <Link
                className="btn alt"
                href="/weather-conditions"
              >
                Tibet conditions
              </Link>

              <Link
                className="btn alt"
                href="/himalayan-guide"
              >
                Tibet travel guide
              </Link>

              <Link
                className="btn alt"
                href="/responsible-travel"
              >
                Responsible travel
              </Link>
            </div>
          </div>

          {/* FINAL CTA */}

          <div
            className="card"
            style={{
              marginTop: 54,
              padding: "clamp(30px, 5vw, 50px)",
              background:
                "linear-gradient(135deg, rgba(19,58,61,.9), rgba(16,35,42,.96))",
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 14,
              }}
            >
              FROM RESEARCH TO TIBET
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              Turn what you learn into a clearer journey.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 800,
                lineHeight: 1.8,
              }}
            >
              Research current questions, compare our
              Tibet journeys and then build a private
              itinerary around your dates, interests,
              preferred pace and travel style.
            </p>

            <div
              className="actions"
              style={{
                marginTop: 24,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <Link
                className="btn"
                href="/ai-trip-planner"
              >
                Start Tibet research
              </Link>

              <Link
                className="btn alt"
                href="/compare-trips"
              >
                Compare Tibet journeys
              </Link>

              <Link
                className="btn alt"
                href="/custom-journey"
              >
                Build a private journey
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

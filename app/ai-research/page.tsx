import Link from "next/link";

const researchAreas = [
  {
    number: "01",
    title: "Route research",
    text: "Explore questions about Himalayan routes, journey structure, altitude, pacing and the differences between destinations.",
  },
  {
    number: "02",
    title: "Travel conditions",
    text: "Use current research as an additional planning layer for changing conditions, seasonal considerations and practical travel questions.",
  },
  {
    number: "03",
    title: "Destination comparison",
    text: "Compare regions and journeys when you are deciding between places such as Everest, Annapurna, Manaslu, Bhutan, Tibet or Ladakh.",
  },
  {
    number: "04",
    title: "Planning questions",
    text: "Research the practical questions that appear while shaping an itinerary, from trip length and difficulty to travel style and preparation.",
  },
];

const examples = [
  "Compare Everest Base Camp and Annapurna for a first Himalayan trek.",
  "What should I consider when planning a high-altitude journey?",
  "How should acclimatization affect the pace of my itinerary?",
  "Compare Nepal, Bhutan and Tibet for culture and mountain scenery.",
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
                "linear-gradient(135deg, rgba(22,42,49,.96), rgba(13,73,75,.72))",
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 22,
                letterSpacing: ".18em",
              }}
            >
              AI RESEARCH · HIMALAYA
            </div>

            <h1
              style={{
                maxWidth: 930,
                fontSize: "clamp(46px, 7vw, 76px)",
                lineHeight: 0.98,
                marginBottom: 24,
              }}
            >
              Research before
              <br />
              you decide.
            </h1>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              Use AI-assisted travel research to investigate routes, compare
              Himalayan journeys and explore planning questions before turning
              your ideas into an itinerary.
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
              <Link className="btn" href="/ai-trip-planner">
                Start AI research
              </Link>

              <Link className="btn alt" href="/compare-trips">
                Compare journeys
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
              RESEARCH YOUR JOURNEY
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
              Himalayan planning involves more than choosing a destination.
              Altitude, route design, season, difficulty, access and personal
              priorities can all change which journey makes sense.
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

                  <h3 style={{ marginBottom: 12 }}>{item.title}</h3>

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
              LIVE RESEARCH MODE
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              Add current web research when available.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                lineHeight: 1.8,
              }}
            >
              The AI Trip Planner includes a live-research option that can add
              current web information to supported planning requests. When live
              research is unavailable, the planner can still create a planning
              response and clearly indicate that current web verification was
              not included.
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
              <Link className="btn" href="/ai-trip-planner">
                Open AI Trip Planner
              </Link>

              <Link className="btn alt" href="/safety-conditions">
                Check conditions
              </Link>
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
              Start with a real travel question.
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
                    EXAMPLE {String(index + 1).padStart(2, "0")}
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

            <div className="actions" style={{ marginTop: 24 }}>
              <Link className="btn" href="/ai-trip-planner">
                Ask my own question
              </Link>
            </div>
          </div>

          {/* IMPORTANT NOTE */}
          <div
            className="card"
            style={{
              marginTop: 54,
              padding: 28,
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 12 }}>
              RESEARCH RESPONSIBLY
            </div>

            <h2 style={{ marginBottom: 14 }}>
              AI research is a planning tool, not the final authority.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 880,
                lineHeight: 1.8,
              }}
            >
              Entry rules, permits, closures, weather, transportation and
              mountain conditions can change. Important travel decisions should
              be confirmed with current official sources and appropriate local
              guidance before booking or departure.
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
              <Link className="btn alt" href="/safety-conditions">
                Safety &amp; conditions
              </Link>

              <Link className="btn alt" href="/himalayan-guide">
                Himalayan guide
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
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              FROM RESEARCH TO JOURNEY
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              Turn what you learn into a better plan.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 780,
                lineHeight: 1.8,
              }}
            >
              Research your options, compare existing journeys and then build a
              private itinerary around your dates, interests and preferred
              travel style.
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
              <Link className="btn" href="/ai-trip-planner">
                Start researching
              </Link>

              <Link className="btn alt" href="/compare-trips">
                Compare trips
              </Link>

              <Link className="btn alt" href="/custom-journey">
                Build a custom journey
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

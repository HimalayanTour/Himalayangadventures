import Link from "next/link";

const guideTopics = [
  {
    number: "01",
    title: "Altitude & acclimatization",
    text:
      "Tibet travel takes place at significant altitude. Build a realistic pace into the journey, allow time to adjust and keep enough flexibility to slow down when conditions require it.",
    tag: "ESSENTIAL",
  },
  {
    number: "02",
    title: "Packing for Tibet",
    text:
      "Prepare for strong sun, wind, cool mornings and evenings, changing temperatures and different conditions between cities, mountain areas and the high plateau. Layering is usually the most practical approach.",
    tag: "PREPARATION",
  },
  {
    number: "03",
    title: "Documents & requirements",
    text:
      "Travel documentation, permits, route access and other requirements can depend on your nationality, travel dates and intended itinerary. Requirements can change, so current information matters.",
    tag: "DOCUMENTS",
  },
  {
    number: "04",
    title: "Weather & conditions",
    text:
      "Tibet covers a vast high-altitude area. Weather can differ substantially between Lhasa, Central Tibet, Everest, Namtso and western Tibet, so check current conditions for the route you intend to travel.",
    tag: "CONDITIONS",
  },
  {
    number: "05",
    title: "Pace & readiness",
    text:
      "The right journey pace depends on altitude, distance, duration, route and individual experience. A thoughtful itinerary leaves room for rest rather than treating every day as a race.",
    tag: "READINESS",
  },
  {
    number: "06",
    title: "Culture & etiquette",
    text:
      "Tibet has living cultural and religious traditions. Respect monasteries, sacred places, local customs, photography preferences and the guidance of local travel professionals.",
    tag: "RESPECT",
  },
];

const packing = [
  "Layered clothing for changing temperatures",
  "Windproof and weather-resistant outer layer",
  "Comfortable broken-in walking footwear",
  "Sun protection, sunglasses and lip protection",
  "Reusable water bottle",
  "Personal medications and essential items",
  "Small daypack for daily necessities",
  "Copies of important travel documents",
];

const planningSteps = [
  {
    step: "01",
    title: "Choose your Tibet experience",
    text:
      "Start with what matters most: Lhasa and culture, Everest landscapes, Namtso, Mount Kailash, photography, monasteries or a combination.",
  },
  {
    step: "02",
    title: "Match the route to your time",
    text:
      "Your available days affect how much distance, altitude and appropriate adjustment time can realistically fit into the journey.",
  },
  {
    step: "03",
    title: "Check current conditions",
    text:
      "Review weather, route conditions and current travel requirements before finalizing important arrangements.",
  },
  {
    step: "04",
    title: "Keep flexibility",
    text:
      "Weather, roads, route access, local requirements and high-altitude conditions can affect Tibet travel. Build realistic margins into the itinerary.",
  },
];

export default function HimalayanGuidePage() {
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
          padding:
            "clamp(28px, 5vw, 56px)",
          marginBottom: 38,
          background:
            "radial-gradient(circle at 85% 15%, rgba(109,224,194,.12), transparent 30%), linear-gradient(145deg, rgba(18,48,55,.96), rgba(8,28,35,.98))",
        }}
      >
        <span className="pill">
          TIBET TRAVEL GUIDE · 2026
        </span>

        <h1
          style={{
            marginTop: 18,
            marginBottom: 18,
            fontSize:
              "clamp(42px, 7vw, 76px)",
            lineHeight: 1,
            maxWidth: 950,
          }}
        >
          Prepare well.
          <br />
          Understand the plateau.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 850,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Practical planning guidance for
          Tibet—from altitude and weather
          to packing, travel requirements,
          pacing and respectful cultural
          travel.
        </p>

        <div
          className="actions"
          style={{
            marginTop: 28,
          }}
        >
          <Link
            className="btn"
            href="/ai-trip-planner"
          >
            Ask the Tibet AI planner
          </Link>

          <Link
            className="btn alt"
            href="/weather-conditions"
          >
            Check Tibet conditions
          </Link>
        </div>
      </section>

      {/* ESSENTIALS */}

      <section>
        <span className="pill">
          PLANNING ESSENTIALS
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize:
              "clamp(28px, 4vw, 42px)",
          }}
        >
          What to understand before you go
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 790,
            lineHeight: 1.7,
          }}
        >
          Good Tibet planning is about
          more than choosing a famous
          destination. Altitude, travel
          time, current requirements,
          weather and cultural context can
          all shape the journey.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
            marginTop: 24,
          }}
        >
          {guideTopics.map((topic) => (
            <article
              className="card"
              key={topic.number}
              style={{
                padding: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  gap: 12,
                  alignItems: "center",
                  marginBottom: 18,
                }}
              >
                <strong
                  style={{
                    fontSize: 13,
                    letterSpacing:
                      "0.12em",
                    opacity: 0.65,
                  }}
                >
                  GUIDE {topic.number}
                </strong>

                <span className="pill">
                  {topic.tag}
                </span>
              </div>

              <h3
                style={{
                  marginBottom: 12,
                  fontSize: 22,
                }}
              >
                {topic.title}
              </h3>

              <p
                className="muted"
                style={{
                  lineHeight: 1.7,
                  marginBottom: 0,
                }}
              >
                {topic.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ALTITUDE */}

      <section
        className="card"
        style={{
          marginTop: 38,
          padding:
            "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          ALTITUDE
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 12,
            fontSize:
              "clamp(28px, 4vw, 40px)",
          }}
        >
          Altitude changes the journey
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          Tibet journeys commonly involve
          significant elevation. As a
          route moves higher, appropriate
          pacing becomes increasingly
          important. Individual responses
          to altitude vary, so a fixed
          schedule should never be treated
          as more important than health
          and safety.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 16,
            marginTop: 24,
          }}
        >
          <InfoCard
            label="PACE"
            title="Avoid rushing"
            text="Do not design a high-altitude Tibet itinerary around speed alone."
          />

          <InfoCard
            label="ADJUSTMENT"
            title="Allow time"
            text="A slower beginning can give the journey more room for appropriate adjustment to altitude."
          />

          <InfoCard
            label="FLEXIBILITY"
            title="Listen and adapt"
            text="Be prepared to slow down, rest or change plans when circumstances require it."
          />

          <InfoCard
            label="LOCAL GUIDANCE"
            title="Follow experienced advice"
            text="Appropriate local and professional guidance is especially important during high-altitude and remote travel."
          />
        </div>

        <div
          className="notice"
          style={{
            marginTop: 22,
          }}
        >
          This page provides general
          travel-planning information, not
          medical advice. High-altitude
          illness can be serious. Seek
          appropriate medical advice for
          personal health questions and
          follow qualified guidance during
          your journey.
        </div>
      </section>

      {/* PACKING + DOCUMENTS */}

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
          marginTop: 24,
        }}
      >
        <div
          className="card"
          style={{
            padding: 28,
          }}
        >
          <span className="pill">
            PACKING
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Start with the essentials
          </h2>

          <p
            className="muted"
            style={{
              lineHeight: 1.7,
            }}
          >
            Your exact packing list
            depends on the route, season,
            altitude and accommodation,
            but these items are a useful
            starting point for a Tibet
            journey.
          </p>

          <div
            style={{
              display: "grid",
              gap: 13,
              marginTop: 22,
            }}
          >
            {packing.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  gap: 11,
                  alignItems:
                    "flex-start",
                }}
              >
                <strong
                  aria-hidden="true"
                >
                  ✓
                </strong>

                <span className="muted">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="card"
          style={{
            padding: 28,
          }}
        >
          <span className="pill">
            DOCUMENTS
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Travel requirements need
            current verification
          </h2>

          <p
            className="muted"
            style={{
              lineHeight: 1.75,
            }}
          >
            Documentation, permits,
            approved travel arrangements,
            route access and other
            requirements may depend on
            factors including nationality,
            travel dates and intended
            itinerary.
          </p>

          <p
            className="muted"
            style={{
              lineHeight: 1.75,
            }}
          >
            Requirements and operating
            conditions can change. Confirm
            the current rules that apply
            to your journey through
            appropriate official sources
            and qualified travel
            professionals before booking
            or departure.
          </p>

          <Link
            className="btn alt"
            href="/ai-research"
          >
            Research current information
          </Link>
        </div>
      </section>

      {/* JOURNEY PLANNING */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding:
            "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          TIBET JOURNEY PLANNING
        </span>

        <h2
          style={{
            marginTop: 14,
            fontSize:
              "clamp(28px, 4vw, 40px)",
          }}
        >
          A clearer way to plan
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginTop: 24,
          }}
        >
          {planningSteps.map((item) => (
            <div
              key={item.step}
              style={{
                padding: 20,
                borderRadius: 18,
                border:
                  "1px solid rgba(255,255,255,0.10)",
                background:
                  "rgba(255,255,255,0.03)",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing:
                    "0.12em",
                  opacity: 0.6,
                }}
              >
                STEP {item.step}
              </span>

              <h3
                style={{
                  marginTop: 14,
                  marginBottom: 10,
                }}
              >
                {item.title}
              </h3>

              <p
                className="muted"
                style={{
                  lineHeight: 1.65,
                  marginBottom: 0,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WEATHER + RESPONSIBLE */}

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 18,
          marginTop: 24,
        }}
      >
        <div
          className="card"
          style={{
            padding: 28,
          }}
        >
          <span className="pill">
            LIVE WEATHER
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Check before you travel
          </h2>

          <p
            className="muted"
            style={{
              lineHeight: 1.7,
            }}
          >
            View current weather and the
            seven-day planning outlook for
            key Tibet journey areas,
            including Lhasa, Shigatse,
            Everest, Namtso and Mount
            Kailash.
          </p>

          <Link
            className="btn"
            href="/weather-conditions"
          >
            View Tibet conditions
          </Link>
        </div>

        <div
          className="card"
          style={{
            padding: 28,
          }}
        >
          <span className="pill">
            RESPONSIBLE TRAVEL
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Respect the places you visit
          </h2>

          <p
            className="muted"
            style={{
              lineHeight: 1.7,
            }}
          >
            Learn how to travel with
            greater respect for local
            communities, cultural
            traditions, sacred places and
            high-altitude environments.
          </p>

          <Link
            className="btn alt"
            href="/responsible-travel"
          >
            Responsible Tibet travel
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding:
            "clamp(28px, 5vw, 46px)",
          textAlign: "center",
          background:
            "linear-gradient(135deg, rgba(19,58,61,.9), rgba(16,35,42,.96))",
        }}
      >
        <span className="pill">
          READY TO PLAN?
        </span>

        <h2
          style={{
            marginTop: 16,
            marginBottom: 12,
            fontSize:
              "clamp(30px, 5vw, 46px)",
          }}
        >
          Turn your research into a Tibet
          journey.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Explore existing Tibet journeys,
          compare routes or build a
          private itinerary around your
          dates, priorities and preferred
          travel style.
        </p>

        <div
          className="actions"
          style={{
            justifyContent: "center",
            marginTop: 26,
          }}
        >
          <Link
            className="btn"
            href="/custom-journey"
          >
            Build private Tibet journey
          </Link>

          <Link
            className="btn alt"
            href="/tours"
          >
            Explore Tibet tours
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

function InfoCard({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <div
      style={{
        padding: 20,
        borderRadius: 18,
        border:
          "1px solid rgba(255,255,255,0.10)",
        background:
          "rgba(255,255,255,0.03)",
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: "0.12em",
          opacity: 0.6,
        }}
      >
        {label}
      </span>

      <h3
        style={{
          marginTop: 12,
          marginBottom: 10,
          fontSize: 20,
        }}
      >
        {title}
      </h3>

      <p
        className="muted"
        style={{
          lineHeight: 1.65,
          marginBottom: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
}

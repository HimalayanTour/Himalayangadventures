import Link from "next/link";

const guideTopics = [
  {
    number: "01",
    title: "Altitude & acclimatization",
    text: "High-altitude travel needs gradual ascent, sensible pacing and flexibility. Build acclimatization time into your itinerary and never treat a fixed schedule as more important than safety.",
    tag: "ESSENTIAL",
  },
  {
    number: "02",
    title: "Packing for the Himalaya",
    text: "Pack for changing temperatures, wind, sun and precipitation. Layering is usually more practical than relying on one heavy item, especially when moving between valleys and high passes.",
    tag: "PREPARATION",
  },
  {
    number: "03",
    title: "Permits & entry rules",
    text: "Permit, visa, protected-area and entry requirements vary by destination and route. Requirements can change, so confirm current rules before departure.",
    tag: "DOCUMENTS",
  },
  {
    number: "04",
    title: "Weather & seasons",
    text: "Mountain weather can change quickly and conditions differ greatly by altitude and region. Check current forecasts while also considering seasonal patterns and local reports.",
    tag: "CONDITIONS",
  },
  {
    number: "05",
    title: "Fitness & pacing",
    text: "The right pace depends on altitude, terrain, duration and your experience. A well-designed journey leaves room for rest rather than treating every day as a race.",
    tag: "READINESS",
  },
  {
    number: "06",
    title: "Culture & etiquette",
    text: "The Himalaya includes many languages, religions and traditions. Respect sacred places, local customs, photography preferences and the guidance of your hosts.",
    tag: "RESPECT",
  },
];

const packing = [
  "Layered clothing for changing temperatures",
  "Waterproof outer shell",
  "Comfortable broken-in trekking footwear",
  "Sun protection and sunglasses",
  "Reusable water bottle",
  "Personal medications and essentials",
  "Small daypack for daily necessities",
  "Copies of important travel documents",
];

const planningSteps = [
  {
    step: "01",
    title: "Choose the right region",
    text: "Start with the experience you want: trekking, culture, spirituality, photography, luxury or a combination.",
  },
  {
    step: "02",
    title: "Match the journey to your time",
    text: "Your available days determine how much altitude, distance and acclimatization can responsibly fit into the trip.",
  },
  {
    step: "03",
    title: "Check current conditions",
    text: "Review weather and changing mountain conditions before finalizing daily plans.",
  },
  {
    step: "04",
    title: "Build flexibility",
    text: "Weather, flights, roads and high-altitude conditions can affect Himalayan travel. Keep realistic margins in the itinerary.",
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
      <section
        className="card"
        style={{
          padding: "clamp(28px, 5vw, 56px)",
          marginBottom: 38,
        }}
      >
        <span className="pill">
          HIMALAYAN FIELD GUIDE
        </span>

        <h1
          style={{
            marginTop: 18,
            marginBottom: 18,
            fontSize: "clamp(42px, 7vw, 76px)",
            lineHeight: 1,
            maxWidth: 950,
          }}
        >
          Prepare well.
          <br />
          Travel higher with confidence.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Practical guidance for planning a Himalayan
          journey — from altitude and weather to packing,
          permits, pacing and respectful travel.
        </p>

        <div
          className="actions"
          style={{ marginTop: 28 }}
        >
          <Link
            className="btn"
            href="/ai-trip-planner"
          >
            Ask the AI planner
          </Link>

          <Link
            className="btn alt"
            href="/weather-conditions"
          >
            Check live conditions
          </Link>
        </div>
      </section>

      <section>
        <span className="pill">
          PLANNING ESSENTIALS
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 42px)",
          }}
        >
          What to understand before you go
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            lineHeight: 1.7,
          }}
        >
          Good Himalayan planning is not only about
          choosing a destination. These six areas can
          strongly affect the quality and safety of
          your journey.
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
              style={{ padding: 24 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "center",
                  marginBottom: 18,
                }}
              >
                <strong
                  style={{
                    fontSize: 13,
                    letterSpacing: "0.12em",
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

      <section
        className="card"
        style={{
          marginTop: 38,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          ALTITUDE
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 12,
            fontSize: "clamp(28px, 4vw, 40px)",
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
          Higher is not automatically better. As an
          itinerary gains altitude, your body needs
          time to adapt. The appropriate pace depends
          on the route, sleeping altitude, individual
          response and local conditions.
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
            title="Ascend gradually"
            text="Avoid designing a high-altitude itinerary around speed alone."
          />

          <InfoCard
            label="REST"
            title="Allow recovery time"
            text="Rest and acclimatization days are part of the journey, not wasted days."
          />

          <InfoCard
            label="FLEXIBILITY"
            title="Listen and adapt"
            text="Be prepared to slow down, rest or change plans when conditions require it."
          />

          <InfoCard
            label="LOCAL KNOWLEDGE"
            title="Follow your guide"
            text="Experienced local guidance is especially important in remote mountain environments."
          />
        </div>

        <div
          className="notice"
          style={{ marginTop: 22 }}
        >
          This guide is general travel information,
          not medical advice. High-altitude conditions
          can become serious. Follow qualified medical
          advice and experienced local guidance when
          planning or undertaking high-altitude travel.
        </div>
      </section>

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
          style={{ padding: 28 }}
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
            style={{ lineHeight: 1.7 }}
          >
            Your exact packing list depends on the
            route, season, altitude and accommodation,
            but these items are a useful starting point.
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
                  alignItems: "flex-start",
                }}
              >
                <strong aria-hidden="true">
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
          style={{ padding: 28 }}
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
            Permits and entry requirements
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.75 }}
          >
            Nepal, Bhutan, Tibet and the Indian
            Himalaya have different travel and permit
            systems. Some routes may require special
            permits, registered operators, local guides
            or restricted-area permissions.
          </p>

          <p
            className="muted"
            style={{ lineHeight: 1.75 }}
          >
            Requirements can change. Confirm current
            visa, permit, border and protected-area
            rules with appropriate official sources
            before booking or departure.
          </p>

          <Link
            className="btn alt"
            href="/ai-trip-planner"
          >
            Research my journey
          </Link>
        </div>
      </section>

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          JOURNEY PLANNING
        </span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          A better way to plan
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
                  letterSpacing: "0.12em",
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
          style={{ padding: 28 }}
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
            style={{ lineHeight: 1.7 }}
          >
            View the live weather dashboard and
            7-day planning outlook for key Himalayan
            regions.
          </p>

          <Link
            className="btn"
            href="/weather-conditions"
          >
            View live conditions
          </Link>
        </div>

        <div
          className="card"
          style={{ padding: 28 }}
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
            style={{ lineHeight: 1.7 }}
          >
            Learn how to travel with greater respect
            for local communities, cultures and
            mountain environments.
          </p>

          <Link
            className="btn alt"
            href="/responsible-travel"
          >
            Responsible travel guide
          </Link>
        </div>
      </section>

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(28px, 5vw, 46px)",
          textAlign: "center",
        }}
      >
        <span className="pill">
          READY TO PLAN?
        </span>

        <h2
          style={{
            marginTop: 16,
            marginBottom: 12,
            fontSize: "clamp(30px, 5vw, 46px)",
          }}
        >
          Turn your research into a Himalayan journey.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 720,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Compare existing journeys or build a
          private itinerary around your dates,
          priorities and travel style.
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
            Build custom journey
          </Link>

          <Link
            className="btn alt"
            href="/tours"
          >
            Explore tours
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

import Link from "next/link";

const highlights = [
  {
    label: "LUKLA & KHUMBU",
    title: "Gateway to Everest",
    text: "Enter the Khumbu and follow the classic mountain route through Sherpa communities, forests, suspension bridges and increasingly dramatic alpine terrain.",
  },
  {
    label: "NAMCHE BAZAAR",
    title: "Acclimatize, don't rush",
    text: "Namche is an important stage of the journey. Good itineraries use the surrounding area for acclimatization before continuing higher.",
  },
  {
    label: "EVEREST BASE CAMP",
    title: "The iconic objective",
    text: "Reach Everest Base Camp through a gradual high-altitude journey where the experience of the Khumbu is as important as the destination.",
  },
  {
    label: "KALA PATTHAR",
    title: "Mountain panorama",
    text: "For many trekkers, the high viewpoint above Gorak Shep provides one of the journey's most memorable perspectives across the Everest landscape.",
  },
];

const planning = [
  {
    number: "01",
    title: "Respect the altitude",
    text: "Everest Base Camp is a high-altitude trek. A strong itinerary includes gradual ascent, acclimatization days and flexibility rather than simply moving higher every day.",
  },
  {
    number: "02",
    title: "Train for consistency",
    text: "Prepare for repeated walking days rather than one difficult effort. Comfortable endurance, hills and time on your feet are more useful than speed.",
  },
  {
    number: "03",
    title: "Prepare for changing weather",
    text: "Conditions can change quickly in the mountains and flights serving the region can be affected by weather. Keep some flexibility around important travel connections.",
  },
  {
    number: "04",
    title: "Pack for different elevations",
    text: "Temperatures and conditions change significantly as the route climbs. Use practical layers and prepare for cold mornings, sun, wind and changing precipitation.",
  },
];

export default function Page() {
  return (
    <section className="section">
      <div className="container">
        {/* HERO */}
        <div
          className="card"
          style={{
            padding: "58px 58px",
            marginBottom: 34,
            background:
              "linear-gradient(135deg, rgba(23,39,48,.96), rgba(18,69,73,.78))",
          }}
        >
          <div
            className="eyebrow"
            style={{
              marginBottom: 22,
              letterSpacing: ".16em",
            }}
          >
            EVEREST · NEPAL
          </div>

          <h1
            style={{
              fontSize: "clamp(3rem, 6vw, 5rem)",
              lineHeight: 0.98,
              maxWidth: 900,
              marginBottom: 24,
            }}
          >
            Walk into the heart
            <br />
            of the Everest region.
          </h1>

          <p
            className="muted"
            style={{
              fontSize: 18,
              lineHeight: 1.75,
              maxWidth: 900,
            }}
          >
            Journey through the Khumbu toward Everest Base Camp with a route
            designed around acclimatization, realistic pacing and enough time
            to experience the mountain communities along the way.
          </p>

          <div className="actions" style={{ marginTop: 28 }}>
            <Link className="btn" href="/tours/everest-base-camp">
              Explore Everest Base Camp
            </Link>

            <Link
              className="btn alt"
              href="/custom-journey?destination=Nepal"
            >
              Build a private Everest journey
            </Link>
          </div>
        </div>

        {/* ROUTE EXPERIENCE */}
        <div style={{ marginTop: 40 }}>
          <div
            className="eyebrow"
            style={{
              marginBottom: 16,
              letterSpacing: ".14em",
            }}
          >
            THE EVEREST EXPERIENCE
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: 12,
            }}
          >
            More than a walk to Base Camp
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 900,
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            The classic Everest journey moves through very different
            landscapes and elevations. The route becomes stronger when
            acclimatization, local culture and the changing mountain
            environment are treated as part of the experience.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 16,
            }}
          >
            {highlights.map((item) => (
              <div
                className="card"
                key={item.label}
                style={{
                  padding: 24,
                  minHeight: 255,
                }}
              >
                <div
                  className="eyebrow"
                  style={{
                    marginBottom: 18,
                    letterSpacing: ".13em",
                  }}
                >
                  {item.label}
                </div>

                <h3
                  style={{
                    fontSize: 23,
                    lineHeight: 1.15,
                    marginBottom: 14,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TOUR */}
        <div style={{ marginTop: 58 }}>
          <div
            className="eyebrow"
            style={{
              marginBottom: 16,
              letterSpacing: ".14em",
            }}
          >
            FEATURED JOURNEY
          </div>

          <div className="card" style={{ padding: 34 }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 28,
              }}
            >
              <div style={{ maxWidth: 720 }}>
                <div className="eyebrow" style={{ marginBottom: 14 }}>
                  EVEREST · NEPAL
                </div>

                <h2
                  style={{
                    fontSize: "clamp(2rem, 4vw, 2.7rem)",
                    marginBottom: 14,
                  }}
                >
                  Everest Base Camp
                </h2>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.7,
                    marginBottom: 18,
                  }}
                >
                  Our classic 14-day Everest journey combines the legendary
                  Khumbu trail with acclimatization and a realistic progression
                  toward Everest Base Camp.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <span className="pill">14 days</span>
                  <span className="pill">Challenging</span>
                  <span className="pill">From $1,490</span>
                </div>
              </div>

              <Link className="btn" href="/tours/everest-base-camp">
                View full journey
              </Link>
            </div>
          </div>
        </div>

        {/* PLANNING */}
        <div style={{ marginTop: 58 }}>
          <div
            className="eyebrow"
            style={{
              marginBottom: 16,
              letterSpacing: ".14em",
            }}
          >
            PREPARE FOR EVEREST
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: 12,
            }}
          >
            The mountain decides the pace
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 850,
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            Good Everest planning is less about moving quickly and more about
            giving your body, schedule and equipment enough room to adapt to
            the mountain environment.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 16,
            }}
          >
            {planning.map((item) => (
              <div
                className="card"
                key={item.number}
                style={{
                  padding: 24,
                  minHeight: 250,
                }}
              >
                <div
                  className="muted"
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: ".15em",
                    marginBottom: 18,
                  }}
                >
                  GUIDE {item.number}
                </div>

                <h3
                  style={{
                    fontSize: 22,
                    marginBottom: 14,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* LIVE CONDITIONS LINK */}
        <div
          className="card"
          style={{
            marginTop: 58,
            padding: 34,
          }}
        >
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            MOUNTAIN CONDITIONS
          </div>

          <h2 style={{ marginBottom: 12 }}>
            Check conditions while you plan
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 780,
              lineHeight: 1.7,
            }}
          >
            Use the conditions page to see the current Everest-region weather
            data and seven-day forecast already connected to the website.
            Mountain forecasts are planning information, not a guarantee of
            trail or flight conditions.
          </p>

          <div className="actions" style={{ marginTop: 22 }}>
            <Link className="btn" href="/weather-conditions">
              View Everest conditions
            </Link>

            <Link className="btn alt" href="/himalayan-guide">
              Read the Himalayan guide
            </Link>
          </div>
        </div>

        {/* FINAL CTA */}
        <div
          className="card"
          style={{
            marginTop: 24,
            padding: 34,
          }}
        >
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            PLAN YOUR EVEREST JOURNEY
          </div>

          <h2 style={{ marginBottom: 12 }}>
            Build an Everest plan around you.
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 760,
              lineHeight: 1.7,
            }}
          >
            Compare the classic route, discuss your dates and priorities, or
            ask the AI planner to help you understand pacing, preparation and
            itinerary options.
          </p>

          <div className="actions" style={{ marginTop: 22 }}>
            <Link
              className="btn"
              href="/custom-journey?destination=Nepal"
            >
              Design my Everest journey
            </Link>

            <Link
              className="btn alt"
              href="/ai-trip-planner?prompt=Help%20me%20plan%20an%20Everest%20Base%20Camp%20journey%20with%20realistic%20acclimatization%2C%20preparation%20and%20pacing."
            >
              Plan Everest with AI
            </Link>
          </div>
        </div>

        <p
          className="muted"
          style={{
            fontSize: 13,
            lineHeight: 1.6,
            marginTop: 18,
          }}
        >
          High-altitude travel carries real risks. Weather, trail conditions,
          transport and individual acclimatization vary. Use professional
          guidance and current local information when making trekking
          decisions.
        </p>
      </div>
    </section>
  );
}

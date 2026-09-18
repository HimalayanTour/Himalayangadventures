import Link from "next/link";

const highlights = [
  {
    eyebrow: "LANGTANG VALLEY",
    title: "A valley beneath the high peaks",
    text: "Follow the Langtang Valley through forests, mountain settlements and increasingly dramatic alpine landscapes.",
  },
  {
    eyebrow: "MOUNTAIN CULTURE",
    title: "Communities along the route",
    text: "Langtang is more than mountain scenery. Villages, local traditions and everyday life are an important part of the journey.",
  },
  {
    eyebrow: "KYANJIN GOMPA",
    title: "A mountain base",
    text: "Kyanjin Gompa provides time to experience the upper valley and explore surrounding viewpoints while keeping the itinerary sensibly paced.",
  },
  {
    eyebrow: "SHORTER JOURNEY",
    title: "Big Himalaya, less time",
    text: "For travelers with a shorter schedule, Langtang offers a substantial Himalayan trekking experience without requiring a two-week itinerary.",
  },
];

const planning = [
  {
    number: "01",
    title: "Respect the altitude",
    text: "A shorter itinerary does not remove the effects of altitude. The route should still allow sensible ascent and time to adjust.",
  },
  {
    number: "02",
    title: "Prepare for mountain weather",
    text: "Conditions can change quickly with elevation and season. Carry appropriate layers and check current forecasts and local conditions.",
  },
  {
    number: "03",
    title: "Keep the pace realistic",
    text: "Walking time, elevation gain and rest matter more than simply covering distance. Leave enough time to enjoy the valley.",
  },
  {
    number: "04",
    title: "Travel with local awareness",
    text: "Langtang is home to living mountain communities. Respect local customs, settlements, trails and the environment throughout the journey.",
  },
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
              padding: "clamp(32px, 5vw, 64px)",
              background:
                "linear-gradient(135deg, rgba(22,42,49,.96), rgba(13,73,75,.72))",
            }}
          >
            <div
              className="eyebrow"
              style={{ marginBottom: 22, letterSpacing: ".18em" }}
            >
              LANGTANG · NEPAL
            </div>

            <h1
              style={{
                maxWidth: 850,
                fontSize: "clamp(46px, 7vw, 76px)",
                lineHeight: 0.98,
                marginBottom: 24,
              }}
            >
              A quieter trail
              <br />
              into the Himalaya.
            </h1>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              Trek through the Langtang Valley across forests, mountain
              villages and high alpine landscapes — a rewarding Himalayan
              journey for travelers who want strong scenery in a shorter
              itinerary.
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
              <Link className="btn" href="/tours/langtang-valley">
                Explore Langtang Valley
              </Link>

              <Link className="btn alt" href="/custom-journey">
                Build a private Langtang journey
              </Link>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div style={{ marginTop: 44 }}>
            <div
              className="eyebrow"
              style={{ marginBottom: 14, letterSpacing: ".16em" }}
            >
              THE LANGTANG EXPERIENCE
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              Close to Kathmandu. Deep in the mountains.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              Langtang offers a compact but varied Himalayan journey. The trail
              moves from lower forested landscapes toward an open high valley,
              surrounded by peaks and mountain communities.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(230px, 1fr))",
                gap: 16,
              }}
            >
              {highlights.map((item) => (
                <div key={item.title} className="card" style={{ padding: 24 }}>
                  <div
                    className="eyebrow"
                    style={{
                      marginBottom: 14,
                      letterSpacing: ".13em",
                    }}
                  >
                    {item.eyebrow}
                  </div>

                  <h3 style={{ marginBottom: 12 }}>{item.title}</h3>

                  <p className="muted" style={{ lineHeight: 1.75 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FEATURED JOURNEY */}
          <div style={{ marginTop: 54 }}>
            <div
              className="eyebrow"
              style={{ marginBottom: 14, letterSpacing: ".16em" }}
            >
              FEATURED JOURNEY
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 24,
              }}
            >
              Langtang Valley
            </h2>

            <div
              className="card"
              style={{
                padding: 28,
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 22,
              }}
            >
              <div>
                <div className="muted" style={{ marginBottom: 6 }}>
                  Region
                </div>
                <strong>Nepal</strong>
              </div>

              <div>
                <div className="muted" style={{ marginBottom: 6 }}>
                  Duration
                </div>
                <strong>8 days</strong>
              </div>

              <div>
                <div className="muted" style={{ marginBottom: 6 }}>
                  Difficulty
                </div>
                <strong>Moderate</strong>
              </div>

              <div>
                <div className="muted" style={{ marginBottom: 6 }}>
                  Starting from
                </div>
                <strong>$990</strong>
              </div>

              <div style={{ alignSelf: "end" }}>
                <Link className="btn" href="/tours/langtang-valley">
                  View journey
                </Link>
              </div>
            </div>
          </div>

          {/* PLANNING */}
          <div style={{ marginTop: 54 }}>
            <div
              className="eyebrow"
              style={{ marginBottom: 14, letterSpacing: ".16em" }}
            >
              PLAN LANGTANG WELL
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              Shorter does not mean rushed.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              Langtang can fit into a shorter Nepal journey, but altitude,
              weather, walking pace and mountain conditions still deserve
              careful planning.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(230px, 1fr))",
                gap: 16,
              }}
            >
              {planning.map((item) => (
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
                    PRIORITY {item.number}
                  </div>

                  <h3 style={{ marginBottom: 12 }}>{item.title}</h3>

                  <p className="muted" style={{ lineHeight: 1.75 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CONDITIONS */}
          <div
            className="card"
            style={{
              marginTop: 54,
              padding: 28,
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 12 }}>
              BEFORE YOU TREK
            </div>

            <h2 style={{ marginBottom: 12 }}>
              Check current mountain conditions.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 780,
                lineHeight: 1.8,
              }}
            >
              Forecasts are only one part of Himalayan planning. Review current
              weather and conditions close to departure and follow local
              guidance when you are in the mountains.
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
              padding: "clamp(28px, 4vw, 46px)",
              background:
                "linear-gradient(135deg, rgba(19,58,61,.9), rgba(16,35,42,.96))",
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              YOUR LANGTANG JOURNEY
            </div>

            <h2
              style={{
                fontSize: "clamp(30px, 4vw, 44px)",
                marginBottom: 14,
              }}
            >
              Build the journey around your pace.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 760,
                lineHeight: 1.8,
              }}
            >
              Explore the existing Langtang route or create a private journey
              around your dates, priorities and preferred travel style.
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
                Plan with AI
              </Link>

              <Link className="btn alt" href="/custom-journey">
                Create my journey
              </Link>

              <Link className="btn alt" href="/compare-trips">
                Compare trips
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

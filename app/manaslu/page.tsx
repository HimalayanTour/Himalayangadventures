import Link from "next/link";

const highlights = [
  {
    eyebrow: "REMOTE NEPAL",
    title: "A quieter Himalayan circuit",
    text: "The Manaslu Circuit travels through remote valleys and mountain settlements, offering a different rhythm from Nepal's busier trekking regions.",
  },
  {
    eyebrow: "CHANGING LANDSCAPES",
    title: "From valleys to high mountains",
    text: "The journey climbs through dramatically changing terrain as lower valleys give way to increasingly rugged high-altitude landscapes.",
  },
  {
    eyebrow: "LARKYA LA",
    title: "The high crossing",
    text: "Larkya La is a major objective of the circuit. Reaching the pass requires sensible acclimatization, preparation and flexibility for mountain conditions.",
  },
  {
    eyebrow: "MOUNTAIN COMMUNITIES",
    title: "Culture along the trail",
    text: "Villages and communities are an essential part of the Manaslu experience. Travel respectfully and allow time to understand the places you move through.",
  },
];

const planning = [
  {
    number: "01",
    title: "Allow enough time",
    text: "Manaslu should not be compressed into an unnecessarily fast itinerary. Gradual ascent and acclimatization days strengthen the journey.",
  },
  {
    number: "02",
    title: "Prepare for remoteness",
    text: "Facilities and transport can be more limited than on heavily traveled routes, so preparation and realistic expectations matter.",
  },
  {
    number: "03",
    title: "Watch mountain conditions",
    text: "Weather, trail conditions and conditions around the high pass can change. Current local information should guide decisions on the route.",
  },
  {
    number: "04",
    title: "Plan permits carefully",
    text: "The Manaslu region has trekking and access requirements that should be confirmed using current official information before departure.",
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
              MANASLU · NEPAL
            </div>

            <h1
              style={{
                maxWidth: 900,
                fontSize: "clamp(46px, 7vw, 76px)",
                lineHeight: 0.98,
                marginBottom: 24,
              }}
            >
              Take the quieter road
              <br />
              around the mountains.
            </h1>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              Circle the Manaslu region through remote valleys, mountain
              communities and high-altitude terrain on a journey designed
              around acclimatization, realistic pacing and the demands of a
              major Himalayan crossing.
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
              <Link className="btn" href="/tours/manaslu-circuit">
                Explore Manaslu Circuit
              </Link>

              <Link className="btn alt" href="/custom-journey">
                Build a private Manaslu journey
              </Link>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div style={{ marginTop: 44 }}>
            <div
              className="eyebrow"
              style={{ marginBottom: 14, letterSpacing: ".16em" }}
            >
              THE MANASLU EXPERIENCE
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              Remote valleys. High passes. A slower rhythm.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              Manaslu rewards travelers who are comfortable with longer days,
              changing conditions and a more remote mountain environment. The
              circuit is as much about the valleys and communities as the high
              pass itself.
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
              Manaslu Circuit
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
                <strong>15 days</strong>
              </div>

              <div>
                <div className="muted" style={{ marginBottom: 6 }}>
                  Difficulty
                </div>
                <strong>Challenging</strong>
              </div>

              <div>
                <div className="muted" style={{ marginBottom: 6 }}>
                  Starting from
                </div>
                <strong>$1,690</strong>
              </div>

              <div style={{ alignSelf: "end" }}>
                <Link className="btn" href="/tours/manaslu-circuit">
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
              PLAN MANASLU WELL
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              A remote circuit needs careful planning.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              The route reaches significant altitude and passes through remote
              terrain. Preparation should consider acclimatization, permits,
              weather, trail conditions and the experience of the traveler.
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
              BEFORE THE CIRCUIT
            </div>

            <h2 style={{ marginBottom: 12 }}>
              Check current conditions before departure.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 780,
                lineHeight: 1.8,
              }}
            >
              Permit requirements, trail access, weather and mountain
              conditions can change. Confirm current information before your
              journey and follow qualified local guidance on the route.
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
              YOUR MANASLU JOURNEY
            </div>

            <h2
              style={{
                fontSize: "clamp(30px, 4vw, 44px)",
                marginBottom: 14,
              }}
            >
              Give the mountains enough time.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 760,
                lineHeight: 1.8,
              }}
            >
              Explore the existing Manaslu Circuit or create a private journey
              around your dates, experience, preferred pace and travel
              priorities.
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

import Link from "next/link";

const highlights = [
  {
    eyebrow: "MOUNTAIN VIEWS",
    title: "A changing panorama",
    text: "Travel through valleys and high mountain country with views shaped by Annapurna, Dhaulagiri and the surrounding Himalayan ranges.",
  },
  {
    eyebrow: "VILLAGES & CULTURE",
    title: "Life along the trail",
    text: "The Annapurna region connects mountain landscapes with villages, local traditions and communities that give the journey its character.",
  },
  {
    eyebrow: "THORONG LA",
    title: "A high-altitude crossing",
    text: "Longer Annapurna routes can include the dramatic Thorong La crossing, where careful acclimatization and sensible pacing are essential.",
  },
  {
    eyebrow: "FLEXIBLE ROUTES",
    title: "Choose your rhythm",
    text: "From shorter mountain journeys to longer circuits, Annapurna offers several ways to match the route to your time, experience and priorities.",
  },
];

const planning = [
  {
    number: "01",
    title: "Build in acclimatization",
    text: "Higher routes need a gradual ascent and enough flexibility for your body to adjust to altitude.",
  },
  {
    number: "02",
    title: "Prepare for changing weather",
    text: "Conditions can vary significantly between valleys, elevations and seasons. Check current information before departure.",
  },
  {
    number: "03",
    title: "Choose the right route",
    text: "Duration, difficulty and scenery vary across the region. The best itinerary depends on your available time and trekking experience.",
  },
  {
    number: "04",
    title: "Leave room for the journey",
    text: "A strong Annapurna itinerary is not only about reaching a pass or viewpoint. Villages, landscapes and slower days are part of the experience.",
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
              ANNAPURNA · NEPAL
            </div>

            <h1
              style={{
                maxWidth: 850,
                fontSize: "clamp(46px, 7vw, 76px)",
                lineHeight: 0.98,
                marginBottom: 24,
              }}
            >
              A Himalayan classic
              <br />
              with many ways to explore.
            </h1>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              Journey through the Annapurna region across mountain valleys,
              traditional villages and high-altitude landscapes — with a route
              shaped around your time, experience and preferred pace.
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
                href="/tours/annapurna-classic"
              >
                Explore Annapurna Classic
              </Link>

              <Link
                className="btn alt"
                href="/custom-journey"
              >
                Build a private Annapurna journey
              </Link>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div style={{ marginTop: 44 }}>
            <div
              className="eyebrow"
              style={{ marginBottom: 14, letterSpacing: ".16em" }}
            >
              THE ANNAPURNA EXPERIENCE
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              One region. Many different journeys.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              Annapurna is one of Nepal&apos;s most varied mountain regions.
              Routes can move through subtropical valleys, high mountain
              settlements, dramatic viewpoints and remote high-altitude
              landscapes.
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
                <div
                  key={item.title}
                  className="card"
                  style={{ padding: 24 }}
                >
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

                  <p
                    className="muted"
                    style={{ lineHeight: 1.75 }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ROUTE SNAPSHOT */}
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
              Annapurna Classic
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
                <strong>10 days</strong>
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
                <strong>$1,190</strong>
              </div>

              <div style={{ alignSelf: "end" }}>
                <Link
                  className="btn"
                  href="/tours/annapurna-classic"
                >
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
              PLAN WELL
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              A better Annapurna journey starts with the right pace.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              Mountain travel should be planned around altitude, weather,
              route conditions and your own experience rather than treating
              every itinerary as fixed.
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

                  <p
                    className="muted"
                    style={{ lineHeight: 1.75 }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
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
              YOUR ANNAPURNA JOURNEY
            </div>

            <h2
              style={{
                fontSize: "clamp(30px, 4vw, 44px)",
                marginBottom: 14,
              }}
            >
              Find the Annapurna route that fits you.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 760,
                lineHeight: 1.8,
              }}
            >
              Compare journeys, create a private itinerary or use the AI
              planner to explore the right duration, difficulty and travel
              style for your trip.
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

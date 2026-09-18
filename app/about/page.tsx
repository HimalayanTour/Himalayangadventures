import Link from "next/link";

const principles = [
  {
    number: "01",
    title: "Thoughtful planning",
    text: "A Himalayan journey should fit the traveler, not simply follow a template. We focus on pace, altitude, interests, time and the character of each destination.",
  },
  {
    number: "02",
    title: "Responsible travel",
    text: "Mountain landscapes are also homes and living cultural environments. Our approach encourages respect for local communities, traditions and fragile environments.",
  },
  {
    number: "03",
    title: "Better information",
    text: "Good decisions depend on useful information. Our planning tools bring together journey details, weather context and travel guidance while keeping important conditions visible.",
  },
  {
    number: "04",
    title: "Human-centered technology",
    text: "AI can help travelers explore possibilities and organize complex information, but it should support thoughtful travel planning rather than replace local expertise and current official guidance.",
  },
];

const regions = [
  {
    name: "Nepal",
    text: "Everest, Annapurna, Langtang, Manaslu and Mustang.",
    href: "/nepal",
  },
  {
    name: "Bhutan",
    text: "Mountain landscapes, cultural experiences and carefully paced journeys.",
    href: "/bhutan",
  },
  {
    name: "Tibet",
    text: "High-plateau landscapes and culturally significant journeys.",
    href: "/tibet",
  },
  {
    name: "India Himalaya",
    text: "High-altitude landscapes and journeys including Ladakh.",
    href: "/india-himalaya",
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
              ABOUT HIMALAYAN ADVENTURES
            </div>

            <h1
              style={{
                maxWidth: 920,
                fontSize: "clamp(46px, 7vw, 76px)",
                lineHeight: 0.98,
                marginBottom: 24,
              }}
            >
              Better journeys begin
              <br />
              with better planning.
            </h1>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              Himalayan Adventures is a modern travel-planning platform for
              exploring the Himalaya with greater clarity — combining curated
              journeys, practical guidance and intelligent planning tools to
              help travelers understand their options before they go.
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
              <Link className="btn" href="/tours">
                Explore our journeys
              </Link>

              <Link className="btn alt" href="/ai-trip-planner">
                Plan with AI
              </Link>
            </div>
          </div>

          {/* OUR APPROACH */}
          <div style={{ marginTop: 54 }}>
            <div
              className="eyebrow"
              style={{
                marginBottom: 14,
                letterSpacing: ".16em",
              }}
            >
              OUR APPROACH
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              The Himalaya deserves more than a generic itinerary.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 900,
                lineHeight: 1.8,
                marginBottom: 30,
              }}
            >
              Every Himalayan region has a different landscape, culture,
              altitude profile and travel rhythm. We want travelers to compare
              those differences clearly and build journeys around what matters
              to them — rather than choosing only by a photograph or a famous
              destination name.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(230px, 1fr))",
                gap: 16,
              }}
            >
              {principles.map((item) => (
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
                    PRINCIPLE {item.number}
                  </div>

                  <h3 style={{ marginBottom: 12 }}>{item.title}</h3>

                  <p className="muted" style={{ lineHeight: 1.75 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* TECHNOLOGY */}
          <div
            className="card"
            style={{
              marginTop: 54,
              padding: "clamp(28px, 4vw, 44px)",
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 14,
                letterSpacing: ".16em",
              }}
            >
              TRAVEL PLANNING · 2026
            </div>

            <h2
              style={{
                fontSize: "clamp(30px, 4vw, 44px)",
                marginBottom: 14,
              }}
            >
              Technology that helps you ask better questions.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                lineHeight: 1.8,
              }}
            >
              Our planning experience combines structured tour information
              with AI-assisted trip planning, comparison tools and travel
              research. The goal is simple: help you move from a vague idea to
              a more informed journey.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(210px, 1fr))",
                gap: 14,
                marginTop: 28,
              }}
            >
              <div className="card" style={{ padding: 22 }}>
                <div className="eyebrow" style={{ marginBottom: 10 }}>
                  AI PLANNING
                </div>
                <strong>Turn your travel ideas into useful criteria.</strong>
              </div>

              <div className="card" style={{ padding: 22 }}>
                <div className="eyebrow" style={{ marginBottom: 10 }}>
                  TRIP COMPARISON
                </div>
                <strong>Compare journeys before choosing a route.</strong>
              </div>

              <div className="card" style={{ padding: 22 }}>
                <div className="eyebrow" style={{ marginBottom: 10 }}>
                  CONDITIONS
                </div>
                <strong>
                  Keep weather, altitude and changing conditions visible.
                </strong>
              </div>

              <div className="card" style={{ padding: 22 }}>
                <div className="eyebrow" style={{ marginBottom: 10 }}>
                  CUSTOM JOURNEYS
                </div>
                <strong>
                  Build around your dates, pace and priorities.
                </strong>
              </div>
            </div>

            <div
              className="actions"
              style={{
                marginTop: 26,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <Link className="btn" href="/ai-trip-planner">
                Try the AI planner
              </Link>

              <Link className="btn alt" href="/compare-trips">
                Compare trips
              </Link>
            </div>
          </div>

          {/* REGIONS */}
          <div style={{ marginTop: 54 }}>
            <div
              className="eyebrow"
              style={{
                marginBottom: 14,
                letterSpacing: ".16em",
              }}
            >
              ACROSS THE HIMALAYA
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              One mountain system. Many different worlds.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              Explore journeys across several Himalayan regions, each with its
              own landscapes, cultures and travel considerations.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(230px, 1fr))",
                gap: 16,
              }}
            >
              {regions.map((region) => (
                <Link
                  key={region.name}
                  href={region.href}
                  className="card"
                  style={{
                    padding: 24,
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div
                    className="eyebrow"
                    style={{
                      marginBottom: 12,
                      letterSpacing: ".14em",
                    }}
                  >
                    EXPLORE
                  </div>

                  <h3 style={{ marginBottom: 10 }}>{region.name}</h3>

                  <p className="muted" style={{ lineHeight: 1.75 }}>
                    {region.text}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* RESPONSIBILITY */}
          <div style={{ marginTop: 54 }}>
            <div
              className="eyebrow"
              style={{
                marginBottom: 14,
                letterSpacing: ".16em",
              }}
            >
              RESPONSIBLE TRAVEL
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              Travel with respect for where you are.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                lineHeight: 1.8,
              }}
            >
              The Himalaya is not simply an adventure destination. It is home
              to communities, cultures and sensitive mountain environments.
              Responsible travel begins with preparation, respect and an
              understanding that visitors are guests.
            </p>

            <div className="actions" style={{ marginTop: 22 }}>
              <Link className="btn alt" href="/responsible-travel">
                Our responsible travel approach
              </Link>
            </div>
          </div>

          {/* FINAL CTA */}
          <div
            className="card"
            style={{
              marginTop: 60,
              padding: "clamp(30px, 5vw, 50px)",
              background:
                "linear-gradient(135deg, rgba(19,58,61,.9), rgba(16,35,42,.96))",
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              START YOUR JOURNEY
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              Start with the journey you want to experience.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 780,
                lineHeight: 1.8,
              }}
            >
              Explore our existing Himalayan journeys or create a private
              itinerary around your dates, interests, preferred pace and
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
              <Link className="btn" href="/tours">
                Explore tours
              </Link>

              <Link className="btn alt" href="/custom-journey">
                Create a custom journey
              </Link>

              <Link className="btn alt" href="/contact-book">
                Request a trip
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

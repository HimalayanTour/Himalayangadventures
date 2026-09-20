import Link from "next/link";

const principles = [
  {
    number: "01",
    title: "Tibet-focused planning",
    text:
      "We focus on one extraordinary destination. Every journey is considered around pace, altitude, interests, available time and the character of the Tibet experience.",
  },
  {
    number: "02",
    title: "Respectful travel",
    text:
      "Tibet is a living cultural environment, not simply a landscape to pass through. Thoughtful travel begins with respect for local communities, traditions, religious places and fragile environments.",
  },
  {
    number: "03",
    title: "Better information",
    text:
      "High-altitude travel requires good preparation. Our planning tools bring together journey information, weather context and practical guidance while keeping changing conditions visible.",
  },
  {
    number: "04",
    title: "Human-centered technology",
    text:
      "AI can help travelers explore possibilities and organize complex information, but it should support thoughtful planning rather than replace current official information and appropriate local expertise.",
  },
];

const experiences = [
  {
    eyebrow: "CULTURAL HEART",
    name: "Lhasa",
    text:
      "Begin with the cultural and historic heart of many Tibet journeys, with time to adjust to the altitude and experience the city at a thoughtful pace.",
    href: "/tours/lhasa-classic",
  },
  {
    eyebrow: "LHOKA · SOUTHERN TIBET",
    name: "Lhoka (Southern Tibet)",
    text:
      "Travel south of Lhasa into Lhoka through broad valleys, monasteries, historic places and important cultural landscapes.",
    href: "/tours/lhoka-southern-tibet",
  },
  {
    eyebrow: "HIMALAYAN LANDSCAPES",
    name: "Everest",
    text:
      "Journey from Lhasa toward the great Himalayan landscapes of the Tibet side of Everest.",
    href: "/tours/lhasa-everest-base-camp",
  },
  {
    eyebrow: "SACRED WESTERN TIBET",
    name: "Mount Kailash",
    text:
      "Explore a remote high-altitude landscape shaped by pilgrimage, reflection and one of Tibet's most significant sacred mountains.",
    href: "/tours/kailash-kora",
  },
  {
    eyebrow: "HIGH PLATEAU",
    name: "Namtso",
    text:
      "Experience expansive plateau scenery and the high-elevation landscapes surrounding Namtso Lake.",
    href: "/tours/namtso-lake",
  },
  {
    eyebrow: "SLOWER OBSERVATION",
    name: "Photography",
    text:
      "Build a journey around light, landscape, architecture and more time to observe Tibet through a camera.",
    href: "/tours/tibet-photography",
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
              padding:
                "clamp(34px, 5vw, 64px)",
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
              ABOUT HIMALAYAN ADVENTURES
            </div>

            <h1
              style={{
                maxWidth: 940,
                fontSize:
                  "clamp(46px, 7vw, 76px)",
                lineHeight: 0.98,
                marginBottom: 24,
              }}
            >
              One destination.
              <br />
              Deeper Tibet planning.
            </h1>

            <p
              className="muted"
              style={{
                maxWidth: 870,
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              Himalayan Adventures is a
              Tibet-focused travel-planning
              platform designed to help
              travelers understand the
              plateau before they go. We
              combine curated Tibet
              journeys, practical planning
              information and intelligent
              tools to make complex travel
              decisions clearer.
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
                href="/tours"
              >
                Explore Tibet journeys
              </Link>

              <Link
                className="btn alt"
                href="/ai-trip-planner"
              >
                Plan Tibet with AI
              </Link>
            </div>
          </div>

          {/* SPECIALIST POSITION */}

          <div
            style={{
              marginTop: 54,
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 14,
                letterSpacing: ".16em",
              }}
            >
              WHY TIBET
            </div>

            <h2
              style={{
                fontSize:
                  "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
                maxWidth: 900,
              }}
            >
              We would rather understand
              one destination deeply than
              pretend every mountain
              journey is the same.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 920,
                lineHeight: 1.8,
                marginBottom: 30,
              }}
            >
              Tibet brings together
              extraordinary altitude,
              immense landscapes, historic
              cities, monasteries, sacred
              places and long overland
              routes. Those elements make
              good planning especially
              important. Our focus is to
              help travelers understand
              the differences between
              Tibet journeys and choose an
              experience that fits their
              time, interests and preferred
              pace.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(230px, 1fr))",
                gap: 16,
              }}
            >
              {principles.map(
                (item) => (
                  <div
                    key={item.number}
                    className="card"
                    style={{
                      padding: 24,
                    }}
                  >
                    <div
                      className="eyebrow"
                      style={{
                        marginBottom: 14,
                        letterSpacing:
                          ".14em",
                      }}
                    >
                      PRINCIPLE{" "}
                      {item.number}
                    </div>

                    <h3
                      style={{
                        marginBottom: 12,
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="muted"
                      style={{
                        lineHeight: 1.75,
                        marginBottom: 0,
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* TECHNOLOGY */}

          <div
            className="card"
            style={{
              marginTop: 54,
              padding:
                "clamp(28px, 4vw, 44px)",
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 14,
                letterSpacing: ".16em",
              }}
            >
              TIBET PLANNING · 2026
            </div>

            <h2
              style={{
                fontSize:
                  "clamp(30px, 4vw, 44px)",
                marginBottom: 14,
              }}
            >
              Technology that helps you
              ask better travel questions.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 870,
                lineHeight: 1.8,
              }}
            >
              Our planning experience
              combines structured Tibet
              journey information with
              AI-assisted planning,
              comparison tools, live
              weather context and travel
              research. The goal is to
              help you move from a general
              idea to a clearer and more
              informed Tibet journey.
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
              <div
                className="card"
                style={{ padding: 22 }}
              >
                <div
                  className="eyebrow"
                  style={{
                    marginBottom: 10,
                  }}
                >
                  AI PLANNING
                </div>

                <strong>
                  Turn your Tibet travel
                  ideas into useful journey
                  criteria.
                </strong>
              </div>

              <div
                className="card"
                style={{ padding: 22 }}
              >
                <div
                  className="eyebrow"
                  style={{
                    marginBottom: 10,
                  }}
                >
                  JOURNEY COMPARISON
                </div>

                <strong>
                  Compare Tibet routes,
                  duration, pace and
                  altitude before choosing.
                </strong>
              </div>

              <div
                className="card"
                style={{ padding: 22 }}
              >
                <div
                  className="eyebrow"
                  style={{
                    marginBottom: 10,
                  }}
                >
                  LIVE CONDITIONS
                </div>

                <strong>
                  Keep current weather and
                  high-altitude conditions
                  visible while planning.
                </strong>
              </div>

              <div
                className="card"
                style={{ padding: 22 }}
              >
                <div
                  className="eyebrow"
                  style={{
                    marginBottom: 10,
                  }}
                >
                  PRIVATE JOURNEYS
                </div>

                <strong>
                  Build around your dates,
                  pace, interests and
                  priorities.
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
              <Link
                className="btn"
                href="/ai-trip-planner"
              >
                Try the Tibet AI planner
              </Link>

              <Link
                className="btn alt"
                href="/compare-trips"
              >
                Compare Tibet journeys
              </Link>

              <Link
                className="btn alt"
                href="/weather-conditions"
              >
                Live conditions
              </Link>
            </div>
          </div>

          {/* EXPERIENCES */}

          <div
            style={{
              marginTop: 54,
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 14,
                letterSpacing: ".16em",
              }}
            >
              ACROSS TIBET
            </div>

            <h2
              style={{
                fontSize:
                  "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              One plateau. Many ways to
              experience it.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 860,
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              Our Tibet collection is
              organized around different
              landscapes, cultural
              experiences and journey
              styles—from Lhasa and Central
              Tibet to Everest, Namtso and
              Mount Kailash.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 16,
              }}
            >
              {experiences.map(
                (experience) => (
                  <Link
                    key={experience.name}
                    href={experience.href}
                    className="card"
                    style={{
                      padding: 24,
                      textDecoration:
                        "none",
                      color: "inherit",
                    }}
                  >
                    <div
                      className="eyebrow"
                      style={{
                        marginBottom: 12,
                        letterSpacing:
                          ".14em",
                      }}
                    >
                      {
                        experience.eyebrow
                      }
                    </div>

                    <h3
                      style={{
                        marginBottom: 10,
                      }}
                    >
                      {experience.name}
                    </h3>

                    <p
                      className="muted"
                      style={{
                        lineHeight: 1.75,
                        marginBottom: 0,
                      }}
                    >
                      {experience.text}
                    </p>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* RESPONSIBILITY */}

          <div
            style={{
              marginTop: 54,
            }}
          >
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
                fontSize:
                  "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              Travel with respect for
              where you are.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 880,
                lineHeight: 1.8,
              }}
            >
              Tibet is not simply a
              collection of famous
              landscapes. It is home to
              communities, cultural
              traditions, religious places
              and sensitive high-altitude
              environments. Thoughtful
              travel begins with
              preparation, appropriate
              behavior and respect for the
              places being visited.
            </p>

            <div
              className="actions"
              style={{
                marginTop: 22,
              }}
            >
              <Link
                className="btn alt"
                href="/responsible-travel"
              >
                Our responsible travel
                approach
              </Link>
            </div>
          </div>

          {/* IMPORTANT PLANNING NOTE */}

          <div
            className="card"
            style={{
              marginTop: 54,
              padding:
                "clamp(26px, 4vw, 38px)",
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 12,
              }}
            >
              CURRENT INFORMATION MATTERS
            </div>

            <h2
              style={{
                marginBottom: 14,
              }}
            >
              Tibet travel requires
              current verification.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 900,
                lineHeight: 1.8,
                marginBottom: 0,
              }}
            >
              Travel documentation,
              permits, route access,
              transportation, local
              requirements, weather and
              operating conditions can
              change. Planning information
              on this website should be
              used as a starting point,
              with important requirements
              confirmed for your travel
              dates, nationality and
              intended route before final
              arrangements are made.
            </p>
          </div>

          {/* FINAL CTA */}

          <div
            className="card"
            style={{
              marginTop: 60,
              padding:
                "clamp(30px, 5vw, 50px)",
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
              START YOUR TIBET JOURNEY
            </div>

            <h2
              style={{
                fontSize:
                  "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              Start with the Tibet
              experience you want.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 790,
                lineHeight: 1.8,
              }}
            >
              Explore our existing Tibet
              journeys or create a private
              itinerary around your dates,
              interests, preferred pace
              and priorities.
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
                href="/tours"
              >
                Explore Tibet tours
              </Link>

              <Link
                className="btn alt"
                href="/custom-journey"
              >
                Create a private journey
              </Link>

              <Link
                className="btn alt"
                href="/contact-book"
              >
                Request a Tibet trip
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

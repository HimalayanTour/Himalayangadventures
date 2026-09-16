import Link from "next/link";

const adventures = [
  {
    region: "NEPAL",
    title: "Everest Base Camp",
    days: "14 days",
    difficulty: "Challenging",
    price: "From $1,490",
    text: "Follow the legendary trail through Sherpa country toward the base of the world's highest mountain.",
    href: "/tours/everest-base-camp",
  },
  {
    region: "NEPAL",
    title: "Annapurna Classic",
    days: "10 days",
    difficulty: "Moderate",
    price: "From $1,190",
    text: "A varied Himalayan journey combining mountain scenery, changing landscapes and classic trekking trails.",
    href: "/tours/annapurna-classic",
  },
  {
    region: "NEPAL",
    title: "Manaslu Circuit",
    days: "15 days",
    difficulty: "Challenging",
    price: "From $1,690",
    text: "A demanding circuit through remote valleys and high mountain terrain for travelers seeking a quieter trek.",
    href: "/tours/manaslu-circuit",
  },
  {
    region: "INDIA",
    title: "Ladakh High Altitude",
    days: "10 days",
    difficulty: "Moderate",
    price: "From $1,590",
    text: "Explore Ladakh's dramatic high-altitude landscapes, mountain culture and expansive Himalayan scenery.",
    href: "/tours/ladakh-high-altitude",
  },
];

const adventureStyles = [
  {
    number: "01",
    title: "Classic trekking",
    text: "Multi-day journeys through mountain villages, valleys and established Himalayan trekking routes.",
  },
  {
    number: "02",
    title: "High-altitude routes",
    text: "Journeys where acclimatization, careful pacing and changing mountain conditions become central to the experience.",
  },
  {
    number: "03",
    title: "Remote landscapes",
    text: "Travel beyond the busiest routes into quieter valleys and regions where logistics and local knowledge matter.",
  },
  {
    number: "04",
    title: "Private adventure",
    text: "Build an itinerary around your own dates, preferred pace, accommodation and adventure priorities.",
  },
];

const preparation = [
  "Choose a route that matches your experience and available time.",
  "Allow realistic acclimatization and rest days at altitude.",
  "Prepare for large changes in temperature and mountain weather.",
  "Use broken-in footwear and appropriate layered clothing.",
  "Check current weather and route conditions before departure.",
  "Keep flexibility for weather, flights, roads and local conditions.",
];

export default function AdventurePage() {
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
          HIMALAYAN ADVENTURE
        </span>

        <h1
          style={{
            marginTop: 18,
            marginBottom: 18,
            fontSize: "clamp(42px, 7vw, 76px)",
            lineHeight: 1,
            maxWidth: 980,
          }}
        >
          Go further into
          <br />
          the Himalaya.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Trek through legendary valleys, cross
          high-altitude landscapes and experience
          Himalayan regions where the journey itself
          is the adventure.
        </p>

        <div
          className="actions"
          style={{ marginTop: 28 }}
        >
          <Link
            className="btn"
            href="/tours"
          >
            Explore adventure tours
          </Link>

          <Link
            className="btn alt"
            href="/custom-journey"
          >
            Build private adventure
          </Link>
        </div>
      </section>

      <section>
        <span className="pill">
          FEATURED ADVENTURES
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 42px)",
          }}
        >
          Journeys built around the mountains
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 780,
            lineHeight: 1.7,
          }}
        >
          Start with one of these Himalayan
          adventures, then compare routes or build
          something around your own travel style.
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
          {adventures.map((trip) => (
            <article
              className="card"
              key={trip.title}
              style={{
                padding: 26,
                display: "flex",
                flexDirection: "column",
                minHeight: 360,
              }}
            >
              <span
                className="pill"
                style={{
                  alignSelf: "flex-start",
                }}
              >
                {trip.region}
              </span>

              <h3
                style={{
                  marginTop: 20,
                  marginBottom: 12,
                  fontSize: 27,
                }}
              >
                {trip.title}
              </h3>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 18,
                }}
              >
                <SmallTag text={trip.days} />
                <SmallTag text={trip.difficulty} />
                <SmallTag text={trip.price} />
              </div>

              <p
                className="muted"
                style={{
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {trip.text}
              </p>

              <Link
                className="btn alt"
                href={trip.href}
                style={{
                  alignSelf: "flex-start",
                  marginTop: 12,
                }}
              >
                View journey
              </Link>
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
          FIND YOUR STYLE
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Adventure means something different
          to every traveler
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 16,
            marginTop: 24,
          }}
        >
          {adventureStyles.map((item) => (
            <div
              key={item.number}
              style={{
                padding: 22,
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
                STYLE {item.number}
              </span>

              <h3
                style={{
                  marginTop: 14,
                  marginBottom: 10,
                  fontSize: 21,
                }}
              >
                {item.title}
              </h3>

              <p
                className="muted"
                style={{
                  lineHeight: 1.7,
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
            PREPARATION
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Prepare for the route
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.7 }}
          >
            Adventure travel works best when the
            itinerary, equipment and pace match the
            environment.
          </p>

          <div
            style={{
              display: "grid",
              gap: 13,
              marginTop: 20,
            }}
          >
            {preparation.map((item) => (
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

                <span
                  className="muted"
                  style={{
                    lineHeight: 1.55,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          <Link
            className="btn alt"
            href="/himalayan-guide"
            style={{ marginTop: 24 }}
          >
            Read Himalayan Guide
          </Link>
        </div>

        <div
          className="card"
          style={{ padding: 28 }}
        >
          <span className="pill">
            LIVE CONDITIONS
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Mountains change quickly
          </h2>

          <p
            className="muted"
            style={{
              lineHeight: 1.75,
            }}
          >
            Check current weather and the 7-day
            planning outlook for key Himalayan
            regions before making decisions about
            mountain travel.
          </p>

          <Link
            className="btn"
            href="/weather-conditions"
          >
            Check live weather
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
          YOUR ADVENTURE
        </span>

        <h2
          style={{
            marginTop: 16,
            marginBottom: 12,
            fontSize: "clamp(30px, 5vw, 46px)",
          }}
        >
          Find the journey that fits your ambition.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 720,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Tell us your available time, preferred
          difficulty and travel style, or use the AI
          planner to explore possible routes.
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
            href="/ai-trip-planner"
          >
            Ask the AI planner
          </Link>

          <Link
            className="btn alt"
            href="/contact-book"
          >
            Request a trip
          </Link>
        </div>
      </section>
    </main>
  );
}

function SmallTag({
  text,
}: {
  text: string;
}) {
  return (
    <span
      style={{
        padding: "7px 10px",
        borderRadius: 999,
        border:
          "1px solid rgba(255,255,255,0.10)",
        background:
          "rgba(255,255,255,0.04)",
        fontSize: 13,
      }}
    >
      {text}
    </span>
  );
}

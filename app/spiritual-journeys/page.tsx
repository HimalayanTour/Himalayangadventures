import Link from "next/link";

const spiritualPrinciples = [
  {
    number: "01",
    title: "Travel with humility",
    text: "Sacred places are living religious and cultural spaces. Visit with curiosity and respect rather than treating them simply as attractions.",
  },
  {
    number: "02",
    title: "Respect local practice",
    text: "Dress, photography, movement and behavior may follow local customs. Listen to guides, hosts and religious communities when visiting sacred places.",
  },
  {
    number: "03",
    title: "Leave time for reflection",
    text: "A contemplative journey benefits from slower days and space between experiences rather than moving rapidly from one important place to another.",
  },
  {
    number: "04",
    title: "Prepare for altitude",
    text: "Many Himalayan pilgrimage routes reach significant elevations. Spiritual purpose does not remove the need for acclimatization, sensible pacing and preparation.",
  },
];

const journeys = [
  {
    region: "TIBET",
    title: "Kailash Mansarovar Journey",
    days: "15 days",
    style: "PILGRIMAGE",
    text: "A high-altitude journey associated with one of Asia's most significant sacred landscapes, requiring thoughtful preparation and respectful travel.",
    href: "/tours/kailash-mansarovar-journey",
  },
  {
    region: "BHUTAN",
    title: "Bhutan Mountain & Culture",
    days: "9 days",
    style: "MONASTERIES + CULTURE",
    text: "Experience Himalayan landscapes alongside monasteries, historic places and Bhutanese cultural traditions.",
    href: "/tours/bhutan-mountain-culture",
  },
  {
    region: "TIBET",
    title: "Tibet High Plateau",
    days: "12 days",
    style: "CULTURE + PLATEAU",
    text: "Explore high-plateau landscapes and cultural places through a journey that can be adapted around your interests and preferred pace.",
    href: "/tours/tibet-high-plateau",
  },
];

const preparation = [
  "Understand the altitude and physical demands of your route.",
  "Confirm current permits and entry requirements before travel.",
  "Allow appropriate acclimatization time.",
  "Ask before photographing people or religious activity.",
  "Follow local guidance inside monasteries and sacred places.",
  "Keep the itinerary flexible when weather or conditions change.",
];

export default function SpiritualJourneysPage() {
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
        <span className="pill">SPIRITUAL JOURNEYS</span>

        <h1
          style={{
            marginTop: 18,
            marginBottom: 18,
            fontSize: "clamp(42px, 7vw, 76px)",
            lineHeight: 1,
            maxWidth: 1000,
          }}
        >
          Travel with purpose.
          <br />
          Walk with respect.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 850,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Pilgrimage and contemplative journeys through
          Himalayan landscapes, monasteries and sacred
          places — approached with cultural respect,
          thoughtful pacing and careful preparation.
        </p>

        <div className="actions" style={{ marginTop: 28 }}>
          <Link className="btn" href="/custom-journey">
            Build a spiritual journey
          </Link>

          <Link className="btn alt" href="/ai-trip-planner">
            Plan with AI
          </Link>
        </div>
      </section>

      <section>
        <span className="pill">TRAVEL WITH RESPECT</span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 42px)",
          }}
        >
          Sacred landscapes are living places
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 830,
            lineHeight: 1.7,
          }}
        >
          Himalayan spiritual travel crosses different
          communities, religions and traditions. The
          journey should respect the people for whom
          these places have meaning beyond tourism.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 16,
            marginTop: 24,
          }}
        >
          {spiritualPrinciples.map((item) => (
            <article
              className="card"
              key={item.number}
              style={{ padding: 24 }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  opacity: 0.6,
                }}
              >
                PRINCIPLE {item.number}
              </span>

              <h3
                style={{
                  marginTop: 14,
                  marginBottom: 10,
                  fontSize: 22,
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
            </article>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <span className="pill">FEATURED JOURNEYS</span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Journeys shaped by place and tradition
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 800,
            lineHeight: 1.7,
          }}
        >
          Start with an existing Himalayan journey,
          then adapt the itinerary around your
          interests, available time and preferred pace.
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
          {journeys.map((journey) => (
            <article
              className="card"
              key={journey.title}
              style={{
                padding: 26,
                display: "flex",
                flexDirection: "column",
                minHeight: 340,
              }}
            >
              <span
                className="pill"
                style={{ alignSelf: "flex-start" }}
              >
                {journey.region}
              </span>

              <h3
                style={{
                  marginTop: 20,
                  marginBottom: 12,
                  fontSize: 27,
                  lineHeight: 1.2,
                }}
              >
                {journey.title}
              </h3>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 18,
                }}
              >
                <SmallTag text={journey.days} />
                <SmallTag text={journey.style} />
              </div>

              <p
                className="muted"
                style={{
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {journey.text}
              </p>

              <Link
                className="btn alt"
                href={journey.href}
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
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 18,
          marginTop: 38,
        }}
      >
        <div className="card" style={{ padding: 28 }}>
          <span className="pill">BEFORE YOU GO</span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Prepare for more than the destination
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.7 }}
          >
            Spiritual journeys can combine cultural
            sensitivity, high altitude and changing
            travel requirements. Preparation is part of
            traveling responsibly.
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
                <strong aria-hidden="true">✓</strong>

                <span
                  className="muted"
                  style={{ lineHeight: 1.55 }}
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

        <div className="card" style={{ padding: 28 }}>
          <span className="pill">CURRENT CONDITIONS</span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            The mountains set the pace
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.75 }}
          >
            Weather, altitude and local conditions can
            affect Himalayan routes. Use current
            forecasts as part of planning and follow
            official information and qualified local
            guidance before and during the journey.
          </p>

          <Link className="btn" href="/weather-conditions">
            Check live conditions
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
        <span className="pill">RESPONSIBLE PILGRIMAGE</span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Respect comes before the photograph
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          Photography may be restricted in monasteries,
          temples, ceremonies and other sacred spaces.
          Ask when uncertain, respect requests from
          residents and religious communities, and
          avoid interrupting worship or ceremonies for
          a photograph.
        </p>

        <Link
          className="btn alt"
          href="/responsible-travel"
          style={{ marginTop: 18 }}
        >
          Read Responsible Travel
        </Link>
      </section>

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(28px, 5vw, 46px)",
          textAlign: "center",
        }}
      >
        <span className="pill">YOUR JOURNEY</span>

        <h2
          style={{
            marginTop: 16,
            marginBottom: 12,
            fontSize: "clamp(30px, 5vw, 46px)",
          }}
        >
          Build a journey around what matters to you.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Tell us the places, traditions or pilgrimage
          experiences that interest you, along with
          your dates and preferred pace, and use them
          as the starting point for a private Himalayan
          journey.
        </p>

        <div
          className="actions"
          style={{
            justifyContent: "center",
            marginTop: 26,
          }}
        >
          <Link className="btn" href="/custom-journey">
            Build my spiritual journey
          </Link>

          <Link className="btn alt" href="/contact-book">
            Request a trip
          </Link>
        </div>
      </section>
    </main>
  );
}

function SmallTag({ text }: { text: string }) {
  return (
    <span
      style={{
        padding: "7px 10px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.04)",
        fontSize: 13,
      }}
    >
      {text}
    </span>
  );
}

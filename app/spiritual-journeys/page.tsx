import Link from "next/link";

const spiritualPrinciples = [
  {
    number: "01",
    title: "Travel with humility",
    text:
      "Sacred places are living religious and cultural spaces. Visit with curiosity and respect rather than treating them simply as attractions.",
  },
  {
    number: "02",
    title: "Respect local practice",
    text:
      "Dress, photography, movement and behavior may follow local customs. Listen to guides and appropriate local guidance when visiting monasteries and sacred places.",
  },
  {
    number: "03",
    title: "Leave time for reflection",
    text:
      "A contemplative Tibet journey benefits from slower days and space between experiences rather than moving rapidly from one important place to another.",
  },
  {
    number: "04",
    title: "Prepare for altitude",
    text:
      "Many Tibet pilgrimage journeys take place at significant elevation. Spiritual purpose does not remove the need for realistic pacing, preparation and appropriate altitude awareness.",
  },
];

const journeys = [
  {
    region: "WESTERN TIBET",
    title: "Kailash & Mansarovar Journey",
    days: "15 days",
    style: "PILGRIMAGE",
    price: "From $2,890",
    text:
      "A high-altitude journey into western Tibet centered on the sacred landscape of Mount Kailash and the wider Mansarovar region.",
    href: "/tours/kailash-mansarovar-journey",
  },
  {
    region: "MOUNT KAILASH",
    title: "Mount Kailash Kora",
    days: "13 days",
    style: "KORA · PILGRIMAGE",
    price: "From $2,690",
    text:
      "A physically demanding high-altitude journey focused on the pilgrimage landscape and kora around Mount Kailash.",
    href: "/tours/kailash-kora",
  },
  {
    region: "CENTRAL TIBET",
    title: "Tibet Culture & Monasteries",
    days: "9 days",
    style: "MONASTERIES · CULTURE",
    price: "From $1,990",
    text:
      "Explore monasteries, cultural heritage and sacred places while gaining greater context for Tibet's living religious traditions.",
    href: "/tours/tibet-culture-monasteries",
  },
];

const preparation = [
  "Understand the altitude and physical demands of your intended Tibet route.",
  "Allow appropriate time for adjustment and realistic pacing.",
  "Confirm current travel documentation, permits and route requirements.",
  "Ask before photographing people, ceremonies or religious activity where appropriate.",
  "Follow local guidance inside monasteries, temples and sacred places.",
  "Keep the itinerary flexible when weather, roads, access or local conditions change.",
];

const pilgrimageApproach = [
  {
    number: "01",
    title: "Understand the place",
    text:
      "Learn why a monastery, pilgrimage route or sacred landscape matters before treating it as another stop on an itinerary.",
  },
  {
    number: "02",
    title: "Observe without disrupting",
    text:
      "Religious practice and pilgrimage continue independently of tourism. Give worshippers and pilgrims appropriate space.",
  },
  {
    number: "03",
    title: "Follow local guidance",
    text:
      "Access, photography and appropriate behavior can vary by location. When uncertain, ask your guide rather than assuming.",
  },
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
      {/* HERO */}

      <section
        className="card"
        style={{
          padding: "clamp(28px, 5vw, 56px)",
          marginBottom: 38,
          background:
            "radial-gradient(circle at 85% 15%, rgba(109,224,194,.12), transparent 30%), linear-gradient(145deg, rgba(18,48,55,.96), rgba(8,28,35,.98))",
        }}
      >
        <span className="pill">
          TIBET SPIRITUAL JOURNEYS · 2026
        </span>

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
          Experience sacred Tibet.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 850,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Explore monasteries, pilgrimage landscapes and
          Mount Kailash through Tibet journeys approached
          with cultural respect, thoughtful pacing and
          careful high-altitude preparation.
        </p>

        <div
          className="actions"
          style={{ marginTop: 28 }}
        >
          <Link
            className="btn"
            href="/tours/kailash-kora"
          >
            Explore Mount Kailash
          </Link>

          <Link
            className="btn alt"
            href="/custom-journey"
          >
            Build a spiritual journey
          </Link>
        </div>
      </section>

      {/* PRINCIPLES */}

      <section>
        <span className="pill">
          TRAVEL WITH RESPECT
        </span>

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
          Tibet&apos;s monasteries, pilgrimage routes and
          sacred landscapes have meaning beyond tourism.
          A spiritual journey should respect the people,
          traditions and religious practices connected to
          the places being visited.
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

      {/* FEATURED JOURNEYS */}

      <section style={{ marginTop: 40 }}>
        <span className="pill">
          FEATURED TIBET JOURNEYS
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Journeys shaped by sacred places and tradition
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 800,
            lineHeight: 1.7,
          }}
        >
          Explore Mount Kailash and western Tibet or
          choose a cultural journey focused on
          monasteries and the living traditions of
          Central Tibet.
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
                minHeight: 360,
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
                <SmallTag text={journey.price} />
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

      {/* PILGRIMAGE APPROACH */}

      <section
        className="card"
        style={{
          marginTop: 38,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          THOUGHTFUL PILGRIMAGE
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Be present without becoming the center
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            lineHeight: 1.7,
          }}
        >
          Visiting a sacred place carries a different
          responsibility from ordinary sightseeing.
          Observation, patience and respect should remain
          part of the experience.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
            marginTop: 24,
          }}
        >
          {pilgrimageApproach.map((item) => (
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
                APPROACH {item.number}
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

      {/* PREPARATION + CONDITIONS */}

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
            BEFORE YOU GO
          </span>

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
            Tibet spiritual journeys can combine
            cultural sensitivity, significant altitude,
            long travel distances and changing travel
            requirements. Preparation is part of
            responsible travel.
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
            Read Tibet Travel Guide
          </Link>
        </div>

        <div
          className="card"
          style={{ padding: 28 }}
        >
          <span className="pill">
            TIBET CONDITIONS
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            The plateau sets the pace
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.75 }}
          >
            Weather, altitude, road conditions and local
            circumstances can affect Tibet journeys.
            Current forecasts are one planning input, but
            they do not guarantee route or operating
            conditions.
          </p>

          <Link
            className="btn"
            href="/weather-conditions"
          >
            Check Tibet conditions
          </Link>
        </div>
      </section>

      {/* KAILASH */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(26px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          MOUNT KAILASH
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 12,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Approach a sacred landscape thoughtfully.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          A Mount Kailash journey combines remote
          high-altitude travel with a landscape of deep
          religious and cultural significance. Visitors
          should approach the experience with appropriate
          preparation, patience and respect for pilgrims
          and local practices.
        </p>

        <div
          className="actions"
          style={{ marginTop: 22 }}
        >
          <Link
            className="btn"
            href="/tours/kailash-kora"
          >
            Mount Kailash Kora
          </Link>

          <Link
            className="btn alt"
            href="/tours/kailash-mansarovar-journey"
          >
            Kailash &amp; Mansarovar
          </Link>
        </div>
      </section>

      {/* RESPONSIBLE PILGRIMAGE */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          RESPONSIBLE PILGRIMAGE
        </span>

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
          Ask when uncertain, respect requests not to
          photograph and avoid interrupting worship,
          pilgrimage or ceremonies for an image.
        </p>

        <Link
          className="btn alt"
          href="/responsible-travel"
          style={{ marginTop: 18 }}
        >
          Responsible Tibet travel
        </Link>
      </section>

      {/* CURRENT INFORMATION */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          CURRENT INFORMATION
        </span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Confirm the journey before departure.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          Travel documentation, permits, route access,
          local requirements, transportation, weather
          and operating conditions can change. Confirm
          current information for your nationality,
          travel dates and intended Tibet route before
          final arrangements are made.
        </p>

        <div
          className="actions"
          style={{ marginTop: 22 }}
        >
          <Link
            className="btn alt"
            href="/ai-research"
          >
            Research current information
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(28px, 5vw, 46px)",
          textAlign: "center",
          background:
            "linear-gradient(135deg, rgba(19,58,61,.9), rgba(16,35,42,.96))",
        }}
      >
        <span className="pill">
          YOUR TIBET JOURNEY
        </span>

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
          Tell us whether your interests center on Mount
          Kailash, monasteries, cultural heritage,
          pilgrimage or a quieter contemplative journey,
          then use those priorities as the starting point
          for your Tibet itinerary.
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
            Build my spiritual journey
          </Link>

          <Link
            className="btn alt"
            href="/contact-book"
          >
            Request a Tibet trip
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

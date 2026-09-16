import Link from "next/link";

const luxuryPrinciples = [
  {
    number: "01",
    title: "Private logistics",
    text: "Build the journey around your dates and priorities with private transfers, flexible scheduling and carefully coordinated logistics where available.",
  },
  {
    number: "02",
    title: "Better pacing",
    text: "Luxury in the Himalaya is also about time. Fewer rushed days and sensible pacing create more room to experience each destination properly.",
  },
  {
    number: "03",
    title: "Comfort where possible",
    text: "Choose higher-comfort accommodation in cities and established destinations while using the best practical options available in remote mountain areas.",
  },
  {
    number: "04",
    title: "Personal priorities",
    text: "Shape the itinerary around culture, photography, landscapes, wellness, trekking or a combination instead of following a fixed group schedule.",
  },
];

const journeyIdeas = [
  {
    region: "BHUTAN",
    title: "Bhutan Mountain & Culture",
    days: "9 days",
    price: "From $2,490",
    text: "A strong starting point for a private journey combining Himalayan landscapes, monasteries and cultural experiences.",
    href: "/tours/bhutan-mountain-culture",
  },
  {
    region: "TIBET",
    title: "Tibet High Plateau",
    days: "12 days",
    price: "From $2,190",
    text: "Explore plateau landscapes and cultural sites with an itinerary that can be adapted around your preferred pace and priorities.",
    href: "/tours/tibet-high-plateau",
  },
  {
    region: "PRIVATE",
    title: "Bespoke Himalayan Journey",
    days: "YOUR DATES",
    price: "CUSTOM",
    text: "Start from your preferred destinations, travel style, accommodation level and available time to create a private itinerary.",
    href: "/custom-journey",
  },
];

const comfortDetails = [
  "Private itinerary design around your preferred dates.",
  "Accommodation preferences built into the planning brief.",
  "More time for rest, photography and cultural experiences.",
  "Private or personalized logistics where practical.",
  "Flexible daily pacing instead of a fixed group rhythm.",
  "Clear expectations for comfort in remote mountain regions.",
];

export default function LuxuryHimalayaPage() {
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
        <span className="pill">LUXURY HIMALAYA</span>

        <h1
          style={{
            marginTop: 18,
            marginBottom: 18,
            fontSize: "clamp(42px, 7vw, 76px)",
            lineHeight: 1,
            maxWidth: 1000,
          }}
        >
          Travel deeper.
          <br />
          Stay comfortable.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 840,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Private Himalayan journeys designed around
          better pacing, thoughtful logistics and your
          preferred level of comfort — without losing
          the character of the mountains.
        </p>

        <div className="actions" style={{ marginTop: 28 }}>
          <Link className="btn" href="/custom-journey">
            Design my private journey
          </Link>

          <Link className="btn alt" href="/contact-book">
            Request a trip
          </Link>
        </div>
      </section>

      <section>
        <span className="pill">A DIFFERENT KIND OF LUXURY</span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 42px)",
          }}
        >
          In the Himalaya, luxury is more than a hotel
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            lineHeight: 1.7,
          }}
        >
          The most valuable upgrades can be privacy,
          time, flexibility and good planning. Remote
          regions may have limited infrastructure, so
          expectations should match the destination.
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
          {luxuryPrinciples.map((item) => (
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
                PRIORITY {item.number}
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
        <span className="pill">JOURNEY IDEAS</span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Start with a place, then personalize it
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 790,
            lineHeight: 1.7,
          }}
        >
          Existing journeys can become the foundation
          for a more private, comfort-focused itinerary.
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
          {journeyIdeas.map((journey) => (
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
                Explore journey
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
          <span className="pill">COMFORT DETAILS</span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Design around how you want to travel
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.7 }}
          >
            A private journey gives us more room to
            understand what comfort means to you.
          </p>

          <div
            style={{
              display: "grid",
              gap: 13,
              marginTop: 20,
            }}
          >
            {comfortDetails.map((item) => (
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
        </div>

        <div className="card" style={{ padding: 28 }}>
          <span className="pill">REMOTE REALITY</span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Comfort changes with altitude
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.75 }}
          >
            Luxury standards in Kathmandu, Paro or
            established destinations can be very
            different from those available on remote
            trekking routes. In mountain areas, the
            best experience may mean excellent local
            hospitality and the best available lodge
            rather than conventional five-star
            facilities.
          </p>

          <Link
            className="btn alt"
            href="/himalayan-guide"
          >
            Read Himalayan Guide
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
        <span className="pill">CONDITIONS MATTER</span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Private travel still follows the mountains
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          Weather, altitude, road conditions and local
          operations can affect even carefully planned
          private journeys. Good luxury travel in the
          Himalaya includes flexibility when the
          environment requires a change of plan.
        </p>

        <div className="actions" style={{ marginTop: 20 }}>
          <Link className="btn" href="/weather-conditions">
            Check live conditions
          </Link>

          <Link className="btn alt" href="/responsible-travel">
            Responsible Travel
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
        <span className="pill">PRIVATE HIMALAYA</span>

        <h2
          style={{
            marginTop: 16,
            marginBottom: 12,
            fontSize: "clamp(30px, 5vw, 46px)",
          }}
        >
          Build the journey around you.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 750,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Choose your destination, dates, travel style
          and accommodation preference, then turn those
          priorities into a private Himalayan journey
          brief.
        </p>

        <div
          className="actions"
          style={{
            justifyContent: "center",
            marginTop: 26,
          }}
        >
          <Link className="btn" href="/custom-journey">
            Design my journey
          </Link>

          <Link className="btn alt" href="/ai-trip-planner">
            Explore with AI
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

import Link from "next/link";

const comfortPrinciples = [
  {
    number: "01",
    title: "Private journey design",
    text:
      "Shape the Tibet journey around your dates, interests, preferred pace and priorities rather than following a fixed group itinerary.",
  },
  {
    number: "02",
    title: "Better pacing",
    text:
      "Comfort in Tibet is also about time. Thoughtful pacing can create more room for rest, acclimatization, photography and cultural experiences.",
  },
  {
    number: "03",
    title: "Comfort where available",
    text:
      "Choose your preferred accommodation level while recognizing that options can become more limited on remote high-altitude routes.",
  },
  {
    number: "04",
    title: "Personal priorities",
    text:
      "Build the journey around culture, landscapes, photography, spirituality, Everest, Namtso, Mount Kailash or a combination of interests.",
  },
];

const journeyIdeas = [
  {
    region: "CENTRAL TIBET",
    title: "Lhasa Classic Journey",
    days: "5 days",
    price: "From $1,290",
    text:
      "A shorter Tibet journey that can be shaped around cultural interests, thoughtful pacing and more time in Lhasa.",
    href: "/tours/lhasa-classic",
  },
  {
    region: "CENTRAL TIBET",
    title: "Lhasa, Gyantse & Shigatse",
    days: "7 days",
    price: "From $1,590",
    text:
      "Travel through Central Tibet with a balance of cultural places, plateau landscapes and a more measured journey rhythm.",
    href: "/tours/lhasa-shigatse-gyantse",
  },
  {
    region: "HIGH PLATEAU",
    title: "Tibet High Plateau",
    days: "12 days",
    price: "From $2,190",
    text:
      "Explore farther across Tibet with a private itinerary shaped around your preferred pace, interests and practical comfort.",
    href: "/tours/tibet-high-plateau",
  },
  {
    region: "PRIVATE TIBET",
    title: "Custom Tibet Journey",
    days: "YOUR DATES",
    price: "CUSTOM",
    text:
      "Start with your preferred Tibet route, travel style, accommodation preferences and available time to create a private journey brief.",
    href: "/custom-journey",
  },
];

const comfortDetails = [
  "Private itinerary planning around your preferred dates.",
  "Accommodation preferences included in the planning brief.",
  "More time for rest, acclimatization, photography and cultural experiences.",
  "Personalized logistics where practical and available.",
  "A journey pace shaped around your priorities rather than a fixed group rhythm.",
  "Clear expectations about comfort on remote high-altitude routes.",
];

const privatePriorities = [
  {
    number: "01",
    title: "Your pace",
    text:
      "Tell us whether you prefer slower days, more rest time, longer cultural visits or additional photography time.",
  },
  {
    number: "02",
    title: "Your interests",
    text:
      "Focus the journey on culture, Everest, landscapes, monasteries, photography, Mount Kailash or a combination.",
  },
  {
    number: "03",
    title: "Your comfort",
    text:
      "Tell us the accommodation level you prefer so it can be considered against what is realistically available along the route.",
  },
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
          PRIVATE &amp; COMFORTABLE TIBET
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
          Travel deeper.
          <br />
          Move at your pace.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 850,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Create a private Tibet journey around thoughtful
          pacing, personalized planning and your preferred
          level of comfort—while keeping expectations
          realistic for remote high-altitude travel.
        </p>

        <div
          className="actions"
          style={{ marginTop: 28 }}
        >
          <Link
            className="btn"
            href="/custom-journey"
          >
            Design my Tibet journey
          </Link>

          <Link
            className="btn alt"
            href="/contact-book"
          >
            Request a Tibet trip
          </Link>
        </div>
      </section>

      {/* COMFORT PRINCIPLES */}

      <section>
        <span className="pill">
          A DIFFERENT KIND OF COMFORT
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 42px)",
          }}
        >
          In Tibet, comfort is more than a hotel.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 830,
            lineHeight: 1.7,
          }}
        >
          Privacy, time, thoughtful pacing and good
          planning can matter as much as accommodation.
          As journeys move into more remote areas,
          available facilities may become simpler.
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
          {comfortPrinciples.map((item) => (
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

      {/* JOURNEY IDEAS */}

      <section style={{ marginTop: 40 }}>
        <span className="pill">
          TIBET JOURNEY IDEAS
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Start with a Tibet route, then personalize it.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 800,
            lineHeight: 1.7,
          }}
        >
          Existing Tibet journeys can provide a starting
          point for a more private itinerary shaped around
          your pace, interests and comfort preferences.
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

      {/* PERSONALIZATION */}

      <section
        className="card"
        style={{
          marginTop: 38,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          PRIVATE TIBET
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Design the journey around you.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            lineHeight: 1.7,
          }}
        >
          A private journey gives you more room to define
          what matters most before the itinerary is
          finalized.
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
          {privatePriorities.map((item) => (
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
                CHOICE {item.number}
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

      {/* COMFORT + REMOTE REALITY */}

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
            COMFORT DETAILS
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Tell us how you want to travel.
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.7 }}
          >
            Your planning brief can include the details
            that make a Tibet journey feel more
            comfortable and personal to you.
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
            className="btn"
            href="/custom-journey"
            style={{ marginTop: 24 }}
          >
            Build private Tibet journey
          </Link>
        </div>

        <div
          className="card"
          style={{ padding: 28 }}
        >
          <span className="pill">
            REMOTE REALITY
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Comfort changes across Tibet.
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.75 }}
          >
            Accommodation and service options can differ
            significantly between established cities and
            remote high-altitude routes. In more remote
            areas, a comfortable journey may mean using
            the best practical option available rather
            than expecting the same standard everywhere.
          </p>

          <Link
            className="btn alt"
            href="/himalayan-guide"
          >
            Read Tibet Travel Guide
          </Link>
        </div>
      </section>

      {/* ALTITUDE */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          COMFORT &amp; ALTITUDE
        </span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Better pacing matters on the plateau.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          A private itinerary can create more room for
          thoughtful pacing, but altitude still needs to
          be taken seriously. Individual responses vary,
          and itinerary flexibility remains important
          even on a comfort-focused journey.
        </p>

        <div
          className="actions"
          style={{ marginTop: 20 }}
        >
          <Link
            className="btn alt"
            href="/himalayan-guide"
          >
            Tibet planning guide
          </Link>

          <Link
            className="btn alt"
            href="/weather-conditions"
          >
            Tibet conditions
          </Link>
        </div>
      </section>

      {/* CONDITIONS */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          CONDITIONS MATTER
        </span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Private travel still follows the plateau.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          Weather, altitude, road conditions,
          transportation and local operating conditions
          can affect even carefully planned private Tibet
          journeys. Good planning includes flexibility
          when conditions require the itinerary to
          change.
        </p>

        <div
          className="actions"
          style={{ marginTop: 20 }}
        >
          <Link
            className="btn"
            href="/weather-conditions"
          >
            Check Tibet conditions
          </Link>

          <Link
            className="btn alt"
            href="/responsible-travel"
          >
            Responsible Tibet travel
          </Link>
        </div>
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
          BEFORE YOU GO
        </span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Confirm the final arrangements.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          Accommodation, transportation, travel
          documentation, permits, route access and local
          requirements can change. Final services,
          availability, itinerary and pricing should be
          confirmed for your specific travel dates before
          booking.
        </p>

        <div
          className="actions"
          style={{ marginTop: 20 }}
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
          PRIVATE TIBET
        </span>

        <h2
          style={{
            marginTop: 16,
            marginBottom: 12,
            fontSize: "clamp(30px, 5vw, 46px)",
          }}
        >
          Build the Tibet journey around you.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Choose your dates, Tibet route, travel style,
          pace and accommodation preferences, then turn
          those priorities into a private journey brief.
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
            Design my Tibet journey
          </Link>

          <Link
            className="btn alt"
            href="/ai-trip-planner"
          >
            Plan Tibet with AI
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

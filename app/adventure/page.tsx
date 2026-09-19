import Link from "next/link";

const adventures = [
  {
    region: "EVEREST · TIBET",
    title: "Lhasa to Everest Base Camp",
    days: "8 days",
    difficulty: "Moderate",
    price: "From $1,890",
    text:
      "Travel from Lhasa across the Tibetan Plateau toward the dramatic Himalayan landscapes of the Tibet side of Everest.",
    href: "/tours/lhasa-everest-base-camp",
  },
  {
    region: "WESTERN TIBET",
    title: "Mount Kailash Kora",
    days: "13 days",
    difficulty: "Challenging",
    price: "From $2,690",
    text:
      "A demanding high-altitude journey into western Tibet centered on the extraordinary landscape and pilgrimage route around Mount Kailash.",
    href: "/tours/kailash-kora",
  },
  {
    region: "HIGH PLATEAU",
    title: "Tibet High Plateau",
    days: "12 days",
    difficulty: "Moderate",
    price: "From $2,190",
    text:
      "Experience Tibet through long overland routes, expansive plateau scenery and remote high-altitude landscapes.",
    href: "/tours/tibet-high-plateau",
  },
  {
    region: "NAMTSO · TIBET",
    title: "Lhasa & Namtso Lake",
    days: "7 days",
    difficulty: "Moderate",
    price: "From $1,690",
    text:
      "Combine Lhasa with a journey toward the open landscapes and high elevation of Namtso Lake.",
    href: "/tours/namtso-lake",
  },
];

const adventureStyles = [
  {
    number: "01",
    title: "Everest journeys",
    text:
      "Cross Central Tibet toward the Himalayan landscapes of Everest on an overland journey shaped by distance, altitude and changing scenery.",
  },
  {
    number: "02",
    title: "High-altitude routes",
    text:
      "Explore Tibet journeys where acclimatization, realistic pacing and preparation are central to the experience.",
  },
  {
    number: "03",
    title: "Remote plateau landscapes",
    text:
      "Travel farther across open high-altitude terrain where distances are greater and flexibility becomes increasingly important.",
  },
  {
    number: "04",
    title: "Pilgrimage adventure",
    text:
      "Experience Mount Kailash through a physically demanding journey that also carries deep cultural and spiritual significance.",
  },
];

const preparation = [
  "Choose a Tibet route that matches your experience, interests and available time.",
  "Allow realistic time for altitude adjustment and appropriate pacing.",
  "Prepare for strong sun, wind and substantial temperature changes.",
  "Use appropriate layered clothing and comfortable broken-in footwear.",
  "Check current weather, road and route conditions before departure.",
  "Keep flexibility for weather, transportation, route access and local conditions.",
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
          TIBET ADVENTURE · 2026
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
          Go farther across
          <br />
          the Tibetan Plateau.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 840,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Journey toward Everest, cross high plateau
          landscapes, reach Namtso or travel into western
          Tibet toward Mount Kailash. Here, adventure is
          shaped by altitude, distance and the scale of
          the landscape.
        </p>

        <div
          className="actions"
          style={{ marginTop: 28 }}
        >
          <Link
            className="btn"
            href="/tours"
          >
            Explore Tibet adventures
          </Link>

          <Link
            className="btn alt"
            href="/custom-journey"
          >
            Build private adventure
          </Link>
        </div>
      </section>

      {/* FEATURED ADVENTURES */}

      <section>
        <span className="pill">
          FEATURED TIBET ADVENTURES
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 42px)",
          }}
        >
          Journeys built around the plateau
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 800,
            lineHeight: 1.7,
          }}
        >
          Start with one of these Tibet journeys, then
          compare altitude, duration, pace and travel
          style before deciding which adventure fits you.
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

      {/* ADVENTURE STYLES */}

      <section
        className="card"
        style={{
          marginTop: 38,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          FIND YOUR ADVENTURE
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Adventure takes different forms in Tibet
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 790,
            lineHeight: 1.7,
          }}
        >
          Not every Tibet adventure is the same. Some
          focus on great Himalayan landscapes, while
          others are defined by remote roads, high
          altitude or pilgrimage.
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
            PREPARATION
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Prepare for altitude and distance
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.7 }}
          >
            Tibet adventure travel works best when the
            itinerary, preparation and pace match the
            realities of high-altitude travel.
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
            Read Tibet Travel Guide
          </Link>
        </div>

        <div
          className="card"
          style={{ padding: 28 }}
        >
          <span className="pill">
            LIVE TIBET CONDITIONS
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Conditions matter on the plateau
          </h2>

          <p
            className="muted"
            style={{
              lineHeight: 1.75,
            }}
          >
            Check current weather and the seven-day
            planning outlook for key Tibet areas,
            including Lhasa, Shigatse, Everest, Namtso
            and Mount Kailash.
          </p>

          <Link
            className="btn"
            href="/weather-conditions"
          >
            Check Tibet conditions
          </Link>
        </div>
      </section>

      {/* ALTITUDE NOTE */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(26px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          HIGH-ALTITUDE REALITY
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 12,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          The hardest journey is not always the best one.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          Choose a Tibet adventure according to your
          available time, interests, experience and
          realistic ability to travel at altitude.
          Individual responses to altitude vary, and
          flexibility should remain part of the plan.
        </p>

        <div
          className="actions"
          style={{ marginTop: 22 }}
        >
          <Link
            className="btn alt"
            href="/compare-trips"
          >
            Compare Tibet journeys
          </Link>

          <Link
            className="btn alt"
            href="/travel-intent"
          >
            Find my travel style
          </Link>
        </div>
      </section>

      {/* CURRENT INFORMATION */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(26px, 4vw, 40px)",
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
          Adventure requires current information
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          Travel documentation, permits, route access,
          road conditions, transportation, weather and
          local requirements can change. Confirm current
          information for your travel dates, nationality
          and intended Tibet route before final
          arrangements are made.
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
          YOUR TIBET ADVENTURE
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
            maxWidth: 760,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Tell us your available time, preferred pace and
          interests, or use the Tibet AI Planner to
          explore journeys across the plateau.
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
            Ask the Tibet AI Planner
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

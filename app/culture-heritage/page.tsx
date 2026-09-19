import Link from "next/link";

const culturalJourneys = [
  {
    region: "CENTRAL TIBET",
    title: "Lhasa Classic Journey",
    days: "5 days",
    price: "From $1,290",
    text:
      "Begin in Lhasa with a journey focused on cultural landmarks, historic places and time to experience the city at a thoughtful pace.",
    href: "/tours/lhasa-classic",
  },
  {
    region: "CENTRAL TIBET",
    title: "Lhasa, Gyantse & Shigatse",
    days: "7 days",
    price: "From $1,590",
    text:
      "Travel beyond Lhasa through Central Tibet, connecting historic towns, cultural landscapes and important religious places.",
    href: "/tours/lhasa-shigatse-gyantse",
  },
  {
    region: "TIBET",
    title: "Tibet Culture & Monasteries",
    days: "9 days",
    price: "From $1,990",
    text:
      "Explore Tibet through monasteries, cultural heritage, historic places and the living traditions that give context to the plateau.",
    href: "/tours/tibet-culture-monasteries",
  },
];

const experiences = [
  {
    number: "01",
    title: "Monasteries & sacred places",
    text:
      "Visit monasteries, temples and sacred places thoughtfully, following local guidance about access, behavior, photography and religious practice.",
  },
  {
    number: "02",
    title: "Historic cities & towns",
    text:
      "Explore Lhasa, Gyantse, Shigatse and other places where architecture, history and generations of local life add depth to the journey.",
  },
  {
    number: "03",
    title: "Living traditions",
    text:
      "Culture is not a museum exhibit. Language, religion, food, craft, pilgrimage and everyday routines continue as part of contemporary life in Tibet.",
  },
  {
    number: "04",
    title: "Local context",
    text:
      "Experienced guides can help connect architecture and landscapes with history, belief, etiquette and the cultural meaning of the places you visit.",
  },
];

const respectfulTravel = [
  "Ask before photographing people, ceremonies or private spaces.",
  "Follow local guidance at monasteries, temples and sacred places.",
  "Dress and behave appropriately where religious or cultural traditions require it.",
  "Avoid treating religious practice, ceremonies or sacred objects as entertainment.",
  "Choose souvenirs thoughtfully and support appropriate local craftsmanship where practical.",
  "Listen to your guide when cultural expectations or access rules are unfamiliar.",
];

export default function CultureHeritagePage() {
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
          TIBET CULTURE &amp; HERITAGE
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
          Beyond the landscape,
          <br />
          discover living Tibet.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 850,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Explore Tibet through historic cities,
          monasteries, sacred places, architecture and
          living cultural traditions—with curiosity,
          context and respect.
        </p>

        <div
          className="actions"
          style={{ marginTop: 28 }}
        >
          <Link
            className="btn"
            href="/tours/tibet-culture-monasteries"
          >
            Explore culture journey
          </Link>

          <Link
            className="btn alt"
            href="/custom-journey"
          >
            Build a private journey
          </Link>
        </div>
      </section>

      {/* FEATURED JOURNEYS */}

      <section>
        <span className="pill">
          FEATURED TIBET JOURNEYS
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 42px)",
          }}
        >
          Journeys shaped by culture and place
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 800,
            lineHeight: 1.7,
          }}
        >
          These Tibet journeys give cultural places and
          historic landscapes a central role rather than
          treating them as brief stops between scenic
          highlights.
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
          {culturalJourneys.map((journey) => (
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
                style={{
                  alignSelf: "flex-start",
                }}
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
                View journey
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* CULTURAL EXPERIENCES */}

      <section
        className="card"
        style={{
          marginTop: 38,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          CULTURAL EXPERIENCES
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Experience more than the scenery
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 800,
            lineHeight: 1.7,
          }}
        >
          A cultural journey becomes more meaningful when
          there is enough time to understand the places,
          traditions and communities encountered along the
          route.
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
          {experiences.map((item) => (
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
                EXPERIENCE {item.number}
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

      {/* CULTURAL APPROACH */}

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
            TRAVEL WITH RESPECT
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Culture deserves more than a photograph
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.7 }}
          >
            Cultural experiences are more meaningful when
            travelers approach Tibet&apos;s communities,
            monasteries and sacred places as guests rather
            than simply as attractions.
          </p>

          <div
            style={{
              display: "grid",
              gap: 13,
              marginTop: 20,
            }}
          >
            {respectfulTravel.map((item) => (
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
            href="/responsible-travel"
            style={{
              marginTop: 24,
            }}
          >
            Responsible Tibet travel
          </Link>
        </div>

        <div
          className="card"
          style={{ padding: 28 }}
        >
          <span className="pill">
            PRIVATE JOURNEYS
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Give cultural places enough time
          </h2>

          <p
            className="muted"
            style={{
              lineHeight: 1.75,
            }}
          >
            A private Tibet journey can be shaped around
            your interests in monasteries, historic places,
            photography, architecture and slower travel
            rather than trying to rush between highlights.
          </p>

          <Link
            className="btn"
            href="/custom-journey"
          >
            Build cultural Tibet journey
          </Link>
        </div>
      </section>

      {/* CULTURE + LANDSCAPE */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(26px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          CULTURE &amp; LANDSCAPE
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 12,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          The landscape and culture are connected.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 880,
            lineHeight: 1.75,
          }}
        >
          Tibet&apos;s cultural experience extends beyond
          individual buildings or monuments. Historic
          settlements, pilgrimage landscapes, monasteries,
          high mountain routes and the plateau itself form
          part of the context through which a journey can
          be understood.
        </p>

        <div
          className="actions"
          style={{ marginTop: 22 }}
        >
          <Link
            className="btn alt"
            href="/tibet"
          >
            Explore Tibet
          </Link>

          <Link
            className="btn alt"
            href="/tours"
          >
            View Tibet journeys
          </Link>
        </div>
      </section>

      {/* BEFORE YOU GO */}

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
          Understand the journey before arrival
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 880,
            lineHeight: 1.75,
          }}
        >
          Travel documentation, permits, route access,
          local requirements and access to particular
          places can change. Cultural expectations and
          photography rules can also vary by location.
          Confirm current information before travel and
          follow appropriate local guidance throughout
          your journey.
        </p>

        <div
          className="actions"
          style={{ marginTop: 22 }}
        >
          <Link
            className="btn alt"
            href="/himalayan-guide"
          >
            Read Tibet Travel Guide
          </Link>

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
          EXPERIENCE TIBET DEEPER
        </span>

        <h2
          style={{
            marginTop: 16,
            marginBottom: 12,
            fontSize: "clamp(30px, 5vw, 46px)",
          }}
        >
          Discover Tibet through culture and place.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Tell us which places, traditions and experiences
          interest you, then shape a Tibet journey around
          what you want to see, experience and understand.
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
            Create my Tibet journey
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

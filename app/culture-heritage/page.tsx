import Link from "next/link";

const culturalJourneys = [
  {
    region: "BHUTAN",
    title: "Bhutan Mountain & Culture",
    days: "9 days",
    price: "From $2,490",
    text: "Experience Bhutan through mountain landscapes, monasteries, traditional architecture and living cultural traditions.",
    href: "/tours/bhutan-mountain-culture",
  },
  {
    region: "TIBET",
    title: "Tibet High Plateau",
    days: "12 days",
    price: "From $2,190",
    text: "Explore the Tibetan Plateau through historic settlements, sacred places, dramatic landscapes and distinctive high-altitude culture.",
    href: "/tours/tibet-high-plateau",
  },
  {
    region: "NEPAL",
    title: "Upper Mustang",
    days: "11 days",
    price: "From $1,790",
    text: "Travel through a remarkable Himalayan region shaped by ancient settlements, Buddhist traditions and high-desert landscapes.",
    href: "/tours/upper-mustang",
  },
];

const experiences = [
  {
    number: "01",
    title: "Monasteries & sacred places",
    text: "Visit religious and sacred sites thoughtfully, following local guidance on dress, photography, ceremonies and access.",
  },
  {
    number: "02",
    title: "Historic settlements",
    text: "Explore towns and villages where architecture, trade routes and generations of local life reveal another side of the Himalaya.",
  },
  {
    number: "03",
    title: "Living traditions",
    text: "Culture is not a museum exhibit. Food, language, craft, music, religion and everyday routines continue to evolve across Himalayan communities.",
  },
  {
    number: "04",
    title: "Local storytelling",
    text: "Guides and hosts can add context that landscapes alone cannot provide, connecting places with history, belief and personal experience.",
  },
];

const respectfulTravel = [
  "Ask before photographing people, ceremonies or private spaces.",
  "Follow local rules at monasteries, temples and sacred sites.",
  "Dress appropriately where local customs or religious traditions require it.",
  "Avoid treating religious objects or ceremonies as entertainment.",
  "Support locally made crafts when purchasing souvenirs.",
  "Listen to local guides when cultural expectations differ from your own.",
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
      <section
        className="card"
        style={{
          padding: "clamp(28px, 5vw, 56px)",
          marginBottom: 38,
        }}
      >
        <span className="pill">
          CULTURE & HERITAGE
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
          Beyond the mountains,
          <br />
          discover the people and places.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 840,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Explore monasteries, historic settlements,
          sacred landscapes and living traditions
          across Himalayan regions — with curiosity,
          context and respect.
        </p>

        <div
          className="actions"
          style={{ marginTop: 28 }}
        >
          <Link
            className="btn"
            href="/tours"
          >
            Explore cultural journeys
          </Link>

          <Link
            className="btn alt"
            href="/custom-journey"
          >
            Build a private journey
          </Link>
        </div>
      </section>

      <section>
        <span className="pill">
          FEATURED JOURNEYS
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
            maxWidth: 780,
            lineHeight: 1.7,
          }}
        >
          These journeys combine Himalayan landscapes
          with opportunities to experience historic,
          cultural and spiritual traditions.
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
            maxWidth: 780,
            lineHeight: 1.7,
          }}
        >
          A cultural journey becomes more meaningful
          when there is time to understand the places
          and communities along the route.
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
            Cultural experiences are strongest when
            travelers approach communities as guests,
            not simply as attractions.
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
            Responsible travel guide
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
            Give culture enough time
          </h2>

          <p
            className="muted"
            style={{
              lineHeight: 1.75,
            }}
          >
            A private itinerary can create more room
            for monasteries, heritage sites, local
            communities, photography and slower travel
            rather than rushing between highlights.
          </p>

          <Link
            className="btn"
            href="/custom-journey"
          >
            Build cultural journey
          </Link>
        </div>
      </section>

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
          Understand the destination before arrival
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 850,
            lineHeight: 1.75,
          }}
        >
          Entry requirements, permits, cultural
          expectations and access to particular sites
          can vary by region and may change. Research
          current requirements before travel and
          follow the guidance of local authorities,
          hosts and experienced guides.
        </p>

        <div
          className="actions"
          style={{ marginTop: 22 }}
        >
          <Link
            className="btn alt"
            href="/himalayan-guide"
          >
            Read Himalayan Guide
          </Link>

          <Link
            className="btn alt"
            href="/ai-trip-planner"
          >
            Research with AI
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
          TRAVEL DEEPER
        </span>

        <h2
          style={{
            marginTop: 16,
            marginBottom: 12,
            fontSize: "clamp(30px, 5vw, 46px)",
          }}
        >
          Discover the Himalaya through its stories.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 730,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Tell us which places, traditions and
          experiences interest you, and build a
          journey around what you want to understand.
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
            Create my journey
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

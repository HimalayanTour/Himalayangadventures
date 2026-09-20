import Link from "next/link";

const regions = [
  {
    name: "Lhasa",
    tag: "CULTURAL HEART",
    description:
      "Historic landmarks, monasteries and the cultural heart of many Tibet journeys, with time to begin adjusting to the altitude.",
    href: "/tours/lhasa-classic",
  },
  {
    name: "Lhoka (Southern Tibet)",
    tag: "VALLEYS · HERITAGE",
    description:
      "Travel south of Lhasa into Lhoka for broad valleys, monasteries, historic places and the cultural landscapes of southern Tibet.",
    href: "/tours/lhoka-southern-tibet",
  },
  {
    name: "Everest",
    tag: "HIMALAYAN LANDSCAPES",
    description:
      "Journey from Lhasa across the plateau toward the dramatic high-altitude landscapes of the Tibet side of Everest.",
    href: "/tours/lhasa-everest-base-camp",
  },
  {
    name: "Mount Kailash",
    tag: "WESTERN TIBET",
    description:
      "A remote high-altitude journey shaped by extraordinary landscapes, pilgrimage traditions and Mount Kailash.",
    href: "/tours/kailash-kora",
  },
  {
    name: "Namtso Lake",
    tag: "HIGH PLATEAU",
    description:
      "Experience open plateau scenery and the high-elevation landscapes surrounding one of Tibet's great lakes.",
    href: "/tours/namtso-lake",
  },
  {
    name: "High Plateau",
    tag: "WIDE HORIZONS",
    description:
      "Explore Tibet through expansive landscapes, long overland journeys and the distinctive character of the plateau.",
    href: "/tours/tibet-high-plateau",
  },
];

const styles = [
  {
    number: "01",
    title: "Culture & Heritage",
    text:
      "Historic places, monasteries, architecture and journeys shaped by Tibet's cultural landscape.",
    href: "/culture-heritage",
  },
  {
    number: "02",
    title: "Adventure",
    text:
      "Longer routes, remote landscapes and active high-altitude experiences across Tibet.",
    href: "/adventure",
  },
  {
    number: "03",
    title: "Photography",
    text:
      "More time for landscapes, architecture, changing light and thoughtful photographic observation.",
    href: "/photography-tours",
  },
  {
    number: "04",
    title: "Spiritual Journeys",
    text:
      "Sacred places and pilgrimage landscapes approached with cultural respect and careful preparation.",
    href: "/spiritual-journeys",
  },
  {
    number: "05",
    title: "Private Journeys",
    text:
      "Shape a Tibet itinerary around your dates, interests, preferred pace and priorities.",
    href: "/custom-journey",
  },
  {
    number: "06",
    title: "Slower & Comfortable",
    text:
      "Thoughtful pacing and greater comfort where available, with more time to experience each place.",
    href: "/luxury-himalaya",
  },
];

export default function Page() {
  return (
    <section className="section">
      <div className="container">
        {/* HERO */}

        <div
          className="card"
          style={{
            padding: "clamp(32px, 6vw, 64px)",
            marginBottom: 34,
            background:
              "radial-gradient(circle at 85% 15%, rgba(109,224,194,.12), transparent 30%), linear-gradient(135deg, rgba(21,38,46,.96), rgba(24,66,73,.82))",
          }}
        >
          <div className="eyebrow">
            EXPLORE TIBET · 2026
          </div>

          <h1
            style={{
              fontSize: "clamp(46px, 7vw, 76px)",
              lineHeight: 0.98,
              maxWidth: 900,
              margin: "22px 0",
            }}
          >
            One extraordinary plateau.
            <br />
            Many ways to experience it.
          </h1>

          <p
            className="muted"
            style={{
              maxWidth: 840,
              fontSize: 18,
              lineHeight: 1.7,
            }}
          >
            Explore Tibet by landscape, cultural focus and
            journey style. From Lhasa and Lhoka in southern Tibet to
            Everest, Namtso and Mount Kailash, find the
            experience that best matches your time,
            interests and preferred pace.
          </p>

          <div
            className="actions"
            style={{ marginTop: 28 }}
          >
            <Link
              className="btn"
              href="/tours"
            >
              Explore Tibet tours
            </Link>

            <Link
              className="btn alt"
              href="/travel-intent"
            >
              Find my Tibet journey
            </Link>
          </div>
        </div>

        {/* PLACES */}

        <div style={{ marginBottom: 58 }}>
          <div className="eyebrow">
            EXPLORE BY PLACE
          </div>

          <h2
            style={{
              fontSize: "clamp(34px, 5vw, 48px)",
              margin: "16px 0 10px",
            }}
          >
            Where in Tibet do you want to go?
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 780,
              lineHeight: 1.7,
              marginBottom: 26,
            }}
          >
            Tibet changes dramatically across the
            plateau. Compare cultural centers, mountain
            landscapes, sacred places and remote regions
            before choosing your route.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {regions.map((region) => (
              <div
                className="card"
                key={region.name}
                style={{
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 300,
                }}
              >
                <div className="eyebrow">
                  {region.tag}
                </div>

                <h3
                  style={{
                    fontSize: 28,
                    margin: "18px 0 12px",
                  }}
                >
                  {region.name}
                </h3>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.7,
                    flex: 1,
                  }}
                >
                  {region.description}
                </p>

                <Link
                  className="btn alt"
                  href={region.href}
                  style={{
                    alignSelf: "flex-start",
                    marginTop: 18,
                  }}
                >
                  Explore {region.name}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* TRAVEL STYLES */}

        <div style={{ marginBottom: 58 }}>
          <div className="eyebrow">
            EXPERIENCE TIBET YOUR WAY
          </div>

          <h2
            style={{
              fontSize: "clamp(34px, 5vw, 48px)",
              margin: "16px 0 10px",
            }}
          >
            Start with what matters to you
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 780,
              lineHeight: 1.7,
              marginBottom: 26,
            }}
          >
            You do not need to start with a particular
            route. Begin with the experience you want,
            then find the part of Tibet and journey pace
            that fits it.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {styles.map((item) => (
              <Link
                href={item.href}
                className="card"
                key={item.title}
                style={{
                  padding: 24,
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
                <div
                  className="muted"
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: 2,
                  }}
                >
                  EXPERIENCE {item.number}
                </div>

                <h3
                  style={{
                    fontSize: 24,
                    margin: "16px 0 10px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {item.text}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* JOURNEY PATHS */}

        <div
          className="card"
          style={{
            padding: "clamp(28px, 5vw, 46px)",
            marginBottom: 28,
          }}
        >
          <div className="eyebrow">
            TIBET JOURNEY IDEAS
          </div>

          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 46px)",
              margin: "16px 0 12px",
            }}
          >
            From a first visit to a deeper journey.
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 800,
              lineHeight: 1.7,
            }}
          >
            A shorter journey might focus on Lhasa and
            Lhoka in southern Tibet. With more time, you can explore
            farther toward Everest, Namtso, the high
            plateau or western Tibet. The right route
            depends on your available days, interests,
            pace and altitude considerations.
          </p>

          <div
            className="actions"
            style={{ marginTop: 24 }}
          >
            <Link
              className="btn"
              href="/tours/lhasa-classic"
            >
              Start with Lhasa
            </Link>

            <Link
              className="btn alt"
              href="/tours/lhasa-everest-base-camp"
            >
              Explore Everest
            </Link>

            <Link
              className="btn alt"
              href="/tours/kailash-kora"
            >
              Explore Mount Kailash
            </Link>
          </div>
        </div>

        {/* INTENT */}

        <div
          className="card"
          style={{
            padding: "clamp(28px, 5vw, 48px)",
            marginBottom: 28,
            background:
              "linear-gradient(135deg, rgba(19,58,61,.9), rgba(16,35,42,.96))",
          }}
        >
          <div className="eyebrow">
            NOT SURE WHERE TO START?
          </div>

          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 46px)",
              margin: "16px 0 12px",
            }}
          >
            Let your priorities choose the journey.
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 780,
              lineHeight: 1.7,
            }}
          >
            Tell us whether you want quiet landscapes,
            culture, photography, adventure, spirituality
            or a slower pace. Our Tibet Travel Intent tool
            can match those priorities with journeys from
            the current collection.
          </p>

          <div
            className="actions"
            style={{ marginTop: 24 }}
          >
            <Link
              className="btn"
              href="/travel-intent"
            >
              Match my Tibet travel intent
            </Link>

            <Link
              className="btn alt"
              href="/compare-trips"
            >
              Compare Tibet journeys
            </Link>

            <Link
              className="btn alt"
              href="/ai-trip-planner"
            >
              Plan Tibet with AI
            </Link>
          </div>
        </div>

        {/* PLANNING NOTE */}

        <div
          className="notice"
          style={{
            lineHeight: 1.7,
          }}
        >
          Travel documentation, permits, route access,
          local requirements, weather and operating
          conditions can change. Confirm current
          information for your travel dates, nationality
          and intended Tibet route before final
          arrangements are made.
        </div>
      </div>
    </section>
  );
}

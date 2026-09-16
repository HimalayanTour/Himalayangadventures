import Link from "next/link";

const regions = [
  {
    name: "Nepal",
    tag: "CLASSIC HIMALAYA",
    description:
      "Everest, Annapurna, Langtang, Manaslu and Mustang — Nepal offers the widest range of trekking landscapes and journey styles.",
    href: "/nepal",
  },
  {
    name: "Bhutan",
    tag: "CULTURE & MOUNTAINS",
    description:
      "Mountain valleys, monasteries and living traditions for travelers who want culture, scenery and a more measured pace.",
    href: "/bhutan",
  },
  {
    name: "Tibet",
    tag: "HIGH PLATEAU",
    description:
      "Vast high-altitude landscapes, sacred places and distinctive plateau journeys that require thoughtful preparation.",
    href: "/tibet",
  },
  {
    name: "Indian Himalaya",
    tag: "LADAKH & BEYOND",
    description:
      "High desert landscapes, mountain communities and dramatic routes across Ladakh and the Indian Himalaya.",
    href: "/india-himalaya",
  },
];

const styles = [
  {
    number: "01",
    title: "Adventure",
    text: "Trekking, high passes and active journeys designed around mountain landscapes.",
    href: "/adventure",
  },
  {
    number: "02",
    title: "Culture & Heritage",
    text: "Monasteries, historic places, local traditions and journeys shaped by culture.",
    href: "/culture-heritage",
  },
  {
    number: "03",
    title: "Photography",
    text: "More time for landscapes, villages, changing light and meaningful photographic opportunities.",
    href: "/photography-tours",
  },
  {
    number: "04",
    title: "Spiritual Journeys",
    text: "Pilgrimage and contemplative travel approached with cultural respect and careful preparation.",
    href: "/spiritual-journeys",
  },
  {
    number: "05",
    title: "Family Himalaya",
    text: "Sensible pacing, appropriate altitude and experiences designed around the whole family.",
    href: "/family-himalaya",
  },
  {
    number: "06",
    title: "Luxury Himalaya",
    text: "Private logistics, better pacing and higher comfort where the destination allows it.",
    href: "/luxury-himalaya",
  },
];

export default function Page() {
  return (
    <section className="section">
      <div className="container">
        <div
          className="card"
          style={{
            padding: "clamp(32px, 6vw, 64px)",
            marginBottom: 34,
            background:
              "linear-gradient(135deg, rgba(21,38,46,.96), rgba(24,66,73,.82))",
          }}
        >
          <div className="eyebrow">EXPLORE THE HIMALAYA</div>

          <h1
            style={{
              fontSize: "clamp(46px, 7vw, 76px)",
              lineHeight: 0.98,
              maxWidth: 850,
              margin: "22px 0",
            }}
          >
            Four regions.
            <br />
            Thousands of ways to travel.
          </h1>

          <p
            className="muted"
            style={{
              maxWidth: 820,
              fontSize: 18,
              lineHeight: 1.7,
            }}
          >
            Start with the place that interests you, then compare landscapes,
            altitude, journey style and pace. From Nepal&apos;s legendary
            trekking routes to Bhutan, Tibet and Ladakh, find the Himalayan
            experience that fits you.
          </p>

          <div className="actions" style={{ marginTop: 28 }}>
            <Link className="btn" href="/tours">
              Explore all tours
            </Link>

            <Link className="btn alt" href="/travel-intent">
              Find my journey
            </Link>
          </div>
        </div>

        <div style={{ marginBottom: 58 }}>
          <div className="eyebrow">CHOOSE A REGION</div>

          <h2
            style={{
              fontSize: "clamp(34px, 5vw, 48px)",
              margin: "16px 0 10px",
            }}
          >
            Where do you want the mountains to take you?
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 760,
              lineHeight: 1.7,
              marginBottom: 26,
            }}
          >
            Each Himalayan region has a different character. Compare the
            atmosphere first, then explore individual journeys.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
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
                <div className="eyebrow">{region.tag}</div>

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

        <div style={{ marginBottom: 58 }}>
          <div className="eyebrow">TRAVEL YOUR WAY</div>

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
              maxWidth: 760,
              lineHeight: 1.7,
              marginBottom: 26,
            }}
          >
            You do not need to choose a destination first. Start with the kind
            of experience you want and build the geography around it.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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

        <div
          className="card"
          style={{
            padding: "clamp(28px, 5vw, 48px)",
            marginBottom: 28,
          }}
        >
          <div className="eyebrow">NOT SURE WHERE TO START?</div>

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
              maxWidth: 760,
              lineHeight: 1.7,
            }}
          >
            Tell us whether you want quiet landscapes, culture, photography,
            adventure, comfort or a slower pace. Our Travel Intent tool can
            match those priorities with suitable journeys.
          </p>

          <div className="actions" style={{ marginTop: 24 }}>
            <Link className="btn" href="/travel-intent">
              Match my travel intent
            </Link>

            <Link className="btn alt" href="/compare-trips">
              Compare trips
            </Link>

            <Link className="btn alt" href="/ai-trip-planner">
              Plan with AI
            </Link>
          </div>
        </div>

        <div
          className="notice"
          style={{
            lineHeight: 1.7,
          }}
        >
          Himalayan conditions, permits, entry requirements and accessibility
          can change. Check current information before confirming a journey.
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

const journeys = [
  {
    region: "EVEREST",
    title: "Everest Base Camp",
    days: "14 days",
    difficulty: "Challenging",
    price: "From $1,490",
    description:
      "A legendary journey through the Khumbu, mountain villages and high-altitude landscapes toward Everest Base Camp.",
    href: "/tours/everest-base-camp",
  },
  {
    region: "ANNAPURNA",
    title: "Annapurna Classic",
    days: "10 days",
    difficulty: "Moderate",
    price: "From $1,190",
    description:
      "A varied Himalayan journey combining mountain scenery, villages and the distinctive landscapes of the Annapurna region.",
    href: "/tours/annapurna-classic",
  },
  {
    region: "LANGTANG",
    title: "Langtang Valley",
    days: "8 days",
    difficulty: "Moderate",
    price: "From $990",
    description:
      "A shorter mountain journey through the Langtang Valley with dramatic scenery and a strong sense of place.",
    href: "/tours/langtang-valley",
  },
  {
    region: "MANASLU",
    title: "Manaslu Circuit",
    days: "15 days",
    difficulty: "Challenging",
    price: "From $1,690",
    description:
      "A longer circuit for travelers looking for remote landscapes, mountain communities and a demanding high-altitude route.",
    href: "/tours/manaslu-circuit",
  },
  {
    region: "MUSTANG",
    title: "Upper Mustang",
    days: "11 days",
    difficulty: "Moderate",
    price: "From $1,790",
    description:
      "High-desert landscapes, historic settlements and a distinctive cultural journey through one of Nepal's most remarkable regions.",
    href: "/tours/upper-mustang",
  },
];

const planning = [
  {
    number: "01",
    label: "ALTITUDE",
    title: "Build in acclimatization",
    text: "Many Nepal journeys reach significant altitude. Good itineraries allow time for gradual ascent, rest and flexibility.",
  },
  {
    number: "02",
    label: "SEASON",
    title: "Choose the right time",
    text: "Weather and trail conditions vary by region and elevation. Check current forecasts and seasonal conditions before departure.",
  },
  {
    number: "03",
    label: "PACE",
    title: "Do not rush the mountains",
    text: "Distance alone does not determine difficulty. Elevation, terrain, daily ascent and recovery time all affect the experience.",
  },
  {
    number: "04",
    label: "PREPARATION",
    title: "Plan beyond the trail",
    text: "Permits, transport, accommodation and route logistics should be confirmed for the specific journey before travel.",
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
          <div className="eyebrow">NEPAL · HIMALAYA</div>

          <h1
            style={{
              fontSize: "clamp(48px, 7vw, 78px)",
              lineHeight: 0.98,
              maxWidth: 900,
              margin: "22px 0",
            }}
          >
            The classic gateway
            <br />
            to the Himalaya.
          </h1>

          <p
            className="muted"
            style={{
              maxWidth: 850,
              fontSize: 18,
              lineHeight: 1.7,
            }}
          >
            From Everest and Annapurna to Langtang, Manaslu and Mustang, Nepal
            brings together legendary trekking routes, mountain communities
            and extraordinary Himalayan landscapes.
          </p>

          <div className="actions" style={{ marginTop: 28 }}>
            <Link className="btn" href="/tours">
              Explore Nepal journeys
            </Link>

            <Link className="btn alt" href="/custom-journey">
              Build a private journey
            </Link>
          </div>
        </div>

        <div style={{ marginBottom: 58 }}>
          <div className="eyebrow">WHY NEPAL</div>

          <h2
            style={{
              fontSize: "clamp(34px, 5vw, 48px)",
              margin: "16px 0 10px",
            }}
          >
            One country. Many different Himalayas.
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 820,
              lineHeight: 1.7,
              marginBottom: 26,
            }}
          >
            Nepal can offer very different journeys depending on the region.
            Choose iconic high-altitude trekking, quieter valleys, remote
            circuits or culturally focused mountain travel.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            <div className="card" style={{ padding: 24 }}>
              <div className="eyebrow">EVEREST</div>
              <h3 style={{ fontSize: 24, margin: "16px 0 10px" }}>
                Iconic high mountains
              </h3>
              <p className="muted" style={{ lineHeight: 1.7 }}>
                Famous trails, Sherpa communities and some of the world's most
                recognizable mountain landscapes.
              </p>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <div className="eyebrow">ANNAPURNA</div>
              <h3 style={{ fontSize: 24, margin: "16px 0 10px" }}>
                Variety & landscapes
              </h3>
              <p className="muted" style={{ lineHeight: 1.7 }}>
                A diverse region with mountain views, villages and routes suited
                to several different journey lengths.
              </p>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <div className="eyebrow">MANASLU & LANGTANG</div>
              <h3 style={{ fontSize: 24, margin: "16px 0 10px" }}>
                A different rhythm
              </h3>
              <p className="muted" style={{ lineHeight: 1.7 }}>
                Alternatives for travelers interested in mountain landscapes
                beyond the most familiar routes.
              </p>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <div className="eyebrow">MUSTANG</div>
              <h3 style={{ fontSize: 24, margin: "16px 0 10px" }}>
                Culture & high desert
              </h3>
              <p className="muted" style={{ lineHeight: 1.7 }}>
                Distinctive landscapes, historic settlements and a Himalayan
                experience with a very different character.
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 58 }}>
          <div className="eyebrow">FEATURED NEPAL JOURNEYS</div>

          <h2
            style={{
              fontSize: "clamp(34px, 5vw, 48px)",
              margin: "16px 0 10px",
            }}
          >
            Find your route through Nepal
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 780,
              lineHeight: 1.7,
              marginBottom: 26,
            }}
          >
            Compare duration, difficulty and region, then open the full journey
            to see which route best matches your plans.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {journeys.map((journey) => (
              <div
                className="card"
                key={journey.title}
                style={{
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 330,
                }}
              >
                <div className="eyebrow">{journey.region}</div>

                <h3
                  style={{
                    fontSize: 27,
                    margin: "18px 0 12px",
                  }}
                >
                  {journey.title}
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 16,
                  }}
                >
                  <span className="pill">{journey.days}</span>
                  <span className="pill">{journey.difficulty}</span>
                  <span className="pill">{journey.price}</span>
                </div>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.7,
                    flex: 1,
                  }}
                >
                  {journey.description}
                </p>

                <Link
                  className="btn alt"
                  href={journey.href}
                  style={{
                    alignSelf: "flex-start",
                    marginTop: 18,
                  }}
                >
                  View journey
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 58 }}>
          <div className="eyebrow">PLAN WELL</div>

          <h2
            style={{
              fontSize: "clamp(34px, 5vw, 48px)",
              margin: "16px 0 10px",
            }}
          >
            Nepal rewards thoughtful planning
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 800,
              lineHeight: 1.7,
              marginBottom: 26,
            }}
          >
            Himalayan travel is shaped by altitude, weather, terrain and local
            logistics. Build enough flexibility into your journey.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {planning.map((item) => (
              <div className="card" key={item.number} style={{ padding: 24 }}>
                <div
                  className="muted"
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: 2,
                  }}
                >
                  GUIDE {item.number}
                </div>

                <div
                  className="eyebrow"
                  style={{
                    marginTop: 14,
                    display: "inline-block",
                  }}
                >
                  {item.label}
                </div>

                <h3 style={{ fontSize: 22, margin: "16px 0 10px" }}>
                  {item.title}
                </h3>

                <p className="muted" style={{ lineHeight: 1.7 }}>
                  {item.text}
                </p>
              </div>
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
          <div className="eyebrow">BUILD YOUR NEPAL JOURNEY</div>

          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 46px)",
              margin: "16px 0 12px",
            }}
          >
            Not sure which Nepal route fits you?
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 760,
              lineHeight: 1.7,
            }}
          >
            Compare the journeys directly, match a route to your travel
            priorities or use the AI planner to create a starting point around
            your time and interests.
          </p>

          <div className="actions" style={{ marginTop: 24 }}>
            <Link className="btn" href="/travel-intent">
              Find my Nepal journey
            </Link>

            <Link className="btn alt" href="/compare-trips">
              Compare trips
            </Link>

            <Link className="btn alt" href="/ai-trip-planner">
              Plan with AI
            </Link>
          </div>
        </div>

        <div className="notice" style={{ lineHeight: 1.7 }}>
          Mountain weather, trail access, permits and local requirements can
          change. Check current conditions and applicable official requirements
          before confirming travel.
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

const highlights = [
  {
    label: "PARO",
    title: "Valleys & sacred places",
    text: "Begin among mountain valleys, traditional architecture and important cultural sites, with time to adjust to the rhythm of Bhutan.",
  },
  {
    label: "THIMPHU",
    title: "Living Himalayan culture",
    text: "Explore Bhutanese culture through contemporary life, traditional arts, local institutions and everyday experiences.",
  },
  {
    label: "PUNAKHA",
    title: "Rivers, valleys & heritage",
    text: "Descend into warmer valleys where historic architecture, agricultural landscapes and rivers create a different side of Bhutan.",
  },
  {
    label: "MOUNTAINS",
    title: "Walk beyond the road",
    text: "Add carefully paced hikes and mountain experiences for travelers who want to combine cultural exploration with active days.",
  },
];

const planning = [
  {
    number: "01",
    label: "PACE",
    title: "Give Bhutan enough time",
    text: "A thoughtful itinerary leaves room for valleys, cultural visits, walks and the journey between places instead of rushing through a checklist.",
  },
  {
    number: "02",
    label: "CULTURE",
    title: "Travel with respect",
    text: "Sacred places and local traditions are part of everyday life. Follow local guidance for dress, photography and behavior.",
  },
  {
    number: "03",
    label: "ALTITUDE",
    title: "Plan for elevation",
    text: "Some walks and mountain areas reach significant altitude. Match the itinerary to your experience, health and acclimatization needs.",
  },
  {
    number: "04",
    label: "CURRENT RULES",
    title: "Confirm requirements",
    text: "Entry arrangements, fees and travel requirements can change. Confirm current official requirements before finalizing the journey.",
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
          <div className="eyebrow">BHUTAN · HIMALAYA</div>

          <h1
            style={{
              fontSize: "clamp(48px, 7vw, 78px)",
              lineHeight: 0.98,
              maxWidth: 900,
              margin: "22px 0",
            }}
          >
            Mountains, monasteries
            <br />
            and a slower rhythm.
          </h1>

          <p
            className="muted"
            style={{
              maxWidth: 850,
              fontSize: 18,
              lineHeight: 1.7,
            }}
          >
            Explore Bhutan through high valleys, sacred places, traditional
            architecture and mountain landscapes. Build a journey with enough
            time to understand the places between the highlights.
          </p>

          <div className="actions" style={{ marginTop: 28 }}>
            <Link
              className="btn"
              href="/tours/bhutan-mountain-culture"
            >
              Explore Bhutan journey
            </Link>

            <Link className="btn alt" href="/custom-journey">
              Build a private journey
            </Link>
          </div>
        </div>

        <div style={{ marginBottom: 58 }}>
          <div className="eyebrow">DISCOVER BHUTAN</div>

          <h2
            style={{
              fontSize: "clamp(34px, 5vw, 48px)",
              margin: "16px 0 10px",
            }}
          >
            A Himalayan journey shaped by place and culture
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 820,
              lineHeight: 1.7,
              marginBottom: 26,
            }}
          >
            Bhutan works especially well for travelers who want mountain
            scenery without making every day about reaching a summit. Culture,
            landscape and thoughtful pacing can be part of the same journey.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {highlights.map((item) => (
              <div className="card" key={item.label} style={{ padding: 24 }}>
                <div className="eyebrow">{item.label}</div>

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
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 58 }}>
          <div className="eyebrow">FEATURED JOURNEY</div>

          <h2
            style={{
              fontSize: "clamp(34px, 5vw, 48px)",
              margin: "16px 0 10px",
            }}
          >
            Bhutan Mountain & Culture
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 800,
              lineHeight: 1.7,
              marginBottom: 26,
            }}
          >
            A starting point for travelers who want to combine Bhutan&apos;s
            mountain landscapes with cultural experiences and comfortable
            pacing.
          </p>

          <div
            className="card"
            style={{
              padding: "clamp(26px, 4vw, 38px)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(170px, 1fr))",
                gap: 16,
                marginBottom: 26,
              }}
            >
              <div>
                <div className="muted" style={{ marginBottom: 8 }}>
                  Duration
                </div>
                <strong style={{ fontSize: 22 }}>9 days</strong>
              </div>

              <div>
                <div className="muted" style={{ marginBottom: 8 }}>
                  Difficulty
                </div>
                <strong style={{ fontSize: 22 }}>Easy–Moderate</strong>
              </div>

              <div>
                <div className="muted" style={{ marginBottom: 8 }}>
                  Region
                </div>
                <strong style={{ fontSize: 22 }}>Bhutan</strong>
              </div>

              <div>
                <div className="muted" style={{ marginBottom: 8 }}>
                  Starting price
                </div>
                <strong style={{ fontSize: 22 }}>$2,490</strong>
              </div>
            </div>

            <p
              className="muted"
              style={{
                maxWidth: 820,
                lineHeight: 1.7,
              }}
            >
              Use this journey as a starting point, then adapt the pace,
              interests and level of activity around your own priorities.
            </p>

            <div className="actions" style={{ marginTop: 22 }}>
              <Link
                className="btn"
                href="/tours/bhutan-mountain-culture"
              >
                View full journey
              </Link>

              <Link className="btn alt" href="/custom-journey">
                Customize Bhutan
              </Link>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 58 }}>
          <div className="eyebrow">BEFORE YOU GO</div>

          <h2
            style={{
              fontSize: "clamp(34px, 5vw, 48px)",
              margin: "16px 0 10px",
            }}
          >
            Plan Bhutan with care
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 800,
              lineHeight: 1.7,
              marginBottom: 26,
            }}
          >
            Good Bhutan planning balances cultural respect, realistic travel
            times, altitude awareness and current entry requirements.
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

                <h3
                  style={{
                    fontSize: 22,
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
          <div className="eyebrow">DESIGN YOUR BHUTAN JOURNEY</div>

          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 46px)",
              margin: "16px 0 12px",
            }}
          >
            Make the journey fit the way you travel.
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 780,
              lineHeight: 1.7,
            }}
          >
            Choose more culture, photography, walking, comfort or quiet time
            and create a Bhutan itinerary around your preferred pace.
          </p>

          <div className="actions" style={{ marginTop: 24 }}>
            <Link className="btn" href="/custom-journey">
              Build my Bhutan journey
            </Link>

            <Link className="btn alt" href="/ai-trip-planner">
              Plan with AI
            </Link>

            <Link className="btn alt" href="/responsible-travel">
              Responsible travel
            </Link>
          </div>
        </div>

        <div className="notice" style={{ lineHeight: 1.7 }}>
          Bhutan&apos;s entry procedures, fees, permits and travel requirements
          can change. Confirm current official requirements before booking or
          departure.
        </div>
      </div>
    </section>
  );
}

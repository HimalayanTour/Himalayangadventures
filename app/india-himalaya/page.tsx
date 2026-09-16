import Link from "next/link";

const regions = [
  {
    label: "LADAKH",
    title: "High desert & monasteries",
    text: "Explore dramatic valleys, mountain passes, Buddhist monasteries and the distinctive high-altitude landscapes of Ladakh.",
  },
  {
    label: "HIMACHAL",
    title: "Valleys, villages & trails",
    text: "Combine mountain landscapes with villages, cultural experiences and active journeys across the western Himalaya.",
  },
  {
    label: "UTTARAKHAND",
    title: "Sacred mountains & journeys",
    text: "Discover Himalayan valleys, pilgrimage landscapes and mountain routes where nature and spiritual traditions meet.",
  },
  {
    label: "SIKKIM",
    title: "Eastern Himalayan character",
    text: "Experience forested valleys, monasteries and mountain views in a region shaped by distinctive cultures and landscapes.",
  },
];

const planning = [
  {
    number: "01",
    title: "Choose the right region",
    text: "The Indian Himalaya covers a huge area. Ladakh, Himachal, Uttarakhand and Sikkim offer very different landscapes, climates and journey styles.",
  },
  {
    number: "02",
    title: "Plan for altitude",
    text: "Some itineraries rise quickly into high terrain. Build acclimatization and sensible pacing into journeys that reach significant elevations.",
  },
  {
    number: "03",
    title: "Allow for travel time",
    text: "Mountain roads, weather and long distances can affect schedules. Avoid building an itinerary that depends on perfect conditions every day.",
  },
  {
    number: "04",
    title: "Travel with local context",
    text: "Communities, languages, religions and customs vary greatly across Himalayan India. Approach each region with curiosity and respect.",
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
            padding: "58px 58px",
            marginBottom: 34,
            background:
              "linear-gradient(135deg, rgba(23,39,48,.96), rgba(18,69,73,.78))",
          }}
        >
          <div
            className="eyebrow"
            style={{
              marginBottom: 22,
              letterSpacing: ".16em",
            }}
          >
            INDIA · HIMALAYA
          </div>

          <h1
            style={{
              fontSize: "clamp(3rem, 6vw, 5rem)",
              lineHeight: 0.98,
              maxWidth: 900,
              marginBottom: 24,
            }}
          >
            Many regions.
            <br />
            One extraordinary Himalaya.
          </h1>

          <p
            className="muted"
            style={{
              fontSize: 18,
              lineHeight: 1.75,
              maxWidth: 900,
            }}
          >
            Journey through Ladakh, Himachal, Uttarakhand and Sikkim — from
            high-altitude desert and mountain monasteries to green valleys,
            sacred landscapes and remote Himalayan communities.
          </p>

          <div className="actions" style={{ marginTop: 28 }}>
            <Link
              className="btn"
              href="/tours/ladakh-high-altitude"
            >
              Explore Ladakh journey
            </Link>

            <Link
              className="btn alt"
              href="/custom-journey?destination=Indian%20Himalaya"
            >
              Build a private journey
            </Link>
          </div>
        </div>

        {/* REGIONS */}
        <div style={{ marginTop: 40 }}>
          <div
            className="eyebrow"
            style={{
              marginBottom: 16,
              letterSpacing: ".14em",
            }}
          >
            EXPLORE HIMALAYAN INDIA
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: 12,
            }}
          >
            Four regions. Four different mountain worlds.
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 900,
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            Himalayan India stretches across an enormous landscape. Choosing
            the right region depends on the scenery, altitude, culture,
            season and style of journey you want.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 16,
            }}
          >
            {regions.map((region) => (
              <div
                className="card"
                key={region.label}
                style={{
                  padding: 24,
                  minHeight: 250,
                }}
              >
                <div
                  className="eyebrow"
                  style={{
                    marginBottom: 18,
                    letterSpacing: ".14em",
                  }}
                >
                  {region.label}
                </div>

                <h3
                  style={{
                    fontSize: 23,
                    lineHeight: 1.15,
                    marginBottom: 14,
                  }}
                >
                  {region.title}
                </h3>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {region.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURED JOURNEY */}
        <div style={{ marginTop: 58 }}>
          <div
            className="eyebrow"
            style={{
              marginBottom: 16,
              letterSpacing: ".14em",
            }}
          >
            FEATURED JOURNEY
          </div>

          <div
            className="card"
            style={{
              padding: 34,
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: 28,
                alignItems: "flex-start",
              }}
            >
              <div style={{ maxWidth: 720 }}>
                <div className="eyebrow" style={{ marginBottom: 14 }}>
                  LADAKH · INDIA
                </div>

                <h2
                  style={{
                    fontSize: "clamp(2rem, 4vw, 2.7rem)",
                    marginBottom: 14,
                  }}
                >
                  Ladakh High Altitude
                </h2>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.7,
                    marginBottom: 18,
                  }}
                >
                  A 10-day Himalayan journey through Ladakh&apos;s dramatic
                  high-altitude landscapes, combining mountain scenery,
                  cultural experiences and thoughtful acclimatization.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <span className="pill">10 days</span>
                  <span className="pill">Moderate</span>
                  <span className="pill">From $1,590</span>
                </div>
              </div>

              <Link
                className="btn"
                href="/tours/ladakh-high-altitude"
              >
                View journey
              </Link>
            </div>
          </div>
        </div>

        {/* PLANNING */}
        <div style={{ marginTop: 58 }}>
          <div
            className="eyebrow"
            style={{
              marginBottom: 16,
              letterSpacing: ".14em",
            }}
          >
            PLAN BETTER
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: 12,
            }}
          >
            Build the journey around the mountains
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 850,
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            Distances, altitude and conditions can strongly affect Himalayan
            travel in India. A strong itinerary gives the mountains enough
            room to shape the pace.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 16,
            }}
          >
            {planning.map((item) => (
              <div
                className="card"
                key={item.number}
                style={{
                  padding: 24,
                  minHeight: 245,
                }}
              >
                <div
                  className="muted"
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: ".15em",
                    marginBottom: 18,
                  }}
                >
                  PLANNING {item.number}
                </div>

                <h3
                  style={{
                    fontSize: 22,
                    marginBottom: 14,
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

        {/* CTA */}
        <div
          className="card"
          style={{
            marginTop: 58,
            padding: 34,
          }}
        >
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            CREATE YOUR JOURNEY
          </div>

          <h2 style={{ marginBottom: 12 }}>
            Which part of the Indian Himalaya fits you?
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 780,
              lineHeight: 1.7,
            }}
          >
            Tell us your preferred region, dates, activity level and travel
            style, or let the AI planner help you compare the possibilities.
          </p>

          <div className="actions" style={{ marginTop: 22 }}>
            <Link
              className="btn"
              href="/custom-journey?destination=Indian%20Himalaya"
            >
              Design my India journey
            </Link>

            <Link
              className="btn alt"
              href="/ai-trip-planner?prompt=Help%20me%20choose%20and%20plan%20a%20journey%20in%20the%20Indian%20Himalaya%2C%20including%20Ladakh%2C%20Himachal%2C%20Uttarakhand%20or%20Sikkim."
            >
              Compare with AI
            </Link>
          </div>
        </div>

        <p
          className="muted"
          style={{
            fontSize: 13,
            lineHeight: 1.6,
            marginTop: 18,
          }}
        >
          Access, permits, weather and local travel conditions can vary by
          region and season. Confirm current requirements before departure.
        </p>
      </div>
    </section>
  );
}

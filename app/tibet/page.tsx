import Link from "next/link";

const highlights = [
  {
    label: "LHASA",
    title: "Sacred city & heritage",
    text: "Begin with time to adjust to the plateau while exploring monasteries, historic quarters and Tibet's distinctive cultural landscape.",
  },
  {
    label: "HIGH PLATEAU",
    title: "Vast Himalayan landscapes",
    text: "Travel across open valleys, high passes and extraordinary plateau scenery where altitude and distance shape the rhythm of the journey.",
  },
  {
    label: "EVEREST REGION",
    title: "The northern Himalaya",
    text: "Experience dramatic views toward the world's highest mountains while allowing enough time for altitude, weather and changing road conditions.",
  },
  {
    label: "SACRED JOURNEYS",
    title: "Pilgrimage & meaning",
    text: "Explore journeys connected with monasteries, pilgrimage traditions and sacred landscapes with respect for local customs and communities.",
  },
];

const planning = [
  {
    number: "01",
    title: "Altitude comes first",
    text: "Much of Tibet is already at significant elevation. Build gradual acclimatization, lighter early days and flexibility into the itinerary.",
  },
  {
    number: "02",
    title: "Travel requirements",
    text: "Entry, permits and route requirements can change. Confirm current requirements for your nationality and itinerary before departure.",
  },
  {
    number: "03",
    title: "Distance matters",
    text: "Plateau journeys can involve long drives between destinations. A better itinerary balances major sights with realistic travel days.",
  },
  {
    number: "04",
    title: "Respect local culture",
    text: "Monasteries and sacred landscapes are living cultural and religious places. Follow local guidance for dress, photography and behavior.",
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
            TIBET · HIGH PLATEAU
          </div>

          <h1
            style={{
              fontSize: "clamp(3rem, 6vw, 5rem)",
              lineHeight: 0.98,
              maxWidth: 900,
              marginBottom: 24,
            }}
          >
            Journey across the
            <br />
            roof of the world.
          </h1>

          <p
            className="muted"
            style={{
              fontSize: 18,
              lineHeight: 1.75,
              maxWidth: 880,
            }}
          >
            Explore high-plateau landscapes, monasteries, sacred places and
            Himalayan horizons through journeys designed around altitude,
            thoughtful pacing and cultural respect.
          </p>

          <div className="actions" style={{ marginTop: 28 }}>
            <Link className="btn" href="/tours/tibet-high-plateau">
              Explore Tibet journey
            </Link>

            <Link
              className="btn alt"
              href="/custom-journey?destination=Tibet"
            >
              Build a private journey
            </Link>
          </div>
        </div>

        {/* HIGHLIGHTS */}
        <div style={{ marginTop: 40 }}>
          <div
            className="eyebrow"
            style={{
              marginBottom: 16,
              letterSpacing: ".14em",
            }}
          >
            DISCOVER TIBET
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: 12,
            }}
          >
            A different scale of Himalayan travel
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 850,
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            Tibet combines immense landscapes with centuries of cultural and
            spiritual history. The best journeys leave enough time to
            acclimatize, understand the places you visit and experience the
            plateau without rushing.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 16,
            }}
          >
            {highlights.map((item) => (
              <div
                className="card"
                key={item.label}
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
                  {item.label}
                </div>

                <h3
                  style={{
                    fontSize: 23,
                    marginBottom: 14,
                    lineHeight: 1.15,
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

        {/* PLANNING */}
        <div style={{ marginTop: 58 }}>
          <div
            className="eyebrow"
            style={{
              marginBottom: 16,
              letterSpacing: ".14em",
            }}
          >
            PLAN THE PLATEAU
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: 12,
            }}
          >
            Tibet rewards slower, better-prepared travel
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 850,
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            Altitude, permits, long distances and local conditions all matter
            when planning a Tibet journey. Build flexibility into the trip
            rather than treating the itinerary as a race.
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
            marginBottom: 20,
          }}
        >
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            YOUR TIBET JOURNEY
          </div>

          <h2 style={{ marginBottom: 12 }}>
            Build the journey around your time and priorities.
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 760,
              lineHeight: 1.7,
            }}
          >
            Tell us your preferred dates, travel style and interests, or use
            the AI planner to start comparing possibilities.
          </p>

          <div className="actions" style={{ marginTop: 22 }}>
            <Link
              className="btn"
              href="/custom-journey?destination=Tibet"
            >
              Design my Tibet journey
            </Link>

            <Link
              className="btn alt"
              href="/ai-trip-planner?prompt=Help%20me%20plan%20a%20Tibet%20journey%20with%20realistic%20altitude%20acclimatization%2C%20cultural%20experiences%20and%20thoughtful%20pacing."
            >
              Plan Tibet with AI
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
          Travel requirements, permits, access and local conditions can
          change. Confirm current requirements and conditions before booking
          or departure.
        </p>
      </div>
    </section>
  );
}

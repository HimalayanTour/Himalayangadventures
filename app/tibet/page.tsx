import Link from "next/link";
import { tours } from "@/lib/tours";
import TourCard from "@/components/TourCard";

const highlights = [
  {
    label: "LHASA",
    title: "The cultural heart",
    text: "Begin in Lhasa with time to acclimatize while exploring historic quarters, monasteries and some of Tibet's most important cultural landmarks.",
  },
  {
    label: "LHOKA · SOUTHERN TIBET",
    title: "Valleys & heritage",
    text: "Travel south of Lhasa into Lhoka, exploring broad valleys, historic places and cultural landscapes in one of Tibet's most important heritage regions.",
  },
  {
    label: "EVEREST",
    title: "North face of the Himalaya",
    text: "Cross the plateau toward Everest and experience one of Tibet's most dramatic combinations of high-altitude landscape and Himalayan scenery.",
  },
  {
    label: "MOUNT KAILASH",
    title: "Sacred western Tibet",
    text: "Journey into the far west toward Mount Kailash and Lake Manasarovar through one of the plateau's most significant pilgrimage landscapes.",
  },
];

const planning = [
  {
    number: "01",
    title: "Acclimatize gradually",
    text: "Tibet is a high-altitude destination. A thoughtful itinerary gives your body time to adjust before moving toward higher passes and remote regions.",
  },
  {
    number: "02",
    title: "Check current requirements",
    text: "Travel documentation, permits, access rules and route requirements can change. Current requirements should be confirmed for your nationality and itinerary.",
  },
  {
    number: "03",
    title: "Allow realistic travel time",
    text: "Distances across the plateau can be substantial. Good planning balances major sights with comfortable driving days, rest and flexibility.",
  },
  {
    number: "04",
    title: "Travel with cultural respect",
    text: "Monasteries, pilgrimage routes and sacred landscapes are living cultural and religious places. Follow local guidance for photography, dress and behavior.",
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
            padding: "clamp(34px, 6vw, 68px)",
            marginBottom: 34,
            background:
              "radial-gradient(circle at 85% 15%, rgba(109,224,194,.12), transparent 28%), linear-gradient(135deg, rgba(23,39,48,.98), rgba(18,69,73,.78))",
          }}
        >
          <div
            className="eyebrow"
            style={{
              marginBottom: 22,
              letterSpacing: ".16em",
            }}
          >
            EXPLORE TIBET · 2026
          </div>

          <h1
            style={{
              fontSize: "clamp(3.2rem, 7vw, 5.8rem)",
              lineHeight: 0.94,
              maxWidth: 950,
              marginBottom: 26,
              letterSpacing: "-0.045em",
            }}
          >
            One plateau.
            <br />
            Extraordinary journeys.
          </h1>

          <p
            className="muted"
            style={{
              fontSize: 18,
              lineHeight: 1.8,
              maxWidth: 880,
            }}
          >
            Discover Tibet through journeys connecting Lhasa, Lhoka,
            Everest, Namtso, Mount Kailash and the immense landscapes
            of the Tibetan Plateau — with altitude, culture and thoughtful
            pacing at the center of the experience.
          </p>

          <div className="actions" style={{ marginTop: 30 }}>
            <Link className="btn" href="/tours">
              Explore all Tibet tours
            </Link>

            <Link
              className="btn alt"
              href="/custom-journey?destination=Tibet"
            >
              Create a private journey
            </Link>
          </div>
        </div>

        {/* INTRO */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 34,
            alignItems: "end",
            marginTop: 50,
            marginBottom: 38,
          }}
        >
          <div>
            <div
              className="eyebrow"
              style={{
                marginBottom: 15,
                letterSpacing: ".14em",
              }}
            >
              WHY TIBET
            </div>

            <h2
              style={{
                fontSize: "clamp(2.3rem, 5vw, 3.8rem)",
                lineHeight: 1,
                margin: 0,
              }}
            >
              Travel differently at the roof of the world.
            </h2>
          </div>

          <p
            className="muted"
            style={{
              fontSize: 17,
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            Tibet combines immense geography with distinctive cultural and
            spiritual traditions. The experience is not simply about reaching
            famous places — it is about allowing enough time to acclimatize,
            understand the landscape and travel at a pace appropriate for the
            plateau.
          </p>
        </div>

        {/* HIGHLIGHTS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 16,
          }}
        >
          {highlights.map((item) => (
            <div
              className="card"
              key={item.label}
              style={{
                padding: 26,
                minHeight: 270,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
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
                  fontSize: 24,
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

        {/* TOURS */}
        <div style={{ marginTop: 70 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: 24,
              flexWrap: "wrap",
              marginBottom: 30,
            }}
          >
            <div>
              <div
                className="eyebrow"
                style={{
                  marginBottom: 14,
                  letterSpacing: ".14em",
                }}
              >
                TIBET JOURNEYS
              </div>

              <h2
                style={{
                  fontSize: "clamp(2.3rem, 5vw, 3.6rem)",
                  margin: 0,
                }}
              >
                Choose where your journey begins.
              </h2>

              <p
                className="muted"
                style={{
                  maxWidth: 760,
                  lineHeight: 1.75,
                  marginTop: 14,
                  marginBottom: 0,
                }}
              >
                From shorter cultural journeys around Lhasa and Lhoka to Everest
                and longer expeditions toward Mount Kailash, explore different
                ways to experience Tibet.
              </p>
            </div>

            <Link className="btn alt" href="/tours">
              View all {tours.length} tours
            </Link>
          </div>

          <div className="grid">
            {tours.slice(0, 6).map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        </div>

        {/* PLANNING */}
        <div style={{ marginTop: 70 }}>
          <div
            className="eyebrow"
            style={{
              marginBottom: 16,
              letterSpacing: ".14em",
            }}
          >
            BEFORE YOU GO
          </div>

          <h2
            style={{
              fontSize: "clamp(2.3rem, 5vw, 3.6rem)",
              marginBottom: 12,
            }}
          >
            Tibet rewards better preparation.
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 850,
              lineHeight: 1.75,
              marginBottom: 30,
            }}
          >
            Altitude, distance, documentation and changing local conditions
            all affect a Tibet itinerary. Build the journey around realistic
            pacing rather than trying to fit too much into too little time.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 16,
            }}
          >
            {planning.map((item) => (
              <div
                className="card"
                key={item.number}
                style={{
                  padding: 26,
                  minHeight: 255,
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

        {/* PLANNING CTA */}
        <div
          className="card"
          style={{
            marginTop: 70,
            padding: "clamp(34px, 6vw, 60px)",
            background:
              "radial-gradient(circle at 50% 0%, rgba(109,224,194,.15), transparent 42%), linear-gradient(135deg, rgba(15,48,54,.96), rgba(7,25,32,.98))",
          }}
        >
          <div
            className="eyebrow"
            style={{ marginBottom: 15 }}
          >
            PLAN YOUR TIBET JOURNEY
          </div>

          <h2
            style={{
              fontSize: "clamp(2.3rem, 5vw, 3.8rem)",
              maxWidth: 780,
              marginBottom: 15,
              lineHeight: 1.05,
            }}
          >
            Your dates. Your interests. A better-paced journey.
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 780,
              lineHeight: 1.75,
              fontSize: 17,
            }}
          >
            Start with our AI planner, compare the available Tibet journeys
            or tell us what you want from the trip and build a private
            itinerary around your priorities.
          </p>

          <div className="actions" style={{ marginTop: 26 }}>
            <Link
              className="btn"
              href="/ai-trip-planner?prompt=Help%20me%20plan%20a%20Tibet%20journey%20with%20realistic%20altitude%20acclimatization%2C%20cultural%20experiences%20and%20thoughtful%20pacing."
            >
              Plan Tibet with AI
            </Link>

            <Link className="btn alt" href="/compare-trips">
              Compare journeys
            </Link>

            <Link
              className="btn alt"
              href="/custom-journey?destination=Tibet"
            >
              Create a private journey
            </Link>
          </div>
        </div>

        <p
          className="muted"
          style={{
            fontSize: 13,
            lineHeight: 1.6,
            marginTop: 20,
          }}
        >
          Travel documentation, permits, route access and local conditions
          can change. Current requirements should be confirmed for the
          traveler&apos;s nationality, dates and intended itinerary before
          booking or departure.
        </p>
      </div>
    </section>
  );
}

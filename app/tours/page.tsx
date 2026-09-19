import Link from "next/link";
import { tours } from "@/lib/tours";
import TourCard from "@/components/TourCard";

const journeyTypes = [
  {
    label: "CULTURE",
    title: "Lhasa & Central Tibet",
    text: "Historic cities, monasteries, cultural landmarks and a gentler introduction to the Tibetan Plateau.",
    href: "/tours/lhasa-classic",
  },
  {
    label: "HIMALAYA",
    title: "Everest",
    text: "Cross central Tibet toward the north side of Everest through high passes and immense Himalayan landscapes.",
    href: "/tours/lhasa-everest-base-camp",
  },
  {
    label: "PILGRIMAGE",
    title: "Mount Kailash",
    text: "Travel into western Tibet for sacred landscapes, pilgrimage traditions and the Mount Kailash Kora.",
    href: "/tours/kailash-kora",
  },
  {
    label: "LANDSCAPE",
    title: "Lakes & High Plateau",
    text: "Experience open plateau scenery, high-altitude lakes and the extraordinary scale of Tibet beyond its cities.",
    href: "/tours/namtso-lake",
  },
];

const chooseJourney = [
  {
    number: "01",
    label: "TIME",
    title: "How long can you travel?",
    text: "Choose from shorter Lhasa-focused journeys through to longer routes reaching Everest and western Tibet.",
  },
  {
    number: "02",
    label: "ALTITUDE",
    title: "How high do you want to go?",
    text: "Every Tibet journey involves altitude, but Everest, Kailash and remote plateau routes require especially thoughtful acclimatization.",
  },
  {
    number: "03",
    label: "INTEREST",
    title: "What draws you to Tibet?",
    text: "Build the experience around culture, Himalayan scenery, photography, pilgrimage landscapes or a combination of interests.",
  },
  {
    number: "04",
    label: "PACE",
    title: "How do you want to travel?",
    text: "A better Tibet itinerary balances important places with realistic driving days, acclimatization, rest and time to experience the plateau.",
  },
];

export default function Page() {
  return (
    <main>
      <section className="section">
        <div className="container">
          {/* HERO */}
          <div
            className="card"
            style={{
              padding: "clamp(34px, 6vw, 68px)",
              background:
                "radial-gradient(circle at 85% 10%, rgba(109,224,194,.12), transparent 28%), linear-gradient(135deg, rgba(22,42,49,.98), rgba(13,73,75,.72))",
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 22,
                letterSpacing: ".18em",
              }}
            >
              TIBET TOURS · 2026
            </div>

            <h1
              style={{
                maxWidth: 950,
                fontSize: "clamp(48px, 7vw, 82px)",
                lineHeight: 0.95,
                letterSpacing: "-0.045em",
                marginBottom: 26,
              }}
            >
              Find your way
              <br />
              across Tibet.
            </h1>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              Explore journeys through Lhasa, Gyantse, Shigatse, Everest,
              Namtso, Mount Kailash and the Tibetan Plateau — from cultural
              introductions to longer high-altitude journeys.
            </p>

            <div
              className="actions"
              style={{
                marginTop: 30,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <Link className="btn" href="/ai-trip-planner">
                Find my Tibet trip with AI
              </Link>

              <Link className="btn alt" href="/compare-trips">
                Compare Tibet journeys
              </Link>
            </div>
          </div>

          {/* INTRO */}
          <div
            style={{
              marginTop: 58,
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 34,
              alignItems: "end",
            }}
          >
            <div>
              <div
                className="eyebrow"
                style={{
                  marginBottom: 14,
                  letterSpacing: ".16em",
                }}
              >
                EXPLORE THE COLLECTION
              </div>

              <h2
                style={{
                  fontSize: "clamp(36px, 5vw, 54px)",
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                {tours.length} journeys.
                <br />
                One extraordinary plateau.
              </h2>
            </div>

            <p
              className="muted"
              style={{
                fontSize: 17,
                maxWidth: 760,
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              Choose by duration, altitude, travel style and the places you
              most want to experience. Each journey can also become the
              starting point for a private itinerary shaped around your dates
              and priorities.
            </p>
          </div>

          {/* JOURNEY TYPES */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
              marginTop: 34,
              marginBottom: 58,
            }}
          >
            {journeyTypes.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="card"
                style={{
                  padding: 24,
                  minHeight: 210,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div
                  className="eyebrow"
                  style={{
                    marginBottom: 12,
                    letterSpacing: ".14em",
                  }}
                >
                  {item.label}
                </div>

                <h3
                  style={{
                    fontSize: 24,
                    marginBottom: 10,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {item.text}
                </p>
              </Link>
            ))}
          </div>

          {/* TOUR DATABASE */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: 20,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            <div>
              <div
                className="eyebrow"
                style={{
                  marginBottom: 10,
                  letterSpacing: ".16em",
                }}
              >
                TIBET TOUR COLLECTION
              </div>

              <h2
                style={{
                  fontSize: "clamp(32px, 4vw, 46px)",
                  margin: 0,
                }}
              >
                Explore all journeys
              </h2>
            </div>

            <div className="muted">
              {tours.length} Tibet journeys
            </div>
          </div>

          <div className="grid">
            {tours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>

          {/* HOW TO CHOOSE */}
          <div style={{ marginTop: 70 }}>
            <div
              className="eyebrow"
              style={{
                marginBottom: 14,
                letterSpacing: ".16em",
              }}
            >
              CHOOSE YOUR JOURNEY
            </div>

            <h2
              style={{
                fontSize: "clamp(36px, 5vw, 52px)",
                marginBottom: 14,
              }}
            >
              Start with what matters to you.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 800,
                lineHeight: 1.8,
                marginBottom: 30,
              }}
            >
              Tibet journeys can feel very different depending on duration,
              altitude and distance. These four questions are a useful place
              to begin.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(230px, 1fr))",
                gap: 16,
              }}
            >
              {chooseJourney.map((item) => (
                <div
                  className="card"
                  key={item.number}
                  style={{
                    padding: 26,
                    minHeight: 255,
                  }}
                >
                  <div
                    className="eyebrow"
                    style={{
                      marginBottom: 14,
                    }}
                  >
                    {item.number} · {item.label}
                  </div>

                  <h3
                    style={{
                      marginBottom: 12,
                      fontSize: 22,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="muted"
                    style={{
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CUSTOM JOURNEY */}
          <div
            className="card"
            style={{
              marginTop: 70,
              padding: "clamp(32px, 5vw, 54px)",
              background:
                "radial-gradient(circle at 80% 0%, rgba(109,224,194,.12), transparent 35%), linear-gradient(135deg, rgba(19,58,61,.94), rgba(16,35,42,.98))",
            }}
          >
            <div
              className="eyebrow"
              style={{ marginBottom: 14 }}
            >
              NEED SOMETHING DIFFERENT?
            </div>

            <h2
              style={{
                fontSize: "clamp(34px, 5vw, 52px)",
                marginBottom: 14,
                maxWidth: 800,
              }}
            >
              Make Tibet fit your journey.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 800,
                lineHeight: 1.8,
                fontSize: 17,
              }}
            >
              Use the AI Trip Planner to explore possibilities, compare the
              existing Tibet journeys side by side or request a private
              itinerary around your dates, interests and preferred pace.
            </p>

            <div
              className="actions"
              style={{
                marginTop: 26,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <Link className="btn" href="/ai-trip-planner">
                Plan Tibet with AI
              </Link>

              <Link className="btn alt" href="/compare-trips">
                Compare journeys
              </Link>

              <Link
                className="btn alt"
                href="/custom-journey?destination=Tibet"
              >
                Build a private journey
              </Link>
            </div>
          </div>

          <p
            className="muted"
            style={{
              fontSize: 13,
              lineHeight: 1.65,
              marginTop: 20,
            }}
          >
            Tour prices shown on this website are starting-price planning
            estimates. Final itinerary, availability, travel documentation,
            permits, route access and price should be confirmed before
            booking.
          </p>
        </div>
      </section>
    </main>
  );
}

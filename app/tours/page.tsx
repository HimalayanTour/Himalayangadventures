import Link from "next/link";
import { tours } from "@/lib/tours";
import TourCard from "@/components/TourCard";

export default function Page() {
  return (
    <main>
      <section className="section">
        <div className="container">
          {/* HERO */}
          <div
            className="card"
            style={{
              padding: "clamp(34px, 5vw, 64px)",
              background:
                "linear-gradient(135deg, rgba(22,42,49,.96), rgba(13,73,75,.72))",
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 22,
                letterSpacing: ".18em",
              }}
            >
              HIMALAYAN JOURNEYS · 2026
            </div>

            <h1
              style={{
                maxWidth: 900,
                fontSize: "clamp(46px, 7vw, 76px)",
                lineHeight: 0.98,
                marginBottom: 24,
              }}
            >
              Find your way
              <br />
              into the Himalaya.
            </h1>

            <p
              className="muted"
              style={{
                maxWidth: 820,
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              Explore carefully selected journeys across Nepal, Bhutan, Tibet
              and the Indian Himalaya — from classic trekking routes to remote
              mountain circuits and culturally focused adventures.
            </p>

            <div
              className="actions"
              style={{
                marginTop: 28,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <Link className="btn" href="/ai-trip-planner">
                Find my trip with AI
              </Link>

              <Link className="btn alt" href="/compare-trips">
                Compare journeys
              </Link>
            </div>
          </div>

          {/* INTRO */}
          <div style={{ marginTop: 52 }}>
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
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              Nine journeys. Four Himalayan regions.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                lineHeight: 1.8,
              }}
            >
              Choose by destination, duration, difficulty and travel style.
              Every journey can also become the starting point for a private
              itinerary built around your dates and priorities.
            </p>
          </div>

          {/* QUICK DESTINATIONS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 14,
              marginTop: 28,
              marginBottom: 42,
            }}
          >
            <Link
              href="/nepal"
              className="card"
              style={{
                padding: 20,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="eyebrow" style={{ marginBottom: 8 }}>
                NEPAL
              </div>
              <strong>Everest, Annapurna, Langtang, Manaslu & Mustang</strong>
            </Link>

            <Link
              href="/bhutan"
              className="card"
              style={{
                padding: 20,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="eyebrow" style={{ marginBottom: 8 }}>
                BHUTAN
              </div>
              <strong>Mountains, culture & thoughtful travel</strong>
            </Link>

            <Link
              href="/tibet"
              className="card"
              style={{
                padding: 20,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="eyebrow" style={{ marginBottom: 8 }}>
                TIBET
              </div>
              <strong>High plateau & spiritual landscapes</strong>
            </Link>

            <Link
              href="/india-himalaya"
              className="card"
              style={{
                padding: 20,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="eyebrow" style={{ marginBottom: 8 }}>
                INDIA
              </div>
              <strong>Ladakh & the Indian Himalaya</strong>
            </Link>
          </div>

          {/* TOUR DATABASE */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: 20,
              flexWrap: "wrap",
              marginBottom: 22,
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
                TOUR COLLECTION
              </div>

              <h2
                style={{
                  fontSize: "clamp(30px, 4vw, 42px)",
                  margin: 0,
                }}
              >
                Explore all journeys
              </h2>
            </div>

            <div className="muted">
              {tours.length} journeys available
            </div>
          </div>

          <div className="grid">
            {tours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>

          {/* HOW TO CHOOSE */}
          <div style={{ marginTop: 60 }}>
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
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 28,
              }}
            >
              Start with what matters to you.
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(230px, 1fr))",
                gap: 16,
              }}
            >
              <div className="card" style={{ padding: 24 }}>
                <div className="eyebrow" style={{ marginBottom: 12 }}>
                  01 · TIME
                </div>

                <h3 style={{ marginBottom: 10 }}>How long can you travel?</h3>

                <p className="muted" style={{ lineHeight: 1.75 }}>
                  Compare shorter Himalayan journeys with longer circuits and
                  high-altitude adventures.
                </p>
              </div>

              <div className="card" style={{ padding: 24 }}>
                <div className="eyebrow" style={{ marginBottom: 12 }}>
                  02 · CHALLENGE
                </div>

                <h3 style={{ marginBottom: 10 }}>
                  What level feels right?
                </h3>

                <p className="muted" style={{ lineHeight: 1.75 }}>
                  Consider walking days, altitude, terrain and the overall
                  physical demands of each journey.
                </p>
              </div>

              <div className="card" style={{ padding: 24 }}>
                <div className="eyebrow" style={{ marginBottom: 12 }}>
                  03 · EXPERIENCE
                </div>

                <h3 style={{ marginBottom: 10 }}>
                  What do you want to feel?
                </h3>

                <p className="muted" style={{ lineHeight: 1.75 }}>
                  Choose between classic trekking, remote landscapes, cultural
                  depth, photography, spirituality or a mixture of experiences.
                </p>
              </div>

              <div className="card" style={{ padding: 24 }}>
                <div className="eyebrow" style={{ marginBottom: 12 }}>
                  04 · PACE
                </div>

                <h3 style={{ marginBottom: 10 }}>
                  How do you want to travel?
                </h3>

                <p className="muted" style={{ lineHeight: 1.75 }}>
                  A good itinerary balances ambition with acclimatization,
                  recovery time and space to experience the destination.
                </p>
              </div>
            </div>
          </div>

          {/* AI CTA */}
          <div
            className="card"
            style={{
              marginTop: 60,
              padding: "clamp(30px, 5vw, 50px)",
              background:
                "linear-gradient(135deg, rgba(19,58,61,.9), rgba(16,35,42,.96))",
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              NOT SURE WHICH ONE?
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              Tell us how you want to travel.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 780,
                lineHeight: 1.8,
              }}
            >
              Use the AI Trip Planner to turn your dates, interests, preferred
              difficulty and travel style into a clearer Himalayan journey.
              You can also compare existing trips side by side or request a
              custom itinerary.
            </p>

            <div
              className="actions"
              style={{
                marginTop: 24,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <Link className="btn" href="/ai-trip-planner">
                Ask the AI planner
              </Link>

              <Link className="btn alt" href="/compare-trips">
                Compare trips
              </Link>

              <Link className="btn alt" href="/custom-journey">
                Build a custom journey
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

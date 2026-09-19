import Link from "next/link";
import BookingForm from "@/components/BookingForm";

const steps = [
  {
    number: "01",
    title: "Tell us about your Tibet journey",
    text:
      "Share your approximate dates, group size, travel style and the places or experiences in Tibet that interest you.",
  },
  {
    number: "02",
    title: "We review your request",
    text:
      "Your details give us a starting point for understanding your preferred pace, interests and journey priorities.",
  },
  {
    number: "03",
    title: "Shape the itinerary",
    text:
      "The journey can then be developed around route, pacing, altitude, accommodation and the practical requirements for your travel dates.",
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
              padding: "clamp(34px, 5vw, 64px)",
              background:
                "radial-gradient(circle at 85% 15%, rgba(93,229,201,.12), transparent 28%), linear-gradient(135deg, rgba(22,42,49,.96), rgba(13,73,75,.72))",
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 22,
                letterSpacing: ".18em",
              }}
            >
              PLAN YOUR TIBET JOURNEY
            </div>

            <h1
              style={{
                maxWidth: 900,
                fontSize:
                  "clamp(46px, 7vw, 76px)",
                lineHeight: 0.98,
                marginBottom: 24,
              }}
            >
              Your Tibet journey
              <br />
              starts here.
            </h1>

            <p
              className="muted"
              style={{
                maxWidth: 830,
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              Tell us when you hope to travel, how many
              people are traveling and what you want to
              experience in Tibet. Your request becomes
              the starting point for shaping a private
              journey around your priorities.
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
              <a
                className="btn"
                href="#booking-request"
              >
                Start my Tibet request
              </a>

              <Link
                className="btn alt"
                href="/tours"
              >
                Explore Tibet tours first
              </Link>
            </div>
          </div>

          {/* HOW IT WORKS */}
          <div style={{ marginTop: 54 }}>
            <div
              className="eyebrow"
              style={{
                marginBottom: 14,
                letterSpacing: ".16em",
              }}
            >
              HOW IT WORKS
            </div>

            <h2
              style={{
                fontSize:
                  "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              Start with a few useful details.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 820,
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              You do not need to have your complete Tibet
              itinerary decided. Give us what you know now
              and tell us what kind of experience you want.
              The details can be refined as the journey
              develops.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 16,
              }}
            >
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="card"
                  style={{ padding: 24 }}
                >
                  <div
                    className="eyebrow"
                    style={{
                      marginBottom: 14,
                      letterSpacing: ".14em",
                    }}
                  >
                    STEP {step.number}
                  </div>

                  <h3
                    style={{
                      marginBottom: 12,
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="muted"
                    style={{
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* BOOKING FORM */}
          <div
            id="booking-request"
            style={{
              marginTop: 64,
              scrollMarginTop: 110,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 28,
                alignItems: "start",
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
                  TIBET TRIP REQUEST
                </div>

                <h2
                  style={{
                    fontSize:
                      "clamp(32px, 4vw, 46px)",
                    lineHeight: 1.08,
                    marginBottom: 18,
                  }}
                >
                  Tell us how you want to experience Tibet.
                </h2>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.8,
                    marginBottom: 26,
                  }}
                >
                  Complete the form with as much
                  information as you currently have. Your
                  dates can be approximate and your final
                  Tibet itinerary does not need to be
                  decided yet.
                </p>

                <div
                  className="card"
                  style={{
                    padding: 22,
                    marginBottom: 14,
                  }}
                >
                  <div
                    className="eyebrow"
                    style={{
                      marginBottom: 9,
                    }}
                  >
                    GOOD TO INCLUDE
                  </div>

                  <p
                    className="muted"
                    style={{
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    Your approximate dates, number of
                    travelers, preferred accommodation,
                    travel style and the Tibet experiences
                    that matter most to you—such as Lhasa,
                    Everest, Namtso, Mount Kailash,
                    monasteries, culture or photography.
                  </p>
                </div>

                <div
                  className="card"
                  style={{ padding: 22 }}
                >
                  <div
                    className="eyebrow"
                    style={{
                      marginBottom: 9,
                    }}
                  >
                    NOT SURE WHICH ROUTE?
                  </div>

                  <p
                    className="muted"
                    style={{
                      lineHeight: 1.75,
                      marginBottom: 16,
                    }}
                  >
                    Use the Tibet AI Trip Planner first if
                    you want help turning a general idea
                    into a clearer journey concept.
                  </p>

                  <Link
                    className="btn alt"
                    href="/ai-trip-planner"
                  >
                    Plan Tibet with AI
                  </Link>
                </div>
              </div>

              <div
                className="card"
                style={{
                  padding:
                    "clamp(20px, 3vw, 30px)",
                }}
              >
                <BookingForm />
              </div>
            </div>
          </div>

          {/* PLANNING NOTE */}
          <div
            className="card"
            style={{
              marginTop: 54,
              padding:
                "clamp(26px, 4vw, 38px)",
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 12,
              }}
            >
              BEFORE BOOKING
            </div>

            <h2
              style={{
                marginBottom: 14,
              }}
            >
              Tibet travel requires current information.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 860,
                lineHeight: 1.8,
                marginBottom: 22,
              }}
            >
              Travel documentation, permits, route access,
              transportation arrangements, weather and
              local conditions can change. Important
              requirements should be confirmed for your
              nationality, travel dates and intended route
              before final arrangements are made.
            </p>

            <div
              className="actions"
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <Link
                className="btn alt"
                href="/weather-conditions"
              >
                Tibet conditions
              </Link>

              <Link
                className="btn alt"
                href="/tibet"
              >
                Explore Tibet
              </Link>

              <Link
                className="btn alt"
                href="/ai-research"
              >
                AI research
              </Link>
            </div>
          </div>

          {/* FINAL CTA */}
          <div
            className="card"
            style={{
              marginTop: 54,
              padding:
                "clamp(30px, 5vw, 50px)",
              background:
                "linear-gradient(135deg, rgba(19,58,61,.9), rgba(16,35,42,.96))",
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 14,
              }}
            >
              STILL EXPLORING?
            </div>

            <h2
              style={{
                fontSize:
                  "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              Find your way across Tibet.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 780,
                lineHeight: 1.8,
              }}
            >
              Explore the Tibet journey collection,
              compare two routes side by side or build a
              private journey before sending your request.
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
              <Link
                className="btn"
                href="/tours"
              >
                Explore Tibet tours
              </Link>

              <Link
                className="btn alt"
                href="/compare-trips"
              >
                Compare journeys
              </Link>

              <Link
                className="btn alt"
                href="/custom-journey"
              >
                Build a private journey
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import BookingForm from "@/components/BookingForm";

const steps = [
  {
    number: "01",
    title: "Tell us about your journey",
    text: "Share your destination, dates, group size, preferred travel style and anything important to you.",
  },
  {
    number: "02",
    title: "We review your request",
    text: "Your information gives us a clearer starting point for understanding the journey you want to build.",
  },
  {
    number: "03",
    title: "Shape the itinerary",
    text: "Your request can be developed around pace, accommodation, interests and the practical requirements of the destination.",
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
              CONTACT &amp; BOOK
            </div>

            <h1
              style={{
                maxWidth: 900,
                fontSize: "clamp(46px, 7vw, 76px)",
                lineHeight: 0.98,
                marginBottom: 24,
              }}
            >
              Your Himalayan journey
              <br />
              starts here.
            </h1>

            <p
              className="muted"
              style={{
                maxWidth: 820,
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              Tell us where you want to go, when you want to travel and what
              matters most to you. Your request becomes the starting point for
              planning a Himalayan journey around your priorities.
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
              <a className="btn" href="#booking-request">
                Start my request
              </a>

              <Link className="btn alt" href="/tours">
                Explore tours first
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
                fontSize: "clamp(32px, 4vw, 46px)",
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
              You do not need to have every part of your trip decided. Give us
              what you know now and use the request form to explain the kind of
              experience you are looking for.
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

                  <h3 style={{ marginBottom: 12 }}>{step.title}</h3>

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
                  "minmax(260px, .75fr) minmax(0, 1.25fr)",
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
                  TRIP REQUEST
                </div>

                <h2
                  style={{
                    fontSize: "clamp(32px, 4vw, 46px)",
                    lineHeight: 1.08,
                    marginBottom: 18,
                  }}
                >
                  Tell us about your Himalaya.
                </h2>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.8,
                    marginBottom: 26,
                  }}
                >
                  Complete the form with as much information as you currently
                  have. Your dates can be approximate and your itinerary does
                  not need to be finalized.
                </p>

                <div
                  className="card"
                  style={{
                    padding: 22,
                    marginBottom: 14,
                  }}
                >
                  <div className="eyebrow" style={{ marginBottom: 9 }}>
                    GOOD TO INCLUDE
                  </div>

                  <p
                    className="muted"
                    style={{
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    Your preferred destination, approximate dates, number of
                    travelers, accommodation preference and the type of
                    experience you want.
                  </p>
                </div>

                <div className="card" style={{ padding: 22 }}>
                  <div className="eyebrow" style={{ marginBottom: 9 }}>
                    NOT SURE YET?
                  </div>

                  <p
                    className="muted"
                    style={{
                      lineHeight: 1.75,
                      marginBottom: 16,
                    }}
                  >
                    Use the AI Trip Planner first if you want help comparing
                    destinations or turning a general idea into a clearer plan.
                  </p>

                  <Link className="btn alt" href="/ai-trip-planner">
                    Ask the AI planner
                  </Link>
                </div>
              </div>

              <div className="card" style={{ padding: "clamp(20px, 3vw, 30px)" }}>
                <BookingForm />
              </div>
            </div>
          </div>

          {/* PLANNING NOTE */}
          <div
            className="card"
            style={{
              marginTop: 54,
              padding: "clamp(26px, 4vw, 38px)",
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 12 }}>
              BEFORE BOOKING
            </div>

            <h2 style={{ marginBottom: 14 }}>
              Mountain travel requires current information.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                lineHeight: 1.8,
                marginBottom: 22,
              }}
            >
              Routes, permits, entry requirements, weather and local conditions
              can change. Important details should be confirmed using current
              official information and appropriate local guidance before final
              travel arrangements are made.
            </p>

            <div
              className="actions"
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <Link className="btn alt" href="/safety-conditions">
                Safety &amp; conditions
              </Link>

              <Link className="btn alt" href="/himalayan-guide">
                Himalayan guide
              </Link>
            </div>
          </div>

          {/* FINAL CTA */}
          <div
            className="card"
            style={{
              marginTop: 54,
              padding: "clamp(30px, 5vw, 50px)",
              background:
                "linear-gradient(135deg, rgba(19,58,61,.9), rgba(16,35,42,.96))",
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              STILL EXPLORING?
            </div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 46px)",
                marginBottom: 14,
              }}
            >
              Find the journey that fits you.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 760,
                lineHeight: 1.8,
              }}
            >
              Explore the tour collection, compare journeys side by side or
              build a private itinerary before sending your request.
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
              <Link className="btn" href="/tours">
                Explore tours
              </Link>

              <Link className="btn alt" href="/compare-trips">
                Compare trips
              </Link>

              <Link className="btn alt" href="/custom-journey">
                Custom journey
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

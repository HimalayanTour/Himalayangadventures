import Link from "next/link";

const photographyJourneys = [
  {
    region: "TIBET",
    title: "Tibet Photography Journey",
    focus: "PHOTOGRAPHY FOCUS",
    text:
      "A Tibet journey designed around landscape, architecture, cultural context and more time to observe changing light across the plateau.",
    href: "/tours/tibet-photography",
  },
  {
    region: "EVEREST · TIBET",
    title: "Lhasa to Everest Base Camp",
    focus: "MOUNTAIN LANDSCAPES",
    text:
      "Travel from Lhasa toward Everest through expansive plateau scenery, Himalayan horizons and dramatic high-altitude landscapes.",
    href: "/tours/lhasa-everest-base-camp",
  },
  {
    region: "HIGH PLATEAU",
    title: "Tibet High Plateau",
    focus: "LANDSCAPE",
    text:
      "Explore wide plateau landscapes, distant mountain ranges and changing high-altitude conditions with a slower visual approach.",
    href: "/tours/tibet-high-plateau",
  },
  {
    region: "NAMTSO · TIBET",
    title: "Lhasa & Namtso Lake",
    focus: "LAKE & PLATEAU",
    text:
      "Combine Lhasa with the open landscapes around Namtso, where water, sky, mountains and changing light create a distinctive visual environment.",
    href: "/tours/namtso-lake",
  },
];

const photoPriorities = [
  {
    number: "01",
    title: "Light before schedule",
    text:
      "Photography-focused itineraries need room for early starts, evening light and waiting when conditions matter more than covering distance quickly.",
  },
  {
    number: "02",
    title: "Place with context",
    text:
      "Strong travel photography comes from understanding the landscape, architecture, culture and meaning of a place rather than simply reaching a viewpoint.",
  },
  {
    number: "03",
    title: "Weather flexibility",
    text:
      "Cloud, wind, visibility and light can change across the plateau. Flexible planning gives photographers more options when conditions shift.",
  },
  {
    number: "04",
    title: "Respectful photography",
    text:
      "Ask before photographing people where appropriate and follow local guidance at monasteries, ceremonies, sacred places and other sensitive locations.",
  },
];

const packingNotes = [
  "Bring camera equipment you can comfortably manage at altitude.",
  "Carry spare batteries and keep them protected from cold conditions.",
  "Use practical weather and dust protection for cameras and lenses.",
  "Choose a useful lens combination rather than carrying unnecessary equipment.",
  "Keep memory cards, batteries and essential accessories easily accessible.",
  "Plan for strong sunlight, wind and dry high-altitude conditions.",
];

export default function PhotographyToursPage() {
  return (
    <main
      className="container"
      style={{
        paddingTop: 54,
        paddingBottom: 90,
      }}
    >
      {/* HERO */}

      <section
        className="card"
        style={{
          padding: "clamp(28px, 5vw, 56px)",
          marginBottom: 38,
          background:
            "radial-gradient(circle at 85% 15%, rgba(109,224,194,.12), transparent 30%), linear-gradient(145deg, rgba(18,48,55,.96), rgba(8,28,35,.98))",
        }}
      >
        <span className="pill">
          TIBET PHOTOGRAPHY · 2026
        </span>

        <h1
          style={{
            marginTop: 18,
            marginBottom: 18,
            fontSize: "clamp(42px, 7vw, 76px)",
            lineHeight: 1,
            maxWidth: 980,
          }}
        >
          Follow the light
          <br />
          across Tibet.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 850,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Experience Tibet with more time for landscape,
          architecture, cultural context and changing
          light—instead of rushing from one destination
          to the next.
        </p>

        <div
          className="actions"
          style={{ marginTop: 28 }}
        >
          <Link
            className="btn"
            href="/tours/tibet-photography"
          >
            View photography journey
          </Link>

          <Link
            className="btn alt"
            href="/custom-journey"
          >
            Build private photo journey
          </Link>
        </div>
      </section>

      {/* JOURNEYS */}

      <section>
        <span className="pill">
          PHOTOGRAPHIC TIBET
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 42px)",
          }}
        >
          Different landscapes. Different visual stories.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 800,
            lineHeight: 1.7,
          }}
        >
          Start with our dedicated Tibet Photography
          Journey or explore other Tibet routes that can
          provide strong landscape and cultural
          photography opportunities.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
            marginTop: 24,
          }}
        >
          {photographyJourneys.map((journey) => (
            <article
              className="card"
              key={journey.title}
              style={{
                padding: 26,
                display: "flex",
                flexDirection: "column",
                minHeight: 340,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <span className="pill">
                  {journey.region}
                </span>

                <SmallTag text={journey.focus} />
              </div>

              <h3
                style={{
                  marginTop: 22,
                  marginBottom: 12,
                  fontSize: 27,
                  lineHeight: 1.2,
                }}
              >
                {journey.title}
              </h3>

              <p
                className="muted"
                style={{
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {journey.text}
              </p>

              <Link
                className="btn alt"
                href={journey.href}
                style={{
                  alignSelf: "flex-start",
                  marginTop: 12,
                }}
              >
                View journey
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* PHOTOGRAPHER PRIORITIES */}

      <section
        className="card"
        style={{
          marginTop: 38,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          BUILT FOR PHOTOGRAPHERS
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          The best photograph may not happen on schedule
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 800,
            lineHeight: 1.7,
          }}
        >
          Photography travel works differently from a
          standard sightseeing itinerary. Time,
          observation, patience and flexibility become
          part of the journey design.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 16,
            marginTop: 24,
          }}
        >
          {photoPriorities.map((item) => (
            <div
              key={item.number}
              style={{
                padding: 22,
                borderRadius: 18,
                border:
                  "1px solid rgba(255,255,255,0.10)",
                background:
                  "rgba(255,255,255,0.03)",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  opacity: 0.6,
                }}
              >
                PRIORITY {item.number}
              </span>

              <h3
                style={{
                  marginTop: 14,
                  marginBottom: 10,
                  fontSize: 21,
                }}
              >
                {item.title}
              </h3>

              <p
                className="muted"
                style={{
                  lineHeight: 1.7,
                  marginBottom: 0,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CAMERA + CONDITIONS */}

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 18,
          marginTop: 24,
        }}
      >
        <div
          className="card"
          style={{ padding: 28 }}
        >
          <span className="pill">
            CAMERA PREPARATION
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Pack for the plateau
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.7 }}
          >
            Photography equipment should remain practical
            when altitude, wind, temperature and daily
            travel become part of the Tibet journey.
          </p>

          <div
            style={{
              display: "grid",
              gap: 13,
              marginTop: 20,
            }}
          >
            {packingNotes.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  gap: 11,
                  alignItems: "flex-start",
                }}
              >
                <strong aria-hidden="true">
                  ✓
                </strong>

                <span
                  className="muted"
                  style={{
                    lineHeight: 1.55,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          <Link
            className="btn alt"
            href="/himalayan-guide"
            style={{ marginTop: 24 }}
          >
            Read Tibet Travel Guide
          </Link>
        </div>

        <div
          className="card"
          style={{ padding: 28 }}
        >
          <span className="pill">
            LIGHT &amp; WEATHER
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Watch the conditions
          </h2>

          <p
            className="muted"
            style={{
              lineHeight: 1.75,
            }}
          >
            Weather affects visibility, light,
            temperature and travel conditions. Use
            current forecasts as one planning input and
            remain flexible when conditions change.
          </p>

          <Link
            className="btn"
            href="/weather-conditions"
          >
            Check Tibet conditions
          </Link>
        </div>
      </section>

      {/* SUBJECTS */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          WHAT DO YOU WANT TO PHOTOGRAPH?
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 12,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Build the route around your visual priorities.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 880,
            lineHeight: 1.75,
          }}
        >
          Your ideal Tibet photography journey may focus
          on broad plateau landscapes, Himalayan
          mountains, monasteries and architecture,
          cultural context, sacred places or a combination
          of subjects. A private journey can give those
          priorities more room in the itinerary.
        </p>

        <div
          className="actions"
          style={{ marginTop: 22 }}
        >
          <Link
            className="btn"
            href="/custom-journey"
          >
            Build my photography journey
          </Link>

          <Link
            className="btn alt"
            href="/ai-trip-planner"
          >
            Plan Tibet with AI
          </Link>
        </div>
      </section>

      {/* RESPECT */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          PHOTOGRAPH WITH RESPECT
        </span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          People are not scenery
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          Ask before photographing people where
          appropriate, respect requests not to be
          photographed and follow local guidance at
          monasteries, ceremonies and sacred places.
          Photography restrictions may vary by location.
          A meaningful image should not come at the
          expense of the people or places being visited.
        </p>

        <Link
          className="btn alt"
          href="/responsible-travel"
          style={{ marginTop: 18 }}
        >
          Responsible Tibet travel
        </Link>
      </section>

      {/* CURRENT INFORMATION */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          BEFORE YOU GO
        </span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Keep the photography plan flexible.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          Travel documentation, permits, route access,
          photography restrictions, weather and local
          operating conditions can change. Confirm
          current information for your travel dates and
          intended route before final arrangements are
          made.
        </p>

        <div
          className="actions"
          style={{ marginTop: 22 }}
        >
          <Link
            className="btn alt"
            href="/ai-research"
          >
            Research current information
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(28px, 5vw, 46px)",
          textAlign: "center",
          background:
            "linear-gradient(135deg, rgba(19,58,61,.9), rgba(16,35,42,.96))",
        }}
      >
        <span className="pill">
          YOUR TIBET PHOTOGRAPHY JOURNEY
        </span>

        <h2
          style={{
            marginTop: 16,
            marginBottom: 12,
            fontSize: "clamp(30px, 5vw, 46px)",
          }}
        >
          Build the journey around what you want to
          capture.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Tell us whether your priority is landscapes,
          architecture, culture, sacred places, Himalayan
          scenery or a combination, then use that as the
          starting point for your Tibet journey.
        </p>

        <div
          className="actions"
          style={{
            justifyContent: "center",
            marginTop: 26,
          }}
        >
          <Link
            className="btn"
            href="/tours/tibet-photography"
          >
            View Tibet Photography Journey
          </Link>

          <Link
            className="btn alt"
            href="/contact-book"
          >
            Request a Tibet trip
          </Link>
        </div>
      </section>
    </main>
  );
}

function SmallTag({
  text,
}: {
  text: string;
}) {
  return (
    <span
      style={{
        padding: "7px 10px",
        borderRadius: 999,
        border:
          "1px solid rgba(255,255,255,0.10)",
        background:
          "rgba(255,255,255,0.04)",
        fontSize: 13,
      }}
    >
      {text}
    </span>
  );
}

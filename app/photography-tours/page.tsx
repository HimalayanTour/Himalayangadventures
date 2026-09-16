import Link from "next/link";

const photographyJourneys = [
  {
    region: "NEPAL",
    title: "Everest Base Camp",
    focus: "MOUNTAIN LANDSCAPES",
    text: "Photograph dramatic Himalayan terrain, Sherpa settlements, monasteries and changing light along the Everest trail.",
    href: "/tours/everest-base-camp",
  },
  {
    region: "NEPAL",
    title: "Upper Mustang",
    focus: "CULTURE & LANDSCAPE",
    text: "High-desert landscapes, traditional settlements, monasteries and distinctive architecture create a very different Himalayan visual story.",
    href: "/tours/upper-mustang",
  },
  {
    region: "BHUTAN",
    title: "Bhutan Mountain & Culture",
    focus: "CULTURAL PHOTOGRAPHY",
    text: "Combine mountain scenery with monasteries, traditional architecture and carefully approached cultural photography.",
    href: "/tours/bhutan-mountain-culture",
  },
  {
    region: "TIBET",
    title: "Tibet High Plateau",
    focus: "HIGH PLATEAU",
    text: "Explore expansive plateau landscapes, historic places and high-altitude environments with time to observe changing conditions.",
    href: "/tours/tibet-high-plateau",
  },
];

const photoPriorities = [
  {
    number: "01",
    title: "Light before schedule",
    text: "Photography-focused itineraries need room for early starts, evening light and waiting when conditions are more important than covering distance quickly.",
  },
  {
    number: "02",
    title: "Location with context",
    text: "The strongest images often come from understanding a place, its landscape and its people rather than simply reaching a viewpoint.",
  },
  {
    number: "03",
    title: "Weather flexibility",
    text: "Cloud, snow, wind and visibility can change rapidly. Flexible planning gives photographers more options when mountain conditions shift.",
  },
  {
    number: "04",
    title: "Respectful photography",
    text: "Ask before photographing people, ceremonies or sensitive places, and follow local guidance where photography is restricted.",
  },
];

const packingNotes = [
  "Bring equipment you can comfortably carry at altitude.",
  "Protect batteries from cold temperatures.",
  "Carry weather protection for cameras and lenses.",
  "Use a practical lens selection rather than excessive equipment.",
  "Keep spare batteries and memory cards accessible.",
  "Consider dust protection in dry high-altitude regions.",
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
      <section
        className="card"
        style={{
          padding: "clamp(28px, 5vw, 56px)",
          marginBottom: 38,
        }}
      >
        <span className="pill">PHOTOGRAPHY TOURS</span>

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
          across the Himalaya.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 840,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Build a Himalayan journey with more time for
          landscapes, villages, mountain culture and
          changing light — instead of rushing from one
          destination to the next.
        </p>

        <div className="actions" style={{ marginTop: 28 }}>
          <Link className="btn" href="/custom-journey">
            Build a photography journey
          </Link>

          <Link className="btn alt" href="/ai-trip-planner">
            Plan with AI
          </Link>
        </div>
      </section>

      <section>
        <span className="pill">PHOTOGRAPHIC JOURNEYS</span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 42px)",
          }}
        >
          Different landscapes. Different stories.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 800,
            lineHeight: 1.7,
          }}
        >
          Start with an existing Himalayan route and
          adapt the pace around the subjects and
          photography opportunities that matter to you.
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
                <span className="pill">{journey.region}</span>
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

      <section
        className="card"
        style={{
          marginTop: 38,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">BUILT FOR PHOTOGRAPHERS</span>

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
          patience and flexibility become part of the
          route design.
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
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.03)",
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

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 18,
          marginTop: 24,
        }}
      >
        <div className="card" style={{ padding: 28 }}>
          <span className="pill">CAMERA PREPARATION</span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Pack for the environment
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.7 }}
          >
            Mountain photography equipment needs to
            remain practical when temperatures,
            altitude and daily movement become part of
            the journey.
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
                <strong aria-hidden="true">✓</strong>

                <span
                  className="muted"
                  style={{ lineHeight: 1.55 }}
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
            Read Himalayan Guide
          </Link>
        </div>

        <div className="card" style={{ padding: 28 }}>
          <span className="pill">LIGHT & WEATHER</span>

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
            style={{ lineHeight: 1.75 }}
          >
            Mountain weather affects visibility,
            light, temperature and access. Use current
            forecasts as one planning input and remain
            flexible when conditions change.
          </p>

          <Link className="btn" href="/weather-conditions">
            Check live weather
          </Link>
        </div>
      </section>

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">PHOTOGRAPH WITH RESPECT</span>

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
          Ask permission before photographing people
          where appropriate, respect requests not to
          be photographed, and follow local rules at
          monasteries, ceremonies and sacred places.
          A meaningful photograph should not come at
          the expense of the people or communities
          being visited.
        </p>

        <Link
          className="btn alt"
          href="/responsible-travel"
          style={{ marginTop: 18 }}
        >
          Read Responsible Travel
        </Link>
      </section>

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(28px, 5vw, 46px)",
          textAlign: "center",
        }}
      >
        <span className="pill">YOUR PHOTOGRAPHY JOURNEY</span>

        <h2
          style={{
            marginTop: 16,
            marginBottom: 12,
            fontSize: "clamp(30px, 5vw, 46px)",
          }}
        >
          Build the itinerary around what you want to capture.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 750,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Tell us whether your priority is landscapes,
          culture, villages, mountain portraits or a
          combination, and use that as the starting
          point for a private journey.
        </p>

        <div
          className="actions"
          style={{
            justifyContent: "center",
            marginTop: 26,
          }}
        >
          <Link className="btn" href="/custom-journey">
            Build photography journey
          </Link>

          <Link className="btn alt" href="/contact-book">
            Request a trip
          </Link>
        </div>
      </section>
    </main>
  );
}

function SmallTag({ text }: { text: string }) {
  return (
    <span
      style={{
        padding: "7px 10px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.04)",
        fontSize: 13,
      }}
    >
      {text}
    </span>
  );
}

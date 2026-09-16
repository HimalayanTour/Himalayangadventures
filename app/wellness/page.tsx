import Link from "next/link";

const wellnessPrinciples = [
  {
    number: "01",
    title: "Slower pacing",
    text: "Build in quieter mornings, shorter travel days and enough time to experience a place without turning every day into a checklist.",
  },
  {
    number: "02",
    title: "Nature & space",
    text: "Choose landscapes and stays that create time outdoors, mountain views, peaceful surroundings and room away from busy itineraries.",
  },
  {
    number: "03",
    title: "Mindful movement",
    text: "Yoga, walking and gentle outdoor activity can be included where appropriate, while keeping altitude and individual ability in mind.",
  },
  {
    number: "04",
    title: "Rest matters",
    text: "Rest days are valuable in Himalayan travel. They can support acclimatization, recovery and a more enjoyable overall journey.",
  },
];

const journeyIdeas = [
  {
    region: "BHUTAN",
    title: "Bhutan Mountain & Culture",
    days: "9 days",
    style: "CULTURE + NATURE",
    text: "A thoughtful combination of mountain scenery, monasteries, cultural experiences and a pace that can be adapted for quieter travel.",
    href: "/tours/bhutan-mountain-culture",
  },
  {
    region: "NEPAL",
    title: "Annapurna Classic",
    days: "10 days",
    style: "MOUNTAIN WALKING",
    text: "A Himalayan trekking journey that can inspire a slower itinerary with mountain landscapes, villages and carefully planned rest.",
    href: "/tours/annapurna-classic",
  },
  {
    region: "PRIVATE",
    title: "Restorative Himalayan Journey",
    days: "YOUR DATES",
    style: "CUSTOM",
    text: "Build a private journey around nature, comfortable stays, gentle activity, cultural experiences and the amount of downtime you prefer.",
    href: "/custom-journey",
  },
];

const planningNotes = [
  "Choose a realistic pace for altitude and terrain.",
  "Include rest and acclimatization where needed.",
  "Tell us how active or relaxed you want the journey to feel.",
  "Choose accommodation preferences before building the route.",
  "Leave flexibility for changing mountain conditions.",
  "Balance structured experiences with unplanned time.",
];

export default function WellnessPage() {
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
        <span className="pill">WELLNESS HIMALAYA</span>

        <h1
          style={{
            marginTop: 18,
            marginBottom: 18,
            fontSize: "clamp(42px, 7vw, 76px)",
            lineHeight: 1,
            maxWidth: 980,
          }}
        >
          Slow down.
          <br />
          Make space for the mountains.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 850,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Restorative Himalayan travel built around
          thoughtful pacing, nature, comfortable stays
          and time to experience a destination without
          rushing through it.
        </p>

        <div className="actions" style={{ marginTop: 28 }}>
          <Link className="btn" href="/custom-journey">
            Build a wellness journey
          </Link>

          <Link className="btn alt" href="/ai-trip-planner">
            Plan with AI
          </Link>
        </div>
      </section>

      <section>
        <span className="pill">TRAVEL WITH SPACE</span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 42px)",
          }}
        >
          Wellness starts with the way you travel
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            lineHeight: 1.7,
          }}
        >
          A wellness-focused Himalayan journey does not
          need to be a retreat. It can simply mean a
          better rhythm: sensible days, meaningful
          experiences, time outdoors and enough room to
          rest.
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
          {wellnessPrinciples.map((item) => (
            <article
              className="card"
              key={item.number}
              style={{ padding: 24 }}
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
                  fontSize: 22,
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
            </article>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <span className="pill">JOURNEY IDEAS</span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Start with a journey that has room to breathe
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 800,
            lineHeight: 1.7,
          }}
        >
          These existing journeys can be starting
          points. A private itinerary can then be
          adjusted around your preferred pace,
          accommodation and activity level.
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
          {journeyIdeas.map((journey) => (
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
              <span
                className="pill"
                style={{ alignSelf: "flex-start" }}
              >
                {journey.region}
              </span>

              <h3
                style={{
                  marginTop: 20,
                  marginBottom: 12,
                  fontSize: 27,
                  lineHeight: 1.2,
                }}
              >
                {journey.title}
              </h3>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 18,
                }}
              >
                <SmallTag text={journey.days} />
                <SmallTag text={journey.style} />
              </div>

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
                Explore journey
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 18,
          marginTop: 38,
        }}
      >
        <div className="card" style={{ padding: 28 }}>
          <span className="pill">PLAN YOUR RHYTHM</span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Tell us what restorative travel means to you
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.7 }}
          >
            Some travelers want gentle walks and quiet
            stays. Others want challenging days balanced
            by better recovery. Your preferred rhythm
            should shape the itinerary.
          </p>

          <div
            style={{
              display: "grid",
              gap: 13,
              marginTop: 20,
            }}
          >
            {planningNotes.map((item) => (
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
        </div>

        <div className="card" style={{ padding: 28 }}>
          <span className="pill">MOUNTAIN REALITY</span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Wellness does not remove altitude
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.75 }}
          >
            Himalayan environments still require
            sensible acclimatization, appropriate
            preparation and flexibility. A relaxed
            itinerary should respect altitude, weather,
            terrain and the advice of qualified local
            professionals.
          </p>

          <div className="actions" style={{ marginTop: 22 }}>
            <Link className="btn alt" href="/himalayan-guide">
              Himalayan Guide
            </Link>

            <Link className="btn alt" href="/weather-conditions">
              Live conditions
            </Link>
          </div>
        </div>
      </section>

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">CULTURE & RESPECT</span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          The Himalaya is home, not a wellness backdrop
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          Yoga, meditation and spiritual interests
          should be approached with respect for local
          traditions and communities. Avoid treating
          sacred places, ceremonies or living cultures
          as products created for visitors.
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
        <span className="pill">YOUR JOURNEY</span>

        <h2
          style={{
            marginTop: 16,
            marginBottom: 12,
            fontSize: "clamp(30px, 5vw, 46px)",
          }}
        >
          Create more space in your Himalayan itinerary.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Choose your destination, number of days,
          accommodation preference and travel style,
          then build a private journey around the pace
          that works for you.
        </p>

        <div
          className="actions"
          style={{
            justifyContent: "center",
            marginTop: 26,
          }}
        >
          <Link className="btn" href="/custom-journey">
            Build my wellness journey
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

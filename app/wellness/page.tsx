import Link from "next/link";

const slowTravelPrinciples = [
  {
    number: "01",
    title: "Slower pacing",
    text:
      "Build in quieter mornings, realistic travel days and enough time to experience Tibet without turning every day into a checklist.",
  },
  {
    number: "02",
    title: "Space & landscape",
    text:
      "Give yourself time to experience the scale of the plateau, changing light, cultural places and quieter moments between major stops.",
  },
  {
    number: "03",
    title: "Gentle activity",
    text:
      "Walking and other gentle activity can be included where appropriate, while keeping altitude, conditions and individual ability in mind.",
  },
  {
    number: "04",
    title: "Rest matters",
    text:
      "Rest and appropriate pacing are valuable in high-altitude Tibet travel. A good journey does not need to fill every available hour.",
  },
];

const journeyIdeas = [
  {
    region: "LHASA",
    title: "Lhasa Classic Journey",
    days: "5 days",
    style: "CULTURE · SLOWER PACE",
    text:
      "A shorter Tibet journey centered on Lhasa that can provide more time for cultural experiences and a measured introduction to the plateau.",
    href: "/tours/lhasa-classic",
  },
  {
    region: "LHOKA · SOUTHERN TIBET",
    title: "Lhoka (Southern Tibet)",
    days: "7 days",
    style: "CULTURE · LANDSCAPE",
    text:
      "Travel south of Lhasa into Lhoka with historic places, broad valleys, cultural landscapes and a journey rhythm that can be shaped around your priorities.",
    href: "/tours/lhoka-southern-tibet",
  },
  {
    region: "PRIVATE TIBET",
    title: "Slow & Mindful Tibet Journey",
    days: "YOUR DATES",
    style: "CUSTOM",
    text:
      "Build a private Tibet journey around thoughtful pacing, cultural experiences, landscapes, accommodation preferences and the amount of downtime you prefer.",
    href: "/custom-journey",
  },
];

const planningNotes = [
  "Choose a realistic pace for Tibet's altitude and travel distances.",
  "Allow appropriate time for adjustment and rest.",
  "Tell us how active or relaxed you want the journey to feel.",
  "Choose your accommodation preferences before shaping the route.",
  "Leave flexibility for changing weather, roads and local conditions.",
  "Balance planned experiences with quieter time.",
];

const mindfulApproach = [
  {
    number: "01",
    title: "Observe more",
    text:
      "Leave room to notice landscapes, architecture and everyday details rather than moving immediately to the next destination.",
  },
  {
    number: "02",
    title: "Schedule less",
    text:
      "A meaningful Tibet journey does not need to maximize the number of places visited. More time in fewer places can create a different experience.",
  },
  {
    number: "03",
    title: "Respect the setting",
    text:
      "Quiet travel should remain respectful of local communities, religious practice, sacred places and the realities of everyday life in Tibet.",
  },
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
          SLOW &amp; MINDFUL TIBET · 2026
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
          Slow down.
          <br />
          Make space for Tibet.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 850,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Experience Tibet with thoughtful pacing, more
          time for culture and landscapes, comfortable
          planning where practical, and enough space to
          travel without rushing.
        </p>

        <div
          className="actions"
          style={{ marginTop: 28 }}
        >
          <Link
            className="btn"
            href="/custom-journey"
          >
            Build a slower Tibet journey
          </Link>

          <Link
            className="btn alt"
            href="/ai-trip-planner"
          >
            Plan Tibet with AI
          </Link>
        </div>
      </section>

      {/* PRINCIPLES */}

      <section>
        <span className="pill">
          TRAVEL WITH SPACE
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 42px)",
          }}
        >
          A better rhythm can change the journey.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            lineHeight: 1.7,
          }}
        >
          Slow travel in Tibet does not need to be a
          retreat. It can simply mean sensible days,
          meaningful experiences, realistic travel times
          and enough room to rest and observe.
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
          {slowTravelPrinciples.map((item) => (
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

      {/* JOURNEY IDEAS */}

      <section style={{ marginTop: 40 }}>
        <span className="pill">
          TIBET JOURNEY IDEAS
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Start with a journey that has room to breathe.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 800,
            lineHeight: 1.7,
          }}
        >
          Begin with one of these Tibet journey ideas,
          then use a private itinerary to adjust the
          pace, interests, accommodation preferences and
          amount of downtime.
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

      {/* MINDFUL APPROACH */}

      <section
        className="card"
        style={{
          marginTop: 38,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          MINDFUL TRAVEL
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Experience more by trying to cover less.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            lineHeight: 1.7,
          }}
        >
          A slower Tibet itinerary can create more time
          to understand a place instead of measuring the
          journey by how many stops fit into each day.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
            marginTop: 24,
          }}
        >
          {mindfulApproach.map((item) => (
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
                APPROACH {item.number}
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

      {/* RHYTHM + ALTITUDE */}

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
            PLAN YOUR RHYTHM
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Tell us how you want Tibet to feel.
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.7 }}
          >
            Some travelers want gentle days and more
            quiet time. Others want active experiences
            balanced by appropriate rest. Your preferred
            rhythm should help shape the itinerary.
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
                <strong aria-hidden="true">
                  ✓
                </strong>

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

        <div
          className="card"
          style={{ padding: 28 }}
        >
          <span className="pill">
            HIGH-ALTITUDE REALITY
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Slow travel does not remove altitude.
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.75 }}
          >
            Tibet travel still requires appropriate
            preparation, realistic pacing and attention
            to altitude. Individual responses vary, and
            a relaxed itinerary should remain flexible
            when circumstances require it.
          </p>

          <div
            className="actions"
            style={{ marginTop: 22 }}
          >
            <Link
              className="btn alt"
              href="/himalayan-guide"
            >
              Tibet Travel Guide
            </Link>

            <Link
              className="btn alt"
              href="/weather-conditions"
            >
              Tibet conditions
            </Link>
          </div>
        </div>
      </section>

      {/* CULTURE */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          CULTURE &amp; RESPECT
        </span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Tibet is home, not a wellness backdrop.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          Meditation, quiet reflection and personal
          wellbeing interests should be approached with
          respect for local communities and traditions.
          Sacred places, religious practice and living
          culture exist independently of the visitor&apos;s
          personal travel goals.
        </p>

        <Link
          className="btn alt"
          href="/responsible-travel"
          style={{ marginTop: 18 }}
        >
          Responsible Tibet travel
        </Link>
      </section>

      {/* WELLBEING NOTE */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          WELLBEING &amp; TRAVEL
        </span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Travel planning is not medical guidance.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          A slower itinerary may feel more comfortable,
          but this page does not make medical or
          therapeutic claims. Tibet includes
          high-altitude environments, and personal
          health questions should be discussed with an
          appropriate qualified professional.
        </p>
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
          Keep the journey flexible.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          Travel documentation, permits, route access,
          transportation, weather and local operating
          conditions can change. Confirm current
          information for your travel dates, nationality
          and intended Tibet route before final
          arrangements are made.
        </p>

        <div
          className="actions"
          style={{ marginTop: 20 }}
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
          YOUR TIBET JOURNEY
        </span>

        <h2
          style={{
            marginTop: 16,
            marginBottom: 12,
            fontSize: "clamp(30px, 5vw, 46px)",
          }}
        >
          Give your Tibet itinerary more room to breathe.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Choose your available days, preferred pace,
          interests and accommodation preferences, then
          shape a private Tibet journey around the
          experience you want.
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
            href="/custom-journey"
          >
            Build my slow Tibet journey
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

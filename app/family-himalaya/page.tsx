import Link from "next/link";

const familyPriorities = [
  {
    number: "01",
    title: "A realistic pace",
    text:
      "Family itineraries need enough time for rest, meals, changing conditions and different energy levels without turning every day into a race.",
  },
  {
    number: "02",
    title: "Altitude awareness",
    text:
      "Tibet is a high-altitude destination. Route design should consider elevation, pacing and the individual circumstances of every family member.",
  },
  {
    number: "03",
    title: "Practical comfort",
    text:
      "Accommodation preferences, practical transportation and sensible daily travel distances can make an important difference when traveling together.",
  },
  {
    number: "04",
    title: "Shared experiences",
    text:
      "Combine culture, landscapes, monasteries, photography and appropriate activities so the journey offers something meaningful for different family interests.",
  },
];

const journeyIdeas = [
  {
    region: "LHASA",
    title: "Lhasa Classic Journey",
    tag: "5 DAYS",
    text:
      "A shorter introduction to Tibet centered on Lhasa, with cultural experiences and a route that can provide a starting point for more measured family planning.",
    href: "/tours/lhasa-classic",
  },
  {
    region: "LHOKA · SOUTHERN TIBET",
    title: "Lhoka (Southern Tibet)",
    tag: "7 DAYS",
    text:
      "A southern Tibet journey through Lhoka combining historic places, cultural heritage and broad valley landscapes. The pace and daily plan should be considered against the needs of the family traveling.",
    href: "/tours/lhoka-southern-tibet",
  },
  {
    region: "PRIVATE TIBET",
    title: "Your family, your pace",
    tag: "CUSTOM",
    text:
      "Build a private Tibet journey around ages, dates, interests, preferred accommodation, activity level and the needs of your family.",
    href: "/custom-journey",
  },
];

const planningQuestions = [
  "What are the ages of the children or younger travelers?",
  "How active is each family member during a normal travel day?",
  "Has everyone traveled at significant altitude before?",
  "How many days do you have available for Tibet?",
  "What level of accommodation do you prefer?",
  "Which interests matter most: culture, landscapes, photography, spirituality or adventure?",
];

const familyPlanningSteps = [
  {
    number: "01",
    title: "Start with the travelers",
    text:
      "Tell us who is traveling, including the ages of younger travelers and any important planning considerations.",
  },
  {
    number: "02",
    title: "Choose the right pace",
    text:
      "Decide how much activity, road travel, sightseeing and downtime feels realistic for the family.",
  },
  {
    number: "03",
    title: "Then shape the route",
    text:
      "Use those needs to decide whether a shorter Lhasa-focused journey or a broader private Tibet itinerary makes more sense.",
  },
];

export default function FamilyHimalayaPage() {
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
          FAMILY TIBET JOURNEYS · 2026
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
          Discover Tibet.
          <br />
          Plan around your family.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 850,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Family Tibet travel should begin with the
          travelers, not a fixed route. Build around
          realistic pacing, altitude awareness, practical
          comfort and experiences your family wants to
          share.
        </p>

        <div
          className="actions"
          style={{ marginTop: 28 }}
        >
          <Link
            className="btn"
            href="/custom-journey"
          >
            Build a family Tibet journey
          </Link>

          <Link
            className="btn alt"
            href="/ai-trip-planner"
          >
            Plan Tibet with AI
          </Link>
        </div>
      </section>

      {/* FAMILY FIRST */}

      <section>
        <span className="pill">
          FAMILY-FIRST PLANNING
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 42px)",
          }}
        >
          Start with the people, then choose the route.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            lineHeight: 1.7,
          }}
        >
          There is no single Tibet itinerary that suits
          every family. Age, individual health, previous
          altitude experience, available time, interests
          and comfort expectations all matter when
          considering a route.
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
          {familyPriorities.map((item) => (
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
          Different families need different journeys.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 800,
            lineHeight: 1.7,
          }}
        >
          These are starting points, not universal
          recommendations. A Tibet family itinerary
          should be considered against the circumstances
          of the people actually traveling.
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

                <SmallTag text={journey.tag} />
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
                Explore this idea
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* PLANNING APPROACH */}

      <section
        className="card"
        style={{
          marginTop: 38,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          BUILD THE RIGHT JOURNEY
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Family planning should happen before route planning.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 830,
            lineHeight: 1.7,
          }}
        >
          Instead of choosing the most dramatic Tibet
          route first, begin with what is realistic for
          the family and use that information to shape
          the itinerary.
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
          {familyPlanningSteps.map((item) => (
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
                STEP {item.number}
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

      {/* QUESTIONS + ALTITUDE */}

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
            BEFORE WE PLAN
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Six useful questions.
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.7 }}
          >
            These details help turn a general family
            holiday idea into a more realistic Tibet
            planning brief.
          </p>

          <div
            style={{
              display: "grid",
              gap: 13,
              marginTop: 20,
            }}
          >
            {planningQuestions.map((question) => (
              <div
                key={question}
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
                  {question}
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
            ALTITUDE &amp; CONDITIONS
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Tibet&apos;s altitude matters.
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.75 }}
          >
            Tibet includes significant high-altitude
            environments. Weather, elevation, route
            conditions and individual circumstances can
            affect whether a particular itinerary is
            appropriate for a family.
          </p>

          <div
            className="actions"
            style={{
              marginTop: 22,
              flexWrap: "wrap",
            }}
          >
            <Link
              className="btn"
              href="/weather-conditions"
            >
              Check Tibet conditions
            </Link>

            <Link
              className="btn alt"
              href="/himalayan-guide"
            >
              Tibet Travel Guide
            </Link>
          </div>
        </div>
      </section>

      {/* IMPORTANT */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          IMPORTANT
        </span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(27px, 4vw, 38px)",
          }}
        >
          Family travel needs individual decisions.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          Information on this page is general travel
          planning guidance, not medical advice. Age
          alone does not determine whether a
          high-altitude Tibet journey is appropriate.
          Families should consider individual health,
          previous altitude experience, the proposed
          itinerary and professional medical advice
          where relevant before choosing a
          high-altitude journey.
        </p>
      </section>

      {/* EXPERIENCE */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          MORE THAN SIGHTSEEING
        </span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Give everyone something to remember.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          A family Tibet journey can combine landscapes,
          cultural heritage, monasteries, photography and
          time to understand the places being visited.
          The goal is not to fill every hour, but to
          create a journey the family can experience
          together.
        </p>

        <div
          className="actions"
          style={{ marginTop: 20 }}
        >
          <Link
            className="btn alt"
            href="/culture-heritage"
          >
            Explore Tibet culture
          </Link>

          <Link
            className="btn alt"
            href="/responsible-travel"
          >
            Responsible Tibet travel
          </Link>
        </div>
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
          Confirm current requirements.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          Travel documentation, permits, route access,
          transportation, local requirements, weather
          and operating conditions can change. Confirm
          current information for every traveler,
          including requirements relevant to younger
          travelers, before final arrangements are made.
        </p>

        <Link
          className="btn alt"
          href="/ai-research"
          style={{ marginTop: 18 }}
        >
          Research current information
        </Link>
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
          YOUR FAMILY · YOUR TIBET JOURNEY
        </span>

        <h2
          style={{
            marginTop: 16,
            marginBottom: 12,
            fontSize: "clamp(30px, 5vw, 46px)",
          }}
        >
          Build around your family, not a template.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Tell us your dates, family size, ages,
          preferred pace, interests and accommodation
          preferences. Use those details as the starting
          point for a private Tibet journey.
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
            Build my family Tibet journey
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

import Link from "next/link";

const familyPriorities = [
  {
    number: "01",
    title: "A realistic pace",
    text: "Family itineraries need enough time for rest, meals, changing weather and different energy levels without turning every day into a race.",
  },
  {
    number: "02",
    title: "Altitude awareness",
    text: "Higher is not automatically better. Route design should consider altitude, gradual ascent and the individual needs of every family member.",
  },
  {
    number: "03",
    title: "Comfort that matters",
    text: "Good accommodation, practical transport and sensible daily distances can make a major difference when traveling together.",
  },
  {
    number: "04",
    title: "Experiences for everyone",
    text: "Combine scenery with villages, culture, wildlife, short walks and flexible activities so the journey is interesting beyond trekking alone.",
  },
];

const journeyIdeas = [
  {
    region: "NEPAL",
    title: "A gentler Nepal journey",
    tag: "FLEXIBLE",
    text: "Combine Himalayan scenery, cultural experiences and shorter walking days with an itinerary designed around your family's available time.",
    href: "/custom-journey",
  },
  {
    region: "BHUTAN",
    title: "Bhutan Mountain & Culture",
    tag: "9 DAYS",
    text: "A culture-focused Himalayan journey with monasteries, landscapes and experiences that can inspire a slower private family itinerary.",
    href: "/tours/bhutan-mountain-culture",
  },
  {
    region: "PRIVATE",
    title: "Your family, your pace",
    tag: "CUSTOM",
    text: "Build around ages, dates, preferred accommodation, activity level and the experiences your family actually wants.",
    href: "/custom-journey",
  },
];

const planningQuestions = [
  "What are the ages of the children or younger travelers?",
  "How much walking is comfortable on a normal day?",
  "Has everyone traveled at altitude before?",
  "How many days do you have available?",
  "What level of accommodation do you prefer?",
  "Which matters most: nature, culture, adventure or relaxation?",
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
      <section
        className="card"
        style={{
          padding: "clamp(28px, 5vw, 56px)",
          marginBottom: 38,
        }}
      >
        <span className="pill">FAMILY HIMALAYA</span>

        <h1
          style={{
            marginTop: 18,
            marginBottom: 18,
            fontSize: "clamp(42px, 7vw, 76px)",
            lineHeight: 1,
            maxWidth: 980,
          }}
        >
          Big mountains.
          <br />
          A journey built for your family.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 840,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Family Himalayan travel should be designed
          around people, not just places. Build a
          journey with sensible pacing, appropriate
          altitude, comfortable logistics and
          experiences everyone can enjoy.
        </p>

        <div
          className="actions"
          style={{ marginTop: 28 }}
        >
          <Link className="btn" href="/custom-journey">
            Build a family journey
          </Link>

          <Link className="btn alt" href="/ai-trip-planner">
            Plan with AI
          </Link>
        </div>
      </section>

      <section>
        <span className="pill">FAMILY-FIRST PLANNING</span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 42px)",
          }}
        >
          Start with the people, then choose the route
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 800,
            lineHeight: 1.7,
          }}
        >
          There is no single Himalayan itinerary that
          fits every family. Age, experience, altitude,
          season and comfort expectations should shape
          the plan.
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

      <section style={{ marginTop: 40 }}>
        <span className="pill">JOURNEY IDEAS</span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Different families need different journeys
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 780,
            lineHeight: 1.7,
          }}
        >
          Use these as starting points rather than
          fixed recommendations. A family itinerary
          should be adjusted to the travelers taking
          part.
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
                minHeight: 330,
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
          <span className="pill">BEFORE WE PLAN</span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Six useful questions
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.7 }}
          >
            These details help turn a general family
            holiday into a more realistic Himalayan
            journey.
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
                <strong aria-hidden="true">✓</strong>

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

        <div className="card" style={{ padding: 28 }}>
          <span className="pill">ALTITUDE & CONDITIONS</span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Mountain conditions come first
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.75 }}
          >
            High-altitude travel requires careful
            planning. Weather, altitude, route
            conditions and individual health can
            affect what is appropriate for a
            particular family.
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
              Check live weather
            </Link>

            <Link
              className="btn alt"
              href="/himalayan-guide"
            >
              Read planning guide
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
        <span className="pill">IMPORTANT</span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(27px, 4vw, 38px)",
          }}
        >
          Family travel needs individual decisions
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          Information on this page is general planning
          guidance, not medical advice. Age alone does
          not determine whether a high-altitude journey
          is appropriate. Families should consider
          individual health, previous altitude
          experience, current conditions and
          professional medical advice where relevant
          before choosing a high-altitude itinerary.
        </p>
      </section>

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(28px, 5vw, 46px)",
          textAlign: "center",
        }}
      >
        <span className="pill">YOUR FAMILY JOURNEY</span>

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
            maxWidth: 730,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Tell us your dates, family size, preferred
          pace and priorities. We can use those details
          as the starting point for a private journey.
        </p>

        <div
          className="actions"
          style={{
            justifyContent: "center",
            marginTop: 26,
          }}
        >
          <Link className="btn" href="/custom-journey">
            Build my family journey
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

import Link from "next/link";

const principles = [
  {
    number: "01",
    title: "Respect local communities",
    text:
      "Tibet is home to living communities with their own traditions, daily rhythms and cultural practices. Travel thoughtfully, listen to local guidance and remember that visitors are guests.",
  },
  {
    number: "02",
    title: "Respect culture & sacred places",
    text:
      "Monasteries, temples and pilgrimage places deserve particular care. Follow local guidance about dress, behavior, photography and access, and avoid disrupting ceremonies or religious practice.",
  },
  {
    number: "03",
    title: "Protect plateau environments",
    text:
      "Reduce unnecessary waste, use reusable items where practical and avoid disturbing wildlife, vegetation, lakeshores and fragile high-altitude landscapes.",
  },
  {
    number: "04",
    title: "Travel at a thoughtful pace",
    text:
      "Tibet journeys take place at significant altitude. Avoid building an itinerary around speed alone. Allow appropriate time for adjustment, rest and changes in local conditions.",
  },
  {
    number: "05",
    title: "Respect local guidance",
    text:
      "Local guides and travel professionals provide important cultural, logistical and practical context. Listen carefully to their instructions, particularly around sacred places, high altitude, road travel and changing access conditions.",
  },
  {
    number: "06",
    title: "Leave a lighter footprint",
    text:
      "Small decisions matter. Reduce disposable packaging, manage waste carefully, use water and energy thoughtfully and avoid leaving permanent traces in remote landscapes.",
  },
];

const beforeTravel = [
  "Learn basic cultural etiquette for Tibet before departure.",
  "Choose a journey with realistic pacing and altitude progression.",
  "Pack reusable items to reduce unnecessary disposable waste.",
  "Confirm current travel documentation, permits and route requirements for your dates.",
];

const duringTravel = [
  "Follow your guide's advice and respect local access rules.",
  "Ask before photographing people, ceremonies or sensitive places.",
  "Use water, electricity and heating thoughtfully, especially in remote areas.",
  "Carry your waste responsibly and avoid disturbing natural environments.",
];

const afterTravel = [
  "Choose thoughtful souvenirs and support appropriate local businesses where practical.",
  "Share photographs and cultural stories respectfully.",
  "Give useful and fair feedback to guides and travel providers.",
  "Carry responsible travel habits into your next journey.",
];

export default function ResponsibleTravelPage() {
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
          padding:
            "clamp(28px, 5vw, 56px)",
          marginBottom: 24,
          background:
            "radial-gradient(circle at 85% 15%, rgba(109,224,194,.12), transparent 30%), linear-gradient(145deg, rgba(18,48,55,.96), rgba(8,28,35,.98))",
        }}
      >
        <span className="pill">
          RESPONSIBLE TRAVEL · TIBET
        </span>

        <h1
          style={{
            marginTop: 18,
            marginBottom: 18,
            fontSize:
              "clamp(42px, 7vw, 76px)",
            lineHeight: 1,
            maxWidth: 950,
          }}
        >
          Travel with respect.
          <br />
          Experience Tibet thoughtfully.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 850,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Tibet is more than an
          extraordinary landscape. It is
          home to communities, cultural
          traditions, sacred places and
          fragile high-altitude
          environments. A thoughtful
          journey respects all of them.
        </p>

        <div
          className="actions"
          style={{
            marginTop: 28,
          }}
        >
          <Link
            className="btn"
            href="/ai-trip-planner"
          >
            Plan Tibet with AI
          </Link>

          <Link
            className="btn alt"
            href="/contact-book"
          >
            Request a Tibet journey
          </Link>
        </div>
      </section>

      {/* PRINCIPLES */}

      <section
        style={{
          marginTop: 38,
        }}
      >
        <div
          style={{
            marginBottom: 20,
          }}
        >
          <span className="pill">
            OUR APPROACH
          </span>

          <h2
            style={{
              marginTop: 14,
              marginBottom: 8,
              fontSize:
                "clamp(28px, 4vw, 42px)",
            }}
          >
            Six principles for thoughtful
            travel in Tibet
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 790,
              lineHeight: 1.7,
            }}
          >
            Responsible travel begins
            before departure and continues
            throughout the journey. How we
            behave, photograph, consume
            resources and interact with
            people all matter.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
          }}
        >
          {principles.map((item) => (
            <article
              className="card"
              key={item.number}
              style={{
                padding: 24,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing:
                    "0.12em",
                  opacity: 0.65,
                  marginBottom: 18,
                }}
              >
                PRINCIPLE {item.number}
              </div>

              <h3
                style={{
                  fontSize: 22,
                  marginBottom: 12,
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

      {/* CULTURAL RESPECT */}

      <section
        className="card"
        style={{
          marginTop: 38,
          padding:
            "clamp(26px, 4vw, 42px)",
        }}
      >
        <span className="pill">
          CULTURAL RESPECT
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 12,
            fontSize:
              "clamp(28px, 4vw, 42px)",
          }}
        >
          Sacred places are not tourist
          sets.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.8,
            marginBottom: 0,
          }}
        >
          Monasteries, temples,
          pilgrimage routes and religious
          practices are part of living
          traditions. Follow instructions
          about where visitors may enter,
          when photography is appropriate
          and how to behave. When unsure,
          ask your guide rather than
          assuming something is permitted.
        </p>
      </section>

      {/* CHECKLIST */}

      <section
        className="card"
        style={{
          marginTop: 38,
          padding:
            "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          TRAVEL CHECKLIST
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize:
              "clamp(28px, 4vw, 40px)",
          }}
        >
          Before, during and after your
          Tibet journey
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 780,
            lineHeight: 1.7,
          }}
        >
          Responsible travel does not
          need to be complicated. A few
          thoughtful habits can improve
          both the travel experience and
          the way visitors interact with
          the places they encounter.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 18,
            marginTop: 26,
          }}
        >
          <ChecklistCard
            title="Before you travel"
            items={beforeTravel}
          />

          <ChecklistCard
            title="During your journey"
            items={duringTravel}
          />

          <ChecklistCard
            title="After you return"
            items={afterTravel}
          />
        </div>
      </section>

      {/* ALTITUDE + PRIVATE */}

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
          style={{
            padding: 28,
          }}
        >
          <span className="pill">
            HIGH ALTITUDE
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Responsible planning includes
            realistic pacing
          </h2>

          <p
            className="muted"
            style={{
              lineHeight: 1.7,
            }}
          >
            Tibet journeys often involve
            significant altitude and long
            overland routes. Build
            flexibility into the itinerary,
            allow time to adjust and check
            current weather and travel
            conditions before departure.
          </p>

          <Link
            className="btn alt"
            href="/weather-conditions"
          >
            Check Tibet conditions
          </Link>
        </div>

        <div
          className="card"
          style={{
            padding: 28,
          }}
        >
          <span className="pill">
            PRIVATE JOURNEY
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Build around your pace and
            priorities
          </h2>

          <p
            className="muted"
            style={{
              lineHeight: 1.7,
            }}
          >
            Choose your Tibet journey
            focus, trip style,
            accommodation preference and
            priorities, then create a
            private journey brief around
            what matters to you.
          </p>

          <Link
            className="btn"
            href="/custom-journey"
          >
            Build my Tibet journey
          </Link>
        </div>
      </section>

      {/* CURRENT REQUIREMENTS */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding:
            "clamp(26px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          PLAN WITH CURRENT INFORMATION
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 12,
            fontSize:
              "clamp(28px, 4vw, 40px)",
          }}
        >
          Respect also means following
          current requirements.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.8,
            marginBottom: 0,
          }}
        >
          Travel documentation, permits,
          route access, local rules and
          operating conditions can change.
          Confirm the requirements that
          apply to your nationality,
          intended route and travel dates
          before final arrangements are
          made, and follow appropriate
          local guidance throughout the
          journey.
        </p>
      </section>

      {/* FINAL CTA */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding:
            "clamp(26px, 5vw, 46px)",
          textAlign: "center",
          background:
            "linear-gradient(135deg, rgba(19,58,61,.9), rgba(16,35,42,.96))",
        }}
      >
        <span className="pill">
          TRAVEL TIBET THOUGHTFULLY
        </span>

        <h2
          style={{
            marginTop: 16,
            marginBottom: 12,
            fontSize:
              "clamp(30px, 5vw, 46px)",
          }}
        >
          A meaningful Tibet journey
          begins with respect.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 790,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Plan thoughtfully, stay
          flexible, respect local
          knowledge and cultural practices,
          and make choices that help
          protect the places you came to
          experience.
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
            href="/tours"
          >
            Explore Tibet journeys
          </Link>

          <Link
            className="btn alt"
            href="/contact-book"
          >
            Plan my Tibet trip
          </Link>
        </div>
      </section>
    </main>
  );
}

function ChecklistCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div
      style={{
        padding: 22,
        borderRadius: 18,
        border:
          "1px solid rgba(255,255,255,0.10)",
        background:
          "rgba(255,255,255,0.03)",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: 18,
          fontSize: 21,
        }}
      >
        {title}
      </h3>

      <div
        style={{
          display: "grid",
          gap: 14,
        }}
      >
        {items.map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              gap: 11,
              alignItems:
                "flex-start",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontWeight: 800,
                lineHeight: 1.5,
              }}
            >
              ✓
            </span>

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
    </div>
  );
}

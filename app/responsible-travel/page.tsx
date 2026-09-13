import Link from "next/link";

const principles = [
  {
    number: "01",
    title: "Local communities first",
    text: "Choose local guides, locally owned services and community-based experiences wherever practical so tourism creates meaningful value in Himalayan regions.",
  },
  {
    number: "02",
    title: "Respect culture",
    text: "Dress, photograph, visit sacred places and interact with communities respectfully. Local customs can differ greatly between Nepal, Bhutan, Tibet and the Indian Himalaya.",
  },
  {
    number: "03",
    title: "Protect mountain environments",
    text: "Reduce single-use waste, carry out what you carry in, stay on established trails and avoid disturbing wildlife, vegetation and fragile alpine environments.",
  },
  {
    number: "04",
    title: "Travel at a responsible pace",
    text: "High-altitude journeys need realistic schedules. Proper acclimatization, rest days and flexibility are more important than rushing to complete an itinerary.",
  },
  {
    number: "05",
    title: "Respect guides and porters",
    text: "Responsible Himalayan travel includes fair treatment, appropriate working conditions, suitable equipment and respect for the people who make mountain journeys possible.",
  },
  {
    number: "06",
    title: "Leave places better",
    text: "Small decisions matter: refill water where safe, minimize unnecessary packaging, respect waste systems and avoid leaving permanent traces in remote landscapes.",
  },
];

const beforeTravel = [
  "Learn basic cultural etiquette for your destination.",
  "Choose an itinerary with realistic altitude progression.",
  "Pack reusable items to reduce disposable waste.",
  "Understand permit and protected-area requirements.",
];

const duringTravel = [
  "Follow your guide's instructions and established trails.",
  "Ask permission before photographing people or ceremonies.",
  "Use water, electricity and heating thoughtfully in remote areas.",
  "Never leave litter, batteries or other waste on the trail.",
];

const afterTravel = [
  "Support local businesses when purchasing souvenirs.",
  "Share photographs and stories respectfully.",
  "Give useful, fair feedback to guides and operators.",
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
      <section
        className="card"
        style={{
          padding: "clamp(28px, 5vw, 56px)",
          marginBottom: 24,
        }}
      >
        <span className="pill">
          RESPONSIBLE HIMALAYA
        </span>

        <h1
          style={{
            marginTop: 18,
            marginBottom: 18,
            fontSize: "clamp(42px, 7vw, 76px)",
            lineHeight: 1,
            maxWidth: 950,
          }}
        >
          Travel with respect.
          <br />
          Leave a positive footprint.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          The Himalaya is not only a destination.
          It is home to communities, cultures,
          sacred landscapes and fragile mountain
          environments. A better journey respects
          all of them.
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
            Plan responsibly with AI
          </Link>

          <Link
            className="btn alt"
            href="/contact-book"
          >
            Request a journey
          </Link>
        </div>
      </section>

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
              fontSize: "clamp(28px, 4vw, 42px)",
            }}
          >
            Six principles for better Himalayan travel
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 760,
              lineHeight: 1.7,
            }}
          >
            Responsible travel begins with practical
            choices before the journey and continues
            throughout every day in the mountains.
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
                  letterSpacing: "0.12em",
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

      <section
        className="card"
        style={{
          marginTop: 38,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          TRAVEL CHECKLIST
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Before, during and after your journey
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            lineHeight: 1.7,
          }}
        >
          Responsible travel does not need to be
          complicated. These simple habits can make
          a meaningful difference.
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
            Responsible also means safe
          </h2>

          <p
            className="muted"
            style={{
              lineHeight: 1.7,
            }}
          >
            Weather, altitude and trail conditions
            can change quickly. Build flexibility
            into mountain itineraries and check
            current conditions before committing
            to a route.
          </p>

          <Link
            className="btn alt"
            href="/weather-conditions"
          >
            Check live conditions
          </Link>
        </div>

        <div
          className="card"
          style={{
            padding: 28,
          }}
        >
          <span className="pill">
            CUSTOM JOURNEY
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Build a journey around your priorities
          </h2>

          <p
            className="muted"
            style={{
              lineHeight: 1.7,
            }}
          >
            Choose your destination, trip style,
            accommodation and priorities, then
            create a private Himalayan journey
            brief.
          </p>

          <Link
            className="btn"
            href="/custom-journey"
          >
            Build my journey
          </Link>
        </div>
      </section>

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(26px, 5vw, 46px)",
          textAlign: "center",
        }}
      >
        <span className="pill">
          TRAVEL BETTER
        </span>

        <h2
          style={{
            marginTop: 16,
            marginBottom: 12,
            fontSize: "clamp(30px, 5vw, 46px)",
          }}
        >
          A great Himalayan journey should benefit
          more than the traveler.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Plan thoughtfully, stay flexible, respect
          local knowledge and make choices that help
          protect the places you came to experience.
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
            Explore journeys
          </Link>

          <Link
            className="btn alt"
            href="/contact-book"
          >
            Plan my trip
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
              alignItems: "flex-start",
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

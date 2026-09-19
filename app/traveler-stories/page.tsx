import Link from "next/link";

const storyThemes = [
  {
    region: "LHASA · TIBET",
    title: "The first morning on the plateau",
    text:
      "A Tibet journey can be remembered through early light, historic streets, cultural places and the gradual realization that the plateau has its own rhythm.",
    route: "Lhasa Classic Journey",
    href: "/tours/lhasa-classic",
  },
  {
    region: "EVEREST · TIBET",
    title: "The road becomes part of the story",
    text:
      "Traveling from Lhasa toward Everest is not only about the final mountain view. Central Tibet, changing landscapes and the scale of the plateau become part of the experience.",
    route: "Lhasa to Everest Base Camp",
    href: "/tours/lhasa-everest-base-camp",
  },
  {
    region: "MOUNT KAILASH · TIBET",
    title: "A journey shaped by a sacred landscape",
    text:
      "Mount Kailash can give a journey a very different character, combining remote high-altitude travel with pilgrimage traditions and a landscape of deep cultural significance.",
    route: "Mount Kailash Kora",
    href: "/tours/kailash-kora",
  },
];

const moments = [
  {
    number: "01",
    title: "The first plateau morning",
    text:
      "Cold air, changing light and the scale of the Tibetan landscape can make an ordinary morning one of the memorable moments of a journey.",
  },
  {
    number: "02",
    title: "Understanding a place",
    text:
      "Guides, local context, monasteries, historic places and everyday observations can become as memorable as the major landscapes.",
  },
  {
    number: "03",
    title: "Learning to slow down",
    text:
      "At altitude, patience matters. A measured pace can create more room for adjustment, observation and a deeper experience of Tibet.",
  },
  {
    number: "04",
    title: "The unexpected day",
    text:
      "Weather, roads and local conditions can change a plan. Flexibility is part of high-altitude travel and sometimes becomes part of the story itself.",
  },
];

const storyDirections = [
  {
    number: "01",
    title: "Culture",
    text:
      "A story shaped by Lhasa, monasteries, historic places and time spent understanding Tibet's cultural context.",
    href: "/culture-heritage",
  },
  {
    number: "02",
    title: "Landscape",
    text:
      "A journey remembered through plateau roads, lakes, Himalayan horizons, changing weather and enormous open spaces.",
    href: "/tours/tibet-high-plateau",
  },
  {
    number: "03",
    title: "Photography",
    text:
      "A journey with more time to observe architecture, landscapes and changing light instead of moving quickly between stops.",
    href: "/tours/tibet-photography",
  },
  {
    number: "04",
    title: "Pilgrimage",
    text:
      "A journey shaped by sacred landscapes, monasteries, religious traditions and respectful encounters with pilgrimage places.",
    href: "/spiritual-journeys",
  },
];

export default function TravelerStoriesPage() {
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
          TIBET TRAVELER STORIES
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
          Every Tibet journey
          <br />
          becomes its own story.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 850,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          The famous places are only one part of the
          experience. Changing landscapes, cultural
          context, quiet moments and unexpected days can
          become the memories that define a Tibet
          journey.
        </p>

        <div
          className="actions"
          style={{ marginTop: 28 }}
        >
          <Link
            className="btn"
            href="/tours"
          >
            Explore Tibet journeys
          </Link>

          <Link
            className="btn alt"
            href="/custom-journey"
          >
            Create your Tibet journey
          </Link>
        </div>
      </section>

      {/* STORY THEMES */}

      <section>
        <span className="pill">
          JOURNEY INSPIRATION
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 42px)",
          }}
        >
          Stories that begin with a place.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            lineHeight: 1.7,
          }}
        >
          These are Tibet journey themes created for
          inspiration, not published customer
          testimonials. Real guest stories can be added
          here later as your traveler community grows.
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
          {storyThemes.map((story) => (
            <article
              className="card"
              key={story.title}
              style={{
                padding: 26,
                display: "flex",
                flexDirection: "column",
                minHeight: 360,
              }}
            >
              <span
                className="pill"
                style={{
                  alignSelf: "flex-start",
                }}
              >
                {story.region}
              </span>

              <h3
                style={{
                  marginTop: 22,
                  marginBottom: 14,
                  fontSize: 27,
                  lineHeight: 1.2,
                }}
              >
                {story.title}
              </h3>

              <p
                className="muted"
                style={{
                  lineHeight: 1.75,
                  flex: 1,
                }}
              >
                {story.text}
              </p>

              <div
                style={{
                  paddingTop: 18,
                  marginTop: 10,
                  borderTop:
                    "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <div
                  className="muted"
                  style={{
                    fontSize: 13,
                    marginBottom: 12,
                  }}
                >
                  INSPIRED BY
                </div>

                <Link
                  className="btn alt"
                  href={story.href}
                >
                  {story.route}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MOMENTS */}

      <section
        className="card"
        style={{
          marginTop: 38,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          MOMENTS THAT MATTER
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          What makes a Tibet journey memorable?
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 780,
            lineHeight: 1.7,
          }}
        >
          Travel is often remembered through the smaller
          moments between the major destinations.
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
          {moments.map((moment) => (
            <div
              key={moment.number}
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
                MOMENT {moment.number}
              </span>

              <h3
                style={{
                  marginTop: 14,
                  marginBottom: 10,
                  fontSize: 21,
                }}
              >
                {moment.title}
              </h3>

              <p
                className="muted"
                style={{
                  lineHeight: 1.7,
                  marginBottom: 0,
                }}
              >
                {moment.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT KIND OF STORY */}

      <section style={{ marginTop: 38 }}>
        <span className="pill">
          WHAT WILL SHAPE YOUR JOURNEY?
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Different interests create different stories.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            lineHeight: 1.7,
          }}
        >
          Start with what draws you to Tibet, then use
          those interests to choose or build the journey.
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
          {storyDirections.map((item) => (
            <article
              className="card"
              key={item.number}
              style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
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
                DIRECTION {item.number}
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
                  flex: 1,
                }}
              >
                {item.text}
              </p>

              <Link
                className="btn alt"
                href={item.href}
                style={{
                  alignSelf: "flex-start",
                  marginTop: 12,
                }}
              >
                Explore
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* PREPARE + CONDITIONS */}

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 18,
          marginTop: 38,
        }}
      >
        <div
          className="card"
          style={{ padding: 28 }}
        >
          <span className="pill">
            PREPARE
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Prepare for your own Tibet story.
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.7 }}
          >
            Learn about altitude, packing, current
            travel requirements, weather and pacing
            before your Tibet journey.
          </p>

          <Link
            className="btn alt"
            href="/himalayan-guide"
          >
            Read Tibet Travel Guide
          </Link>
        </div>

        <div
          className="card"
          style={{ padding: 28 }}
        >
          <span className="pill">
            CURRENT CONDITIONS
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            See what the plateau is doing.
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.7 }}
          >
            Check current regional weather and the
            7-day planning outlook for key Tibet
            locations.
          </p>

          <Link
            className="btn"
            href="/weather-conditions"
          >
            Check Tibet conditions
          </Link>
        </div>
      </section>

      {/* REAL STORIES POLICY */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          REAL TRAVELER STORIES
        </span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Real stories will come from real travelers.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          We do not present fictional reviews as customer
          testimonials. As travelers complete journeys
          and choose to share their experiences, genuine
          stories can be added here with appropriate
          permission.
        </p>
      </section>

      {/* RESPONSIBLE TRAVEL */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          TRAVEL WITH RESPECT
        </span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          The traveler is only one part of the story.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 900,
            lineHeight: 1.75,
          }}
        >
          Tibet is not simply a backdrop for a personal
          travel story. Respect local communities,
          religious practice, sacred places and
          photography guidance while experiencing the
          journey.
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
          Every journey depends on current conditions.
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
          information for your nationality, travel dates
          and intended Tibet route before final
          arrangements are made.
        </p>

        <Link
          className="btn alt"
          href="/ai-research"
          style={{ marginTop: 18 }}
        >
          Research current Tibet information
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
          YOUR STORY STARTS HERE
        </span>

        <h2
          style={{
            marginTop: 16,
            marginBottom: 12,
            fontSize: "clamp(30px, 5vw, 46px)",
          }}
        >
          What will your Tibet story be?
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Start with an existing Tibet journey or create
          a private itinerary around your dates, pace,
          interests and priorities.
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
            Build my Tibet journey
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

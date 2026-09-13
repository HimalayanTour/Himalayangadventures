import Link from "next/link";

const storyThemes = [
  {
    region: "EVEREST • NEPAL",
    title: "The journey is bigger than the summit",
    text: "A Himalayan journey can be remembered through early mornings, mountain villages, changing landscapes and the gradual rhythm of moving higher.",
    route: "Everest Base Camp",
    href: "/tours/everest-base-camp",
  },
  {
    region: "ANNAPURNA • NEPAL",
    title: "Finding the right pace in the mountains",
    text: "Some of the strongest travel memories come from slowing down — sharing trails, watching the landscape change and allowing enough time to experience each place.",
    route: "Annapurna Classic",
    href: "/tours/annapurna-classic",
  },
  {
    region: "BHUTAN",
    title: "Mountains, monasteries and quiet moments",
    text: "Himalayan travel does not always need to be about reaching the highest point. Culture, landscape and meaningful encounters can define the journey.",
    route: "Bhutan Mountain & Culture",
    href: "/tours/bhutan-mountain-culture",
  },
];

const moments = [
  {
    number: "01",
    title: "The first mountain morning",
    text: "Cold air, changing light and the first clear view of the mountains can become one of the defining memories of a journey.",
  },
  {
    number: "02",
    title: "People along the trail",
    text: "Guides, hosts, lodge owners and local communities are often as memorable as the landscapes themselves.",
  },
  {
    number: "03",
    title: "Learning to slow down",
    text: "At altitude, patience matters. A slower pace can create space for acclimatization, observation and a deeper experience.",
  },
  {
    number: "04",
    title: "The unexpected day",
    text: "Weather and mountain conditions sometimes change the plan. Flexibility can turn an unexpected day into part of the story.",
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
      <section
        className="card"
        style={{
          padding: "clamp(28px, 5vw, 56px)",
          marginBottom: 38,
        }}
      >
        <span className="pill">
          TRAVELER STORIES
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
          Every Himalayan journey
          <br />
          becomes a story.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          The mountains are only one part of the
          experience. The people you meet, the pace
          of the trail and the unexpected moments
          along the way are often what travelers
          remember most.
        </p>

        <div
          className="actions"
          style={{ marginTop: 28 }}
        >
          <Link
            className="btn"
            href="/tours"
          >
            Explore journeys
          </Link>

          <Link
            className="btn alt"
            href="/custom-journey"
          >
            Create your journey
          </Link>
        </div>
      </section>

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
          Stories that begin with a place
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 800,
            lineHeight: 1.7,
          }}
        >
          These are journey themes inspired by
          Himalayan travel, not published customer
          testimonials. Real guest stories can be
          added here as your traveler community grows.
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
                minHeight: 340,
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
          What makes a journey memorable?
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            lineHeight: 1.7,
          }}
        >
          Himalayan travel is often defined by
          smaller moments between the major
          destinations.
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
            PREPARE
          </span>

          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
            }}
          >
            Prepare for your own story
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.7 }}
          >
            Learn about altitude, packing, permits,
            weather and pacing before you head into
            the mountains.
          </p>

          <Link
            className="btn alt"
            href="/himalayan-guide"
          >
            Read Himalayan Guide
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
            Know what the mountains are doing
          </h2>

          <p
            className="muted"
            style={{ lineHeight: 1.7 }}
          >
            Check live weather and the 7-day planning
            outlook for key Himalayan regions.
          </p>

          <Link
            className="btn"
            href="/weather-conditions"
          >
            Check live weather
          </Link>
        </div>
      </section>

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(28px, 5vw, 46px)",
          textAlign: "center",
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
          What will your Himalayan story be?
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 720,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Start with an existing journey or create a
          private itinerary around your dates, pace
          and priorities.
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
            Build my journey
          </Link>

          <Link
            className="btn alt"
            href="/contact-book"
          >
            Request a trip
          </Link>
        </div>
      </section>
    </main>
  );
}

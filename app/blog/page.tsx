import Link from "next/link";

const featuredPosts = [
  {
    category: "FIRST TIBET JOURNEY",
    title: "How to prepare for your first journey to Tibet",
    excerpt:
      "Start with altitude awareness, realistic pacing, current travel requirements and enough time to experience the plateau without rushing.",
    href: "/himalayan-guide",
  },
  {
    category: "EVEREST · TIBET",
    title: "Lhasa to Everest: what kind of journey is it?",
    excerpt:
      "Explore the idea of traveling from Lhasa toward Everest through Central Tibet, with high-altitude landscapes and changing conditions along the route.",
    href: "/tours/lhasa-everest-base-camp",
  },
  {
    category: "PLANNING",
    title: "Why pacing matters at altitude",
    excerpt:
      "Tibet itineraries should account for elevation, travel distances and individual responses rather than being designed around the calendar alone.",
    href: "/himalayan-guide",
  },
];

const journalPosts = [
  {
    category: "LHASA",
    title: "Why Lhasa is a natural starting point for Tibet",
    excerpt:
      "Culture, historic places and a strong sense of place make Lhasa an important part of many first Tibet journeys.",
    href: "/tours/lhasa-classic",
  },
  {
    category: "MOUNT KAILASH",
    title: "Understanding a Mount Kailash journey",
    excerpt:
      "A remote high-altitude journey shaped by sacred landscape, pilgrimage traditions, physical demands and the realities of western Tibet travel.",
    href: "/tours/kailash-kora",
  },
  {
    category: "WEATHER",
    title: "How to use Tibet weather information",
    excerpt:
      "Forecasts can help with planning, but regional weather data does not guarantee road, route or operating conditions across the plateau.",
    href: "/weather-conditions",
  },
  {
    category: "RESPONSIBLE TRAVEL",
    title: "Traveling respectfully in Tibet",
    excerpt:
      "Cultural awareness, thoughtful photography, respect at sacred places and consideration for local communities should remain part of the journey.",
    href: "/responsible-travel",
  },
  {
    category: "PHOTOGRAPHY",
    title: "Following light across the Tibetan plateau",
    excerpt:
      "Landscape, architecture, mountains and changing plateau light can shape a photography journey when the itinerary leaves enough time to observe.",
    href: "/tours/tibet-photography",
  },
  {
    category: "PRIVATE JOURNEYS",
    title: "When a private Tibet itinerary makes sense",
    excerpt:
      "If your dates, interests, preferred pace or accommodation needs do not fit a standard route, start with a private journey brief.",
    href: "/custom-journey",
  },
];

const planningTopics = [
  {
    number: "01",
    title: "Altitude",
    text:
      "Understand the elevation profile of a Tibet journey and build realistic pacing into the plan.",
  },
  {
    number: "02",
    title: "Current requirements",
    text:
      "Travel documentation, permits, route access and local requirements can change and should be confirmed for your trip.",
  },
  {
    number: "03",
    title: "Conditions",
    text:
      "Use current weather and route information as planning inputs while keeping the itinerary flexible.",
  },
  {
    number: "04",
    title: "Travel style",
    text:
      "Decide whether culture, Everest, photography, pilgrimage, landscapes or a private journey matters most to you.",
  },
];

export default function JournalPage() {
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
          TIBET JOURNAL · 2026
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
          Stories, planning notes
          <br />
          and Tibet insight.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 850,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Explore Tibet travel ideas, practical planning
          guidance and journey inspiration—from Lhasa and
          Everest to Mount Kailash, photography and the
          high plateau.
        </p>

        <div
          className="actions"
          style={{ marginTop: 28 }}
        >
          <Link
            className="btn"
            href="/ai-trip-planner"
          >
            Plan Tibet with AI
          </Link>

          <Link
            className="btn alt"
            href="/tours"
          >
            Explore Tibet journeys
          </Link>
        </div>
      </section>

      {/* FEATURED */}

      <section>
        <span className="pill">
          FEATURED
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 42px)",
          }}
        >
          Start planning Tibet here.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 800,
            lineHeight: 1.7,
          }}
        >
          Begin with the fundamentals: altitude, pacing,
          route choice and the kind of Tibet experience
          you want to build.
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
          {featuredPosts.map((post) => (
            <article
              className="card"
              key={post.title}
              style={{
                padding: 26,
                display: "flex",
                flexDirection: "column",
                minHeight: 320,
              }}
            >
              <span
                className="pill"
                style={{
                  alignSelf: "flex-start",
                }}
              >
                {post.category}
              </span>

              <h3
                style={{
                  marginTop: 22,
                  marginBottom: 12,
                  fontSize: 26,
                  lineHeight: 1.2,
                }}
              >
                {post.title}
              </h3>

              <p
                className="muted"
                style={{
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {post.excerpt}
              </p>

              <Link
                className="btn alt"
                href={post.href}
                style={{
                  alignSelf: "flex-start",
                  marginTop: 12,
                }}
              >
                Explore topic
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* JOURNAL */}

      <section style={{ marginTop: 42 }}>
        <span className="pill">
          TIBET JOURNAL NOTES
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 42px)",
          }}
        >
          Ideas for understanding the journey.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 800,
            lineHeight: 1.7,
          }}
        >
          Explore different sides of Tibet travel before
          deciding which route and travel style fits your
          priorities.
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
          {journalPosts.map((post) => (
            <article
              className="card"
              key={post.title}
              style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                minHeight: 300,
              }}
            >
              <span
                className="pill"
                style={{
                  alignSelf: "flex-start",
                }}
              >
                {post.category}
              </span>

              <h3
                style={{
                  marginTop: 18,
                  marginBottom: 10,
                  fontSize: 22,
                  lineHeight: 1.25,
                }}
              >
                {post.title}
              </h3>

              <p
                className="muted"
                style={{
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {post.excerpt}
              </p>

              <Link
                href={post.href}
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  fontWeight: 700,
                }}
              >
                Explore →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* PLANNING TOPICS */}

      <section
        className="card"
        style={{
          marginTop: 38,
          padding: "clamp(24px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          TIBET PLANNING BASICS
        </span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Four things to understand before choosing a route.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            lineHeight: 1.7,
          }}
        >
          Good Tibet planning starts with more than a
          list of attractions. Consider the realities of
          the plateau and the experience you want.
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
          {planningTopics.map((item) => (
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
                TOPIC {item.number}
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

      {/* LIVE PLANNING */}

      <section
        className="card"
        style={{
          marginTop: 24,
          padding: "clamp(26px, 4vw, 40px)",
        }}
      >
        <span className="pill">
          LIVE TIBET PLANNING
        </span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Turn inspiration into a journey.
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 840,
            lineHeight: 1.7,
          }}
        >
          Compare Tibet journeys, check current regional
          weather, research changing travel information
          or build a private itinerary around your own
          priorities.
        </p>

        <div
          className="actions"
          style={{ marginTop: 24 }}
        >
          <Link
            className="btn"
            href="/compare-trips"
          >
            Compare Tibet journeys
          </Link>

          <Link
            className="btn alt"
            href="/weather-conditions"
          >
            Check Tibet conditions
          </Link>

          <Link
            className="btn alt"
            href="/custom-journey"
          >
            Build private journey
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
          CURRENT INFORMATION
        </span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Research before you finalize.
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
          and operating conditions can change. Journal
          content should be treated as planning guidance,
          while current information should be confirmed
          for your nationality, travel dates and intended
          Tibet route.
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
          YOUR TIBET JOURNEY
        </span>

        <h2
          style={{
            marginTop: 16,
            marginBottom: 12,
            fontSize: "clamp(30px, 5vw, 46px)",
          }}
        >
          Inspired by something you found here?
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Use the AI planner to develop your idea or send
          us your dates, interests and priorities to
          start building a Tibet journey.
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
            href="/ai-trip-planner"
          >
            Ask the Tibet AI planner
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

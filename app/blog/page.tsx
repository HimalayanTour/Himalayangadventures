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
      "Explore the idea of traveling from Lhasa toward Everest through central Tibet, with high-altitude landscapes and changing conditions along the route.",
    href: "/tours/lhasa-everest-base-camp",
  },
  {
    category: "PLANNING",
    title: "Why pacing matters at altitude",
    excerpt:
      "High-altitude journeys need thoughtful pacing, acclimatization and realistic travel days. Slower planning can create a better Tibet experience.",
    href: "/himalayan-guide",
  },
];

const journalPosts = [
  {
    category: "LHOKA",
    title: "Discovering southern Tibet beyond Lhasa",
    excerpt:
      "Lhoka offers valleys, cultural heritage, monasteries and historic landscapes for travelers interested in a quieter side of Tibet.",
    href: "/tours/lhoka-southern-tibet",
  },
  {
    category: "WEATHER",
    title: "Understanding conditions on the Tibetan Plateau",
    excerpt:
      "Weather, elevation and local geography can create very different conditions across Tibet. Use current information as part of your journey planning.",
    href: "/weather-conditions",
  },
  {
    category: "RESPONSIBLE TRAVEL",
    title: "Traveling through Tibet with respect",
    excerpt:
      "Thoughtful photography, respect for sacred places, local guidance and responsible travel habits can make a meaningful difference.",
    href: "/responsible-travel",
  },
  {
    category: "MOUNT KAILASH",
    title: "Planning a journey to western Tibet",
    excerpt:
      "Long distances, high altitude and changing conditions make careful preparation especially important for journeys toward Mount Kailash.",
    href: "/tours/kailash-mansarovar-journey",
  },
  {
    category: "PHOTOGRAPHY",
    title: "Photographing Tibet's landscapes and culture",
    excerpt:
      "Changing light, vast plateau scenery and cultural places create remarkable photography opportunities when approached with time and respect.",
    href: "/photography-tours",
  },
  {
    category: "CUSTOM JOURNEYS",
    title: "When a private Tibet itinerary makes more sense",
    excerpt:
      "If your dates, interests or preferred pace do not fit a standard journey, a custom itinerary can provide greater flexibility.",
    href: "/custom-journey",
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
      <section
        className="card"
        style={{
          padding: "clamp(28px, 5vw, 56px)",
          marginBottom: 38,
        }}
      >
        <span className="pill">TIBET JOURNAL</span>

        <h1
          style={{
            marginTop: 18,
            marginBottom: 18,
            fontSize: "clamp(42px, 7vw, 76px)",
            lineHeight: 1,
            maxWidth: 950,
          }}
        >
          Stories, planning notes
          <br />
          and Tibet insight.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Explore practical Tibet travel ideas, cultural inspiration,
          high-altitude guidance and planning notes for journeys across the
          Tibetan Plateau.
        </p>

        <div
          className="actions"
          style={{
            marginTop: 28,
          }}
        >
          <Link className="btn" href="/ai-trip-planner">
            Plan with AI
          </Link>

          <Link className="btn alt" href="/tours">
            Explore Tibet journeys
          </Link>
        </div>
      </section>

      <section>
        <span className="pill">FEATURED</span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 42px)",
          }}
        >
          Start here
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 760,
            lineHeight: 1.7,
          }}
        >
          Useful planning reads for travelers beginning to explore Tibet,
          compare journeys and prepare for high-altitude travel.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
                Read more
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        style={{
          marginTop: 42,
        }}
      >
        <span className="pill">JOURNAL NOTES</span>

        <h2
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: "clamp(28px, 4vw, 42px)",
          }}
        >
          Ideas for smarter Tibet travel
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
              }}
            >
              <span className="pill">{post.category}</span>

              <h3
                style={{
                  marginTop: 18,
                  marginBottom: 10,
                  fontSize: 22,
                }}
              >
                {post.title}
              </h3>

              <p
                className="muted"
                style={{
                  lineHeight: 1.7,
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

      <section
        className="card"
        style={{
          marginTop: 38,
          padding: "clamp(26px, 4vw, 40px)",
        }}
      >
        <span className="pill">LIVE PLANNING</span>

        <h2
          style={{
            marginTop: 14,
            fontSize: "clamp(28px, 4vw, 40px)",
          }}
        >
          Turn inspiration into a Tibet journey
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            lineHeight: 1.7,
          }}
        >
          Once you have an idea of what you want to experience in Tibet,
          compare journeys, check current conditions or build a private trip
          around your dates and priorities.
        </p>

        <div
          className="actions"
          style={{
            marginTop: 24,
          }}
        >
          <Link className="btn" href="/compare-trips">
            Compare trips
          </Link>

          <Link className="btn alt" href="/weather-conditions">
            Check conditions
          </Link>

          <Link className="btn alt" href="/custom-journey">
            Build custom journey
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
        <span className="pill">YOUR TIBET JOURNEY</span>

        <h2
          style={{
            marginTop: 16,
            marginBottom: 12,
            fontSize: "clamp(30px, 5vw, 46px)",
          }}
        >
          Inspired by something you read?
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 720,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Use the AI planner for ideas or send us your dates and priorities to
          start building a private Tibet journey.
        </p>

        <div
          className="actions"
          style={{
            justifyContent: "center",
            marginTop: 26,
          }}
        >
          <Link className="btn" href="/ai-trip-planner">
            Ask the AI planner
          </Link>

          <Link className="btn alt" href="/contact-book">
            Request a Tibet trip
          </Link>
        </div>
      </section>
    </main>
  );
}

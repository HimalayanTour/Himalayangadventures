import Link from "next/link";

const featuredPosts = [
  {
    category: "EVEREST",
    title: "How to prepare for Everest Base Camp",
    excerpt:
      "A practical overview of altitude, pacing, weather, packing and what first-time trekkers should understand before the journey.",
    href: "/tours/everest-base-camp",
  },
  {
    category: "ANNAPURNA",
    title: "Everest or Annapurna: which journey fits you?",
    excerpt:
      "Two iconic Himalayan experiences with different scenery, pacing and trekking styles. Compare them before choosing.",
    href: "/compare-trips",
  },
  {
    category: "PLANNING",
    title: "Why acclimatization days matter",
    excerpt:
      "High-altitude itineraries should be built around the body, not just the calendar. Learn why slower can be smarter.",
    href: "/himalayan-guide",
  },
];

const journalPosts = [
  {
    category: "NEPAL",
    title: "A first Himalayan journey: where should you begin?",
    excerpt:
      "A simple way to think about Nepal, Bhutan, Tibet and Ladakh based on time, altitude and travel style.",
    href: "/explore",
  },
  {
    category: "WEATHER",
    title: "Reading mountain weather before a trek",
    excerpt:
      "Forecasts are useful, but altitude and local terrain can change conditions quickly. Use live data as one part of your planning.",
    href: "/weather-conditions",
  },
  {
    category: "RESPONSIBLE TRAVEL",
    title: "Small choices that make a Himalayan journey better",
    excerpt:
      "Local guides, respectful photography, reduced waste and thoughtful pacing can make a meaningful difference.",
    href: "/responsible-travel",
  },
  {
    category: "PACKING",
    title: "What belongs in a Himalayan trekking bag",
    excerpt:
      "Start with layers, weather protection, comfortable footwear and the essentials you will actually use every day.",
    href: "/himalayan-guide",
  },
  {
    category: "BHUTAN",
    title: "Beyond trekking: mountains, culture and quiet journeys",
    excerpt:
      "The Himalaya is more than high passes. Bhutan offers a different balance of landscape, culture and slower travel.",
    href: "/tours/bhutan-mountain-culture",
  },
  {
    category: "CUSTOM JOURNEYS",
    title: "When a private itinerary makes more sense",
    excerpt:
      "If your dates, interests or pace do not fit a standard tour, a custom journey can give you more flexibility.",
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
        <span className="pill">HIMALAYAN JOURNAL</span>

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
          and mountain insight.
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          Explore practical Himalayan travel ideas, destination inspiration,
          trekking guidance and planning notes for your next journey.
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
            Explore journeys
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
          Useful planning reads for travelers who are starting to compare
          destinations and prepare for high-altitude travel.
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
          Ideas for smarter Himalayan travel
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
          Turn inspiration into a real journey
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: 820,
            lineHeight: 1.7,
          }}
        >
          Once you have an idea of where you want to go, compare trips, check
          current conditions or build a custom journey around your own
          priorities.
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
        <span className="pill">YOUR JOURNEY</span>

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
          start building a Himalayan journey.
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
            Request a trip
          </Link>
        </div>
      </section>
    </main>
  );
}

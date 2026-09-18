"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { tours } from "@/lib/tours";
import TourCard from "@/components/TourCard";
import AIAgent from "@/components/AIAgent";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

const destinations = [
  {
    name: "Nepal",
    label: "EVEREST · ANNAPURNA · MANASLU",
    text: "Classic trekking routes, remote mountain circuits and some of the Himalaya's most recognized landscapes.",
    href: "/nepal",
  },
  {
    name: "Bhutan",
    label: "MOUNTAINS · CULTURE",
    text: "Thoughtfully paced journeys combining Himalayan landscapes with Bhutan's distinctive cultural experience.",
    href: "/bhutan",
  },
  {
    name: "Tibet",
    label: "HIGH PLATEAU · KAILASH",
    text: "High-altitude landscapes and culturally significant journeys across the Tibetan Plateau.",
    href: "/tibet",
  },
  {
    name: "India Himalaya",
    label: "LADAKH · HIGH ALTITUDE",
    text: "Explore the dramatic landscapes and mountain cultures of Ladakh and the Indian Himalaya.",
    href: "/india-himalaya",
  },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="section">
        <div className="container">
          <div
            className="card"
            style={{
              padding: "clamp(38px, 6vw, 76px)",
              background:
                "linear-gradient(135deg, rgba(22,42,49,.98), rgba(13,73,75,.76))",
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 22,
                letterSpacing: ".18em",
              }}
            >
              HIMALAYA · 2026
            </div>

            <h1
              style={{
                maxWidth: 980,
                fontSize: "clamp(52px, 8vw, 88px)",
                lineHeight: 0.95,
                marginBottom: 26,
              }}
            >
              Go higher.
              <br />
              Travel smarter.
            </h1>

            <p
              className="muted"
              style={{
                maxWidth: 850,
                fontSize: 19,
                lineHeight: 1.8,
              }}
            >
              Explore Himalayan journeys across Nepal, Bhutan, Tibet and the
              Indian Himalaya with curated tour information, AI-assisted
              planning, travel research, conditions and interactive maps.
            </p>

            <div
              className="actions"
              style={{
                marginTop: 30,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <Link className="btn" href="/ai-trip-planner">
                Build my trip
              </Link>

              <Link className="btn alt" href="/tours">
                Explore journeys
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK VALUE */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(190px, 1fr))",
              gap: 14,
            }}
          >
            <div className="card" style={{ padding: 22 }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>
                JOURNEYS
              </div>
              <h3 style={{ marginBottom: 8 }}>{tours.length} routes</h3>
              <p className="muted" style={{ margin: 0 }}>
                Across several Himalayan regions.
              </p>
            </div>

            <div className="card" style={{ padding: 22 }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>
                AI PLANNER
              </div>
              <h3 style={{ marginBottom: 8 }}>Plan around you</h3>
              <p className="muted" style={{ margin: 0 }}>
                Turn travel ideas into useful trip criteria.
              </p>
            </div>

            <div className="card" style={{ padding: 22 }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>
                CONDITIONS
              </div>
              <h3 style={{ marginBottom: 8 }}>Stay informed</h3>
              <p className="muted" style={{ margin: 0 }}>
                Keep mountain weather and conditions visible.
              </p>
            </div>

            <div className="card" style={{ padding: 22 }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>
                CUSTOM TRAVEL
              </div>
              <h3 style={{ marginBottom: 8 }}>Build your own</h3>
              <p className="muted" style={{ margin: 0 }}>
                Shape a journey around your priorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR JOURNEYS */}
      <section className="section">
        <div className="container">
          <div
            className="eyebrow"
            style={{
              marginBottom: 14,
              letterSpacing: ".16em",
            }}
          >
            FEATURED JOURNEYS
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: 24,
              flexWrap: "wrap",
              marginBottom: 28,
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(34px, 5vw, 50px)",
                  marginBottom: 12,
                }}
              >
                Start with the classics.
              </h2>

              <p
                className="muted"
                style={{
                  maxWidth: 760,
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                Explore some of our featured Himalayan journeys, then compare
                routes or create a private itinerary around your own dates and
                interests.
              </p>
            </div>

            <Link className="btn alt" href="/tours">
              View all journeys
            </Link>
          </div>

          <div className="grid">
            {tours.slice(0, 6).map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="section">
        <div className="container">
          <div
            className="eyebrow"
            style={{
              marginBottom: 14,
              letterSpacing: ".16em",
            }}
          >
            EXPLORE THE HIMALAYA
          </div>

          <h2
            style={{
              fontSize: "clamp(34px, 5vw, 50px)",
              marginBottom: 14,
            }}
          >
            Four regions. Different ways to travel.
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 820,
              lineHeight: 1.8,
              marginBottom: 30,
            }}
          >
            The Himalaya is not one destination. Compare landscapes, travel
            styles, cultural experiences and altitude before deciding where
            your journey should begin.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {destinations.map((destination) => (
              <Link
                key={destination.name}
                href={destination.href}
                className="card"
                style={{
                  padding: 26,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <div
                  className="eyebrow"
                  style={{
                    marginBottom: 14,
                    letterSpacing: ".12em",
                  }}
                >
                  {destination.label}
                </div>

                <h3
                  style={{
                    fontSize: 25,
                    marginBottom: 12,
                  }}
                >
                  {destination.name}
                </h3>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {destination.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI + MAP */}
      <section className="section">
        <div className="container">
          <div
            className="eyebrow"
            style={{
              marginBottom: 14,
              letterSpacing: ".16em",
            }}
          >
            SMARTER PLANNING
          </div>

          <h2
            style={{
              fontSize: "clamp(34px, 5vw, 50px)",
              marginBottom: 14,
            }}
          >
            Explore before you decide.
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: 820,
              lineHeight: 1.8,
              marginBottom: 30,
            }}
          >
            Ask the planning assistant about destinations and journey styles,
            then use the map to understand where your Himalayan adventure could
            take you.
          </p>

          <div className="layout2">
            <AIAgent />

            <div>
              <div
                className="card"
                style={{
                  padding: 22,
                  marginBottom: 14,
                }}
              >
                <div className="eyebrow" style={{ marginBottom: 10 }}>
                  INTERACTIVE MAP
                </div>

                <h3 style={{ marginBottom: 10 }}>
                  See the Himalaya geographically.
                </h3>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Explore the regions and connect destination names with the
                  wider Himalayan landscape.
                </p>
              </div>

              <Map />
            </div>
          </div>
        </div>
      </section>

      {/* TRAVEL YOUR WAY */}
      <section className="section">
        <div className="container">
          <div
            className="eyebrow"
            style={{
              marginBottom: 14,
              letterSpacing: ".16em",
            }}
          >
            TRAVEL YOUR WAY
          </div>

          <h2
            style={{
              fontSize: "clamp(34px, 5vw, 50px)",
              marginBottom: 28,
            }}
          >
            More than one way to experience the mountains.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 16,
            }}
          >
            <Link
              href="/adventure"
              className="card"
              style={{
                padding: 24,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="eyebrow" style={{ marginBottom: 12 }}>
                ADVENTURE
              </div>
              <h3 style={{ marginBottom: 10 }}>Go further</h3>
              <p className="muted">
                Trekking routes, remote landscapes and challenging journeys.
              </p>
            </Link>

            <Link
              href="/culture-heritage"
              className="card"
              style={{
                padding: 24,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="eyebrow" style={{ marginBottom: 12 }}>
                CULTURE
              </div>
              <h3 style={{ marginBottom: 10 }}>Travel deeper</h3>
              <p className="muted">
                Build cultural understanding into the journey.
              </p>
            </Link>

            <Link
              href="/photography-tours"
              className="card"
              style={{
                padding: 24,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="eyebrow" style={{ marginBottom: 12 }}>
                PHOTOGRAPHY
              </div>
              <h3 style={{ marginBottom: 10 }}>Follow the light</h3>
              <p className="muted">
                Travel with more time for landscapes, atmosphere and place.
              </p>
            </Link>

            <Link
              href="/luxury-himalaya"
              className="card"
              style={{
                padding: 24,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="eyebrow" style={{ marginBottom: 12 }}>
                COMFORT
              </div>
              <h3 style={{ marginBottom: 10 }}>Travel at your pace</h3>
              <p className="muted">
                Private planning, better pacing and greater comfort.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section">
        <div className="container">
          <div
            className="card"
            style={{
              padding: "clamp(32px, 5vw, 54px)",
              background:
                "linear-gradient(135deg, rgba(19,58,61,.9), rgba(16,35,42,.96))",
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              YOUR HIMALAYA
            </div>

            <h2
              style={{
                maxWidth: 850,
                fontSize: "clamp(36px, 5vw, 54px)",
                lineHeight: 1.05,
                marginBottom: 16,
              }}
            >
              Start with an idea.
              <br />
              Build the right journey.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: 760,
                lineHeight: 1.8,
              }}
            >
              Explore existing journeys, compare your options or tell us what
              you want from the Himalaya and start building a trip around you.
            </p>

            <div
              className="actions"
              style={{
                marginTop: 26,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <Link className="btn" href="/ai-trip-planner">
                Build my trip
              </Link>

              <Link className="btn alt" href="/tours">
                Explore tours
              </Link>

              <Link className="btn alt" href="/contact-book">
                Request a trip
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

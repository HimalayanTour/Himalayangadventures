"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { tours } from "@/lib/tours";
import TourCard from "@/components/TourCard";
import AIAgent from "@/components/AIAgent";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

const regions = [
  {
    name: "Lhasa",
    label: "PALACES · MONASTERIES · CULTURE",
    text: "Begin in Tibet's historic capital with time for acclimatization, architecture, monasteries and everyday Tibetan culture.",
    href: "/tibet",
  },
  {
    name: "Lhoka (Southern Tibet)",
    label: "VALLEYS · HERITAGE · SOUTHERN TIBET",
    text: "Explore the valleys, cultural heritage and historic landscapes of Lhoka, a quieter journey through southern Tibet beyond Lhasa.",
    href: "/tours/lhoka-southern-tibet",
  },
  {
    name: "Everest",
    label: "PLATEAU · HIMALAYA · BASE CAMP",
    text: "Cross the Tibetan Plateau toward the north side of Mount Everest through high passes, monasteries and vast mountain landscapes.",
    href: "/tours/lhasa-everest-base-camp",
  },
  {
    name: "Mount Kailash",
    label: "KORA · PILGRIMAGE · WESTERN TIBET",
    text: "Journey across western Tibet toward Mount Kailash and experience one of the plateau's most significant pilgrimage landscapes.",
    href: "/tours/kailash-kora",
  },
  {
    name: "Namtso & the Plateau",
    label: "LAKES · NOMADIC LANDSCAPES · HIGH ALTITUDE",
    text: "Discover high-altitude lakes, open grasslands and the immense scale of the Tibetan Plateau beyond the major cities.",
    href: "/tours/namtso-lake",
  },
];

const travelStyles = [
  {
    label: "CULTURE",
    title: "Travel deeper",
    text: "Explore monasteries, historic cities, pilgrimage traditions and Tibetan cultural landscapes.",
    href: "/culture-heritage",
  },
  {
    label: "ADVENTURE",
    title: "Go further",
    text: "Cross high passes and remote plateau landscapes on carefully paced high-altitude journeys.",
    href: "/adventure",
  },
  {
    label: "PHOTOGRAPHY",
    title: "Follow the light",
    text: "Make more time for Himalayan landscapes, monasteries, lakes and the changing light of the plateau.",
    href: "/photography-tours",
  },
  {
    label: "PRIVATE",
    title: "Travel your way",
    text: "Build a private Tibet journey around your dates, interests, pace and preferred level of comfort.",
    href: "/custom-journey",
  },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section
        style={{
          minHeight: "calc(100vh - 74px)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(3, 14, 20, 0.94) 0%,
              rgba(3, 14, 20, 0.74) 42%,
              rgba(3, 14, 20, 0.3) 72%,
              rgba(3, 14, 20, 0.18) 100%
            ),
            linear-gradient(
              0deg,
              rgba(3, 14, 20, 0.78) 0%,
              transparent 42%
            ),
            url("/home-hero.jpg")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 72% 35%, rgba(109,224,194,.09), transparent 30%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 2,
            paddingTop: "70px",
            paddingBottom: "70px",
          }}
        >
          <div style={{ maxWidth: "920px" }}>
            <div
              className="eyebrow"
              style={{
                marginBottom: "22px",
                letterSpacing: ".2em",
              }}
            >
              TIBET JOURNEYS · 2026
            </div>

            <h1
              style={{
                fontSize: "clamp(56px, 8.5vw, 112px)",
                lineHeight: 0.88,
                letterSpacing: "-0.065em",
                margin: 0,
                maxWidth: "920px",
                textShadow: "0 8px 40px rgba(0,0,0,.35)",
              }}
            >
              Journey across
              <br />
              the high plateau.
            </h1>

            <p
              style={{
                maxWidth: "730px",
                marginTop: "30px",
                marginBottom: 0,
                fontSize: "clamp(17px, 2vw, 21px)",
                lineHeight: 1.7,
                color: "rgba(238,246,247,.82)",
                textShadow: "0 3px 20px rgba(0,0,0,.4)",
              }}
            >
              Thoughtfully designed journeys through Tibet — from Lhasa and
              Everest to Mount Kailash, sacred lakes, monasteries and the vast
              landscapes of the Tibetan Plateau.
            </p>

            <div
              className="actions"
              style={{
                marginTop: "34px",
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <Link className="btn" href="/ai-trip-planner">
                Plan my Tibet journey
              </Link>

              <Link className="btn alt" href="/tours">
                Explore Tibet tours
              </Link>
            </div>
          </div>

          <div
            style={{
              marginTop: "70px",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(150px, 1fr))",
              maxWidth: "760px",
              borderTop: "1px solid rgba(255,255,255,.18)",
              paddingTop: "24px",
              gap: "20px",
            }}
          >
            <div>
              <strong
                style={{
                  display: "block",
                  fontSize: "30px",
                  marginBottom: "4px",
                }}
              >
                {tours.length}
              </strong>
              <span className="muted">Tibet journeys</span>
            </div>

            <div>
              <strong
                style={{
                  display: "block",
                  fontSize: "30px",
                  marginBottom: "4px",
                }}
              >
                1
              </strong>
              <span className="muted">Specialist destination</span>
            </div>

            <div>
              <strong
                style={{
                  display: "block",
                  fontSize: "30px",
                  marginBottom: "4px",
                }}
              >
                AI
              </strong>
              <span className="muted">Assisted planning</span>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: "4%",
            bottom: "32px",
            color: "rgba(255,255,255,.65)",
            fontSize: "12px",
            letterSpacing: ".14em",
            writingMode: "vertical-rl",
          }}
        >
          EXPLORE TIBET
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "34px",
              alignItems: "end",
            }}
          >
            <div>
              <div
                className="eyebrow"
                style={{ marginBottom: "14px", letterSpacing: ".16em" }}
              >
                TIBET, YOUR WAY
              </div>

              <h2
                style={{
                  fontSize: "clamp(38px, 6vw, 64px)",
                  lineHeight: 1,
                  margin: 0,
                  maxWidth: "720px",
                }}
              >
                One extraordinary destination. Many ways to experience it.
              </h2>
            </div>

            <div>
              <p
                className="muted"
                style={{
                  fontSize: "17px",
                  lineHeight: 1.85,
                  margin: 0,
                }}
              >
                Explore Lhasa, Lhoka, Shigatse, Everest, Namtso, Mount Kailash and
                remote plateau landscapes through journeys shaped around
                altitude, culture, scenery and your preferred pace.
              </p>

              <div className="actions" style={{ marginTop: "22px" }}>
                <Link className="btn alt" href="/tibet">
                  Discover Tibet
                </Link>

                <Link className="btn alt" href="/travel-intent">
                  Find my travel style
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED JOURNEYS */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: "24px",
              flexWrap: "wrap",
              marginBottom: "30px",
            }}
          >
            <div>
              <div
                className="eyebrow"
                style={{ marginBottom: "14px", letterSpacing: ".16em" }}
              >
                SIGNATURE TIBET JOURNEYS
              </div>

              <h2
                style={{
                  fontSize: "clamp(38px, 5vw, 58px)",
                  margin: 0,
                }}
              >
                Begin with an icon.
              </h2>

              <p
                className="muted"
                style={{
                  maxWidth: "720px",
                  lineHeight: 1.8,
                  marginTop: "14px",
                  marginBottom: 0,
                }}
              >
                Start with Tibet's classic routes, then shape the journey
                around your dates, interests, altitude experience and pace.
              </p>
            </div>

            <Link className="btn alt" href="/tours">
              View all {tours.length} journeys
            </Link>
          </div>

          <div className="grid">
            {tours.slice(0, 6).map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* TIBET REGIONS */}
      <section className="section">
        <div className="container">
          <div
            className="card"
            style={{
              padding: "clamp(28px, 5vw, 54px)",
              background:
                "linear-gradient(135deg, rgba(16,39,47,.96), rgba(10,62,63,.58))",
            }}
          >
            <div
              className="eyebrow"
              style={{ marginBottom: "14px", letterSpacing: ".16em" }}
            >
              EXPLORE TIBET
            </div>

            <h2
              style={{
                fontSize: "clamp(38px, 5vw, 58px)",
                maxWidth: "800px",
                marginTop: 0,
                marginBottom: "18px",
              }}
            >
              From Lhasa to the
              <br />
              far western plateau.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: "760px",
                lineHeight: 1.8,
                marginBottom: "32px",
              }}
            >
              Explore different sides of Tibet — historic cities, Himalayan
              viewpoints, sacred landscapes, high-altitude lakes and remote
              plateau routes.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(230px, 1fr))",
                gap: "14px",
              }}
            >
              {regions.map((region) => (
                <Link
                  key={region.name}
                  href={region.href}
                  style={{
                    display: "block",
                    padding: "24px",
                    borderRadius: "18px",
                    border: "1px solid rgba(255,255,255,.1)",
                    background: "rgba(5,18,24,.38)",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <div
                    className="eyebrow"
                    style={{
                      marginBottom: "14px",
                      letterSpacing: ".1em",
                      fontSize: "10px",
                    }}
                  >
                    {region.label}
                  </div>

                  <h3
                    style={{
                      fontSize: "26px",
                      marginTop: 0,
                      marginBottom: "12px",
                    }}
                  >
                    {region.name}
                  </h3>

                  <p
                    className="muted"
                    style={{
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {region.text}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SMART PLANNING */}
      <section className="section">
        <div className="container">
          <div
            className="eyebrow"
            style={{ marginBottom: "14px", letterSpacing: ".16em" }}
          >
            INTELLIGENT TIBET PLANNING
          </div>

          <h2
            style={{
              fontSize: "clamp(38px, 5vw, 58px)",
              maxWidth: "800px",
              marginTop: 0,
              marginBottom: "14px",
            }}
          >
            Turn an idea into a smarter Tibet journey.
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: "820px",
              lineHeight: 1.8,
              marginBottom: "32px",
            }}
          >
            Use the planning assistant to explore routes, compare journey
            ideas and think through duration, altitude, interests and pacing.
            Then see how the journeys connect across Tibet.
          </p>

          <div className="layout2">
            <AIAgent />

            <div>
              <div
                className="card"
                style={{
                  padding: "22px",
                  marginBottom: "14px",
                }}
              >
                <div
                  className="eyebrow"
                  style={{ marginBottom: "10px" }}
                >
                  INTERACTIVE TIBET MAP
                </div>

                <h3 style={{ marginBottom: "10px" }}>
                  Understand the plateau.
                </h3>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Explore the locations behind our journeys, from Lhasa and
                  Lhoka to Shigatse, Everest, Namtso and Mount Kailash.
                </p>
              </div>

              <Map />
            </div>
          </div>
        </div>
      </section>

      {/* TRAVEL STYLES */}
      <section className="section">
        <div className="container">
          <div
            className="eyebrow"
            style={{ marginBottom: "14px", letterSpacing: ".16em" }}
          >
            CHOOSE YOUR WAY
          </div>

          <h2
            style={{
              fontSize: "clamp(38px, 5vw, 58px)",
              marginTop: 0,
              marginBottom: "30px",
            }}
          >
            Experience Tibet your way.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "16px",
            }}
          >
            {travelStyles.map((style) => (
              <Link
                key={style.label}
                href={style.href}
                className="card"
                style={{
                  minHeight: "240px",
                  padding: "26px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  textDecoration: "none",
                  color: "inherit",
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,.07), rgba(255,255,255,.025))",
                }}
              >
                <div
                  className="eyebrow"
                  style={{ marginBottom: "12px" }}
                >
                  {style.label}
                </div>

                <h3
                  style={{
                    fontSize: "27px",
                    marginBottom: "10px",
                  }}
                >
                  {style.title}
                </h3>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {style.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section">
        <div className="container">
          <div
            className="card"
            style={{
              padding: "clamp(38px, 6vw, 72px)",
              textAlign: "center",
              background:
                "radial-gradient(circle at 50% 0%, rgba(109,224,194,.18), transparent 42%), linear-gradient(135deg, rgba(15,48,54,.96), rgba(7,25,32,.98))",
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: "16px",
                letterSpacing: ".18em",
              }}
            >
              YOUR TIBET JOURNEY
            </div>

            <h2
              style={{
                maxWidth: "850px",
                margin: "0 auto",
                fontSize: "clamp(42px, 6vw, 68px)",
                lineHeight: 1,
              }}
            >
              Start with an idea.
              <br />
              Build the right journey.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: "720px",
                margin: "22px auto 0",
                lineHeight: 1.8,
                fontSize: "17px",
              }}
            >
              Explore our Tibet journeys, compare routes or tell us what
              matters to you and begin creating a journey around your dates,
              interests and preferred pace.
            </p>

            <div
              className="actions"
              style={{
                marginTop: "30px",
                justifyContent: "center",
              }}
            >
              <Link className="btn" href="/ai-trip-planner">
                Plan Tibet with AI
              </Link>

              <Link className="btn alt" href="/custom-journey">
                Create a private journey
              </Link>

              <Link className="btn alt" href="/contact-book">
                Request a Tibet trip
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

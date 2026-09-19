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

const travelStyles = [
  {
    label: "ADVENTURE",
    title: "Go further",
    text: "Trekking routes, remote landscapes and challenging journeys.",
    href: "/adventure",
  },
  {
    label: "CULTURE",
    title: "Travel deeper",
    text: "Build cultural understanding into the journey.",
    href: "/culture-heritage",
  },
  {
    label: "PHOTOGRAPHY",
    title: "Follow the light",
    text: "Travel with more time for landscapes, atmosphere and place.",
    href: "/photography-tours",
  },
  {
    label: "COMFORT",
    title: "Travel at your pace",
    text: "Private planning, better pacing and greater comfort.",
    href: "/luxury-himalaya",
  },
];

export default function Home() {
  return (
    <main>
      {/* CINEMATIC HERO */}
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
              rgba(3, 14, 20, 0.92) 0%,
              rgba(3, 14, 20, 0.72) 42%,
              rgba(3, 14, 20, 0.28) 72%,
              rgba(3, 14, 20, 0.18) 100%
            ),
            linear-gradient(
              0deg,
              rgba(3, 14, 20, 0.75) 0%,
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
              "radial-gradient(circle at 72% 35%, rgba(109,224,194,.08), transparent 30%)",
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
          <div style={{ maxWidth: "900px" }}>
            <div
              className="eyebrow"
              style={{
                marginBottom: "22px",
                letterSpacing: ".2em",
              }}
            >
              HIMALAYAN JOURNEYS · 2026
            </div>

            <h1
              style={{
                fontSize: "clamp(56px, 8.5vw, 112px)",
                lineHeight: 0.88,
                letterSpacing: "-0.065em",
                margin: 0,
                maxWidth: "900px",
                textShadow: "0 8px 40px rgba(0,0,0,.35)",
              }}
            >
              Go beyond
              <br />
              the ordinary.
            </h1>

            <p
              style={{
                maxWidth: "720px",
                marginTop: "30px",
                marginBottom: 0,
                fontSize: "clamp(17px, 2vw, 21px)",
                lineHeight: 1.7,
                color: "rgba(238,246,247,.82)",
                textShadow: "0 3px 20px rgba(0,0,0,.4)",
              }}
            >
              Thoughtfully designed Himalayan journeys across Nepal, Bhutan,
              Tibet and the Indian Himalaya — combining mountain experience,
              cultural understanding and smarter trip planning.
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
                Build my journey
              </Link>

              <Link className="btn alt" href="/tours">
                Explore the Himalaya
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
              <span className="muted">Curated journeys</span>
            </div>

            <div>
              <strong
                style={{
                  display: "block",
                  fontSize: "30px",
                  marginBottom: "4px",
                }}
              >
                4
              </strong>
              <span className="muted">Himalayan regions</span>
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
          EXPLORE THE HIMALAYA
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
                THE HIMALAYA, YOUR WAY
              </div>

              <h2
                style={{
                  fontSize: "clamp(38px, 6vw, 64px)",
                  lineHeight: 1,
                  margin: 0,
                  maxWidth: "720px",
                }}
              >
                Extraordinary places deserve thoughtful journeys.
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
                From Everest and Annapurna to Bhutan, Tibet and Ladakh, explore
                routes shaped around landscape, culture, altitude and the way
                you want to travel.
              </p>

              <div className="actions" style={{ marginTop: "22px" }}>
                <Link className="btn alt" href="/explore">
                  Start exploring
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
                SIGNATURE JOURNEYS
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
                Discover classic Himalayan routes and culturally rich journeys,
                then adapt the experience around your own dates and priorities.
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

      {/* DESTINATIONS */}
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
              FOUR HIMALAYAN REGIONS
            </div>

            <h2
              style={{
                fontSize: "clamp(38px, 5vw, 58px)",
                maxWidth: "800px",
                marginTop: 0,
                marginBottom: "18px",
              }}
            >
              One mountain world.
              <br />
              Many ways to experience it.
            </h2>

            <p
              className="muted"
              style={{
                maxWidth: "760px",
                lineHeight: 1.8,
                marginBottom: "32px",
              }}
            >
              Compare landscapes, cultures, altitude and journey styles before
              choosing where your Himalayan experience should begin.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(230px, 1fr))",
                gap: "14px",
              }}
            >
              {destinations.map((destination) => (
                <Link
                  key={destination.name}
                  href={destination.href}
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
                    {destination.label}
                  </div>

                  <h3
                    style={{
                      fontSize: "26px",
                      marginTop: 0,
                      marginBottom: "12px",
                    }}
                  >
                    {destination.name}
                  </h3>

                  <p
                    className="muted"
                    style={{
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {destination.text}
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
            INTELLIGENT TRAVEL PLANNING
          </div>

          <h2
            style={{
              fontSize: "clamp(38px, 5vw, 58px)",
              maxWidth: "800px",
              marginTop: 0,
              marginBottom: "14px",
            }}
          >
            Inspiration meets useful information.
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: "820px",
              lineHeight: 1.8,
              marginBottom: "32px",
            }}
          >
            Use the planning assistant to explore destinations, compare ideas
            and turn a vague travel wish into a more useful Himalayan journey.
            Then see where those journeys sit across the mountain region.
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
                  INTERACTIVE HIMALAYAN MAP
                </div>

                <h3 style={{ marginBottom: "10px" }}>
                  Understand the landscape.
                </h3>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Explore the locations behind our journeys and connect each
                  destination with the wider Himalayan region.
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
            The mountains are only the beginning.
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
              YOUR HIMALAYA
            </div>

            <h2
              style={{
                maxWidth: "850px",
                margin: "0 auto",
                fontSize: "clamp(42px, 6vw, 68px)",
                lineHeight: 1,
              }}
            >
              Start with a dream.
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
              Explore our journeys, compare routes or tell us what matters to
              you and begin creating a Himalayan experience around your own
              priorities.
            </p>

            <div
              className="actions"
              style={{
                marginTop: "30px",
                justifyContent: "center",
              }}
            >
              <Link className="btn" href="/ai-trip-planner">
                Plan with AI
              </Link>

              <Link className="btn alt" href="/custom-journey">
                Create a private journey
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

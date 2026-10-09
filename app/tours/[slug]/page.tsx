
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTour, tours } from "@/lib/tours";
import BookingForm from "@/components/BookingForm";

const baseUrl =
  "https://himalayangadventures.vercel.app";

// TOUR PHOTOGRAPHS
// /5.png is a temporary photo for Ganden to Samye Trek.
const images: Record<string, string> = {
  "lhasa-classic": "/lhasa.jpg",
  "lhasa-everest-base-camp": "/tibet-everest.jpg",
  "lhoka-southern-tibet": "/5.png",
  "tibet-high-plateau": "/tibethighplateau.jpg",
  "kailash-mansarovar-journey": "/mount-kailash.jpg",
  "ganden-samye-trek": "/5.png",
  "namtso-lake": "/namtso.jpg",
  "tibet-photography": "/photographyjourney.jpg",
  "tibet-culture-monasteries": "/tibetculture.jpg",
};

// HIGHLIGHTS FOR ALL NINE TIBET TOURS
const highlights: Record<string, string[]> = {
  "lhasa-classic": [
    "Explore the cultural heart of Lhasa",
    "Visit important monasteries and historic quarters",
    "Allow time for gradual altitude acclimatization",
    "Experience Tibetan culture at a thoughtful pace",
  ],

  "lhasa-everest-base-camp": [
    "Travel from Lhasa across the Tibetan Plateau",
    "Explore Gyantse and Shigatse along the route",
    "Cross dramatic high-altitude passes",
    "Reach the Everest region on the north side of the Himalaya",
  ],

  "lhoka-southern-tibet": [
    "Explore Lhoka and the landscapes of southern Tibet",
    "Discover important cultural and historic places",
    "Travel through valleys, settlements and plateau scenery",
    "Experience a quieter side of Tibet beyond Lhasa",
  ],

  "tibet-high-plateau": [
    "Travel across the immense Tibetan Plateau",
    "Experience high-altitude landscapes and mountain horizons",
    "Visit monasteries and culturally significant places",
    "Explore Tibet with time for acclimatization and local conditions",
  ],

  "kailash-mansarovar-journey": [
    "Journey across western Tibet toward Mount Kailash",
    "Experience the landscape around Lake Manasarovar",
    "Travel through remote high-altitude regions",
    "Discover an important pilgrimage landscape",
  ],

  "ganden-samye-trek": [
    "Follow a classic trekking route between Ganden and Samye monasteries",
    "Experience remote alpine valleys and dramatic mountain passes",
    "Discover high-altitude landscapes away from major roads",
    "Plan a challenging supported trek with guides, acclimatization and weather awareness",
  ],

  "namtso-lake": [
    "Travel from Lhasa toward the high plateau",
    "Experience the landscapes around Namtso",
    "See vast open scenery and mountain horizons",
    "Combine cultural exploration with high-altitude nature",
  ],

  "tibet-photography": [
    "Photograph Tibet's high-altitude landscapes",
    "Make more time for changing light and atmosphere",
    "Explore cultural and architectural subjects",
    "Balance photography opportunities with realistic plateau pacing",
  ],

  "tibet-culture-monasteries": [
    "Explore Tibetan monasteries and historic places",
    "Spend time in Lhasa and culturally important areas",
    "Learn about living traditions and pilgrimage culture",
    "Travel with respect for local customs and sacred spaces",
  ],
};

type RouteOutline = {
  opening: string;
  middle: string;
  focus: string;
  ending: string;
};

// PLANNING OUTLINES FOR ALL NINE TOURS
const routeFocus: Record<string, RouteOutline> = {
  "lhasa-classic": {
    opening:
      "Arrive in Lhasa and begin with a gentle schedule designed around altitude adjustment.",
    middle:
      "Explore Lhasa's historic quarters, cultural landmarks and important monasteries.",
    focus:
      "Spend time experiencing the city at a comfortable pace rather than rushing between sights.",
    ending:
      "Complete the Lhasa experience with time for final visits and onward travel arrangements.",
  },

  "lhasa-everest-base-camp": {
    opening:
      "Begin in Lhasa with acclimatization and cultural exploration before traveling higher.",
    middle:
      "Journey through central Tibet toward Gyantse and Shigatse, crossing changing plateau landscapes.",
    focus:
      "Continue toward the Everest region with high passes, Himalayan viewpoints and flexible pacing for altitude and conditions.",
    ending:
      "Complete the Everest section and continue according to the confirmed route and current access arrangements.",
  },

  "lhoka-southern-tibet": {
    opening:
      "Begin in Lhasa with time for acclimatization before traveling toward southern Tibet.",
    middle:
      "Journey into the Lhoka region through valleys, settlements and changing plateau landscapes.",
    focus:
      "Explore the cultural heritage and landscapes of southern Tibet at a thoughtful pace.",
    ending:
      "Complete the Lhoka journey and return or continue according to the confirmed itinerary and current travel arrangements.",
  },

  "tibet-high-plateau": {
    opening:
      "Begin with gradual acclimatization before moving deeper into the Tibetan Plateau.",
    middle:
      "Travel through high-altitude valleys, settlements and culturally important locations.",
    focus:
      "Experience the scale of the plateau with a route shaped around landscape, altitude and local conditions.",
    ending:
      "Complete the plateau journey with sufficient flexibility for road, weather and access conditions.",
  },

  "kailash-mansarovar-journey": {
    opening:
      "Begin with acclimatization and preparation before the longer journey toward western Tibet.",
    middle:
      "Travel west through changing plateau landscapes with carefully planned altitude progression.",
    focus:
      "Experience the Mount Kailash and Lake Manasarovar region with respect for its cultural and pilgrimage significance.",
    ending:
      "Complete the western Tibet journey and return according to the confirmed route and current access arrangements.",
  },

  "ganden-samye-trek": {
    opening:
      "Arrive in Lhasa, allow time to acclimatize and prepare your trekking equipment. Meet the local team and review the planned route.",
    middle:
      "Travel toward Ganden Monastery and begin the supported trek through alpine valleys and remote mountain landscapes, subject to local access.",
    focus:
      "Trek through demanding high-altitude terrain and over mountain passes, with camping and daily distances adjusted to weather, altitude and group fitness.",
    ending:
      "Continue toward Samye Monastery, complete the trekking route where conditions permit, and return to Lhasa according to the confirmed itinerary.",
  },

  "namtso-lake": {
    opening:
      "Begin in Lhasa with a gentle schedule and time for altitude adjustment.",
    middle:
      "Explore cultural sites before traveling farther into the high plateau.",
    focus:
      "Journey toward Namtso and experience high-altitude lake and mountain landscapes.",
    ending:
      "Return toward Lhasa with flexibility for weather, road and access conditions.",
  },

  "tibet-photography": {
    opening:
      "Begin in Lhasa with acclimatization and introductory photography opportunities.",
    middle:
      "Travel through selected cultural and landscape locations with more time for observation and changing light.",
    focus:
      "Balance photographic opportunities with altitude, travel distances and respectful photography practices.",
    ending:
      "Complete the journey with final photography opportunities and onward travel arrangements.",
  },

  "tibet-culture-monasteries": {
    opening:
      "Begin in Lhasa with acclimatization and an introduction to Tibetan cultural heritage.",
    middle:
      "Visit monasteries, historic areas and culturally significant places at a thoughtful pace.",
    focus:
      "Explore living traditions while following local guidance around sacred spaces, photography and behavior.",
    ending:
      "Complete the cultural journey with time for reflection and onward travel arrangements.",
  },
};

// GENERATE PAGES FOR EVERY TOUR
export function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

// SEARCH ENGINE METADATA
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);

  if (!tour) {
    return {
      title: "Tour Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    `Explore ${tour.name}, a ${tour.duration} Tibet journey ` +
    `rated ${tour.difficulty}, with planning prices starting ` +
    `from ${tour.price}. Discover highlights and request a private Tibet journey.`;

  const pageUrl = `${baseUrl}/tours/${tour.slug}`;
  const image = images[tour.slug];
  const imageUrl = image
    ? `${baseUrl}${image}`
    : undefined;

  return {
    title: `${tour.name} | Tibet Tour`,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      title: `${tour.name} | Himalayan Adventures`,
      description,
      siteName: "Himalayan Adventures",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: `${tour.name} in Tibet`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${tour.name} | Himalayan Adventures`,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

// INDIVIDUAL TOUR PAGE
export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTour(slug);

  if (!tour) {
    notFound();
  }

  const image = images[tour.slug];
  const tourHighlights = highlights[tour.slug] || [];
  const itinerary = routeFocus[tour.slug];

  const isTrekkingTour =
    tour.slug === "ganden-samye-trek";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description:
      `${tour.duration} Tibet journey rated ${tour.difficulty}, ` +
      `with planning prices starting from ${tour.price}.`,
    url: `${baseUrl}/tours/${tour.slug}`,
    touristType: "Tibet traveler",
    image: image
      ? `${baseUrl}${image}`
      : undefined,
  };

  return (
    <main>
      {/* STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            structuredData
          ).replace(/</g, "\\u003c"),
        }}
      />

      {/* HERO */}
      <section
        style={{
          minHeight: 540,
          display: "flex",
          alignItems: "end",
          backgroundImage: image
            ? `linear-gradient(
                180deg,
                rgba(3,17,24,.12) 0%,
                rgba(3,17,24,.38) 48%,
                rgba(3,17,24,.95) 100%
              ), url("${image}")`
            : "linear-gradient(135deg, #153d43, #071920)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="container"
          style={{
            paddingBottom: 58,
            paddingTop: 120,
          }}
        >
          <span className="pill">
            TIBET
          </span>

          <h1
            style={{
              fontSize: "clamp(44px, 7vw, 82px)",
              maxWidth: 950,
              marginTop: 16,
              marginBottom: 20,
              lineHeight: 0.98,
              letterSpacing: "-.04em",
            }}
          >
            {tour.name}
          </h1>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span className="btn">
              {tour.duration}
            </span>

            <span className="btn alt">
              {tour.difficulty}
            </span>

            <strong
              style={{
                fontSize: 30,
              }}
            >
              From {tour.price}
            </strong>
          </div>
        </div>
      </section>

      {/* MAIN TOUR CONTENT */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 28,
              alignItems: "start",
            }}
          >
            <div>
              {/* ABOUT */}
              <div className="card">
                <span className="eyebrow">
                  TIBET JOURNEY
                </span>

                <h2>About this trip</h2>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.8,
                  }}
                >
                  {isTrekkingTour
                    ? "This challenging high-altitude trekking journey connects the Ganden and Samye monastery areas through remote Tibetan mountain landscapes. It is intended for travelers prepared for sustained walking, variable mountain conditions and simple accommodation while trekking."
                    : `This ${tour.duration.toLowerCase()} journey is designed as a thoughtful way to experience Tibet, balancing important places with altitude awareness, realistic travel time and cultural understanding.`}
                </p>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.8,
                  }}
                >
                  The current planning level is{" "}
                  <strong>
                    {tour.difficulty}
                  </strong>
                  , with a starting planning
                  price of{" "}
                  <strong>
                    {tour.price}
                  </strong>
                  . Final route, dates,
                  services and price are
                  confirmed before booking.
                </p>
              </div>

              {/* HIGHLIGHTS */}
              <div
                className="card"
                style={{
                  marginTop: 20,
                }}
              >
                <span className="eyebrow">
                  JOURNEY HIGHLIGHTS
                </span>

                <h2>
                  What you&apos;ll experience
                </h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 14,
                    marginTop: 20,
                  }}
                >
                  {tourHighlights.map(
                    (item) => (
                      <div
                        key={item}
                        style={{
                          padding: 18,
                          borderRadius: 14,
                          border:
                            "1px solid rgba(255,255,255,.09)",
                          background:
                            "rgba(255,255,255,.035)",
                          lineHeight: 1.6,
                        }}
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* ROUTE OUTLINE */}
              {itinerary && (
                <div
                  className="card"
                  style={{
                    marginTop: 20,
                  }}
                >
                  <span className="eyebrow">
                    ROUTE OUTLINE
                  </span>

                  <h2>
                    How the journey unfolds
                  </h2>

                  <p
                    className="muted"
                    style={{
                      lineHeight: 1.7,
                      marginBottom: 24,
                    }}
                  >
                    This is a planning outline
                    rather than a confirmed
                    day-by-day itinerary. The
                    final route depends on
                    your dates, current access
                    requirements and confirmed
                    travel arrangements.
                  </p>

                  <div
                    style={{
                      display: "grid",
                      gap: 18,
                    }}
                  >
                    <div>
                      <strong>
                        01 · ARRIVAL &amp;
                        ACCLIMATIZATION
                      </strong>

                      <p
                        className="muted"
                        style={{
                          lineHeight: 1.7,
                        }}
                      >
                        {itinerary.opening}
                      </p>
                    </div>

                    <div>
                      <strong>
                        {isTrekkingTour
                          ? "02 · BEGIN THE TREK"
                          : "02 · JOURNEY INTO TIBET"}
                      </strong>

                      <p
                        className="muted"
                        style={{
                          lineHeight: 1.7,
                        }}
                      >
                        {itinerary.middle}
                      </p>
                    </div>

                    <div>
                      <strong>
                        03 · CORE EXPERIENCE
                      </strong>

                      <p
                        className="muted"
                        style={{
                          lineHeight: 1.7,
                        }}
                      >
                        {itinerary.focus}
                      </p>
                    </div>

                    <div>
                      <strong>
                        04 · COMPLETION
                      </strong>

                      <p
                        className="muted"
                        style={{
                          lineHeight: 1.7,
                        }}
                      >
                        {itinerary.ending}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* HIGH-ALTITUDE TREKKING NOTE */}
              {isTrekkingTour && (
                <div
                  className="card"
                  style={{
                    marginTop: 20,
                    border:
                      "1px solid rgba(235,192,104,.25)",
                  }}
                >
                  <span className="eyebrow">
                    IMPORTANT TREKKING INFORMATION
                  </span>

                  <h2>
                    Prepare for a demanding trek
                  </h2>

                  <p
                    className="muted"
                    style={{
                      lineHeight: 1.8,
                    }}
                  >
                    The Ganden to Samye route
                    involves significant
                    altitude, mountain passes,
                    sustained walking and
                    potentially remote camps.
                    Appropriate fitness,
                    acclimatization, equipment
                    and experienced local
                    support are important.
                  </p>

                  <p
                    className="muted"
                    style={{
                      lineHeight: 1.8,
                    }}
                  >
                    Route access, permits,
                    weather, trekking support
                    and suitability must all
                    be confirmed before
                    accepting a booking.
                    The displayed duration
                    and price are planning
                    estimates, not guaranteed
                    arrangements.
                  </p>
                </div>
              )}

              {/* BEFORE YOU GO */}
              <div
                className="card"
                style={{
                  marginTop: 20,
                }}
              >
                <span className="eyebrow">
                  BEFORE YOU GO
                </span>

                <h2>
                  Plan for the plateau
                </h2>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.8,
                  }}
                >
                  Tibet is a high-altitude
                  destination. Acclimatization,
                  weather, road conditions,
                  travel documentation,
                  permits and route access
                  can affect the final
                  itinerary.
                </p>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.8,
                  }}
                >
                  Current requirements should
                  be confirmed for your
                  nationality, dates and
                  intended route before
                  booking or departure.
                </p>

                <div
                  className="actions"
                  style={{
                    marginTop: 20,
                  }}
                >
                  <Link
                    className="btn alt"
                    href="/weather-conditions"
                  >
                    Check conditions
                  </Link>

                  <Link
                    className="btn alt"
                    href="/tibet"
                  >
                    Explore Tibet
                  </Link>
                </div>
              </div>

              {/* MAP REFERENCE */}
              <div
                className="card"
                style={{
                  marginTop: 20,
                }}
              >
                <span className="eyebrow">
                  LOCATION
                </span>

                <h2>
                  Journey reference
                </h2>

                <p className="muted">
                  Approximate geographic
                  reference: {tour.lat},{" "}
                  {tour.lng}
                </p>

                <a
                  className="btn alt"
                  href={`https://www.openstreetmap.org/?mlat=${tour.lat}&mlon=${tour.lng}#map=7/${tour.lat}/${tour.lng}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open map
                </a>
              </div>
            </div>

            {/* BOOKING FORM */}
            <aside>
              <div
                className="card"
                style={{
                  position: "sticky",
                  top: 100,
                }}
              >
                <span className="eyebrow">
                  PLAN THIS JOURNEY
                </span>

                <h2
                  style={{
                    marginBottom: 8,
                  }}
                >
                  From {tour.price}
                </h2>

                <p className="muted">
                  {tour.duration} ·{" "}
                  {tour.difficulty}
                </p>

                <BookingForm
                  tourSlug={tour.slug}
                />

                <p
                  className="muted"
                  style={{
                    marginTop: 16,
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  Sending a request does not
                  confirm a reservation or
                  require payment. Final
                  dates, itinerary, travel
                  requirements, services,
                  availability and price
                  are confirmed before
                  booking.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

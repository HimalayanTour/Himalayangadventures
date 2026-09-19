import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTour, tours } from "@/lib/tours";
import BookingForm from "@/components/BookingForm";

const baseUrl = "https://himalayangadventures.vercel.app";

const images: Record<string, string> = {
  "lhasa-classic": "/lhasa.jpg",

  "lhasa-everest-base-camp": "/tibet-everest.jpg",

  "lhasa-shigatse-gyantse": "/5.png",

  "tibet-high-plateau": "/8.jpg",

  "kailash-mansarovar-journey": "/mount-kailash.jpg",

  "kailash-kora": "/mount-kailash.jpg",

  "namtso-lake": "/namtso.jpg",

  "tibet-photography": "/9.jpg",

  "tibet-culture-monasteries": "/6.png",
};

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

  "lhasa-shigatse-gyantse": [
    "Discover Lhasa's cultural landmarks",
    "Travel through the historic town of Gyantse",
    "Explore Shigatse and central Tibet",
    "Experience monasteries, valleys and plateau landscapes",
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

  "kailash-kora": [
    "Journey to sacred Mount Kailash",
    "Experience the Mount Kailash Kora route",
    "Travel through the remote landscapes of western Tibet",
    "Allow careful pacing for altitude and demanding terrain",
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

const routeFocus: Record<
  string,
  {
    opening: string;
    middle: string;
    focus: string;
    ending: string;
  }
> = {
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

  "lhasa-shigatse-gyantse": {
    opening:
      "Begin in Lhasa with time for altitude adjustment and cultural exploration.",
    middle:
      "Travel through central Tibet toward Gyantse, with landscape and cultural stops along the way.",
    focus:
      "Continue to Shigatse and explore the historic and cultural character of the region.",
    ending:
      "Return or continue onward according to the final itinerary and travel arrangements.",
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

  "kailash-kora": {
    opening:
      "Begin with acclimatization and preparation before traveling toward western Tibet.",
    middle:
      "Cross the plateau toward Mount Kailash with gradual altitude progression and realistic travel days.",
    focus:
      "Undertake the Kora according to current route conditions, personal ability and local guidance.",
    ending:
      "Recover after the Kora and continue the return journey according to the confirmed itinerary.",
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

export function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

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
    `Explore ${tour.name}, a ${tour.days} Tibet journey rated ` +
    `${tour.difficulty}, with planning prices starting from ${tour.price}. ` +
    `Discover highlights and request a private Tibet journey.`;

  const canonicalUrl = `/tours/${tour.slug}`;
  const image = images[tour.slug];

  return {
    title: `${tour.name} | Tibet Tour`,

    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: `${tour.name} | Himalayan Adventures`,
      description,
      siteName: "Himalayan Adventures",
      images: image
        ? [
            {
              url: image,
              alt: `${tour.name} in Tibet`,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title: `${tour.name} | Himalayan Adventures`,
      description,
      images: image ? [image] : undefined,
    },
  };
}

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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: `${tour.days} Tibet journey rated ${tour.difficulty}, with planning prices starting from ${tour.price}.`,
    url: `${baseUrl}/tours/${tour.slug}`,
    touristType: "Tibet traveler",
    image: image ? `${baseUrl}${encodeURI(image)}` : undefined,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      {/* HERO */}
      <section
        style={{
          minHeight: "540px",
          display: "flex",
          alignItems: "end",
          backgroundImage: image
            ? `linear-gradient(
                180deg,
                rgba(3, 17, 24, 0.12) 0%,
                rgba(3, 17, 24, 0.38) 48%,
                rgba(3, 17, 24, 0.95) 100%
              ),
              url("${image}")`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="container"
          style={{
            paddingBottom: "58px",
            paddingTop: "120px",
          }}
        >
          <span className="pill">TIBET</span>

          <h1
            style={{
              fontSize: "clamp(44px, 7vw, 82px)",
              maxWidth: "950px",
              marginTop: "16px",
              marginBottom: "20px",
              lineHeight: 0.98,
              letterSpacing: "-0.04em",
            }}
          >
            {tour.name}
          </h1>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span className="btn">{tour.days}</span>

            <span className="btn alt">
              {tour.difficulty}
            </span>

            <strong style={{ fontSize: "30px" }}>
              From {tour.price}
            </strong>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "28px",
              alignItems: "start",
            }}
          >
            <div>
              {/* OVERVIEW */}
              <div className="card">
                <span className="eyebrow">
                  TIBET JOURNEY
                </span>

                <h2>About this trip</h2>

                <p
                  className="muted"
                  style={{ lineHeight: 1.8 }}
                >
                  This {tour.days.toLowerCase()} journey is designed as a
                  thoughtful way to experience Tibet, balancing important
                  places with altitude awareness, realistic travel time and
                  cultural understanding.
                </p>

                <p
                  className="muted"
                  style={{ lineHeight: 1.8 }}
                >
                  The current planning level is{" "}
                  <strong>{tour.difficulty}</strong>, with a starting planning
                  price of <strong>{tour.price}</strong>. Final route, dates,
                  services and price are confirmed before booking.
                </p>
              </div>

              {/* HIGHLIGHTS */}
              <div
                className="card"
                style={{ marginTop: "20px" }}
              >
                <span className="eyebrow">
                  JOURNEY HIGHLIGHTS
                </span>

                <h2>What you&apos;ll experience</h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "14px",
                    marginTop: "20px",
                  }}
                >
                  {tourHighlights.map((item) => (
                    <div
                      key={item}
                      style={{
                        padding: "18px",
                        borderRadius: "14px",
                        border:
                          "1px solid rgba(255,255,255,.09)",
                        background:
                          "rgba(255,255,255,.035)",
                        lineHeight: 1.6,
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* ROUTE */}
              {itinerary && (
                <div
                  className="card"
                  style={{ marginTop: "20px" }}
                >
                  <span className="eyebrow">
                    ROUTE OUTLINE
                  </span>

                  <h2>How the journey unfolds</h2>

                  <p
                    className="muted"
                    style={{
                      lineHeight: 1.7,
                      marginBottom: 24,
                    }}
                  >
                    This is a planning outline rather than a confirmed
                    day-by-day itinerary. The final route depends on your
                    dates, current access requirements and confirmed travel
                    arrangements.
                  </p>

                  <div
                    style={{
                      display: "grid",
                      gap: "18px",
                    }}
                  >
                    <div>
                      <strong>
                        01 · ARRIVAL &amp; ACCLIMATIZATION
                      </strong>
                      <p
                        className="muted"
                        style={{ lineHeight: 1.7 }}
                      >
                        {itinerary.opening}
                      </p>
                    </div>

                    <div>
                      <strong>
                        02 · JOURNEY INTO TIBET
                      </strong>
                      <p
                        className="muted"
                        style={{ lineHeight: 1.7 }}
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
                        style={{ lineHeight: 1.7 }}
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
                        style={{ lineHeight: 1.7 }}
                      >
                        {itinerary.ending}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* PLANNING */}
              <div
                className="card"
                style={{ marginTop: "20px" }}
              >
                <span className="eyebrow">
                  BEFORE YOU GO
                </span>

                <h2>Plan for the plateau</h2>

                <p
                  className="muted"
                  style={{ lineHeight: 1.8 }}
                >
                  Tibet is a high-altitude destination. Acclimatization,
                  weather, road conditions, travel documentation, permits and
                  route access can affect the final itinerary.
                </p>

                <p
                  className="muted"
                  style={{ lineHeight: 1.8 }}
                >
                  Current requirements should be confirmed for your
                  nationality, dates and intended route before booking or
                  departure.
                </p>

                <div
                  className="actions"
                  style={{ marginTop: 20 }}
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

              {/* LOCATION */}
              <div
                className="card"
                style={{ marginTop: "20px" }}
              >
                <span className="eyebrow">
                  LOCATION
                </span>

                <h2>Journey reference</h2>

                <p className="muted">
                  Approximate geographic reference: {tour.lat},{" "}
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

            {/* BOOKING */}
            <aside>
              <div
                className="card"
                style={{
                  position: "sticky",
                  top: "100px",
                }}
              >
                <span className="eyebrow">
                  PLAN THIS JOURNEY
                </span>

                <h2 style={{ marginBottom: 8 }}>
                  From {tour.price}
                </h2>

                <p className="muted">
                  {tour.days} · {tour.difficulty}
                </p>

                <BookingForm tourSlug={tour.slug} />

                <p
                  className="muted"
                  style={{
                    marginTop: "16px",
                    fontSize: "13px",
                    lineHeight: 1.6,
                  }}
                >
                  Sending a request does not confirm a reservation or require
                  payment. Final dates, itinerary, travel requirements,
                  services, availability and price are confirmed before
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

import { notFound } from "next/navigation";
import { getTour, tours } from "@/lib/tours";
import BookingForm from "@/components/BookingForm";

const images: Record<string, string> = {
  "everest-base-camp":
    "/ChatGPT Image Sep 7, 2026, 01_05_24 AM.png",
  "annapurna-classic": "/2.png",
  "langtang-valley": "/3.png",
  "manaslu-circuit": "/4.png",
  "upper-mustang": "/5.png",
  "bhutan-mountain-culture": "/6.png",
  "tibet-high-plateau": "/8.jpg",
  "ladakh-high-altitude": "/9.jpg",
  "kailash-mansarovar-journey": "/10.jpg",
};

const highlights: Record<string, string[]> = {
  "everest-base-camp": [
    "Trek through the legendary Khumbu region",
    "Visit Namche Bazaar and Sherpa villages",
    "Reach Everest Base Camp",
    "Sunrise views from Kala Patthar",
  ],
  "annapurna-classic": [
    "Panoramic Annapurna mountain views",
    "Traditional mountain villages",
    "Beautiful valleys and forests",
    "Classic Nepal trekking experience",
  ],
  "langtang-valley": [
    "Quiet Himalayan valley trekking",
    "Tamang culture and villages",
    "Mountain scenery close to Kathmandu",
    "Great option for a shorter trek",
  ],
  "manaslu-circuit": [
    "Remote high-altitude trekking",
    "Cross dramatic mountain passes",
    "Traditional Himalayan settlements",
    "Less crowded than Everest and Annapurna",
  ],
  "upper-mustang": [
    "Explore the ancient Mustang kingdom",
    "Desert-like Himalayan landscapes",
    "Monasteries and cave settlements",
    "Unique Tibetan-influenced culture",
  ],
  "bhutan-mountain-culture": [
    "Visit dramatic Himalayan monasteries",
    "Experience Bhutanese culture",
    "Mountain scenery and peaceful valleys",
    "Balanced cultural and nature journey",
  ],
  "tibet-high-plateau": [
    "Travel across the Tibetan plateau",
    "Visit monasteries and sacred landscapes",
    "High-altitude mountain scenery",
    "Discover Tibetan culture and traditions",
  ],
  "ladakh-high-altitude": [
    "Explore India's high Himalaya",
    "Visit monasteries and remote valleys",
    "Dramatic desert-mountain landscapes",
    "Discover Ladakhi culture",
  ],
  "kailash-mansarovar-journey": [
    "Journey to sacred Mount Kailash",
    "Visit Lake Mansarovar",
    "Experience remote Tibetan landscapes",
    "A spiritual and cultural Himalayan journey",
  ],
};

export function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
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

  return (
    <main>
      <section
        style={{
          minHeight: "520px",
          display: "flex",
          alignItems: "end",
          backgroundImage: image
            ? `linear-gradient(
                180deg,
                rgba(3, 17, 24, 0.15) 0%,
                rgba(3, 17, 24, 0.35) 45%,
                rgba(3, 17, 24, 0.92) 100%
              ),
              url("${image}")`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container" style={{ paddingBottom: "56px" }}>
          <span className="pill">{tour.country}</span>

          <h1
            style={{
              fontSize: "clamp(42px, 7vw, 80px)",
              maxWidth: "900px",
              marginTop: "16px",
              marginBottom: "18px",
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
            <span className="btn alt">{tour.difficulty}</span>
            <strong style={{ fontSize: "30px" }}>{tour.price}</strong>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.5fr) minmax(280px, 0.8fr)",
              gap: "28px",
              alignItems: "start",
            }}
          >
            <div>
              <div className="card">
                <span className="eyebrow">Journey overview</span>

                <h2>About this trip</h2>

                <p className="muted">
                  This {tour.days.toLowerCase()} Himalayan journey through{" "}
                  {tour.country} is designed for travelers looking for an
                  immersive mountain experience with carefully planned routes,
                  cultural encounters and professional local support.
                </p>

                <p className="muted">
                  The trip is currently rated <strong>{tour.difficulty}</strong>{" "}
                  and starts from <strong>{tour.price}</strong>.
                </p>
              </div>

              <div className="card" style={{ marginTop: "20px" }}>
                <span className="eyebrow">Highlights</span>
                <h2>What you'll experience</h2>

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
                        border: "1px solid rgba(255,255,255,.09)",
                        background: "rgba(255,255,255,.035)",
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ marginTop: "20px" }}>
                <span className="eyebrow">Sample itinerary</span>
                <h2>How the journey unfolds</h2>

                <div style={{ display: "grid", gap: "14px", marginTop: "20px" }}>
                  <div>
                    <strong>Days 1–2</strong>
                    <p className="muted">
                      Arrival, orientation and preparation with the local team.
                    </p>
                  </div>

                  <div>
                    <strong>Early journey</strong>
                    <p className="muted">
                      Gradual travel into the mountains with time for
                      acclimatization and cultural stops.
                    </p>
                  </div>

                  <div>
                    <strong>Core experience</strong>
                    <p className="muted">
                      Trekking or touring through the main highlights of the
                      route, with flexible pacing based on local conditions.
                    </p>
                  </div>

                  <div>
                    <strong>Final days</strong>
                    <p className="muted">
                      Complete the route and return for a final night and trip
                      debrief.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card" style={{ marginTop: "20px" }}>
                <span className="eyebrow">Location</span>
                <h2>Route coordinates</h2>

                <p className="muted">
                  Approximate route reference: {tour.lat}, {tour.lng}
                </p>

                <a
                  className="btn"
                  href={`https://www.openstreetmap.org/?mlat=${tour.lat}&mlon=${tour.lng}#map=7/${tour.lat}/${tour.lng}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open map
                </a>
              </div>
            </div>

            <aside>
              <div className="card" style={{ position: "sticky", top: "100px" }}>
                <span className="eyebrow">Plan your journey</span>

                <h2>{tour.price}</h2>

                <p className="muted">
                  {tour.days} · {tour.difficulty}
                </p>

                <BookingForm tourSlug={tour.slug} />

                <p
                  className="muted"
                  style={{ marginTop: "16px", fontSize: "13px" }}
                >
                  Final dates, permits, accommodation and availability are
                  confirmed by the booking team.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

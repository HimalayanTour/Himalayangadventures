
import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/lib/tours";

// Tibet tour card pictures from the public folder.

const tourImages: Record<string, string> = {
  // NEW: Lhasa Classic Journey
  "lhasa-classic":
    "/Lhasa%20Classic%20Journey.jpg",

  // NEW: Lhasa to Everest Base Camp
  "lhasa-everest-base-camp":
    "/Lhasa%20to%20Everest%20Base%20Camp.jpg",

  // Existing: Lhoka Southern Tibet
  "lhoka-southern-tibet":
    "/5.png",

  // NEW: Tibet High Plateau
  "tibet-high-plateau":
    "/Tibet%20High%20Plateau.jpg",

  // Existing: Kailash Mansarovar
  "kailash-mansarovar-journey":
    "/mount-kailash.jpg",

  // Existing: Mount Kailash Kora
  "kailash-kora":
    "/mount-kailash.jpg",

  // Existing: Namtso Lake
  "namtso-lake":
    "/namtso.jpg",

  // NEW: Tibet Photography Journey
  "tibet-photography":
    "/Tibet%20Photography%20Journey.jpg",

  // NEW: Tibet Culture & Monasteries
  "tibet-culture-monasteries":
    "/Tibet%20Culture%20%26%20Monasteries.jpg",
};

export default function TourCard({
  tour,
}: {
  tour: Tour;
}) {
  const image =
    tourImages[tour.slug] || "/lhasa.jpg";

  return (
    <article className="card">
      {/* TOUR PICTURE */}

      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10",
          overflow: "hidden",
          borderRadius: 18,
          marginBottom: 20,
        }}
      >
        <Image
          src={image}
          alt={`${tour.name} in Tibet`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      {/* DESTINATION */}

      <span className="pill">
        TIBET
      </span>

      {/* TOUR NAME */}

      <h3
        style={{
          marginTop: 14,
          marginBottom: 10,
        }}
      >
        {tour.name}
      </h3>

      {/* DURATION AND DIFFICULTY */}

      <p className="muted">
        {tour.duration} · {tour.difficulty}
      </p>

      {/* TOUR PRICE AND LINK */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginTop: 20,
        }}
      >
        <strong>
          From {tour.price}
        </strong>

        <Link
          href={`/tours/${tour.slug}`}
          className="btn"
        >
          View journey
        </Link>
      </div>
    </article>
  );
}

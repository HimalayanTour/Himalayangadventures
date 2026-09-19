import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/lib/tours";

const images: Record<string, string> = {
  // Lhasa
  "lhasa-classic": "/lhasa.jpg",

  // Everest
  "lhasa-everest-base-camp": "/tibet-everest.jpg",

  // Central Tibet
  "lhasa-shigatse-gyantse": "/5.png",

  // High Plateau
  "tibet-high-plateau": "/8.jpg",

  // Mount Kailash & Mansarovar
  "kailash-mansarovar-journey": "/mount-kailash.jpg",

  // Mount Kailash Kora
  "kailash-kora": "/mount-kailash.jpg",

  // Namtso
  "namtso-lake": "/namtso.jpg",

  // Photography
  "tibet-photography": "/9.jpg",

  // Culture & Monasteries
  "tibet-culture-monasteries": "/6.png",
};

export default function TourCard({
  tour,
}: {
  tour: Tour;
}) {
  const image = images[tour.slug];

  return (
    <article className="card">
      {image && (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "220px",
            marginBottom: "16px",
            overflow: "hidden",
            borderRadius: "14px",
          }}
        >
          <Image
            src={image}
            alt={`${tour.name} in Tibet`}
            fill
            sizes="(max-width: 600px) 92vw, (max-width: 900px) 46vw, 33vw"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      )}

      <span className="pill">TIBET</span>

      <h3>{tour.name}</h3>

      <p className="muted">
        {tour.days} · {tour.difficulty}
      </p>

      <div className="price">
        From {tour.price}
      </div>

      <Link
        className="btn"
        href={`/tours/${tour.slug}`}
      >
        View journey
      </Link>
    </article>
  );
}

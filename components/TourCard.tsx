import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/lib/tours";

const images: Record<string, string> = {
  "lhasa-classic": "/lhasa.jpg",

  "lhasa-everest-base-camp": "/tibet-everest.jpg",

  "lhasa-shigatse-gyantse": "/Shigatse.jpg",

  "tibet-high-plateau": "/tibethighplateau.jpg",

  "kailash-mansarovar-journey": "/mount-kailash.jpg",

  "kailash-kora": "/mount-kailash.jpg",

  "namtso-lake": "/namtso.jpg",

  "tibet-photography": "/photographyjourney.jpg",

  "tibet-culture-monasteries": "/tibetculture.jpg",
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

      <span className="pill">
        TIBET
      </span>

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

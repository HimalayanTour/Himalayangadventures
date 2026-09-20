import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/lib/tours";

const tourImages: Record<string, string> = {
  "lhasa-classic": "/lhasa.jpg",

  "lhasa-everest-base-camp":
    "/tibet-everest.jpg",

  "lhoka-southern-tibet":
    "/5.png",

  "tibet-high-plateau":
    "/tibethighplateau.jpg",

  "kailash-mansarovar-journey":
    "/mount-kailash.jpg",

  "kailash-kora":
    "/mount-kailash.jpg",

  "namtso-lake":
    "/namtso.jpg",

  "tibet-photography":
    "/photographyjourney.jpg",

  "tibet-culture-monasteries":
    "/tibetculture.jpg",
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

      <span className="pill">
        TIBET
      </span>

      <h3
        style={{
          marginTop: 14,
          marginBottom: 10,
        }}
      >
        {tour.name}
      </h3>

      <p className="muted">
        {tour.duration} · {tour.difficulty}
      </p>

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

import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/lib/tours";

const images: Record<string, string> = {
  "lhasa-classic":
    "/8.jpg",

  "lhasa-everest-base-camp":
    "/ChatGPT Image Sep 7, 2026, 01_05_24 AM.png",

  "lhasa-shigatse-gyantse":
    "/5.png",

  "tibet-high-plateau":
    "/8.jpg",

  "kailash-mansarovar-journey":
    "/10.jpg",

  "kailash-kora":
    "/10.jpg",

  "namtso-lake":
    "/3.png",

  "tibet-photography":
    "/9.jpg",

  "tibet-culture-monasteries":
    "/6.png",
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

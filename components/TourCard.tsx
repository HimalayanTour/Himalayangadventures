import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/lib/tours";

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

export default function TourCard({ tour }: { tour: Tour }) {
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
            alt={`${tour.name} in ${tour.country}`}
            fill
            sizes="(max-width: 600px) 92vw, (max-width: 900px) 46vw, 33vw"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      )}

      <span className="pill">{tour.country}</span>

      <h3>{tour.name}</h3>

      <p className="muted">
        {tour.days} · {tour.difficulty}
      </p>

      <div className="price">{tour.price}</div>

      <Link className="btn" href={`/tours/${tour.slug}`}>
        View details
      </Link>
    </article>
  );
}

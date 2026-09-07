import Link from "next/link";
import type { Tour } from "@/lib/tours";

export default function TourCard({ tour }: { tour: Tour }) {
  const images: Record<string, string> = {
    // Everest Base Camp
    "everest-base-camp":
      "/ChatGPT Image Sep 7, 2026, 01_05_24 AM.png",

    // Annapurna Classic
    "annapurna-classic": "/2.png",

    // Langtang Valley
    "langtang-valley": "/3.png",

    // Manaslu Circuit
    "manaslu-circuit": "/4.png",

    // Upper Mustang
    "upper-mustang": "/5.png",

    // Bhutan Mountain & Culture
    "bhutan-mountain-culture": "/6.png",

    // Sikkim Himalaya
    "sikkim-himalaya": "/8.jpg",

    // Tibet High Plateau
    "tibet-high-plateau": "/9.jpg",
  };

  const image = images[tour.slug] || null;

  return (
    <article className="card">
      {image && (
        <img
          src={image}
          alt={tour.name}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            borderRadius: "14px",
            marginBottom: "16px",
          }}
        />
      )}

      <span className="pill">{tour.country}</span>

      <h3>{tour.name}</h3>

      <p className="muted">
        {tour.days} · {tour.difficulty}
      </p>

      <div className="price">{tour.price}</div>

      <Link className="btn" href={"/tours/" + tour.slug}>
        View details
      </Link>
    </article>
  );
}

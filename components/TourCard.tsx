
import Link from "next/link";
import type { Tour } from "@/lib/tours";

export default function TourCard({ tour }: { tour: Tour }) {
  const image =
    tour.slug === "everest-base-camp"
      ? "/ChatGPT Image Sep 7, 2026, 01_05_24 AM.png"
      : null;

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

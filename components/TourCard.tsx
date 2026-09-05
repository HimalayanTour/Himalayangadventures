import Link from "next/link"; import type {Tour} from "@/lib/tours";
export default function TourCard({tour}:{tour:Tour}){return <article className="card"><span className="pill">{tour.country}</span><h3>{tour.name}</h3><p className="muted">{tour.days} · {tour.difficulty}</p><div className="price">{tour.price}</div><Link className="btn" href={"/tours/"+tour.slug}>View details</Link></article>}

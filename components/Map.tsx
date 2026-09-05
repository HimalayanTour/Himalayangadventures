 "use client";
import {MapContainer,TileLayer,Marker,Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {tours} from "@/lib/tours";
import Link from "next/link";
const icon=L.divIcon({html:"<div style='font-size:24px'>📍</div>",className:""});
export default function Map(){return <div className="map"><MapContainer center={[28.3,85.5]} zoom={5} style={{height:"100%",width:"100%"}}><TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>{tours.map(t=><Marker key={t.slug} position={[t.lat,t.lng]} icon={icon}><Popup><strong>{t.name}</strong><br/>{t.country} · {t.days}<br/><Link href={"/tours/"+t.slug}>View tour</Link></Popup></Marker>)}</MapContainer></div>}

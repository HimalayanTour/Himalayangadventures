"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import Link from "next/link";
import { tours } from "@/lib/tours";

const markerIcon = L.divIcon({
  className: "",
  html: `
    <div
      style="
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #6de0c2;
        border: 4px solid rgba(255,255,255,.92);
        box-shadow:
          0 0 0 6px rgba(109,224,194,.18),
          0 8px 22px rgba(0,0,0,.38);
        position: relative;
      "
    >
      <div
        style="
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #06211d;
          top: 7px;
          left: 7px;
        "
      ></div>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -18],
});

export default function Map() {
  return (
    <div
      className="map"
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "22px",
        border: "1px solid rgba(255,255,255,.1)",
      }}
    >
      <MapContainer
        center={[28.3, 85.5]}
        zoom={5}
        minZoom={4}
        maxZoom={10}
        zoomControl={false}
        scrollWheelZoom={false}
        style={{
          height: "100%",
          width: "100%",
          background: "#0a1b22",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="bottomright" />

        {tours.map((tour) => (
          <Marker
            key={tour.slug}
            position={[tour.lat, tour.lng]}
            icon={markerIcon}
          >
            <Popup minWidth={220} maxWidth={280}>
              <div
                style={{
                  padding: "4px",
                  color: "#07131a",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "#267c6c",
                    marginBottom: "7px",
                  }}
                >
                  {tour.country}
                </div>

                <strong
                  style={{
                    display: "block",
                    fontSize: "17px",
                    lineHeight: 1.25,
                    marginBottom: "8px",
                  }}
                >
                  {tour.name}
                </strong>

                <div
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.6,
                    marginBottom: "11px",
                    color: "#526066",
                  }}
                >
                  {tour.days} · {tour.difficulty}
                  <br />
                  From {tour.price}
                </div>

                <Link
                  href={`/tours/${tour.slug}`}
                  style={{
                    display: "inline-block",
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "#126b5c",
                    textDecoration: "none",
                  }}
                >
                  Explore journey →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div
        style={{
          position: "absolute",
          zIndex: 500,
          top: "16px",
          left: "16px",
          padding: "10px 13px",
          borderRadius: "12px",
          background: "rgba(7,19,26,.88)",
          border: "1px solid rgba(255,255,255,.12)",
          color: "#eef6f7",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            color: "#6de0c2",
            fontSize: "10px",
            fontWeight: 900,
            letterSpacing: ".14em",
            marginBottom: "3px",
          }}
        >
          HIMALAYAN JOURNEYS
        </div>

        <div
          style={{
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          Select a marker to explore
        </div>
      </div>
    </div>
  );
}

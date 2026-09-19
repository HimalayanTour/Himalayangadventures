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
        center={[30.2, 86.3]}
        zoom={5}
        minZoom={4}
        maxZoom={11}
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
            <Popup minWidth={230} maxWidth={290}>
              <div
                style={{
                  padding: "5px",
                  color: "#07131a",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "#267c6c",
                    marginBottom: "7px",
                  }}
                >
                  TIBET JOURNEY
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
                    marginBottom: "12px",
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
                  Explore this journey →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* MAP LABEL */}
      <div
        style={{
          position: "absolute",
          zIndex: 500,
          top: "16px",
          left: "16px",
          padding: "11px 14px",
          borderRadius: "12px",
          background: "rgba(7,19,26,.88)",
          border: "1px solid rgba(255,255,255,.12)",
          color: "#eef6f7",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          pointerEvents: "none",
          boxShadow: "0 10px 30px rgba(0,0,0,.2)",
        }}
      >
        <div
          style={{
            color: "#6de0c2",
            fontSize: "10px",
            fontWeight: 900,
            letterSpacing: ".15em",
            marginBottom: "4px",
          }}
        >
          EXPLORE TIBET
        </div>

        <div
          style={{
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          Select a journey marker
        </div>
      </div>

      {/* MAP INFO */}
      <div
        style={{
          position: "absolute",
          zIndex: 500,
          left: "16px",
          bottom: "16px",
          maxWidth: "250px",
          padding: "10px 13px",
          borderRadius: "12px",
          background: "rgba(7,19,26,.84)",
          border: "1px solid rgba(255,255,255,.1)",
          color: "#eef6f7",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            lineHeight: 1.5,
            color: "rgba(238,246,247,.72)",
          }}
        >
          {tours.length} Tibet journeys · Lhasa · Everest · Namtso · Mount
          Kailash · High Plateau
        </div>
      </div>
    </div>
  );
}

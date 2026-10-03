"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { tours } from "@/lib/tours";

const markerIcon = L.divIcon({
  className: "",
  html: `
    <div
      style="
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #35d0ba;
        border: 4px solid rgba(255,255,255,0.95);
        box-shadow: 0 4px 14px rgba(0,0,0,0.45);
      "
    ></div>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
  popupAnchor: [0, -14],
});

export default function Map() {
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 22,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.03)",
      }}
    >
      <div
        style={{
          padding: "22px 22px 18px",
        }}
      >
        <span className="eyebrow">
          TIBET JOURNEY MAP
        </span>

        <h2
          style={{
            marginTop: 10,
            marginBottom: 8,
          }}
        >
          Explore Tibet
        </h2>

        <p
          className="muted"
          style={{
            margin: 0,
            lineHeight: 1.7,
            maxWidth: 720,
          }}
        >
          Explore the approximate geographic reference points for our Tibet
          journeys. Select a marker to see the journey and open its tour page.
        </p>
      </div>

      <div
        style={{
          height: 520,
          width: "100%",
        }}
      >
        <MapContainer
          center={[30.2, 86.3]}
          zoom={5}
          scrollWheelZoom={false}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {tours.map((tour) => (
            <Marker
              key={tour.slug}
              position={[tour.lat, tour.lng]}
              icon={markerIcon}
            >
              <Popup>
                <div
                  style={{
                    minWidth: 210,
                  }}
                >
                  <strong
                    style={{
                      display: "block",
                      marginBottom: 8,
                      fontSize: 16,
                      lineHeight: 1.3,
                    }}
                  >
                    {tour.name}
                  </strong>

                  <div
                    style={{
                      fontSize: 13,
                      lineHeight: 1.6,
                      marginBottom: 4,
                    }}
                  >
                    {tour.duration} · {tour.difficulty}
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      lineHeight: 1.6,
                      marginBottom: 12,
                    }}
                  >
                    From {tour.price}
                  </div>

                  <Link
                    href={`/tours/${tour.slug}`}
                    style={{
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    View journey →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div
        style={{
          padding: "16px 22px 20px",
        }}
      >
        <p
          className="muted"
          style={{
            margin: 0,
            fontSize: 13,
            lineHeight: 1.7,
            maxWidth: 280,
          }}
        >
          {tours.length} Tibet journeys · Lhasa · Lhoka · Everest · Namtso ·
          Mount Kailash · High Plateau
        </p>
      </div>
    </div>
  );
}

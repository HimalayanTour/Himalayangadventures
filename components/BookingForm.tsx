"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

type BookingFormProps = {
  tourSlug?: string;
};

const tourNames: Record<string, string> = {
  "lhasa-classic":
    "Lhasa Classic Journey",
  "lhasa-everest-base-camp":
    "Lhasa to Everest Base Camp",
  "lhoka-southern-tibet":
    "Lhoka (Southern Tibet)",
  "tibet-high-plateau":
    "Tibet High Plateau",
  "kailash-mansarovar-journey":
    "Kailash & Mansarovar Journey",
  "kailash-kora":
    "Mount Kailash Kora",
  "namtso-lake":
    "Lhasa & Namtso Lake",
  "tibet-photography":
    "Tibet Photography Journey",
  "tibet-culture-monasteries":
    "Tibet Culture & Monasteries",
};

export default function BookingForm({
  tourSlug = "",
}: BookingFormProps) {
  const [statusMessage, setStatusMessage] =
    useState("");

  const [sending, setSending] =
    useState(false);

  const [sent, setSent] =
    useState(false);

  const [destination, setDestination] =
    useState("");

  const [days, setDays] =
    useState("");

  const [travelers, setTravelers] =
    useState("2");

  const [tripStyle, setTripStyle] =
    useState("");

  const [accommodation, setAccommodation] =
    useState("");

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const urlDestination =
      params.get("destination") || "";

    const urlDays =
      params.get("days") || "";

    const urlTravelers =
      params.get("travelers") || "";

    const urlStyle =
      params.get("style") || "";

    const urlAccommodation =
      params.get("accommodation") || "";

    const urlMessage =
      params.get("message") || "";

    if (urlDestination) {
      setDestination(urlDestination);
    }

    if (urlDays) {
      setDays(urlDays);
    }

    if (urlTravelers) {
      setTravelers(urlTravelers);
    }

    if (urlStyle) {
      setTripStyle(urlStyle);
    }

    if (urlAccommodation) {
      setAccommodation(
        urlAccommodation
      );
    }

    if (urlMessage) {
      setMessage(urlMessage);
    }
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (sending || sent) {
      return;
    }

    setSending(true);
    setStatusMessage("");

    const form = event.currentTarget;
    const formData =
      new FormData(form);

    const name = String(
      formData.get("name") || ""
    ).trim();

    const email = String(
      formData.get("email") || ""
    ).trim();

    const phone = String(
      formData.get("phone") || ""
    ).trim();

    const country = String(
      formData.get("country") || ""
    ).trim();

    const dates = String(
      formData.get("dates") || ""
    ).trim();

    const selectedTripStyle =
      String(
        formData.get("tripStyle") ||
          ""
      ).trim();

    const selectedAccommodation =
      String(
        formData.get(
          "accommodation"
        ) || ""
      ).trim();

    const userMessage =
      String(
        formData.get("message") || ""
      ).trim();

    const travelerCount =
      Math.max(
        1,
        Number(
          formData.get("travelers")
        ) || 1
      );

    const selectedDestination =
      String(
        formData.get(
          "destination"
        ) || ""
      ).trim();

    const selectedDays =
      String(
        formData.get("days") || ""
      ).trim();

    const journeyDetails: string[] =
      [];

    if (selectedDestination) {
      journeyDetails.push(
        `Destination: ${selectedDestination}`
      );
    }

    if (selectedDays) {
      journeyDetails.push(
        `Preferred trip length: ${selectedDays} days`
      );
    }

    const finalMessage = [
      journeyDetails.length > 0
        ? journeyDetails.join("\n")
        : "",
      userMessage,
    ]
      .filter(Boolean)
      .join("\n\n");

    const body = {
      tourSlug,
      name,
      email,
      phone,
      country,
      dates,
      travelers: travelerCount,
      tripStyle:
        selectedTripStyle,
      accommodation:
        selectedAccommodation,
      message: finalMessage,
    };

    try {
      const response =
        await fetch(
          "/api/bookings",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              body
            ),
          }
        );

      let result: {
        message?: string;
        error?: string;
      } = {};

      try {
        result =
          await response.json();
      } catch {
        result = {};
      }

      if (!response.ok) {
        setStatusMessage(
          result.error ||
            "Could not send your Tibet trip request. Please try again."
        );

        return;
      }

      setSent(true);

      setStatusMessage(
        result.message ||
          "Thank you! Your Tibet trip request has been received. Our travel team will contact you soon."
      );
    } catch (error) {
      console.error(
        "Booking form error:",
        error
      );

      setStatusMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  const fieldStyle = {
    width: "100%",
  };

  const selectStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
  };

  const selectedTourName =
    tourNames[tourSlug] ||
    tourSlug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{
        padding:
          "clamp(22px, 4vw, 38px)",
        background:
          "linear-gradient(145deg, rgba(16,45,53,.96), rgba(7,25,32,.98))",
        border:
          "1px solid rgba(255,255,255,.10)",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent:
            "space-between",
          gap: 20,
          flexWrap: "wrap",
          marginBottom: 30,
        }}
      >
        <div
          style={{
            maxWidth: 680,
          }}
        >
          <span className="pill">
            TIBET TRIP REQUEST
          </span>

          <h2
            style={{
              marginTop: 15,
              marginBottom: 10,
              fontSize:
                "clamp(30px, 5vw, 46px)",
              lineHeight: 1.08,
            }}
          >
            Start planning your Tibet
            journey
          </h2>

          <p
            className="muted"
            style={{
              margin: 0,
              lineHeight: 1.7,
              maxWidth: 650,
            }}
          >
            Share a few details about
            your plans. This sends a
            Tibet trip request—it does
            not require payment or create
            a confirmed reservation.
          </p>
        </div>

        <div
          style={{
            padding:
              "10px 14px",
            borderRadius: 999,
            border:
              "1px solid rgba(109,224,194,.24)",
            background:
              "rgba(109,224,194,.08)",
            color: "#7ce6cd",
            fontSize: 12,
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          NO PAYMENT REQUIRED
        </div>
      </div>

      {/* SELECTED TOUR */}

      {tourSlug && (
        <div
          style={{
            marginBottom: 28,
            padding: 18,
            borderRadius: 16,
            border:
              "1px solid rgba(109,224,194,.18)",
            background:
              "rgba(109,224,194,.055)",
          }}
        >
          <div
            style={{
              color: "#76e2c8",
              fontSize: 11,
              fontWeight: 900,
              letterSpacing:
                ".13em",
              marginBottom: 6,
            }}
          >
            SELECTED TIBET JOURNEY
          </div>

          <strong
            style={{
              fontSize: 17,
            }}
          >
            {selectedTourName}
          </strong>
        </div>
      )}

      {/* YOUR DETAILS */}

      <section>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background:
                "rgba(109,224,194,.11)",
              color: "#78e5ca",
              fontSize: 12,
              fontWeight: 900,
            }}
          >
            01
          </span>

          <div>
            <strong
              style={{
                display: "block",
                fontSize: 19,
              }}
            >
              Your details
            </strong>

            <span
              className="muted"
              style={{
                fontSize: 13,
              }}
            >
              How our Tibet travel team
              can reach you
            </span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 16,
          }}
        >
          <div className="field">
            <label htmlFor="booking-name">
              Full name *
            </label>

            <input
              id="booking-name"
              name="name"
              type="text"
              required
              disabled={sent}
              autoComplete="name"
              placeholder="Your full name"
              style={fieldStyle}
            />
          </div>

          <div className="field">
            <label htmlFor="booking-email">
              Email address *
            </label>

            <input
              id="booking-email"
              name="email"
              type="email"
              required
              disabled={sent}
              autoComplete="email"
              placeholder="you@example.com"
              style={fieldStyle}
            />
          </div>

          <div className="field">
            <label htmlFor="booking-phone">
              Phone / WhatsApp
            </label>

            <input
              id="booking-phone"
              name="phone"
              type="tel"
              disabled={sent}
              autoComplete="tel"
              placeholder="+1 555 123 4567"
              style={fieldStyle}
            />
          </div>

          <div className="field">
            <label htmlFor="booking-country">
              Your country
            </label>

            <input
              id="booking-country"
              name="country"
              type="text"
              disabled={sent}
              autoComplete="country-name"
              placeholder="Japan, USA, Australia..."
              style={fieldStyle}
            />
          </div>
        </div>
      </section>

      <div
        style={{
          height: 1,
          background:
            "rgba(255,255,255,.08)",
          margin: "32px 0",
        }}
      />

      {/* JOURNEY DETAILS */}

      <section>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background:
                "rgba(109,224,194,.11)",
              color: "#78e5ca",
              fontSize: 12,
              fontWeight: 900,
            }}
          >
            02
          </span>

          <div>
            <strong
              style={{
                display: "block",
                fontSize: 19,
              }}
            >
              Your Tibet journey
            </strong>

            <span
              className="muted"
              style={{
                fontSize: 13,
              }}
            >
              When, how long and how many
              people are traveling
            </span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {destination && (
            <div className="field">
              <label htmlFor="booking-destination">
                Tibet journey focus
              </label>

              <input
                id="booking-destination"
                name="destination"
                type="text"
                value={destination}
                onChange={(event) =>
                  setDestination(
                    event.target.value
                  )
                }
                disabled={sent}
                placeholder="Tibet"
              />
            </div>
          )}

          {days && (
            <div className="field">
              <label htmlFor="booking-days">
                Preferred trip length
              </label>

              <input
                id="booking-days"
                name="days"
                type="number"
                min="1"
                max="60"
                value={days}
                onChange={(event) =>
                  setDays(
                    event.target.value
                  )
                }
                disabled={sent}
              />
            </div>
          )}

          <div className="field">
            <label htmlFor="booking-dates">
              Preferred travel dates
            </label>

            <input
              id="booking-dates"
              name="dates"
              type="text"
              disabled={sent}
              placeholder="Example: 5–18 October 2026"
            />
          </div>

          <div className="field">
            <label htmlFor="booking-travelers">
              Number of travelers
            </label>

            <input
              id="booking-travelers"
              name="travelers"
              type="number"
              min="1"
              max="50"
              value={travelers}
              onChange={(event) =>
                setTravelers(
                  event.target.value
                )
              }
              disabled={sent}
            />
          </div>
        </div>
      </section>

      <div
        style={{
          height: 1,
          background:
            "rgba(255,255,255,.08)",
          margin: "32px 0",
        }}
      />

      {/* TRAVEL PREFERENCES */}

      <section>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background:
                "rgba(109,224,194,.11)",
              color: "#78e5ca",
              fontSize: 12,
              fontWeight: 900,
            }}
          >
            03
          </span>

          <div>
            <strong
              style={{
                display: "block",
                fontSize: 19,
              }}
            >
              Travel preferences
            </strong>

            <span
              className="muted"
              style={{
                fontSize: 13,
              }}
            >
              Help us understand the Tibet
              experience you want
            </span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 16,
          }}
        >
          <div className="field">
            <label htmlFor="booking-trip-style">
              Travel style
            </label>

            <select
              id="booking-trip-style"
              name="tripStyle"
              value={tripStyle}
              onChange={(event) =>
                setTripStyle(
                  event.target.value
                )
              }
              disabled={sent}
              style={selectStyle}
            >
              <option value="">
                Select travel style
              </option>

              <option value="Culture">
                Culture & heritage
              </option>

              <option value="Adventure">
                Adventure
              </option>

              <option value="Spiritual">
                Spiritual & pilgrimage
              </option>

              <option value="Photography">
                Photography
              </option>

              <option value="Comfort">
                Comfort & slower pace
              </option>

              <option value="Family">
                Family
              </option>

              <option value="Private">
                Private journey
              </option>

              <option value="Not sure">
                Not sure yet
              </option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="booking-accommodation">
              Accommodation preference
            </label>

            <select
              id="booking-accommodation"
              name="accommodation"
              value={accommodation}
              onChange={(event) =>
                setAccommodation(
                  event.target.value
                )
              }
              disabled={sent}
              style={selectStyle}
            >
              <option value="">
                Select accommodation
              </option>

              <option value="Comfortable">
                Comfortable
              </option>

              <option value="Premium">
                Premium
              </option>

              <option value="Best available">
                Best available
              </option>

              <option value="Best available in remote areas">
                Best available in remote areas
              </option>

              <option value="Not sure">
                Not sure yet
              </option>
            </select>
          </div>
        </div>

        <div
          className="field"
          style={{
            marginTop: 16,
          }}
        >
          <label htmlFor="booking-message">
            Tell us about your Tibet trip
          </label>

          <textarea
            id="booking-message"
            name="message"
            rows={7}
            value={message}
            onChange={(event) =>
              setMessage(
                event.target.value
              )
            }
            disabled={sent}
            placeholder="Tell us what interests you in Tibet—Lhasa, Everest, Mount Kailash, Namtso, monasteries, culture, photography, preferred pace, accommodation, previous altitude experience or anything else we should know."
            style={{
              minHeight: 170,
            }}
          />
        </div>
      </section>

      {/* SUBMIT */}

      {!sent && (
        <div
          style={{
            marginTop: 28,
            padding: 20,
            borderRadius: 16,
            background:
              "rgba(255,255,255,.025)",
            border:
              "1px solid rgba(255,255,255,.08)",
          }}
        >
          <button
            className="btn"
            type="submit"
            disabled={sending}
            style={{
              width: "100%",
              minHeight: 54,
              fontSize: 16,
            }}
          >
            {sending
              ? "Sending your Tibet request..."
              : "Send Tibet trip request"}
          </button>

          <p
            className="muted"
            style={{
              margin:
                "12px 0 0",
              textAlign: "center",
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            No payment is required.
            Submitting this form does not
            create a confirmed reservation.
            Final itinerary, availability,
            travel requirements and pricing
            are confirmed separately.
          </p>
        </div>
      )}

      {/* SUCCESS */}

      {sent && (
        <div
          style={{
            marginTop: 28,
            padding:
              "clamp(22px, 4vw, 34px)",
            borderRadius: 18,
            border:
              "1px solid rgba(109,224,194,.3)",
            background:
              "linear-gradient(135deg, rgba(109,224,194,.12), rgba(109,224,194,.035))",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              display: "grid",
              placeItems: "center",
              margin:
                "0 auto 14px",
              borderRadius: "50%",
              background:
                "rgba(109,224,194,.15)",
              color: "#78e5ca",
              fontSize: 24,
              fontWeight: 900,
            }}
          >
            ✓
          </div>

          <h3
            style={{
              margin:
                "0 0 8px",
              fontSize: 25,
            }}
          >
            Tibet trip request received
          </h3>

          <p
            className="muted"
            style={{
              maxWidth: 620,
              margin:
                "0 auto",
              lineHeight: 1.7,
            }}
          >
            {statusMessage ||
              "Thank you. Your Tibet trip request has been received and our travel team will contact you soon."}
          </p>
        </div>
      )}

      {!sent &&
        statusMessage && (
          <div
            className="notice"
            style={{
              marginTop: 18,
              lineHeight: 1.6,
            }}
          >
            {statusMessage}
          </div>
        )}
    </form>
  );
}

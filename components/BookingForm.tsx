"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

type BookingFormProps = {
  tourSlug?: string;
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

  // Custom Journey values
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

  // --------------------------------
  // READ CUSTOM JOURNEY URL VALUES
  // --------------------------------

  useEffect(() => {
    const params =
      new URLSearchParams(
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

    // --------------------------------
    // ADD CUSTOM JOURNEY INFORMATION
    // TO THE SAVED BOOKING MESSAGE
    // --------------------------------

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
      travelers:
        travelerCount,
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
            "Could not send your booking request. Please try again."
        );

        return;
      }

      setSent(true);

      setStatusMessage(
        result.message ||
          "Thank you! Your booking request has been received. Our Himalayan travel team will contact you soon."
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

  return (
    <form
      className="card"
      onSubmit={handleSubmit}
    >
      <span className="pill">
        BOOKING REQUEST
      </span>

      <h3
        style={{
          marginTop: 14,
        }}
      >
        Start your Himalayan journey
      </h3>

      <p
        className="muted"
        style={{
          marginBottom: 22,
          lineHeight: 1.6,
        }}
      >
        Tell us about your travel
        plans and our Himalayan
        travel team will help create
        the right journey for you.
      </p>

      {/* CUSTOM JOURNEY DETAILS */}

      {destination && (
        <div className="field">
          <label htmlFor="booking-destination">
            Destination / region
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
            placeholder="Nepal, Bhutan, Tibet..."
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
        />
      </div>

      <div className="field">
        <label htmlFor="booking-country">
          Country
        </label>

        <input
          id="booking-country"
          name="country"
          type="text"
          disabled={sent}
          autoComplete="country-name"
          placeholder="Japan, USA, Australia..."
        />
      </div>

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

      <div className="field">
        <label htmlFor="booking-trip-style">
          Trip style
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
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
          }}
        >
          <option value="">
            Select trip style
          </option>

          <option value="Adventure">
            Adventure
          </option>

          <option value="Culture">
            Culture
          </option>

          <option value="Spiritual">
            Spiritual
          </option>

          <option value="Photography">
            Photography
          </option>

          <option value="Luxury">
            Luxury
          </option>

          <option value="Family">
            Family
          </option>

          <option value="Wellness">
            Wellness
          </option>

          <option value="Private tour">
            Private tour
          </option>

          <option value="Small group">
            Small group
          </option>

          <option value="Adventure trekking">
            Adventure trekking
          </option>

          <option value="Culture and heritage">
            Culture & heritage
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
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
          }}
        >
          <option value="">
            Select accommodation
          </option>

          <option value="Standard">
            Standard
          </option>

          <option value="Comfort">
            Comfort
          </option>

          <option value="Comfortable">
            Comfortable
          </option>

          <option value="Premium">
            Premium
          </option>

          <option value="Luxury">
            Luxury
          </option>

          <option value="Best available in remote areas">
            Best available in remote
            areas
          </option>

          <option value="Not sure">
            Not sure yet
          </option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="booking-message">
          Tell us about your trip
        </label>

        <textarea
          id="booking-message"
          name="message"
          rows={6}
          value={message}
          onChange={(event) =>
            setMessage(
              event.target.value
            )
          }
          disabled={sent}
          placeholder="Tell us about your interests, fitness level, preferred pace, special requirements or anything else we should know."
        />
      </div>

      <button
        className="btn"
        type="submit"
        disabled={sending || sent}
        style={{
          width: "100%",
          marginTop: 10,
        }}
      >
        {sending
          ? "Sending..."
          : sent
            ? "Booking sent ✓"
            : "Send booking request"}
      </button>

      {statusMessage && (
        <div
          className="notice"
          style={{
            marginTop: 16,
          }}
        >
          {statusMessage}
        </div>
      )}

      <p
        className="muted"
        style={{
          marginTop: 14,
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        No payment is required when
        submitting this booking request.
      </p>
    </form>
  );
}

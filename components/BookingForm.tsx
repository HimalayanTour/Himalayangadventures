"use client";

import { FormEvent, useState } from "react";

type BookingFormProps = {
  tourSlug?: string;
};

export default function BookingForm({
  tourSlug = "",
}: BookingFormProps) {
  const [statusMessage, setStatusMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (sending || sent) return;

    setSending(true);
    setStatusMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const country = String(formData.get("country") || "").trim();
    const dates = String(formData.get("dates") || "").trim();
    const tripStyle = String(formData.get("tripStyle") || "").trim();
    const accommodation = String(
      formData.get("accommodation") || ""
    ).trim();
    const customerMessage = String(
      formData.get("customerMessage") || ""
    ).trim();

    const travelers = Math.max(
      1,
      Number(formData.get("travelers")) || 1
    );

    /*
      We are saving the new fields inside the existing
      Supabase "message" column for now.

      This means we do not need to change the database yet.
    */
    const fullMessage = [
      `Phone / WhatsApp: ${phone || "Not provided"}`,
      `Country: ${country || "Not provided"}`,
      `Trip style: ${tripStyle || "Not specified"}`,
      `Accommodation: ${accommodation || "Not specified"}`,
      "",
      "Customer message:",
      customerMessage || "No additional message.",
    ].join("\n");

    const body = {
      tourSlug,
      name,
      email,
      dates,
      travelers,
      message: fullMessage,
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      let result: {
        message?: string;
        error?: string;
      } = {};

      try {
        result = await response.json();
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
      console.error("Booking form error:", error);

      setStatusMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <span className="pill">BOOKING REQUEST</span>

      <h3 style={{ marginTop: 14 }}>
        Start your Himalayan journey
      </h3>

      <p
        className="muted"
        style={{
          marginBottom: 22,
          lineHeight: 1.6,
        }}
      >
        Tell us about your travel plans and our Himalayan
        travel team will help create the right journey for
        you.
      </p>

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
          defaultValue="2"
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
          defaultValue=""
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

          <option value="Private tour">
            Private tour
          </option>

          <option value="Small group">
            Small group
          </option>

          <option value="Luxury journey">
            Luxury journey
          </option>

          <option value="Adventure trekking">
            Adventure trekking
          </option>

          <option value="Culture and heritage">
            Culture & heritage
          </option>

          <option value="Photography">
            Photography
          </option>

          <option value="Spiritual journey">
            Spiritual journey
          </option>

          <option value="Family trip">
            Family trip
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
          defaultValue=""
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

          <option value="Premium">
            Premium
          </option>

          <option value="Luxury">
            Luxury
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
          name="customerMessage"
          rows={6}
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
        No payment is required when submitting this booking
        request.
      </p>
    </form>
  );
}

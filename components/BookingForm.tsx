"use client";

import { useState } from "react";

export default function BookingForm({
  tourSlug = "",
}: {
  tourSlug?: string;
}) {
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Prevent double submission
    if (busy || sent) return;

    setBusy(true);
    setMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        setMsg(result.error || "Could not send booking request.");
        setBusy(false);
        return;
      }

      setMsg(
        result.message ||
          "Booking request received. Our team will contact you."
      );

      // Lock the form after successful submission
      setSent(true);
    } catch (error) {
      console.error("Booking form error:", error);

      setMsg(
        "Something went wrong. Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="card" onSubmit={submit}>
      <input
        type="hidden"
        name="tourSlug"
        value={tourSlug}
      />

      <span className="pill">
        BOOKING REQUEST
      </span>

      <h3>Start your journey</h3>

      <div className="field">
        <label>Name</label>
        <input
          name="name"
          required
          disabled={sent}
        />
      </div>

      <div className="field">
        <label>Email</label>
        <input
          name="email"
          type="email"
          required
          disabled={sent}
        />
      </div>

      <div className="field">
        <label>Preferred dates</label>
        <input
          name="dates"
          placeholder="e.g. 5–18 October 2026"
          disabled={sent}
        />
      </div>

      <div className="field">
        <label>Travelers</label>
        <input
          name="travelers"
          type="number"
          min="1"
          defaultValue="2"
          disabled={sent}
        />
      </div>

      <div className="field">
        <label>Message</label>
        <textarea
          name="message"
          placeholder="Tell us about fitness, interests and anything important."
          disabled={sent}
        />
      </div>

      <button
        className="btn"
        disabled={busy || sent}
      >
        {busy
          ? "Sending..."
          : sent
          ? "Booking sent ✓"
          : "Send booking request"}
      </button>

      <p
        className="notice"
        style={{ marginTop: 14 }}
      >
        {msg}
      </p>
    </form>
  );
}

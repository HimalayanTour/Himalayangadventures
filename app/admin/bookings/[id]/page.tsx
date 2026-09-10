<div
  className="card"
  style={{
    marginTop: 24,
  }}
>
  <h2>Contact customer</h2>

  <p className="muted">
    Choose a ready-made email template. Your email app will open with the
    customer, subject and message already filled in.
  </p>

  <div
    style={{
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      marginTop: 18,
    }}
  >
    <a
      className="btn"
      href={`mailto:${booking.email}?subject=${encodeURIComponent(
        "We received your Himalayan tour booking request"
      )}&body=${encodeURIComponent(
        `Hello ${booking.name},

Thank you for contacting Himalayan26.

We have received your booking request for ${
          booking.tour_slug || "your Himalayan journey"
        }.

Preferred dates: ${booking.dates || "Not specified"}
Travelers: ${booking.travelers || 1}

Our team is reviewing your request and will contact you with the next steps.

Best regards,
Himalayan26`
      )}`}
    >
      Booking received
    </a>

    <a
      className="btn"
      href={`mailto:${booking.email}?subject=${encodeURIComponent(
        "More information needed for your Himalayan journey"
      )}&body=${encodeURIComponent(
        `Hello ${booking.name},

Thank you for your booking request for ${
          booking.tour_slug || "your Himalayan journey"
        }.

Before we prepare the best itinerary for you, could you please send us a little more information?

• Your preferred travel dates
• Number of travelers
• Fitness or trekking experience
• Any special interests or requirements
• Your preferred accommodation level

Once we receive these details, we can prepare the next step for your journey.

Best regards,
Himalayan26`
      )}`}
    >
      Need more information
    </a>

    <a
      className="btn"
      href={`mailto:${booking.email}?subject=${encodeURIComponent(
        "Your Himalayan tour booking is confirmed"
      )}&body=${encodeURIComponent(
        `Hello ${booking.name},

We are pleased to confirm your Himalayan tour booking.

Tour: ${booking.tour_slug || "Himalayan journey"}
Preferred dates: ${booking.dates || "Not specified"}
Travelers: ${booking.travelers || 1}

We will send you the detailed itinerary, preparation information and next payment steps separately.

Thank you for choosing Himalayan26.

Best regards,
Himalayan26`
      )}`}
    >
      Booking confirmed
    </a>

    <a
      className="btn"
      href={`mailto:${booking.email}?subject=${encodeURIComponent(
        "Your Himalayan tour booking request"
      )}`}
    >
      Write custom email
    </a>
  </div>
</div>

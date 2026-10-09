
"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { tours } from "@/lib/tours";

type BookingFormProps = {
  tourSlug?: string;
};

type ResearchSource = {
  title: string;
  url: string;
};

type AiJourney = {
  originalRequest: string;
  recommendation: string;
  liveResearchUsed: boolean;
  researchUnavailable: boolean;
  researchMessage: string;
  sources: ResearchSource[];
  savedAt: string;
};

const fieldStyle = {
  width: "100%",
};

const selectStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
};

const panelStyle = {
  padding: 20,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,.1)",
  background: "rgba(255,255,255,.035)",
};

export default function BookingForm({
  tourSlug = "",
}: BookingFormProps) {
  const [statusMessage, setStatusMessage] =
    useState("");

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [destination, setDestination] =
    useState("");

  const [days, setDays] = useState("");

  const [travelers, setTravelers] =
    useState("2");

  const [tripStyle, setTripStyle] =
    useState("");

  const [accommodation, setAccommodation] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [aiJourney, setAiJourney] =
    useState<AiJourney | null>(null);

  const [showAiJourney, setShowAiJourney] =
    useState(true);

  // Load planning details from the website.
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    setDestination(
      params.get("destination") || ""
    );

    setDays(
      params.get("days") || ""
    );

    setTravelers(
      params.get("travelers") || "2"
    );

    setTripStyle(
      params.get("style") || ""
    );

    setAccommodation(
      params.get("accommodation") || ""
    );

    setMessage(
      params.get("message") || ""
    );

    // Restore itinerary from the AI Planner.
    try {
      const saved = window.localStorage.getItem(
        "himalayan26_ai_journey"
      );

      if (saved) {
        const parsed =
          JSON.parse(saved) as Partial<AiJourney>;

        if (
          typeof parsed.recommendation ===
            "string" &&
          parsed.recommendation.trim()
        ) {
          setAiJourney({
            originalRequest:
              typeof parsed.originalRequest ===
              "string"
                ? parsed.originalRequest
                : "",

            recommendation:
              parsed.recommendation,

            liveResearchUsed:
              parsed.liveResearchUsed === true,

            researchUnavailable:
              parsed.researchUnavailable === true,

            researchMessage:
              typeof parsed.researchMessage ===
              "string"
                ? parsed.researchMessage
                : "",

            sources: Array.isArray(
              parsed.sources
            )
              ? parsed.sources.filter(
                  (
                    source
                  ): source is ResearchSource =>
                    typeof source?.title ===
                      "string" &&
                    typeof source?.url ===
                      "string"
                )
              : [],

            savedAt:
              typeof parsed.savedAt === "string"
                ? parsed.savedAt
                : "",
          });
        }
      }
    } catch (error) {
      console.error(
        "Could not load AI journey:",
        error
      );
    }

    if (
      window.location.hash ===
      "#booking-request"
    ) {
      window.setTimeout(() => {
        document
          .getElementById("booking-request")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 200);
    }
  }, []);

  // Automatically use names from lib/tours.ts.
  // This includes Ganden to Samye Trek.
  const selectedTourName =
    tours.find(
      (tour) => tour.slug === tourSlug
    )?.name ||
    tourSlug
      .replace(/-/g, " ")
      .replace(
        /\b\w/g,
        (letter) => letter.toUpperCase()
      );

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (sending || sent) {
      return;
    }

    setSending(true);
    setStatusMessage("");

    const formData = new FormData(
      event.currentTarget
    );

    const getText = (key: string) =>
      String(
        formData.get(key) || ""
      ).trim();

    const travelerCount = Math.max(
      1,
      Number(
        formData.get("travelers")
      ) || 1
    );

    // Include destination and duration.
    const journeyDetails: string[] = [];

    if (getText("destination")) {
      journeyDetails.push(
        `Destination: ${getText("destination")}`
      );
    }

    if (getText("days")) {
      journeyDetails.push(
        `Preferred trip length: ${getText("days")} days`
      );
    }

    // Include the full AI recommendation.
    let aiJourneyText = "";

    if (aiJourney) {
      const sections: string[] = [
        "================================",
        "AI-PLANNED TIBET JOURNEY",
        "================================",
      ];

      if (aiJourney.originalRequest) {
        sections.push(
          [
            "TRAVELER'S ORIGINAL AI REQUEST",
            aiJourney.originalRequest,
          ].join("\n")
        );
      }

      sections.push(
        [
          "AI JOURNEY RECOMMENDATION",
          aiJourney.recommendation,
        ].join("\n")
      );

      const researchStatus =
        aiJourney.liveResearchUsed
          ? "Live research was included."
          : aiJourney.researchUnavailable
            ? "Live research was requested but unavailable. The recommendation was created without live verification."
            : "Live research was not used.";

      sections.push(
        [
          "LIVE RESEARCH STATUS",
          researchStatus,
        ].join("\n")
      );

      if (aiJourney.researchMessage) {
        sections.push(
          [
            "RESEARCH NOTE",
            aiJourney.researchMessage,
          ].join("\n")
        );
      }

      if (aiJourney.sources.length > 0) {
        const sourceText =
          aiJourney.sources
            .map(
              (source, index) =>
                `${index + 1}. ${source.title}\n${source.url}`
            )
            .join("\n\n");

        sections.push(
          [
            "LIVE RESEARCH SOURCES",
            sourceText,
          ].join("\n")
        );
      }

      sections.push(
        "================================"
      );

      aiJourneyText =
        sections.join("\n\n");
    }

    const userMessage =
      getText("message");

    const finalMessage = [
      journeyDetails.length > 0
        ? journeyDetails.join("\n")
        : "",

      userMessage
        ? [
            "TRAVELER'S ADDITIONAL MESSAGE",
            userMessage,
          ].join("\n")
        : "",

      aiJourneyText,
    ]
      .filter(Boolean)
      .join("\n\n");

    // Existing booking API and Supabase connection.
    const body = {
      tourSlug,
      name: getText("name"),
      email: getText("email"),
      phone: getText("phone"),
      country: getText("country"),
      dates: getText("dates"),
      travelers: travelerCount,
      tripStyle: getText("tripStyle"),
      accommodation:
        getText("accommodation"),
      message: finalMessage,
    };

    try {
      const response = await fetch(
        "/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(body),
        }
      );

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
            "Could not send your Tibet trip request. Please try again."
        );
        return;
      }

      setSent(true);

      setStatusMessage(
        result.message ||
          "Thank you! Your Tibet trip request has been received. Our travel team will contact you soon."
      );

      if (aiJourney) {
        try {
          window.localStorage.removeItem(
            "himalayan26_ai_journey"
          );
        } catch {
          // Ignore browser storage errors.
        }
      }
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
      id="booking-request"
      onSubmit={handleSubmit}
      className="card"
      style={{
        padding:
          "clamp(22px, 4vw, 38px)",

        background:
          "linear-gradient(145deg, rgba(16,45,53,.96), rgba(7,25,32,.98))",

        border:
          "1px solid rgba(255,255,255,.10)",

        scrollMarginTop: 100,
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
        <div>
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
            Start planning your Tibet journey
          </h2>

          <p
            className="muted"
            style={{
              lineHeight: 1.7,
              maxWidth: 650,
            }}
          >
            Share a few details about your
            plans. This sends a Tibet trip
            request. No payment is required
            and no reservation is confirmed
            until the arrangements are agreed.
          </p>
        </div>

        <div
          style={{
            padding: "10px 14px",
            borderRadius: 999,
            border:
              "1px solid rgba(109,224,194,.24)",
            background:
              "rgba(109,224,194,.08)",
            color: "#7ce6cd",
            fontSize: 12,
            fontWeight: 800,
          }}
        >
          NO PAYMENT REQUIRED
        </div>
      </div>

      {/* AI ITINERARY */}

      {aiJourney && (
        <section
          style={{
            ...panelStyle,
            marginBottom: 28,
            border:
              "1px solid rgba(109,224,194,.26)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                className="eyebrow"
                style={{
                  marginBottom: 8,
                }}
              >
                YOUR AI-PLANNED TIBET JOURNEY
              </div>

              <h3>
                Your recommendation is attached
              </h3>
            </div>

            <button
              type="button"
              className="btn alt"
              onClick={() =>
                setShowAiJourney(
                  (current) => !current
                )
              }
            >
              {showAiJourney
                ? "Hide itinerary"
                : "View itinerary"}
            </button>
          </div>

          {aiJourney.originalRequest && (
            <div
              style={{
                ...panelStyle,
                marginTop: 20,
              }}
            >
              <strong>
                YOUR ORIGINAL REQUEST
              </strong>

              <p
                style={{
                  marginTop: 12,
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                }}
              >
                {aiJourney.originalRequest}
              </p>
            </div>
          )}

          {showAiJourney && (
            <div
              style={{
                ...panelStyle,
                marginTop: 16,
                maxHeight: 520,
                overflowY: "auto",
              }}
            >
              <strong>
                AI JOURNEY RECOMMENDATION
              </strong>

              <div
                style={{
                  marginTop: 12,
                  lineHeight: 1.75,
                  whiteSpace: "pre-wrap",
                }}
              >
                {aiJourney.recommendation}
              </div>
            </div>
          )}

          <p
            className="muted"
            style={{
              marginTop: 16,
              fontSize: 13,
            }}
          >
            {aiJourney.liveResearchUsed
              ? "Live research included"
              : aiJourney.researchUnavailable
                ? "Live research unavailable"
                : "AI planning"}

            {" · Itinerary attached to this request"}
          </p>
        </section>
      )}

      {/* SELECTED TOUR */}

      {tourSlug && (
        <div
          style={{
            ...panelStyle,
            marginBottom: 28,
            border:
              "1px solid rgba(109,224,194,.18)",
          }}
        >
          <div
            className="eyebrow"
            style={{
              marginBottom: 9,
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

      {/* SECTION 1: PERSONAL DETAILS */}

      <section>
        <h3
          style={{
            marginBottom: 8,
          }}
        >
          01 · Your details
        </h3>

        <p
          className="muted"
          style={{
            marginBottom: 20,
          }}
        >
          How our Tibet travel team can reach you.
        </p>

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

      {/* SECTION 2: JOURNEY DETAILS */}

      <section>
        <h3
          style={{
            marginBottom: 8,
          }}
        >
          02 · Your Tibet journey
        </h3>

        <p
          className="muted"
          style={{
            marginBottom: 20,
          }}
        >
          When, how long and how many people
          are traveling.
        </p>

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
                style={fieldStyle}
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
                style={fieldStyle}
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
              style={fieldStyle}
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

      {/* SECTION 3: TRAVEL PREFERENCES */}

      <section>
        <h3
          style={{
            marginBottom: 8,
          }}
        >
          03 · Travel preferences
        </h3>

        <p
          className="muted"
          style={{
            marginBottom: 20,
          }}
        >
          Help us understand the Tibet
          experience you want.
        </p>

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
                Culture &amp; heritage
              </option>

              <option value="Adventure">
                Adventure
              </option>

              <option value="Spiritual">
                Spiritual &amp; pilgrimage
              </option>

              <option value="Photography">
                Photography
              </option>

              <option value="Comfort">
                Comfort &amp; slower pace
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
            placeholder="Tell us anything else we should know about your Tibet journey."
            style={{
              minHeight: 170,
            }}
          />
        </div>
      </section>

      {/* SUBMIT BUTTON */}

      {!sent && (
        <div
          style={{
            ...panelStyle,
            marginTop: 28,
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
              : aiJourney
                ? "Send Tibet trip request with AI itinerary"
                : "Send Tibet trip request"}
          </button>

          <p
            className="muted"
            style={{
              margin: "12px 0 0",
              textAlign: "center",
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            {aiJourney
              ? "Your AI-planned itinerary will be included with this request. No payment is required."
              : "No payment is required. Submitting this form does not create a confirmed reservation."}
          </p>
        </div>
      )}

      {/* SUCCESS MESSAGE */}

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
              "rgba(109,224,194,.09)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 32,
              color: "#78e5ca",
              marginBottom: 12,
            }}
          >
            ✓
          </div>

          <h3
            style={{
              fontSize: 25,
              marginBottom: 12,
            }}
          >
            Tibet trip request received
          </h3>

          <p
            className="muted"
            style={{
              maxWidth: 620,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            {statusMessage ||
              "Thank you. Your Tibet trip request has been received and our travel team will contact you soon."}
          </p>

          {aiJourney && (
            <p
              style={{
                marginTop: 14,
                color: "#78e5ca",
                fontWeight: 700,
              }}
            >
              Your AI itinerary was included
              with this request.
            </p>
          )}
        </div>
      )}

      {/* ERROR MESSAGE */}

      {!sent && statusMessage && (
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

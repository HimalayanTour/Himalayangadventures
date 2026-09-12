import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BookingBody = {
  tourSlug?: unknown;
  name?: unknown;
  email?: unknown;
  dates?: unknown;
  travelers?: unknown;
  message?: unknown;
  phone?: unknown;
  country?: unknown;
  tripStyle?: unknown;
  accommodation?: unknown;
};

function getDb() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase environment variables are missing."
    );
  }

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function cleanText(
  value: unknown,
  maxLength = 2000
) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function cleanOptionalText(
  value: unknown,
  maxLength = 500
) {
  const text = cleanText(
    value,
    maxLength
  );

  return text || null;
}

function isValidEmail(
  email: string
) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
}

function formatTourName(
  slug: string | null
) {
  if (!slug) {
    return "Custom Himalayan Journey";
  }

  return slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

function escapeHtml(
  value: string
) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendBookingEmail({
  customerName,
  customerEmail,
  tourName,
  dates,
  travelers,
  phone,
  country,
  tripStyle,
  accommodation,
  message,
  bookingId,
}: {
  customerName: string;
  customerEmail: string;
  tourName: string;
  dates: string | null;
  travelers: number;
  phone: string | null;
  country: string | null;
  tripStyle: string | null;
  accommodation: string | null;
  message: string | null;
  bookingId: string;
}) {
  const resendApiKey =
    process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn(
      "RESEND_API_KEY is missing. Email skipped."
    );

    return {
      sent: false,
      reason: "missing_api_key",
    };
  }

  const verifiedFrom =
    process.env.RESEND_FROM_EMAIL?.trim();

  const notificationEmail =
    process.env.BOOKING_NOTIFICATION_EMAIL?.trim();

  const testingMode = !verifiedFrom;

  if (
    testingMode &&
    !notificationEmail
  ) {
    console.warn(
      "BOOKING_NOTIFICATION_EMAIL is missing. Email skipped."
    );

    return {
      sent: false,
      reason:
        "missing_notification_email",
    };
  }

  const from = verifiedFrom
    ? verifiedFrom
    : "Himalayan26 <onboarding@resend.dev>";

  const to = testingMode
    ? notificationEmail!
    : customerEmail;

  const subject =
    `New booking request: ${tourName}`;

  const safeName =
    escapeHtml(customerName);

  const safeEmail =
    escapeHtml(customerEmail);

  const safeTour =
    escapeHtml(tourName);

  const safeDates =
    escapeHtml(
      dates || "Not specified"
    );

  const safePhone =
    escapeHtml(
      phone || "Not provided"
    );

  const safeCountry =
    escapeHtml(
      country || "Not provided"
    );

  const safeTripStyle =
    escapeHtml(
      tripStyle || "Not specified"
    );

  const safeAccommodation =
    escapeHtml(
      accommodation ||
        "Not specified"
    );

  const safeMessage =
    escapeHtml(
      message ||
        "No additional message."
    );

  const safeBookingId =
    escapeHtml(bookingId);

  const text = `NEW HIMALAYAN BOOKING REQUEST

Booking ID: ${bookingId}

Customer: ${customerName}
Customer email: ${customerEmail}

Tour: ${tourName}
Preferred dates: ${dates || "Not specified"}
Travelers: ${travelers}

Phone / WhatsApp: ${phone || "Not provided"}
Country: ${country || "Not provided"}
Trip style: ${tripStyle || "Not specified"}
Accommodation: ${accommodation || "Not specified"}

Customer message:
${message || "No additional message."}

Himalayan26 Booking System
`;

  const html = `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f7f8;font-family:Arial,sans-serif;color:#10232a;">
    <div style="max-width:680px;margin:0 auto;padding:32px 18px;">
      <div style="background:#071a21;border-radius:18px;padding:28px;color:#ffffff;">
        <div style="font-size:13px;letter-spacing:1.8px;color:#68e0c2;font-weight:700;">
          HIMALAYAN26
        </div>

        <h1 style="margin:10px 0 8px;font-size:28px;line-height:1.2;">
          New booking request
        </h1>

        <p style="margin:0;color:#b8c7cc;">
          A new traveler has submitted a booking request.
        </p>
      </div>

      <div style="background:#ffffff;border-radius:18px;margin-top:18px;padding:26px;border:1px solid #e6ecef;">
        <h2 style="margin-top:0;font-size:20px;">
          Customer details
        </h2>

        <table style="width:100%;border-collapse:collapse;font-size:15px;">
          <tr>
            <td style="padding:9px 0;color:#6b7b81;">Name</td>
            <td style="padding:9px 0;font-weight:700;">${safeName}</td>
          </tr>

          <tr>
            <td style="padding:9px 0;color:#6b7b81;">Email</td>
            <td style="padding:9px 0;font-weight:700;">${safeEmail}</td>
          </tr>

          <tr>
            <td style="padding:9px 0;color:#6b7b81;">Tour</td>
            <td style="padding:9px 0;font-weight:700;">${safeTour}</td>
          </tr>

          <tr>
            <td style="padding:9px 0;color:#6b7b81;">Preferred dates</td>
            <td style="padding:9px 0;font-weight:700;">${safeDates}</td>
          </tr>

          <tr>
            <td style="padding:9px 0;color:#6b7b81;">Travelers</td>
            <td style="padding:9px 0;font-weight:700;">${travelers}</td>
          </tr>

          <tr>
            <td style="padding:9px 0;color:#6b7b81;">Phone / WhatsApp</td>
            <td style="padding:9px 0;font-weight:700;">${safePhone}</td>
          </tr>

          <tr>
            <td style="padding:9px 0;color:#6b7b81;">Country</td>
            <td style="padding:9px 0;font-weight:700;">${safeCountry}</td>
          </tr>

          <tr>
            <td style="padding:9px 0;color:#6b7b81;">Trip style</td>
            <td style="padding:9px 0;font-weight:700;">${safeTripStyle}</td>
          </tr>

          <tr>
            <td style="padding:9px 0;color:#6b7b81;">Accommodation</td>
            <td style="padding:9px 0;font-weight:700;">${safeAccommodation}</td>
          </tr>
        </table>
      </div>

      <div style="background:#ffffff;border-radius:18px;margin-top:18px;padding:26px;border:1px solid #e6ecef;">
        <h2 style="margin-top:0;font-size:20px;">
          Customer message
        </h2>

        <div style="background:#f5f9fa;border-radius:12px;padding:16px;line-height:1.6;white-space:pre-wrap;">
          ${safeMessage}
        </div>
      </div>

      <div style="background:#ffffff;border-radius:18px;margin-top:18px;padding:22px 26px;border:1px solid #e6ecef;">
        <div style="font-size:13px;color:#6b7b81;">
          Booking ID
        </div>

        <div style="font-family:monospace;font-size:14px;margin-top:6px;">
          ${safeBookingId}
        </div>
      </div>

      <p style="text-align:center;color:#8a989d;font-size:12px;margin-top:22px;">
        Himalayan26 Booking System
      </p>
    </div>
  </body>
</html>
`;

  const response = await fetch(
    "https://api.resend.com/emails",
    {
      method: "POST",
      headers: {
        Authorization:
          `Bearer ${resendApiKey}`,
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
        html,
      }),
    }
  );

  const result =
    await response.json();

  if (!response.ok) {
    console.error(
      "Resend email error:",
      result
    );

    return {
      sent: false,
      reason: "resend_error",
      details: result,
    };
  }

  console.log(
    "Resend email sent:",
    result.id
  );

  return {
    sent: true,
    id: result.id,
    testingMode,
  };
}

export async function POST(
  request: Request
) {
  try {
    let body: BookingBody;

    try {
      body =
        (await request.json()) as BookingBody;
    } catch {
      return NextResponse.json(
        {
          error:
            "Invalid booking request.",
        },
        {
          status: 400,
        }
      );
    }

    const name = cleanText(
      body.name,
      150
    );

    const email = cleanText(
      body.email,
      254
    ).toLowerCase();

    const tourSlug =
      cleanOptionalText(
        body.tourSlug,
        200
      );

    const dates =
      cleanOptionalText(
        body.dates,
        300
      );

    const message =
      cleanOptionalText(
        body.message,
        5000
      );

    const phone =
      cleanOptionalText(
        body.phone,
        100
      );

    const country =
      cleanOptionalText(
        body.country,
        100
      );

    const tripStyle =
      cleanOptionalText(
        body.tripStyle,
        100
      );

    const accommodation =
      cleanOptionalText(
        body.accommodation,
        100
      );

    if (!name) {
      return NextResponse.json(
        {
          error:
            "Please enter your name.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !email ||
      !isValidEmail(email)
    ) {
      return NextResponse.json(
        {
          error:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    let travelers =
      Number(body.travelers);

    if (
      !Number.isFinite(
        travelers
      )
    ) {
      travelers = 1;
    }

    travelers =
      Math.floor(travelers);

    if (
      travelers < 1 ||
      travelers > 50
    ) {
      return NextResponse.json(
        {
          error:
            "Number of travelers must be between 1 and 50.",
        },
        {
          status: 400,
        }
      );
    }

    const db = getDb();

    const {
      data,
      error,
    } = await db
      .from("bookings")
      .insert({
        tour_slug: tourSlug,
        name,
        email,
        dates,
        travelers,
        message,
        phone,
        country,
        trip_style:
          tripStyle,
        accommodation,
        status: "new",
      })
      .select("id")
      .single();

    if (error) {
      console.error(
        "Supabase booking insert error:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Could not save your booking request. Please try again.",
        },
        {
          status: 500,
        }
      );
    }

    const emailResult =
      await sendBookingEmail({
        customerName: name,
        customerEmail: email,
        tourName:
          formatTourName(
            tourSlug
          ),
        dates,
        travelers,
        phone,
        country,
        tripStyle,
        accommodation,
        message,
        bookingId: data.id,
      });

    return NextResponse.json(
      {
        ok: true,
        id: data.id,
        emailSent:
          emailResult.sent,
        message:
          "Booking request received. Our team will contact you.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Booking API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}

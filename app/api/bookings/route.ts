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

async function sendResendEmail({
  from,
  to,
  subject,
  text,
  html,
  replyTo,
}: {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  const resendApiKey =
    process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn(
      "RESEND_API_KEY missing. Email skipped."
    );

    return {
      sent: false,
      reason: "missing_api_key",
    };
  }

  const payload: {
    from: string;
    to: string[];
    subject: string;
    text: string;
    html: string;
    reply_to?: string;
  } = {
    from,
    to: [to],
    subject,
    text,
    html,
  };

  if (replyTo) {
    payload.reply_to = replyTo;
  }

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
      body: JSON.stringify(payload),
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
  };
}

async function sendAdminNotification({
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
  adminBookingUrl,
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
  adminBookingUrl: string;
}) {
  const notificationEmail =
    process.env.BOOKING_NOTIFICATION_EMAIL?.trim();

  if (!notificationEmail) {
    console.warn(
      "BOOKING_NOTIFICATION_EMAIL missing."
    );

    return {
      sent: false,
      reason:
        "missing_notification_email",
    };
  }

  const verifiedFrom =
    process.env.RESEND_FROM_EMAIL?.trim();

  /*
    Until you own and verify a domain,
    Resend's test sender is used.

    Later:
    RESEND_FROM_EMAIL can be something like:

    Himalayan26 <bookings@yourdomain.com>
  */
  const from =
    verifiedFrom ||
    "Himalayan26 <onboarding@resend.dev>";

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

  const safeAdminUrl =
    escapeHtml(adminBookingUrl);

  const subject =
    `New booking request: ${tourName}`;

  const text = `NEW HIMALAYAN BOOKING REQUEST

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

Booking ID:
${bookingId}

Open booking:
${adminBookingUrl}

Himalayan26
`;

  const html = `
<!doctype html>
<html>
<body
  style="
    margin:0;
    padding:0;
    background:#f3f6f7;
    font-family:Arial,Helvetica,sans-serif;
    color:#10242b;
  "
>
  <div
    style="
      max-width:680px;
      margin:0 auto;
      padding:32px 18px;
    "
  >

    <div
      style="
        background:#071a21;
        border-radius:20px;
        padding:30px;
        color:#ffffff;
      "
    >
      <div
        style="
          color:#67e1c2;
          font-size:13px;
          font-weight:700;
          letter-spacing:2px;
        "
      >
        HIMALAYAN26
      </div>

      <h1
        style="
          margin:10px 0 8px;
          font-size:30px;
          line-height:1.2;
        "
      >
        New booking request
      </h1>

      <p
        style="
          margin:0;
          color:#b8c8cc;
          line-height:1.6;
        "
      >
        A traveler has submitted a new
        Himalayan journey request.
      </p>
    </div>

    <div
      style="
        background:#ffffff;
        border-radius:20px;
        padding:28px;
        margin-top:18px;
        border:1px solid #e4ebed;
      "
    >
      <h2
        style="
          margin:0 0 20px;
          font-size:20px;
        "
      >
        Traveler
      </h2>

      <table
        style="
          width:100%;
          border-collapse:collapse;
          font-size:15px;
        "
      >
        <tr>
          <td style="padding:9px 0;color:#728187;">
            Name
          </td>

          <td style="padding:9px 0;font-weight:700;">
            ${safeName}
          </td>
        </tr>

        <tr>
          <td style="padding:9px 0;color:#728187;">
            Email
          </td>

          <td style="padding:9px 0;font-weight:700;">
            ${safeEmail}
          </td>
        </tr>

        <tr>
          <td style="padding:9px 0;color:#728187;">
            Phone / WhatsApp
          </td>

          <td style="padding:9px 0;font-weight:700;">
            ${safePhone}
          </td>
        </tr>

        <tr>
          <td style="padding:9px 0;color:#728187;">
            Country
          </td>

          <td style="padding:9px 0;font-weight:700;">
            ${safeCountry}
          </td>
        </tr>
      </table>
    </div>

    <div
      style="
        background:#ffffff;
        border-radius:20px;
        padding:28px;
        margin-top:18px;
        border:1px solid #e4ebed;
      "
    >
      <h2
        style="
          margin:0 0 20px;
          font-size:20px;
        "
      >
        Journey details
      </h2>

      <table
        style="
          width:100%;
          border-collapse:collapse;
          font-size:15px;
        "
      >
        <tr>
          <td style="padding:9px 0;color:#728187;">
            Tour
          </td>

          <td style="padding:9px 0;font-weight:700;">
            ${safeTour}
          </td>
        </tr>

        <tr>
          <td style="padding:9px 0;color:#728187;">
            Preferred dates
          </td>

          <td style="padding:9px 0;font-weight:700;">
            ${safeDates}
          </td>
        </tr>

        <tr>
          <td style="padding:9px 0;color:#728187;">
            Travelers
          </td>

          <td style="padding:9px 0;font-weight:700;">
            ${travelers}
          </td>
        </tr>

        <tr>
          <td style="padding:9px 0;color:#728187;">
            Trip style
          </td>

          <td style="padding:9px 0;font-weight:700;">
            ${safeTripStyle}
          </td>
        </tr>

        <tr>
          <td style="padding:9px 0;color:#728187;">
            Accommodation
          </td>

          <td style="padding:9px 0;font-weight:700;">
            ${safeAccommodation}
          </td>
        </tr>
      </table>
    </div>

    <div
      style="
        background:#ffffff;
        border-radius:20px;
        padding:28px;
        margin-top:18px;
        border:1px solid #e4ebed;
      "
    >
      <h2
        style="
          margin:0 0 14px;
          font-size:20px;
        "
      >
        Customer message
      </h2>

      <div
        style="
          background:#f4f8f9;
          padding:17px;
          border-radius:12px;
          line-height:1.65;
          white-space:pre-wrap;
        "
      >${safeMessage}</div>
    </div>

    <div
      style="
        text-align:center;
        margin-top:24px;
      "
    >
      <a
        href="${safeAdminUrl}"
        style="
          display:inline-block;
          background:#67e1c2;
          color:#071a21;
          text-decoration:none;
          padding:15px 24px;
          border-radius:12px;
          font-weight:700;
          font-size:15px;
        "
      >
        View booking in admin
      </a>
    </div>

    <div
      style="
        margin-top:26px;
        text-align:center;
        color:#819096;
        font-size:12px;
        line-height:1.6;
      "
    >
      Booking reference<br />

      <span
        style="
          font-family:monospace;
        "
      >
        ${safeBookingId}
      </span>

      <br /><br />

      Himalayan26 Booking System
    </div>

  </div>
</body>
</html>
`;

  return sendResendEmail({
    from,
    to: notificationEmail,
    subject,
    text,
    html,

    /*
      This is important:

      When you press Reply in Gmail,
      it will reply to the traveler,
      not onboarding@resend.dev.
    */
    replyTo: customerEmail,
  });
}

async function sendCustomerConfirmation({
  customerName,
  customerEmail,
  tourName,
  dates,
  travelers,
  tripStyle,
  accommodation,
  bookingId,
}: {
  customerName: string;
  customerEmail: string;
  tourName: string;
  dates: string | null;
  travelers: number;
  tripStyle: string | null;
  accommodation: string | null;
  bookingId: string;
}) {
  /*
    We intentionally do NOT send this
    until a custom domain has been
    verified.

    Once RESEND_FROM_EMAIL exists,
    customer confirmations switch on
    automatically.
  */

  const verifiedFrom =
    process.env.RESEND_FROM_EMAIL?.trim();

  if (!verifiedFrom) {
    console.log(
      "Customer confirmation skipped: no verified sending domain."
    );

    return {
      sent: false,
      reason:
        "no_verified_domain",
    };
  }

  const safeName =
    escapeHtml(customerName);

  const safeTour =
    escapeHtml(tourName);

  const safeDates =
    escapeHtml(
      dates || "Not specified"
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

  const safeBookingId =
    escapeHtml(bookingId);

  const subject =
    "We received your Himalayan journey request";

  const text = `Hello ${customerName},

Thank you for contacting Himalayan26.

We received your booking request.

Tour: ${tourName}
Preferred dates: ${dates || "Not specified"}
Travelers: ${travelers}
Trip style: ${tripStyle || "Not specified"}
Accommodation: ${accommodation || "Not specified"}

Our Himalayan travel team will review your request and contact you with the next steps.

Booking reference:
${bookingId}

Best regards,
Himalayan26
`;

  const html = `
<!doctype html>
<html>
<body
  style="
    margin:0;
    padding:0;
    background:#f3f6f7;
    font-family:Arial,Helvetica,sans-serif;
    color:#10242b;
  "
>
  <div
    style="
      max-width:650px;
      margin:0 auto;
      padding:32px 18px;
    "
  >

    <div
      style="
        background:#071a21;
        border-radius:20px;
        padding:32px;
        color:#ffffff;
      "
    >
      <div
        style="
          color:#67e1c2;
          font-size:13px;
          letter-spacing:2px;
          font-weight:700;
        "
      >
        HIMALAYAN26
      </div>

      <h1
        style="
          font-size:30px;
          margin:12px 0 8px;
        "
      >
        Thank you, ${safeName}.
      </h1>

      <p
        style="
          margin:0;
          color:#b8c8cc;
          line-height:1.7;
        "
      >
        We received your Himalayan
        journey request.
      </p>
    </div>

    <div
      style="
        background:#ffffff;
        border-radius:20px;
        padding:28px;
        margin-top:18px;
        border:1px solid #e4ebed;
      "
    >
      <h2 style="margin-top:0;">
        Your request
      </h2>

      <p>
        <strong>Tour:</strong>
        ${safeTour}
      </p>

      <p>
        <strong>Preferred dates:</strong>
        ${safeDates}
      </p>

      <p>
        <strong>Travelers:</strong>
        ${travelers}
      </p>

      <p>
        <strong>Trip style:</strong>
        ${safeTripStyle}
      </p>

      <p>
        <strong>Accommodation:</strong>
        ${safeAccommodation}
      </p>
    </div>

    <div
      style="
        background:#ffffff;
        border-radius:20px;
        padding:28px;
        margin-top:18px;
        border:1px solid #e4ebed;
      "
    >
      <h2 style="margin-top:0;">
        What happens next?
      </h2>

      <p style="line-height:1.7;">
        Our Himalayan travel team will
        review your request and contact
        you with itinerary options,
        availability and the next steps.
      </p>
    </div>

    <div
      style="
        text-align:center;
        margin-top:26px;
        color:#819096;
        font-size:12px;
      "
    >
      Booking reference:<br />

      <span
        style="
          font-family:monospace;
        "
      >
        ${safeBookingId}
      </span>

      <br /><br />

      Himalayan26
    </div>

  </div>
</body>
</html>
`;

  return sendResendEmail({
    from: verifiedFrom,
    to: customerEmail,
    subject,
    text,
    html,
  });
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

    /*
      Save first.

      Email failure must never lose
      a booking.
    */

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

    const tourName =
      formatTourName(
        tourSlug
      );

    const origin =
      new URL(
        request.url
      ).origin;

    const adminBookingUrl =
      `${origin}/admin/bookings/${data.id}`;

    /*
      Email you the booking.
    */

    const adminEmailResult =
      await sendAdminNotification({
        customerName: name,
        customerEmail: email,
        tourName,
        dates,
        travelers,
        phone,
        country,
        tripStyle,
        accommodation,
        message,
        bookingId: data.id,
        adminBookingUrl,
      });

    /*
      Customer confirmation only
      becomes active after you add
      RESEND_FROM_EMAIL later.
    */

    const customerEmailResult =
      await sendCustomerConfirmation({
        customerName: name,
        customerEmail: email,
        tourName,
        dates,
        travelers,
        tripStyle,
        accommodation,
        bookingId: data.id,
      });

    return NextResponse.json(
      {
        ok: true,
        id: data.id,

        email: {
          adminNotification:
            adminEmailResult.sent,

          customerConfirmation:
            customerEmailResult.sent,
        },

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

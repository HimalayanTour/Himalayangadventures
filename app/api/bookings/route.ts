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
  const text = cleanText(value, maxLength);

  return text || null;
}

function isValidEmail(email: string) {
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

  /*
    WITHOUT A VERIFIED DOMAIN:
    Resend's test sender can only be used
    for test delivery.

    BOOKING_NOTIFICATION_EMAIL should be
    your own email address.

    AFTER VERIFYING A DOMAIN:
    Add RESEND_FROM_EMAIL in Vercel, for example:

    Himalayan26 <bookings@yourdomain.com>

    Then the same code will send directly
    to the customer.
  */

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
      "BOOKING_NOTIFICATION_EMAIL is missing. Resend test email skipped."
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

  const subject = testingMode
    ? `TEST — New Himalayan booking from ${customerName}`
    : "We received your Himalayan tour booking request";

  const text = testingMode
    ? `NEW BOOKING REQUEST

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

This is a test-mode booking notification from Himalayan26.
`
    : `Hello ${customerName},

Thank you for contacting Himalayan26.

We have received your booking request for ${tourName}.

Preferred dates: ${dates || "Not specified"}
Travelers: ${travelers}
Trip style: ${tripStyle || "Not specified"}
Accommodation: ${accommodation || "Not specified"}

Our Himalayan travel team is reviewing your request and will contact you with the next steps.

Booking reference:
${bookingId}

Best regards,
Himalayan26
`;

  const response = await fetch(
    "https://api.resend.com/emails",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
      }),
    }
  );

  const result = await response.json();

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

    /*
      STEP 1:
      Save the booking first.

      This means a temporary email
      problem will never cause us to
      lose the customer's booking.
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
        trip_style: tripStyle,
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

    /*
      STEP 2:
      Send the automatic email.

      If Resend fails, the booking
      remains safely stored in
      Supabase.
    */

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
        emailMode:
          "testingMode" in
            emailResult &&
          emailResult.testingMode
            ? "test"
            : "customer",
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

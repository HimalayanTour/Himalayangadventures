import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Check required information
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // 2. Environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    const resendApiKey = process.env.RESEND_API_KEY;
    const bookingNotificationEmail =
      process.env.BOOKING_NOTIFICATION_EMAIL;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Database connection is not configured." },
        { status: 500 }
      );
    }

    // 3. Connect to Supabase
    const { createClient } = await import(
      "@supabase/supabase-js"
    );

    const db = createClient(
      supabaseUrl,
      supabaseServiceKey
    );

    // Clean booking values
    const name = String(body.name).trim();
    const email = String(body.email)
      .trim()
      .toLowerCase();

    const tourSlug = body.tourSlug
      ? String(body.tourSlug)
      : null;

    const dates = body.dates
      ? String(body.dates).trim()
      : null;

    const travelers = Number(body.travelers || 1);

    const message = body.message
      ? String(body.message).trim()
      : null;

    // 4. DUPLICATE PROTECTION
    // Check if same person already sent the same booking
    // during the last 10 minutes.
    const tenMinutesAgo = new Date(
      Date.now() - 10 * 60 * 1000
    ).toISOString();

    let duplicateQuery = db
      .from("bookings")
      .select("id")
      .eq("email", email)
      .eq("name", name)
      .gte("created_at", tenMinutesAgo)
      .limit(1);

    if (tourSlug) {
      duplicateQuery = duplicateQuery.eq(
        "tour_slug",
        tourSlug
      );
    } else {
      duplicateQuery = duplicateQuery.is(
        "tour_slug",
        null
      );
    }

    if (dates) {
      duplicateQuery = duplicateQuery.eq(
        "dates",
        dates
      );
    } else {
      duplicateQuery = duplicateQuery.is(
        "dates",
        null
      );
    }

    const {
      data: duplicateBookings,
      error: duplicateError,
    } = await duplicateQuery;

    if (duplicateError) {
      console.error(
        "Duplicate check error:",
        duplicateError
      );
    }

    if (
      duplicateBookings &&
      duplicateBookings.length > 0
    ) {
      console.log("Duplicate booking blocked.");

      return NextResponse.json({
        message:
          "We already received this booking request. You do not need to send it again.",
        duplicate: true,
        emailSent: false,
      });
    }

    // 5. Save new booking
    const { error: bookingError } = await db
      .from("bookings")
      .insert({
        tour_slug: tourSlug,
        name,
        email,
        dates,
        travelers,
        message,
        status: "new",
      });

    if (bookingError) {
      console.error(
        "Supabase booking error:",
        bookingError
      );

      throw bookingError;
    }

    console.log("New booking saved.");

    // 6. If Resend is not configured,
    // keep the booking but skip email
    if (!resendApiKey || !bookingNotificationEmail) {
      return NextResponse.json({
        message:
          "Booking request received. Our team will contact you.",
        emailSent: false,
      });
    }

    // 7. Send notification email
    const emailResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          from:
            "Himalayan Adventures <onboarding@resend.dev>",

          to: [bookingNotificationEmail],

          reply_to: email,

          subject: `New booking request: ${
            tourSlug || "Himalayan Journey"
          }`,

          text: `
NEW HIMALAYAN ADVENTURES BOOKING

Tour:
${tourSlug || "Not specified"}

Name:
${name}

Customer email:
${email}

Preferred dates:
${dates || "Not specified"}

Travelers:
${travelers}

Message:
${message || "No message"}

--------------------------
Himalayan Adventures
          `.trim(),
        }),
      }
    );

    const resendResult =
      await emailResponse.text();

    console.log("Resend result:", {
      status: emailResponse.status,
      ok: emailResponse.ok,
    });

    if (!emailResponse.ok) {
      console.error(
        "Resend email failed:",
        resendResult
      );

      return NextResponse.json({
        message:
          "Booking saved, but email notification failed.",
        emailSent: false,
      });
    }

    // 8. Success
    return NextResponse.json({
      message:
        "Booking request received. Our team will contact you.",
      emailSent: true,
      duplicate: false,
    });
  } catch (error) {
    console.error("Booking API error:", error);

    return NextResponse.json(
      {
        error: "Could not save booking.",
      },
      {
        status: 500,
      }
    );
  }
}

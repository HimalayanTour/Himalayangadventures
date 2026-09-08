import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Check required customer information
    if (!body.name || !body.email) {
      return NextResponse.json(
        {
          error: "Name and email are required",
        },
        {
          status: 400,
        }
      );
    }

    // 2. Read Vercel environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    const resendApiKey = process.env.RESEND_API_KEY;
    const bookingNotificationEmail =
      process.env.BOOKING_NOTIFICATION_EMAIL;

    // Safe debug information.
    // This NEVER prints your secret key.
    console.log("Booking environment check:", {
      supabaseUrlExists: Boolean(supabaseUrl),
      supabaseKeyExists: Boolean(supabaseServiceKey),
      resendKeyExists: Boolean(resendApiKey),
      notificationEmailExists: Boolean(
        bookingNotificationEmail
      ),
    });

    // 3. Make sure Supabase is configured
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error(
        "Supabase environment variables are missing."
      );

      return NextResponse.json(
        {
          error: "Database connection is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    // 4. Connect to Supabase
    const { createClient } = await import(
      "@supabase/supabase-js"
    );

    const db = createClient(
      supabaseUrl,
      supabaseServiceKey
    );

    // 5. Save booking to Supabase
    const { error: bookingError } = await db
      .from("bookings")
      .insert({
        tour_slug: body.tourSlug || null,
        name: body.name,
        email: body.email,
        dates: body.dates || null,
        travelers: Number(body.travelers || 1),
        message: body.message || null,
        status: "new",
      });

    if (bookingError) {
      console.error(
        "Supabase booking error:",
        bookingError
      );

      throw bookingError;
    }

    console.log("Booking saved to Supabase.");

    // 6. Check Resend settings
    if (!resendApiKey || !bookingNotificationEmail) {
      console.error(
        "Resend skipped because an environment variable is missing.",
        {
          resendKeyExists: Boolean(resendApiKey),
          notificationEmailExists: Boolean(
            bookingNotificationEmail
          ),
        }
      );

      return NextResponse.json({
        message:
          "Booking saved, but email notification is not configured.",
        emailSent: false,
      });
    }

    console.log("Calling Resend API...");

    // 7. Send booking notification email
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

          reply_to: body.email,

          subject: `New booking request: ${
            body.tourSlug || "Himalayan Journey"
          }`,

          text: `
NEW HIMALAYAN ADVENTURES BOOKING

Tour:
${body.tourSlug || "Not specified"}

Name:
${body.name}

Customer email:
${body.email}

Preferred dates:
${body.dates || "Not specified"}

Travelers:
${body.travelers || 1}

Message:
${body.message || "No message"}

--------------------------
Himalayan Adventures
          `.trim(),
        }),
      }
    );

    const resendResult = await emailResponse.text();

    // 8. Log Resend result
    console.log("Resend API result:", {
      status: emailResponse.status,
      ok: emailResponse.ok,
      response: resendResult,
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
        resendStatus: emailResponse.status,
      });
    }

    console.log("Booking notification email sent.");

    // 9. Everything succeeded
    return NextResponse.json({
      message:
        "Booking request received. Our team will contact you.",
      emailSent: true,
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

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;
    const bookingNotificationEmail =
      process.env.BOOKING_NOTIFICATION_EMAIL;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase environment variables are missing.");

      return NextResponse.json(
        { error: "Database connection is not configured." },
        { status: 500 }
      );
    }

    console.log("Booking email config:", {
      resendKeyExists: Boolean(resendApiKey),
      notificationEmailExists: Boolean(bookingNotificationEmail),
    });

    const { createClient } = await import("@supabase/supabase-js");

    const db = createClient(
      supabaseUrl,
      supabaseServiceKey
    );

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
      console.error("Supabase booking error:", bookingError);
      throw bookingError;
    }

    if (!resendApiKey || !bookingNotificationEmail) {
      console.error(
        "Email notification skipped because Resend environment variables are missing."
      );

      return NextResponse.json({
        message:
          "Booking saved, but email notification is not configured.",
        emailSent: false,
      });
    }

    const emailResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Himalayan Adventures <onboarding@resend.dev>",
          to: [bookingNotificationEmail],
          reply_to: body.email,
          subject: `New booking request: ${
            body.tourSlug || "Himalayan Journey"
          }`,
          text: `
New Himalayan Adventures booking

Tour: ${body.tourSlug || "Not specified"}
Name: ${body.name}
Email: ${body.email}
Preferred dates: ${body.dates || "Not specified"}
Travelers: ${body.travelers || 1}

Message:
${body.message || "No message"}
          `.trim(),
        }),
      }
    );

    const resendResult = await emailResponse.text();

    console.log("Resend response:", {
      status: emailResponse.status,
      ok: emailResponse.ok,
      result: resendResult,
    });

    if (!emailResponse.ok) {
      console.error("Resend email error:", resendResult);

      return NextResponse.json({
        message:
          "Booking saved, but email notification failed.",
        emailSent: false,
        resendStatus: emailResponse.status,
      });
    }

    return NextResponse.json({
      message:
        "Booking request received. Our team will contact you.",
      emailSent: true,
    });
  } catch (error) {
    console.error("Booking error:", error);

    return NextResponse.json(
      { error: "Could not save booking." },
      { status: 500 }
    );
  }
}

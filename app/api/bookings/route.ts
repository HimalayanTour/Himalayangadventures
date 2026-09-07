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

    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      return NextResponse.json(
        { error: "Database connection is not configured." },
        { status: 500 }
      );
    }

    const { createClient } = await import("@supabase/supabase-js");

    const db = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { error } = await db.from("bookings").insert({
      tour_slug: body.tourSlug || null,
      name: body.name,
      email: body.email,
      dates: body.dates || null,
      travelers: Number(body.travelers || 1),
      message: body.message || null,
      status: "new",
    });

    if (error) {
      throw error;
    }

    // Safe diagnostic log: only true/false, no secrets shown
    console.log("Booking email config:", {
      resendKeyExists: Boolean(process.env.RESEND_API_KEY),
      notificationEmailExists: Boolean(
        process.env.BOOKING_NOTIFICATION_EMAIL
      ),
    });

    // Send email notification
    if (
      process.env.RESEND_API_KEY &&
      process.env.BOOKING_NOTIFICATION_EMAIL
    ) {
      const emailResponse = await fetch(
        "https://api.resend.com/emails",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Himalayan Adventures <onboarding@resend.dev>",
            to: [process.env.BOOKING_NOTIFICATION_EMAIL],
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

      const emailResult = await emailResponse.text();

      console.log("Resend response:", {
        status: emailResponse.status,
        ok: emailResponse.ok,
        result: emailResult,
      });

      if (!emailResponse.ok) {
        console.error("Resend email error:", emailResult);
      }
    } else {
      console.error(
        "Resend email skipped because an environment variable is missing."
      );
    }

    return NextResponse.json({
      message: "Booking request received. Our team will contact you.",
    });
  } catch (error) {
    console.error("Booking error:", error);

    return NextResponse.json(
      { error: "Could not save booking." },
      { status: 500 }
    );
  }
}

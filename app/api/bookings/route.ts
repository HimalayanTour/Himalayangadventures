
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { tours } from "@/lib/tours";

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

type EmailResult = { sent: boolean };

function cleanText(value: unknown, limit = 2000): string {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function optionalText(value: unknown, limit = 500): string | null {
  return cleanText(value, limit) || null;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function tourNameFromSlug(slug: string | null): string {
  if (!slug) return "Custom Tibet Journey";
  const tour = tours.find((item) => item.slug === slug);
  if (tour) return tour.name;
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function inlineMarkdown(value: string): string {
  return escapeHtml(value).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

// Format the AI Planner's headings, bullet points and itinerary tables.
// Escape user text before adding any email HTML.
function renderMessageHtml(message: string | null): string {
  if (!message) return '<p style="color:#60747b">No additional message.</p>';

  const lines = message.replace(/\r\n/g, "\n").split("\n");
  const result: string[] = [];
  const sectionTitles = new Set([
    "TRAVELER'S ORIGINAL AI REQUEST",
    "AI JOURNEY RECOMMENDATION",
    "LIVE RESEARCH STATUS",
    "RESEARCH NOTE",
    "LIVE RESEARCH SOURCES",
    "TRAVELER'S ADDITIONAL MESSAGE",
  ]);

  for (let i = 0; i < lines.length; ) {
    const line = lines[i].trim();
    if (!line || /^={5,}$/.test(line)) {
      i++;
      continue;
    }

    if (line.startsWith("|") && line.endsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length) {
        const next = lines[i].trim();
        if (!next.startsWith("|") || !next.endsWith("|")) break;
        tableLines.push(next);
        i++;
      }
      const rows = tableLines
        .map((row) => row.slice(1, -1).split("|").map((cell) => cell.trim()))
        .filter((cells) => !cells.every((cell) => /^:?-{3,}:?$/.test(cell)));
      if (rows.length) {
        const [header, ...body] = rows;
        result.push(
          `<div style="overflow-x:auto;margin:16px 0;border:1px solid #dce6e8;border-radius:12px">` +
            `<table style="width:100%;border-collapse:collapse;font-size:14px">` +
            `<thead><tr style="background:#eaf8f4">` +
            header.map((cell) => `<th style="padding:12px;text-align:left;border-bottom:1px solid #d4e4e6">${inlineMarkdown(cell)}</th>`).join("") +
            `</tr></thead><tbody>` +
            body.map((cells) => `<tr>${cells.map((cell) => `<td style="padding:12px;border-bottom:1px solid #e7edef;vertical-align:top">${inlineMarkdown(cell)}</td>`).join("")}</tr>`).join("") +
            `</tbody></table></div>`
        );
      }
      continue;
    }

    if (line === "AI-PLANNED TIBET JOURNEY") {
      result.push('<h2 style="background:#071a21;color:#fff;padding:18px;border-radius:12px">AI-Planned Tibet Journey</h2>');
    } else if (sectionTitles.has(line)) {
      result.push(`<h3 style="font-size:13px;letter-spacing:1px;color:#287866;margin:22px 0 8px">${escapeHtml(line)}</h3>`);
    } else if (line.startsWith("### ")) {
      result.push(`<h4 style="color:#17353c;margin:18px 0 8px">${inlineMarkdown(line.slice(4))}</h4>`);
    } else if (line.startsWith("## ")) {
      result.push(`<h3 style="color:#17353c;margin:20px 0 8px">${inlineMarkdown(line.slice(3))}</h3>`);
    } else if (line.startsWith("# ")) {
      result.push(`<h2 style="color:#17353c;margin:22px 0 8px">${inlineMarkdown(line.slice(2))}</h2>`);
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length && /^[*-] /.test(lines[i].trim())) {
        items.push(`<li style="margin-bottom:6px">${inlineMarkdown(lines[i].trim().slice(2))}</li>`);
        i++;
      }
      result.push(`<ul style="padding-left:24px;line-height:1.7">${items.join("")}</ul>`);
      continue;
    } else {
      result.push(`<p style="margin:7px 0 13px;line-height:1.7;color:#304b52">${inlineMarkdown(line)}</p>`);
    }
    i++;
  }
  return result.join("\n");
}

function emailFrame(title: string, content: string, footer: string): string {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f3f6f7;font-family:Arial,Helvetica,sans-serif;color:#10242b">
    <div style="max-width:720px;margin:auto;padding:32px 18px">
      <div style="background:#071a21;color:#fff;padding:30px;border-radius:18px">
        <div style="color:#67e1c2;letter-spacing:2px;font-size:13px;font-weight:700">HIMALAYAN26</div>
        <h1 style="margin:12px 0 0;font-size:29px">${escapeHtml(title)}</h1>
      </div>
      ${content}
      <div style="text-align:center;margin-top:26px;color:#819096;font-size:12px;line-height:1.7">${footer}</div>
    </div></body></html>`;
}

function emailCard(title: string, body: string): string {
  return `<div style="background:#fff;padding:26px;border:1px solid #e4ebed;border-radius:16px;margin-top:18px">
    <h2 style="font-size:20px;margin:0 0 18px">${escapeHtml(title)}</h2>${body}</div>`;
}

function emailRow(label: string, value: string): string {
  return `<tr><td style="padding:9px 0;color:#728187;width:42%;vertical-align:top">${escapeHtml(label)}</td>
    <td style="padding:9px 0;font-weight:600;vertical-align:top">${escapeHtml(value)}</td></tr>`;
}

function emailTable(rows: Array<[string, string]>): string {
  return `<table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px">${rows.map(([label, value]) => emailRow(label, value)).join("")}</table>`;
}

async function sendResendEmail(options: {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}): Promise<EmailResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY missing. Email skipped.");
    return { sent: false };
  }
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: options.from,
        to: [options.to],
        subject: options.subject,
        text: options.text,
        html: options.html,
        ...(options.replyTo ? { reply_to: options.replyTo } : {}),
      }),
    });
    if (!response.ok) {
      console.error("Resend email error:", await response.text());
    }
    return { sent: response.ok };
  } catch (error) {
    console.error("Resend network error:", error);
    return { sent: false };
  }
}

type NotificationInfo = {
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
};

async function sendAdminNotification(info: NotificationInfo): Promise<EmailResult> {
  const to = process.env.BOOKING_NOTIFICATION_EMAIL?.trim();
  if (!to) {
    console.warn("BOOKING_NOTIFICATION_EMAIL missing.");
    return { sent: false };
  }
  const from = process.env.RESEND_FROM_EMAIL?.trim() || "Himalayan26 <onboarding@resend.dev>";
  const rows: Array<[string, string]> = [
    ["Name", info.customerName],
    ["Email", info.customerEmail],
    ["Phone / WhatsApp", info.phone || "Not provided"],
    ["Country", info.country || "Not provided"],
    ["Journey", info.tourName],
    ["Preferred dates", info.dates || "Not specified"],
    ["Travelers", String(info.travelers)],
    ["Trip style", info.tripStyle || "Not specified"],
    ["Accommodation", info.accommodation || "Not specified"],
  ];
  const content =
    emailCard("Traveler & Tibet journey", emailTable(rows)) +
    emailCard("Journey request & AI itinerary", renderMessageHtml(info.message)) +
    `<div style="text-align:center;margin-top:24px"><a href="${escapeHtml(info.adminBookingUrl)}" style="display:inline-block;padding:15px 24px;border-radius:12px;background:#67e1c2;color:#071a21;text-decoration:none;font-weight:700">View booking in admin</a></div>`;
  const html = emailFrame(
    "New Tibet trip request",
    content,
    `Booking reference: ${escapeHtml(info.bookingId)}<br>Himalayan26 Booking System`
  );
  const text = [
    "NEW TIBET BOOKING REQUEST",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "", "Customer message:", info.message || "No additional message.",
    "", `Booking ID: ${info.bookingId}`, `Open booking: ${info.adminBookingUrl}`,
  ].join("\n");
  return sendResendEmail({
    from,
    to,
    subject: `New Tibet trip request: ${info.tourName}`,
    text,
    html,
    replyTo: info.customerEmail,
  });
}

async function sendCustomerConfirmation(info: NotificationInfo): Promise<EmailResult> {
  // Keep customer email disabled until a verified sender domain is configured.
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!from) {
    console.log("Customer confirmation skipped: no verified sending domain.");
    return { sent: false };
  }
  const content =
    emailCard("Your Tibet request", emailTable([
      ["Journey", info.tourName],
      ["Preferred dates", info.dates || "Not specified"],
      ["Travelers", String(info.travelers)],
      ["Trip style", info.tripStyle || "Not specified"],
      ["Accommodation", info.accommodation || "Not specified"],
    ])) +
    emailCard("What happens next?", '<p style="line-height:1.7">Our Tibet travel team will review your request and contact you about the proposed journey, availability and next steps. Final details will be confirmed before booking.</p>');
  const html = emailFrame(
    `Thank you, ${info.customerName}.`,
    content,
    `Booking reference: ${escapeHtml(info.bookingId)}<br>Himalayan26`
  );
  const text = [
    `Hello ${info.customerName},`,
    "Thank you for contacting Himalayan26. We received your Tibet journey request.",
    `Journey: ${info.tourName}`,
    `Preferred dates: ${info.dates || "Not specified"}`,
    `Travelers: ${info.travelers}`,
    `Trip style: ${info.tripStyle || "Not specified"}`,
    `Accommodation: ${info.accommodation || "Not specified"}`,
    "Our Tibet travel team will review your request and contact you with the next steps.",
    `Booking reference: ${info.bookingId}`,
    "Himalayan26",
  ].join("\n\n");
  return sendResendEmail({
    from,
    to: info.customerEmail,
    subject: "We received your Tibet journey request",
    text,
    html,
  });
}

export async function POST(request: Request) {
  try {
    let body: BookingBody;
    try {
      body = (await request.json()) as BookingBody;
      if (!body || typeof body !== "object" || Array.isArray(body)) {
        throw new Error("Invalid body");
      }
    } catch {
      return NextResponse.json({ error: "Invalid booking request." }, { status: 400 });
    }

    const name = cleanText(body.name, 150);
    const email = cleanText(body.email, 254).toLowerCase();
    const tourSlug = optionalText(body.tourSlug, 200);
    const dates = optionalText(body.dates, 300);
    const message = optionalText(body.message, 12000);
    const phone = optionalText(body.phone, 100);
    const country = optionalText(body.country, 100);
    const tripStyle = optionalText(body.tripStyle, 100);
    const accommodation = optionalText(body.accommodation, 100);

    if (!name) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    let travelers = Number(body.travelers);
    if (!Number.isFinite(travelers)) travelers = 1;
    travelers = Math.floor(travelers);
    if (travelers < 1 || travelers > 50) {
      return NextResponse.json({ error: "Number of travelers must be between 1 and 50." }, { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) throw new Error("Supabase environment variables are missing.");
    const db = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Save FIRST. A failed email must not erase a successful booking.
    const { data, error } = await db
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

    if (error || !data) {
      console.error("Supabase booking insert error:", error);
      return NextResponse.json(
        { error: "Could not save your booking request. Please try again." },
        { status: 500 }
      );
    }

    const info: NotificationInfo = {
      customerName: name,
      customerEmail: email,
      tourName: tourNameFromSlug(tourSlug),
      dates,
      travelers,
      phone,
      country,
      tripStyle,
      accommodation,
      message,
      bookingId: String(data.id),
      adminBookingUrl: `${new URL(request.url).origin}/admin/bookings/${data.id}`,
    };

    const adminEmailResult = await sendAdminNotification(info);
    const customerEmailResult = await sendCustomerConfirmation(info);

    return NextResponse.json(
      {
        ok: true,
        id: data.id,
        email: {
          adminNotification: adminEmailResult.sent,
          customerConfirmation: customerEmailResult.sent,
        },
        message: "Tibet trip request received. Our Tibet travel team will contact you.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

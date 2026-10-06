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

  return createClient(
    url,
    serviceKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

function cleanText(
  value: unknown,
  maxLength = 2000
) {
  if (
    typeof value !== "string"
  ) {
    return "";
  }

  return value
    .trim()
    .slice(0, maxLength);
}

function cleanOptionalText(
  value: unknown,
  maxLength = 500
) {
  const text =
    cleanText(
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
    return "Custom Tibet Journey";
  }

  const tourNames:
    Record<string, string> = {
    "lhasa-classic":
      "Lhasa Classic Journey",

    "lhasa-everest-base-camp":
      "Lhasa to Everest Base Camp",

    "lhoka-southern-tibet":
      "Lhoka (Southern Tibet)",

    "tibet-high-plateau":
      "Tibet High Plateau",

    "kailash-mansarovar-journey":
      "Kailash & Mansarovar Journey",

    "kailash-kora":
      "Mount Kailash Kora",

    "namtso-lake":
      "Lhasa & Namtso Lake",

    "tibet-photography":
      "Tibet Photography Journey",

    "tibet-culture-monasteries":
      "Tibet Culture & Monasteries",
  };

  if (
    tourNames[slug]
  ) {
    return tourNames[slug];
  }

  return slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0)
          .toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

function escapeHtml(
  value: string
) {
  return value
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );
}

/*
 * -----------------------------------------
 * FORMAT INLINE MARKDOWN
 * -----------------------------------------
 *
 * Converts:
 * **bold**
 *
 * Everything is escaped first,
 * so customer input cannot inject HTML.
 */

function formatInlineMarkdown(
  value: string
) {
  const safe =
    escapeHtml(value);

  return safe.replace(
    /\*\*(.+?)\*\*/g,
    "<strong>$1</strong>"
  );
}

function isMarkdownTableLine(
  line: string
) {
  const trimmed =
    line.trim();

  return (
    trimmed.startsWith("|") &&
    trimmed.endsWith("|")
  );
}

function isMarkdownSeparator(
  line: string
) {
  const cells =
    line
      .trim()
      .slice(1, -1)
      .split("|")
      .map(
        (cell) =>
          cell.trim()
      );

  return (
    cells.length > 0 &&
    cells.every(
      (cell) =>
        /^:?-{3,}:?$/.test(
          cell
        )
    )
  );
}

function parseMarkdownRow(
  line: string
) {
  return line
    .trim()
    .slice(1, -1)
    .split("|")
    .map(
      (cell) =>
        cell.trim()
    );
}

/*
 * -----------------------------------------
 * PROFESSIONAL EMAIL MESSAGE FORMATTER
 * -----------------------------------------
 *
 * This formats the AI itinerary into:
 *
 * - headings
 * - bold text
 * - clean paragraphs
 * - proper itinerary tables
 * - section labels
 *
 * Supabase still stores the original
 * plain text message unchanged.
 */

function renderBookingMessageHtml(
  message: string | null
) {
  if (!message) {
    return `
      <p
        style="
          margin:0;
          color:#60747b;
          line-height:1.7;
        "
      >
        No additional message.
      </p>
    `;
  }

  const lines =
    message.replace(
      /\r\n/g,
      "\n"
    ).split("\n");

  const html:
    string[] = [];

  let index = 0;

  while (
    index < lines.length
  ) {
    const rawLine =
      lines[index];

    const line =
      rawLine.trim();

    if (!line) {
      index += 1;
      continue;
    }

    /*
     * Decorative separator from
     * AI itinerary handoff.
     */

    if (
      /^={5,}$/.test(line)
    ) {
      index += 1;
      continue;
    }

    /*
     * Markdown table
     */

    if (
      isMarkdownTableLine(
        line
      )
    ) {
      const tableLines:
        string[] = [];

      while (
        index <
          lines.length &&
        isMarkdownTableLine(
          lines[index]
        )
      ) {
        tableLines.push(
          lines[index]
        );

        index += 1;
      }

      const rows =
        tableLines.filter(
          (row) =>
            !isMarkdownSeparator(
              row
            )
        );

      if (
        rows.length > 0
      ) {
        const header =
          parseMarkdownRow(
            rows[0]
          );

        const body =
          rows
            .slice(1)
            .map(
              parseMarkdownRow
            );

        html.push(`
          <div
            style="
              overflow-x:auto;
              margin:16px 0 22px;
              border:1px solid #dce6e8;
              border-radius:12px;
            "
          >
            <table
              role="presentation"
              style="
                width:100%;
                border-collapse:collapse;
                font-size:14px;
              "
            >
              <thead>
                <tr
                  style="
                    background:#eaf8f4;
                  "
                >
                  ${header
                    .map(
                      (cell) => `
                        <th
                          style="
                            text-align:left;
                            padding:12px 14px;
                            border-bottom:1px solid #d4e4e6;
                            color:#17353c;
                          "
                        >
                          ${formatInlineMarkdown(
                            cell
                          )}
                        </th>
                      `
                    )
                    .join("")}
                </tr>
              </thead>

              <tbody>
                ${body
                  .map(
                    (row) => `
                      <tr>
                        ${row
                          .map(
                            (
                              cell
                            ) => `
                              <td
                                style="
                                  padding:12px 14px;
                                  border-bottom:1px solid #e7edef;
                                  vertical-align:top;
                                  line-height:1.6;
                                "
                              >
                                ${formatInlineMarkdown(
                                  cell
                                )}
                              </td>
                            `
                          )
                          .join("")}
                      </tr>
                    `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        `);

        continue;
      }
    }

    /*
     * AI handoff section headings
     */

    if (
      line ===
      "AI-PLANNED TIBET JOURNEY"
    ) {
      html.push(`
        <div
          style="
            margin:24px 0 16px;
            padding:18px;
            border-radius:14px;
            background:#071a21;
            color:#ffffff;
          "
        >
          <div
            style="
              font-size:11px;
              color:#67e1c2;
              letter-spacing:1.6px;
              font-weight:800;
              margin-bottom:6px;
            "
          >
            AI JOURNEY
          </div>

          <div
            style="
              font-size:22px;
              font-weight:800;
              line-height:1.3;
            "
          >
            AI-Planned Tibet Journey
          </div>
        </div>
      `);

      index += 1;
      continue;
    }

    if (
      [
        "TRAVELER'S ORIGINAL AI REQUEST",
        "AI JOURNEY RECOMMENDATION",
        "LIVE RESEARCH STATUS",
        "RESEARCH NOTE",
        "LIVE RESEARCH SOURCES",
        "TRAVELER'S ADDITIONAL MESSAGE",
      ].includes(line)
    ) {
      html.push(`
        <div
          style="
            margin:20px 0 8px;
            color:#287866;
            font-size:11px;
            font-weight:800;
            letter-spacing:1.2px;
            text-transform:uppercase;
          "
        >
          ${escapeHtml(line)}
        </div>
      `);

      index += 1;
      continue;
    }

    /*
     * Markdown headings
     */

    if (
      line.startsWith(
        "### "
      )
    ) {
      html.push(`
        <h4
          style="
            margin:20px 0 8px;
            font-size:16px;
            line-height:1.4;
            color:#17353c;
          "
        >
          ${formatInlineMarkdown(
            line.slice(4)
          )}
        </h4>
      `);

      index += 1;
      continue;
    }

    if (
      line.startsWith(
        "## "
      )
    ) {
      html.push(`
        <h3
          style="
            margin:24px 0 10px;
            font-size:19px;
            line-height:1.4;
            color:#10242b;
          "
        >
          ${formatInlineMarkdown(
            line.slice(3)
          )}
        </h3>
      `);

      index += 1;
      continue;
    }

    if (
      line.startsWith(
        "# "
      )
    ) {
      html.push(`
        <h2
          style="
            margin:24px 0 10px;
            font-size:22px;
            line-height:1.35;
            color:#10242b;
          "
        >
          ${formatInlineMarkdown(
            line.slice(2)
          )}
        </h2>
      `);

      index += 1;
      continue;
    }

    /*
     * Bullet list
     */

    if (
      line.startsWith(
        "- "
      ) ||
      line.startsWith(
        "* "
      )
    ) {
      const items:
        string[] = [];

      while (
        index <
          lines.length &&
        (
          lines[index]
            .trim()
            .startsWith(
              "- "
            ) ||
          lines[index]
            .trim()
            .startsWith(
              "* "
            )
        )
      ) {
        items.push(
          lines[index]
            .trim()
            .slice(2)
        );

        index += 1;
      }

      html.push(`
        <ul
          style="
            margin:10px 0 18px;
            padding-left:22px;
            line-height:1.7;
          "
        >
          ${items
            .map(
              (item) => `
                <li
                  style="
                    margin-bottom:6px;
                  "
                >
                  ${formatInlineMarkdown(
                    item
                  )}
                </li>
              `
            )
            .join("")}
        </ul>
      `);

      continue;
    }

    /*
     * Normal paragraph
     */

    html.push(`
      <p
        style="
          margin:7px 0 13px;
          line-height:1.7;
          color:#304b52;
        "
      >
        ${formatInlineMarkdown(
          line
        )}
      </p>
    `);

    index += 1;
  }

  return html.join("");
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
      reason:
        "missing_api_key",
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
    payload.reply_to =
      replyTo;
  }

  const response =
    await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${resendApiKey}`,

          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            payload
          ),
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
      reason:
        "resend_error",
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
  accommodation:
    string | null;
  message: string | null;
  bookingId: string;
  adminBookingUrl: string;
}) {
  const notificationEmail =
    process.env
      .BOOKING_NOTIFICATION_EMAIL
      ?.trim();

  if (
    !notificationEmail
  ) {
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
    process.env.RESEND_FROM_EMAIL
      ?.trim();

  /*
   * Until you own and verify a domain,
   * Resend's test sender is used.
   */

  const from =
    verifiedFrom ||
    "Himalayan26 <onboarding@resend.dev>";

  const safeName =
    escapeHtml(
      customerName
    );

  const safeEmail =
    escapeHtml(
      customerEmail
    );

  const safeTour =
    escapeHtml(
      tourName
    );

  const safeDates =
    escapeHtml(
      dates ||
        "Not specified"
    );

  const safePhone =
    escapeHtml(
      phone ||
        "Not provided"
    );

  const safeCountry =
    escapeHtml(
      country ||
        "Not provided"
    );

  const safeTripStyle =
    escapeHtml(
      tripStyle ||
        "Not specified"
    );

  const safeAccommodation =
    escapeHtml(
      accommodation ||
        "Not specified"
    );

  const safeBookingId =
    escapeHtml(
      bookingId
    );

  const safeAdminUrl =
    escapeHtml(
      adminBookingUrl
    );

  const formattedMessage =
    renderBookingMessageHtml(
      message
    );

  const subject =
    `New Tibet trip request: ${tourName}`;

  const text =
`NEW TIBET BOOKING REQUEST

Customer: ${customerName}
Customer email: ${customerEmail}

Tibet journey: ${tourName}
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
      max-width:720px;
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
        New Tibet trip request
      </h1>

      <p
        style="
          margin:0;
          color:#b8c8cc;
          line-height:1.6;
        "
      >
        A traveler has submitted a new Tibet journey request.
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
        role="presentation"
        style="
          width:100%;
          border-collapse:collapse;
          font-size:15px;
        "
      >
        <tr>
          <td
            style="
              padding:9px 0;
              color:#728187;
              width:42%;
            "
          >
            Name
          </td>

          <td
            style="
              padding:9px 0;
              font-weight:700;
            "
          >
            ${safeName}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding:9px 0;
              color:#728187;
            "
          >
            Email
          </td>

          <td
            style="
              padding:9px 0;
              font-weight:700;
            "
          >
            ${safeEmail}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding:9px 0;
              color:#728187;
            "
          >
            Phone / WhatsApp
          </td>

          <td
            style="
              padding:9px 0;
              font-weight:700;
            "
          >
            ${safePhone}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding:9px 0;
              color:#728187;
            "
          >
            Country
          </td>

          <td
            style="
              padding:9px 0;
              font-weight:700;
            "
          >
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
        Tibet journey details
      </h2>

      <table
        role="presentation"
        style="
          width:100%;
          border-collapse:collapse;
          font-size:15px;
        "
      >
        <tr>
          <td
            style="
              padding:9px 0;
              color:#728187;
              width:42%;
            "
          >
            Journey
          </td>

          <td
            style="
              padding:9px 0;
              font-weight:700;
            "
          >
            ${safeTour}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding:9px 0;
              color:#728187;
            "
          >
            Preferred dates
          </td>

          <td
            style="
              padding:9px 0;
              font-weight:700;
            "
          >
            ${safeDates}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding:9px 0;
              color:#728187;
            "
          >
            Travelers
          </td>

          <td
            style="
              padding:9px 0;
              font-weight:700;
            "
          >
            ${travelers}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding:9px 0;
              color:#728187;
            "
          >
            Trip style
          </td>

          <td
            style="
              padding:9px 0;
              font-weight:700;
            "
          >
            ${safeTripStyle}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding:9px 0;
              color:#728187;
            "
          >
            Accommodation
          </td>

          <td
            style="
              padding:9px 0;
              font-weight:700;
            "
          >
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
          margin:0 0 6px;
          font-size:20px;
        "
      >
        Journey request & AI itinerary
      </h2>

      <p
        style="
          margin:0 0 18px;
          color:#728187;
          font-size:13px;
          line-height:1.6;
        "
      >
        Customer notes and any AI-planned Tibet itinerary are shown below.
      </p>

      <div
        style="
          background:#f7fafb;
          padding:20px;
          border-radius:14px;
          border:1px solid #e5edef;
        "
      >
        ${formattedMessage}
      </div>
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
    to:
      notificationEmail,
    subject,
    text,
    html,

    /*
     * Pressing Reply in the
     * notification email replies
     * directly to the traveler.
     */

    replyTo:
      customerEmail,
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
  accommodation:
    string | null;
  bookingId: string;
}) {
  /*
   * Customer email stays disabled
   * until you have a verified
   * sending domain.
   */

  const verifiedFrom =
    process.env
      .RESEND_FROM_EMAIL
      ?.trim();

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
    escapeHtml(
      customerName
    );

  const safeTour =
    escapeHtml(
      tourName
    );

  const safeDates =
    escapeHtml(
      dates ||
        "Not specified"
    );

  const safeTripStyle =
    escapeHtml(
      tripStyle ||
        "Not specified"
    );

  const safeAccommodation =
    escapeHtml(
      accommodation ||
        "Not specified"
    );

  const safeBookingId =
    escapeHtml(
      bookingId
    );

  const subject =
    "We received your Tibet journey request";

  const text =
`Hello ${customerName},

Thank you for contacting Himalayan26.

We received your Tibet journey request.

Journey: ${tourName}
Preferred dates: ${dates || "Not specified"}
Travelers: ${travelers}
Trip style: ${tripStyle || "Not specified"}
Accommodation: ${accommodation || "Not specified"}

Our Tibet travel team will review your request and contact you with the next steps.

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
        We received your Tibet journey request.
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
          margin-top:0;
        "
      >
        Your Tibet request
      </h2>

      <p>
        <strong>
          Journey:
        </strong>

        ${safeTour}
      </p>

      <p>
        <strong>
          Preferred dates:
        </strong>

        ${safeDates}
      </p>

      <p>
        <strong>
          Travelers:
        </strong>

        ${travelers}
      </p>

      <p>
        <strong>
          Trip style:
        </strong>

        ${safeTripStyle}
      </p>

      <p>
        <strong>
          Accommodation:
        </strong>

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
      <h2
        style="
          margin-top:0;
        "
      >
        What happens next?
      </h2>

      <p
        style="
          line-height:1.7;
        "
      >
        Our Tibet travel team will review your request and contact you about the proposed journey, availability and next steps.
      </p>

      <p
        style="
          line-height:1.7;
          color:#60747b;
          margin-bottom:0;
        "
      >
        Final itinerary, services, current travel requirements, availability and pricing should be confirmed before booking.
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
    from:
      verifiedFrom,

    to:
      customerEmail,

    subject,
    text,
    html,
  });
}

export async function POST(
  request: Request
) {
  try {
    let body:
      BookingBody;

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

    const name =
      cleanText(
        body.name,
        150
      );

    const email =
      cleanText(
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

    /*
     * AI itineraries can be longer
     * than an ordinary customer note.
     *
     * Keep enough space so the full
     * itinerary reaches Supabase
     * and the notification email.
     */

    const message =
      cleanOptionalText(
        body.message,
        12000
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
      !isValidEmail(
        email
      )
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
      Number(
        body.travelers
      );

    if (
      !Number.isFinite(
        travelers
      )
    ) {
      travelers = 1;
    }

    travelers =
      Math.floor(
        travelers
      );

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

    const db =
      getDb();

    /*
     * Save the booking FIRST.
     *
     * Email problems must never
     * cause a customer's booking
     * request to be lost.
     */

    const {
      data,
      error,
    } = await db
      .from("bookings")
      .insert({
        tour_slug:
          tourSlug,

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

        status:
          "new",
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
     * Admin notification
     */

    const adminEmailResult =
      await sendAdminNotification({
        customerName:
          name,

        customerEmail:
          email,

        tourName,

        dates,

        travelers,

        phone,

        country,

        tripStyle,

        accommodation,

        message,

        bookingId:
          data.id,

        adminBookingUrl,
      });

    /*
     * Customer confirmation remains
     * disabled until you later add
     * a verified RESEND_FROM_EMAIL.
     */

    const customerEmailResult =
      await sendCustomerConfirmation({
        customerName:
          name,

        customerEmail:
          email,

        tourName,

        dates,

        travelers,

        tripStyle,

        accommodation,

        bookingId:
          data.id,
      });

    return NextResponse.json(
      {
        ok: true,

        id:
          data.id,

        email: {
          adminNotification:
            adminEmailResult.sent,

          customerConfirmation:
            customerEmailResult.sent,
        },

        message:
          "Tibet trip request received. Our Tibet travel team will contact you.",
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

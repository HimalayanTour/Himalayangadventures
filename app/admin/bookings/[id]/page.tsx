import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Booking = {
  id: string;
  tour_slug: string | null;
  name: string;
  email: string;
  dates: string | null;
  travelers: number | null;
  message: string | null;
  status: string | null;
  admin_notes: string | null;
  created_at: string;
  phone: string | null;
  country: string | null;
  trip_style: string | null;
  accommodation: string | null;
};

type EmailTemplate =
  | "received"
  | "followup"
  | "confirmed";

type ParsedMessage = {
  phone: string;
  country: string;
  tripStyle: string;
  accommodation: string;
  customerMessage: string;
};

const allowedStatuses = [
  "new",
  "contacted",
  "confirmed",
  "cancelled",
];

function makeAdminToken(
  password: string
) {
  return createHash("sha256")
    .update(password)
    .digest("hex");
}

async function isAdminLoggedIn() {
  const password =
    process.env.ADMIN_PASSWORD;

  if (!password) {
    return false;
  }

  const cookieStore =
    await cookies();

  const session =
    cookieStore.get(
      "admin_session"
    )?.value;

  return (
    !!session &&
    session ===
      makeAdminToken(password)
  );
}

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

function parseBookingMessage(
  message: string | null
): ParsedMessage {
  const text =
    message?.trim() || "";

  if (!text) {
    return {
      phone: "Not provided",
      country: "Not provided",
      tripStyle: "Not specified",
      accommodation:
        "Not specified",
      customerMessage:
        "No additional message.",
    };
  }

  const hasStructuredData =
    text.includes(
      "Phone / WhatsApp:"
    ) ||
    text.includes("Country:") ||
    text.includes("Trip style:") ||
    text.includes(
      "Accommodation:"
    );

  if (!hasStructuredData) {
    return {
      phone: "Not provided",
      country: "Not provided",
      tripStyle: "Not specified",
      accommodation:
        "Not specified",
      customerMessage: text,
    };
  }

  const lines =
    text.split("\n");

  let phone =
    "Not provided";

  let country =
    "Not provided";

  let tripStyle =
    "Not specified";

  let accommodation =
    "Not specified";

  let readingCustomerMessage =
    false;

  const customerMessageLines:
    string[] = [];

  for (const line of lines) {
    const trimmed =
      line.trim();

    if (
      trimmed.startsWith(
        "Phone / WhatsApp:"
      )
    ) {
      phone =
        trimmed
          .replace(
            "Phone / WhatsApp:",
            ""
          )
          .trim() ||
        "Not provided";

      continue;
    }

    if (
      trimmed.startsWith(
        "Country:"
      )
    ) {
      country =
        trimmed
          .replace(
            "Country:",
            ""
          )
          .trim() ||
        "Not provided";

      continue;
    }

    if (
      trimmed.startsWith(
        "Trip style:"
      )
    ) {
      tripStyle =
        trimmed
          .replace(
            "Trip style:",
            ""
          )
          .trim() ||
        "Not specified";

      continue;
    }

    if (
      trimmed.startsWith(
        "Accommodation:"
      )
    ) {
      accommodation =
        trimmed
          .replace(
            "Accommodation:",
            ""
          )
          .trim() ||
        "Not specified";

      continue;
    }

    if (
      trimmed ===
      "Customer message:"
    ) {
      readingCustomerMessage =
        true;

      continue;
    }

    if (
      readingCustomerMessage
    ) {
      customerMessageLines.push(
        line
      );
    }
  }

  return {
    phone,
    country,
    tripStyle,
    accommodation,
    customerMessage:
      customerMessageLines
        .join("\n")
        .trim() ||
      "No additional message.",
  };
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

function makeEmailLink(
  email: string,
  subject: string,
  body: string
) {
  return `mailto:${encodeURIComponent(
    email
  )}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(
    body
  )}`;
}

function buildTemplate({
  template,
  booking,
  tourName,
  tripStyle,
  accommodation,
}: {
  template: EmailTemplate;
  booking: Booking;
  tourName: string;
  tripStyle: string;
  accommodation: string;
}) {
  if (
    template === "received"
  ) {
    return {
      subject:
        "We received your Himalayan tour booking request",

      text: `Hello ${booking.name},

Thank you for contacting Himalayan26.

We have received your booking request for ${tourName}.

Preferred dates: ${booking.dates || "Not specified"}
Travelers: ${booking.travelers ?? "Not specified"}
Trip style: ${tripStyle}
Accommodation: ${accommodation}

Our team is reviewing your request and will contact you with the next steps.

Best regards,
Himalayan26`,
    };
  }

  if (
    template === "followup"
  ) {
    return {
      subject:
        "More information needed for your Himalayan journey",

      text: `Hello ${booking.name},

Thank you for your interest in ${tourName}.

To help us prepare the right journey for you, could you please send us any missing information about your trip?

• Preferred travel dates
• Number of travelers
• Fitness or trekking experience
• Special interests or requirements
• Preferred accommodation level

Once we receive these details, we can prepare the next steps for your Himalayan journey.

Best regards,
Himalayan26`,
    };
  }

  return {
    subject:
      "Your Himalayan tour booking is confirmed",

    text: `Hello ${booking.name},

We are pleased to confirm your Himalayan journey.

Tour: ${tourName}
Preferred dates: ${booking.dates || "To be confirmed"}
Travelers: ${booking.travelers ?? "Not specified"}
Trip style: ${tripStyle}
Accommodation: ${accommodation}

We will contact you with the detailed itinerary, preparation information and payment next steps.

Thank you for choosing Himalayan26.

Best regards,
Himalayan26`,
  };
}

function makeHtmlEmail({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const paragraphs =
    text
      .split("\n")
      .map((line) =>
        escapeHtml(line)
      )
      .join("<br />");

  return `
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
          margin:12px 0 0;
          font-size:28px;
          line-height:1.25;
        "
      >
        ${escapeHtml(title)}
      </h1>
    </div>

    <div
      style="
        margin-top:18px;
        background:#ffffff;
        border:1px solid #e4ebed;
        border-radius:20px;
        padding:28px;
        font-size:15px;
        line-height:1.75;
      "
    >
      ${paragraphs}
    </div>

    <div
      style="
        margin-top:24px;
        text-align:center;
        color:#839197;
        font-size:12px;
      "
    >
      Himalayan26
    </div>
  </div>
</body>
</html>
`;
}

async function updateBookingStatus(
  formData: FormData
) {
  "use server";

  const loggedIn =
    await isAdminLoggedIn();

  if (!loggedIn) {
    redirect("/admin");
  }

  const id = String(
    formData.get("id") || ""
  );

  const status = String(
    formData.get("status") || ""
  );

  if (
    !id ||
    !allowedStatuses.includes(
      status
    )
  ) {
    return;
  }

  const db = getDb();

  const { error } =
    await db
      .from("bookings")
      .update({
        status,
      })
      .eq("id", id);

  if (error) {
    throw new Error(
      `Could not update booking status: ${error.message}`
    );
  }

  revalidatePath("/admin");

  revalidatePath(
    `/admin/bookings/${id}`
  );

  redirect(
    `/admin/bookings/${id}?statusSaved=1`
  );
}

async function saveAdminNotes(
  formData: FormData
) {
  "use server";

  const loggedIn =
    await isAdminLoggedIn();

  if (!loggedIn) {
    redirect("/admin");
  }

  const id = String(
    formData.get("id") || ""
  );

  const notes = String(
    formData.get(
      "admin_notes"
    ) || ""
  ).trim();

  if (!id) {
    return;
  }

  const db = getDb();

  const { error } =
    await db
      .from("bookings")
      .update({
        admin_notes:
          notes || null,
      })
      .eq("id", id);

  if (error) {
    throw new Error(
      `Could not save admin notes: ${error.message}`
    );
  }

  revalidatePath("/admin");

  revalidatePath(
    `/admin/bookings/${id}`
  );

  redirect(
    `/admin/bookings/${id}?saved=1`
  );
}

async function sendCustomerEmail(
  formData: FormData
) {
  "use server";

  const loggedIn =
    await isAdminLoggedIn();

  if (!loggedIn) {
    redirect("/admin");
  }

  const id = String(
    formData.get("id") || ""
  );

  const template =
    String(
      formData.get(
        "template"
      ) || ""
    ) as EmailTemplate;

  if (
    !id ||
    ![
      "received",
      "followup",
      "confirmed",
    ].includes(template)
  ) {
    return;
  }

  /*
    IMPORTANT:

    Direct customer email is only
    enabled after a real sending
    domain is verified.

    This prevents the dashboard from
    claiming an email was sent when
    Resend test mode cannot send to
    arbitrary customers.
  */

  const fromEmail =
    process.env.RESEND_FROM_EMAIL?.trim();

  if (!fromEmail) {
    redirect(
      `/admin/bookings/${id}?emailError=noDomain`
    );
  }

  const resendApiKey =
    process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    redirect(
      `/admin/bookings/${id}?emailError=noKey`
    );
  }

  const db = getDb();

  const {
    data,
    error,
  } = await db
    .from("bookings")
    .select(
      `
        id,
        tour_slug,
        name,
        email,
        dates,
        travelers,
        message,
        status,
        admin_notes,
        created_at,
        phone,
        country,
        trip_style,
        accommodation
      `
    )
    .eq("id", id)
    .maybeSingle();

  if (
    error ||
    !data
  ) {
    redirect(
      `/admin/bookings/${id}?emailError=booking`
    );
  }

  const booking =
    data as Booking;

  const legacy =
    parseBookingMessage(
      booking.message
    );

  const tripStyle =
    booking.trip_style?.trim() ||
    legacy.tripStyle;

  const accommodation =
    booking.accommodation?.trim() ||
    legacy.accommodation;

  const tourName =
    formatTourName(
      booking.tour_slug
    );

  const emailTemplate =
    buildTemplate({
      template,
      booking,
      tourName,
      tripStyle,
      accommodation,
    });

  const html =
    makeHtmlEmail({
      title:
        emailTemplate.subject,
      text:
        emailTemplate.text,
    });

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

        body: JSON.stringify({
          from: fromEmail,

          to: [
            booking.email,
          ],

          subject:
            emailTemplate.subject,

          text:
            emailTemplate.text,

          html,
        }),
      }
    );

  if (!response.ok) {
    const result =
      await response.text();

    console.error(
      "Direct customer email failed:",
      result
    );

    redirect(
      `/admin/bookings/${id}?emailError=resend`
    );
  }

  /*
    Automatically move the booking
    status forward after a successful
    customer email.
  */

  const nextStatus =
    template === "confirmed"
      ? "confirmed"
      : "contacted";

  await db
    .from("bookings")
    .update({
      status: nextStatus,
    })
    .eq("id", id);

  revalidatePath("/admin");

  revalidatePath(
    `/admin/bookings/${id}`
  );

  redirect(
    `/admin/bookings/${id}?emailSent=${template}`
  );
}

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;

  searchParams?: Promise<{
    saved?: string;
    statusSaved?: string;
    emailSent?: string;
    emailError?: string;
  }>;
}) {
  const loggedIn =
    await isAdminLoggedIn();

  if (!loggedIn) {
    redirect("/admin");
  }

  const { id } =
    await params;

  const query =
    searchParams
      ? await searchParams
      : {};

  const db = getDb();

  const {
    data,
    error,
  } = await db
    .from("bookings")
    .select(
      `
        id,
        tour_slug,
        name,
        email,
        dates,
        travelers,
        message,
        status,
        admin_notes,
        created_at,
        phone,
        country,
        trip_style,
        accommodation
      `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Could not load booking: ${error.message}`
    );
  }

  if (!data) {
    notFound();
  }

  const booking =
    data as Booking;

  const legacy =
    parseBookingMessage(
      booking.message
    );

  const phone =
    booking.phone?.trim() ||
    legacy.phone;

  const country =
    booking.country?.trim() ||
    legacy.country;

  const tripStyle =
    booking.trip_style?.trim() ||
    legacy.tripStyle;

  const accommodation =
    booking.accommodation?.trim() ||
    legacy.accommodation;

  const customerMessage =
    legacy.customerMessage;

  const currentStatus =
    booking.status || "new";

  const tourName =
    formatTourName(
      booking.tour_slug
    );

  const receivedDate =
    new Date(
      booking.created_at
    ).toLocaleString();

  const received =
    buildTemplate({
      template: "received",
      booking,
      tourName,
      tripStyle,
      accommodation,
    });

  const followup =
    buildTemplate({
      template: "followup",
      booking,
      tourName,
      tripStyle,
      accommodation,
    });

  const confirmed =
    buildTemplate({
      template: "confirmed",
      booking,
      tourName,
      tripStyle,
      accommodation,
    });

  const receivedLink =
    makeEmailLink(
      booking.email,
      received.subject,
      received.text
    );

  const followupLink =
    makeEmailLink(
      booking.email,
      followup.subject,
      followup.text
    );

  const confirmedLink =
    makeEmailLink(
      booking.email,
      confirmed.subject,
      confirmed.text
    );

  const customLink =
    makeEmailLink(
      booking.email,
      "Your Himalayan tour booking request",
      ""
    );

  const directEmailReady =
    Boolean(
      process.env.RESEND_FROM_EMAIL
    );

  const infoBoxStyle = {
    padding: "16px",
    borderRadius: "14px",
    border:
      "1px solid rgba(255,255,255,0.12)",
    background:
      "rgba(255,255,255,0.035)",
  };

  return (
    <main
      className="container"
      style={{
        paddingTop: 42,
        paddingBottom: 80,
      }}
    >
      <div
        style={{
          marginBottom: 24,
        }}
      >
        <a
          href="/admin"
          className="btn"
        >
          ← Back to dashboard
        </a>
      </div>

      {query.statusSaved ===
        "1" && (
        <div
          className="notice"
          style={{
            marginBottom: 20,
          }}
        >
          Booking status updated
          successfully.
        </div>
      )}

      {query.saved === "1" && (
        <div
          className="notice"
          style={{
            marginBottom: 20,
          }}
        >
          Private admin notes saved.
        </div>
      )}

      {query.emailSent && (
        <div
          className="notice"
          style={{
            marginBottom: 20,
          }}
        >
          Customer email sent
          successfully through
          Resend. ✓
        </div>
      )}

      {query.emailError ===
        "noDomain" && (
        <div
          className="notice"
          style={{
            marginBottom: 20,
          }}
        >
          Direct sending is not
          enabled yet because no
          verified Resend domain is
          connected. Use the
          <strong> Open email </strong>
          button for now.
        </div>
      )}

      {query.emailError ===
        "noKey" && (
        <div
          className="notice"
          style={{
            marginBottom: 20,
          }}
        >
          RESEND_API_KEY is missing
          from the server.
        </div>
      )}

      {query.emailError ===
        "resend" && (
        <div
          className="notice"
          style={{
            marginBottom: 20,
          }}
        >
          Resend could not deliver
          the customer email. No
          booking information was
          lost.
        </div>
      )}

      {/* CUSTOMER */}

      <section
        className="card"
        style={{
          marginBottom: 24,
        }}
      >
        <span className="pill">
          {currentStatus}
        </span>

        <h1
          style={{
            marginTop: 16,
            marginBottom: 26,
          }}
        >
          Customer information
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
          }}
        >
          {[
            [
              "Customer",
              booking.name,
            ],

            [
              "Email",
              booking.email,
            ],

            [
              "Phone / WhatsApp",
              phone,
            ],

            [
              "Country",
              country,
            ],

            [
              "Tour",
              tourName,
            ],

            [
              "Preferred dates",
              booking.dates ||
                "Not specified",
            ],

            [
              "Travelers",
              booking.travelers ??
                "Not specified",
            ],

            [
              "Trip style",
              tripStyle,
            ],

            [
              "Accommodation",
              accommodation,
            ],

            [
              "Received",
              receivedDate,
            ],
          ].map(
            ([label, value]) => (
              <div
                key={String(label)}
                style={infoBoxStyle}
              >
                <div className="muted">
                  {label}
                </div>

                <strong>
                  {value}
                </strong>
              </div>
            )
          )}
        </div>

        <div
          style={{
            marginTop: 22,
          }}
        >
          <strong>
            Customer message
          </strong>

          <div
            style={{
              ...infoBoxStyle,
              whiteSpace:
                "pre-wrap",
              lineHeight: 1.6,
              marginTop: 9,
            }}
          >
            {customerMessage}
          </div>
        </div>
      </section>

      {/* STATUS */}

      <section
        className="card"
        style={{
          marginBottom: 24,
        }}
      >
        <span className="pill">
          BOOKING STATUS
        </span>

        <h2>
          Manage status
        </h2>

        <p className="muted">
          Current status:{" "}
          <strong>
            {currentStatus}
          </strong>
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {allowedStatuses.map(
            (status) => (
              <form
                key={status}
                action={
                  updateBookingStatus
                }
              >
                <input
                  type="hidden"
                  name="id"
                  value={booking.id}
                />

                <input
                  type="hidden"
                  name="status"
                  value={status}
                />

                <button
                  className="btn"
                  type="submit"
                  disabled={
                    currentStatus ===
                    status
                  }
                >
                  {status}
                </button>
              </form>
            )
          )}
        </div>
      </section>

      {/* NOTES */}

      <section
        className="card"
        style={{
          marginBottom: 24,
        }}
      >
        <span className="pill">
          PRIVATE
        </span>

        <h2>
          Private admin notes
        </h2>

        <p className="muted">
          These notes are for your
          team only and are never
          shown to customers.
        </p>

        <form
          action={saveAdminNotes}
        >
          <input
            type="hidden"
            name="id"
            value={booking.id}
          />

          <div className="field">
            <label
              htmlFor="admin_notes"
            >
              Notes
            </label>

            <textarea
              id="admin_notes"
              name="admin_notes"
              rows={7}
              defaultValue={
                booking.admin_notes ||
                ""
              }
              placeholder="Add private notes about this booking..."
            />
          </div>

          <button
            className="btn"
            type="submit"
          >
            Save notes
          </button>
        </form>
      </section>

      {/* EMAIL */}

      <section className="card">
        <span className="pill">
          CUSTOMER EMAIL
        </span>

        <h2>
          Contact customer
        </h2>

        {directEmailReady ? (
          <div
            className="notice"
            style={{
              marginBottom: 22,
            }}
          >
            Direct customer email is
            enabled. Emails can be
            sent securely through
            Resend.
          </div>
        ) : (
          <div
            className="notice"
            style={{
              marginBottom: 22,
            }}
          >
            <strong>
              Direct sending is
              prepared but not active
              yet.
            </strong>
            <br />
            Until you connect a
            verified domain, use
            <strong>
              {" "}
              Open email
            </strong>
            . When you later add
            `RESEND_FROM_EMAIL`,
            direct sending will
            automatically unlock.
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
          }}
        >
          {/* RECEIVED */}

          <div style={infoBoxStyle}>
            <span className="pill">
              RECEIVED
            </span>

            <h3>
              Booking received
            </h3>

            <p className="muted">
              Thank the traveler and
              confirm that the request
              is being reviewed.
            </p>

            {directEmailReady && (
              <form
                action={
                  sendCustomerEmail
                }
                style={{
                  marginBottom: 10,
                }}
              >
                <input
                  type="hidden"
                  name="id"
                  value={booking.id}
                />

                <input
                  type="hidden"
                  name="template"
                  value="received"
                />

                <button
                  className="btn"
                  type="submit"
                >
                  Send with Resend
                </button>
              </form>
            )}

            <a
              className="btn"
              href={receivedLink}
            >
              Open email
            </a>
          </div>

          {/* FOLLOWUP */}

          <div style={infoBoxStyle}>
            <span className="pill">
              FOLLOW UP
            </span>

            <h3>
              Need more information
            </h3>

            <p className="muted">
              Ask the customer for
              missing travel details.
            </p>

            {directEmailReady && (
              <form
                action={
                  sendCustomerEmail
                }
                style={{
                  marginBottom: 10,
                }}
              >
                <input
                  type="hidden"
                  name="id"
                  value={booking.id}
                />

                <input
                  type="hidden"
                  name="template"
                  value="followup"
                />

                <button
                  className="btn"
                  type="submit"
                >
                  Send with Resend
                </button>
              </form>
            )}

            <a
              className="btn"
              href={followupLink}
            >
              Open email
            </a>
          </div>

          {/* CONFIRMED */}

          <div style={infoBoxStyle}>
            <span className="pill">
              CONFIRMED
            </span>

            <h3>
              Booking confirmed
            </h3>

            <p className="muted">
              Confirm the journey and
              explain the next steps.
            </p>

            {directEmailReady && (
              <form
                action={
                  sendCustomerEmail
                }
                style={{
                  marginBottom: 10,
                }}
              >
                <input
                  type="hidden"
                  name="id"
                  value={booking.id}
                />

                <input
                  type="hidden"
                  name="template"
                  value="confirmed"
                />

                <button
                  className="btn"
                  type="submit"
                >
                  Send with Resend
                </button>
              </form>
            )}

            <a
              className="btn"
              href={confirmedLink}
            >
              Open email
            </a>
          </div>

          {/* CUSTOM */}

          <div style={infoBoxStyle}>
            <span className="pill">
              CUSTOM
            </span>

            <h3>
              Write custom email
            </h3>

            <p className="muted">
              Write a completely
              custom message to this
              traveler.
            </p>

            <a
              className="btn"
              href={customLink}
            >
              Write email
            </a>
          </div>
        </div>

        <div
          className="notice"
          style={{
            marginTop: 20,
          }}
        >
          Customer:{" "}
          <strong>
            {booking.email}
          </strong>
        </div>
      </section>
    </main>
  );
}

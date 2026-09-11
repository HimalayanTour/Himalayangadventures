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
};

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

function makeAdminToken(password: string) {
  return createHash("sha256")
    .update(password)
    .digest("hex");
}

async function isAdminLoggedIn() {
  const adminPassword =
    process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return false;
  }

  const cookieStore = await cookies();

  const session =
    cookieStore.get("admin_session")?.value;

  if (!session) {
    return false;
  }

  return (
    session === makeAdminToken(adminPassword)
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

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function formatTourName(
  slug: string | null
) {
  if (!slug) {
    return "Custom Himalayan journey";
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
  const text = message?.trim() || "";

  if (!text) {
    return {
      phone: "Not provided",
      country: "Not provided",
      tripStyle: "Not specified",
      accommodation: "Not specified",
      customerMessage:
        "No additional message.",
    };
  }

  /*
    New booking form messages look like:

    Phone / WhatsApp: ...
    Country: ...
    Trip style: ...
    Accommodation: ...

    Customer message:
    ...

    Older bookings did not use this format.
    Those are displayed normally as the
    customer message.
  */

  const hasStructuredData =
    text.includes("Phone / WhatsApp:") ||
    text.includes("Country:") ||
    text.includes("Trip style:") ||
    text.includes("Accommodation:");

  if (!hasStructuredData) {
    return {
      phone: "Not provided",
      country: "Not provided",
      tripStyle: "Not specified",
      accommodation: "Not specified",
      customerMessage: text,
    };
  }

  const lines = text.split("\n");

  let phone = "Not provided";
  let country = "Not provided";
  let tripStyle = "Not specified";
  let accommodation = "Not specified";

  const customerMessageLines: string[] =
    [];

  let readingCustomerMessage = false;

  for (const line of lines) {
    const trimmed = line.trim();

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
          .trim() || "Not provided";

      continue;
    }

    if (
      trimmed.startsWith("Country:")
    ) {
      country =
        trimmed
          .replace("Country:", "")
          .trim() || "Not provided";

      continue;
    }

    if (
      trimmed.startsWith("Trip style:")
    ) {
      tripStyle =
        trimmed
          .replace("Trip style:", "")
          .trim() || "Not specified";

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
          .trim() || "Not specified";

      continue;
    }

    if (
      trimmed === "Customer message:"
    ) {
      readingCustomerMessage = true;
      continue;
    }

    if (readingCustomerMessage) {
      customerMessageLines.push(line);
    }
  }

  const customerMessage =
    customerMessageLines
      .join("\n")
      .trim() ||
    "No additional message.";

  return {
    phone,
    country,
    tripStyle,
    accommodation,
    customerMessage,
  };
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
  )}&body=${encodeURIComponent(body)}`;
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
    !allowedStatuses.includes(status)
  ) {
    return;
  }

  const db = getDb();

  const { error } = await db
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
    formData.get("admin_notes") || ""
  ).trim();

  if (!id) {
    return;
  }

  const db = getDb();

  const { error } = await db
    .from("bookings")
    .update({
      admin_notes: notes || null,
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
  }>;
}) {
  const loggedIn =
    await isAdminLoggedIn();

  if (!loggedIn) {
    redirect("/admin");
  }

  const { id } = await params;

  const query =
    searchParams
      ? await searchParams
      : {};

  const db = getDb();

  const { data, error } = await db
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
        created_at
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

  const booking = data as Booking;

  const parsed =
    parseBookingMessage(
      booking.message
    );

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

  const receivedSubject =
    "We received your Himalayan tour booking request";

  const receivedBody = `Hello ${booking.name},

Thank you for contacting Himalayan26.

We have received your booking request for ${tourName}.

Preferred dates: ${booking.dates || "Not specified"}
Travelers: ${booking.travelers || "Not specified"}

Our team is reviewing your request and will contact you with the next steps.

Best regards,
Himalayan26`;

  const moreInformationSubject =
    "More information needed for your Himalayan journey";

  const moreInformationBody = `Hello ${booking.name},

Thank you for your interest in ${tourName}.

To help us prepare the right journey for you, could you please send us a little more information?

• Preferred travel dates
• Number of travelers
• Fitness or trekking experience
• Special interests or requirements
• Preferred accommodation level

Once we receive these details, we can prepare the next steps for your Himalayan journey.

Best regards,
Himalayan26`;

  const confirmedSubject =
    "Your Himalayan tour booking is confirmed";

  const confirmedBody = `Hello ${booking.name},

We are pleased to confirm your Himalayan journey.

Tour: ${tourName}
Preferred dates: ${booking.dates || "To be confirmed"}
Travelers: ${booking.travelers || "Not specified"}

We will contact you with the detailed itinerary, preparation information and payment next steps.

Thank you for choosing Himalayan26.

Best regards,
Himalayan26`;

  const customSubject =
    "Your Himalayan tour booking request";

  const receivedEmailLink =
    makeEmailLink(
      booking.email,
      receivedSubject,
      receivedBody
    );

  const moreInfoEmailLink =
    makeEmailLink(
      booking.email,
      moreInformationSubject,
      moreInformationBody
    );

  const confirmedEmailLink =
    makeEmailLink(
      booking.email,
      confirmedSubject,
      confirmedBody
    );

  const customEmailLink =
    makeEmailLink(
      booking.email,
      customSubject,
      ""
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

      {query.statusSaved === "1" && (
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
          Private admin notes saved
          successfully.
        </div>
      )}

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
          <div style={infoBoxStyle}>
            <div className="muted">
              Customer
            </div>

            <strong>
              {booking.name}
            </strong>
          </div>

          <div style={infoBoxStyle}>
            <div className="muted">
              Email
            </div>

            <strong>
              {booking.email}
            </strong>
          </div>

          <div style={infoBoxStyle}>
            <div className="muted">
              Phone / WhatsApp
            </div>

            <strong>
              {parsed.phone}
            </strong>
          </div>

          <div style={infoBoxStyle}>
            <div className="muted">
              Country
            </div>

            <strong>
              {parsed.country}
            </strong>
          </div>

          <div style={infoBoxStyle}>
            <div className="muted">
              Tour
            </div>

            <strong>
              {tourName}
            </strong>
          </div>

          <div style={infoBoxStyle}>
            <div className="muted">
              Preferred dates
            </div>

            <strong>
              {booking.dates ||
                "Not specified"}
            </strong>
          </div>

          <div style={infoBoxStyle}>
            <div className="muted">
              Travelers
            </div>

            <strong>
              {booking.travelers ??
                "Not specified"}
            </strong>
          </div>

          <div style={infoBoxStyle}>
            <div className="muted">
              Trip style
            </div>

            <strong>
              {parsed.tripStyle}
            </strong>
          </div>

          <div style={infoBoxStyle}>
            <div className="muted">
              Accommodation
            </div>

            <strong>
              {parsed.accommodation}
            </strong>
          </div>

          <div style={infoBoxStyle}>
            <div className="muted">
              Received
            </div>

            <strong>
              {receivedDate}
            </strong>
          </div>
        </div>

        <div
          style={{
            marginTop: 22,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              marginBottom: 9,
            }}
          >
            Customer message
          </div>

          <div
            style={{
              ...infoBoxStyle,
              whiteSpace: "pre-wrap",
              lineHeight: 1.6,
            }}
          >
            {parsed.customerMessage}
          </div>
        </div>
      </section>

      <section
        className="card"
        style={{
          marginBottom: 24,
        }}
      >
        <span className="pill">
          BOOKING STATUS
        </span>

        <h2
          style={{
            marginTop: 14,
          }}
        >
          Manage status
        </h2>

        <p
          className="muted"
          style={{
            marginBottom: 20,
          }}
        >
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
                  style={{
                    opacity:
                      currentStatus ===
                      status
                        ? 0.55
                        : 1,
                  }}
                >
                  {status}
                </button>
              </form>
            )
          )}
        </div>
      </section>

      <section
        className="card"
        style={{
          marginBottom: 24,
        }}
      >
        <span className="pill">
          PRIVATE
        </span>

        <h2
          style={{
            marginTop: 14,
          }}
        >
          Private admin notes
        </h2>

        <p className="muted">
          These notes are for your team
          only and are never shown to
          customers.
        </p>

        <form
          action={saveAdminNotes}
          style={{
            marginTop: 20,
          }}
        >
          <input
            type="hidden"
            name="id"
            value={booking.id}
          />

          <div className="field">
            <label htmlFor="admin_notes">
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

      <section
        className="card"
        style={{
          marginBottom: 24,
        }}
      >
        <span className="pill">
          EMAIL REPLIES
        </span>

        <h2
          style={{
            marginTop: 14,
          }}
        >
          Contact customer
        </h2>

        <p
          className="muted"
          style={{
            marginBottom: 24,
          }}
        >
          Choose a ready-made email
          template. Your email app will
          open with the customer,
          subject and message already
          filled in.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 14,
          }}
        >
          <div style={infoBoxStyle}>
            <span className="pill">
              RECEIVED
            </span>

            <h3>
              Booking received
            </h3>

            <p className="muted">
              Thank the traveler and
              let them know you are
              reviewing their request.
            </p>

            <a
              href={receivedEmailLink}
              className="btn"
            >
              Open email
            </a>
          </div>

          <div style={infoBoxStyle}>
            <span className="pill">
              FOLLOW UP
            </span>

            <h3>
              Need more information
            </h3>

            <p className="muted">
              Ask for travel dates,
              group size, experience
              and preferences.
            </p>

            <a
              href={moreInfoEmailLink}
              className="btn"
            >
              Open email
            </a>
          </div>

          <div style={infoBoxStyle}>
            <span className="pill">
              CONFIRMED
            </span>

            <h3>
              Booking confirmed
            </h3>

            <p className="muted">
              Send a confirmation and
              tell the traveler what
              happens next.
            </p>

            <a
              href={confirmedEmailLink}
              className="btn"
            >
              Open email
            </a>
          </div>

          <div style={infoBoxStyle}>
            <span className="pill">
              CUSTOM
            </span>

            <h3>
              Write custom email
            </h3>

            <p className="muted">
              Open a blank reply with
              the traveler and subject
              already prepared.
            </p>

            <a
              href={customEmailLink}
              className="btn"
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
          Email will be addressed to{" "}
          <strong>
            {booking.email}
          </strong>
        </div>
      </section>
    </main>
  );
}

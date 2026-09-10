import { cookies } from "next/headers";
import {
  redirect,
  notFound,
} from "next/navigation";
import { revalidatePath } from "next/cache";
import { createHash } from "crypto";

export const runtime = "nodejs";

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
  const adminPassword =
    process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return false;
  }

  const cookieStore =
    await cookies();

  const session =
    cookieStore.get(
      "admin_session"
    )?.value;

  return (
    session ===
    makeAdminToken(
      adminPassword
    )
  );
}

async function getDb() {
  const supabaseUrl =
    process.env
      .NEXT_PUBLIC_SUPABASE_URL;

  const supabaseServiceKey =
    process.env
      .SUPABASE_SERVICE_ROLE_KEY;

  if (
    !supabaseUrl ||
    !supabaseServiceKey
  ) {
    throw new Error(
      "Supabase environment variables are missing."
    );
  }

  const { createClient } =
    await import(
      "@supabase/supabase-js"
    );

  return createClient(
    supabaseUrl,
    supabaseServiceKey
  );
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

  const bookingId =
    String(
      formData.get(
        "bookingId"
      ) || ""
    );

  const newStatus =
    String(
      formData.get(
        "status"
      ) || ""
    );

  if (
    !bookingId ||
    !allowedStatuses.includes(
      newStatus
    )
  ) {
    return;
  }

  const db =
    await getDb();

  const { error } =
    await db
      .from("bookings")
      .update({
        status:
          newStatus,
      })
      .eq(
        "id",
        bookingId
      );

  if (error) {
    console.error(
      "Status update error:",
      error
    );

    redirect(
      `/admin/bookings/${bookingId}?error=status`
    );
  }

  revalidatePath(
    "/admin"
  );

  revalidatePath(
    `/admin/bookings/${bookingId}`
  );

  redirect(
    `/admin/bookings/${bookingId}?statusSaved=1`
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

  const bookingId =
    String(
      formData.get(
        "bookingId"
      ) || ""
    );

  const notes =
    String(
      formData.get(
        "adminNotes"
      ) || ""
    );

  if (!bookingId) {
    return;
  }

  const db =
    await getDb();

  const cleanNotes =
    notes.trim();

  const { error } =
    await db
      .from("bookings")
      .update({
        admin_notes:
          cleanNotes ||
          null,
      })
      .eq(
        "id",
        bookingId
      );

  if (error) {
    console.error(
      "Admin notes save error:",
      error
    );

    redirect(
      `/admin/bookings/${bookingId}?error=notes`
    );
  }

  revalidatePath(
    "/admin"
  );

  revalidatePath(
    `/admin/bookings/${bookingId}`
  );

  redirect(
    `/admin/bookings/${bookingId}?saved=1`
  );
}

function makeEmailLink(
  email: string,
  subject: string,
  body: string
) {
  return (
    `mailto:${email}` +
    `?subject=${encodeURIComponent(
      subject
    )}` +
    `&body=${encodeURIComponent(
      body
    )}`
  );
}

export default async function BookingDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    saved?: string;
    statusSaved?: string;
    error?: string;
  }>;
}) {
  const loggedIn =
    await isAdminLoggedIn();

  if (!loggedIn) {
    redirect("/admin");
  }

  const {
    id,
  } = await params;

  const queryParams =
    await searchParams;

  const db =
    await getDb();

  const {
    data,
    error,
  } = await db
    .from("bookings")
    .select(
      "id,tour_slug,name,email,dates,travelers,message,status,admin_notes,created_at"
    )
    .eq(
      "id",
      id
    )
    .maybeSingle();

  if (
    error ||
    !data
  ) {
    if (error) {
      console.error(
        "Booking load error:",
        error
      );
    }

    notFound();
  }

  const booking =
    data as Booking;

  const bookingReceivedSubject =
    "We received your Himalayan tour booking request";

  const bookingReceivedBody =
`Hello ${booking.name},

Thank you for contacting Himalayan26.

We have received your booking request for ${booking.tour_slug || "your Himalayan journey"}.

Preferred dates: ${booking.dates || "Not specified"}
Travelers: ${booking.travelers || 1}

Our team is reviewing your request and will contact you with the next steps.

Best regards,
Himalayan26`;

  const moreInfoSubject =
    "More information needed for your Himalayan journey";

  const moreInfoBody =
`Hello ${booking.name},

Thank you for your booking request for ${booking.tour_slug || "your Himalayan journey"}.

Before we prepare the best itinerary for you, could you please send us a little more information?

• Your preferred travel dates
• Number of travelers
• Fitness or trekking experience
• Any special interests or requirements
• Your preferred accommodation level

Once we receive these details, we can prepare the next step for your journey.

Best regards,
Himalayan26`;

  const confirmedSubject =
    "Your Himalayan tour booking is confirmed";

  const confirmedBody =
`Hello ${booking.name},

We are pleased to confirm your Himalayan tour booking.

Tour: ${booking.tour_slug || "Himalayan journey"}
Preferred dates: ${booking.dates || "Not specified"}
Travelers: ${booking.travelers || 1}

We will send you the detailed itinerary, preparation information and next payment steps separately.

Thank you for choosing Himalayan26.

Best regards,
Himalayan26`;

  const customSubject =
    "Your Himalayan tour booking request";

  return (
    <section className="section">
      <div
        className="container"
        style={{
          maxWidth: 900,
        }}
      >
        <div className="pagehero">
          <div className="eyebrow">
            BOOKING DETAILS
          </div>

          <h1>
            {booking.name}
          </h1>

          <p className="muted">
            Review and manage this
            customer booking request.
          </p>

          <a
            href="/admin"
            className="btn"
            style={{
              display:
                "inline-block",
              marginTop: 10,
            }}
          >
            ← Back to dashboard
          </a>
        </div>

        <div className="card">
          <span className="pill">
            {booking.status ||
              "new"}
          </span>

          <h2
            style={{
              marginTop: 18,
            }}
          >
            Customer information
          </h2>

          <p>
            <strong>
              Name:
            </strong>{" "}
            {booking.name}
          </p>

          <p>
            <strong>
              Email:
            </strong>{" "}
            <a
              href={`mailto:${booking.email}`}
            >
              {booking.email}
            </a>
          </p>

          <p>
            <strong>
              Tour:
            </strong>{" "}
            {booking.tour_slug ||
              "Not specified"}
          </p>

          <p>
            <strong>
              Preferred dates:
            </strong>{" "}
            {booking.dates ||
              "Not specified"}
          </p>

          <p>
            <strong>
              Travelers:
            </strong>{" "}
            {booking.travelers ||
              1}
          </p>

          <p>
            <strong>
              Received:
            </strong>{" "}
            {new Date(
              booking.created_at
            ).toLocaleString()}
          </p>

          <div
            style={{
              marginTop: 22,
            }}
          >
            <strong>
              Customer message
            </strong>

            <div
              className="notice"
              style={{
                marginTop: 10,
                whiteSpace:
                  "pre-wrap",
              }}
            >
              {booking.message ||
                "No message provided."}
            </div>
          </div>
        </div>

        <div
          className="card"
          style={{
            marginTop: 24,
          }}
        >
          <h2>
            Private admin notes
          </h2>

          <p className="muted">
            These notes are for your
            team only and are never
            shown to customers.
          </p>

          {queryParams.saved ===
          "1" ? (
            <div
              className="notice"
              style={{
                marginBottom: 18,
              }}
            >
              Admin notes saved.
            </div>
          ) : null}

          {queryParams.error ===
          "notes" ? (
            <div
              className="notice"
              style={{
                marginBottom: 18,
              }}
            >
              Could not save admin
              notes. Please try again.
            </div>
          ) : null}

          <form
            action={
              saveAdminNotes
            }
          >
            <input
              type="hidden"
              name="bookingId"
              value={booking.id}
            />

            <div className="field">
              <label>
                Notes
              </label>

              <textarea
                name="adminNotes"
                defaultValue={
                  booking.admin_notes ||
                  ""
                }
                rows={6}
                placeholder="Add private notes about this booking..."
              />
            </div>

            <button
              type="submit"
              className="btn"
            >
              Save notes
            </button>
          </form>
        </div>

        <div
          className="card"
          style={{
            marginTop: 24,
          }}
        >
          <h2>
            Manage booking
          </h2>

          <p className="muted">
            Current status:{" "}
            <strong>
              {booking.status ||
                "new"}
            </strong>
          </p>

          {queryParams.statusSaved ===
          "1" ? (
            <div
              className="notice"
              style={{
                marginBottom: 18,
              }}
            >
              Booking status updated.
            </div>
          ) : null}

          {queryParams.error ===
          "status" ? (
            <div
              className="notice"
              style={{
                marginBottom: 18,
              }}
            >
              Could not update the
              booking status.
            </div>
          ) : null}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 16,
            }}
          >
            {allowedStatuses.map(
              (status) => (
                <form
                  action={
                    updateBookingStatus
                  }
                  key={status}
                >
                  <input
                    type="hidden"
                    name="bookingId"
                    value={
                      booking.id
                    }
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
                      booking.status ===
                      status
                    }
                    style={{
                      opacity:
                        booking.status ===
                        status
                          ? 0.5
                          : 1,
                    }}
                  >
                    {status}
                  </button>
                </form>
              )
            )}
          </div>
        </div>

        <div
          className="card"
          style={{
            marginTop: 24,
          }}
        >
          <div className="eyebrow">
            EMAIL REPLIES
          </div>

          <h2
            style={{
              marginTop: 10,
            }}
          >
            Contact customer
          </h2>

          <p className="muted">
            Choose a ready-made email
            template. Your email app
            will open with the customer,
            subject and message already
            filled in.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
              marginTop: 22,
            }}
          >
            <div className="card">
              <span className="pill">
                RECEIVED
              </span>

              <h3
                style={{
                  marginTop: 14,
                }}
              >
                Booking received
              </h3>

              <p className="muted">
                Thank the traveler and
                let them know you are
                reviewing their request.
              </p>

              <a
                className="btn"
                href={makeEmailLink(
                  booking.email,
                  bookingReceivedSubject,
                  bookingReceivedBody
                )}
              >
                Open email
              </a>
            </div>

            <div className="card">
              <span className="pill">
                FOLLOW UP
              </span>

              <h3
                style={{
                  marginTop: 14,
                }}
              >
                Need more information
              </h3>

              <p className="muted">
                Ask for travel dates,
                group size, experience
                and preferences.
              </p>

              <a
                className="btn"
                href={makeEmailLink(
                  booking.email,
                  moreInfoSubject,
                  moreInfoBody
                )}
              >
                Open email
              </a>
            </div>

            <div className="card">
              <span className="pill">
                CONFIRMED
              </span>

              <h3
                style={{
                  marginTop: 14,
                }}
              >
                Booking confirmed
              </h3>

              <p className="muted">
                Send a confirmation and
                tell the traveler what
                happens next.
              </p>

              <a
                className="btn"
                href={makeEmailLink(
                  booking.email,
                  confirmedSubject,
                  confirmedBody
                )}
              >
                Open email
              </a>
            </div>

            <div className="card">
              <span className="pill">
                CUSTOM
              </span>

              <h3
                style={{
                  marginTop: 14,
                }}
              >
                Write custom email
              </h3>

              <p className="muted">
                Open a blank reply with
                the traveler and subject
                already prepared.
              </p>

              <a
                className="btn"
                href={makeEmailLink(
                  booking.email,
                  customSubject,
                  ""
                )}
              >
                Write email
              </a>
            </div>
          </div>

          <div
            className="notice"
            style={{
              marginTop: 22,
            }}
          >
            Email will be addressed to{" "}
            <strong>
              {booking.email}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}

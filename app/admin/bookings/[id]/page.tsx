import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
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
  created_at: string;
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
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return false;
  }

  const cookieStore = await cookies();

  const session =
    cookieStore.get("admin_session")?.value;

  return session === makeAdminToken(adminPassword);
}

async function getDb() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "Supabase environment variables are missing."
    );
  }

  const { createClient } = await import(
    "@supabase/supabase-js"
  );

  return createClient(
    supabaseUrl,
    supabaseServiceKey
  );
}

async function getBooking(
  id: string
): Promise<Booking | null> {
  try {
    const db = await getDb();

    const { data, error } = await db
      .from("bookings")
      .select(
        "id,tour_slug,name,email,dates,travelers,message,status,created_at"
      )
      .eq("id", id)
      .single();

    if (error) {
      console.error(
        "Booking detail error:",
        error
      );

      return null;
    }

    return data;
  } catch (error) {
    console.error(
      "Booking detail database error:",
      error
    );

    return null;
  }
}

async function updateBookingStatus(
  formData: FormData
) {
  "use server";

  const loggedIn = await isAdminLoggedIn();

  if (!loggedIn) {
    redirect("/admin");
  }

  const bookingId = String(
    formData.get("bookingId") || ""
  );

  const newStatus = String(
    formData.get("status") || ""
  );

  if (
    !bookingId ||
    !allowedStatuses.includes(newStatus)
  ) {
    return;
  }

  const db = await getDb();

  const { error } = await db
    .from("bookings")
    .update({
      status: newStatus,
    })
    .eq("id", bookingId);

  if (error) {
    console.error(
      "Booking status update error:",
      error
    );

    return;
  }

  revalidatePath("/admin");

  revalidatePath(
    `/admin/bookings/${bookingId}`
  );

  redirect(
    `/admin/bookings/${bookingId}`
  );
}

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const loggedIn =
    await isAdminLoggedIn();

  if (!loggedIn) {
    redirect("/admin");
  }

  const { id } = await params;

  const booking =
    await getBooking(id);

  if (!booking) {
    notFound();
  }

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

          <h1>{booking.name}</h1>

          <p className="muted">
            Review and manage this
            customer booking request.
          </p>

          <a
            href="/admin"
            className="btn"
          >
            ← Back to dashboard
          </a>
        </div>

        <div className="card">
          <span className="pill">
            {booking.status || "new"}
          </span>

          <h2
            style={{
              marginTop: 18,
            }}
          >
            Customer information
          </h2>

          <p>
            <strong>Name:</strong>{" "}
            {booking.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            <a
              href={`mailto:${booking.email}`}
            >
              {booking.email}
            </a>
          </p>

          <p>
            <strong>Tour:</strong>{" "}
            {booking.tour_slug ? (
              <a
                href={`/tours/${booking.tour_slug}`}
              >
                {booking.tour_slug}
              </a>
            ) : (
              "Not specified"
            )}
          </p>

          <p>
            <strong>Preferred dates:</strong>{" "}
            {booking.dates ||
              "Not specified"}
          </p>

          <p>
            <strong>Travelers:</strong>{" "}
            {booking.travelers || 1}
          </p>

          <p>
            <strong>Received:</strong>{" "}
            {new Date(
              booking.created_at
            ).toLocaleString()}
          </p>

          <div
            style={{
              marginTop: 24,
            }}
          >
            <strong>
              Customer message
            </strong>

            <div
              className="notice"
              style={{
                marginTop: 10,
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
            Manage booking
          </h2>

          <p className="muted">
            Current status:{" "}
            <strong>
              {booking.status || "new"}
            </strong>
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 18,
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
          <h2>
            Contact customer
          </h2>

          <p className="muted">
            Open your email app and
            reply directly to this
            traveler.
          </p>

          <a
            className="btn"
            href={`mailto:${booking.email}?subject=Your Himalayan tour booking request`}
          >
            Email {booking.name}
          </a>
        </div>
      </div>
    </section>
  );
}

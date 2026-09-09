import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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

async function loginAdmin(formData: FormData) {
  "use server";

  const enteredPassword = String(
    formData.get("password") || ""
  );

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (
    !adminPassword ||
    enteredPassword !== adminPassword
  ) {
    redirect("/admin?error=1");
  }

  const cookieStore = await cookies();

  cookieStore.set(
    "admin_session",
    makeAdminToken(adminPassword),
    {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8,
    }
  );

  redirect("/admin");
}

async function logoutAdmin() {
  "use server";

  const cookieStore = await cookies();
  cookieStore.delete("admin_session");

  redirect("/admin");
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

async function getBookings(): Promise<Booking[]> {
  try {
    const db = await getDb();

    const { data, error } = await db
      .from("bookings")
      .select(
        "id,tour_slug,name,email,dates,travelers,message,status,created_at"
      )
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Admin bookings error:",
        error
      );

      return [];
    }

    return data || [];
  } catch (error) {
    console.error(
      "Admin database error:",
      error
    );

    return [];
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

  try {
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
  } catch (error) {
    console.error(
      "Status update failed:",
      error
    );
  }
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
  }>;
}) {
  const params = await searchParams;

  const adminPassword =
    process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return (
      <section className="section">
        <div className="container">
          <div className="card">
            <h1>
              Admin is not configured
            </h1>

            <p className="muted">
              ADMIN_PASSWORD is missing
              in Vercel.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const loggedIn =
    await isAdminLoggedIn();

  if (!loggedIn) {
    return (
      <section className="section">
        <div
          className="container"
          style={{
            maxWidth: 700,
          }}
        >
          <div className="pagehero">
            <div className="eyebrow">
              PRIVATE AREA
            </div>

            <h1>Admin login</h1>

            <p className="muted">
              Enter your admin password
              to view booking requests.
            </p>
          </div>

          <form
            action={loginAdmin}
            className="card"
          >
            <div className="field">
              <label>
                Admin password
              </label>

              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
              />
            </div>

            {params.error ? (
              <p
                className="notice"
                style={{
                  marginBottom: 14,
                }}
              >
                Incorrect password.
                Please try again.
              </p>
            ) : null}

            <button
              className="btn"
              type="submit"
            >
              Open dashboard
            </button>
          </form>
        </div>
      </section>
    );
  }

  const bookings =
    await getBookings();

  return (
    <section className="section">
      <div className="container">
        <div className="pagehero">
          <div className="eyebrow">
            ADMIN DASHBOARD
          </div>

          <h1>
            Booking requests
          </h1>

          <p className="muted">
            Manage customer booking
            requests and their status.
          </p>

          <form action={logoutAdmin}>
            <button
              className="btn"
              type="submit"
            >
              Log out
            </button>
          </form>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {bookings.length === 0 ? (
            <div className="card">
              <h3>No bookings yet</h3>

              <p className="muted">
                New booking requests
                will appear here.
              </p>
            </div>
          ) : (
            bookings.map(
              (booking) => (
                <div
                  className="card"
                  key={booking.id}
                >
                  <span className="pill">
                    {booking.status ||
                      "new"}
                  </span>

                  <h3
                    style={{
                      marginTop: 14,
                    }}
                  >
                    {booking.name}
                  </h3>

                  <p>
                    <strong>
                      Tour:
                    </strong>{" "}
                    {booking.tour_slug ||
                      "Not specified"}
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
                      Dates:
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
                      Message:
                    </strong>
                    <br />

                    {booking.message ||
                      "No message"}
                  </p>

                  <p className="muted">
                    Received:{" "}
                    {new Date(
                      booking.created_at
                    ).toLocaleString()}
                  </p>

                  <div
                    style={{
                      marginTop: 18,
                    }}
                  >
                    <strong>
                      Change status
                    </strong>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        marginTop: 10,
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
                </div>
              )
            )
          )}
        </div>
      </div>
    </section>
  );
}

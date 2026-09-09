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

type BookingCounts = {
  total: number;
  new: number;
  contacted: number;
  confirmed: number;
  cancelled: number;
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

async function getBookingCounts(): Promise<BookingCounts> {
  try {
    const db = await getDb();

    const [
      totalResult,
      newResult,
      contactedResult,
      confirmedResult,
      cancelledResult,
    ] = await Promise.all([
      db
        .from("bookings")
        .select("*", {
          count: "exact",
          head: true,
        }),

      db
        .from("bookings")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("status", "new"),

      db
        .from("bookings")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("status", "contacted"),

      db
        .from("bookings")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("status", "confirmed"),

      db
        .from("bookings")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("status", "cancelled"),
    ]);

    return {
      total: totalResult.count || 0,
      new: newResult.count || 0,
      contacted: contactedResult.count || 0,
      confirmed: confirmedResult.count || 0,
      cancelled: cancelledResult.count || 0,
    };
  } catch (error) {
    console.error(
      "Booking count error:",
      error
    );

    return {
      total: 0,
      new: 0,
      contacted: 0,
      confirmed: 0,
      cancelled: 0,
    };
  }
}

async function getBookings(
  search: string,
  status: string
): Promise<Booking[]> {
  try {
    const db = await getDb();

    let query = db
      .from("bookings")
      .select(
        "id,tour_slug,name,email,dates,travelers,message,status,created_at"
      )
      .order("created_at", {
        ascending: false,
      });

    if (
      status &&
      allowedStatuses.includes(status)
    ) {
      query = query.eq("status", status);
    }

    if (search) {
      const safeSearch = search
        .replace(/[%_,()]/g, " ")
        .trim();

      if (safeSearch) {
        query = query.or(
          `name.ilike.%${safeSearch}%,email.ilike.%${safeSearch}%,tour_slug.ilike.%${safeSearch}%`
        );
      }
    }

    const { data, error } = await query;

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

function countCardStyle(active: boolean) {
  return {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
    border: active
      ? "2px solid #63e6c6"
      : undefined,
    boxShadow: active
      ? "0 0 0 3px rgba(99, 230, 198, 0.12)"
      : undefined,
    transform: active
      ? "translateY(-2px)"
      : undefined,
  };
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    q?: string;
    status?: string;
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
              ADMIN_PASSWORD is missing in Vercel.
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

  const search =
    String(params.q || "").trim();

  const status =
    String(params.status || "").trim();

  const [bookings, counts] =
    await Promise.all([
      getBookings(search, status),
      getBookingCounts(),
    ]);

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
            Search, filter and manage
            customer booking requests.
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
              "repeat(auto-fit, minmax(160px, 1fr))",
            marginBottom: 24,
          }}
        >
          <a
            href="/admin"
            className="card"
            style={countCardStyle(!status)}
          >
            <div className="muted">
              Total
            </div>

            <h2>
              {counts.total}
            </h2>
          </a>

          <a
            href="/admin?status=new"
            className="card"
            style={countCardStyle(
              status === "new"
            )}
          >
            <div className="muted">
              New
            </div>

            <h2>
              {counts.new}
            </h2>
          </a>

          <a
            href="/admin?status=contacted"
            className="card"
            style={countCardStyle(
              status === "contacted"
            )}
          >
            <div className="muted">
              Contacted
            </div>

            <h2>
              {counts.contacted}
            </h2>
          </a>

          <a
            href="/admin?status=confirmed"
            className="card"
            style={countCardStyle(
              status === "confirmed"
            )}
          >
            <div className="muted">
              Confirmed
            </div>

            <h2>
              {counts.confirmed}
            </h2>
          </a>

          <a
            href="/admin?status=cancelled"
            className="card"
            style={countCardStyle(
              status === "cancelled"
            )}
          >
            <div className="muted">
              Cancelled
            </div>

            <h2>
              {counts.cancelled}
            </h2>
          </a>
        </div>

        <div
          className="card"
          style={{
            marginBottom: 24,
          }}
        >
          <form method="GET">
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "2fr 1fr auto",
                gap: 12,
                alignItems: "end",
              }}
            >
              <div className="field">
                <label>
                  Search bookings
                </label>

                <input
                  name="q"
                  defaultValue={search}
                  placeholder="Name, email or tour"
                />
              </div>

              <div className="field">
                <label>
                  Status
                </label>

                <select
                  name="status"
                  defaultValue={status}
                  style={{
                    width: "100%",
                    padding: 14,
                    borderRadius: 12,
                  }}
                >
                  <option value="">
                    All statuses
                  </option>

                  <option value="new">
                    New
                  </option>

                  <option value="contacted">
                    Contacted
                  </option>

                  <option value="confirmed">
                    Confirmed
                  </option>

                  <option value="cancelled">
                    Cancelled
                  </option>
                </select>
              </div>

              <button
                className="btn"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>

          {(search || status) && (
            <div
              style={{
                marginTop: 14,
              }}
            >
              <a
                href="/admin"
                className="btn"
              >
                Clear filters
              </a>
            </div>
          )}
        </div>

        <p
          className="muted"
          style={{
            marginBottom: 18,
          }}
        >
          Showing {bookings.length} booking
          {bookings.length === 1 ? "" : "s"}
        </p>

        <div
          className="grid"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {bookings.length === 0 ? (
            <div className="card">
              <h3>
                No bookings found
              </h3>

              <p className="muted">
                Try another search or
                status filter.
              </p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                className="card"
                key={booking.id}
              >
                <span className="pill">
                  {booking.status || "new"}
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
                  {booking.travelers || 1}
                </p>

                <p>
                  <strong>
                    Message:
                  </strong>

                  <br />

                  {booking.message ||
                    "No message"}
                </p>

                <a
                  href={`/admin/bookings/${booking.id}`}
                  className="btn"
                  style={{
                    display: "inline-block",
                    marginTop: 14,
                    marginBottom: 14,
                  }}
                >
                  View booking
                </a>

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
                      (bookingStatus) => (
                        <form
                          action={
                            updateBookingStatus
                          }
                          key={bookingStatus}
                        >
                          <input
                            type="hidden"
                            name="bookingId"
                            value={booking.id}
                          />

                          <input
                            type="hidden"
                            name="status"
                            value={
                              bookingStatus
                            }
                          />

                          <button
                            className="btn"
                            type="submit"
                            disabled={
                              booking.status ===
                              bookingStatus
                            }
                            style={{
                              opacity:
                                booking.status ===
                                bookingStatus
                                  ? 0.5
                                  : 1,
                            }}
                          >
                            {bookingStatus}
                          </button>
                        </form>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}#

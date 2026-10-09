
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
  status: string | null;
  created_at: string;
  phone: string | null;
  country: string | null;
  trip_style: string | null;
  accommodation: string | null;
};

const PAGE_SIZE = 10;

const allowedStatuses = [
  "all",
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
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    return false;
  }

  const cookieStore = await cookies();
  const session =
    cookieStore.get("admin_session")?.value;

  return (
    !!session &&
    session === makeAdminToken(password)
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
    return "Custom Tibet Journey";
  }

  const tourNames: Record<string, string> = {
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

  return (
    tourNames[slug] ||
    slug
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ")
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function getPageHref({
  page,
  status,
  q,
}: {
  page: number;
  status: string;
  q: string;
}) {
  const params = new URLSearchParams();

  if (q) {
    params.set("q", q);
  }

  if (status && status !== "all") {
    params.set("status", status);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();

  return query
    ? `/admin?${query}`
    : "/admin";
}

// ADMIN LOGIN

async function loginAdmin(
  formData: FormData
) {
  "use server";

  const enteredPassword = String(
    formData.get("password") || ""
  );

  const adminPassword =
    process.env.ADMIN_PASSWORD;

  if (
    !adminPassword ||
    enteredPassword !== adminPassword
  ) {
    redirect("/admin?loginError=1");
  }

  const cookieStore = await cookies();

  cookieStore.set(
    "admin_session",
    makeAdminToken(adminPassword),
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    }
  );

  redirect("/admin");
}

// ADMIN LOGOUT

async function logoutAdmin() {
  "use server";

  const cookieStore = await cookies();

  cookieStore.set(
    "admin_session",
    "",
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    }
  );

  redirect("/admin");
}

// MAIN ADMIN DASHBOARD

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{
    q?: string;
    status?: string;
    page?: string;
    loginError?: string;
  }>;
}) {
  const query = searchParams
    ? await searchParams
    : {};

  const loggedIn =
    await isAdminLoggedIn();

  // LOGIN SCREEN

  if (!loggedIn) {
    return (
      <main
        className="container"
        style={{
          paddingTop: 70,
          paddingBottom: 100,
          maxWidth: 720,
        }}
      >
        <section className="card">
          <span className="pill">
            HIMALAYAN26 ADMIN
          </span>

          <h1
            style={{
              marginTop: 18,
              marginBottom: 12,
            }}
          >
            Admin sign in
          </h1>

          <p
            className="muted"
            style={{
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            Sign in to manage Tibet journey
            requests, customer details and
            booking status.
          </p>

          {query.loginError === "1" && (
            <div
              className="notice"
              style={{
                marginBottom: 20,
              }}
            >
              The admin password was not
              correct. Please try again.
            </div>
          )}

          <form action={loginAdmin}>
            <div className="field">
              <label htmlFor="password">
                Admin password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter admin password"
              />
            </div>

            <button
              className="btn"
              type="submit"
              style={{
                marginTop: 16,
              }}
            >
              Sign in
            </button>
          </form>
        </section>
      </main>
    );
  }

  // DATABASE CONNECTION

  const db = getDb();

  // SEARCH AND FILTERS

  const q = String(
    query.q || ""
  ).trim();

  const requestedStatus = String(
    query.status || "all"
  ).toLowerCase();

  const status =
    allowedStatuses.includes(
      requestedStatus
    )
      ? requestedStatus
      : "all";

  const parsedPage = Number.parseInt(
    String(query.page || "1"),
    10
  );

  const page =
    Number.isFinite(parsedPage) &&
    parsedPage > 0
      ? parsedPage
      : 1;

  // BOOKINGS QUERY

  let bookingsQuery = db
    .from("bookings")
    .select(
      `
        id,
        tour_slug,
        name,
        email,
        dates,
        travelers,
        status,
        created_at,
        phone,
        country,
        trip_style,
        accommodation
      `,
      {
        count: "exact",
      }
    )
    .order("created_at", {
      ascending: false,
    });

  // FILTER BY STATUS

  if (status !== "all") {
    bookingsQuery =
      bookingsQuery.eq(
        "status",
        status
      );
  }

  // SEARCH BOOKINGS

  if (q) {
    const safeQ = q
      .replaceAll(",", " ")
      .replaceAll("%", "")
      .trim();

    if (safeQ) {
      bookingsQuery =
        bookingsQuery.or(
          `name.ilike.%${safeQ}%,email.ilike.%${safeQ}%,tour_slug.ilike.%${safeQ}%,country.ilike.%${safeQ}%`
        );
    }
  }

  // PAGINATION

  const from =
    (page - 1) * PAGE_SIZE;

  const to =
    from + PAGE_SIZE - 1;

  const {
    data,
    error,
    count,
  } = await bookingsQuery.range(
    from,
    to
  );

  if (error) {
    throw new Error(
      `Could not load bookings: ${error.message}`
    );
  }

  const bookings =
    (data || []) as Booking[];

  const totalBookings =
    count || 0;

  const totalPages = Math.max(
    1,
    Math.ceil(
      totalBookings / PAGE_SIZE
    )
  );

  if (
    page > totalPages &&
    totalBookings > 0
  ) {
    redirect(
      getPageHref({
        page: totalPages,
        status,
        q,
      })
    );
  }

  // DASHBOARD STATISTICS
  // All values are calculated from Supabase.

  const [
    allCountResult,
    newCountResult,
    contactedCountResult,
    confirmedCountResult,
    cancelledCountResult,
  ] = await Promise.all([
    db
      .from("bookings")
      .select("id", {
        count: "exact",
        head: true,
      }),

    db
      .from("bookings")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("status", "new"),

    db
      .from("bookings")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("status", "contacted"),

    db
      .from("bookings")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("status", "confirmed"),

    db
      .from("bookings")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("status", "cancelled"),
  ]);

  const statisticResults = [
    allCountResult,
    newCountResult,
    contactedCountResult,
    confirmedCountResult,
    cancelledCountResult,
  ];

  const statisticError =
    statisticResults.find(
      (result) => result.error
    )?.error;

  if (statisticError) {
    throw new Error(
      `Could not load booking statistics: ${statisticError.message}`
    );
  }

  const allCount =
    allCountResult.count ?? 0;

  const newCount =
    newCountResult.count ?? 0;

  const contactedCount =
    contactedCountResult.count ?? 0;

  const confirmedCount =
    confirmedCountResult.count ?? 0;

  const cancelledCount =
    cancelledCountResult.count ?? 0;

  // DASHBOARD CARD STYLES

  const cardStyle = {
    padding: "18px",
    borderRadius: "16px",
    border:
      "1px solid rgba(255,255,255,0.12)",
    background:
      "rgba(255,255,255,0.035)",
  };

  // STATISTICS DISPLAY

  const statistics = [
    {
      label: "ALL BOOKINGS",
      count: allCount,
      description: "Total requests",
      color: "#e7f6f5",
    },
    {
      label: "NEW REQUESTS",
      count: newCount,
      description: "Waiting for review",
      color: "#78e5ca",
    },
    {
      label: "CONTACTED",
      count: contactedCount,
      description: "Customers contacted",
      color: "#8fceff",
    },
    {
      label: "CONFIRMED",
      count: confirmedCount,
      description: "Confirmed journeys",
      color: "#78e5ca",
    },
    {
      label: "CANCELLED",
      count: cancelledCount,
      description: "Cancelled requests",
      color: "#ffb4ad",
    },
  ];

  // ADMIN PAGE

  return (
    <main
      className="container"
      style={{
        paddingTop: 42,
        paddingBottom: 90,
      }}
    >
      {/* DASHBOARD HEADER */}

      <section
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "flex-start",
          gap: 18,
          flexWrap: "wrap",
          marginBottom: 30,
        }}
      >
        <div>
          <span className="pill">
            HIMALAYAN26 ADMIN
          </span>

          <h1
            style={{
              marginTop: 16,
              marginBottom: 10,
            }}
          >
            Tibet booking dashboard
          </h1>

          <p
            className="muted"
            style={{
              maxWidth: 700,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Review customer requests,
            manage booking status and
            open each Tibet journey
            request for full details.
          </p>
        </div>

        <form action={logoutAdmin}>
          <button
            className="btn"
            type="submit"
          >
            Sign out
          </button>
        </form>
      </section>

      {/* FIVE STATISTICS CARDS */}

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 14,
          marginBottom: 26,
        }}
      >
        {statistics.map((item) => (
          <div
            key={item.label}
            style={{
              ...cardStyle,
              padding: "22px",
            }}
          >
            <div
              className="muted"
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing:
                  "0.08em",
              }}
            >
              {item.label}
            </div>

            <div
              style={{
                fontSize: 34,
                fontWeight: 800,
                marginTop: 10,
                marginBottom: 5,
                color: item.color,
              }}
            >
              {item.count}
            </div>

            <div
              className="muted"
              style={{
                fontSize: 12,
                lineHeight: 1.5,
              }}
            >
              {item.description}
            </div>
          </div>
        ))}
      </section>

      {/* BOOKING FILTERS */}

      <section
        className="card"
        style={{
          marginBottom: 24,
        }}
      >
        <span className="pill">
          FILTER BOOKINGS
        </span>

        <form
          method="get"
          action="/admin"
          style={{
            marginTop: 20,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
            <div className="field">
              <label htmlFor="q">
                Search
              </label>

              <input
                id="q"
                name="q"
                type="search"
                defaultValue={q}
                placeholder="Customer, email, tour or country"
              />
            </div>

            <div className="field">
              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                name="status"
                defaultValue={status}
              >
                <option value="all">
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
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginTop: 16,
            }}
          >
            <button
              className="btn"
              type="submit"
            >
              Apply filters
            </button>

            <a
              className="btn"
              href="/admin"
            >
              Clear filters
            </a>

            <a
              className="btn"
              href="/api/admin/bookings/export"
            >
              Export CSV
            </a>
          </div>
        </form>
      </section>

      {/* BOOKING REQUESTS */}

      <section className="card">
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: 14,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          <div>
            <span className="pill">
              BOOKING REQUESTS
            </span>

            <h2
              style={{
                marginTop: 14,
                marginBottom: 0,
              }}
            >
              Customer requests
            </h2>
          </div>

          <div className="muted">
            {totalBookings} result
            {totalBookings === 1
              ? ""
              : "s"}
          </div>
        </div>

        {/* EMPTY RESULT */}

        {bookings.length === 0 ? (
          <div
            className="notice"
            style={{
              padding: 22,
            }}
          >
            No bookings match these
            filters.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: 14,
            }}
          >
            {/* INDIVIDUAL BOOKINGS */}

            {bookings.map(
              (booking) => {
                const currentStatus =
                  booking.status ||
                  "new";

                return (
                  <article
                    key={booking.id}
                    style={cardStyle}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "flex-start",
                        gap: 14,
                        flexWrap:
                          "wrap",
                      }}
                    >
                      <div
                        style={{
                          minWidth: 0,
                          flex: "1 1 520px",
                        }}
                      >
                        <div
                          style={{
                            display:
                              "flex",
                            gap: 8,
                            flexWrap:
                              "wrap",
                            alignItems:
                              "center",
                            marginBottom:
                              12,
                          }}
                        >
                          <span className="pill">
                            {currentStatus}
                          </span>

                          <span className="muted">
                            {formatDate(
                              booking.created_at
                            )}
                          </span>
                        </div>

                        <h3
                          style={{
                            margin:
                              "0 0 8px",
                          }}
                        >
                          {booking.name}
                        </h3>

                        <div
                          className="muted"
                          style={{
                            lineHeight:
                              1.7,
                            overflowWrap:
                              "anywhere",
                          }}
                        >
                          {booking.email}

                          <br />

                          {formatTourName(
                            booking.tour_slug
                          )}

                          <br />

                          Preferred dates:{" "}
                          {booking.dates ||
                            "Not specified"}

                          {" · "}

                          Travelers:{" "}
                          {booking.travelers ??
                            "Not specified"}
                        </div>
                      </div>

                      <a
                        className="btn"
                        href={`/admin/bookings/${booking.id}`}
                      >
                        View booking
                      </a>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        )}

        {/* PAGINATION */}

        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 24,
            }}
          >
            <div className="muted">
              Page {page} of{" "}
              {totalPages} · 10
              bookings per page
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              {page > 1 && (
                <a
                  className="btn"
                  href={getPageHref({
                    page:
                      page - 1,
                    status,
                    q,
                  })}
                >
                  ← Previous
                </a>
              )}

              {page < totalPages && (
                <a
                  className="btn"
                  href={getPageHref({
                    page:
                      page + 1,
                    status,
                    q,
                  })}
                >
                  Next →
                </a>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

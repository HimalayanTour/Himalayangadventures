import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

const allowedStatuses = [
  "new",
  "contacted",
  "confirmed",
  "cancelled",
];

const allowedSorts = [
  "newest",
  "oldest",
  "name",
  "travelers",
];

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

type SearchParams = {
  q?: string;
  status?: string;
  sort?: string;
  notes?: string;
  page?: string;
  loginError?: string;
};

function makeAdminToken(password: string) {
  return createHash("sha256")
    .update(password)
    .digest("hex");
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

  let returnTo = String(
    formData.get("returnTo") ||
      "/admin"
  );

  if (
    !returnTo.startsWith("/admin")
  ) {
    returnTo = "/admin";
  }

  if (
    !id ||
    !allowedStatuses.includes(status)
  ) {
    redirect(returnTo);
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

  redirect(returnTo);
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

  const hasStructuredData =
    text.includes(
      "Phone / WhatsApp:"
    ) ||
    text.includes("Country:") ||
    text.includes("Trip style:") ||
    text.includes(
      "Accommodation:"
    );

  /*
    Older bookings did not have
    structured booking details.

    We keep their original message.
  */
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
  let accommodation =
    "Not specified";

  let readingMessage = false;

  const customerLines: string[] =
    [];

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
      trimmed ===
      "Customer message:"
    ) {
      readingMessage = true;
      continue;
    }

    if (readingMessage) {
      customerLines.push(line);
    }
  }

  return {
    phone,
    country,
    tripStyle,
    accommodation,
    customerMessage:
      customerLines
        .join("\n")
        .trim() ||
      "No additional message.",
  };
}

function buildAdminUrl({
  search,
  status,
  notesOnly,
  sort,
  page,
}: {
  search: string;
  status: string;
  notesOnly: boolean;
  sort: string;
  page?: number;
}) {
  const params =
    new URLSearchParams();

  if (search) {
    params.set("q", search);
  }

  if (status) {
    params.set(
      "status",
      status
    );
  }

  if (notesOnly) {
    params.set("notes", "1");
  }

  if (
    sort &&
    sort !== "newest"
  ) {
    params.set("sort", sort);
  }

  if (page && page > 1) {
    params.set(
      "page",
      String(page)
    );
  }

  const qs = params.toString();

  return qs
    ? `/admin?${qs}`
    : "/admin";
}

function buildExportUrl({
  search,
  status,
  notesOnly,
  sort,
}: {
  search: string;
  status: string;
  notesOnly: boolean;
  sort: string;
}) {
  const params =
    new URLSearchParams();

  if (search) {
    params.set("q", search);
  }

  if (status) {
    params.set(
      "status",
      status
    );
  }

  if (notesOnly) {
    params.set("notes", "1");
  }

  if (
    sort &&
    sort !== "newest"
  ) {
    params.set("sort", sort);
  }

  const qs = params.toString();

  return qs
    ? `/api/admin/bookings/export?${qs}`
    : "/api/admin/bookings/export";
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params =
    searchParams
      ? await searchParams
      : {};

  const loggedIn =
    await isAdminLoggedIn();

  if (!loggedIn) {
    return (
      <main
        className="container"
        style={{
          maxWidth: 560,
          paddingTop: 80,
          paddingBottom: 80,
        }}
      >
        <section className="card">
          <span className="pill">
            ADMIN
          </span>

          <h1
            style={{
              marginTop: 16,
            }}
          >
            Admin dashboard
          </h1>

          <p className="muted">
            Enter your admin password
            to manage customer booking
            requests.
          </p>

          {params.loginError ===
            "1" && (
            <div
              className="notice"
              style={{
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              Incorrect admin password.
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
                width: "100%",
              }}
            >
              Sign in
            </button>
          </form>
        </section>
      </main>
    );
  }

  const search = String(
    params.q || ""
  ).trim();

  const requestedStatus =
    String(
      params.status || ""
    );

  const status =
    allowedStatuses.includes(
      requestedStatus
    )
      ? requestedStatus
      : "";

  const requestedSort =
    String(
      params.sort || "newest"
    );

  const sort =
    allowedSorts.includes(
      requestedSort
    )
      ? requestedSort
      : "newest";

  const notesOnly =
    params.notes === "1";

  const requestedPage =
    Math.max(
      1,
      Number(params.page) || 1
    );

  const db = getDb();

  const [
    totalResult,
    newResult,
    contactedResult,
    confirmedResult,
    cancelledResult,
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
      .eq(
        "status",
        "contacted"
      ),

    db
      .from("bookings")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq(
        "status",
        "confirmed"
      ),

    db
      .from("bookings")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq(
        "status",
        "cancelled"
      ),
  ]);

  const counts = {
    total: totalResult.count || 0,
    new: newResult.count || 0,
    contacted:
      contactedResult.count || 0,
    confirmed:
      confirmedResult.count || 0,
    cancelled:
      cancelledResult.count || 0,
  };

  let query = db
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
      `,
      {
        count: "exact",
      }
    );

  if (status) {
    query = query.eq(
      "status",
      status
    );
  }

  if (notesOnly) {
    query = query
      .not(
        "admin_notes",
        "is",
        null
      )
      .neq(
        "admin_notes",
        ""
      );
  }

  if (search) {
    const safeSearch = search
      .replace(
        /[,%()]/g,
        " "
      )
      .trim();

    if (safeSearch) {
      query = query.or(
        `name.ilike.%${safeSearch}%,email.ilike.%${safeSearch}%,tour_slug.ilike.%${safeSearch}%`
      );
    }
  }

  if (sort === "oldest") {
    query = query.order(
      "created_at",
      {
        ascending: true,
      }
    );
  } else if (
    sort === "name"
  ) {
    query = query
      .order("name", {
        ascending: true,
      })
      .order("created_at", {
        ascending: false,
      });
  } else if (
    sort === "travelers"
  ) {
    query = query
      .order("travelers", {
        ascending: false,
        nullsFirst: false,
      })
      .order("created_at", {
        ascending: false,
      });
  } else {
    query = query.order(
      "created_at",
      {
        ascending: false,
      }
    );
  }

  const start =
    (requestedPage - 1) *
    PAGE_SIZE;

  const end =
    start +
    PAGE_SIZE -
    1;

  const {
    data,
    error,
    count,
  } = await query.range(
    start,
    end
  );

  if (error) {
    throw new Error(
      `Could not load bookings: ${error.message}`
    );
  }

  const bookings =
    (data || []) as Booking[];

  const filteredTotal =
    count || 0;

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredTotal /
          PAGE_SIZE
      )
    );

  /*
    If someone manually enters a page
    number higher than the last page,
    send them back to the final page.
  */
  if (
    requestedPage >
      totalPages &&
    filteredTotal > 0
  ) {
    redirect(
      buildAdminUrl({
        search,
        status,
        notesOnly,
        sort,
        page: totalPages,
      })
    );
  }

  const currentPage =
    Math.min(
      requestedPage,
      totalPages
    );

  const currentUrl =
    buildAdminUrl({
      search,
      status,
      notesOnly,
      sort,
      page: currentPage,
    });

  const exportUrl =
    buildExportUrl({
      search,
      status,
      notesOnly,
      sort,
    });

  const statCardStyle = (
    active: boolean
  ) => ({
    display: "block",
    textDecoration: "none",
    padding: "20px",
    borderRadius: "18px",
    border: active
      ? "2px solid rgba(103, 232, 202, 0.75)"
      : "1px solid rgba(255,255,255,0.12)",
    background: active
      ? "rgba(103, 232, 202, 0.10)"
      : "rgba(255,255,255,0.035)",
  });

  const detailBoxStyle = {
    padding: "10px 12px",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,0.10)",
    background:
      "rgba(255,255,255,0.025)",
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
          display: "flex",
          justifyContent:
            "space-between",
          gap: 16,
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: 28,
        }}
      >
        <div>
          <span className="pill">
            ADMIN
          </span>

          <h1
            style={{
              marginTop: 14,
              marginBottom: 6,
            }}
          >
            Booking dashboard
          </h1>

          <p
            className="muted"
            style={{
              margin: 0,
            }}
          >
            Manage Himalayan tour
            booking requests.
          </p>
        </div>

        <form
          action={logoutAdmin}
        >
          <button
            className="btn"
            type="submit"
          >
            Log out
          </button>
        </form>
      </div>

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 14,
          marginBottom: 28,
        }}
      >
        <a
          href={buildAdminUrl({
            search,
            status: "",
            notesOnly,
            sort,
            page: 1,
          })}
          style={statCardStyle(
            !status
          )}
        >
          <div className="muted">
            Total
          </div>

          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            {counts.total}
          </div>
        </a>

        <a
          href={buildAdminUrl({
            search,
            status: "new",
            notesOnly,
            sort,
            page: 1,
          })}
          style={statCardStyle(
            status === "new"
          )}
        >
          <div className="muted">
            New
          </div>

          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            {counts.new}
          </div>
        </a>

        <a
          href={buildAdminUrl({
            search,
            status:
              "contacted",
            notesOnly,
            sort,
            page: 1,
          })}
          style={statCardStyle(
            status ===
              "contacted"
          )}
        >
          <div className="muted">
            Contacted
          </div>

          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            {counts.contacted}
          </div>
        </a>

        <a
          href={buildAdminUrl({
            search,
            status:
              "confirmed",
            notesOnly,
            sort,
            page: 1,
          })}
          style={statCardStyle(
            status ===
              "confirmed"
          )}
        >
          <div className="muted">
            Confirmed
          </div>

          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            {counts.confirmed}
          </div>
        </a>

        <a
          href={buildAdminUrl({
            search,
            status:
              "cancelled",
            notesOnly,
            sort,
            page: 1,
          })}
          style={statCardStyle(
            status ===
              "cancelled"
          )}
        >
          <div className="muted">
            Cancelled
          </div>

          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            {counts.cancelled}
          </div>
        </a>
      </section>

      <section
        className="card"
        style={{
          marginBottom: 26,
        }}
      >
        <form
          method="get"
          action="/admin"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(190px, 1fr))",
              gap: 14,
              alignItems: "end",
            }}
          >
            <div className="field">
              <label htmlFor="q">
                Search
              </label>

              <input
                id="q"
                name="q"
                defaultValue={
                  search
                }
                placeholder="Name, email or tour"
              />
            </div>

            <div className="field">
              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                name="status"
                defaultValue={
                  status
                }
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

            <div className="field">
              <label htmlFor="sort">
                Sort
              </label>

              <select
                id="sort"
                name="sort"
                defaultValue={
                  sort
                }
              >
                <option value="newest">
                  Newest first
                </option>

                <option value="oldest">
                  Oldest first
                </option>

                <option value="name">
                  Name A–Z
                </option>

                <option value="travelers">
                  Most travelers
                </option>
              </select>
            </div>
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              marginTop: 10,
              marginBottom: 18,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              name="notes"
              value="1"
              defaultChecked={
                notesOnly
              }
            />

            <span>
              Notes only
            </span>
          </label>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn"
              type="submit"
            >
              Apply filters
            </button>

            <a
              href="/admin"
              className="btn"
            >
              Clear filters
            </a>

            <a
              href={exportUrl}
              className="btn"
            >
              Export CSV
            </a>
          </div>
        </form>
      </section>

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 18,
        }}
      >
        <div className="muted">
          Showing{" "}
          {bookings.length} of{" "}
          {filteredTotal} bookings
        </div>

        <div className="muted">
          Page {currentPage} of{" "}
          {totalPages}
        </div>
      </div>

      {bookings.length === 0 ? (
        <section className="card">
          <h2>
            No bookings found
          </h2>

          <p className="muted">
            Try changing your search
            or filters.
          </p>
        </section>
      ) : (
        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 16,
          }}
        >
          {bookings.map(
            (booking) => {
              const parsed =
                parseBookingMessage(
                  booking.message
                );

              const bookingStatus =
                booking.status ||
                "new";

              const tourName =
                formatTourName(
                  booking.tour_slug
                );

              return (
                <article
                  key={booking.id}
                  className="card"
                >
                  <div
                    style={{
                      display:
                        "flex",
                      gap: 8,
                      flexWrap:
                        "wrap",
                      marginBottom: 14,
                    }}
                  >
                    <span className="pill">
                      {bookingStatus}
                    </span>

                    {booking.admin_notes ? (
                      <span className="pill">
                        Has notes
                      </span>
                    ) : null}
                  </div>

                  <h2
                    style={{
                      marginBottom: 16,
                    }}
                  >
                    {booking.name}
                  </h2>

                  <div
                    style={{
                      display:
                        "grid",
                      gap: 9,
                    }}
                  >
                    <div>
                      <strong>
                        Tour:
                      </strong>{" "}
                      {tourName}
                    </div>

                    <div>
                      <strong>
                        Email:
                      </strong>{" "}
                      {booking.email}
                    </div>

                    <div>
                      <strong>
                        Dates:
                      </strong>{" "}
                      {booking.dates ||
                        "Not specified"}
                    </div>

                    <div>
                      <strong>
                        Travelers:
                      </strong>{" "}
                      {booking.travelers ??
                        "Not specified"}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(2, minmax(0, 1fr))",
                      gap: 8,
                      marginTop: 16,
                    }}
                  >
                    <div
                      style={
                        detailBoxStyle
                      }
                    >
                      <div className="muted">
                        Country
                      </div>

                      <strong>
                        {parsed.country}
                      </strong>
                    </div>

                    <div
                      style={
                        detailBoxStyle
                      }
                    >
                      <div className="muted">
                        Trip style
                      </div>

                      <strong>
                        {parsed.tripStyle}
                      </strong>
                    </div>

                    <div
                      style={
                        detailBoxStyle
                      }
                    >
                      <div className="muted">
                        Accommodation
                      </div>

                      <strong>
                        {
                          parsed.accommodation
                        }
                      </strong>
                    </div>

                    <div
                      style={
                        detailBoxStyle
                      }
                    >
                      <div className="muted">
                        Phone / WhatsApp
                      </div>

                      <strong>
                        {parsed.phone}
                      </strong>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 16,
                    }}
                  >
                    <div
                      className="muted"
                      style={{
                        marginBottom: 6,
                      }}
                    >
                      Customer message
                    </div>

                    <div
                      style={{
                        ...detailBoxStyle,
                        whiteSpace:
                          "pre-wrap",
                      }}
                    >
                      {
                        parsed.customerMessage
                      }
                    </div>
                  </div>

                  <a
                    href={`/admin/bookings/${booking.id}`}
                    className="btn"
                    style={{
                      display:
                        "inline-block",
                      marginTop: 18,
                    }}
                  >
                    View booking
                  </a>

                  <p
                    className="muted"
                    style={{
                      marginTop: 18,
                      marginBottom: 12,
                    }}
                  >
                    Received:{" "}
                    {new Date(
                      booking.created_at
                    ).toLocaleString()}
                  </p>

                  <div
                    style={{
                      fontWeight: 700,
                      marginBottom: 9,
                    }}
                  >
                    Change status
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    {allowedStatuses.map(
                      (
                        nextStatus
                      ) => (
                        <form
                          key={
                            nextStatus
                          }
                          action={
                            updateBookingStatus
                          }
                        >
                          <input
                            type="hidden"
                            name="id"
                            value={
                              booking.id
                            }
                          />

                          <input
                            type="hidden"
                            name="status"
                            value={
                              nextStatus
                            }
                          />

                          <input
                            type="hidden"
                            name="returnTo"
                            value={
                              currentUrl
                            }
                          />

                          <button
                            className="btn"
                            type="submit"
                            disabled={
                              bookingStatus ===
                              nextStatus
                            }
                            style={{
                              opacity:
                                bookingStatus ===
                                nextStatus
                                  ? 0.55
                                  : 1,
                            }}
                          >
                            {
                              nextStatus
                            }
                          </button>
                        </form>
                      )
                    )}
                  </div>
                </article>
              );
            }
          )}
        </section>
      )}

      {filteredTotal > 0 && (
        <nav
          style={{
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 30,
          }}
        >
          {currentPage > 1 ? (
            <a
              href={buildAdminUrl({
                search,
                status,
                notesOnly,
                sort,
                page:
                  currentPage -
                  1,
              })}
              className="btn"
            >
              ← Previous
            </a>
          ) : (
            <span
              className="btn"
              style={{
                opacity: 0.45,
                pointerEvents:
                  "none",
              }}
            >
              ← Previous
            </span>
          )}

          {Array.from(
            {
              length:
                totalPages,
            },
            (_, index) =>
              index + 1
          ).map(
            (pageNumber) => (
              <a
                key={pageNumber}
                href={buildAdminUrl({
                  search,
                  status,
                  notesOnly,
                  sort,
                  page:
                    pageNumber,
                })}
                className="btn"
                style={{
                  opacity:
                    currentPage ===
                    pageNumber
                      ? 0.55
                      : 1,
                  pointerEvents:
                    currentPage ===
                    pageNumber
                      ? "none"
                      : "auto",
                }}
              >
                {pageNumber}
              </a>
            )
          )}

          {currentPage <
          totalPages ? (
            <a
              href={buildAdminUrl({
                search,
                status,
                notesOnly,
                sort,
                page:
                  currentPage +
                  1,
              })}
              className="btn"
            >
              Next →
            </a>
          ) : (
            <span
              className="btn"
              style={{
                opacity: 0.45,
                pointerEvents:
                  "none",
              }}
            >
              Next →
            </span>
          )}
        </nav>
      )}
    </main>
  );
}

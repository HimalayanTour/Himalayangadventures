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
  created_at: string;
  admin_notes: string | null;
};

type ParsedMessage = {
  phone: string;
  country: string;
  tripStyle: string;
  accommodation: string;
  customerMessage: string;
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

  const returnTo = String(
    formData.get("returnTo") ||
      "/admin"
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
    returnTo.startsWith("/admin")
      ? returnTo
      : "/admin"
  );
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
  let accommodation =
    "Not specified";

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
    params.set("status", status);
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

  const query = params.toString();

  return query
    ? `/admin?${query}`
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
    params.set("status", status);
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

  const query = params.toString();

  return query
    ? `/api/admin/bookings/export?${query}`
    : "/api/admin/bookings/export";
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{
    q?: string;
    status?: string;
    notes?: string;
    sort?: string;
    page?: string;
    loginError?: string;
  }>;
}) {
  const query =
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
          paddingTop: 70,
          paddingBottom: 90,
          maxWidth: 620,
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
            Admin login
          </h1>

          <p className="muted">
            Sign in to manage Himalayan26
            booking requests.
          </p>

          {query.loginError ===
            "1" && (
            <div
              className="notice"
              style={{
                marginTop: 18,
                marginBottom: 18,
              }}
            >
              Incorrect admin password.
            </div>
          )}

          <form
            action={loginAdmin}
            style={{
              marginTop: 24,
            }}
          >
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
              type="submit"
              className="btn"
            >
              Sign in
            </button>
          </form>
        </section>
      </main>
    );
  }

  const search = String(
    query.q || ""
  ).trim();

  const requestedStatus =
    String(
      query.status || ""
    ).trim();

  const status =
    allowedStatuses.includes(
      requestedStatus
    )
      ? requestedStatus
      : "";

  const notesOnly =
    query.notes === "1";

  const requestedSort = String(
    query.sort || "newest"
  );

  const sort =
    allowedSorts.includes(
      requestedSort
    )
      ? requestedSort
      : "newest";

  const requestedPage =
    Number(query.page || "1");

  const currentPage =
    Number.isFinite(
      requestedPage
    ) && requestedPage > 0
      ? Math.floor(requestedPage)
      : 1;

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
        created_at,
        admin_notes
      `
    );

  if (error) {
    throw new Error(
      `Could not load bookings: ${error.message}`
    );
  }

  const allBookings =
    (data || []) as Booking[];

  const counts = {
    total: allBookings.length,
    new: allBookings.filter(
      (booking) =>
        (booking.status || "new") ===
        "new"
    ).length,
    contacted: allBookings.filter(
      (booking) =>
        booking.status ===
        "contacted"
    ).length,
    confirmed: allBookings.filter(
      (booking) =>
        booking.status ===
        "confirmed"
    ).length,
    cancelled: allBookings.filter(
      (booking) =>
        booking.status ===
        "cancelled"
    ).length,
  };

  let filteredBookings =
    [...allBookings];

  if (status) {
    filteredBookings =
      filteredBookings.filter(
        (booking) =>
          (booking.status || "new") ===
          status
      );
  }

  if (notesOnly) {
    filteredBookings =
      filteredBookings.filter(
        (booking) =>
          Boolean(
            booking.admin_notes?.trim()
          )
      );
  }

  if (search) {
    const needle =
      search.toLowerCase();

    filteredBookings =
      filteredBookings.filter(
        (booking) => {
          const tour =
            booking.tour_slug || "";

          return (
            booking.name
              .toLowerCase()
              .includes(needle) ||
            booking.email
              .toLowerCase()
              .includes(needle) ||
            tour
              .toLowerCase()
              .includes(needle)
          );
        }
      );
  }

  if (sort === "oldest") {
    filteredBookings.sort(
      (a, b) =>
        new Date(
          a.created_at
        ).getTime() -
        new Date(
          b.created_at
        ).getTime()
    );
  } else if (sort === "name") {
    filteredBookings.sort(
      (a, b) =>
        a.name.localeCompare(
          b.name
        )
    );
  } else if (
    sort === "travelers"
  ) {
    filteredBookings.sort(
      (a, b) =>
        (b.travelers || 0) -
        (a.travelers || 0)
    );
  } else {
    filteredBookings.sort(
      (a, b) =>
        new Date(
          b.created_at
        ).getTime() -
        new Date(
          a.created_at
        ).getTime()
    );
  }

  const totalFiltered =
    filteredBookings.length;

  const totalPages = Math.max(
    1,
    Math.ceil(
      totalFiltered / PAGE_SIZE
    )
  );

  const safePage = Math.min(
    currentPage,
    totalPages
  );

  const start =
    (safePage - 1) * PAGE_SIZE;

  const pageBookings =
    filteredBookings.slice(
      start,
      start + PAGE_SIZE
    );

  const returnTo =
    buildAdminUrl({
      search,
      status,
      notesOnly,
      sort,
      page: safePage,
    });

  const exportUrl =
    buildExportUrl({
      search,
      status,
      notesOnly,
      sort,
    });

  const statCardStyle = {
    padding: "18px",
    borderRadius: "16px",
    border:
      "1px solid rgba(255,255,255,0.12)",
    background:
      "rgba(255,255,255,0.035)",
    textDecoration: "none",
    color: "inherit",
  };

  const miniBoxStyle = {
    padding: "11px 12px",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,0.1)",
    background:
      "rgba(255,255,255,0.025)",
  };

  return (
    <main
      className="container"
      style={{
        paddingTop: 42,
        paddingBottom: 90,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 30,
        }}
      >
        <div>
          <span className="pill">
            ADMIN
          </span>

          <h1
            style={{
              marginTop: 14,
              marginBottom: 8,
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
            Manage customer booking
            requests and trip enquiries.
          </p>
        </div>

        <form action={logoutAdmin}>
          <button
            type="submit"
            className="btn"
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
          gap: 12,
          marginBottom: 24,
        }}
      >
        <a
          href={buildAdminUrl({
            search,
            status: "",
            notesOnly,
            sort,
          })}
          style={{
            ...statCardStyle,
            outline:
              !status
                ? "2px solid rgba(97,220,190,0.8)"
                : "none",
          }}
        >
          <div className="muted">
            Total
          </div>

          <div
            style={{
              fontSize: 30,
              fontWeight: 800,
              marginTop: 4,
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
          })}
          style={{
            ...statCardStyle,
            outline:
              status === "new"
                ? "2px solid rgba(97,220,190,0.8)"
                : "none",
          }}
        >
          <div className="muted">
            New
          </div>

          <div
            style={{
              fontSize: 30,
              fontWeight: 800,
              marginTop: 4,
            }}
          >
            {counts.new}
          </div>
        </a>

        <a
          href={buildAdminUrl({
            search,
            status: "contacted",
            notesOnly,
            sort,
          })}
          style={{
            ...statCardStyle,
            outline:
              status === "contacted"
                ? "2px solid rgba(97,220,190,0.8)"
                : "none",
          }}
        >
          <div className="muted">
            Contacted
          </div>

          <div
            style={{
              fontSize: 30,
              fontWeight: 800,
              marginTop: 4,
            }}
          >
            {counts.contacted}
          </div>
        </a>

        <a
          href={buildAdminUrl({
            search,
            status: "confirmed",
            notesOnly,
            sort,
          })}
          style={{
            ...statCardStyle,
            outline:
              status === "confirmed"
                ? "2px solid rgba(97,220,190,0.8)"
                : "none",
          }}
        >
          <div className="muted">
            Confirmed
          </div>

          <div
            style={{
              fontSize: 30,
              fontWeight: 800,
              marginTop: 4,
            }}
          >
            {counts.confirmed}
          </div>
        </a>

        <a
          href={buildAdminUrl({
            search,
            status: "cancelled",
            notesOnly,
            sort,
          })}
          style={{
            ...statCardStyle,
            outline:
              status === "cancelled"
                ? "2px solid rgba(97,220,190,0.8)"
                : "none",
          }}
        >
          <div className="muted">
            Cancelled
          </div>

          <div
            style={{
              font

import { cookies } from "next/headers";
import { createHash } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  const cookieStore =
    await cookies();

  const session =
    cookieStore.get(
      "admin_session"
    )?.value;

  return (
    session ===
    makeAdminToken(adminPassword)
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

function cleanSearch(
  value: string
) {
  return value
    .replace(
      /[%_,()]/g,
      " "
    )
    .trim();
}

function csvCell(
  value:
    | string
    | number
    | null
    | undefined
) {
  let text =
    value === null ||
    value === undefined
      ? ""
      : String(value);

  /*
    Protect CSV files opened in
    Excel/Sheets from formulas
    supplied through customer input.
  */
  if (
    /^[\s]*[=+\-@\t\r]/.test(
      text
    )
  ) {
    text = `'${text}`;
  }

  return `"${text.replace(
    /"/g,
    '""'
  )}"`;
}

async function getAllBookings({
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
  const db = await getDb();

  const bookings: Booking[] = [];

  const BATCH_SIZE = 1000;

  let from = 0;

  while (true) {
    let query = db
      .from("bookings")
      .select(
        "id,tour_slug,name,email,dates,travelers,message,status,admin_notes,created_at"
      );

    if (
      status &&
      allowedStatuses.includes(
        status
      )
    ) {
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
      const safeSearch =
        cleanSearch(search);

      if (safeSearch) {
        query = query.or(
          `name.ilike.%${safeSearch}%,email.ilike.%${safeSearch}%,tour_slug.ilike.%${safeSearch}%`
        );
      }
    }

    if (sort === "oldest") {
      query = query
        .order(
          "created_at",
          {
            ascending: true,
          }
        )
        .order(
          "id",
          {
            ascending: true,
          }
        );
    } else if (
      sort === "name"
    ) {
      query = query
        .order(
          "name",
          {
            ascending: true,
          }
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        )
        .order(
          "id",
          {
            ascending: true,
          }
        );
    } else if (
      sort === "travelers"
    ) {
      query = query
        .order(
          "travelers",
          {
            ascending: false,
            nullsFirst: false,
          }
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        )
        .order(
          "id",
          {
            ascending: true,
          }
        );
    } else {
      query = query
        .order(
          "created_at",
          {
            ascending: false,
          }
        )
        .order(
          "id",
          {
            ascending: true,
          }
        );
    }

    const to =
      from +
      BATCH_SIZE -
      1;

    const {
      data,
      error,
    } = await query.range(
      from,
      to
    );

    if (error) {
      throw error;
    }

    const batch =
      (data || []) as Booking[];

    bookings.push(...batch);

    if (
      batch.length <
      BATCH_SIZE
    ) {
      break;
    }

    from += BATCH_SIZE;
  }

  return bookings;
}

export async function GET(
  request: Request
) {
  try {
    const loggedIn =
      await isAdminLoggedIn();

    if (!loggedIn) {
      return Response.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const url =
      new URL(request.url);

    const search =
      String(
        url.searchParams.get(
          "q"
        ) || ""
      ).trim();

    const status =
      String(
        url.searchParams.get(
          "status"
        ) || ""
      ).trim();

    const notesOnly =
      url.searchParams.get(
        "notes"
      ) === "1";

    const requestedSort =
      String(
        url.searchParams.get(
          "sort"
        ) || "newest"
      );

    const sort =
      allowedSorts.includes(
        requestedSort
      )
        ? requestedSort
        : "newest";

    const bookings =
      await getAllBookings({
        search,
        status,
        notesOnly,
        sort,
      });

    const header = [
      "Booking ID",
      "Name",
      "Email",
      "Tour",
      "Preferred Dates",
      "Travelers",
      "Status",
      "Admin Notes",
      "Customer Message",
      "Received",
    ];

    const rows =
      bookings.map(
        (booking) => [
          booking.id,
          booking.name,
          booking.email,
          booking.tour_slug ||
            "",
          booking.dates ||
            "",
          booking.travelers ??
            "",
          booking.status ||
            "new",
          booking.admin_notes ||
            "",
          booking.message ||
            "",
          booking.created_at,
        ]
      );

    const csv = [
      header
        .map(csvCell)
        .join(","),
      ...rows.map(
        (row) =>
          row
            .map(csvCell)
            .join(",")
      ),
    ].join("\r\n");

    /*
      UTF-8 BOM helps Excel
      display international names
      correctly.
    */
    const csvWithBom =
      "\uFEFF" + csv;

    const date =
      new Date()
        .toISOString()
        .slice(0, 10);

    return new Response(
      csvWithBom,
      {
        status: 200,
        headers: {
          "Content-Type":
            "text/csv; charset=utf-8",
          "Content-Disposition":
            `attachment; filename="himalayan-bookings-${date}.csv"`,
          "Cache-Control":
            "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "CSV export error:",
      error
    );

    return Response.json(
      {
        error:
          "Could not export bookings.",
      },
      {
        status: 500,
      }
    );
  }
}

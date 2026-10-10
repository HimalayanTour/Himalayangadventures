
import { cookies } from "next/headers";
import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";
import ExcelJS from "exceljs";

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
  phone: string | null;
  country: string | null;
  dates: string | null;
  travelers: number | null;
  trip_style: string | null;
  accommodation: string | null;
  message: string | null;
  status: string | null;
  admin_notes: string | null;
  created_at: string;
};

// ADMIN AUTHENTICATION

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

  return (
    !!session &&
    session === makeAdminToken(adminPassword)
  );
}

// SUPABASE CONNECTION

function getDb() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "Supabase environment variables are missing."
    );
  }

  return createClient(
    supabaseUrl,
    supabaseServiceKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

// SEARCH PROTECTION

function cleanSearch(value: string) {
  return value
    .replace(/[%_,()]/g, " ")
    .trim();
}

// CSV CELL FORMATTING

function csvCell(
  value: string | number | null | undefined
) {
  let text =
    value === null || value === undefined
      ? ""
      : String(value);

  // Prevent spreadsheet formula injection.
  if (/^[\s]*[=+\-@\t\r]/.test(text)) {
    text = `'${text}`;
  }

  return `"${text.replace(/"/g, '""')}"`;
}

// EXCEL TEXT CLEANING

function excelText(
  value: string | null | undefined
) {
  return (value || "").replace(
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,
    ""
  );
}

// LOAD ALL BOOKINGS WITH EXISTING FILTERS

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
  const db = getDb();

  const bookings: Booking[] = [];

  const BATCH_SIZE = 1000;

  let from = 0;

  while (true) {
    let query = db
      .from("bookings")
      .select(
        `
        id,
        tour_slug,
        name,
        email,
        phone,
        country,
        dates,
        travelers,
        trip_style,
        accommodation,
        message,
        status,
        admin_notes,
        created_at
        `
      );

    if (
      status &&
      allowedStatuses.includes(status)
    ) {
      query = query.eq("status", status);
    }

    if (notesOnly) {
      query = query
        .not("admin_notes", "is", null)
        .neq("admin_notes", "");
    }

    if (search) {
      const safeSearch = cleanSearch(search);

      if (safeSearch) {
        query = query.or(
          `name.ilike.%${safeSearch}%,email.ilike.%${safeSearch}%,tour_slug.ilike.%${safeSearch}%`
        );
      }
    }

    if (sort === "oldest") {
      query = query
        .order("created_at", {
          ascending: true,
        })
        .order("id", {
          ascending: true,
        });
    } else if (sort === "name") {
      query = query
        .order("name", {
          ascending: true,
        })
        .order("created_at", {
          ascending: false,
        })
        .order("id", {
          ascending: true,
        });
    } else if (sort === "travelers") {
      query = query
        .order("travelers", {
          ascending: false,
          nullsFirst: false,
        })
        .order("created_at", {
          ascending: false,
        })
        .order("id", {
          ascending: true,
        });
    } else {
      query = query
        .order("created_at", {
          ascending: false,
        })
        .order("id", {
          ascending: true,
        });
    }

    const to = from + BATCH_SIZE - 1;

    const { data, error } =
      await query.range(from, to);

    if (error) {
      throw error;
    }

    const batch = (data || []) as Booking[];

    bookings.push(...batch);

    if (batch.length < BATCH_SIZE) {
      break;
    }

    from += BATCH_SIZE;
  }

  return bookings;
}

// ORIGINAL CSV EXPORT

function createCsv(bookings: Booking[]) {
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

  const rows = bookings.map((booking) => [
    booking.id,
    booking.name,
    booking.email,
    booking.tour_slug || "",
    booking.dates || "",
    booking.travelers ?? "",
    booking.status || "new",
    booking.admin_notes || "",
    booking.message || "",
    booking.created_at,
  ]);

  const csv = [
    header.map(csvCell).join(","),
    ...rows.map((row) =>
      row.map(csvCell).join(",")
    ),
  ].join("\r\n");

  // UTF-8 BOM supports international names.
  return "\uFEFF" + csv;
}

// PROFESSIONAL EXCEL EXPORT

async function createExcel(
  bookings: Booking[]
): Promise<ArrayBuffer> {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "Himalayan Adventures";
  workbook.lastModifiedBy =
    "Himalayan Adventures";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet(
    "Bookings",
    {
      views: [
        {
          state: "frozen",
          ySplit: 1,
        },
      ],
    }
  );

  sheet.properties.defaultRowHeight = 22;

  // COLUMN TITLES AND WIDTHS

  sheet.columns = [
    {
      header: "Booking ID",
      key: "id",
      width: 39,
    },
    {
      header: "Customer Name",
      key: "name",
      width: 24,
    },
    {
      header: "Email",
      key: "email",
      width: 34,
    },
    {
      header: "Phone / WhatsApp",
      key: "phone",
      width: 24,
    },
    {
      header: "Country",
      key: "country",
      width: 20,
    },
    {
      header: "Tour",
      key: "tour",
      width: 31,
    },
    {
      header: "Preferred Dates",
      key: "dates",
      width: 25,
    },
    {
      header: "Travelers",
      key: "travelers",
      width: 13,
    },
    {
      header: "Travel Style",
      key: "tripStyle",
      width: 24,
    },
    {
      header: "Accommodation",
      key: "accommodation",
      width: 27,
    },
    {
      header: "Status",
      key: "status",
      width: 17,
    },
    {
      header: "Private Admin Notes",
      key: "notes",
      width: 38,
    },
    {
      header: "Customer Message",
      key: "message",
      width: 48,
    },
    {
      header: "Received (UTC)",
      key: "received",
      width: 23,
    },
  ];

  // PROFESSIONAL HEADER DESIGN

  const headerRow = sheet.getRow(1);

  headerRow.height = 36;

  headerRow.eachCell((cell) => {
    cell.font = {
      name: "Aptos",
      size: 11,
      bold: true,
      color: {
        argb: "FFFFFFFF",
      },
    };

    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "FF10333A",
      },
    };

    cell.alignment = {
      vertical: "middle",
      horizontal: "left",
      wrapText: true,
      indent: 1,
    };

    cell.border = {
      bottom: {
        style: "medium",
        color: {
          argb: "FF65DCC3",
        },
      },
    };
  });

  // STATUS COLORS

  const statusColors: Record<string, string> = {
    new: "FFD5F5EB",
    contacted: "FFDCEFFE",
    confirmed: "FFD6F5DB",
    cancelled: "FFFCE0DF",
  };

  // ADD ALL BOOKING RECORDS

  bookings.forEach((booking, index) => {
    const receivedDate = new Date(
      booking.created_at
    );

    const validDate =
      !Number.isNaN(receivedDate.getTime());

    const row = sheet.addRow({
      id: excelText(booking.id),
      name: excelText(booking.name),
      email: excelText(booking.email),
      phone: excelText(booking.phone),
      country: excelText(booking.country),
      tour: excelText(booking.tour_slug),
      dates: excelText(booking.dates),
      travelers: booking.travelers,
      tripStyle: excelText(booking.trip_style),
      accommodation: excelText(
        booking.accommodation
      ),
      status: booking.status || "new",
      notes: excelText(booking.admin_notes),
      message: excelText(booking.message),
      received: validDate
        ? receivedDate
        : excelText(booking.created_at),
    });

    // Keep long messages manageable.
    row.height = 48;

    const background =
      index % 2 === 0
        ? "FFFFFFFF"
        : "FFF3F8F9";

    row.eachCell(
      { includeEmpty: true },
      (cell) => {
        cell.font = {
          name: "Aptos",
          size: 10,
          color: {
            argb: "FF19323B",
          },
        };

        cell.alignment = {
          vertical: "top",
          horizontal: "left",
          wrapText: true,
        };

        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: background,
          },
        };

        cell.border = {
          bottom: {
            style: "thin",
            color: {
              argb: "FFE1E9EC",
            },
          },
        };
      }
    );

    // Highlight the booking status.
    const statusCell =
      row.getCell("status");

    const statusValue =
      (booking.status || "new").toLowerCase();

    statusCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb:
          statusColors[statusValue] ||
          "FFE9EDF0",
      },
    };

    statusCell.font = {
      name: "Aptos",
      bold: true,
      size: 10,
      color: {
        argb: "FF19323B",
      },
    };
  });

  // DATE FORMAT

  sheet.getColumn("received").numFmt =
    "yyyy-mm-dd hh:mm";

  // ENABLE EXCEL FILTERS

  sheet.autoFilter = {
    from: "A1",
    to: `N${Math.max(1, sheet.rowCount)}`,
  };

  // CREATE ACTUAL XLSX FILE

  const buffer =
    await workbook.xlsx.writeBuffer();

  const output =
    new ArrayBuffer(buffer.byteLength);

  new Uint8Array(output).set(buffer);

  return output;
}

// EXPORT API

export async function GET(request: Request) {
  try {
    // Require admin login.
    const loggedIn =
      await isAdminLoggedIn();

    if (!loggedIn) {
      return Response.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const url = new URL(request.url);

    const search = String(
      url.searchParams.get("q") || ""
    ).trim();

    const status = String(
      url.searchParams.get("status") || ""
    ).trim();

    const notesOnly =
      url.searchParams.get("notes") === "1";

    const requestedSort = String(
      url.searchParams.get("sort") || "newest"
    );

    const sort =
      allowedSorts.includes(requestedSort)
        ? requestedSort
        : "newest";

    const format = String(
      url.searchParams.get("format") || "csv"
    ).toLowerCase();

    // Read bookings from Supabase.
    const bookings =
      await getAllBookings({
        search,
        status,
        notesOnly,
        sort,
      });

    const date = new Date()
      .toISOString()
      .slice(0, 10);

    // EXCEL DOWNLOAD

    if (format === "xlsx") {
      const excelFile =
        await createExcel(bookings);

      return new Response(excelFile, {
        status: 200,
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

          "Content-Disposition":
            `attachment; filename="himalayan-bookings-${date}.xlsx"`,

          "Cache-Control":
            "no-store",
        },
      });
    }

    // EXISTING CSV DOWNLOAD

    const csvFile = createCsv(bookings);

    return new Response(csvFile, {
      status: 200,
      headers: {
        "Content-Type":
          "text/csv; charset=utf-8",

        "Content-Disposition":
          `attachment; filename="himalayan-bookings-${date}.csv"`,

        "Cache-Control":
          "no-store",
      },
    });
  } catch (error) {
    console.error(
      "Booking export error:",
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

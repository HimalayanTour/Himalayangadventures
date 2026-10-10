
import { cookies } from "next/headers";
import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";
import ExcelJS from "exceljs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  status: string | null;
  admin_notes: string | null;
  message: string | null;
  created_at: string;
};

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

// ADMIN AUTHENTICATION

async function isAdminLoggedIn() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    return false;
  }

  const session = (await cookies()).get(
    "admin_session"
  )?.value;

  const token = createHash("sha256")
    .update(password)
    .digest("hex");

  return !!session && session === token;
}

// SUPABASE CONNECTION

function getDb() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase configuration is missing."
    );
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// CLEAN SPREADSHEET TEXT

function safeText(
  value: string | null | undefined
) {
  const text = String(value ?? "")
    .replace(
      /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,
      ""
    );

  // Prevent untrusted spreadsheet formulas.
  return /^[\s]*[=+\-@]/.test(text)
    ? "'" + text
    : text;
}

// FORMAT TOUR NAME

function formatTourName(
  slug: string | null
) {
  if (!slug) {
    return "Custom Tibet Journey";
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

// LOAD BOOKINGS

async function getAllBookings(
  search: string,
  status: string,
  notesOnly: boolean,
  sort: string
): Promise<Booking[]> {
  const db = getDb();

  const allBookings: Booking[] = [];
  const BATCH_SIZE = 1000;

  let from = 0;

  while (true) {
    let query = db
      .from("bookings")
      .select(
        "id,tour_slug,name,email,phone,country,dates,travelers,trip_style,accommodation,status,admin_notes,message,created_at"
      );

    if (allowedStatuses.includes(status)) {
      query = query.eq("status", status);
    }

    if (notesOnly) {
      query = query
        .not("admin_notes", "is", null)
        .neq("admin_notes", "");
    }

    if (search) {
      const cleaned = search
        .replace(/[%_,()]/g, " ")
        .trim();

      if (cleaned) {
        query = query.or(
          `name.ilike.%${cleaned}%,email.ilike.%${cleaned}%,tour_slug.ilike.%${cleaned}%`
        );
      }
    }

    if (sort === "oldest") {
      query = query.order("created_at", {
        ascending: true,
      });
    } else if (sort === "name") {
      query = query
        .order("name", { ascending: true })
        .order("created_at", {
          ascending: false,
        });
    } else if (sort === "travelers") {
      query = query
        .order("travelers", {
          ascending: false,
          nullsFirst: false,
        })
        .order("created_at", {
          ascending: false,
        });
    } else {
      query = query.order("created_at", {
        ascending: false,
      });
    }

    query = query.order("id", {
      ascending: true,
    });

    const { data, error } = await query.range(
      from,
      from + BATCH_SIZE - 1
    );

    if (error) {
      throw new Error(error.message);
    }

    const batch = (data || []) as Booking[];

    allBookings.push(...batch);

    if (batch.length < BATCH_SIZE) {
      break;
    }

    from += BATCH_SIZE;
  }

  return allBookings;
}

// CREATE PROFESSIONAL EXCEL WORKBOOK

async function createExcel(
  bookings: Booking[]
): Promise<ArrayBuffer> {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "Himalayan Adventures";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet(
    "Booking Requests",
    {
      views: [
        {
          state: "frozen",
          ySplit: 1,
        },
      ],
    }
  );

  // ALL BOOKING COLUMNS

  sheet.columns = [
    {
      header: "Booking ID",
      key: "id",
      width: 39,
    },
    {
      header: "Customer Name",
      key: "name",
      width: 25,
    },
    {
      header: "Email Address",
      key: "email",
      width: 35,
    },
    {
      header: "Phone / WhatsApp",
      key: "phone",
      width: 23,
    },
    {
      header: "Country",
      key: "country",
      width: 20,
    },
    {
      header: "Tour Name",
      key: "tour",
      width: 34,
    },
    {
      header: "Travel Dates",
      key: "dates",
      width: 24,
    },
    {
      header: "Travelers",
      key: "travelers",
      width: 14,
    },
    {
      header: "Travel Style",
      key: "tripStyle",
      width: 25,
    },
    {
      header: "Accommodation",
      key: "accommodation",
      width: 27,
    },
    {
      header: "Booking Status",
      key: "status",
      width: 18,
    },
    {
      header: "Private Admin Notes",
      key: "notes",
      width: 40,
    },
    {
      header: "Customer Message",
      key: "message",
      width: 55,
    },
    {
      header: "Received (UTC)",
      key: "received",
      width: 24,
    },
  ];

  // HEADER FORMATTING

  const header = sheet.getRow(1);

  header.height = 36;

  header.eachCell((cell) => {
    cell.font = {
      name: "Arial",
      bold: true,
      size: 11,
      color: {
        argb: "FFFFFFFF",
      },
    };

    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "FF10343D",
      },
    };

    cell.alignment = {
      vertical: "middle",
      horizontal: "left",
      wrapText: true,
    };

    cell.border = {
      bottom: {
        style: "medium",
        color: {
          argb: "FF65DDC4",
        },
      },
    };
  });

  // BOOKING STATUS COLORS

  const statusColors: Record<string, string> = {
    new: "FFDDF7ED",
    contacted: "FFDCEEFF",
    confirmed: "FFD7F4DA",
    cancelled: "FFFFE0DE",
  };

  // ADD ALL BOOKING RECORDS

  bookings.forEach((booking, index) => {
    const receivedDate = new Date(
      booking.created_at
    );

    const received = Number.isNaN(
      receivedDate.getTime()
    )
      ? safeText(booking.created_at)
      : receivedDate
          .toISOString()
          .slice(0, 19)
          .replace("T", " ") + " UTC";

    const row = sheet.addRow({
      id: safeText(booking.id),
      name: safeText(booking.name),
      email: safeText(booking.email),
      phone: safeText(booking.phone),
      country: safeText(booking.country),
      tour: formatTourName(
        booking.tour_slug
      ),
      dates: safeText(booking.dates),
      travelers: booking.travelers,
      tripStyle: safeText(
        booking.trip_style
      ),
      accommodation: safeText(
        booking.accommodation
      ),
      status: booking.status || "new",
      notes: safeText(
        booking.admin_notes
      ),
      message: safeText(
        booking.message
      ),
      received,
    });

    // Keep large messages from making
    // the entire spreadsheet extremely tall.
    row.height = 44;

    const background =
      index % 2 === 0
        ? "FFFFFFFF"
        : "FFF3F8F9";

    row.eachCell(
      { includeEmpty: true },
      (cell) => {
        cell.font = {
          name: "Arial",
          size: 10,
          color: {
            argb: "FF18343D",
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
              argb: "FFE4EAED",
            },
          },
        };
      }
    );

    // HIGHLIGHT BOOKING STATUS

    const statusCell = row.getCell(11);

    const status = (
      booking.status || "new"
    ).toLowerCase();

    statusCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb:
          statusColors[status] ||
          "FFE9EDF0",
      },
    };

    statusCell.font = {
      name: "Arial",
      bold: true,
      size: 10,
      color: {
        argb: "FF19343D",
      },
    };
  });

  // ENABLE EXCEL FILTERS

  sheet.autoFilter = {
    from: "A1",
    to: "N1",
  };

  // GENERATE XLSX FILE

  const workbookBuffer =
    await workbook.xlsx.writeBuffer();

  const bytes = new Uint8Array(
    workbookBuffer
  );

  const output = new ArrayBuffer(
    bytes.byteLength
  );

  new Uint8Array(output).set(bytes);

  return output;
}

// DOWNLOAD EXCEL FILE

export async function GET(request: Request) {
  try {
    const authorized =
      await isAdminLoggedIn();

    if (!authorized) {
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
    ).toLowerCase();

    const notesOnly =
      url.searchParams.get("notes") === "1";

    const requestedSort = String(
      url.searchParams.get("sort") ||
        "newest"
    );

    const sort = allowedSorts.includes(
      requestedSort
    )
      ? requestedSort
      : "newest";

    const bookings =
      await getAllBookings(
        search,
        status,
        notesOnly,
        sort
      );

    const excelFile =
      await createExcel(bookings);

    const date = new Date()
      .toISOString()
      .slice(0, 10);

    return new Response(excelFile, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

        "Content-Disposition":
          `attachment; filename="himalayan-bookings-${date}.xlsx"`,

        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(
      "Excel export error:",
      error
    );

    return Response.json(
      {
        error:
          "Could not create Excel export.",
      },
      {
        status: 500,
      }
    );
  }
}

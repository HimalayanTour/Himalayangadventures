import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BookingBody = {
  tourSlug?: unknown;
  name?: unknown;
  email?: unknown;
  dates?: unknown;
  travelers?: unknown;
  message?: unknown;

  // These will also be supported directly
  // when we update the form later.
  phone?: unknown;
  country?: unknown;
  tripStyle?: unknown;
  accommodation?: unknown;
};

type ParsedMessage = {
  phone: string | null;
  country: string | null;
  tripStyle: string | null;
  accommodation: string | null;
};

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

function cleanText(
  value: unknown,
  maxLength = 2000
) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function cleanOptionalText(
  value: unknown,
  maxLength = 500
) {
  const text = cleanText(
    value,
    maxLength
  );

  return text || null;
}

function parseStructuredMessage(
  message: string
): ParsedMessage {
  if (!message) {
    return {
      phone: null,
      country: null,
      tripStyle: null,
      accommodation: null,
    };
  }

  const lines =
    message.split("\n");

  let phone: string | null =
    null;

  let country: string | null =
    null;

  let tripStyle: string | null =
    null;

  let accommodation:
    | string
    | null = null;

  for (const line of lines) {
    const trimmed =
      line.trim();

    if (
      trimmed.startsWith(
        "Phone / WhatsApp:"
      )
    ) {
      const value = trimmed
        .replace(
          "Phone / WhatsApp:",
          ""
        )
        .trim();

      if (
        value &&
        value !==
          "Not provided"
      ) {
        phone =
          value.slice(0, 100);
      }

      continue;
    }

    if (
      trimmed.startsWith(
        "Country:"
      )
    ) {
      const value = trimmed
        .replace(
          "Country:",
          ""
        )
        .trim();

      if (
        value &&
        value !==
          "Not provided"
      ) {
        country =
          value.slice(0, 100);
      }

      continue;
    }

    if (
      trimmed.startsWith(
        "Trip style:"
      )
    ) {
      const value = trimmed
        .replace(
          "Trip style:",
          ""
        )
        .trim();

      if (
        value &&
        value !==
          "Not specified"
      ) {
        tripStyle =
          value.slice(0, 100);
      }

      continue;
    }

    if (
      trimmed.startsWith(
        "Accommodation:"
      )
    ) {
      const value = trimmed
        .replace(
          "Accommodation:",
          ""
        )
        .trim();

      if (
        value &&
        value !==
          "Not specified"
      ) {
        accommodation =
          value.slice(0, 100);
      }
    }
  }

  return {
    phone,
    country,
    tripStyle,
    accommodation,
  };
}

function isValidEmail(
  email: string
) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
}

export async function POST(
  request: Request
) {
  try {
    let body: BookingBody;

    try {
      body =
        (await request.json()) as BookingBody;
    } catch {
      return NextResponse.json(
        {
          error:
            "Invalid booking request.",
        },
        {
          status: 400,
        }
      );
    }

    const name = cleanText(
      body.name,
      150
    );

    const email = cleanText(
      body.email,
      254
    ).toLowerCase();

    const tourSlug =
      cleanOptionalText(
        body.tourSlug,
        200
      );

    const dates =
      cleanOptionalText(
        body.dates,
        300
      );

    const message =
      cleanOptionalText(
        body.message,
        5000
      );

    if (!name) {
      return NextResponse.json(
        {
          error:
            "Please enter your name.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !email ||
      !isValidEmail(email)
    ) {
      return NextResponse.json(
        {
          error:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    let travelers =
      Number(body.travelers);

    if (
      !Number.isFinite(
        travelers
      )
    ) {
      travelers = 1;
    }

    travelers =
      Math.floor(travelers);

    if (
      travelers < 1 ||
      travelers > 50
    ) {
      return NextResponse.json(
        {
          error:
            "Number of travelers must be between 1 and 50.",
        },
        {
          status: 400,
        }
      );
    }

    /*
      The current booking form still
      stores these details inside the
      message.

      We read them here so they can
      also be saved into the new real
      database columns.
    */
    const parsed =
      parseStructuredMessage(
        message || ""
      );

    /*
      Direct fields are preferred.

      If the form has not yet been
      upgraded to send them directly,
      we use the values extracted from
      the existing message.
    */
    const phone =
      cleanOptionalText(
        body.phone,
        100
      ) || parsed.phone;

    const country =
      cleanOptionalText(
        body.country,
        100
      ) || parsed.country;

    const tripStyle =
      cleanOptionalText(
        body.tripStyle,
        100
      ) || parsed.tripStyle;

    const accommodation =
      cleanOptionalText(
        body.accommodation,
        100
      ) ||
      parsed.accommodation;

    const db = getDb();

    const {
      data,
      error,
    } = await db
      .from("bookings")
      .insert({
        tour_slug: tourSlug,
        name,
        email,
        dates,
        travelers,
        message,

        phone,
        country,
        trip_style:
          tripStyle,
        accommodation,

        status: "new",
      })
      .select("id")
      .single();

    if (error) {
      console.error(
        "Supabase booking insert error:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Could not save your booking request. Please try again.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        id: data.id,
        message:
          "Booking request received. Our team will contact you.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Booking API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}

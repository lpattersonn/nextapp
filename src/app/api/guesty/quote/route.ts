import { NextRequest, NextResponse } from "next/server";
import { guestyFetch, GuestyQuote } from "@/lib/guesty";

/**
 * POST /api/guesty/quote
 * Body: { listingId, checkIn, checkOut, guests }
 *
 * Returns a Guesty price quote.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { listingId, checkIn, checkOut, guests } = body as {
    listingId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  };

  if (!listingId || !checkIn || !checkOut || !guests) {
    return NextResponse.json(
      { error: "listingId, checkIn, checkOut and guests are required" },
      { status: 400 }
    );
  }

  try {
    const quote = await guestyFetch<GuestyQuote>("/reservations/quotes", {
      method: "POST",
      body: JSON.stringify({
        checkInDateLocalized: checkIn,
        checkOutDateLocalized: checkOut,
        listingId,
        numberOfGuests: guests,
      }),
    });

    return NextResponse.json(quote);
  } catch (err) {
    console.error("[guesty/quote]", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

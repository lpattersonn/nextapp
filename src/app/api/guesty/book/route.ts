import { NextRequest, NextResponse } from "next/server";
import { guestyFetch, GuestyGuest, GuestyQuote, GuestyReservation } from "@/lib/guesty";

/**
 * POST /api/guesty/book
 * Body: {
 *   listingId, checkIn, checkOut, guests,
 *   firstName, lastName, email, phone, specialRequests?
 * }
 *
 * Flow: create guest → get quote → create reservation
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const {
    listingId,
    checkIn,
    checkOut,
    guests,
    firstName,
    lastName,
    email,
    phone,
    specialRequests,
  } = body as {
    listingId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    specialRequests?: string;
  };

  if (!listingId || !checkIn || !checkOut || !guests || !firstName || !lastName || !email) {
    return NextResponse.json(
      { error: "listingId, checkIn, checkOut, guests, firstName, lastName and email are required" },
      { status: 400 }
    );
  }

  try {
    // 1. Attempt price quote — optional, not all Guesty plans expose this endpoint
    let quoteId: string | undefined;
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
      quoteId = quote._id;
    } catch {
      console.warn("[guesty/book] Quote step skipped — proceeding without quoteId");
    }

    // 2. Create (or find) the guest record
    const guest = await guestyFetch<GuestyGuest>("/guests", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        ...(phone ? { phone } : {}),
      }),
    });

    // 3. Create the reservation
    const reservation = await guestyFetch<GuestyReservation>("/reservations", {
      method: "POST",
      body: JSON.stringify({
        checkInDateLocalized: checkIn,
        checkOutDateLocalized: checkOut,
        listingId,
        numberOfGuests: { numberOfAdults: guests },
        guestId: guest._id,
        ...(quoteId ? { quoteId } : {}),
        source: "direct",
        ...(specialRequests ? { notes: specialRequests } : {}),
      }),
    });

    return NextResponse.json({
      confirmationCode: reservation.confirmationCode,
      reservationId: reservation._id,
      status: reservation.status,
      money: reservation.money,
    });
  } catch (err) {
    console.error("[guesty/book]", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { guestyFetch, GuestyAvailabilityResponse } from "@/lib/guesty";

/**
 * GET /api/guesty/availability?listingId=...&checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD
 *
 * Returns { available: boolean, days: [...] }
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const listingId = searchParams.get("listingId");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  if (!listingId || !checkIn || !checkOut) {
    return NextResponse.json(
      { error: "listingId, checkIn and checkOut are required" },
      { status: 400 }
    );
  }

  try {
    const data = await guestyFetch<GuestyAvailabilityResponse>(
      `/availability-pricing/api/v3/listings/${listingId}?startDate=${checkIn}&endDate=${checkOut}`
    );

    // Consider the range available only if every day is "available"
    const available = data.days.every((d) => d.status === "available");

    return NextResponse.json({ available, days: data.days });
  } catch (err) {
    console.error("[guesty/availability]", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

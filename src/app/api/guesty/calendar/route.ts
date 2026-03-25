import { NextRequest, NextResponse } from "next/server";
import { getCalendarDays, GuestyAPIError } from "@/lib/guesty";

/**
 * GET /api/guesty/calendar
 *
 * Query params:
 *   listingId   — Guesty listing _id (required)
 *   startDate   — YYYY-MM-DD (required)
 *   endDate     — YYYY-MM-DD (required)
 *
 * Returns:
 *   { days: GuestyAvailabilityDay[] }
 *
 * Used by the property-page calendar to colour-code available / booked days.
 * Response is cached for 10 minutes at the CDN / Next.js layer.
 */
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const listingId = searchParams.get("listingId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!listingId || !startDate || !endDate) {
    return NextResponse.json(
      { error: "listingId, startDate and endDate are required" },
      { status: 400 }
    );
  }

  // Basic date sanity check
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
    return NextResponse.json(
      { error: "endDate must be a valid date after startDate" },
      { status: 400 }
    );
  }

  // Prevent excessively wide ranges (cap at 366 days)
  const daySpan = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  if (daySpan > 366) {
    return NextResponse.json(
      { error: "Date range must not exceed 366 days" },
      { status: 400 }
    );
  }

  try {
    const days = await getCalendarDays(listingId, startDate, endDate);

    // Log a sample so we can verify the status values Guesty is returning
    if (days.length > 0) {
      const sample = days.slice(0, 3).map(d => `${d.date}=${d.status}`).join(", ");
      const counts = days.reduce((acc, d) => { acc[d.status] = (acc[d.status] ?? 0) + 1; return acc; }, {} as Record<string, number>);
      console.log(`[guesty/calendar] ${days.length} days — sample: ${sample} — counts:`, JSON.stringify(counts));
    } else {
      console.log("[guesty/calendar] 0 days returned");
    }

    return NextResponse.json(
      { days },
      {
        headers: {
          // Cache at CDN for 10 minutes; allow stale for an extra 30 s while revalidating
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=30",
          // Tag this response so the Guesty webhook can purge it instantly on new reservations
          "Netlify-Cache-Tag": `calendar-${listingId}`,
        },
      }
    );
  } catch (err) {
    console.error("[api/guesty/calendar]", err);

    if (err instanceof GuestyAPIError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.isNotFound ? 404 : 502 }
      );
    }

    return NextResponse.json(
      { error: (err as Error).message ?? "Internal server error" },
      { status: 500 }
    );
  }
}

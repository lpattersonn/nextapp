import { NextResponse } from "next/server";
import { getAllListings } from "@/lib/guesty";

/**
 * GET /api/guesty/listings
 *
 * Returns all active Guesty listings (paginated internally).
 * Cached at the CDN layer for 10 minutes.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const listings = await getAllListings();
    return NextResponse.json(
      { listings, total: listings.length },
      {
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60",
        },
      }
    );
  } catch (err) {
    console.error("[api/guesty/listings]", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 502 }
    );
  }
}

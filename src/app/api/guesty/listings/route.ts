import { NextResponse } from "next/server";
import { getAllListings } from "@/lib/guesty";

/**
 * GET /api/guesty/listings
 *
 * Returns all active Guesty listings (paginated internally).
 * In-memory cache: 1 hour (globalThis). CDN cache: 1 hour.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const listings = await getAllListings();
    return NextResponse.json(
      { listings, total: listings.length },
      {
        headers: {
          // CDN caches for 1 hour; serves stale for up to 5 min while revalidating
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
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

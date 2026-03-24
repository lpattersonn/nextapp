import { NextRequest, NextResponse } from "next/server";
import { getAllListings, clearListingsCache } from "@/lib/guesty";
import type { GuestyListingFull } from "@/lib/guesty";

/**
 * GET /api/guesty/listings
 *
 * Returns all active Guesty listings trimmed to card-view fields.
 * In-memory cache: 1 hour (globalThis). CDN/browser cache: 1 hour.
 *
 * Add ?bust=1 to clear the in-memory cache and force a fresh Guesty fetch.
 */
export const dynamic = "force-dynamic";

/** Strip each listing down to only what property cards need. */
function trimForCard(l: GuestyListingFull) {
  return {
    _id:          l._id,
    title:        l.title,
    nickname:     l.nickname,
    accommodates: l.accommodates,
    bedrooms:     l.bedrooms,
    bathrooms:    l.bathrooms,
    propertyType: l.propertyType,
    address: l.address
      ? { city: l.address.city, lat: l.address.lat, lng: l.address.lng }
      : undefined,
    prices: l.prices
      ? { basePrice: l.prices.basePrice, currency: l.prices.currency }
      : undefined,
    // Limit to first 8 pictures — cards never show more
    pictures: (l.pictures ?? []).slice(0, 8).map((p) => ({
      _id:      p._id,
      original: p.original,
      thumbnail: p.thumbnail,
    })),
    tags: l.tags ?? [],
  };
}

export async function GET(req: NextRequest) {
  try {
    if (req.nextUrl.searchParams.get("bust") === "1") {
      clearListingsCache();
      console.log("[api/guesty/listings] Cache cleared");
    }

    const listings = await getAllListings();
    const trimmed  = listings.map(trimForCard);

    return NextResponse.json(
      { listings: trimmed, total: trimmed.length },
      {
        headers: {
          // CDN edge + browser cache for 1 hour; serve stale for 5 min while revalidating
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

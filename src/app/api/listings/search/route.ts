import { NextRequest, NextResponse } from "next/server";
import {
  getAllListings,
  getCalendarDays,
  slugifyListing,
  GuestyAPIError,
  type GuestyListingFull,
  type PropertySearchResult,
} from "@/lib/guesty";

export const dynamic = "force-dynamic";

function nightsBetween(checkIn: string, checkOut: string) {
  return Math.max(
    1,
    Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86_400_000
    )
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guestsParam = searchParams.get("guests");

  if (!checkIn || !checkOut || !guestsParam) {
    return NextResponse.json(
      { error: "checkIn, checkOut and guests are required" },
      { status: 400 }
    );
  }

  const guests = parseInt(guestsParam, 10);
  if (isNaN(guests) || guests < 1) {
    return NextResponse.json(
      { error: "guests must be a positive integer" },
      { status: 400 }
    );
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
    return NextResponse.json(
      { error: "checkIn and checkOut must be valid dates (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  if (checkOutDate <= checkInDate) {
    return NextResponse.json(
      { error: "checkOut must be after checkIn" },
      { status: 400 }
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (checkInDate < today) {
    return NextResponse.json(
      { error: "checkIn cannot be in the past" },
      { status: 400 }
    );
  }

  try {
    // Fetch all active listings from Guesty
    const allListings = await getAllListings();
    const nights = nightsBetween(checkIn, checkOut);

    // Filter by guest capacity
    const candidates = allListings.filter(
      (l) => (l.accommodates ?? 0) >= guests
    );

    // Check availability in parallel
    const settled = await Promise.allSettled(
      candidates.map(
        async (listing: GuestyListingFull): Promise<PropertySearchResult> => {
          const days = await getCalendarDays(listing._id, checkIn, checkOut);
          const isAvailable =
            days.length > 0 && days.every((d) => d.status === "available");
          const pricePerNight = listing.prices?.basePrice ?? 0;

          return {
            propertyId: listing._id,
            slug: listing._id, // use Guesty ID as slug for routing
            title: listing.nickname || listing.title,
            images: (listing.pictures ?? [])
              .slice(0, 8)
              .map((p) => p.original),
            pricePerNight,
            totalPrice: pricePerNight * nights,
            currency: listing.prices?.currency ?? "USD",
            availabilityStatus: isAvailable ? "available" : "unavailable",
            location: [listing.address?.city, listing.address?.state]
              .filter(Boolean)
              .join(", "),
            guests: listing.accommodates ?? 0,
            beds: listing.bedrooms ?? 0,
            baths: listing.bathrooms ?? 0,
            nights,
          };
        }
      )
    );

    settled.forEach((r, i) => {
      if (r.status === "rejected") {
        console.error(
          `[listings/search] availability check failed for ${candidates[i]?._id}:`,
          (r as PromiseRejectedResult).reason
        );
      }
    });

    const results = settled
      .filter(
        (r): r is PromiseFulfilledResult<PropertySearchResult> =>
          r.status === "fulfilled"
      )
      .map((r) => r.value);

    // Available first, then by price
    results.sort((a, b) => {
      if (a.availabilityStatus !== b.availabilityStatus) {
        return a.availabilityStatus === "available" ? -1 : 1;
      }
      return a.pricePerNight - b.pricePerNight;
    });

    return NextResponse.json({
      results,
      available: results.filter((r) => r.availabilityStatus === "available")
        .length,
      total: results.length,
    });
  } catch (err) {
    console.error("[api/listings/search]", err);

    if (err instanceof GuestyAPIError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.isRateLimited ? 429 : 502 }
      );
    }

    return NextResponse.json(
      { error: (err as Error).message ?? "Internal server error" },
      { status: 500 }
    );
  }
}

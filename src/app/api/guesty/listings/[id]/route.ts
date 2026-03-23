import { NextRequest, NextResponse } from "next/server";
import { guestyFetch, GuestyListing } from "@/lib/guesty";

/**
 * GET /api/guesty/listings/[id]
 * Returns { title, pictures } for a Guesty listing.
 * Used by the property page to pull live images from the PMS.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const listing = await guestyFetch<GuestyListing>(
      `/listings/${id}?fields=title,pictures`
    );
    return NextResponse.json({
      title: listing.title,
      pictures: listing.pictures ?? [],
    });
  } catch (err) {
    console.error("[guesty/listings]", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

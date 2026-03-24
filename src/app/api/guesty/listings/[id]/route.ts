import { NextRequest, NextResponse } from "next/server";
import { getListingById } from "@/lib/guesty";

/**
 * GET /api/guesty/listings/[id]
 * Returns the full Guesty listing. Cached server-side for 1 hour via getListingById().
 */
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const listing = await getListingById(id);
    return NextResponse.json(listing, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
      },
    });
  } catch (err) {
    console.error("[guesty/listings/[id]]", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

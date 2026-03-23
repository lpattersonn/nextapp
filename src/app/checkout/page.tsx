import { redirect } from "next/navigation";
import { getPropertyBySlug, type Property } from "@/data/properties";
import { guestyFetch, type GuestyListingFull } from "@/lib/guesty";
import CheckoutFlow from "@/components/CheckoutFlow";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  const slug = typeof sp.slug === "string" ? sp.slug : "";
  const listingId = typeof sp.listingId === "string" ? sp.listingId : "";
  const checkIn = typeof sp.checkIn === "string" ? sp.checkIn : "";
  const checkOut = typeof sp.checkOut === "string" ? sp.checkOut : "";
  const guestsRaw = typeof sp.guests === "string" ? parseInt(sp.guests, 10) : 0;

  if (!checkIn || !checkOut || guestsRaw < 1) {
    redirect("/stays");
  }

  // Try local property first, then fall back to a live Guesty fetch
  let property: Property | null = getPropertyBySlug(slug) ?? null;

  if (!property && /^[0-9a-f]{24}$/i.test(listingId)) {
    try {
      const listing = await guestyFetch<GuestyListingFull>(`/listings/${listingId}`);
      property = {
        slug: listingId,
        guestyId: listingId,
        name: listing.nickname || listing.title,
        type: listing.propertyType ?? "Vacation Rental",
        location: [listing.address?.city, listing.address?.state].filter(Boolean).join(", "),
        address: listing.address?.full ?? "",
        guests: listing.accommodates ?? 0,
        beds: listing.bedrooms ?? 0,
        baths: listing.bathrooms ?? 0,
        price: String(listing.prices?.basePrice ?? 0),
        images: (listing.pictures ?? []).slice(0, 8).map((p) => p.original),
        description: "",
        highlights: [],
        amenities: [],
        nearby: [],
        houseRules: [],
      };
    } catch {
      redirect("/stays");
    }
  }

  if (!property) redirect("/stays");

  return (
    <CheckoutFlow
      property={property}
      listingId={listingId || slug}
      checkIn={checkIn}
      checkOut={checkOut}
      guests={guestsRaw}
    />
  );
}

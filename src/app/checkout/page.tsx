import { redirect } from "next/navigation";
import { getPropertyBySlug } from "@/data/properties";
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

  if (!slug || !listingId || !checkIn || !checkOut || guestsRaw < 1) {
    redirect("/stays");
  }

  const property = getPropertyBySlug(slug);
  if (!property) redirect("/stays");

  return (
    <CheckoutFlow
      property={property}
      listingId={listingId}
      checkIn={checkIn}
      checkOut={checkOut}
      guests={guestsRaw}
    />
  );
}

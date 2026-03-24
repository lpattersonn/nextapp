"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { properties, getPropertyBySlug, type Property, type AmenityGroup } from "@/data/properties";
import type { GuestyQuote, GuestyListingFull } from "@/lib/guesty";
import { Users, BedDouble, Bath, Star, CircleCheck, ChevronLeft, ChevronRight, X, LayoutGrid, Phone, MessageSquare } from "lucide-react";

// ─── Guesty amenity grouping ──────────────────────────────────────────────────
const AMENITY_CATS: { label: string; keys: string[] }[] = [
  { label: "Essentials",         keys: ["wifi","internet","air condition","heating","washer","dryer","iron","parking","elevator","hangers","essentials","pack n play","crib","high chair"] },
  { label: "Kitchen",            keys: ["kitchen","cook","coffee","dishwasher","refriger","microwave","oven","toaster","utensil","blender","stove","baking","freezer","dining","wine","kettle","ice maker","trash compactor"] },
  { label: "Outdoor & Pool",     keys: ["bbq","grill","fire pit","fireplace","pool","hot tub","patio","deck","garden","hammock","outdoor","beach","kayak","sauna","cowboy tub","jacuzzi","terrace","balcony","fire place"] },
  { label: "Entertainment",      keys: ["tv","cable","netflix","game","gym","exercise","ping pong","billiard","piano","sound system","streaming","speaker","bluetooth","arcade","foosball","board game","movie","books"] },
  { label: "Bedroom & Laundry",  keys: ["bed linen","extra pillow","pillow","blackout","closet","wardrobe","mattress"] },
  { label: "Bathroom",           keys: ["hair dryer","body soap","shampoo","conditioner","bathtub","towel","bidet","shower"] },
  { label: "Safety",             keys: ["alarm","fire extinguisher","first aid","carbon monoxide","smoke","safety","detector","security","lock box"] },
];

function groupGuestyAmenities(flat: string[]): AmenityGroup[] {
  const placed = new Set<string>();
  const result: AmenityGroup[] = [];
  for (const { label, keys } of AMENITY_CATS) {
    const items = flat.filter(a => !placed.has(a) && keys.some(k => a.toLowerCase().includes(k)));
    if (items.length) {
      items.forEach(a => placed.add(a));
      result.push({ category: label, icon: "", items });
    }
  }
  const rest = flat.filter(a => !placed.has(a));
  if (rest.length) result.push({ category: "Other", icon: "", items: rest });
  return result;
}

/** Strip Guesty prefix like "HVD · Mountain View - " leaving just "Heaven's Door" */
function cleanListingName(raw: string): string {
  const dashIdx = raw.lastIndexOf(" - ");
  return dashIdx !== -1 ? raw.slice(dashIdx + 3).trim() : raw.trim();
}

function guestyToProperty(l: GuestyListingFull, overrides: Partial<Property> = {}): Property {
  const rawName = l.nickname || l.title;
  return {
    slug: l._id,
    guestyId: l._id,
    name: cleanListingName(rawName),
    type: l.propertyType ?? "Vacation Rental",
    location: [l.address?.city, l.address?.state].filter(Boolean).join(", "),
    address: l.address?.full ?? l.address?.city ?? "",
    guests: l.accommodates ?? 0,
    beds: l.bedrooms ?? 0,
    baths: l.bathrooms ?? 0,
    price: l.prices?.basePrice ? String(l.prices.basePrice) : "0",
    images: (l.pictures ?? [])
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .slice(0, 24)
      .map((p) => p.original),
    description: l.publicDescription?.summary ?? "",
    highlights: [],
    amenities: groupGuestyAmenities(l.amenities ?? []),
    nearby: [],
    houseRules: l.publicDescription?.houseRules
      ? l.publicDescription.houseRules.split("\n").map(s => s.trim()).filter(Boolean)
      : [],
    // PMS-enriched
    checkInTime: l.defaultCheckInTime,
    checkOutTime: l.defaultCheckOutTime,
    minNights: l.terms?.minNights,
    maxNights: l.terms?.maxNights,
    cleaningFee: l.prices?.cleaningFee,
    extraPersonFee: l.prices?.extraPersonFee,
    lat: l.address?.lat,
    lng: l.address?.lng,
    squareFeet: l.areaSquareFeet,
    fullAddress: l.address?.full,
    descriptionFull: l.publicDescription?.space,
    houseManual: l.houseManual,
    wifiName: l.wifiName,
    wifiPassword: l.wifiPassword,
    parkingInstructions: l.parkingInstructions,
    ...overrides,
  };
}

// ─── Photo Grid / Mobile Carousel ─────────────────────────────────────────────
function PhotoGrid({ images, name }: { images: string[]; name: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [carouselIdx, setCarouselIdx] = useState(0);

  const main = images[0];
  const side = images.slice(1, 5);
  const filled = [...side, ...Array(Math.max(0, 4 - side.length)).fill(images[0])];

  const open = (i: number) => { setLightboxIdx(i); setLightboxOpen(true); };
  const lbPrev = () => setLightboxIdx(i => (i - 1 + images.length) % images.length);
  const lbNext = () => setLightboxIdx(i => (i + 1) % images.length);
  const cPrev = () => setCarouselIdx(i => (i - 1 + images.length) % images.length);
  const cNext = () => setCarouselIdx(i => (i + 1) % images.length);

  return (
    <>
      {/* ── MOBILE: full-width carousel ── */}
      <div className="sm:hidden relative">
        <div
          className="relative w-full overflow-hidden bg-[#1C1410]"
          style={{ aspectRatio: "4/3" }}
        >
          <Image
            src={images[carouselIdx]}
            alt={name}
            fill
            priority
            className="object-cover"
            unoptimized
          />
          {/* Prev */}
          <button
            onClick={cPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft size={18} color="#1C1410" strokeWidth={2.5} />
          </button>
          {/* Next */}
          <button
            onClick={cNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight size={18} color="#1C1410" strokeWidth={2.5} />
          </button>
          {/* Counter — tap to open gallery */}
          <button
            onClick={() => open(carouselIdx)}
            className="absolute bottom-3 right-3 bg-black/55 text-white text-[12px] font-medium px-2.5 py-1 rounded-full cursor-pointer"
            aria-label="View all photos"
          >
            {carouselIdx + 1} / {images.length}
          </button>
        </div>
      </div>

      {/* ── DESKTOP: grid ── */}
      <div className="hidden sm:block relative">
        <div
          className="grid gap-1.5 rounded-xl overflow-hidden"
          style={{ gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "1fr 1fr", height: "clamp(280px, 45vw, 480px)" }}
        >
          <div className="row-span-2 relative cursor-pointer overflow-hidden group" onClick={() => open(0)}>
            <Image src={main} alt={name} fill priority className="object-cover group-hover:brightness-95 transition duration-300" unoptimized />
          </div>
          {filled.map((img, i) => (
            <div key={i} className="relative cursor-pointer overflow-hidden group" onClick={() => open(i + 1)}>
              <Image src={img} alt="" fill className="object-cover group-hover:brightness-95 transition duration-300" unoptimized />
            </div>
          ))}
        </div>
        <button
          onClick={() => open(0)}
          className="absolute bottom-4 right-4 bg-white text-[#222] text-[13px] font-semibold px-4 py-2.5 rounded-lg border border-[#888] flex items-center gap-2 hover:bg-[#f7f7f7] shadow-sm transition cursor-pointer z-10"
        >
          <LayoutGrid size={14} color="#1C1410" strokeWidth={2} />
          Show all photos
        </button>
      </div>

      {/* ── Lightbox (both) ── */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-5 right-5 text-white/70 hover:text-white cursor-pointer z-10" onClick={() => setLightboxOpen(false)}>
            <X size={28} strokeWidth={1.8} />
          </button>
          <button onClick={e => { e.stopPropagation(); lbPrev(); }} className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white cursor-pointer z-10">
            <ChevronLeft size={22} strokeWidth={2} />
          </button>
          <div className="relative w-full h-[70vh] sm:w-[90vw] sm:max-w-[1100px] sm:h-[85vh]" onClick={e => e.stopPropagation()}>
            <Image src={images[lightboxIdx]} alt={name} fill className="object-contain" unoptimized />
          </div>
          <button onClick={e => { e.stopPropagation(); lbNext(); }} className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white cursor-pointer z-10">
            <ChevronRight size={22} strokeWidth={2} />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-[13px]">{lightboxIdx + 1} / {images.length}</p>
        </div>
      )}
    </>
  );
}

// ─── Booking Widget ───────────────────────────────────────────────────────────
type AvailStatus = "idle" | "checking" | "available" | "unavailable";

function BookingWidget({
  price,
  name,
  guestyId,
  maxGuests,
  propertySlug,
  cleaningFee,
  minNights,
  dayStatuses = {},
}: {
  price: string;
  name: string;
  guestyId?: string;
  maxGuests?: number;
  propertySlug: string;
  cleaningFee?: number;
  minNights?: number;
  dayStatuses?: Record<string, "available" | "unavailable" | "booked" | "blocked">;
}) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [availStatus, setAvailStatus] = useState<AvailStatus>("idle");
  const [quote, setQuote] = useState<GuestyQuote | null>(null);
  const [checkError, setCheckError] = useState("");
  // Custom calendar state
  const [calOpen, setCalOpen] = useState(false);
  const [selecting, setSelecting] = useState<"in" | "out">("in");
  const now2 = new Date();
  const [wcYear, setWcYear] = useState(now2.getFullYear());
  const [wcMonth, setWcMonth] = useState(now2.getMonth());

  const nights = (() => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(0, Math.round(diff / 86400000));
  })();

  const nightly = parseInt(price.replace(",", ""), 10);
  const estimatedSubtotal = nights * nightly;
  const estimatedCleaning = cleaningFee ?? Math.round(nightly * 0.12);

  useEffect(() => {
    setAvailStatus("idle");
    setQuote(null);
    setCheckError("");
  }, [checkIn, checkOut, guests]);

  async function handleCheckAvailability() {
    if (!guestyId || !checkIn || !checkOut || nights < 1) return;
    setAvailStatus("checking");
    setCheckError("");
    try {
      const [availRes, quoteRes] = await Promise.all([
        fetch(`/api/guesty/availability?listingId=${guestyId}&checkIn=${checkIn}&checkOut=${checkOut}`),
        fetch("/api/guesty/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ listingId: guestyId, checkIn, checkOut, guests }),
        }),
      ]);
      const availData = await availRes.json();
      const isAvailable = availData.available === true;
      setAvailStatus(isAvailable ? "available" : "unavailable");
      if (isAvailable && quoteRes.ok) setQuote(await quoteRes.json());
    } catch {
      setAvailStatus("idle");
      setCheckError("Could not check availability. Please try again.");
    }
  }

  const checkoutUrl = `/checkout?slug=${propertySlug}&listingId=${guestyId}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`;
  const canCheck = !!guestyId && !!checkIn && !!checkOut && nights >= 1;
  const datesReady = !!checkIn && !!checkOut && nights >= 1;
  const displaySubtotal = quote ? quote.money.fareAccommodationAdjusted ?? quote.money.fareAccommodation : estimatedSubtotal;
  const displayCleaning = quote ? quote.money.cleaningFee : estimatedCleaning;
  const displayTaxes = quote ? quote.money.totalTaxes : 0;
  const displayTotal = quote ? quote.money.total : displaySubtotal + displayCleaning;
  const currency = quote?.money.currency ?? "USD";
  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency, maximumFractionDigits: 0 });

  return (
    <div className="bg-white rounded-2xl border border-[#E8E0D5] shadow-lg p-6 sticky top-[100px]">
      {/* Price */}
      <div className="mb-5 pb-5 border-b border-[#EDE8DF]">
        <p className="text-[12px] tracking-[0.1em] uppercase text-[#8A7968] mb-1">Starting at</p>
        <div className="flex items-baseline gap-1.5">
          <span className="font-[family-name:var(--font-playfair)] text-[30px] font-normal text-[#1C1410]">${price}</span>
          <span className="text-[15px] text-[#8A7968]">/ night</span>
        </div>
      </div>

      {/* Date + guest inputs */}
      <div className="border border-[#E0D8CE] rounded-xl overflow-hidden mb-4">
        {/* Clickable date display row */}
        <div className="grid grid-cols-2 divide-x divide-[#E0D8CE]">
          <button
            type="button"
            onClick={() => { setSelecting("in"); setCalOpen(true); }}
            className={`p-3.5 text-left transition-colors hover:bg-[#faf7f4] ${calOpen && selecting === "in" ? "bg-[#f7f0e8]" : ""}`}
          >
            <p className="text-[10px] tracking-[0.14em] uppercase text-[#8A7968] font-bold mb-1.5">Check In</p>
            <p className={`text-[13px] ${checkIn ? "text-[#1C1410] font-medium" : "text-[#B0A89A]"}`}>
              {checkIn ? new Date(checkIn + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Add date"}
            </p>
          </button>
          <button
            type="button"
            onClick={() => { setSelecting("out"); setCalOpen(true); }}
            className={`p-3.5 text-left transition-colors hover:bg-[#faf7f4] ${calOpen && selecting === "out" ? "bg-[#f7f0e8]" : ""}`}
          >
            <p className="text-[10px] tracking-[0.14em] uppercase text-[#8A7968] font-bold mb-1.5">Check Out</p>
            <p className={`text-[13px] ${checkOut ? "text-[#1C1410] font-medium" : "text-[#B0A89A]"}`}>
              {checkOut ? new Date(checkOut + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Add date"}
            </p>
          </button>
        </div>
        {/* Inline calendar */}
        {calOpen && (() => {
          const todayISO = new Date().toISOString().split("T")[0];
          const daysInMonth = new Date(wcYear, wcMonth + 1, 0).getDate();
          const firstDOW = new Date(wcYear, wcMonth, 1).getDay();
          const MNAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
          const cells: (string | null)[] = [];
          for (let i = 0; i < firstDOW; i++) cells.push(null);
          for (let d = 1; d <= daysInMonth; d++) {
            cells.push(`${wcYear}-${String(wcMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
          }
          const isPrevDisabled = wcYear === now2.getFullYear() && wcMonth === now2.getMonth();
          function prevWcMonth() {
            if (wcMonth === 0) { setWcYear(y => y - 1); setWcMonth(11); }
            else setWcMonth(m => m - 1);
          }
          function nextWcMonth() {
            if (wcMonth === 11) { setWcYear(y => y + 1); setWcMonth(0); }
            else setWcMonth(m => m + 1);
          }
          function pickDay(iso: string) {
            if (selecting === "in" || (checkIn && iso <= checkIn)) {
              setCheckIn(iso);
              setCheckOut("");
              setSelecting("out");
            } else {
              setCheckOut(iso);
              setCalOpen(false);
            }
          }
          return (
            <div className="border-t border-[#E0D8CE] p-4 bg-white">
              {/* Selecting hint */}
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#7B5B3A] mb-3 text-center">
                {selecting === "in" ? "Select check-in date" : "Select check-out date"}
              </p>
              {/* Month nav */}
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={prevWcMonth}
                  disabled={isPrevDisabled}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#f0e8dc] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <span className="text-[13px] font-semibold text-[#1C1410]">{MNAMES[wcMonth]} {wcYear}</span>
                <button
                  onClick={nextWcMonth}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#f0e8dc] transition-colors cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
              {/* Day of week headers */}
              <div className="grid grid-cols-7 mb-1">
                {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
                  <span key={d} className="text-center text-[10px] text-[#8A7968] font-medium py-1">{d}</span>
                ))}
              </div>
              {/* Day cells */}
              <div className="grid grid-cols-7">
                {cells.map((iso, i) => {
                  if (!iso) return <div key={`e${i}`} className="h-8" />;
                  const st = dayStatuses[iso];
                  const isUnavail = st === "unavailable" || st === "booked" || st === "blocked";
                  const isPast = iso < todayISO;
                  const disabled = isUnavail || isPast;
                  const isIn = iso === checkIn;
                  const isOut = iso === checkOut;
                  const inRange = checkIn && checkOut && iso > checkIn && iso < checkOut;
                  const day = parseInt(iso.split("-")[2]);
                  return (
                    <div key={iso} className={`relative flex items-center justify-center h-8 ${inRange ? "bg-[#f0e8dc]" : ""}`}>
                      <button
                        disabled={disabled}
                        onClick={() => pickDay(iso)}
                        className={[
                          "w-7 h-7 rounded-full flex items-center justify-center text-[12px] transition-all",
                          disabled ? "text-[#C4B8AC] cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-[#e8ddd2]",
                          isIn || isOut ? "!bg-[#1C1410] !text-white hover:!bg-[#1C1410]" : "",
                          isUnavail && !isPast ? "line-through" : "",
                        ].join(" ")}
                      >
                        {day}
                      </button>
                    </div>
                  );
                })}
              </div>
              {/* Clear + close row */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#EDE8DF]">
                {(checkIn || checkOut) ? (
                  <button
                    onClick={() => { setCheckIn(""); setCheckOut(""); setSelecting("in"); }}
                    className="text-[11px] text-[#8A7968] underline underline-offset-2 hover:text-[#1C1410] transition-colors"
                  >
                    Clear dates
                  </button>
                ) : <span />}
                <button
                  onClick={() => setCalOpen(false)}
                  className="text-[11px] text-[#7B5B3A] font-semibold hover:text-[#1C1410] transition-colors"
                >
                  Close ✕
                </button>
              </div>
            </div>
          );
        })()}
        <div className="border-t border-[#E0D8CE] p-3.5 flex items-center justify-between">
          <div>
            <label className="block text-[10px] tracking-[0.14em] uppercase text-[#8A7968] font-bold mb-0.5">Guests</label>
            <span className="text-[13px] text-[#1C1410]">{guests} Guest{guests !== 1 ? "s" : ""}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="w-7 h-7 rounded-full border border-[#C4A882] flex items-center justify-center text-[#7B5B3A] hover:bg-[#F7F4EF] cursor-pointer transition-colors">
              <svg width="10" height="2" viewBox="0 0 10 2" fill="none"><path d="M1 1h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </button>
            <span className="w-4 text-center text-[14px] font-medium text-[#1C1410]">{guests}</span>
            <button onClick={() => setGuests(g => Math.min(maxGuests ?? 20, g + 1))} className="w-7 h-7 rounded-full border border-[#C4A882] flex items-center justify-center text-[#7B5B3A] hover:bg-[#F7F4EF] cursor-pointer transition-colors">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
      </div>

      {availStatus === "available" && (
        <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
          <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
          <span className="text-[13px] text-green-700 font-medium">Available for your dates</span>
        </div>
      )}
      {availStatus === "unavailable" && (
        <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-red-50 rounded-lg border border-red-200">
          <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
          <span className="text-[13px] text-red-700 font-medium">Not available — try different dates</span>
        </div>
      )}
      {checkError && <p className="text-[12px] text-red-600 mb-3">{checkError}</p>}

      {datesReady ? (
        <Link
          href={checkoutUrl}
          className="block w-full py-3.5 bg-[#7B5B3A] text-white text-[13px] font-bold tracking-[0.1em] uppercase text-center hover:bg-[#5A3E28] transition-colors rounded-xl mb-3"
        >
          Reserve
        </Link>
      ) : (
        <button
          onClick={() => { setSelecting("in"); setCalOpen(true); }}
          className="w-full py-3.5 bg-[#7B5B3A] text-white text-[13px] font-bold tracking-[0.1em] uppercase text-center hover:bg-[#5A3E28] transition-colors rounded-xl mb-3 cursor-pointer"
        >
          Reserve
        </button>
      )}

      <p className="text-center text-[11px] text-[#8A7968] mb-4">Best rate guaranteed — book direct &amp; save on OTA fees</p>

      {datesReady && (availStatus === "available" || availStatus === "idle") && (
        <div className="space-y-2.5 pt-4 border-t border-[#EDE8DF]">
          <div className="flex justify-between text-[14px] text-[#5A4A3A]">
            <span className="underline decoration-dotted underline-offset-2">
              {quote ? fmt(quote.money.fareAccommodation / nights) : `$${price}`} × {nights} night{nights !== 1 ? "s" : ""}
            </span>
            <span>{quote ? fmt(displaySubtotal) : `$${estimatedSubtotal.toLocaleString()}`}</span>
          </div>
          <div className="flex justify-between text-[14px] text-[#5A4A3A]">
            <span className="underline decoration-dotted underline-offset-2">Cleaning fee</span>
            <span>{quote ? fmt(displayCleaning) : `$${estimatedCleaning.toLocaleString()}`}</span>
          </div>
          {displayTaxes > 0 && (
            <div className="flex justify-between text-[14px] text-[#5A4A3A]">
              <span className="underline decoration-dotted underline-offset-2">Taxes</span>
              <span>{fmt(displayTaxes)}</span>
            </div>
          )}
          <div className="flex justify-between text-[15px] font-semibold text-[#1C1410] pt-3 border-t border-[#EDE8DF]">
            <span>{quote ? "Total" : "Estimated total"}</span>
            <span>{quote ? fmt(displayTotal) : `$${displayTotal.toLocaleString()}`}</span>
          </div>
          {!quote && <p className="text-[11px] text-[#8A7968]">Final price confirmed after availability check</p>}
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-[#EDE8DF] flex items-center justify-center gap-3">
        <Link href="tel:+17606248481" className="flex items-center gap-1.5 text-[13px] text-[#7B5B3A] hover:underline">
          <Phone size={13} color="#7B5B3A" strokeWidth={2} className="shrink-0" />
          Call us
        </Link>
        <span className="text-[#D0C8BD]">·</span>
        <Link href="/contact" className="flex items-center gap-1.5 text-[13px] text-[#7B5B3A] hover:underline">
          <MessageSquare size={13} color="#7B5B3A" strokeWidth={2} className="shrink-0" />
          Message us
        </Link>
      </div>
    </div>
  );
}

// ─── Calendar Month ───────────────────────────────────────────────────────────
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_LABELS = ["S","M","T","W","T","F","S"];

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function fmtDate(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, m - 1, day).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function CalendarMonth({
  year, month, showLeftArrow, showRightArrow, onPrev, onNext,
  dayStatuses = {}, dayPrices = {}, loading = false,
  checkIn = "", checkOut = "", hoverDate = "",
  onDayClick, onDayHover,
}: {
  year: number; month: number;
  showLeftArrow: boolean; showRightArrow: boolean;
  onPrev: () => void; onNext: () => void;
  dayStatuses?: Record<string, "available" | "unavailable" | "booked" | "blocked">;
  dayPrices?: Record<string, number>;
  loading?: boolean;
  checkIn?: string; checkOut?: string; hoverDate?: string;
  onDayClick?: (key: string) => void;
  onDayHover?: (key: string) => void;
}) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayISO = new Date().toISOString().split("T")[0];
  const rangeEnd = checkOut || (checkIn && hoverDate && hoverDate > checkIn ? hoverDate : "");

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="flex-1 min-w-0">
      {/* Month header */}
      <div className="flex items-center justify-between mb-3">
        {showLeftArrow ? (
          <button onClick={onPrev} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#EDE8DF] transition cursor-pointer">
            <ChevronLeft size={16} color="#7B5B3A" strokeWidth={2.2} />
          </button>
        ) : <div className="w-8" />}
        <span className="text-[14px] font-semibold text-[#1C1410]">{MONTH_NAMES[month]} {year}</span>
        {showRightArrow ? (
          <button onClick={onNext} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#EDE8DF] transition cursor-pointer">
            <ChevronRight size={16} color="#7B5B3A" strokeWidth={2.2} />
          </button>
        ) : <div className="w-8" />}
      </div>

      {/* Day-of-week labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((d, i) => (
          <span key={i} className="text-center text-[11px] text-[#8A7968] font-medium py-1">{d}</span>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-px">
        {cells.map((d, i) => {
          if (!d) return <div key={`e-${i}`} className="h-[52px]" />;
          const key = toDateKey(year, month, d);
          const isPast = key < todayISO;
          const status = dayStatuses[key];
          const price = dayPrices[key];
          const isAvail = status === "available";
          const isBooked = status === "booked" || status === "blocked" || status === "unavailable";
          const isCheckIn = key === checkIn;
          const isCheckOut = key === checkOut;
          const isInRange = !!(checkIn && rangeEnd && key > checkIn && key < rangeEnd);
          const isClickable = !isPast && isAvail && !loading;

          let bg = "";
          let textColor = "";
          let extra = "";

          if (loading) {
            bg = "bg-[#f0ebe3] animate-pulse"; textColor = "text-transparent";
          } else if (isCheckIn || isCheckOut) {
            bg = "bg-[#1C1410]"; textColor = "text-white"; extra = "rounded-lg font-semibold";
          } else if (isInRange) {
            bg = "bg-[#c8e6c9]"; textColor = "text-[#1C1410]";
          } else if (isPast) {
            bg = ""; textColor = "text-[#C8C0B8]";
          } else if (isBooked) {
            bg = "bg-[#fde8e8]"; textColor = "text-[#c0524f]"; extra = "line-through";
          } else if (isAvail) {
            bg = "bg-[#e8f5ec]"; textColor = "text-[#1C1410]"; extra = "hover:bg-[#b8dcc0] transition-colors";
          } else {
            bg = "bg-[#f5f3f0]"; textColor = "text-[#BFBBB6]";
          }

          return (
            <button
              key={d}
              onClick={() => isClickable && onDayClick?.(key)}
              onMouseEnter={() => isClickable && onDayHover?.(key)}
              onMouseLeave={() => onDayHover?.("")}
              disabled={!isClickable && !isCheckIn && !isCheckOut}
              className={`flex flex-col items-center justify-center h-[52px] w-full ${bg} ${textColor} ${extra} ${isClickable ? "cursor-pointer" : "cursor-default"}`}
            >
              <span className="text-[13px] leading-none font-medium">{d}</span>
              {price && isAvail && !isPast && !loading && (
                <span className="text-[10px] leading-none mt-0.5 opacity-80">${price >= 1000 ? `${(price/1000).toFixed(1)}k` : price}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Property Card (with image carousel) ─────────────────────────────────────
function PropertyCard({ p }: { p: Property }) {
  const [imgIdx, setImgIdx] = useState(0);
  return (
    <Link href={`/property/${p.slug}`} className="group block">
      <div className="relative h-[220px] rounded-2xl overflow-hidden mb-3 bg-[#EDE8DF]">
        <Image
          src={p.images[imgIdx]}
          alt={p.name}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
          unoptimized
        />
        {p.badge && (
          <span className="absolute top-3 left-3 bg-white text-[#1C1410] text-[11px] font-semibold tracking-[0.06em] uppercase px-3 py-1 rounded-full shadow-sm z-10">
            {p.badge}
          </span>
        )}
        {p.images.length > 1 && (
          <>
            <button
              onClick={e => { e.preventDefault(); setImgIdx(i => (i - 1 + p.images.length) % p.images.length); }}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[#1C1410] opacity-0 group-hover:opacity-100 transition-opacity shadow cursor-pointer z-10"
            >
              <ChevronLeft size={15} color="#1C1410" strokeWidth={2.5} />
            </button>
            <button
              onClick={e => { e.preventDefault(); setImgIdx(i => (i + 1) % p.images.length); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[#1C1410] opacity-0 group-hover:opacity-100 transition-opacity shadow cursor-pointer z-10"
            >
              <ChevronRight size={15} color="#1C1410" strokeWidth={2.5} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {p.images.slice(0, 5).map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.preventDefault(); setImgIdx(i); }}
                  className={`rounded-full transition-all cursor-pointer ${i === imgIdx ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/60"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div>
        <div className="flex items-start justify-between mb-0.5">
          <h3 className="font-[family-name:var(--font-playfair)] text-[17px] font-normal text-[#1C1410]">{p.name}</h3>
          <div className="flex items-center gap-1 text-[13px] text-[#1C1410] font-medium shrink-0 ml-2">
            <Star size={11} fill="#C4A882" color="#C4A882" strokeWidth={0} />
            4.9
          </div>
        </div>
        <p className="text-[13px] text-[#8A7968] mb-1">{p.type} in {p.location.split(",")[0]}</p>
        <p className="text-[14px] text-[#1C1410]">
          Starting at <span className="font-semibold">${p.price}</span>
          <span className="text-[#8A7968]"> / night</span>
        </p>
        <p className="text-[13px] text-[#8A7968]">{p.guests} guests · {p.beds} beds · {p.baths} baths</p>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PropertyPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const localProp = getPropertyBySlug(slug);
  const isGuestyId = /^[0-9a-f]{24}$/i.test(slug);

  const [property, setProperty] = useState<Property | null>(localProp ?? null);
  const [fetchingGuesty, setFetchingGuesty] = useState(!localProp && isGuestyId);
  const [images, setImages] = useState<string[]>(localProp?.images ?? []);
  const [showDescModal, setShowDescModal] = useState(false);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);

  // Fetch full listing from Guesty for both cases:
  //  1. Slug is a Guesty ID and no local prop → use Guesty as the data source
  //  2. Local prop has a guestyId → enrich with live PMS data (description, amenities, images, prices)
  useEffect(() => {
    const gId = localProp?.guestyId ?? (isGuestyId ? slug : null);
    if (!gId) return;

    fetch(`/api/guesty/listings/${gId}`)
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data: GuestyListingFull) => {
        const enriched = guestyToProperty(data, localProp ? {
          // Preserve manually-curated local fields
          slug: localProp.slug,
          badge: localProp.badge,
          nearby: localProp.nearby,
          guestyId: localProp.guestyId,
        } : {});
        setProperty(enriched);
        setImages(enriched.images);
        setFetchingGuesty(false);
      })
      .catch(() => {
        // Fall back gracefully — keep local data if it exists
        if (localProp) setFetchingGuesty(false);
        else setFetchingGuesty(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const now = new Date();
  const [calStart, setCalStart] = useState({ year: now.getFullYear(), month: now.getMonth() });
  // dayStatuses: YYYY-MM-DD → Guesty availability status (fetched lazily)
  const [dayStatuses, setDayStatuses] = useState<Record<string, "available" | "unavailable" | "booked" | "blocked">>({});
  const [dayPrices, setDayPrices] = useState<Record<string, number>>({});
  const [calLoading, setCalLoading] = useState(false);
  const [calCheckIn, setCalCheckIn] = useState("");
  const [calCheckOut, setCalCheckOut] = useState("");
  const [calHoverDate, setCalHoverDate] = useState("");

  const calSecond = {
    year: calStart.month === 11 ? calStart.year + 1 : calStart.year,
    month: calStart.month === 11 ? 0 : calStart.month + 1,
  };

  const prevCal = () => setCalStart(m => ({
    year: m.month === 0 ? m.year - 1 : m.year,
    month: m.month === 0 ? 11 : m.month - 1,
  }));
  const nextCal = () => setCalStart(m => ({
    year: m.month === 11 ? m.year + 1 : m.year,
    month: m.month === 11 ? 0 : m.month + 1,
  }));

  // Fetch 3-month availability calendar from Guesty whenever the displayed months change
  useEffect(() => {
    if (!property?.guestyId) return;

    const start = new Date(calStart.year, calStart.month, 1);
    const endRaw = new Date(calStart.year, calStart.month + 3, 0);
    const fmtD = (d: Date) => d.toISOString().split("T")[0];

    setCalLoading(true);
    fetch(
      `/api/guesty/calendar?listingId=${property.guestyId}&startDate=${fmtD(start)}&endDate=${fmtD(endRaw)}`
    )
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: { days: Array<{ date: string; status: "available" | "unavailable" | "booked" | "blocked"; price?: number }> }) => {
        if (Array.isArray(data.days)) {
          setDayStatuses(prev => {
            const next = { ...prev };
            data.days.forEach(d => { next[d.date] = d.status; });
            return next;
          });
          setDayPrices(prev => {
            const next = { ...prev };
            data.days.forEach(d => { if (d.price) next[d.date] = d.price; });
            return next;
          });
        }
        setCalLoading(false);
      })
      .catch(() => setCalLoading(false));
  }, [property?.guestyId, calStart]);

  // ── Loading / not-found guards (all hooks above this line) ──
  if (fetchingGuesty) {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-[#7B5B3A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#8A7968] text-[14px]">Loading property…</p>
          </div>
        </div>
      </>
    );
  }

  if (!property) return notFound();

  const allProperties = properties.filter(p => p.slug !== property.slug).slice(0, 3);
  const allAmenities = property.amenities.flatMap(g => g.items);
  const visibleAmenities = allAmenities.slice(0, 10);
  const descParagraphs = property.description ? property.description.split("\n\n") : [];
  const safetyItems = property.amenities.find(g => g.category === "Safety")?.items ?? [];

  return (
    <>
      <Nav />
      <div className="h-[80px] bg-[#FAF8F5]" />

      {/* Photo Grid — edge-to-edge on mobile, contained on desktop */}
      <div className="bg-[#FAF8F5]">
        <div className="sm:max-w-[1120px] sm:mx-auto sm:px-4 sm:pt-4">
          <PhotoGrid images={images} name={property.name} />
        </div>
      </div>

      {/* Main content */}
      <div className="bg-[#FAF8F5] min-h-screen">
        <div className="max-w-[1120px] mx-auto px-4 py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14">

            {/* ── LEFT ── */}
            <div className="min-w-0">

              {/* Title & Stats */}
              <div className="border-b border-[#EDE8DF] pb-7 mb-7">
                <h1 className="font-[family-name:var(--font-playfair)] text-[28px] sm:text-[40px] font-normal text-[#1C1410] leading-tight mb-2">
                  {property.name}
                </h1>
                <p className="text-[14px] sm:text-[15px] text-[#5A4A3A] mb-4">{property.type} in {property.location}</p>
                <div className="flex items-center gap-3 text-[15px] text-[#5A4A3A] flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Users size={15} color="#7B5B3A" strokeWidth={2} className="shrink-0" />
                    <span>{property.guests} guests</span>
                  </span>
                  <span className="text-[#D0C8BD]">·</span>
                  <span className="flex items-center gap-1.5">
                    <BedDouble size={16} color="#7B5B3A" strokeWidth={2} className="shrink-0" />
                    <span>{property.beds} beds</span>
                  </span>
                  <span className="text-[#D0C8BD]">·</span>
                  <span className="flex items-center gap-1.5">
                    <Bath size={15} color="#7B5B3A" strokeWidth={2} className="shrink-0" />
                    <span>{property.baths} baths</span>
                  </span>
                  <span className="text-[#D0C8BD]">·</span>
                  <span className="flex items-center gap-1.5">
                    <Star size={13} color="#C4A882" fill="#C4A882" strokeWidth={0} className="shrink-0" />
                    <span>4.9</span>
                  </span>
                </div>
              </div>

              {/* Check-in info strip */}
              {(property.checkInTime || property.checkOutTime || property.minNights || property.squareFeet) && (
                <div className="border-b border-[#EDE8DF] pb-7 mb-7">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                    {property.checkInTime && (
                      <div>
                        <p className="text-[11px] tracking-[0.12em] uppercase text-[#8A7968] mb-1">Check-in</p>
                        <p className="text-[15px] font-medium text-[#1C1410]">{property.checkInTime}</p>
                      </div>
                    )}
                    {property.checkOutTime && (
                      <div>
                        <p className="text-[11px] tracking-[0.12em] uppercase text-[#8A7968] mb-1">Check-out</p>
                        <p className="text-[15px] font-medium text-[#1C1410]">{property.checkOutTime}</p>
                      </div>
                    )}
                    {property.minNights && (
                      <div>
                        <p className="text-[11px] tracking-[0.12em] uppercase text-[#8A7968] mb-1">Min stay</p>
                        <p className="text-[15px] font-medium text-[#1C1410]">{property.minNights} night{property.minNights !== 1 ? "s" : ""}</p>
                      </div>
                    )}
                    {property.squareFeet && (
                      <div>
                        <p className="text-[11px] tracking-[0.12em] uppercase text-[#8A7968] mb-1">Size</p>
                        <p className="text-[15px] font-medium text-[#1C1410]">{property.squareFeet.toLocaleString()} sq ft</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* About this place */}
              <div className="border-b border-[#EDE8DF] pb-8 mb-8">
                <h2 className="text-[22px] font-semibold text-[#1C1410] mb-4">About this place</h2>
                <div className="text-[15px] text-[#5A4A3A] leading-[1.85] space-y-4">
                  <p>{descParagraphs[0]}</p>
                </div>
                {descParagraphs.length > 1 && (
                  <button
                    onClick={() => setShowDescModal(true)}
                    className="mt-5 px-5 py-2.5 border border-[#5A4A3A] rounded-lg text-[14px] font-medium text-[#5A4A3A] hover:bg-[#f0ebe3] transition cursor-pointer"
                  >
                    Show More
                  </button>
                )}
              </div>

              {/* Quick Tour */}
              {images.length >= 3 && (
                <div className="border-b border-[#EDE8DF] pb-8 mb-8">
                  <h2 className="text-[22px] font-semibold text-[#1C1410] mb-4">Quick Tour</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EDE8DF]">
                      <Image src={images[1]} alt="" fill className="object-cover" unoptimized />
                    </div>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EDE8DF]">
                      <Image src={images[2]} alt="" fill className="object-cover" unoptimized />
                      <button
                        onClick={() => {}}
                        className="absolute bottom-3 right-3 bg-white/90 text-[#1C1410] text-[12px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow hover:bg-white transition cursor-pointer"
                      >
                        <LayoutGrid size={12} color="#1C1410" strokeWidth={2} />
                        Gallery
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* What this place offers */}
              <div id="amenities" className="border-b border-[#EDE8DF] pb-8 mb-8">
                <h2 className="text-[22px] font-semibold text-[#1C1410] mb-5">What this place offers</h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-5">
                  {visibleAmenities.map(item => (
                    <div key={item} className="flex items-center gap-3 text-[14px] text-[#5A4A3A]">
                      <CircleCheck size={16} color="#7B5B3A" strokeWidth={2} className="shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                {allAmenities.length > 10 && (
                  <button
                    onClick={() => setShowAmenitiesModal(true)}
                    className="px-5 py-2.5 border border-[#5A4A3A] rounded-lg text-[14px] font-medium text-[#5A4A3A] hover:bg-[#f0ebe3] transition cursor-pointer"
                  >
                    Show All {allAmenities.length} Amenities
                  </button>
                )}
              </div>

              {/* Availability */}
              <div className="border-b border-[#EDE8DF] pb-8 mb-8">
                <h2 className="text-[22px] font-semibold text-[#1C1410] mb-1">Availability</h2>
                {!calCheckIn && (
                  <p className="text-[13px] text-[#8A7968] mb-5">Select a check-in date</p>
                )}
                {calCheckIn && !calCheckOut && (
                  <p className="text-[13px] text-[#8A7968] mb-5">Check-in: <strong className="text-[#1C1410]">{fmtDate(calCheckIn)}</strong> — now select a check-out date</p>
                )}
                {calCheckIn && calCheckOut && (
                  <p className="text-[13px] text-[#8A7968] mb-5">
                    <strong className="text-[#1C1410]">{fmtDate(calCheckIn)}</strong> → <strong className="text-[#1C1410]">{fmtDate(calCheckOut)}</strong>
                    <button onClick={() => { setCalCheckIn(""); setCalCheckOut(""); }} className="ml-3 text-[#7B5B3A] underline underline-offset-2 cursor-pointer">Clear</button>
                  </p>
                )}

                {/* Two-month calendar */}
                <div className="bg-white border border-[#EDE8DF] rounded-2xl p-5">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <CalendarMonth
                      year={calStart.year} month={calStart.month}
                      showLeftArrow={true} showRightArrow={false}
                      onPrev={prevCal} onNext={nextCal}
                      dayStatuses={dayStatuses} dayPrices={dayPrices} loading={calLoading}
                      checkIn={calCheckIn} checkOut={calCheckOut} hoverDate={calHoverDate}
                      onDayClick={(key) => {
                        if (!calCheckIn || calCheckOut || key <= calCheckIn) {
                          setCalCheckIn(key); setCalCheckOut("");
                        } else {
                          setCalCheckOut(key);
                        }
                      }}
                      onDayHover={setCalHoverDate}
                    />
                    <div className="hidden sm:block w-px bg-[#EDE8DF] self-stretch" />
                    <CalendarMonth
                      year={calSecond.year} month={calSecond.month}
                      showLeftArrow={false} showRightArrow={true}
                      onPrev={prevCal} onNext={nextCal}
                      dayStatuses={dayStatuses} dayPrices={dayPrices} loading={calLoading}
                      checkIn={calCheckIn} checkOut={calCheckOut} hoverDate={calHoverDate}
                      onDayClick={(key) => {
                        if (!calCheckIn || calCheckOut || key <= calCheckIn) {
                          setCalCheckIn(key); setCalCheckOut("");
                        } else {
                          setCalCheckOut(key);
                        }
                      }}
                      onDayHover={setCalHoverDate}
                    />
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-5 mt-5 pt-4 border-t border-[#EDE8DF] text-[12px] text-[#8A7968]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-sm bg-[#e8f5ec] border border-[#b7dfca]" />
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-sm bg-[#fde8e8] border border-[#f5c6c6]" />
                      <span>Booked</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-sm bg-[#f5f3f0] border border-[#E0D8CE]" />
                      <span>Not Available</span>
                    </div>
                  </div>
                </div>

                {/* Reserve CTA when dates are selected */}
                {calCheckIn && calCheckOut && property.guestyId && (
                  <div className="mt-4 flex items-center gap-4 p-4 bg-[#F7F4EF] rounded-xl border border-[#EDE8DF]">
                    <div className="flex-1 text-[13px] text-[#5A4A3A]">
                      <span className="font-semibold text-[#1C1410]">{fmtDate(calCheckIn)}</span>
                      <span className="mx-2 text-[#C4A882]">→</span>
                      <span className="font-semibold text-[#1C1410]">{fmtDate(calCheckOut)}</span>
                      <span className="ml-2 text-[#8A7968]">
                        · {Math.round((new Date(calCheckOut).getTime() - new Date(calCheckIn).getTime()) / 86400000)} nights
                      </span>
                    </div>
                    <Link
                      href={`/checkout?slug=${property.slug}&listingId=${property.guestyId}&checkIn=${calCheckIn}&checkOut=${calCheckOut}&guests=2`}
                      className="px-6 py-2.5 bg-[#1C1410] text-white text-[12px] font-bold tracking-[0.1em] uppercase rounded-lg hover:bg-[#2D1B0E] transition-colors shrink-0"
                    >
                      Reserve
                    </Link>
                  </div>
                )}
              </div>

              {/* Where you'll be */}
              <div id="location" className="border-b border-[#EDE8DF] pb-8 mb-8">
                <h2 className="text-[22px] font-semibold text-[#1C1410] mb-5">Where you&apos;ll be</h2>
                <div className="w-full h-[300px] rounded-xl overflow-hidden border border-[#EDE8DF]">
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(property.address)}&output=embed&z=13`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${property.name}`}
                  />
                </div>
              </div>

              {/* Things To Know */}
              <div className="border-b border-[#EDE8DF] pb-8 mb-8">
                <h2 className="text-[22px] font-semibold text-[#1C1410] mb-6">Things To Know</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#1C1410] mb-3">Neighborhood Highlights</h3>
                    <p className="text-[13px] text-[#5A4A3A] leading-[1.75] mb-3">
                      Explore the best of the area — scenic landscapes, local eats, hidden gems, and unforgettable desert adventures.
                      Whether you&apos;re here to relax or roam, you&apos;ll find something special just minutes away.
                    </p>
                    <Link href="/guidebook" className="text-[13px] text-[#5A4A3A] underline underline-offset-2 hover:text-[#7B5B3A] transition font-medium">
                      See Local Recommendations »
                    </Link>
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#1C1410] mb-3">Map Your Adventure</h3>
                    <p className="text-[13px] text-[#5A4A3A] leading-[1.75] mb-3">
                      Discover can&apos;t-miss spots, hidden gems, and exclusive guest perks to make the most of your stay.
                      From insider tips to unique bookable experiences, we&apos;ve got everything you need.
                    </p>
                    <div className="space-y-2">
                      <Link href="/guidebook" className="block text-[13px] text-[#5A4A3A] underline underline-offset-2 hover:text-[#7B5B3A] transition font-medium">
                        Explore the Guidebook »
                      </Link>
                      <Link href="/contact" className="block text-[13px] text-[#5A4A3A] underline underline-offset-2 hover:text-[#7B5B3A] transition font-medium">
                        Visit the Virtual Concierge »
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#1C1410] mb-3">Safety &amp; property</h3>
                    {safetyItems.slice(0, 3).map(item => (
                      <p key={item} className="text-[13px] text-[#5A4A3A] mb-1.5">{item}</p>
                    ))}
                    <h3 className="text-[14px] font-semibold text-[#1C1410] mt-5 mb-2">Cancellation policy</h3>
                    <p className="text-[13px] text-[#5A4A3A] leading-[1.7]">
                      Add your trip dates to get the cancellation details for this stay.
                    </p>
                  </div>
                </div>
              </div>

              {/* Guest Reviews */}
              <div id="reviews" className="pb-2">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                  </div>
                </div>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-[family-name:var(--font-playfair)] text-[40px] font-normal text-[#1C1410] leading-none">5.0</span>
                  <span className="text-[15px] text-[#5A4A3A]">Overall Rating</span>
                </div>
                <h2 className="text-[22px] font-semibold text-[#1C1410] mb-6">Guest Reviews</h2>
                <div className="elfsight-app-8819b378-e767-434a-9267-dd531ab69581" data-elfsight-app-lazy />
              </div>
            </div>

            {/* ── RIGHT: Booking Widget ── */}
            <div className="hidden lg:block">
              <BookingWidget
                price={property.price}
                name={property.name}
                guestyId={property.guestyId}
                maxGuests={property.guests}
                propertySlug={property.slug}
                cleaningFee={property.cleaningFee}
                minNights={property.minNights}
                dayStatuses={dayStatuses}
              />
            </div>
          </div>

          {/* You May Also Like */}
          {allProperties.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[#EDE8DF]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-[family-name:var(--font-playfair)] text-[32px] font-normal text-[#1C1410]">
                  You May Also Like
                </h2>
                <Link href="/stays" className="text-[14px] text-[#7B5B3A] font-medium hover:underline">
                  View All Listings →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {allProperties.map(p => (
                  <PropertyCard key={p.slug} p={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sticky booking bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#EDE8DF] px-5 py-4 flex items-center justify-between shadow-2xl">
        <div>
          <span className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#1C1410]">${property.price}</span>
          <span className="text-[14px] text-[#8A7968] ml-1">/ night</span>
        </div>
        <Link href="/contact" className="px-7 py-3 bg-[#7B5B3A] text-white text-[13px] font-bold tracking-[0.08em] uppercase rounded-full hover:bg-[#5A3E28] transition-colors">
          Check Availability
        </Link>
      </div>
      <div className="lg:hidden h-[76px]" />

      <Footer />

      {/* ── Description Modal ── */}
      {showDescModal && (
        <div
          className="fixed inset-0 z-[200] bg-black/40 flex items-end sm:items-center justify-center"
          onClick={() => setShowDescModal(false)}
        >
          <div
            className="bg-white w-full sm:max-w-[620px] sm:mx-4 sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-6 pt-6 pb-4 border-b border-[#EDE8DF] shrink-0">
              <button
                onClick={() => setShowDescModal(false)}
                className="w-9 h-9 rounded-full bg-[#F7F4EF] flex items-center justify-center hover:bg-[#EDE8DF] transition cursor-pointer shrink-0"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
              </button>
              <h2 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#1C1410]">
                About this space
              </h2>
            </div>
            {/* Content */}
            <div className="overflow-y-auto px-6 py-6 space-y-5 text-[15px] text-[#5A4A3A] leading-[1.85]">
              {descParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Amenities Modal ── */}
      {showAmenitiesModal && (
        <div
          className="fixed inset-0 z-[200] bg-black/40 flex items-end sm:items-center justify-center"
          onClick={() => setShowAmenitiesModal(false)}
        >
          <div
            className="bg-white w-full sm:max-w-[620px] sm:mx-4 sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-6 pt-6 pb-4 border-b border-[#EDE8DF] shrink-0">
              <button
                onClick={() => setShowAmenitiesModal(false)}
                className="w-9 h-9 rounded-full bg-[#F7F4EF] flex items-center justify-center hover:bg-[#EDE8DF] transition cursor-pointer shrink-0"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
              </button>
              <h2 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#1C1410]">
                What this place offers
              </h2>
            </div>
            {/* Content */}
            <div className="overflow-y-auto px-6 py-6">
              {property.amenities.map(group => (
                group.items.length > 0 && (
                  <div key={group.category} className="mb-8 last:mb-0">
                    <h3 className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#8A7968] mb-4">
                      {group.category}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {group.items.map(item => (
                        <div key={item} className="flex items-center gap-3 text-[14px] text-[#5A4A3A]">
                          <FontAwesomeIcon icon={faCircleCheck} className="w-[16px] h-[16px] text-[#7B5B3A] shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

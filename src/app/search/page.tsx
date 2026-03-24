"use client";
import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import type { GuestyListingFull } from "@/lib/guesty";
import {
  MapPin, CalendarDays, Users, ChevronLeft, ChevronRight,
  SlidersHorizontal, Search, RotateCcw, Star, BedDouble, Bath, ImageOff,
} from "lucide-react";

// Leaflet map — dynamic import (no SSR) because Leaflet requires window
const PropertyMap = dynamic(() => import("./PropertyMap"), { ssr: false });

// ── Category filters ──────────────────────────────────────────────────────────
const CATEGORIES = [
  { label: "Featured",         keywords: [] },
  { label: "Romantic Retreat", keywords: ["romantic", "retreat", "couple"] },
  { label: "Pool",             keywords: ["pool", "swim"] },
  { label: "Boulders",        keywords: ["boulder", "rock"] },
  { label: "Unique",           keywords: ["unique", "dome", "container", "cave"] },
  { label: "Luxury",           keywords: ["luxury", "villa", "estate"] },
];

// ── Sort options ──────────────────────────────────────────────────────────────
type SortKey = "featured" | "price_asc" | "price_desc" | "guests_desc";
const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured",    label: "Featured" },
  { value: "price_asc",   label: "Price: Low to High" },
  { value: "price_desc",  label: "Price: High to Low" },
  { value: "guests_desc", label: "Most Guests" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function cityKey(l: GuestyListingFull) {
  const c = l.address?.city ?? "";
  if (/pioneer/i.test(c)) return "Pioneertown";
  if (/yucca/i.test(c)) return "Yucca Valley";
  if (/joshua/i.test(c)) return "Joshua Tree";
  if (/twentynine|29 palms/i.test(c)) return "Twentynine Palms";
  if (/morongo/i.test(c)) return "Morongo Valley";
  return c || "Hi-Desert";
}

function fmt(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function sortListings(list: GuestyListingFull[], sort: SortKey) {
  return [...list].sort((a, b) => {
    if (sort === "price_asc")   return (a.prices?.basePrice ?? 0) - (b.prices?.basePrice ?? 0);
    if (sort === "price_desc")  return (b.prices?.basePrice ?? 0) - (a.prices?.basePrice ?? 0);
    if (sort === "guests_desc") return (b.accommodates ?? 0) - (a.accommodates ?? 0);
    return 0;
  });
}

// ── Property card ─────────────────────────────────────────────────────────────
function StayCard({
  listing,
  highlighted,
  onHover,
}: {
  listing: GuestyListingFull;
  highlighted: boolean;
  onHover: (id: string | null) => void;
}) {
  const [current, setCurrent] = useState(0);
  const images = (listing.pictures ?? []).slice(0, 8).map((p) => p.original);
  const name = listing.nickname || listing.title;
  const price = listing.prices?.basePrice;

  const prev = (e: React.MouseEvent) => { e.preventDefault(); setCurrent((c) => (c - 1 + images.length) % images.length); };
  const next = (e: React.MouseEvent) => { e.preventDefault(); setCurrent((c) => (c + 1) % images.length); };

  return (
    <Link
      href={`/property/${listing._id}`}
      className={`block bg-white rounded-2xl overflow-hidden transition-all duration-200 ${highlighted ? "shadow-2xl ring-2 ring-[#7B5B3A]" : "shadow-sm hover:shadow-lg"}`}
      onMouseEnter={() => onHover(listing._id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Image */}
      <div className="relative h-[240px] group overflow-hidden bg-[#EDE8DF]">
        {images.length > 0 ? (
          <Image src={images[current]} alt={name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" unoptimized />
        ) : (
          <div className="w-full h-full bg-[#D4C9BC] flex items-center justify-center">
            <ImageOff size={32} color="#9A8A7A" strokeWidth={1.5} />
          </div>
        )}

        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer">
              <ChevronLeft size={16} color="#1C1410" strokeWidth={2.5} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer">
              <ChevronRight size={16} color="#1C1410" strokeWidth={2.5} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {images.slice(0, 5).map((_, i) => (
            <button key={i} onClick={(e) => { e.preventDefault(); setCurrent(i); }}
              className={`rounded-full transition-all cursor-pointer ${i === current ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/60"}`} />
          ))}
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 z-10">
          <Star size={10} fill="#C4A882" color="#C4A882" strokeWidth={0} />
          <span className="text-[11px] font-semibold text-[#1C1410]">4.9</span>
        </div>
      </div>

      {/* Card body */}
      <div className="px-5 py-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-[family-name:var(--font-playfair)] text-[18px] font-normal text-[#1C1410] leading-snug">
            {name}
          </h4>
        </div>
        {price ? (
          <p className="text-[14px] text-[#5A4A3A] mb-2">
            Starting at <span className="font-semibold text-[#1C1410]">${price.toLocaleString()}</span>
          </p>
        ) : null}
        <div className="flex items-center gap-1.5 text-[13px] text-[#8A7968]">
          <span>{listing.propertyType ?? "House"} in {cityKey(listing)}</span>
          <span className="text-[#D0C8BD] mx-1">|</span>
          {listing.accommodates && <span className="flex items-center gap-1"><Users size={12} color="#7B5B3A" strokeWidth={2} />{listing.accommodates}</span>}
          {listing.bedrooms && <span className="flex items-center gap-1 ml-1"><BedDouble size={12} color="#7B5B3A" strokeWidth={2} />{listing.bedrooms}</span>}
          {listing.bathrooms && <span className="flex items-center gap-1 ml-1"><Bath size={12} color="#7B5B3A" strokeWidth={2} />{listing.bathrooms}</span>}
        </div>
      </div>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageInner />
    </Suspense>
  );
}

function SearchPageInner() {
  const router = useRouter();
  const params = useSearchParams();

  // Search state (editable in the top bar)
  const [location, setLocation] = useState(params.get("location") ?? "");
  const [checkIn, setCheckIn]   = useState(params.get("checkIn") ?? "");
  const [checkOut, setCheckOut] = useState(params.get("checkOut") ?? "");
  const [guests, setGuests]     = useState(Number(params.get("guests") ?? 1));
  const [datesOpen, setDatesOpen] = useState(false);
  const datesRef = useRef<HTMLDivElement>(null);

  // Data
  const [listings, setListings]   = useState<GuestyListingFull[]>([]);
  const [loading, setLoading]     = useState(true);
  const [category, setCategory]   = useState("Featured");
  const [sort, setSort]           = useState<SortKey>("featured");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const today  = new Date().toISOString().split("T")[0];
  const minOut = checkIn
    ? new Date(new Date(checkIn + "T12:00:00").getTime() + 86_400_000).toISOString().split("T")[0]
    : new Date(Date.now() + 86_400_000).toISOString().split("T")[0];

  const datesLabel = checkIn && checkOut
    ? `${fmt(checkIn)} – ${fmt(checkOut)}`
    : checkIn ? `${fmt(checkIn)} – Check out` : "Anytime";

  // Close date picker on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (datesRef.current && !datesRef.current.contains(e.target as Node)) setDatesOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Fetch listings
  useEffect(() => {
    fetch("/api/guesty/listings")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => { setListings(data.listings ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Filter + sort
  const filtered = useCallback(() => {
    let result = listings;

    // Location filter
    if (location.trim()) {
      const q = location.toLowerCase();
      result = result.filter((l) =>
        (l.address?.city ?? "").toLowerCase().includes(q) ||
        (l.address?.state ?? "").toLowerCase().includes(q) ||
        cityKey(l).toLowerCase().includes(q)
      );
    }

    // Guest filter
    if (guests > 1) result = result.filter((l) => (l.accommodates ?? 0) >= guests);

    // Category filter
    const cat = CATEGORIES.find((c) => c.label === category);
    if (cat && cat.keywords.length > 0) {
      result = result.filter((l) => {
        const text = [l.nickname, l.title, ...(l.amenities ?? [])].join(" ").toLowerCase();
        return cat.keywords.some((k) => text.includes(k));
      });
    }

    return sortListings(result, sort);
  }, [listings, location, guests, category, sort]);

  const results = filtered();

  function handleSearch() {
    const p = new URLSearchParams({
      ...(location ? { location } : {}),
      ...(checkIn ? { checkIn } : {}),
      ...(checkOut ? { checkOut } : {}),
      guests: String(guests),
    });
    router.push(`/search?${p}`);
  }

  function handleStartOver() {
    setLocation(""); setCheckIn(""); setCheckOut(""); setGuests(1); setCategory("Featured"); setSort("featured");
    router.push("/search");
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F7F4EF]">
      <Nav />

      {/* ── TOP SEARCH BAR ── */}
      <div className="shrink-0 bg-white border-b border-[#EDE8DF] px-4 py-3 mt-[80px]">
        <div className="max-w-[1400px] mx-auto flex items-center gap-2 flex-wrap">

          {/* Location */}
          <label className="flex items-center gap-2 bg-[#F7F4EF] rounded-full px-4 py-2.5 flex-1 min-w-[160px] max-w-[220px] cursor-text">
            <MapPin size={14} color="#7B5B3A" strokeWidth={2} className="shrink-0" />
            <input
              type="text"
              placeholder="Joshua Tree, Yucca Valley"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="text-[13px] text-[#1C1410] placeholder-[#9A8A7A] outline-none bg-transparent w-full"
            />
          </label>

          {/* Dates */}
          <div className="relative" ref={datesRef}>
            <button
              onClick={() => setDatesOpen((o) => !o)}
              className="flex items-center gap-2 bg-[#F7F4EF] rounded-full px-4 py-2.5 text-[13px] cursor-pointer whitespace-nowrap"
            >
              <CalendarDays size={14} color="#7B5B3A" strokeWidth={2} />
              <span style={{ color: checkIn ? "#1C1410" : "#9A8A7A" }}>{datesLabel}</span>
            </button>
            {datesOpen && (
              <div className="absolute top-[calc(100%+6px)] left-0 bg-white rounded-2xl shadow-2xl border border-[#E8E0D5] p-4 z-50 w-[280px]">
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-[#9A8A7A] mb-1.5">Check in</label>
                    <input type="date" min={today} value={checkIn}
                      onChange={(e) => { setCheckIn(e.target.value); if (checkOut && e.target.value >= checkOut) setCheckOut(""); }}
                      className="w-full text-[13px] text-[#1C1410] border border-[#E0D8CE] rounded-lg px-3 py-2 outline-none focus:border-[#C4A882]" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-[#9A8A7A] mb-1.5">Check out</label>
                    <input type="date" min={minOut} value={checkOut}
                      onChange={(e) => { setCheckOut(e.target.value); setDatesOpen(false); }}
                      className="w-full text-[13px] text-[#1C1410] border border-[#E0D8CE] rounded-lg px-3 py-2 outline-none focus:border-[#C4A882]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Guests */}
          <label className="flex items-center gap-2 bg-[#F7F4EF] rounded-full px-4 py-2.5 cursor-pointer">
            <Users size={14} color="#7B5B3A" strokeWidth={2} className="shrink-0" />
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="text-[13px] text-[#1C1410] bg-transparent outline-none cursor-pointer"
            >
              <option value={1}>Select Guests</option>
              {[2,3,4,5,6,7,8,9,10,12,14,16].map((n) => (
                <option key={n} value={n}>{n} Guests</option>
              ))}
            </select>
          </label>

          {/* Filter button */}
          <button className="flex items-center gap-2 bg-[#F7F4EF] border border-[#E0D8CE] rounded-full px-4 py-2.5 text-[13px] text-[#5A4A3A] hover:bg-[#EDE8DF] transition-colors cursor-pointer">
            <SlidersHorizontal size={14} color="#7B5B3A" strokeWidth={2} />
          </button>

          {/* Search */}
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 bg-[#1C1410] text-white rounded-full px-6 py-2.5 text-[13px] font-bold tracking-[0.12em] uppercase hover:bg-[#3D2B1E] transition-colors cursor-pointer"
          >
            <Search size={14} strokeWidth={2.5} />
            Search
          </button>
        </div>

        {/* Category pills */}
        <div className="max-w-[1400px] mx-auto flex items-center gap-3 mt-3 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setCategory(cat.label)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                category === cat.label
                  ? "bg-[#1C1410] text-white"
                  : "bg-[#F7F4EF] text-[#5A4A3A] hover:bg-[#EDE8DF]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN: results + map ── */}
      <div className="flex flex-1 min-h-0">

        {/* LEFT: results list */}
        <div className="flex flex-col w-full lg:w-[58%] min-h-0">

          {/* Results count + sort */}
          <div className="shrink-0 flex items-center justify-between px-5 py-3 bg-white border-b border-[#EDE8DF]">
            <div className="flex items-center gap-3">
              <button
                onClick={handleStartOver}
                className="flex items-center gap-1.5 text-[12px] text-[#7B5B3A] border border-[#C4A882] px-3 py-1.5 rounded-full hover:bg-[#F7F4EF] transition-colors cursor-pointer"
              >
                <RotateCcw size={12} color="#7B5B3A" strokeWidth={2} />
                Start Over
              </button>
              <span className="text-[13px] text-[#8A7968]">
                {loading ? "Loading…" : `${results.length} ${results.length === 1 ? "property" : "Properties"}`}
              </span>
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="text-[13px] text-[#5A4A3A] border border-[#E0D8CE] rounded-lg px-3 py-1.5 outline-none bg-white cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* Cards grid */}
          <div className="flex-1 overflow-y-auto px-4 py-5">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                    <div className="h-[240px] bg-[#E8E2DA]" />
                    <div className="p-5 space-y-3">
                      <div className="h-5 bg-[#E8E2DA] rounded w-3/4" />
                      <div className="h-4 bg-[#E8E2DA] rounded w-1/2" />
                      <div className="h-3 bg-[#E8E2DA] rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <p className="text-[#8A7968] text-[15px] mb-2">No properties match your search.</p>
                <p className="text-[#C4A882] text-[13px] mb-5">Try adjusting your dates, guests, or location.</p>
                <button onClick={handleStartOver} className="px-6 py-2.5 bg-[#7B5B3A] text-white text-[13px] rounded-full hover:bg-[#5A3E28] transition-colors cursor-pointer">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-4">
                {results.map((l) => (
                  <StayCard
                    key={l._id}
                    listing={l}
                    highlighted={hoveredId === l._id}
                    onHover={setHoveredId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: map */}
        <div className="hidden lg:block flex-1 sticky top-0 h-full">
          <PropertyMap
            listings={results}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        </div>

      </div>
    </div>
  );
}

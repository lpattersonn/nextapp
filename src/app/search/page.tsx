"use client";
import { useState, useEffect, useMemo, useRef, Suspense, Component } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import type { GuestyListingFull } from "@/lib/guesty";

// Error boundary prevents PropertyMap Leaflet errors from crashing the page
class MapErrorBoundary extends Component<
  { children: React.ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() {
    if (this.state.error) return <div className="w-full h-full bg-[#EDE8DF] flex items-center justify-center text-[#8A7968] text-sm">Map unavailable</div>;
    return this.props.children;
  }
}
import {
  MapPin, CalendarDays, Users, ChevronLeft, ChevronRight,
  SlidersHorizontal, Search, RotateCcw, BedDouble, Bath, ImageOff,
  Star, Heart, Waves, Mountain, Gem, Crown,
} from "lucide-react";

type CategoryIcon = React.ComponentType<{ size?: number; strokeWidth?: number }>;

const CATEGORIES: { label: string; tag: string; Icon: CategoryIcon }[] = [
  { label: "Featured",         tag: "Featured",      Icon: Star },
  { label: "Romantic Retreat", tag: "Romantic Retreat", Icon: Heart },
  { label: "Pool",             tag: "Pool",          Icon: Waves },
  { label: "Boulders",         tag: "Boulders",      Icon: Mountain },
  { label: "Unique",           tag: "Unique(to-do)", Icon: Gem },
  { label: "Luxury",           tag: "Luxury(to-do)", Icon: Crown },
];

// Leaflet map — dynamic import (no SSR) because Leaflet requires window
const PropertyMap = dynamic(() => import("./PropertyMap"), { ssr: false });

// ── Category filters — pills are derived dynamically from listing tags ─────────
// "Featured" is always first (no tag filter = show all)

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
      className={`block bg-white rounded-2xl overflow-hidden transition-shadow duration-300 ${highlighted ? "shadow-xl" : "shadow-sm hover:shadow-xl"}`}
      onMouseEnter={() => onHover(listing._id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="relative h-[220px] group overflow-hidden bg-[#EDE8DF]">
        {images.length > 0 ? (
          <Image src={images[current]} alt={name} fill className="object-cover transition-opacity duration-300" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
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

        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {images.slice(0, 5).map((_, i) => (
            <button key={i} onClick={(e) => { e.preventDefault(); setCurrent(i); }}
              className={`rounded-full transition-[width,height,background-color] duration-200 cursor-pointer ${i === current ? "w-2 h-2 bg-white" : "w-1.5 h-1.5 bg-white/55"}`} />
          ))}
        </div>
      </div>

      <div className="px-5 py-4">
        <h4 className="font-[family-name:var(--font-playfair)] text-[19px] font-normal text-[#1C1410] mb-1 leading-snug">{name}</h4>
        {price ? (
          <p className="text-[15px] text-[#5A4A3A] mb-2">
            Starting at <span className="font-semibold text-[#1C1410]">${price.toLocaleString()}</span> / night
          </p>
        ) : null}
        <p className="text-[14px] text-[#8A7968] flex items-center gap-3 flex-wrap mt-1">
          {listing.accommodates ? (
            <span className="flex items-center gap-1.5"><Users size={13} color="#7B5B3A" strokeWidth={2} className="shrink-0" /><span>{listing.accommodates}</span></span>
          ) : null}
          {listing.bedrooms ? (
            <span className="flex items-center gap-1.5"><BedDouble size={14} color="#7B5B3A" strokeWidth={2} className="shrink-0" /><span>{listing.bedrooms}</span></span>
          ) : null}
          {listing.bathrooms ? (
            <span className="flex items-center gap-1.5"><Bath size={13} color="#7B5B3A" strokeWidth={2} className="shrink-0" /><span>{listing.bathrooms}</span></span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#F7F4EF]" />}>
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

  // Fetch listings + derive tag pills
  // Stale-while-revalidate: show cached listings immediately, fetch fresh data in background
  useEffect(() => {
    const CACHE_KEY = "cohost_listings_v2";

    function applyListings(raw: GuestyListingFull[]) {
      setListings(raw);
    }

    // 1. Show cached data instantly if available (< 1 hour old)
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { listings: raw, ts } = JSON.parse(cached) as { listings: GuestyListingFull[]; ts: number };
        if (Date.now() - ts < 3_600_000) {
          applyListings(raw);
          setLoading(false);
        }
      }
    } catch {}

    // 2. Always fetch fresh data in the background
    fetch("/api/guesty/listings")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        const raw: GuestyListingFull[] = data.listings ?? [];
        applyListings(raw);
        setLoading(false);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ listings: raw, ts: Date.now() }));
        } catch {}
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter + sort
  const results = useMemo(() => {
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

    // Category filter — match against Guesty listing tags (using actual tag name)
    if (category !== "Featured") {
      const cat = CATEGORIES.find((c) => c.label === category);
      const tag = cat?.tag ?? category;
      result = result.filter((l) => (l.tags ?? []).includes(tag));
    }

    return sortListings(result, sort);
  }, [listings, location, guests, category, sort]);

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
        <div className="flex items-center gap-2 flex-wrap">

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

        {/* Category tabs — horizontally scrollable on mobile */}
        <div className="border-b border-[#EDE8DF] overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center min-w-max sm:min-w-0">
            {CATEGORIES.map(({ label, Icon }) => (
              <button
                key={label}
                onClick={() => setCategory(label)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-3 text-[13px] font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 border-b-2 -mb-px ${
                  category === label
                    ? "border-[#1C1410] text-[#1C1410]"
                    : "border-transparent text-[#8A7968] hover:text-[#1C1410] hover:border-[#C4A882]"
                }`}
              >
                <Icon size={18} strokeWidth={1.5} />
                {label}
              </button>
            ))}
          </div>
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
                {results.map((l: GuestyListingFull) => (
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
          <MapErrorBoundary>
            <PropertyMap
              listings={results}
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          </MapErrorBoundary>
        </div>

      </div>
    </div>
  );
}

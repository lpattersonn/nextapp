"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { GuestyListingFull } from "@/lib/guesty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBed, faBath } from "@fortawesome/free-solid-svg-icons";

// ── Card ──────────────────────────────────────────────────────────────────────
function StayCard({ listing }: { listing: GuestyListingFull }) {
  const [current, setCurrent] = useState(0);
  const images = (listing.pictures ?? []).slice(0, 8).map((p) => p.original);
  const name = listing.nickname || listing.title;
  const price = listing.prices?.basePrice;
  const city = [listing.address?.city, listing.address?.state]
    .filter(Boolean)
    .join(", ");

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent((c) => (c + 1) % images.length);
  };

  return (
    <Link
      href={`/property/${listing._id}`}
      className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-[220px] group overflow-hidden bg-[#EDE8DF]">
        {images.length > 0 ? (
          <Image
            src={images[current]}
            alt={name}
            fill
            className="object-cover transition-opacity duration-300"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-[#D4C9BC] flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9A8A7A" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
          </div>
        )}

        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1C1410" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1C1410" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </>
        )}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {images.slice(0, 5).map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.preventDefault(); setCurrent(i); }}
              className={`rounded-full transition-all duration-200 cursor-pointer ${i === current ? "w-2 h-2 bg-white" : "w-1.5 h-1.5 bg-white/55"}`}
            />
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
          {city && <span>{city}</span>}
          {city && (listing.accommodates || listing.bedrooms) && <span className="text-[#D0C8BD]">·</span>}
          {listing.accommodates ? (
            <span className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faUser} className="w-[13px] h-[13px] text-[#7B5B3A]" />
              <span>{listing.accommodates}</span>
            </span>
          ) : null}
          {listing.bedrooms ? (
            <span className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faBed} className="w-[14px] h-[14px] text-[#7B5B3A]" />
              <span>{listing.bedrooms}</span>
            </span>
          ) : null}
          {listing.bathrooms ? (
            <span className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faBath} className="w-[13px] h-[13px] text-[#7B5B3A]" />
              <span>{listing.bathrooms}</span>
            </span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-[220px] bg-[#E8E2DA]" />
      <div className="px-5 py-4 space-y-2.5">
        <div className="h-5 bg-[#E8E2DA] rounded w-3/4" />
        <div className="h-4 bg-[#E8E2DA] rounded w-1/2" />
        <div className="h-3.5 bg-[#E8E2DA] rounded w-2/3" />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
const CITY_ORDER = [
  "Joshua Tree",
  "Pioneertown",
  "Yucca Valley",
  "Twentynine Palms",
  "Morongo Valley",
];

function cityKey(listing: GuestyListingFull): string {
  const city = listing.address?.city ?? "";
  // Normalize common variants
  if (/pioneer/i.test(city)) return "Pioneertown";
  if (/yucca/i.test(city)) return "Yucca Valley";
  if (/joshua/i.test(city)) return "Joshua Tree";
  if (/twentynine|29 palms/i.test(city)) return "Twentynine Palms";
  if (/morongo/i.test(city)) return "Morongo Valley";
  return city || "Other";
}

export default function StaysPage() {
  const [listings, setListings] = useState<GuestyListingFull[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    fetch("/api/guesty/listings")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        const all: GuestyListingFull[] = data.listings ?? [];
        setListings(all);
        // Default to first non-empty city in preferred order
        const groups = groupByCity(all);
        const first = CITY_ORDER.find((c) => (groups[c]?.length ?? 0) > 0)
          ?? Object.keys(groups)[0]
          ?? "";
        setActiveTab(first);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  function groupByCity(all: GuestyListingFull[]) {
    const map: Record<string, GuestyListingFull[]> = {};
    for (const l of all) {
      const k = cityKey(l);
      if (!map[k]) map[k] = [];
      map[k].push(l);
    }
    return map;
  }

  const groups = groupByCity(listings);

  // Build tab list: preferred order first, then any remaining cities
  const allCities = Array.from(
    new Set([
      ...CITY_ORDER.filter((c) => groups[c]?.length),
      ...Object.keys(groups).filter((c) => !CITY_ORDER.includes(c) && groups[c]?.length),
    ])
  );

  const active = groups[activeTab] ?? [];

  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="relative h-[320px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://assets.guesty.com/image/upload/w_1200,q_auto,f_auto/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg"
            alt="Desert vacation rentals"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,9,5,0.4) 0%, rgba(15,9,5,0.72) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-[1120px] mx-auto px-6 pb-10 w-full">
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/60 mb-2">Discover</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-white font-normal text-[52px] leading-[1.05] mb-2">
            All Listings
          </h1>
          <p className="text-white/75 text-[15px]">
            {loading ? "Loading…" : `${listings.length} properties across the Hi-Desert`}
          </p>
        </div>
      </section>

      {/* City tabs */}
      <div className="bg-white border-b border-[#EDE8DF] sticky top-[80px] z-40">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="flex items-center overflow-x-auto scrollbar-hide">
            {loading
              ? [1, 2, 3, 4].map((i) => (
                  <div key={i} className="px-5 py-5 shrink-0">
                    <div className="h-4 w-24 bg-[#EDE8DF] rounded animate-pulse" />
                  </div>
                ))
              : allCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setActiveTab(city)}
                    className={`px-5 py-5 text-[14px] font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer shrink-0 ${
                      activeTab === city
                        ? "border-[#7B5B3A] text-[#7B5B3A]"
                        : "border-transparent text-[#8A7968] hover:text-[#5A4A3A]"
                    }`}
                  >
                    {city}
                    <span className={`ml-2 text-[12px] ${activeTab === city ? "text-[#7B5B3A]" : "text-[#C4A882]"}`}>
                      ({groups[city]?.length ?? 0})
                    </span>
                  </button>
                ))}
          </div>
        </div>
      </div>

      {/* Listings grid */}
      <section className="py-14 bg-[#F7F4EF] min-h-[60vh]">
        <div className="max-w-[1120px] mx-auto px-6">
          {error ? (
            <div className="text-center py-20">
              <p className="text-[#8A7968] mb-4">Unable to load listings — please try again.</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 border border-[#C4A882] text-[#7B5B3A] text-[13px] rounded-full hover:bg-[#7B5B3A] hover:text-white transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              {!loading && activeTab && (
                <div className="mb-8">
                  <h2 className="font-[family-name:var(--font-playfair)] text-[30px] font-normal text-[#1C1410]">
                    {activeTab}
                  </h2>
                  <p className="text-[14px] text-[#8A7968] mt-1">
                    {active.length} {active.length === 1 ? "property" : "properties"}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading
                  ? [...Array(6)].map((_, i) => <CardSkeleton key={i} />)
                  : active.map((listing) => (
                      <StayCard key={listing._id} listing={listing} />
                    ))}
              </div>

              {!loading && active.length === 0 && !error && (
                <div className="text-center py-20">
                  <p className="text-[#8A7968]">No properties found in this area.</p>
                </div>
              )}
            </>
          )}

          <div className="mt-12 text-center">
            <p className="text-[14px] text-[#8A7968] mb-4">Looking for something specific? We&apos;ll find the perfect match.</p>
            <Link
              href="/contact"
              className="inline-block px-10 py-3.5 bg-[#7B5B3A] text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-[#5A3E28] transition-colors rounded-xl"
            >
              Contact Us →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

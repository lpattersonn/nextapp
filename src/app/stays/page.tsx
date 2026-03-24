"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { GuestyListingFull } from "@/lib/guesty";
import { Users, BedDouble, Bath, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";

// ── Card ──────────────────────────────────────────────────────────────────────
function StayCard({ listing }: { listing: GuestyListingFull }) {
  const [current, setCurrent] = useState(0);
  const images = (listing.pictures ?? []).slice(0, 8).map((p) => p.original);
  const name = listing.nickname || listing.title;
  const price = listing.prices?.basePrice;

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
          {listing.accommodates ? (
            <span className="flex items-center gap-1.5">
              <Users size={13} color="#7B5B3A" strokeWidth={2} className="shrink-0" />
              <span>{listing.accommodates}</span>
            </span>
          ) : null}
          {listing.bedrooms ? (
            <span className="flex items-center gap-1.5">
              <BedDouble size={14} color="#7B5B3A" strokeWidth={2} className="shrink-0" />
              <span>{listing.bedrooms}</span>
            </span>
          ) : null}
          {listing.bathrooms ? (
            <span className="flex items-center gap-1.5">
              <Bath size={13} color="#7B5B3A" strokeWidth={2} className="shrink-0" />
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

// ── Helpers ───────────────────────────────────────────────────────────────────
const CITY_ORDER = [
  "Joshua Tree",
  "Pioneertown",
  "Yucca Valley",
  "Twentynine Palms",
  "Morongo Valley",
];

function cityKey(listing: GuestyListingFull): string {
  const city = listing.address?.city ?? "";
  if (/pioneer/i.test(city)) return "Pioneertown";
  if (/yucca/i.test(city)) return "Yucca Valley";
  if (/joshua/i.test(city)) return "Joshua Tree";
  if (/twentynine|29 palms/i.test(city)) return "Twentynine Palms";
  if (/morongo/i.test(city)) return "Morongo Valley";
  return city || "Other";
}

function groupByCity(all: GuestyListingFull[]) {
  const map: Record<string, GuestyListingFull[]> = {};
  for (const l of all) {
    const k = cityKey(l);
    if (!map[k]) map[k] = [];
    map[k].push(l);
  }
  return map;
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function StaysPage() {
  const [listings, setListings] = useState<GuestyListingFull[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/guesty/listings")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        setListings(data.listings ?? []);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const groups = groupByCity(listings);

  const allCities = loading
    ? CITY_ORDER
    : Array.from(new Set([
        ...CITY_ORDER.filter((c) => groups[c]?.length),
        ...Object.keys(groups).filter((c) => !CITY_ORDER.includes(c) && groups[c]?.length),
      ]));

  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="relative h-[320px] flex items-end overflow-hidden pt-20">
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

      {/* Main content */}
      <section className="py-16 bg-[#F7F4EF] min-h-[60vh]">
        <div className="max-w-[1120px] mx-auto px-6">
          {error ? (
            <div className="text-center py-20">
              <p className="text-[#8A7968] mb-4">Unable to load listings — please try again.</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 border border-[#C4A882] text-[#7B5B3A] text-[13px] rounded-full hover:bg-[#7B5B3A] hover:text-white transition-colors cursor-pointer"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-14">

              {/* ── Left: sticky location nav ── */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-4">
                  Locations
                </p>
                <nav className="flex flex-col gap-1">
                  {allCities.map((city) => (
                    <a
                      key={city}
                      href={`#${city.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-[14px] text-[#5A4A3A] hover:bg-white hover:text-[#7B5B3A] transition-colors group"
                    >
                      <span>{city}</span>
                      {!loading && groups[city] && (
                        <span className="text-[12px] text-[#C4A882] group-hover:text-[#7B5B3A] transition-colors">
                          {groups[city].length}
                        </span>
                      )}
                    </a>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-[#EDE8DF]">
                  <p className="text-[13px] text-[#8A7968] leading-[1.7] mb-4">
                    Looking for something specific?
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block px-5 py-2 border border-[#C4A882] text-[#7B5B3A] text-[13px] font-medium rounded-full hover:bg-[#7B5B3A] hover:text-white hover:border-[#7B5B3A] transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* ── Right: location groups ── */}
              <div className="space-y-16">
                {loading ? (
                  // Skeleton groups
                  [1, 2].map((g) => (
                    <div key={g}>
                      <div className="h-7 w-40 bg-[#E8E2DA] rounded animate-pulse mb-2" />
                      <div className="h-4 w-24 bg-[#E8E2DA] rounded animate-pulse mb-6" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[1, 2].map((i) => <CardSkeleton key={i} />)}
                      </div>
                    </div>
                  ))
                ) : (
                  allCities.map((city) => {
                    const cityListings = groups[city] ?? [];
                    if (!cityListings.length) return null;
                    return (
                      <div
                        key={city}
                        id={city.toLowerCase().replace(/\s+/g, "-")}
                        className="scroll-mt-24"
                      >
                        {/* Section header */}
                        <div className="flex items-center justify-between mb-2 pb-3 border-b border-[#EDE8DF]">
                          <h2 className="font-[family-name:var(--font-playfair)] text-[28px] font-normal text-[#1C1410]">
                            {city}
                          </h2>
                          <span className="text-[13px] text-[#8A7968]">
                            {cityListings.length} {cityListings.length === 1 ? "property" : "properties"}
                          </span>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                          {cityListings.map((listing) => (
                            <StayCard key={listing._id} listing={listing} />
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

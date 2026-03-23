"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PropertySearchResult } from "@/lib/guesty";

type SearchState = "idle" | "loading" | "done" | "error";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(n: number, currency = "USD") {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
}

function today() {
  return new Date().toISOString().split("T")[0];
}

function nightsBetween(checkIn: string, checkOut: string) {
  return Math.max(
    0,
    Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86_400_000
    )
  );
}

// ─── Result Card ─────────────────────────────────────────────────────────────
function ResultCard({ result }: { result: PropertySearchResult }) {
  const [imgIdx, setImgIdx] = useState(0);
  const isAvailable = result.availabilityStatus === "available";

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden border transition-shadow ${
        isAvailable
          ? "border-[#EDE8DF] hover:shadow-xl shadow-sm"
          : "border-[#E8E0D5] opacity-60"
      }`}
    >
      {/* Image carousel */}
      <div className="relative h-[200px] overflow-hidden group bg-[#EDE8DF]">
        {result.images.length > 0 && (
          <Image
            src={result.images[imgIdx]}
            alt={result.title}
            fill
            className={`object-cover transition-transform duration-500 ${
              isAvailable ? "group-hover:scale-[1.03]" : ""
            }`}
            unoptimized
          />
        )}

        {/* Available / Unavailable badge */}
        <span
          className={`absolute top-3 left-3 text-[11px] font-semibold tracking-[0.07em] uppercase px-3 py-1 rounded-full z-10 ${
            isAvailable
              ? "bg-[#7B5B3A] text-white"
              : "bg-white/80 text-[#5A4A3A]"
          }`}
        >
          {isAvailable ? "Available" : "Unavailable"}
        </span>

        {/* Carousel controls — only for available properties */}
        {isAvailable && result.images.length > 1 && (
          <>
            <button
              onClick={() =>
                setImgIdx((i) => (i - 1 + result.images.length) % result.images.length)
              }
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow cursor-pointer z-10"
              aria-label="Previous photo"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() =>
                setImgIdx((i) => (i + 1) % result.images.length)
              }
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow cursor-pointer z-10"
              aria-label="Next photo"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {result.images.slice(0, 5).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`rounded-full transition-all cursor-pointer ${
                    i === imgIdx ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/60"
                  }`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-[family-name:var(--font-playfair)] text-[18px] font-normal text-[#1C1410] leading-snug">
            {result.title}
          </h3>
          {isAvailable && (
            <div className="flex items-center gap-1 text-[13px] font-medium text-[#1C1410] shrink-0">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#1C1410">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              4.9
            </div>
          )}
        </div>

        <p className="text-[13px] text-[#8A7968] mb-3">
          {result.location} · {result.guests} guests · {result.beds} beds · {result.baths} baths
        </p>

        {isAvailable ? (
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[15px] text-[#1C1410]">
                <span className="font-semibold">{fmt(result.pricePerNight)}</span>
                <span className="text-[#8A7968]"> / night</span>
              </p>
              {result.nights > 0 && (
                <p className="text-[13px] text-[#8A7968]">
                  {fmt(result.totalPrice)} total · {result.nights} night{result.nights !== 1 ? "s" : ""}
                </p>
              )}
            </div>
            <Link
              href={`/property/${result.slug}`}
              className="px-5 py-2.5 bg-[#7B5B3A] text-white text-[13px] font-semibold tracking-[0.06em] uppercase rounded-xl hover:bg-[#5A3E28] transition-colors"
            >
              View →
            </Link>
          </div>
        ) : (
          <p className="text-[13px] text-[#8A7968]">
            Not available for selected dates.{" "}
            <Link href={`/property/${result.slug}`} className="underline hover:text-[#7B5B3A]">
              View other dates
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
function ResultSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#EDE8DF] animate-pulse">
      <div className="h-[200px] bg-[#F0EBE3]" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-[#F0EBE3] rounded w-3/4" />
        <div className="h-4 bg-[#F0EBE3] rounded w-1/2" />
        <div className="h-4 bg-[#F0EBE3] rounded w-2/3" />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AvailabilitySearch({
  className = "",
}: {
  className?: string;
}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [state, setState] = useState<SearchState>("idle");
  const [results, setResults] = useState<PropertySearchResult[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const canSearch = !!checkIn && !!checkOut && nights >= 1;

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!canSearch) return;

      setState("loading");
      setErrorMsg("");
      setResults([]);

      try {
        const res = await fetch(
          `/api/listings/search?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
        );

        if (!res.ok) {
          const data = (await res.json()) as { error?: string };
          throw new Error(data.error ?? `Search failed (${res.status})`);
        }

        const data = (await res.json()) as {
          results: PropertySearchResult[];
          available: number;
          total: number;
        };

        setResults(data.results);
        setState("done");
      } catch (err) {
        setErrorMsg((err as Error).message);
        setState("error");
      }
    },
    [canSearch, checkIn, checkOut, guests]
  );

  const available = results.filter((r) => r.availabilityStatus === "available");
  const unavailable = results.filter((r) => r.availabilityStatus === "unavailable");

  return (
    <div className={className}>
      {/* ── Search form ────────────────────────────────────────────────────── */}
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl border border-[#EDE8DF] shadow-sm overflow-hidden"
      >
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto_auto] divide-y sm:divide-y-0 sm:divide-x divide-[#EDE8DF]">
          {/* Check-in */}
          <div className="px-5 py-4">
            <label className="block text-[10px] tracking-[0.14em] uppercase text-[#8A7968] font-bold mb-1.5">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              min={today()}
              required
              onChange={(e) => {
                setCheckIn(e.target.value);
                // Auto-clear checkout if it's now before check-in
                if (checkOut && e.target.value >= checkOut) setCheckOut("");
                setState("idle");
              }}
              className="w-full text-[14px] text-[#1C1410] outline-none bg-transparent cursor-pointer"
            />
          </div>

          {/* Check-out */}
          <div className="px-5 py-4">
            <label className="block text-[10px] tracking-[0.14em] uppercase text-[#8A7968] font-bold mb-1.5">
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn || today()}
              required
              onChange={(e) => {
                setCheckOut(e.target.value);
                setState("idle");
              }}
              className="w-full text-[14px] text-[#1C1410] outline-none bg-transparent cursor-pointer"
            />
          </div>

          {/* Guests */}
          <div className="px-5 py-4 flex items-center gap-3">
            <div>
              <label className="block text-[10px] tracking-[0.14em] uppercase text-[#8A7968] font-bold mb-1.5">
                Guests
              </label>
              <span className="text-[14px] text-[#1C1410]">
                {guests} guest{guests !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="w-7 h-7 rounded-full border border-[#C4A882] flex items-center justify-center text-[#7B5B3A] hover:bg-[#F7F4EF] cursor-pointer transition-colors"
                aria-label="Remove guest"
              >
                <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
                  <path d="M1 1h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
              <span className="w-4 text-center text-[14px] font-medium text-[#1C1410]">
                {guests}
              </span>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.min(20, g + 1))}
                className="w-7 h-7 rounded-full border border-[#C4A882] flex items-center justify-center text-[#7B5B3A] hover:bg-[#F7F4EF] cursor-pointer transition-colors"
                aria-label="Add guest"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Search button */}
          <div className="px-5 py-4 flex items-center">
            <button
              type="submit"
              disabled={!canSearch || state === "loading"}
              className="w-full sm:w-auto px-7 py-3 bg-[#7B5B3A] text-white text-[13px] font-bold tracking-[0.1em] uppercase rounded-xl hover:bg-[#5A3E28] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap"
            >
              {state === "loading" ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Searching…
                </span>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>
      </form>

      {/* ── Summary strip ──────────────────────────────────────────────────── */}
      {nights > 0 && (
        <p className="mt-3 text-[13px] text-[#8A7968] text-center">
          {nights} night{nights !== 1 ? "s" : ""}
          {checkIn && checkOut
            ? ` · ${new Date(checkIn + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${new Date(checkOut + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
            : ""}
        </p>
      )}

      {/* ── Loading skeletons ──────────────────────────────────────────────── */}
      {state === "loading" && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <ResultSkeleton key={i} />
          ))}
        </div>
      )}

      {/* ── Error ─────────────────────────────────────────────────────────── */}
      {state === "error" && (
        <div className="mt-8 flex flex-col items-center gap-4 py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <p className="text-[15px] text-[#1C1410] font-medium">Search failed</p>
          <p className="text-[14px] text-[#8A7968] max-w-sm">{errorMsg}</p>
          <button
            onClick={() => setState("idle")}
            className="px-5 py-2.5 border border-[#5A4A3A] rounded-lg text-[14px] text-[#5A4A3A] hover:bg-[#f0ebe3] transition cursor-pointer"
          >
            Try again
          </button>
        </div>
      )}

      {/* ── Results ───────────────────────────────────────────────────────── */}
      {state === "done" && (
        <div className="mt-8">
          {/* Results header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-[15px] text-[#5A4A3A]">
              {available.length > 0 ? (
                <>
                  <span className="font-semibold text-[#1C1410]">
                    {available.length}
                  </span>{" "}
                  propert{available.length === 1 ? "y" : "ies"} available
                </>
              ) : (
                "No properties available for these dates"
              )}
            </p>
            {results.length > 0 && (
              <p className="text-[13px] text-[#8A7968]">
                {results.length} checked
              </p>
            )}
          </div>

          {/* Available properties */}
          {available.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {available.map((r) => (
                <ResultCard key={r.propertyId} result={r} />
              ))}
            </div>
          )}

          {/* Unavailable properties */}
          {unavailable.length > 0 && (
            <div>
              <p className="text-[13px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-4">
                Not available for these dates
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {unavailable.map((r) => (
                  <ResultCard key={r.propertyId} result={r} />
                ))}
              </div>
            </div>
          )}

          {/* No results at all */}
          {results.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-[15px] text-[#8A7968]">
                No properties matched your search. Try different dates or fewer guests.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

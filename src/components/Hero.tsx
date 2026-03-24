"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const pressLogos = [
  { name: "Logo-01", src: "https://thecohostcompany.com/wp-content/uploads/2025/05/Logo-01.svg", cls: "h-8 w-36" },
  { name: "Logo-02", src: "https://thecohostcompany.com/wp-content/uploads/2025/05/Logo-02.svg", cls: "h-8 w-44" },
  { name: "Logo-03", src: "https://thecohostcompany.com/wp-content/uploads/2025/05/Logo-03.svg", cls: "h-5 w-20" },
  { name: "Logo-04", src: "https://thecohostcompany.com/wp-content/uploads/2025/05/Logo-04.svg", cls: "h-5 w-20" },
  { name: "Logo-05", src: "https://thecohostcompany.com/wp-content/uploads/2025/05/Logo-05.svg", cls: "h-5 w-20" },
];

function fmt(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [datesOpen, setDatesOpen] = useState(false);
  const [missingDates, setMissingDates] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const today = new Date().toISOString().split("T")[0];
  const minOut = checkIn
    ? new Date(new Date(checkIn + "T12:00:00").getTime() + 86_400_000).toISOString().split("T")[0]
    : new Date(Date.now() + 86_400_000).toISOString().split("T")[0];

  const datesLabel =
    checkIn && checkOut
      ? `${fmt(checkIn)} – ${fmt(checkOut)}`
      : checkIn
      ? `${fmt(checkIn)} – Check out`
      : "Anytime";

  // Close dropdown on outside click
  useEffect(() => {
    function outside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDatesOpen(false);
      }
    }
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  function handleSearch() {
    if (!checkIn || !checkOut) {
      setMissingDates(true);
      setDatesOpen(true);
      setTimeout(() => setMissingDates(false), 2500);
      return;
    }
    const params = new URLSearchParams({ checkIn, checkOut, guests: String(guests) });
    router.push(`/stays?${params}`);
  }

  return (
    <section className="relative h-screen min-h-[680px] overflow-hidden flex flex-col">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://assets.guesty.com/image/upload/w_1200,q_auto,f_auto/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg"
          className="w-full h-full object-cover object-center"
        >
          <source src="/video/The-Cohost-Hero-Video-new-on-Vimeo-.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: "#000000", opacity: 0.48 }} />

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 text-center">
        {/* Pill */}
        <div className="mb-7">
          <Link
            href="#stays"
            className="inline-block px-5 py-2 rounded-full border border-white/55 text-white text-[13px] font-medium tracking-wide hover:bg-white/10 transition-colors"
          >
            For Guests
          </Link>
        </div>

        {/* Headline */}
        <h1
          className="font-[family-name:var(--font-playfair)] text-white font-normal leading-[1.08] mb-4 drop-shadow-lg"
          style={{ fontSize: "clamp(40px, 7vw, 84px)" }}
        >
          Stay in the Hi-Desert
        </h1>

        {/* Subtitle */}
        <p className="text-white/85 text-[16px] leading-[1.8] mb-10 max-w-[500px] drop-shadow">
          Thoughtfully managed, beautifully designed vacation rentals in
          <br className="hidden sm:block" />
          Pioneertown, Joshua Tree, Yucca Valley &amp; beyond
        </p>

        {/* ── Search bar ── */}
        <div className="w-full max-w-[760px] relative" ref={dropdownRef}>
          <div
            className="flex items-stretch rounded-full overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.97)",
              boxShadow: "0 4px 32px rgba(0,0,0,0.30), 0 1px 4px rgba(0,0,0,0.20)",
            }}
          >
            {/* Anywhere */}
            <label className="flex items-center gap-2.5 px-6 py-4 flex-1 border-r border-[#ddd8d0] cursor-text min-w-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="2" strokeLinecap="round" className="shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <input
                type="text"
                placeholder="Anywhere"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-[14px] text-[#1C1410] placeholder-[#9A8A7A] outline-none bg-transparent min-w-0"
              />
            </label>

            {/* Anytime (date range button) */}
            <button
              type="button"
              onClick={() => setDatesOpen((o) => !o)}
              className={`hidden sm:flex items-center gap-2.5 px-6 py-4 flex-1 border-r text-left transition-colors ${
                missingDates
                  ? "border-[#c4773a]/50 bg-[#fff8f4]"
                  : "border-[#ddd8d0] hover:bg-[#faf7f4]"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={missingDates ? "#c4773a" : "#7B5B3A"} strokeWidth="2" strokeLinecap="round" className="shrink-0">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span
                className="text-[14px] truncate"
                style={{ color: checkIn || checkOut ? "#1C1410" : missingDates ? "#c4773a" : "#9A8A7A" }}
              >
                {datesLabel}
              </span>
            </button>

            {/* Guests */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-4 border-r border-[#ddd8d0]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="2" strokeLinecap="round" className="shrink-0">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="w-6 h-6 rounded-full border border-[#C4A882]/70 flex items-center justify-center text-[#7B5B3A] hover:bg-[#f0e8dc] transition-colors text-[15px] leading-none"
                  aria-label="Fewer guests"
                >
                  −
                </button>
                <span className="text-[14px] text-[#1C1410] tabular-nums w-5 text-center">{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(16, g + 1))}
                  className="w-6 h-6 rounded-full border border-[#C4A882]/70 flex items-center justify-center text-[#7B5B3A] hover:bg-[#f0e8dc] transition-colors text-[15px] leading-none"
                  aria-label="More guests"
                >
                  +
                </button>
              </div>
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-[#1C1410] text-white text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-[#2D1B0E] transition-colors shrink-0 cursor-pointer"
            >
              Search
            </button>
          </div>

          {/* Dates dropdown */}
          {datesOpen && (
            <div className="absolute top-[calc(100%+10px)] left-1/4 right-0 bg-white rounded-2xl shadow-2xl border border-[#E8E0D5] p-6 z-50 min-w-[320px]">
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#8A7968] mb-4">
                {!checkIn ? "Select check-in date" : !checkOut ? "Now select check-out" : "Update dates"}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-[#9A8A7A] mb-1.5">Check in</label>
                  <input
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (checkOut && e.target.value >= checkOut) setCheckOut("");
                    }}
                    className="w-full text-[14px] text-[#1C1410] border border-[#E0D8CE] rounded-lg px-3 py-2.5 outline-none focus:border-[#C4A882] cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-[#9A8A7A] mb-1.5">Check out</label>
                  <input
                    type="date"
                    min={minOut}
                    value={checkOut}
                    onChange={(e) => {
                      setCheckOut(e.target.value);
                      if (checkIn) setDatesOpen(false);
                    }}
                    className="w-full text-[14px] text-[#1C1410] border border-[#E0D8CE] rounded-lg px-3 py-2.5 outline-none focus:border-[#C4A882] cursor-pointer"
                  />
                </div>
              </div>
              {checkIn && checkOut && (
                <button
                  onClick={() => { setCheckIn(""); setCheckOut(""); }}
                  className="mt-3 text-[12px] text-[#8A7968] underline underline-offset-2 hover:text-[#1C1410] transition-colors"
                >
                  Clear dates
                </button>
              )}
            </div>
          )}
        </div>

        {missingDates && (
          <p className="mt-3 text-white/80 text-[13px]">Please select your check-in and check-out dates</p>
        )}
      </div>

      {/* Press logos */}
      <div className="relative z-10 pb-7 px-5">
        <p className="text-center text-white/50 text-[10px] tracking-[0.25em] uppercase mb-3">Featured In</p>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {pressLogos.map((logo) => (
            <div key={logo.name} className={`relative ${logo.cls} opacity-70 hover:opacity-100 transition-opacity brightness-0 invert`}>
              <Image src={logo.src} alt={logo.name} fill className="object-contain" unoptimized />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

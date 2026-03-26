"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, CalendarDays, Users, X } from "lucide-react";

function normalizeCity(raw: string): string {
  if (/pioneer/i.test(raw)) return "Pioneertown";
  if (/yucca/i.test(raw)) return "Yucca Valley";
  if (/joshua/i.test(raw)) return "Joshua Tree";
  if (/twentynine|29 palms/i.test(raw)) return "Twentynine Palms";
  if (/morongo/i.test(raw)) return "Morongo Valley";
  return raw.trim();
}

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

/** Defers video download until page is idle.
 *  Poster renders immediately as a plain <img> so the hero is never grey.
 *  The video fades in on top once it can play. */
function LazyVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const load = () => {
      el.preload = "auto";
      el.load();
      el.play().catch(() => {});
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(load, { timeout: 3000 });
      return () => cancelIdleCallback(id);
    } else {
      const t = setTimeout(load, 2000);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Poster image — visible immediately, acts as background until video plays */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Video fades in over the poster once ready */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        onCanPlay={() => setVideoVisible(true)}
        className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
        style={{ opacity: videoVisible ? 1 : 0 }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

export default function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [datesOpen, setDatesOpen] = useState(false);
  const locationOptions = ["Joshua Tree", "Pioneertown", "Twentynine Palms", "Yucca Valley"];
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
    const params = new URLSearchParams({
      guests: String(guests),
      ...(location ? { location } : {}),
      ...(checkIn ? { checkIn } : {}),
      ...(checkOut ? { checkOut } : {}),
    });
    router.push(`/search?${params}`);
  }

  return (
    <section className="relative h-[100svh] min-h-[680px] overflow-hidden flex flex-col">
      {/* Background video — poster loads instantly; video deferred until page is idle */}
      <div className="absolute inset-0">
        <LazyVideo
          src="/video/hero.mp4"
          poster="https://assets.guesty.com/image/upload/w_1200,q_auto,f_auto/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: "#000000", opacity: 0.48 }} />

      {/* Spacer = nav height (80px) so flex-1 content centers within the visible viewport */}
      <div className="relative z-10 h-20 shrink-0" />

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
          Thoughtfully managed, beautifully designed vacation rentals in{" "}
          <br className="hidden sm:block" />
          Pioneertown, Joshua Tree, Yucca Valley &amp; beyond
        </p>

        {/* ── Search bar ── */}
        <div className="w-full max-w-[760px] relative" ref={dropdownRef}>

          {/* ── MOBILE: stacked card ── */}
          {/* Outer: dark glass wrapper */}
          <div
            className="sm:hidden"
            style={{
              padding: "8px",
              borderRadius: "20px",
              background: "rgba(0, 0, 0, 0.10)",
              boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.28), 0px 0px 2px 0px rgba(0, 0, 0, 0.48)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            {/* Inner: solid white form */}
            <div className="rounded-xl overflow-hidden bg-white">
              {/* Location */}
              <label className="flex items-center gap-3 px-5 py-4 border-b border-[#EDE8DF] cursor-text">
                <MapPin size={15} color="#7B5B3A" strokeWidth={2} className="shrink-0 opacity-80" />
                <input
                  type="text"
                  placeholder="Anywhere"
                  list="hero-locations-mobile"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 text-[15px] text-[#1C1410] placeholder-[#9A8A7A] outline-none bg-transparent"
                />
                <datalist id="hero-locations-mobile">
                  {locationOptions.map((loc) => <option key={loc} value={loc} />)}
                </datalist>
              </label>

              {/* Dates */}
              <button
                type="button"
                onClick={() => setDatesOpen((o) => !o)}
                className="w-full flex items-center gap-3 px-5 py-4 border-b border-[#EDE8DF] text-left transition-colors"
              >
                <CalendarDays size={15} color="#7B5B3A" strokeWidth={2} className="shrink-0 opacity-80" />
                <span className="flex-1 text-[15px]" style={{ color: checkIn || checkOut ? "#1C1410" : "#9A8A7A" }}>
                  {datesLabel}
                </span>
                {(checkIn || checkOut) && (
                  <X size={12} color="#9A8A7A" strokeWidth={2} />
                )}
              </button>

              {/* Guests */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[#EDE8DF]">
                <Users size={15} color="#7B5B3A" strokeWidth={2} className="shrink-0 opacity-80" />
                <span className="flex-1 text-[15px] text-[#5A4A3A]">{guests} Guest{guests !== 1 ? "s" : ""}</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="w-7 h-7 rounded-full border border-[#C4A882] flex items-center justify-center text-[#7B5B3A] text-[16px] leading-none hover:bg-[#F7F4EF] cursor-pointer"
                    aria-label="Fewer guests"
                  >−</button>
                  <span className="text-[15px] text-[#1C1410] tabular-nums w-4 text-center">{guests}</span>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(16, g + 1))}
                    className="w-7 h-7 rounded-full border border-[#C4A882] flex items-center justify-center text-[#7B5B3A] text-[16px] leading-none hover:bg-[#F7F4EF] cursor-pointer"
                    aria-label="More guests"
                  >+</button>
                </div>
              </div>

              {/* Search */}
              <button
                onClick={handleSearch}
                className="w-full py-4 bg-[#1C1410] text-white text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-[#2D1B0E] active:bg-[#3D2B1E] transition-colors cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>

          {/* ── DESKTOP: horizontal pill ── */}
          {/* Outer: dark glass ring */}
          <div
            className="hidden sm:block"
            style={{
              padding: "8px",
              borderRadius: "100px",
              background: "rgba(0, 0, 0, 0.10)",
              boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.28), 0px 0px 2px 0px rgba(0, 0, 0, 0.48)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            {/* Inner: solid white/brand form */}
            <div className="flex items-stretch rounded-full bg-white">
              {/* Anywhere */}
              <label className="flex items-center gap-2.5 px-6 py-3.5 flex-1 cursor-text min-w-0">
                <MapPin size={14} color="#7B5B3A" strokeWidth={2} className="shrink-0 opacity-80" />
                <input
                  type="text"
                  placeholder="Anywhere"
                  list="hero-locations-desktop"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-[14px] text-[#1C1410] placeholder-[#9A8A7A] outline-none bg-transparent min-w-0"
                />
                <datalist id="hero-locations-desktop">
                  {locationOptions.map((loc) => <option key={loc} value={loc} />)}
                </datalist>
              </label>

              {/* Anytime */}
              <button
                type="button"
                onClick={() => setDatesOpen((o) => !o)}
                className="flex items-center gap-2.5 px-6 py-3.5 flex-1 text-left transition-colors rounded-none hover:bg-[#FAF8F5]"
              >
                <CalendarDays size={14} color="#7B5B3A" strokeWidth={2} className="shrink-0 opacity-80" />
                <span className="text-[14px] truncate" style={{ color: checkIn || checkOut ? "#1C1410" : "#9A8A7A" }}>
                  {datesLabel}
                </span>
              </button>

              {/* Guests */}
              <div className="flex items-center gap-2 px-5 py-3.5">
                <Users size={14} color="#7B5B3A" strokeWidth={2} className="shrink-0 opacity-80" />
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="w-5 h-5 rounded-full border border-[#C4A882] flex items-center justify-center text-[#7B5B3A] hover:bg-[#F7F4EF] transition-colors text-[14px] leading-none cursor-pointer" aria-label="Fewer guests">−</button>
                  <span className="text-[14px] text-[#1C1410] tabular-nums w-4 text-center">{guests}</span>
                  <button type="button" onClick={() => setGuests((g) => Math.min(16, g + 1))} className="w-5 h-5 rounded-full border border-[#C4A882] flex items-center justify-center text-[#7B5B3A] hover:bg-[#F7F4EF] transition-colors text-[14px] leading-none cursor-pointer" aria-label="More guests">+</button>
                </div>
              </div>

              {/* Search */}
              <button
                onClick={handleSearch}
                className="m-1 px-7 bg-[#1C1410] text-white text-[12px] font-bold tracking-[0.15em] uppercase rounded-full hover:bg-[#3D2B1E] transition-colors shrink-0 cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>

          {/* Dates dropdown */}
          {datesOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 right-0 sm:left-1/4 bg-white rounded-2xl shadow-2xl border border-[#E8E0D5] p-5 z-50">
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
                    onChange={(e) => { setCheckIn(e.target.value); if (checkOut && e.target.value >= checkOut) setCheckOut(""); }}
                    className="w-full text-[14px] text-[#1C1410] border border-[#E0D8CE] rounded-lg px-3 py-2.5 outline-none focus:border-[#C4A882] cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-[#9A8A7A] mb-1.5">Check out</label>
                  <input
                    type="date"
                    min={minOut}
                    value={checkOut}
                    onChange={(e) => { setCheckOut(e.target.value); if (checkIn) setDatesOpen(false); }}
                    className="w-full text-[14px] text-[#1C1410] border border-[#E0D8CE] rounded-lg px-3 py-2.5 outline-none focus:border-[#C4A882] cursor-pointer"
                  />
                </div>
              </div>
              {checkIn && checkOut && (
                <button onClick={() => { setCheckIn(""); setCheckOut(""); }} className="mt-3 text-[12px] text-[#8A7968] underline underline-offset-2 hover:text-[#1C1410] transition-colors">
                  Clear dates
                </button>
              )}
            </div>
          )}
        </div>

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

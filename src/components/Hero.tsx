"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const pressLogos = [
  { name: "Logo-01", src: "https://thecohostcompany.com/wp-content/uploads/2025/05/Logo-01.svg", cls: "h-8 w-36" },
  { name: "Logo-02", src: "https://thecohostcompany.com/wp-content/uploads/2025/05/Logo-02.svg", cls: "h-8 w-44" },
  { name: "Logo-03", src: "https://thecohostcompany.com/wp-content/uploads/2025/05/Logo-03.svg", cls: "h-5 w-20" },
  { name: "Logo-04", src: "https://thecohostcompany.com/wp-content/uploads/2025/05/Logo-04.svg", cls: "h-5 w-20" },
  { name: "Logo-05", src: "https://thecohostcompany.com/wp-content/uploads/2025/05/Logo-05.svg", cls: "h-5 w-20" },
];

export default function Hero() {
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden flex flex-col">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src="/video/The-Cohost-Hero-Video-new-on-Vimeo-.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "#00000066", opacity: 0.72 }}
      />

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 text-center">
        {/* "For Guests" pill */}
        <div className="mb-7">
          <Link
            href="#stays"
            className="inline-block px-5 py-2 rounded-full border border-white/65 text-white text-[13px] font-medium tracking-wide hover:bg-white/15 transition-colors"
          >
            For Guests
          </Link>
        </div>

        {/* Headline */}
        <h1
          className="font-[family-name:var(--font-playfair)] text-white font-normal leading-[1.08] mb-5 drop-shadow-lg"
          style={{ fontSize: "clamp(46px, 7.5vw, 88px)" }}
        >
          Stay in the Hi-Desert
        </h1>

        {/* Subtitle */}
        <p className="text-white/90 text-[16px] leading-[1.75] mb-10 max-w-[540px] drop-shadow">
          Thoughtfully managed, beautifully designed vacation rentals in<br className="hidden sm:block" />
          Pioneertown, Joshua Tree, Yucca Valley &amp; beyond
        </p>

        {/* Search bar */}
        <div className="w-full max-w-[740px] p-2 rounded-[120px]" style={{ background: "rgba(0,0,0,0.10)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.28), 0px 0px 2px 0px rgba(0,0,0,0.48)" }}>
        <div className="w-full flex items-center" style={{ padding: "2px", borderRadius: "100px", background: "rgba(247,243,238,0.92)", boxShadow: "0px 4px 24px rgba(0,0,0,0.18)" }}>
          {/* Location */}
          <label className="flex items-center gap-2.5 px-5 py-[7px] flex-1 border-r border-[#C4A882]/40 min-w-0 cursor-text">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="2" strokeLinecap="round" className="shrink-0">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <input
              type="text"
              placeholder="Anywhere"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-[14px] text-[#2D1B0E] placeholder-[#9A8A7A] outline-none bg-transparent"
            />
          </label>
          {/* Dates */}
          <label className="hidden sm:flex items-center gap-2.5 px-5 py-[7px] flex-1 border-r border-[#C4A882]/40 min-w-0 cursor-text">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="2" strokeLinecap="round" className="shrink-0">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <input
              type="text"
              placeholder="Anytime"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              className="w-full text-[14px] text-[#2D1B0E] placeholder-[#9A8A7A] outline-none bg-transparent"
            />
          </label>
          {/* Guests */}
          <label className="hidden sm:flex items-center gap-2.5 px-5 py-[7px] flex-1 min-w-0 cursor-text">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="2" strokeLinecap="round" className="shrink-0">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
              type="text"
              placeholder="Select Guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full text-[14px] text-[#2D1B0E] placeholder-[#9A8A7A] outline-none bg-transparent"
            />
          </label>
          {/* Search button */}
          <button className="m-1 px-7 py-2.5 bg-[#2D1B0E] text-white text-[12px] font-bold tracking-[0.14em] uppercase rounded-full hover:bg-[#1a0f06] transition-colors shrink-0 cursor-pointer">
            Search
          </button>
        </div>
        </div>
      </div>

      {/* Press logos */}
      <div className="relative z-10 pb-8 px-5">
        <p className="text-center text-white/55 text-[10px] tracking-[0.25em] uppercase mb-4">
          Featured In
        </p>
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {pressLogos.map((logo) => (
            <div key={logo.name} className={`relative ${logo.cls} opacity-80 hover:opacity-100 transition-opacity brightness-0 invert`}>
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

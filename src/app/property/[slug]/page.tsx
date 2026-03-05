"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { properties, getPropertyBySlug } from "@/data/properties";

// ─── Gallery ──────────────────────────────────────────────────────────────────
function Gallery({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <>
      {/* Main image */}
      <div className="relative w-full h-[58vh] min-h-[420px] max-h-[700px] bg-[#1C0A04]">
        <Image
          src={images[current]}
          alt={`${name} — photo ${current + 1}`}
          fill
          priority
          className="object-cover cursor-zoom-in"
          unoptimized
          onClick={() => setLightbox(true)}
        />
        {/* Always-visible nav arrows */}
        <button onClick={prev} aria-label="Previous" className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/50 hover:bg-black/75 flex items-center justify-center text-white transition-colors cursor-pointer shadow-lg">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button onClick={next} aria-label="Next" className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/50 hover:bg-black/75 flex items-center justify-center text-white transition-colors cursor-pointer shadow-lg">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all cursor-pointer ${i === current ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50"}`} />
          ))}
        </div>
        {/* Photo count + all photos */}
        <button
          onClick={() => setLightbox(true)}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-[#1C1410] text-[12px] font-semibold tracking-[0.07em] uppercase px-4 py-2 rounded-full shadow flex items-center gap-2 transition-colors cursor-pointer"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Show all photos
        </button>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 px-5 py-2.5 bg-[#111] overflow-x-auto">
          {images.map((img, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`relative w-16 h-11 rounded shrink-0 overflow-hidden transition-all cursor-pointer ${i === current ? "ring-2 ring-[#C4A882] opacity-100" : "opacity-45 hover:opacity-80"}`}>
              <Image src={img} alt="" fill className="object-cover" unoptimized />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button className="absolute top-5 right-5 text-white/70 hover:text-white cursor-pointer" onClick={() => setLightbox(false)}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div className="relative w-[90vw] max-w-[1100px] h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={images[current]} alt={name} fill className="object-contain" unoptimized />
          </div>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-[13px]">{current + 1} / {images.length}</p>
        </div>
      )}
    </>
  );
}

// ─── Booking Widget ───────────────────────────────────────────────────────────
function BookingWidget({ price, name }: { price: string; name: string }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const nights = (() => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(0, Math.round(diff / 86400000));
  })();

  const nightly = parseInt(price.replace(",", ""), 10);
  const subtotal = nights * nightly;
  const cleaningFee = Math.round(nightly * 0.12);
  const total = subtotal + cleaningFee;

  return (
    <div className="bg-white rounded-2xl border border-[#EDE8DF] shadow-xl p-7 sticky top-[100px]">
      {/* Price */}
      <div className="flex items-baseline gap-1.5 mb-6 pb-5 border-b border-[#EDE8DF]">
        <span className="font-[family-name:var(--font-playfair)] text-[34px] font-normal text-[#1C1410]">${price}</span>
        <span className="text-[15px] text-[#8A7968]">/ night</span>
      </div>

      {/* Date + guest inputs */}
      <div className="border border-[#EDE8DF] rounded-xl overflow-hidden mb-4">
        <div className="grid grid-cols-2 divide-x divide-[#EDE8DF]">
          <div className="p-3.5">
            <label className="block text-[10px] tracking-[0.12em] uppercase text-[#8A7968] font-bold mb-1.5">Check-in</label>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full text-[13px] text-[#1C1410] outline-none bg-transparent cursor-pointer" />
          </div>
          <div className="p-3.5">
            <label className="block text-[10px] tracking-[0.12em] uppercase text-[#8A7968] font-bold mb-1.5">Check-out</label>
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full text-[13px] text-[#1C1410] outline-none bg-transparent cursor-pointer" />
          </div>
        </div>
        <div className="border-t border-[#EDE8DF] p-3.5 flex items-center justify-between">
          <div>
            <label className="block text-[10px] tracking-[0.12em] uppercase text-[#8A7968] font-bold mb-0.5">Guests</label>
            <span className="text-[13px] text-[#1C1410]">{guests} guest{guests !== 1 ? "s" : ""}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={() => setGuests((g) => Math.max(1, g - 1))} className="w-7 h-7 rounded-full border border-[#C4A882] flex items-center justify-center text-[#7B5B3A] hover:bg-[#F7F4EF] cursor-pointer transition-colors">
              <svg width="10" height="2" viewBox="0 0 10 2" fill="none"><path d="M1 1h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </button>
            <span className="w-4 text-center text-[14px] font-medium text-[#1C1410]">{guests}</span>
            <button onClick={() => setGuests((g) => g + 1)} className="w-7 h-7 rounded-full border border-[#C4A882] flex items-center justify-center text-[#7B5B3A] hover:bg-[#F7F4EF] cursor-pointer transition-colors">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
      </div>

      <Link href="/contact" className="block w-full py-4 bg-[#7B5B3A] text-white text-[13px] font-bold tracking-[0.12em] uppercase text-center hover:bg-[#5A3E28] transition-colors rounded-xl mb-3 cursor-pointer">
        Check Availability
      </Link>
      <p className="text-center text-[11px] text-[#8A7968] mb-5">Best rate guaranteed — book direct &amp; save on OTA fees</p>

      {/* Price breakdown */}
      {nights > 0 && (
        <div className="space-y-2.5 pt-5 border-t border-[#EDE8DF]">
          <div className="flex justify-between text-[14px] text-[#5A4A3A]">
            <span className="underline decoration-dotted underline-offset-2">${price} × {nights} night{nights !== 1 ? "s" : ""}</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[14px] text-[#5A4A3A]">
            <span className="underline decoration-dotted underline-offset-2">Cleaning fee</span>
            <span>${cleaningFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[15px] font-semibold text-[#1C1410] pt-3 border-t border-[#EDE8DF]">
            <span>Total before taxes</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Divider + contact link */}
      <div className="mt-6 pt-5 border-t border-[#EDE8DF] flex items-center justify-center gap-3">
        <Link href="tel:+17606248481" className="flex items-center gap-1.5 text-[13px] text-[#7B5B3A] hover:underline">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.82 12 19.79 19.79 0 0 1 1.78 3.41 2 2 0 0 1 3.77 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.28-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg>
          Call us
        </Link>
        <span className="text-[#D0C8BD]">·</span>
        <Link href="/contact" className="flex items-center gap-1.5 text-[13px] text-[#7B5B3A] hover:underline">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Message us
        </Link>
      </div>

      {/* 10% off banner */}
      <div className="mt-5 bg-[#F7F4EF] rounded-xl px-4 py-3 flex items-center gap-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="1.8" strokeLinecap="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
        <p className="text-[12px] text-[#5A4A3A]">
          <span className="font-semibold text-[#7B5B3A]">Sign up & get 10% OFF</span> your first stay
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PropertyPage() {
  const params = useParams<{ slug: string }>();
  const property = getPropertyBySlug(params.slug);
  if (!property) notFound();

  const related = properties
    .filter((p) => p.location === property.location && p.slug !== property.slug)
    .slice(0, 3);

  return (
    <>
      <Nav />
      <div className="h-[80px]" />

      {/* Gallery */}
      <Gallery images={property.images} name={property.name} />

      {/* Sticky breadcrumb / quick info bar */}
      <div className="bg-white border-b border-[#EDE8DF] sticky top-[80px] z-40">
        <div className="max-w-[1120px] mx-auto px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[13px] text-[#8A7968]">
            <Link href="/stays" className="hover:text-[#7B5B3A] transition-colors">Stays</Link>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span className="text-[#1C1410] font-medium">{property.name}</span>
          </div>
          <div className="hidden sm:flex items-center gap-5 text-[13px] text-[#8A7968]">
            <a href="#description" className="hover:text-[#7B5B3A] transition-colors">Overview</a>
            <a href="#amenities" className="hover:text-[#7B5B3A] transition-colors">Amenities</a>
            <a href="#location" className="hover:text-[#7B5B3A] transition-colors">Location</a>
            <a href="#reviews" className="hover:text-[#7B5B3A] transition-colors">Reviews</a>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="bg-[#F7F4EF]">
        <div className="max-w-[1120px] mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14">

            {/* ── LEFT ── */}
            <div className="min-w-0">

              {/* Property header */}
              <div id="description" className="mb-8">
                {property.badge && (
                  <span className="inline-flex items-center gap-1.5 bg-[#7B5B3A] text-white text-[11px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full mb-4">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    {property.badge}
                  </span>
                )}
                <h1 className="font-[family-name:var(--font-playfair)] text-[48px] font-normal text-[#1C1410] leading-[1.05] mb-3">
                  {property.name}
                </h1>
                <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-[15px] text-[#8A7968]">
                  <span>{property.type} in {property.location}</span>
                  {property.address && (
                    <>
                      <span className="text-[#D0C8BD]">·</span>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(property.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-[#7B5B3A] transition-colors"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {property.address}
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Guests", value: property.guests, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="1.7" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                  { label: "Bedrooms", value: property.beds, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="1.7" strokeLinecap="round"><path d="M2 9V19H22V9"/><path d="M6 9V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/></svg> },
                  { label: "Bathrooms", value: property.baths, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="1.7" strokeLinecap="round"><path d="M9 6V3.5a2.5 2.5 0 0 1 5 0V6"/><rect x="2" y="6" width="20" height="10" rx="2"/><path d="M6 16v2M18 16v2"/></svg> },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl p-5 flex flex-col items-center gap-2 shadow-sm text-center">
                    {stat.icon}
                    <span className="font-[family-name:var(--font-playfair)] text-[26px] font-normal text-[#1C1410] leading-none">{stat.value}</span>
                    <span className="text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              {property.highlights.length > 0 && (
                <div className="bg-white rounded-2xl p-7 mb-5 shadow-sm">
                  <h2 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#1C1410] mb-5">What makes this place special</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-[14px] text-[#5A4A3A]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4A882" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5"><path d="M5 13l4 4L19 7"/></svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description */}
              <div className="bg-white rounded-2xl p-7 mb-5 shadow-sm">
                <h2 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#1C1410] mb-5">About this place</h2>
                <div className="text-[15px] text-[#5A4A3A] leading-[1.9] space-y-4">
                  {property.description.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
                </div>
              </div>

              {/* Amenities */}
              <div id="amenities" className="bg-white rounded-2xl p-7 mb-5 shadow-sm">
                <h2 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#1C1410] mb-6">What this place offers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  {property.amenities.map((group) => (
                    <div key={group.category}>
                      <h3 className="flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase text-[#8A7968] font-semibold mb-3">
                        <span>{group.icon}</span>{group.category}
                      </h3>
                      <ul className="space-y-2">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-center gap-2.5 text-[14px] text-[#5A4A3A]">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C4A882" strokeWidth="2.5" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div id="location" className="bg-white rounded-2xl p-7 mb-5 shadow-sm">
                <h2 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#1C1410] mb-5">Location & Nearby</h2>
                {property.address && (
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(property.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[14px] text-[#7B5B3A] hover:underline mb-6"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {property.address} — View on Google Maps ↗
                  </a>
                )}
                {/* Embedded map */}
                <div className="w-full h-[240px] rounded-xl overflow-hidden mb-6 border border-[#EDE8DF]">
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
                {/* Drive times */}
                <ul className="space-y-3">
                  {property.nearby.map((item) => (
                    <li key={item.name} className="flex items-center gap-4">
                      <span className="text-[13px] font-semibold text-[#7B5B3A] w-14 shrink-0">{item.time}</span>
                      <div className="flex-1 h-px bg-[#EDE8DF]" />
                      <span className="text-[14px] text-[#5A4A3A]">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* House rules */}
              {property.houseRules.length > 0 && (
                <div className="bg-white rounded-2xl p-7 mb-5 shadow-sm">
                  <h2 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#1C1410] mb-5">House Rules</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.houseRules.map((rule) => (
                      <li key={rule} className="flex items-start gap-2.5 text-[14px] text-[#5A4A3A]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4A882" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Reviews */}
              <div id="reviews" className="bg-white rounded-2xl p-7 shadow-sm">
                <h2 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#1C1410] mb-6">Guest Reviews</h2>
                <div className="elfsight-app-8819b378-e767-434a-9267-dd531ab69581" data-elfsight-app-lazy />
              </div>
            </div>

            {/* ── RIGHT: Booking widget ── */}
            <div className="hidden lg:block">
              <BookingWidget price={property.price} name={property.name} />
            </div>
          </div>

          {/* More in this area */}
          {related.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[#EDE8DF]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-[family-name:var(--font-playfair)] text-[32px] font-normal text-[#1C1410]">
                  More in {property.location.split(",")[0]}
                </h2>
                <Link href="/stays" className="text-[14px] text-[#7B5B3A] font-medium hover:underline">View all →</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link key={p.slug} href={`/property/${p.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                    <div className="relative h-[200px] overflow-hidden">
                      <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                      {p.badge && (
                        <span className="absolute top-3 left-3 bg-white text-[#1C1410] text-[11px] font-semibold tracking-[0.06em] uppercase px-3 py-1 rounded-full shadow-sm">{p.badge}</span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-[family-name:var(--font-playfair)] text-[20px] font-normal text-[#1C1410] mb-1">{p.name}</h3>
                      <p className="text-[14px] text-[#5A4A3A] mb-1">
                        Starting at <span className="font-semibold">${p.price}</span> / night
                      </p>
                      <p className="text-[13px] text-[#8A7968]">{p.guests} guests · {p.beds} beds · {p.baths} baths</p>
                    </div>
                  </Link>
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
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const BASE = "https://thecohostcompany.com/wp-content/uploads";

const IMG_HERO = `${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`;
const IMG_JT = `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`;
const IMG_ABOUT = `${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`;
const IMG_HIKE = `${BASE}/2025/05/Hiking-Rock-Climbing.webp.webp`;
const IMG_WEST = `${BASE}/2025/05/Historic-film-set-turned-charming-Old-West-town.webp`;
const IMG_FRAME = `${BASE}/2025/05/Frame-26.webp`;

const serviceCards = [
  {
    img: IMG_JT,
    badge: "CULINARY",
    badgeColor: "bg-[#C4A882] text-[#1C1410]",
    title: "Private Chef & Culinary Experiences",
    desc: "Our most popular service brings the best dining experience to you",
  },
  {
    img: IMG_ABOUT,
    badge: "WELLNESS",
    badgeColor: "bg-[#8FAE8B] text-white",
    title: "Massage & Wellness",
    desc: "Incredible spa services in the comfort of home",
  },
  {
    img: IMG_HIKE,
    badge: "PROVISIONING",
    badgeColor: "bg-[#7B9BB5] text-white",
    title: "Provisioning",
    desc: "Fridge stocking, floral arrangements, and party set-ups make arrival easy",
  },
  {
    img: IMG_WEST,
    badge: "ADVENTURE",
    badgeColor: "bg-[#B57B5A] text-white",
    title: "Adventure & Other Experiences",
    desc: "From photographers to sommeliers, we know the best in town",
  },
];

const benefits = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L17.5 10.5L26 11.5L20 17.5L21.5 26L14 22L6.5 26L8 17.5L2 11.5L10.5 10.5L14 3Z" stroke="#C4A882" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
    title: "Trusted Providers",
    body: "Our partners are carefully selected to ensure the highest quality services. No matter what experience you pick, you can trust it will be amazing!",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#C4A882" strokeWidth="1.8"/>
        <path d="M10 14h8M14 10v8" stroke="#C4A882" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: "Direct Access",
    body: "Browse and customize experiences created and updated directly by the experience hosts.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="7" width="20" height="15" rx="2" stroke="#C4A882" strokeWidth="1.8"/>
        <path d="M4 11h20" stroke="#C4A882" strokeWidth="1.8"/>
        <path d="M9 15.5h3M9 18.5h6" stroke="#C4A882" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: "Seamless Booking",
    body: "Epicurate is the only platform that provides instant booking and streamlined customization for your exclusive in-home experience.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10S19.523 4 14 4z" stroke="#C4A882" strokeWidth="1.8"/>
        <path d="M14 9v5l3 3" stroke="#C4A882" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Premium Service",
    body: "Our Concierge team is dedicated to ensuring their passion is reflected in every incredible experience.",
  },
];

const featuredExperiences = [
  {
    img: IMG_WEST,
    badge: "CHEF EXPERIENCE",
    title: "Hibachi Chef Experience",
    desc: "A private Hibachi experience like no other",
  },
  {
    img: IMG_JT,
    badge: "CHEF ALEX HORTON",
    title: "Chef's Table with Chef Alex",
    desc: "Chef Alex cooks for you and your guests in the comfort of your own space",
  },
  {
    img: IMG_ABOUT,
    badge: "BEST QUALITY",
    title: "Classic Comforts",
    desc: "Where American classics meet the sounds of home",
  },
];

const providers = [
  { img: IMG_FRAME, name: "Trev Fran", role: "CHEF DAGON" },
  { img: null, name: "Alex Austin", role: "CHEF SOMMELIER" },
  { img: null, name: "Ann-Marie Dunbar", role: "CHEF SOMMELIER" },
  { img: null, name: "Joe Allen", role: "LAST-MINUTE PIRATE" },
  { img: null, name: "Amber Evans", role: "CHEF SOMMELIER" },
];

const pressLogos = [
  { name: "MICHELIN", sub: "★ Guide" },
  { name: "AFAR", sub: null },
  { name: "Jetset", sub: null },
  { name: "CURATED", sub: null },
];

export default function GuidebookPage() {
  const [location, setLocation] = useState("");
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  return (
    <>
      <Nav />

      {/* ── 1. HERO ── */}
      <section className="relative flex items-end justify-center overflow-hidden" style={{ height: 500 }}>
        <div className="absolute inset-0">
          <Image
            src={IMG_HERO}
            alt="In-home luxury experience"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-[#1C1410]/60" />
        </div>
        <div className="relative z-10 text-center px-6 pb-14 w-full max-w-[680px] mx-auto">
          <p className="text-[#C4A882] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">
            In-Home Luxury Experiences
          </p>
          <h1
            className="font-[family-name:var(--font-playfair)] text-white font-bold mb-8 leading-[1.1]"
            style={{ fontSize: 56 }}
          >
            For The Ultimate Vacation
          </h1>
          {/* Search bar */}
          <div className="flex items-center bg-white rounded-full shadow-xl overflow-hidden max-w-[480px] mx-auto">
            <div className="flex items-center pl-5 pr-3 text-[#7B5B3A]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Select your location"
              className="flex-1 py-4 text-[14px] text-[#1C1410] placeholder-[#A89280] outline-none bg-transparent"
            />
            <button className="bg-[#1C1410] text-white text-[13px] font-medium px-6 py-4 hover:bg-[#2E1F0F] transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. IN-HOME EXPERIENCES GRID ── */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal leading-snug"
              style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}
            >
              In-Home Experiences for{" "}
              <span style={{ fontStyle: "italic" }}>Every Occasion</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCards.map((card) => (
              <div key={card.title} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-[220px]">
                  <Image src={card.img} alt={card.title} fill className="object-cover" unoptimized />
                </div>
                <div className="p-5">
                  <span className={`inline-block text-[10px] tracking-[0.15em] font-semibold px-2.5 py-1 rounded-full mb-3 ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-[#1C1410] text-[16px] font-semibold leading-snug mb-2">
                    {card.title}
                  </h3>
                  <p className="text-[#7B5B3A] text-[13px] leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WHY BOOK WITH US ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left text */}
            <div>
              <p className="text-[#C4A882] text-[11px] tracking-[0.2em] uppercase font-medium mb-4">
                Why Book With Us?
              </p>
              <h2
                className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal leading-snug mb-6"
                style={{ fontSize: "clamp(26px, 3vw, 38px)" }}
              >
                Passion, Pride and the Pursuit of Perfection
              </h2>
              <p className="text-[#7B5B3A] text-[15px] leading-[1.85]">
                Epicurate unites a community of skilled professionals driven by a passion for extraordinary hospitality, crafting personalized moments that inspire unforgettable journeys.
              </p>
            </div>
            {/* Right image grid */}
            <div className="grid grid-cols-2 gap-3">
              {[IMG_JT, IMG_ABOUT, IMG_HIKE, IMG_WEST].map((img, i) => (
                <div key={i} className="relative h-[140px] rounded-xl overflow-hidden">
                  <Image src={img} alt="" fill className="object-cover" unoptimized />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. WHAT MAKES US DIFFERENT ── */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left stacked images */}
            <div className="relative flex flex-col gap-3">
              <div className="relative h-[200px] rounded-xl overflow-hidden">
                <Image src={IMG_JT} alt="" fill className="object-cover" unoptimized />
              </div>
              <div className="relative h-[200px] rounded-xl overflow-hidden lg:-mt-8 lg:ml-8">
                <Image src={IMG_FRAME} alt="" fill className="object-cover" unoptimized />
              </div>
            </div>
            {/* Right text */}
            <div>
              <p className="text-[#C4A882] text-[11px] tracking-[0.2em] uppercase font-medium mb-4">
                What Makes Us Different?
              </p>
              <h2
                className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal leading-snug mb-6"
                style={{ fontSize: "clamp(26px, 3vw, 38px)" }}
              >
                We have partners, not vendors.
              </h2>
              <p className="text-[#7B5B3A] text-[15px] leading-[1.85]">
                Our curated partnerships and modern solutions set a new standard for exceptional, effortless experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. TESTIMONIALS ── */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-[760px] mx-auto px-6 text-center">
          <p className="text-[#C4A882] text-[11px] tracking-[0.2em] uppercase font-medium mb-6">
            What People Are Saying
          </p>
          <div className="text-[#C4A882] text-[22px] tracking-wide mb-8">★★★★★</div>
          <blockquote
            className="font-[family-name:var(--font-playfair)] text-[#1C1410] leading-[1.75] mb-8"
            style={{ fontSize: "clamp(18px, 2.2vw, 24px)", fontStyle: "italic" }}
          >
            &ldquo;I want to thank you for a truly amazing evening last night. Chef Ivan and Chef Max were so relaxed and engaging and of course the food was phenomenal. I will dream about that soup and the risotto for weeks!&rdquo;
          </blockquote>
          <p className="text-[#7B5B3A] text-[12px] tracking-[0.15em] uppercase font-medium mb-8">
            — Joanie A, Palo Alto CA
          </p>
          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setTestimonialIdx(i)}
                className={`rounded-full transition-all ${testimonialIdx === i ? "w-6 h-2 bg-[#C4A882]" : "w-2 h-2 bg-[#D4C5B0] hover:bg-[#C4A882]"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. BENEFITS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1120px] mx-auto px-6">
          <h2
            className="font-[family-name:var(--font-playfair)] text-[#1C1410] text-center font-normal mb-14"
            style={{ fontSize: "clamp(26px, 3vw, 38px)" }}
          >
            Transform Your Home Into A Private Resort
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {benefits.map((b) => (
              <div key={b.title} className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F7F4EF] flex items-center justify-center shrink-0">
                  {b.icon}
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-[#1C1410] text-[17px] font-semibold mb-2">
                    {b.title}
                  </h3>
                  <p className="text-[#7B5B3A] text-[13.5px] leading-[1.8]">{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. LOCATION FEATURE ── */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-[1120px] mx-auto px-6">
          <h2
            className="font-[family-name:var(--font-playfair)] text-[#1C1410] text-center font-normal mb-10"
            style={{ fontSize: "clamp(24px, 2.8vw, 36px)" }}
          >
            Bring The Best Experiences To You
          </h2>
          <div className="flex justify-center">
            <div className="relative w-full max-w-[300px] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
              <div className="relative h-[200px]">
                <Image src={IMG_FRAME} alt="Joshua Tree" fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410]/80 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <span className="font-[family-name:var(--font-playfair)] text-white text-[20px] font-semibold">
                  Joshua Tree
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 7h8M7 3l4 4-4 4"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FEATURED EXPERIENCES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <h2
              className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal"
              style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
            >
              Browse featured experiences in Joshua Tree
            </h2>
            <span className="text-[#C4A882] text-[18px]">▾</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredExperiences.map((exp) => (
              <div key={exp.title} className="bg-[#F7F4EF] rounded-2xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                <div className="relative h-[220px]">
                  <Image src={exp.img} alt={exp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                </div>
                <div className="p-5">
                  <span className="inline-block text-[10px] tracking-[0.15em] font-semibold bg-[#C4A882]/20 text-[#7B5B3A] px-2.5 py-1 rounded-full mb-3 uppercase">
                    {exp.badge}
                  </span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-[#1C1410] text-[17px] font-semibold leading-snug mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-[#7B5B3A] text-[13px] leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. PROVIDERS ── */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-[1120px] mx-auto px-6">
          <p className="text-[#C4A882] text-[11px] tracking-[0.2em] uppercase font-medium text-center mb-10">
            We are proud to collaborate with these amazing providers!
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {providers.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-3 w-[130px]">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-[#E8E0D5] border-2 border-white shadow-md">
                  {p.img ? (
                    <Image src={p.img} alt={p.name} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#D4C5B0]">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="12" r="6" fill="#A89280"/>
                        <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="#A89280"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-[#1C1410] text-[14px] font-semibold">{p.name}</p>
                  <p className="text-[#C4A882] text-[10px] tracking-[0.12em] uppercase font-medium mt-0.5">{p.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. PRESS LOGOS ── */}
      <section className="py-16 bg-white border-t border-[#EDE8DF]">
        <div className="max-w-[1120px] mx-auto px-6 text-center">
          <p className="text-[#A89280] text-[11px] tracking-[0.2em] uppercase font-medium mb-10">
            With Chefs Featured In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {pressLogos.map((logo) => (
              <div key={logo.name} className="flex flex-col items-center opacity-50 grayscale hover:opacity-70 transition-opacity">
                <span
                  className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-bold tracking-[0.06em]"
                  style={{ fontSize: logo.name === "Jetset" ? 22 : logo.name === "AFAR" ? 26 : 20 }}
                >
                  {logo.name}
                </span>
                {logo.sub && (
                  <span className="text-[#1C1410] text-[10px] tracking-[0.1em] font-medium mt-0.5">{logo.sub}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. BOOK LOCATIONS FOOTER CTA ── */}
      <section className="py-16 bg-[#1C1410] text-center">
        <div className="max-w-[600px] mx-auto px-6">
          <p className="text-[#C4A882] text-[11px] tracking-[0.25em] uppercase font-medium mb-4">
            Book In-Home Experiences In
          </p>
          <Link
            href="#"
            className="font-[family-name:var(--font-playfair)] text-white underline underline-offset-4 decoration-[#C4A882] hover:text-[#C4A882] transition-colors"
            style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
          >
            Joshua Tree
          </Link>
          {/* Social icons */}
          <div className="flex items-center justify-center gap-5 mt-8 mb-8">
            <a href="#" className="text-white/50 hover:text-[#C4A882] transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" className="text-white/50 hover:text-[#C4A882] transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
          <p className="text-white/30 text-[12px]">
            © {new Date().getFullYear()} The Cohost Company. All rights reserved.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

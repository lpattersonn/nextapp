"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const BASE = "https://thecohostcompany.com/wp-content/uploads";

const services = [
  {
    img: `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`,
    badge: "CULINARY",
    badgeColor: "bg-[#C4A882] text-[#1C1410]",
    title: "Private Chef & Culinary Experiences",
    desc: "Our most popular service brings the best dining experience to you",
  },
  {
    img: `${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`,
    badge: "WELLNESS",
    badgeColor: "bg-[#D4C5B0] text-[#3A2F25]",
    title: "Massage & Wellness",
    desc: "Incredible spa services in the comfort of home",
  },
  {
    img: `${BASE}/2025/05/Hiking-Rock-Climbing.webp.webp`,
    badge: "PROVISIONING",
    badgeColor: "bg-[#E8DDD0] text-[#3A2F25]",
    title: "Provisioning",
    desc: "Fridge stocking, floral arrangements, and party set-ups make arrival easy",
  },
  {
    img: `${BASE}/2025/05/Historic-film-set-turned-charming-Old-West-town.webp`,
    badge: "ADVENTURE",
    badgeColor: "bg-[#F0E8DC] text-[#5A4A3A]",
    title: "Adventure & Other Experiences",
    desc: "From photographers to sommeliers, we know the best in town",
  },
];

const benefits = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Trusted Providers",
    desc: "Our partners are carefully selected to ensure the highest quality services. No matter what experience you pick, you can trust it will be amazing!",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Direct Access",
    desc: "Browse and customize experiences created and updated directly by the experience hosts.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Seamless Booking",
    desc: "The only platform that provides instant booking and streamlined customization for your exclusive in-home experience.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Premium Service",
    desc: "Our Concierge team is dedicated to ensuring their passion is reflected in every incredible experience.",
  },
];

const experiences = [
  {
    img: `${BASE}/2025/05/Historic-film-set-turned-charming-Old-West-town.webp`,
    badge: "CHEF EXPERIENCE",
    provider: "CHEF DAGON DREAD",
    title: "Hibachi Chef Experience",
    desc: "A private Hibachi experience like no other",
  },
  {
    img: `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`,
    badge: "CHEF'S TABLE",
    provider: "CHEF ALEX HORTON",
    title: "Chef's Table with Chef Alex",
    desc: "Chef Alex cooks for you and your guests in the comfort of your own space",
  },
  {
    img: `${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`,
    badge: "BEST QUALITY",
    provider: "BEST CHOICE",
    title: "Classic Comforts",
    desc: "Where American classics meet the sounds of home",
  },
];

const providers = [
  { img: `${BASE}/2025/05/Frame-26.webp`, name: "Trev Fran", role: "CHEF DAGON" },
  { img: null, name: "Alex Austin", role: "CHEF SOMMELIER" },
  { img: null, name: "Ann-Marie Dunbar", role: "CHEF SOMMELIER" },
  { img: null, name: "Joe Allen", role: "LAST-MINUTE PIRATE", dark: true },
  { img: null, name: "Amber Evans", role: "CHEF SOMMELIER" },
];

const pressLogos = [
  { name: "MICHELIN", sub: "Guide", star: true },
  { name: "AFAR", serif: true },
  { name: "Jetset", script: true },
  { name: "CURATED", small: true },
];

export default function ConciergePage() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`}
            alt="In-home luxury experiences"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-[#0D0603]/72" />
        </div>
        <div className="relative z-10 w-full max-w-[720px] mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#C4A882] font-semibold mb-5">
            In-Home Luxury Experiences
          </p>
          <h1
            className="font-[family-name:var(--font-playfair)] text-white font-normal leading-[1.05] mb-8"
            style={{ fontSize: "clamp(36px, 5.5vw, 58px)" }}
          >
            For the Ultimate Vacation
          </h1>
          {/* Search bar */}
          <div
            className="flex items-stretch rounded-full overflow-hidden max-w-[540px] mx-auto"
            style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 6px 40px rgba(0,0,0,0.32)" }}
          >
            <label className="flex items-center gap-2.5 px-5 py-3.5 flex-1 cursor-text min-w-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="2" strokeLinecap="round" className="shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              <input
                type="text"
                placeholder="Select your location"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full text-[14px] text-[#1C1410] placeholder-[#A89880] outline-none bg-transparent"
              />
            </label>
            <button className="px-6 py-3.5 bg-[#1C1410] text-white text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-[#2D1B0E] transition-colors shrink-0 cursor-pointer">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal" style={{ fontSize: "clamp(26px, 3.5vw, 38px)" }}>
              In-Home Experiences for{" "}
              <span style={{ fontStyle: "italic" }}>Every Occasion</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <div key={s.title} className="group rounded-xl overflow-hidden border border-[#EDE8DF] hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="relative h-[200px] overflow-hidden bg-[#EDE8DF]">
                  <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                  <div className="absolute top-3 left-3">
                    <span className={`text-[9px] font-bold tracking-[0.18em] px-2.5 py-1 rounded-full ${s.badgeColor}`}>
                      {s.badge}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-[family-name:var(--font-playfair)] text-[16px] font-normal text-[#1C1410] leading-snug mb-2">
                    {s.title}
                  </h3>
                  <p className="text-[13px] text-[#8A7968] leading-[1.75]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY BOOK WITH US ── */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[10px] tracking-[0.28em] uppercase text-[#C4A882] font-semibold mb-4">Why Book With Us?</p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal leading-[1.15] mb-6"
                style={{ fontSize: "clamp(26px, 3vw, 36px)" }}>
                Passion, Pride and the Pursuit of Perfection
              </h2>
              <p className="text-[15px] text-[#5A4A3A] leading-[1.85]">
                Epicurate unites a community of skilled professionals driven by a passion for extraordinary hospitality, crafting personalized moments that inspire unforgettable journeys.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {services.map((s, i) => (
                <div key={i} className="relative h-[140px] rounded-xl overflow-hidden bg-[#EDE8DF]">
                  <Image src={s.img} alt={s.title} fill className="object-cover" unoptimized />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES US DIFFERENT ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-3">
              <div className="relative h-[200px] rounded-xl overflow-hidden bg-[#EDE8DF]">
                <Image src={`${BASE}/2025/05/Hiking-Rock-Climbing.webp.webp`} alt="" fill className="object-cover" unoptimized />
              </div>
              <div className="relative h-[200px] rounded-xl overflow-hidden bg-[#EDE8DF]">
                <Image src={`${BASE}/2025/05/Joshua-Tree-National-Park-.webp`} alt="" fill className="object-cover" unoptimized />
              </div>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.28em] uppercase text-[#C4A882] font-semibold mb-4">What Makes Us Different?</p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal leading-[1.15] mb-6"
                style={{ fontSize: "clamp(26px, 3vw, 36px)" }}>
                We have partners, not vendors.
              </h2>
              <p className="text-[15px] text-[#5A4A3A] leading-[1.85]">
                Our curated partnerships and modern solutions set a new standard for exceptional, effortless experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-[680px] mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#C4A882] font-semibold mb-6">What People Are Saying</p>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#C4A882">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <blockquote className="font-[family-name:var(--font-playfair)] text-[20px] font-normal text-[#1C1410] leading-[1.7] italic mb-6">
            &ldquo;I want to thank you for a truly amazing evening last night. Chef Ivan and Chef Max were so relaxed and engaging and of course the food was phenomenal. I will dream about that soup and the risotto for weeks!&rdquo;
          </blockquote>
          <p className="text-[13px] text-[#8A7968] tracking-wide font-medium">— Joanie A, Palo Alto CA</p>
          <div className="flex justify-center gap-2 mt-7">
            <div className="w-6 h-1.5 rounded-full bg-[#C4A882]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#D8CFBF]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#D8CFBF]" />
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1120px] mx-auto px-6">
          <h2 className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal text-center mb-14"
            style={{ fontSize: "clamp(24px, 3vw, 34px)" }}>
            Transform Your Home Into a Private Resort
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#F7F4EF] flex items-center justify-center mx-auto mb-4">
                  {b.icon}
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-[17px] font-normal text-[#1C1410] mb-3">{b.title}</h3>
                <p className="text-[13px] text-[#8A7968] leading-[1.8]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION FEATURE ── */}
      <section className="py-16 bg-[#F7F4EF]">
        <div className="max-w-[1120px] mx-auto px-6">
          <h2 className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal text-center mb-10"
            style={{ fontSize: "clamp(24px, 3vw, 34px)" }}>
            Bring The Best Experiences To You
          </h2>
          <div className="flex justify-center">
            <Link href="#featured" className="group relative w-[260px] h-[180px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow block">
              <Image src={`${BASE}/2025/05/Frame-26.webp`} alt="Joshua Tree" fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <span className="font-[family-name:var(--font-playfair)] text-white text-[18px] font-normal">Joshua Tree</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED EXPERIENCES ── */}
      <section id="featured" className="py-20 bg-white">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="flex items-center gap-2 mb-10">
            <h2 className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal"
              style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}>
              Browse featured experiences in Joshua Tree
            </h2>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((e) => (
              <div key={e.title} className="group rounded-xl overflow-hidden border border-[#EDE8DF] hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="relative h-[220px] overflow-hidden bg-[#EDE8DF]">
                  <Image src={e.img} alt={e.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[9px] font-bold tracking-[0.18em] text-white/70">{e.provider}</span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-[9px] font-bold tracking-[0.18em] text-[#C4A882] uppercase">{e.badge}</span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-[17px] font-normal text-[#1C1410] mt-1 mb-2">{e.title}</h3>
                  <p className="text-[13px] text-[#8A7968] leading-[1.75]">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROVIDERS ── */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-[1120px] mx-auto px-6">
          <h2 className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal text-center mb-12"
            style={{ fontSize: "clamp(18px, 2.5vw, 26px)" }}>
            We are proud to collaborate with these amazing providers!
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {providers.map((p) => (
              <div key={p.name} className="text-center w-[140px]">
                <div className={`relative w-24 h-24 rounded-xl overflow-hidden mx-auto mb-3 ${p.dark ? "bg-[#1C1410]" : "bg-[#E8E0D8]"}`}>
                  {p.img ? (
                    <Image src={p.img} alt={p.name} fill className="object-cover" unoptimized />
                  ) : p.dark ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round">
                        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9A8070" strokeWidth="1.2" strokeLinecap="round">
                        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="font-[family-name:var(--font-playfair)] text-[15px] font-normal text-[#1C1410] mb-1">{p.name}</p>
                <p className="text-[9px] font-bold tracking-[0.16em] text-[#8A7968]">{p.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRESS LOGOS ── */}
      <section className="py-14 bg-white border-t border-[#EDE8DF]">
        <div className="max-w-[1120px] mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#A89880] font-semibold mb-8">With Chefs Featured In</p>
          <div className="flex items-center justify-center gap-10 flex-wrap">
            <div className="opacity-50 hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#1C1410">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-[13px] font-bold tracking-[0.08em] text-[#1C1410]">MICHELIN</span>
                <span className="text-[11px] text-[#1C1410]">Guide</span>
              </div>
            </div>
            <div className="opacity-50 hover:opacity-80 transition-opacity">
              <span className="font-[family-name:var(--font-playfair)] text-[22px] font-normal tracking-[0.12em] text-[#1C1410]">AFAR</span>
            </div>
            <div className="opacity-50 hover:opacity-80 transition-opacity">
              <span className="text-[20px] font-light italic tracking-wide text-[#1C1410]">Jetset</span>
            </div>
            <div className="opacity-50 hover:opacity-80 transition-opacity">
              <span className="text-[13px] font-bold tracking-[0.22em] text-[#1C1410]">CURATED</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOK LOCATIONS CTA ── */}
      <section className="py-16 bg-[#1C1410] text-center">
        <div className="max-w-[1120px] mx-auto px-6">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-semibold mb-4">Book In-Home Experiences In</p>
          <Link
            href="#"
            className="font-[family-name:var(--font-playfair)] text-white font-normal underline underline-offset-4 decoration-[#C4A882] hover:text-[#C4A882] transition-colors"
            style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
          >
            Joshua Tree
          </Link>
          <div className="flex justify-center gap-5 mt-8">
            <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
          <p className="text-white/25 text-[11px] mt-6">© 2025 The Cohost Company. All rights reserved.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}

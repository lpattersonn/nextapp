"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { properties } from "@/data/properties";

// ─── Types ────────────────────────────────────────────────────────────────────
type DropdownEntry = { label: string; href: string };

// ─── Stays mega-menu data ─────────────────────────────────────────────────────
const megaLocations = [
  { label: "Featured Listings", filter: null },
  { label: "Joshua Tree", filter: "Joshua Tree" },
  { label: "Pioneertown", filter: "Pioneertown" },
  { label: "Yucca Valley", filter: "Yucca Valley" },
  { label: "Twentynine Palms", filter: "Twentynine Palms" },
  { label: "Palm Springs", filter: "Palm Springs" },
  { label: "View All Listings", filter: "all" },
];

// 3 hand-picked featured properties shown by default
const featuredSlugs = ["the-outlaw", "whistling-rock", "heavens-door"];

function getDisplayProperties(filter: string | null) {
  if (!filter) {
    const featured = featuredSlugs
      .map((s) => properties.find((p) => p.slug === s))
      .filter(Boolean) as typeof properties;
    // fall back to first 3 if slugs don't match
    return featured.length ? featured.slice(0, 3) : properties.slice(0, 3);
  }
  if (filter === "all") return properties.slice(0, 3);
  return properties
    .filter((p) => p.location.toLowerCase().includes(filter.toLowerCase()))
    .slice(0, 3);
}

// ─── Stays Mega Menu ──────────────────────────────────────────────────────────
function StaysMegaMenu() {
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const displayProps = getDisplayProperties(activeFilter);
  const activeLocation = megaLocations.find((l) => l.filter === activeFilter) ?? megaLocations[0];

  return (
    <div onMouseEnter={show} onMouseLeave={hide} className="relative">
      {/* Trigger */}
      <button className="flex items-center gap-1 text-white text-[16px] font-medium tracking-wide hover:opacity-80 transition-opacity cursor-pointer">
        Stays
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="currentColor"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>

      {/* Mega menu panel */}
      {open && (
        <div
          className="fixed left-0 right-0 top-[80px] z-40"
          style={{
            background: "rgba(18,10,4,0.97)",
            backdropFilter: "blur(40px) saturate(160%)",
            WebkitBackdropFilter: "blur(40px) saturate(160%)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
          }}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <div className="max-w-[1120px] mx-auto px-8 pt-8 pb-6">
            <div className="flex gap-8">

              {/* ── Left: location pills ── */}
              <div className="flex flex-col gap-2 shrink-0 w-[200px]">
                {megaLocations.map((loc) => {
                  const isActive = loc.filter === activeFilter;
                  const isViewAll = loc.filter === "all";
                  return (
                    <Link
                      key={loc.label}
                      href={isViewAll ? "/stays" : `/stays${loc.filter ? `#${loc.filter.toLowerCase().replace(/\s+/g, "-")}` : ""}`}
                      onMouseEnter={() => setActiveFilter(loc.filter ?? null)}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-full text-[14px] font-medium transition-all duration-150 cursor-pointer ${
                        isActive
                          ? "bg-[#8D5F52] text-white"
                          : "bg-white/10 text-white/80 hover:bg-white/18 hover:text-white"
                      }`}
                    >
                      <span>{loc.label}</span>
                      {(isActive || isViewAll) && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* ── Right: property cards ── */}
              <div className="flex-1 grid grid-cols-3 gap-4">
                {displayProps.length > 0 ? (
                  displayProps.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/property/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="group relative rounded-xl overflow-hidden bg-[#2D1B0E] hover:ring-2 hover:ring-[#8D5F52] transition-all min-h-[190px]"
                    >
                      {/* Image fills full card */}
                      <div className="absolute inset-0 overflow-hidden">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </div>
                      {/* Text overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-[family-name:var(--font-playfair)] text-[17px] leading-tight mb-1">
                          {p.name}
                        </p>
                        <p className="text-white/65 text-[12px]">
                          {p.guests} guests · {p.beds} bedrooms
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-3 flex items-center justify-center h-[190px] text-white/40 text-[14px]">
                    Coming soon to {activeLocation.label}
                  </div>
                )}
              </div>
            </div>

            {/* ── Bottom CTA bar ── */}
            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
              <Link
                href="/stays"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8D5F52] text-white text-[13px] font-semibold tracking-wide hover:bg-[#7B4F43] transition-colors"
              >
                Claim 10% OFF
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </Link>
              <Link
                href="/services"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/12 text-white text-[13px] font-semibold tracking-wide hover:bg-white/20 transition-colors border border-white/15"
              >
                Join The Cohost
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Standard dropdown (Things To Do, For Hosts, About) ───────────────────────
const otherNavItems = [
  {
    label: "Things To Do",
    href: "/guidebook",
    dropdown: [
      { label: "Guidebook", href: "/guidebook" },
      { label: "Virtual Concierge", href: "/concierge" },
      { label: "Local Favorites", href: "/local-favorites" },
    ],
  },
  {
    label: "For Hosts",
    href: "/services",
    dropdown: [
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    label: "About",
    href: "/about",
    dropdown: [
      { label: "Press", href: "/press" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

function DropdownItem({ item }: { item: { label: string; href: string; dropdown: DropdownEntry[] } }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-white text-[16px] font-medium tracking-wide hover:opacity-80 transition-opacity cursor-pointer"
      >
        {item.label}
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="currentColor"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-44 bg-white shadow-xl rounded-sm py-2 z-50">
          {item.dropdown.map((d) => (
            <Link
              key={d.label}
              href={d.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-[16px] text-[#3A2F25] hover:bg-[#F7F4EF] hover:text-[#7B5B3A] transition-colors"
            >
              {d.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(0,0,0,0.6)" : "rgba(20,12,6,0.85)",
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.18)" : "none",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.18)" : "none",
      }}
    >
      <div className="max-w-[1120px] mx-auto px-8 h-[80px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center no-underline shrink-0">
          <Image
            src="https://thecohostcompany.com/wp-content/uploads/2025/05/Logos.svg"
            alt="The Cohost Company"
            width={220}
            height={64}
            className="object-contain"
            unoptimized
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          <StaysMegaMenu />
          {otherNavItems.map((item) => (
            <DropdownItem key={item.label} item={item} />
          ))}
        </div>

        {/* Book Now */}
        <div className="hidden md:block shrink-0">
          <Link
            href="/stays"
            className="px-6 py-2.5 rounded-full bg-[#8D5F52] text-white text-[16px] font-semibold tracking-wide hover:bg-[#7B4F43] transition-colors"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-white transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#2D1B0E] border-t border-white/10 px-8 py-6 flex flex-col gap-4">
          <Link href="/stays" className="text-[16px] text-white font-medium" onClick={() => setMenuOpen(false)}>Stays</Link>
          {otherNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[16px] text-white font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/stays"
            className="mt-2 px-6 py-3 rounded-full bg-[#8D5F52] text-white text-[16px] font-semibold text-center"
            onClick={() => setMenuOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
}

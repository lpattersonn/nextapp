"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  {
    label: "Stays",
    href: "#stays",
    dropdown: ["Pioneertown", "Joshua Tree", "Yucca Valley", "Twentynine Palms"],
  },
  {
    label: "Things To Do",
    href: "#location",
    dropdown: ["Guidebook", "Virtual Concierge", "Local Favorites"],
  },
  {
    label: "For Hosts",
    href: "#services",
    dropdown: ["Services", "Contact"],
  },
  {
    label: "About",
    href: "#about",
    dropdown: ["Press", "About Us", "Contact"],
  },
];

function DropdownItem({ item }: { item: (typeof navItems)[0] }) {
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
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="currentColor"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-44 bg-white shadow-xl rounded-sm py-2 z-50">
          {item.dropdown.map((d) => (
            <Link
              key={d}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-[16px] text-[#3A2F25] hover:bg-[#F7F4EF] hover:text-[#7B5B3A] transition-colors"
            >
              {d}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

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
        background: scrolled
          ? "rgba(0,0,0,0.6)"
          : "rgba(20,12,6,0.85)",
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.18)" : "none",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.18)" : "none",
      }}
    >
      <div className="max-w-[1360px] mx-auto px-8 h-[80px] flex items-center justify-between">
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
          {navItems.map((item) => (
            <DropdownItem key={item.label} item={item} />
          ))}
        </div>

        {/* Book Now */}
        <div className="hidden md:block shrink-0">
          <Link
            href="#stays"
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
          {navItems.map((item) => (
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
            href="#stays"
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

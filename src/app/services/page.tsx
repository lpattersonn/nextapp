import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const BASE = "https://thecohostcompany.com/wp-content/uploads";
const G = "https://assets.guesty.com/image/upload/w_1200,q_auto,f_auto";

const heroImages = [
  `${G}/v1763770623/production/68df18d0ea1895d9005ea6ad/rgojuyifdkefev9xs5ge.jpg`,
  `${G}/v1765152133/production/68df18d0ea1895d9005ea6ad/gkpt8qq78dfxkqu76hnm.jpg`,
  `${BASE}/2025/05/YV-Whistling-Rock-01.webp`,
  `${G}/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg`,
  `${G}/v1763153882/production/68df18d0ea1895d9005ea6ad/xc9rn7nrrvuajaomqa4c.jpg`,
  `${G}/v1768337449/production/68df18d0ea1895d9005ea6ad/nisb8jvpdap0tqocdzwu.jpg`,
  `${BASE}/2025/05/Hiking-Rock-Climbing.webp.webp`,
  `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`,
];

const overviewServices = [
  {
    title: "Marketing Services",
    items: ["Planning & Brand Identity", "Logo Design & Visual Branding", "Professional Photography", "Listing & Marketing Optimization", "Custom Website Creation", "Revenue & Performance Analytics"],
  },
  {
    title: "Hosting Services",
    items: ["Listing Optimization", "Dynamic Personalized Rate Setting", "Marketing Credits", "Detailed House Manual", "Guest Communication", "24/7 Emergency Support"],
  },
  {
    title: "Property Management",
    items: ["Cleaning Coordination", "Supply Management Services", "On-Site Property Oversight", "Vendor Management", "Repair & Maintenance Coordination", "Property Condition Reports"],
  },
];

const values = ["Integrity", "Growth", "Trust", "Support", "Peace of Mind", "Expertise", "Stability", "Care"];

const marketingFeatures = [
  {
    title: "Planning & Brand Identity",
    desc: "We craft a unique brand identity for your property that sets it apart in the market and drives guest loyalty.",
  },
  {
    title: "Logo Design & Visual Branding",
    desc: "From custom logos to full visual identities, we make your property instantly recognizable.",
  },
  {
    title: "Professional Photography",
    desc: "Stunning photography that highlights your property's best features and drives more bookings.",
  },
  {
    title: "Listing & Marketing Optimization",
    desc: "We optimize your listings across all platforms for maximum visibility and conversion.",
  },
  {
    title: "Custom Website Creation",
    desc: "A beautiful, fast, SEO-optimized website built specifically for your vacation rental.",
  },
  {
    title: "Revenue & Performance Analytics",
    desc: "Data-driven insights and monthly reporting so you always know how your property is performing.",
  },
];

const bookingFeatures = [
  {
    title: "Listing Optimization",
    desc: "Maximize visibility and bookings with expertly crafted listings across all major platforms.",
  },
  {
    title: "Dynamic Personalized Rate Setting",
    desc: "Smart pricing strategy that adjusts to demand, seasonality, and local events to maximize revenue.",
  },
  {
    title: "Marketing Credits",
    desc: "We invest in targeted ad credits to amplify your property's reach beyond organic search.",
  },
  {
    title: "Detailed House Manual",
    desc: "Custom house manuals tailored to your property to create a seamless guest experience.",
  },
  {
    title: "Guest Communication",
    desc: "Professional, timely communication with guests from inquiry through post-checkout review.",
  },
  {
    title: "Multi-Listing Setup",
    desc: "Seamless management of multiple listings across Airbnb, VRBO, Booking.com, and more.",
  },
  {
    title: "24/7 Emergency Support",
    desc: "Round-the-clock support for guests and property emergencies — we handle it so you don't have to.",
  },
];

const propertyFeatures = [
  {
    title: "Cleaning Coordination",
    desc: "Professionally managed cleaning schedules between every stay — spotless, every time.",
  },
  {
    title: "Supply Management Services",
    desc: "We keep your property stocked with essentials so guests always arrive to a ready home.",
  },
  {
    title: "On-Site Property Oversight",
    desc: "Regular property walk-throughs and condition reports to catch issues before they become problems.",
  },
  {
    title: "Repair & Maintenance Coordination",
    desc: "We manage trusted local vendors for all repairs and maintenance — fast, reliable, fairly priced.",
  },
];

const portfolioProperties = [
  { name: "Cosmic Cowboy", img: `${G}/v1763770623/production/68df18d0ea1895d9005ea6ad/rgojuyifdkefev9xs5ge.jpg` },
  { name: "Desert Lumina", img: `${G}/v1765152133/production/68df18d0ea1895d9005ea6ad/gkpt8qq78dfxkqu76hnm.jpg` },
  { name: "Whistling Rock", img: `${BASE}/2025/05/YV-Whistling-Rock-01.webp` },
  { name: "The Outlaw", img: `${G}/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg` },
  { name: "Heaven's Door", img: `${G}/v1763153882/production/68df18d0ea1895d9005ea6ad/xc9rn7nrrvuajaomqa4c.jpg` },
  { name: "Boulders Gate", img: `${G}/v1768337449/production/68df18d0ea1895d9005ea6ad/nisb8jvpdap0tqocdzwu.jpg` },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="bg-[#FAF8F5] pt-[100px] pb-0 text-center overflow-hidden">
        <p className="text-[11px] tracking-[0.22em] uppercase text-[#7B5B3A] font-semibold mb-3">For Hosts</p>
        <h1
          className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal mb-4"
          style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
        >
          Services
        </h1>
        <p className="text-[#8A7968] text-[15px] leading-[1.85] max-w-[480px] mx-auto mb-12 px-6">
          We operate your Airbnb like an independent business — generating passive income while you remain hands-off.
        </p>

        {/* Triangular image strip */}
        <div className="relative flex justify-center gap-0 overflow-hidden" style={{ height: 180 }}>
          {heroImages.map((img, i) => (
            <div
              key={i}
              className="relative shrink-0"
              style={{
                width: 160,
                height: 180,
                clipPath: i % 2 === 0
                  ? "polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%)"
                  : "polygon(0% 0%, 100% 0%, 88% 100%, 12% 100%)",
                marginLeft: i === 0 ? 0 : -16,
              }}
            >
              <Image src={img} alt="" fill className="object-cover" unoptimized />
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Left: heading + property badge visual */}
            <div>
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#8A7968] font-semibold mb-3">The Cohost Company</p>
              <h2
                className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal leading-[1.1] mb-6"
                style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
              >
                Services Overview
              </h2>
              <p className="text-[15px] text-[#5A4A3A] leading-[1.85] mb-8">
                We set the bar on how to let a short-term rental while we maximize your property&apos;s potential.
              </p>
              {/* Property badge cluster */}
              <div className="flex items-center gap-4 flex-wrap">
                {portfolioProperties.slice(0, 4).map((p) => (
                  <div key={p.name} className="flex flex-col items-center gap-2">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-[#EDE8DF]">
                      <Image src={p.img} alt={p.name} fill className="object-cover" unoptimized />
                    </div>
                    <span className="text-[10px] font-semibold tracking-[0.08em] text-[#7B5B3A] text-center leading-tight max-w-[64px]">
                      {p.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: service overview cards */}
            <div className="space-y-4">
              {overviewServices.map((svc) => (
                <div key={svc.title} className="bg-white rounded-xl border border-[#EDE8DF] p-5 shadow-sm">
                  <h3 className="font-semibold text-[#1C1410] text-[15px] mb-3">{svc.title}</h3>
                  <ul className="grid grid-cols-2 gap-y-1.5 gap-x-4 mb-4">
                    {svc.items.map((item) => (
                      <li key={item} className="flex items-center gap-1.5 text-[12.5px] text-[#5A4A3A]">
                        <FontAwesomeIcon icon={faCircleCheck} className="w-[11px] h-[11px] text-[#C4A882] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-block px-5 py-2 bg-[#1C1410] text-white text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#3A2810] transition-colors rounded-sm"
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES STRIP ── */}
      <div className="bg-white border-y border-[#EDE8DF] py-5 overflow-x-auto">
        <div className="flex items-center justify-center gap-0 min-w-max mx-auto px-6">
          {values.map((v, i) => (
            <div key={v} className="flex items-center">
              <span className="text-[11px] tracking-[0.22em] uppercase text-[#8A7968] font-semibold whitespace-nowrap px-5">
                {v}
              </span>
              {i < values.length - 1 && (
                <span className="text-[#D0C8BD] text-[18px] leading-none">·</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── MARKETING SERVICES ── */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#7B5B3A] font-semibold mb-3">For Hosts</p>
            <h2
              className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal mb-3"
              style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}
            >
              Marketing Services
            </h2>
            <p className="text-[#8A7968] text-[15px] max-w-[480px] mx-auto">
              Your property deserves to stand out. We build the brand, capture the beauty, and drive the bookings.
            </p>
          </div>

          {/* Two-column: bullets + image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10 items-start">
            <div className="space-y-5">
              {marketingFeatures.slice(0, 3).map((f) => (
                <div key={f.title} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EDE8DF] flex items-center justify-center shrink-0 mt-0.5">
                    <FontAwesomeIcon icon={faCircleCheck} className="w-[10px] h-[10px] text-[#7B5B3A]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1C1410] text-[14px] mb-0.5">{f.title}</p>
                    <p className="text-[13px] text-[#8A7968] leading-[1.7]">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative h-[320px] rounded-2xl overflow-hidden bg-[#EDE8DF]">
              <Image
                src={`${BASE}/2025/05/Hiking-Rock-Climbing.webp.webp`}
                alt="Marketing Services"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Bottom 3 features — full width grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {marketingFeatures.slice(3).map((f) => (
              <div key={f.title} className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-[#EDE8DF] flex items-center justify-center shrink-0 mt-0.5">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-[10px] h-[10px] text-[#7B5B3A]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1C1410] text-[14px] mb-0.5">{f.title}</p>
                  <p className="text-[13px] text-[#8A7968] leading-[1.7]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <Image src={`${BASE}/2025/05/Hosting-1.webp`} alt="" fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-[#1C0A04]/80" />
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5 px-10 py-8">
              <h3 className="font-[family-name:var(--font-playfair)] text-white text-[24px] font-normal">
                Request Marketing Service
              </h3>
              <Link
                href="/contact"
                className="shrink-0 px-7 py-3 border border-white/50 text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-white hover:text-[#1C1410] transition-colors rounded-sm"
              >
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING MANAGEMENT ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#7B5B3A] font-semibold mb-3">For Hosts</p>
            <h2
              className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal mb-3"
              style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}
            >
              Booking Management
            </h2>
            <p className="text-[#8A7968] text-[15px] max-w-[480px] mx-auto">
              Full-service guest management so you can stay completely hands-off.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {bookingFeatures.map((f) => (
              <div key={f.title} className="bg-[#FAF8F5] rounded-xl border border-[#EDE8DF] p-5">
                <p className="font-semibold text-[#1C1410] text-[14px] mb-2">{f.title}</p>
                <p className="text-[13px] text-[#8A7968] leading-[1.7]">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <Image src={`${BASE}/2025/11/Featured-Image-The-Cohost.webp`} alt="" fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-[#1C0A04]/80" />
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5 px-10 py-8">
              <h3 className="font-[family-name:var(--font-playfair)] text-white text-[24px] font-normal">
                Request Booking Management Service
              </h3>
              <Link
                href="/contact"
                className="shrink-0 px-7 py-3 border border-white/50 text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-white hover:text-[#1C1410] transition-colors rounded-sm"
              >
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROPERTY MANAGEMENT ── */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#7B5B3A] font-semibold mb-3">For Hosts</p>
            <h2
              className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal mb-3"
              style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}
            >
              Property Management
            </h2>
            <p className="text-[#8A7968] text-[15px] max-w-[480px] mx-auto">
              Our local team takes care of your property on the ground so it&apos;s always guest-ready.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {propertyFeatures.map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-[#EDE8DF] p-5">
                <p className="font-semibold text-[#1C1410] text-[14px] mb-2">{f.title}</p>
                <p className="text-[13px] text-[#8A7968] leading-[1.7]">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <Image src={`${BASE}/2025/05/2Container-1.webp`} alt="" fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-[#1C0A04]/80" />
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5 px-10 py-8">
              <h3 className="font-[family-name:var(--font-playfair)] text-white text-[24px] font-normal">
                Request Property Management Services
              </h3>
              <Link
                href="/contact"
                className="shrink-0 px-7 py-3 border border-white/50 text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-white hover:text-[#1C1410] transition-colors rounded-sm"
              >
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── START WORKING WITH US ── */}
      <section className="py-20 bg-[#1C1410] text-center">
        <div className="max-w-[1120px] mx-auto px-6">
          <h2
            className="font-[family-name:var(--font-playfair)] text-white font-normal mb-5"
            style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
          >
            Start Working With Us Today!
          </h2>
          <p className="text-white/65 text-[15px] max-w-[440px] mx-auto leading-[1.85] mb-8">
            Let&apos;s talk about your property and how we can help you maximize its potential.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-[#7B5B3A] text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-[#5A3E28] transition-colors rounded-sm"
            >
              Get Started →
            </Link>
            <Link
              href="/stays"
              className="px-8 py-3.5 border border-white/30 text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-white/10 transition-colors rounded-sm"
            >
              View Listings
            </Link>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO STRIP ── */}
      <section className="py-10 bg-[#F7F4EF] overflow-x-auto">
        <div className="flex gap-3 min-w-max px-6">
          {portfolioProperties.map((p) => (
            <div key={p.name} className="relative w-[200px] h-[140px] rounded-xl overflow-hidden shrink-0 group">
              <Image
                src={p.img}
                alt={p.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <p className="absolute bottom-3 left-3 font-[family-name:var(--font-playfair)] text-white text-[14px] font-normal">
                {p.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const BASE = "https://thecohostcompany.com/wp-content/uploads";
const G = "https://assets.guesty.com/image/upload/w_1200,q_auto,f_auto";

const values = [
  "Trust", "Support", "Peace-of-Mind", "Expertise",
  "Visibility", "Care", "Consistency", "Growth",
];

const trustedProperties = [
  { name: "Cosmic Cowboy", img: `${G}/v1763770623/production/68df18d0ea1895d9005ea6ad/rgojuyifdkefev9xs5ge.jpg` },
  { name: "Desert Lumina", img: `${G}/v1765152133/production/68df18d0ea1895d9005ea6ad/gkpt8qq78dfxkqu76hnm.jpg` },
  { name: "Whistling Rock", img: `${BASE}/2025/05/YV-Whistling-Rock-01.webp` },
  { name: "The Outlaw", img: `${G}/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg` },
  { name: "Heaven's Door", img: `${G}/v1763153882/production/68df18d0ea1895d9005ea6ad/xc9rn7nrrvuajaomqa4c.jpg` },
  { name: "Boulders Gate", img: `${G}/v1768337449/production/68df18d0ea1895d9005ea6ad/nisb8jvpdap0tqocdzwu.jpg` },
];

const services = [
  {
    number: "01",
    title: "Marketing Services",
    subtitle: "Brand, Launch & Grow",
    description: "We handle everything from branding and logo design to professional photography, listing optimization, and custom website creation. Our data-driven approach includes analytics tracking so you know exactly how your property is performing.",
    features: ["Branding & Logo Design", "Professional Photography", "Listing Optimization", "Custom Website Creation", "Analytics & Reporting", "Social Media Strategy"],
    img: `${BASE}/2025/05/Hosting-1.webp`,
  },
  {
    number: "02",
    title: "Hosting Services",
    subtitle: "Booking Management",
    description: "Full-service guest management across all major platforms. We screen guests, manage dynamic pricing, create custom house manuals, and provide 24/7 emergency support—so you never have to worry.",
    features: ["Multi-Platform Listing Management", "Guest Screening & Communication", "Dynamic Pricing Strategy", "Custom House Manuals", "24/7 Emergency Support", "Multi-Property Coordination"],
    img: `${BASE}/2025/11/Featured-Image-The-Cohost.webp`,
  },
  {
    number: "03",
    title: "Property Management",
    subtitle: "On-The-Ground Care",
    description: "Our local team oversees cleaning coordination, supply restocking, on-site inspections, and maintenance repairs. We treat your property like our own—because to us, it is.",
    features: ["Cleaning Coordination", "Supply Restocking", "On-Site Inspections", "Repair & Maintenance", "Vendor Management", "Property Reports"],
    img: `${BASE}/2025/05/2Container-1.webp`,
  },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="relative h-[520px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`${BASE}/2025/05/Hiking-Rock-Climbing.webp.webp`}
            alt="Property management services"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-[#1C0A04]/72" />
        </div>
        <div className="relative z-10 max-w-[1120px] mx-auto px-8 w-full text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#C4A882] font-semibold mb-6">For Hosts</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-white font-normal text-[18px] tracking-[0.15em] uppercase mb-5">
            We take care of
          </h1>
          <p className="font-[family-name:var(--font-playfair)] text-white font-normal italic text-[60px] leading-[1.08] mb-6">
            Your Home, Your Renter, You.
          </p>
          <p className="text-white/80 text-[17px] leading-[1.75] max-w-[580px] mx-auto mb-10">
            We operate your Airbnb like an independent business—generating passive income while you remain hands-off. Full-service hospitality from listing to checkout.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-[#7B5B3A] text-white text-[12px] font-semibold tracking-[0.15em] uppercase hover:bg-[#5A3E28] transition-colors"
          >
            Get Started →
          </Link>
        </div>
      </section>

      {/* Three services */}
      <section className="py-24 bg-[#F7F4EF]">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-3">What We Offer</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[48px] font-normal text-[#1C1410] leading-[1.1]">
              Our Service Packages
            </h2>
          </div>
          <div className="space-y-8">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-sm bg-white ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className={`relative h-[320px] lg:h-auto ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Image src={svc.img} alt={svc.title} fill className="object-cover" unoptimized />
                </div>
                <div className={`p-10 lg:p-12 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <span className="text-[40px] font-[family-name:var(--font-playfair)] text-[#EDE8DF] font-normal leading-none mb-3">{svc.number}</span>
                  <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-2">{svc.subtitle}</p>
                  <h3 className="font-[family-name:var(--font-playfair)] text-[36px] font-normal text-[#1C1410] leading-[1.1] mb-5">{svc.title}</h3>
                  <p className="text-[15px] text-[#5A4A3A] leading-[1.85] mb-7">{svc.description}</p>
                  <ul className="grid grid-cols-2 gap-2 mb-8">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[14px] text-[#5A4A3A]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4A882" strokeWidth="2.5" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="self-start inline-block px-8 py-3.5 bg-[#7B5B3A] text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-[#5A3E28] transition-colors">
                    Get Started →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-3">Our Foundation</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[44px] font-normal text-[#1C1410] leading-[1.1]">
              Built on These Values
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {values.map((value) => (
              <div key={value} className="bg-[#F7F4EF] rounded-xl px-6 py-8 text-center">
                <div className="w-8 h-px bg-[#C4A882] mx-auto mb-5" />
                <p className="text-[13px] tracking-[0.18em] uppercase text-[#7B5B3A] font-semibold">{value}</p>
                <div className="w-8 h-px bg-[#C4A882] mx-auto mt-5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-3">Our Portfolio</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[44px] font-normal text-[#1C1410] leading-[1.1]">
              Trusted By
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {trustedProperties.map((p) => (
              <div key={p.name} className="relative h-[220px] rounded-xl overflow-hidden group">
                <Image src={p.img} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-4 left-4 font-[family-name:var(--font-playfair)] text-white text-[18px] font-normal">{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={`${BASE}/2025/05/Work-With-US.webp`} alt="Work with us" fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-[#1C0A04]/72" />
        </div>
        <div className="relative z-10 max-w-[1120px] mx-auto px-8 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-[52px] font-normal italic text-white leading-[1.1] mb-6">
            Ready to get started?
          </h2>
          <p className="text-white/80 text-[17px] leading-[1.75] max-w-[500px] mx-auto mb-10">
            Let&apos;s talk about your property and how we can help you maximize its potential.
          </p>
          <Link href="/contact" className="inline-block px-12 py-4 border border-white text-white text-[12px] font-semibold tracking-[0.15em] uppercase hover:bg-white hover:text-[#1C1410] transition-colors">
            Contact Us →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

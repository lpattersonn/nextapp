import Link from "next/link";
import Image from "next/image";

const WP = "https://thecohostcompany.com/wp-content/uploads";

const quickLinks = [
  { label: "Stays (For Guests)", href: "/stays" },
  { label: "Services (for Hosts)", href: "/services" },
  { label: "Press", href: "/press" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Guidebook", href: "/guidebook" },
  { label: "Virtual Concierge", href: "/guidebook" },
];

const stayLocations = [
  { name: "Pioneertown", href: "/stays" },
  { name: "Joshua Tree", href: "/stays" },
  { name: "Yucca Valley", href: "/stays" },
  { name: "All Listings", href: "/stays" },
];

function PinIcon() {
  return (
    <div className="w-9 h-9 rounded-full bg-[#7B5B3A] flex items-center justify-center shrink-0">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    </div>
  );
}

function EnvelopeIcon() {
  return (
    <div className="w-9 h-9 rounded-full bg-[#7B5B3A] flex items-center justify-center shrink-0">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Desert background image */}
      <div className="absolute inset-0">
        <Image
          src={`${WP}/2025/05/BG-FOOTER-1.webp`}
          alt="Joshua Tree desert"
          fill
          className="object-cover object-bottom"
          unoptimized
        />
        <div className="absolute inset-0 bg-white/65" />
      </div>

      {/* Main footer content */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-16 pb-48">

          {/* Col 1 — Brand */}
          <div className="flex flex-col items-start">
            <div className="relative w-[200px] h-[80px] mb-5">
              <Image
                src={`${WP}/2025/05/thecohostcompanylogo.avif`}
                alt="The Cohost Company"
                fill
                className="object-contain object-left"
                unoptimized
              />
            </div>
            <p className="text-[16px] text-[#5A4A3A] leading-snug mb-5">
              Pioneering Airbnb in Joshua Tree<br />since 2014
            </p>
            <div className="flex gap-3">
              <Link
                href="https://instagram.com/thecohostcompany"
                target="_blank"
                className="w-9 h-9 rounded-full bg-[#7B5B3A] flex items-center justify-center text-white hover:bg-[#5A3E28] transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </Link>
              <Link
                href="https://www.facebook.com/thecohostcompany/"
                target="_blank"
                className="w-9 h-9 rounded-full bg-[#7B5B3A] flex items-center justify-center text-white hover:bg-[#5A3E28] transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Col 2 — Quick Menu */}
          <div>
            <h5 className="text-[16px] font-semibold tracking-[0.14em] uppercase text-[#7B5B3A] mb-6">
              Quick Menu
            </h5>
            <ul className="space-y-[14px]">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[16px] text-[#3A2F25] hover:text-[#7B5B3A] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Stays with pin icons */}
          <div>
            <h5 className="text-[16px] font-semibold tracking-[0.14em] uppercase text-[#7B5B3A] mb-6">
              Stays
            </h5>
            <ul className="space-y-4">
              {stayLocations.map((loc) => (
                <li key={loc.name}>
                  <Link href={loc.href} className="flex items-center gap-3 group">
                    <PinIcon />
                    <span className="text-[14px] text-[#3A2F25] group-hover:text-[#7B5B3A] transition-colors">
                      {loc.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h5 className="text-[16px] font-semibold tracking-[0.14em] uppercase text-[#7B5B3A] mb-6">
              Contact Us
            </h5>
            <Link href="mailto:reservations@thecohostcompany.com" className="flex items-center gap-3 group">
              <EnvelopeIcon />
              <span className="text-[16px] text-[#3A2F25] group-hover:text-[#7B5B3A] transition-colors leading-snug">
                reservations@thecohostcompany.com
              </span>
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 bg-[#3D1810]">
        <div className="max-w-[1240px] mx-auto px-10 py-4 flex flex-col sm:flex-row sm:justify-between items-center gap-2 text-[16px] text-white/75">
          <p>© 2025 The Cohost Company</p>
          <p>
            Website by{" "}
            <Link href="https://hiddengem.media" target="_blank" className="hover:text-white transition-colors">
              HiddenGem Media
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

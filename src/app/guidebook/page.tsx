import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const BASE = "https://thecohostcompany.com/wp-content/uploads";

const categories = [
  {
    title: "Photo-Worthy Moments",
    items: [
      {
        title: "Joshua Tree Photo Spots",
        desc: "The most iconic desert backdrops for your perfect shot",
        img: `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`,
        href: "#",
      },
      {
        title: "Local Photographers & Creatives",
        desc: "Book a session with Joshua Tree's talented photographers",
        img: `${BASE}/2025/05/Historic-film-set-turned-charming-Old-West-town.webp`,
        href: "#",
      },
    ],
  },
  {
    title: "Outdoor Adventures",
    items: [
      {
        title: "Hiking & Rock Climbing",
        desc: "Explore the best trails and bouldering spots in the National Park",
        img: `${BASE}/2025/05/Hiking-Rock-Climbing.webp.webp`,
        href: "#",
      },
      {
        title: "Stargazing & Night Sky",
        desc: "One of the world's premier dark-sky destinations",
        img: `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`,
        href: "#",
      },
    ],
  },
  {
    title: "Dining & Drinks",
    items: [
      {
        title: "Best Restaurants Nearby",
        desc: "From local tacos to refined desert dining, the best spots in town",
        img: `${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`,
        href: "#",
      },
      {
        title: "Coffee Shops & Cafés",
        desc: "Start your morning right at Joshua Tree's beloved local cafés",
        img: `${BASE}/2025/05/Frame-26.webp`,
        href: "#",
      },
    ],
  },
  {
    title: "Creative Add-Ons",
    items: [
      {
        title: "Private Chef Experience",
        desc: "Elevate your stay with a private chef dinner at your property",
        img: `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`,
        href: "/services",
      },
      {
        title: "Massage & Wellness",
        desc: "In-home spa services, massages, and wellness experiences",
        img: `${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`,
        href: "/services",
      },
    ],
  },
  {
    title: "Arts & Culture",
    items: [
      {
        title: "Galleries & Studios",
        desc: "Discover the vibrant art scene woven into the desert landscape",
        img: `${BASE}/2025/05/Historic-film-set-turned-charming-Old-West-town.webp`,
        href: "#",
      },
      {
        title: "Pioneertown & Pappy & Harriet's",
        desc: "Step into the wild west at this legendary music venue",
        img: `${BASE}/2025/05/Historic-film-set-turned-charming-Old-West-town.webp`,
        href: "#",
      },
    ],
  },
  {
    title: "Local Essentials",
    items: [
      {
        title: "Grocery Stores & Markets",
        desc: "Everything you need to stock your kitchen during your stay",
        img: `${BASE}/2025/05/Frame-26.webp`,
        href: "#",
      },
      {
        title: "Emergency & Helpful Numbers",
        desc: "Key contacts and services for a worry-free desert stay",
        img: `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`,
        href: "#",
      },
    ],
  },
];

export default function GuidebookPage() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: 320 }}>
        <div className="absolute inset-0">
          <Image
            src={`${BASE}/2025/05/Joshua-Tree-National-Park-.webp`}
            alt="Joshua Tree desert landscape"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          {/* warm layered overlay matching the WordPress terracotta tone */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(120,76,40,0.92) 0%, rgba(180,132,88,0.86) 45%, rgba(148,104,64,0.93) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 text-center px-6 py-20 w-full max-w-[580px] mx-auto">
          <h1
            className="font-[family-name:var(--font-playfair)] text-white font-normal uppercase tracking-[0.14em] mb-5"
            style={{ fontSize: "clamp(34px, 5vw, 54px)" }}
          >
            Our Guidebook
          </h1>
          <p className="text-white/75 text-[14.5px] leading-[1.9] max-w-[380px] mx-auto">
            Discover curated local experiences, creative add-ons, and lifestyle
            services to enhance your desert stay.
          </p>
          <div className="mt-7 flex justify-center">
            <div className="w-20 h-px bg-white/35" />
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section
        className="py-16 min-h-[60vh]"
        style={{ background: "linear-gradient(to bottom, #FAF0EB 0%, #FDF8F5 100%)" }}
      >
        <div className="max-w-[720px] mx-auto px-5">
          {categories.map((cat, ci) => (
            <div key={ci} className={ci < categories.length - 1 ? "mb-12" : ""}>
              {/* category heading */}
              <h2
                className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal text-center mb-5"
                style={{ fontSize: "clamp(20px, 2.8vw, 26px)" }}
              >
                {cat.title}
              </h2>

              {/* cards */}
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center justify-between bg-white rounded-2xl border border-[#EDE8DF] px-5 py-4 hover:shadow-md hover:border-[#D4C5B0] transition-all duration-200 group"
                  >
                    <div className="flex-1 pr-4 min-w-0">
                      <p className="text-[#1C1410] text-[15px] font-medium leading-snug group-hover:text-[#7B5B3A] transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[#9A8878] text-[12.5px] mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                    <div className="relative w-[68px] h-[68px] rounded-xl overflow-hidden shrink-0 bg-[#EDE8DF]">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

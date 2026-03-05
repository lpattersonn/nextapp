import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const BASE = "https://thecohostcompany.com/wp-content/uploads";

const photoSpots = [
  { name: "Heart Rock", desc: "A naturally formed granite boulder off a spur trail—one of the desert's most photographed natural landmarks.", img: `${BASE}/2025/05/Joshua-Tree-National-Park-.webp` },
  { name: "Keys View", desc: "Panoramic mountain views stretching from the Coachella Valley to the Salton Sea at 5,185 feet.", img: `${BASE}/2025/05/Hiking-Rock-Climbing.webp.webp` },
  { name: "Rhythm of Life", desc: "A striking desert sculpture by international artist Andrew Rogers—a true hidden gem.", img: `${BASE}/2025/05/Historic-film-set-turned-charming-Old-West-town.webp` },
  { name: "Black Rock Trailhead", desc: "Premier hiking and stargazing location with sweeping dark-sky views and rugged desert terrain.", img: `${BASE}/2025/05/Frame-26.webp` },
];

const photographers = [
  { name: "Mattie O'Neill", specialty: "Desert Portraiture & Lifestyle" },
  { name: "Ana Captured", specialty: "Editorial & Travel Photography" },
  { name: "Paige Dyer", specialty: "Architecture & Interior" },
  { name: "Alyssa", specialty: "Adventure & Landscape" },
  { name: "Adrya", specialty: "Couples & Elopement" },
  { name: "Thru Deez Lens", specialty: "Documentary & Street" },
];

const adventures = [
  {
    category: "Star Tours",
    items: [
      { name: "Sunset Hike, Dinner & Night Sky Presentation", desc: "Catered dinner and astronomer-led galaxy tour for up to 4 guests. An unforgettable evening under the Milky Way." },
    ],
  },
  {
    category: "Horseback Adventures",
    items: [
      { name: "Guided Horseback Rides", desc: "Ride through a mustang sanctuary across stunning desert landscapes with experienced local guides." },
    ],
  },
  {
    category: "Hiking Guides",
    items: [
      { name: "Joshua Tree Adventures", desc: "Expert-led hikes through the national park's most iconic formations and hidden trails." },
      { name: "Wandering Mojave Hiking", desc: "Custom desert hike experiences tailored to your group's pace and interests." },
    ],
  },
];

const wellness = [
  { category: "Sound Baths", venues: ["Mojave Massage", "Bliss Chakra Spa", "Sarah BL", "Studio 29"] },
  { category: "In-Home Massage", venues: ["60-minute sessions", "90-minute sessions", "Couples massage available"] },
  { category: "Yoga", venues: ["Cedar & Sage", "Joshua Tree Yoga", "Joshua Tree Alchemy", "Yucca Shala", "Earth Yoga & Spa", "Untamed Yoga"] },
];

const specials = [
  {
    title: "Private Chefs",
    items: ["Daily meal preparation", "Three-course dinners", "Cocktail parties", "Steakhouse experiences"],
    icon: "🍽️",
  },
  {
    title: "Event & Décor",
    items: ["Balloon setups", "Design rentals", "Intimate celebrations", "Pop-up events"],
    icon: "🎉",
  },
  {
    title: "Craft Cocktails",
    items: ["Kegged cocktail rentals from Joshua Tree Distilling", "Custom cocktail menus", "Bar setup included"],
    icon: "🍹",
  },
  {
    title: "Bakeries & Treats",
    items: ["Luna Bakery", "29 Loaves", "Joshua Tree Cakery", "Sweet Chicks Bakehouse"],
    icon: "🥐",
  },
];

export default function GuidebookPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="relative h-[420px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`${BASE}/2025/05/Hiking-Rock-Climbing.webp.webp`}
            alt="Joshua Tree guidebook"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-[#1C0A04]/70" />
        </div>
        <div className="relative z-10 max-w-[1120px] mx-auto px-8 w-full text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#C4A882] font-semibold mb-5">Things To Do</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-white font-normal text-[64px] leading-[1.05] mb-5">
            Our Guidebook
          </h1>
          <p className="text-white/80 text-[17px] leading-[1.75] max-w-[580px] mx-auto">
            Discover curated local experiences, creative add-ons, and lifestyle services to enhance your desert stay.
          </p>
        </div>
      </section>

      {/* Photo-Worthy Moments */}
      <section className="py-24 bg-[#F7F4EF]">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-3">Explore</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[44px] font-normal text-[#1C1410] leading-[1.1]">
              Photo-Worthy Moments
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {photoSpots.map((spot) => (
              <div key={spot.name} className="group rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="relative h-[240px] overflow-hidden">
                  <Image src={spot.img} alt={spot.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                </div>
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#1C1410] mb-2">{spot.name}</h3>
                  <p className="text-[14px] text-[#8A7968] leading-[1.85]">{spot.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Photographers */}
      <section className="py-20 bg-white">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-3">Capture Your Stay</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[44px] font-normal text-[#1C1410] leading-[1.1]">
              Local Photographers & Creatives
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {photographers.map((p) => (
              <div key={p.name} className="bg-[#F7F4EF] rounded-xl p-7">
                <div className="w-10 h-10 rounded-full bg-[#EDE8DF] flex items-center justify-center mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="1.8" strokeLinecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-[18px] font-normal text-[#1C1410] mb-1">{p.name}</h3>
                <p className="text-[13px] text-[#8A7968]">{p.specialty}</p>
                <Link href="#" className="mt-4 inline-block text-[12px] font-semibold tracking-[0.08em] uppercase text-[#7B5B3A] hover:underline">
                  Book →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outdoor Adventures */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-3">Get Outside</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[44px] font-normal text-[#1C1410] leading-[1.1]">
              Outdoor Adventures
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {adventures.map((adv) => (
              <div key={adv.category} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-2 h-8 bg-[#C4A882] rounded-full mb-5" />
                <h3 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#1C1410] mb-5">{adv.category}</h3>
                {adv.items.map((item) => (
                  <div key={item.name} className="mb-4">
                    <p className="text-[15px] font-semibold text-[#3A2F25] mb-1">{item.name}</p>
                    <p className="text-[14px] text-[#8A7968] leading-[1.8]">{item.desc}</p>
                  </div>
                ))}
                <Link href="#" className="mt-4 inline-block text-[12px] font-semibold tracking-[0.08em] uppercase text-[#7B5B3A] hover:underline">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={`${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`} alt="Desert wellness" fill className="object-cover object-center" unoptimized />
          <div className="absolute inset-0 bg-[#1C0A04]/75" />
        </div>
        <div className="relative z-10 max-w-[1120px] mx-auto px-8">
          <div className="mb-14 text-center">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#C4A882] font-semibold mb-3">Recharge</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[44px] font-normal text-white leading-[1.1]">
              Wellness & Self-Care
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wellness.map((w) => (
              <div key={w.category} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <h3 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-white mb-5">{w.category}</h3>
                <ul className="space-y-2">
                  {w.venues.map((v) => (
                    <li key={v} className="flex items-center gap-2 text-[14px] text-white/80">
                      <div className="w-1 h-1 rounded-full bg-[#C4A882] shrink-0" />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Specials */}
      <section className="py-20 bg-white">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-3">Elevate Your Stay</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[44px] font-normal text-[#1C1410] leading-[1.1]">
              Specials & Add-Ons
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {specials.map((s) => (
              <div key={s.title} className="bg-[#F7F4EF] rounded-2xl p-7">
                <p className="text-[28px] mb-4">{s.icon}</p>
                <h3 className="font-[family-name:var(--font-playfair)] text-[20px] font-normal text-[#1C1410] mb-4">{s.title}</h3>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[14px] text-[#8A7968]">
                      <div className="w-1 h-1 rounded-full bg-[#C4A882] mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Around */}
      <section className="py-16 bg-[#F7F4EF] border-t border-[#EDE8DF]">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="mb-10">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-3">Getting Around</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[36px] font-normal text-[#1C1410] leading-[1.1]">
              Transportation
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white rounded-xl px-7 py-5 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F7F4EF] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="1.8" strokeLinecap="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/></svg>
              </div>
              <div>
                <p className="text-[15px] font-semibold text-[#1C1410]">Enterprise Car Rental</p>
                <p className="text-[13px] text-[#8A7968]">Convenient local rental options</p>
              </div>
            </div>
            <div className="bg-white rounded-xl px-7 py-5 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F7F4EF] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l4-4 4 4M12 8v8"/></svg>
              </div>
              <div>
                <p className="text-[15px] font-semibold text-[#1C1410]">Fun Rentals</p>
                <p className="text-[13px] text-[#8A7968]">Golf carts, bikes & more</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#3D1810] text-center">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-[40px] font-normal italic text-white mb-5">
            Ready to plan your stay?
          </h2>
          <p className="text-white/75 text-[16px] mb-8 max-w-[480px] mx-auto">
            Browse our curated desert properties and start planning your perfect escape.
          </p>
          <Link href="/stays" className="inline-block px-10 py-4 border border-white text-white text-[12px] font-semibold tracking-[0.15em] uppercase hover:bg-white hover:text-[#1C1410] transition-colors">
            Browse Stays →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

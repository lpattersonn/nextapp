"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const G = "https://assets.guesty.com/image/upload/w_1200,q_auto,f_auto";
const WP = "https://thecohostcompany.com/wp-content/uploads";

interface Stay {
  name: string;
  guests: number;
  beds: number;
  baths: number | string;
  type: string;
  images: string[];
  price?: string;
  badge?: string;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/'/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function StayCard({ stay }: { stay: Stay }) {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + stay.images.length) % stay.images.length);
  const next = () => setCurrent((c) => (c + 1) % stay.images.length);

  return (
    <Link href={`/property/${slugify(stay.name)}`} className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-[260px] group overflow-hidden">
        <Image
          src={stay.images[current]}
          alt={stay.name}
          fill
          className="object-cover transition-opacity duration-300"
          unoptimized
        />
        {stay.badge && (
          <span className="absolute top-3 left-3 bg-white text-[#1C1410] text-[12px] font-semibold tracking-[0.06em] uppercase px-3 py-1.5 rounded-full shadow-sm z-10">
            {stay.badge}
          </span>
        )}
        {stay.images.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1C1410" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={next} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1C1410" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </>
        )}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {stay.images.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} aria-label={`Photo ${i + 1}`} className={`rounded-full transition-all duration-200 cursor-pointer ${i === current ? "w-2 h-2 bg-white" : "w-1.5 h-1.5 bg-white/55"}`} />
          ))}
        </div>
      </div>
      <div className="px-5 py-4">
        <h4 className="font-[family-name:var(--font-playfair)] text-[20px] font-normal text-[#1C1410] mb-1 leading-snug">{stay.name}</h4>
        {stay.price && (
          <p className="text-[15px] text-[#5A4A3A] mb-2">Starting at <span className="font-semibold text-[#1C1410]">${stay.price}</span> / night</p>
        )}
        <p className="text-[14px] text-[#8A7968] flex items-center gap-2 flex-wrap">
          <span>{stay.type}</span>
          <span className="text-[#D0C8BD]">|</span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            {stay.guests}
          </span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9V19H22V9"/><path d="M6 9V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><rect x="2" y="7" width="4" height="6" rx="1"/></svg>
            {stay.beds}
          </span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6V3.5a2.5 2.5 0 0 1 5 0V6"/><rect x="2" y="6" width="20" height="10" rx="2"/><path d="M6 16v2M18 16v2"/></svg>
            {stay.baths}
          </span>
        </p>
      </div>
    </Link>
  );
}

const pioneertown: Stay[] = [
  { name: "The Outlaw", guests: 10, beds: 5, baths: 3, type: "House in Pioneertown", images: [`${G}/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg`, `${G}/v1767556164/production/68df18d0ea1895d9005ea6ad/ksqaaynmnofh8o2loxp2.jpg`], price: "1,100", badge: "Most Popular" },
  { name: "Heaven's Door", guests: 8, beds: 3, baths: 3, type: "House in Pioneertown", images: [`${G}/v1763770623/production/68df18d0ea1895d9005ea6ad/rgojuyifdkefev9xs5ge.jpg`], price: "242" },
  { name: "Moonlight Mile", guests: 8, beds: 3, baths: 2, type: "House in Pioneertown", images: [`${G}/v1767556164/production/68df18d0ea1895d9005ea6ad/ksqaaynmnofh8o2loxp2.jpg`] },
  { name: "Whistling Rock", guests: 8, beds: 3, baths: 3, type: "House in Pioneertown", images: [`${G}/v1768337449/production/68df18d0ea1895d9005ea6ad/nisb8jvpdap0tqocdzwu.jpg`], badge: "Guest Favorite" },
];

const joshuaTree: Stay[] = [
  { name: "Prism", guests: 6, beds: 2, baths: 2, type: "House in Joshua Tree", images: [`${G}/listing_images_s3/production/property-photos/37fbd8d6503184919d1773d505e2608c62d0958500918990/68e188d4d1f8d500122a10db/a7bf51f0-53ad-42-6xcIh`], price: "283", badge: "Guest Favorite" },
  { name: "Cielito Lindo Retreat", guests: 6, beds: 2, baths: 1, type: "House in Joshua Tree", images: [`${G}/listing_images_s3/production/property-photos/37fbd8d6503184919d1773d505e2608c62d0958500918990/68e0a688f84fbf0012f27c1d/36e485f6-d6a2-4a-vArrg`], price: "204" },
  { name: "Moonbeam Ranch", guests: 8, beds: 3, baths: "2.5", type: "House in Joshua Tree", images: [`${G}/v1763153882/production/68df18d0ea1895d9005ea6ad/xc9rn7nrrvuajaomqa4c.jpg`], price: "197" },
  { name: "Boulders Gate", guests: 8, beds: 3, baths: 3, type: "House in Joshua Tree", images: [`${G}/v1765152133/production/68df18d0ea1895d9005ea6ad/gkpt8qq78dfxkqu76hnm.jpg`], price: "2,300", badge: "Guest Favorite" },
  { name: "Iglesia Sol", guests: 3, beds: 1, baths: 1, type: "House in Joshua Tree", images: [`${G}/v1763153882/production/68df18d0ea1895d9005ea6ad/xc9rn7nrrvuajaomqa4c.jpg`], price: "189" },
  { name: "La Luna Azul", guests: 4, beds: 2, baths: 1, type: "House in Joshua Tree", images: [`${G}/v1765152133/production/68df18d0ea1895d9005ea6ad/gkpt8qq78dfxkqu76hnm.jpg`], price: "225" },
];

const yuccaValley: Stay[] = [
  { name: "Whistling Rock", guests: 8, beds: 3, baths: 3, type: "House in Yucca Valley", images: [`${WP}/2025/05/YV-Whistling-Rock-01.webp`], badge: "Guest Favorite" },
  { name: "The Artanis Villa", guests: 12, beds: 5, baths: 5, type: "Villa in Yucca Valley", images: [`${G}/v1763770623/production/68df18d0ea1895d9005ea6ad/rgojuyifdkefev9xs5ge.jpg`] },
  { name: "Revolve House", guests: 4, beds: 2, baths: 2, type: "House in Yucca Valley", images: [`${G}/v1768337449/production/68df18d0ea1895d9005ea6ad/nisb8jvpdap0tqocdzwu.jpg`] },
  { name: "Sunset Grove", guests: 8, beds: 3, baths: 2, type: "House in Yucca Valley", images: [`${WP}/2025/05/YV-Crazy-Heart-Ranch-01.webp`] },
];

const twentyninePalms: Stay[] = [
  { name: "Black Butterfly", guests: 8, beds: 3, baths: 2, type: "House in Twentynine Palms", images: [`${G}/v1769390615/production/68df18d0ea1895d9005ea6ad/xflvrxhi0mwvjjvbzbea.jpg`] },
  { name: "Daydream Retreat", guests: 7, beds: 3, baths: 2, type: "House in Twentynine Palms", images: [`${G}/v1770253160/production/68df18d0ea1895d9005ea6ad/mj8oslr93qflaiaclhtt.jpg`] },
];

const morongoValley: Stay[] = [
  { name: "Desert Moon", guests: 6, beds: 3, baths: 2, type: "House in Morongo Valley", images: [`${G}/v1763153882/production/68df18d0ea1895d9005ea6ad/xc9rn7nrrvuajaomqa4c.jpg`], price: "215" },
  { name: "Canyon View", guests: 4, beds: 2, baths: 1, type: "House in Morongo Valley", images: [`${G}/v1765152133/production/68df18d0ea1895d9005ea6ad/gkpt8qq78dfxkqu76hnm.jpg`], price: "175" },
];

const brokenBow: Stay[] = [
  { name: "Timber Retreat", guests: 8, beds: 4, baths: 3, type: "Cabin in Broken Bow, OK", images: [`${WP}/2025/05/Hosting-1.webp`], price: "320", badge: "Guest Favorite" },
  { name: "Lakeview Lodge", guests: 8, beds: 3, baths: 2, type: "House in Broken Bow, OK", images: [`${WP}/2025/05/Work-With-US.webp`], price: "285" },
];

const tabs = [
  { id: "joshuaTree", label: "Joshua Tree", count: joshuaTree.length, stays: joshuaTree },
  { id: "pioneertown", label: "Pioneertown", count: pioneertown.length, stays: pioneertown },
  { id: "yuccaValley", label: "Yucca Valley", count: yuccaValley.length, stays: yuccaValley },
  { id: "twentyninePalms", label: "Twentynine Palms", count: twentyninePalms.length, stays: twentyninePalms },
  { id: "morongoValley", label: "Morongo Valley", count: morongoValley.length, stays: morongoValley },
  { id: "brokenBow", label: "Broken Bow", count: brokenBow.length, stays: brokenBow },
];

export default function StaysPage() {
  const [activeTab, setActiveTab] = useState("joshuaTree");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="relative h-[340px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`${G}/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg`}
            alt="Desert vacation rentals"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,9,5,0.45) 0%, rgba(15,9,5,0.72) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-[1120px] mx-auto px-8 pb-12 w-full">
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/60 mb-3">Discover</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-white font-normal text-[56px] leading-[1.05] mb-3">
            All Listings
          </h1>
          <p className="text-white/80 text-[16px]">Select a category to find your home away from home</p>
        </div>
      </section>

      {/* Tab filters */}
      <div className="bg-white border-b border-[#EDE8DF] sticky top-[80px] z-40">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-5 text-[14px] font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "border-[#7B5B3A] text-[#7B5B3A]"
                    : "border-transparent text-[#8A7968] hover:text-[#5A4A3A]"
                }`}
              >
                {tab.label}
                <span className={`ml-2 text-[12px] ${activeTab === tab.id ? "text-[#7B5B3A]" : "text-[#C4A882]"}`}>
                  ({tab.count})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-[#F7F4EF] border-b border-[#EDE8DF]">
        <div className="max-w-[1120px] mx-auto px-8 py-4 flex items-center gap-4">
          <Link href="#" className="px-5 py-2 bg-[#7B5B3A] text-white text-[13px] font-semibold tracking-[0.08em] uppercase rounded-full hover:bg-[#5A3E28] transition-colors">
            Check Availability
          </Link>
          <Link href="/signup" className="px-5 py-2 border border-[#C4A882] text-[#7B5B3A] text-[13px] font-semibold tracking-[0.08em] uppercase rounded-full hover:bg-[#7B5B3A] hover:text-white hover:border-[#7B5B3A] transition-colors">
            Claim 10% OFF
          </Link>
        </div>
      </div>

      {/* Listings grid */}
      <section className="py-16 bg-[#F7F4EF]">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="mb-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-[32px] font-normal text-[#1C1410]">
              {active.label}
            </h2>
            <p className="text-[14px] text-[#8A7968] mt-1">{active.count} properties available</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {active.stays.map((stay) => (
              <StayCard key={stay.name} stay={stay} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-[14px] text-[#8A7968] mb-4">Looking for more options? Contact us directly.</p>
            <Link
              href="/contact"
              className="inline-block px-10 py-3.5 bg-[#7B5B3A] text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-[#5A3E28] transition-colors"
            >
              Contact Us →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, BedDouble, Bath, ChevronLeft, ChevronRight } from "lucide-react";

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
      {/* Image + carousel */}
      <div className="relative h-[260px] group overflow-hidden">
        <Image
          src={stay.images[current]}
          alt={stay.name}
          fill
          className="object-cover transition-opacity duration-300"
          unoptimized
        />

        {stay.badge && (
          <span className="absolute top-3 left-3 bg-white text-[#1C1410] text-[11px] font-semibold tracking-[0.06em] uppercase px-3 py-1.5 rounded-full shadow-sm z-10">
            {stay.badge}
          </span>
        )}

        {/* Prev / Next arrows — visible on hover */}
        {stay.images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer"
            >
              <ChevronLeft size={16} color="#1C1410" strokeWidth={2.5} />
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer"
            >
              <ChevronRight size={16} color="#1C1410" strokeWidth={2.5} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {stay.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Photo ${i + 1}`}
              className={`rounded-full transition-all duration-200 cursor-pointer ${
                i === current ? "w-2 h-2 bg-white" : "w-1.5 h-1.5 bg-white/55"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card body */}
      <div className="px-5 py-4">
        <h4 className="font-[family-name:var(--font-playfair)] text-[20px] font-normal text-[#1C1410] mb-1 leading-snug">
          {stay.name}
        </h4>
        {stay.price && (
          <p className="text-[16px] text-[#5A4A3A] mb-2">
            Starting at{" "}
            <span className="font-semibold text-[#1C1410]">${stay.price}</span>{" "}
            night
          </p>
        )}
        <p className="text-[16px] text-[#8A7968] flex items-center gap-2 flex-wrap">
          <span>{stay.type}</span>
          <span className="text-[#D0C8BD]">|</span>
          <span className="flex items-center gap-1.5">
            <Users size={13} color="#7B5B3A" strokeWidth={2} className="shrink-0" />
            {stay.guests}
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble size={13} color="#7B5B3A" strokeWidth={2} className="shrink-0" />
            {stay.beds}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={13} color="#7B5B3A" strokeWidth={2} className="shrink-0" />
            {stay.baths}
          </span>
        </p>
      </div>
    </Link>
  );
}

function LocationGroup({ title, stays, href = "/stays" }: { title: string; stays: Stay[]; href?: string }) {
  return (
    <div className="mb-14 last:mb-0">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#EDE8DF]">
        <h3 className="font-[family-name:var(--font-playfair)] text-[32px] font-normal text-[#1C1410]">
          {title}
        </h3>
        <Link
          href={href}
          className="text-[16px] text-[#7B5B3A] font-medium tracking-[0.04em] border border-[#C4A882] px-4 py-1.5 rounded-full hover:bg-[#7B5B3A] hover:text-white hover:border-[#7B5B3A] transition-colors"
        >
          More Listings →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {stays.map((s) => <StayCard key={s.name} stay={s} />)}
      </div>
    </div>
  );
}

const pioneertown: Stay[] = [
  {
    name: "The Outlaw",
    guests: 10,
    beds: 5,
    baths: 3,
    type: "House in Pioneertown",
    images: [
      `${G}/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg`,
      `${G}/v1767556164/production/68df18d0ea1895d9005ea6ad/ksqaaynmnofh8o2loxp2.jpg`,
    ],
    price: "1,100",
    badge: "Most Popular",
  },
  {
    name: "Heaven's Door",
    guests: 8,
    beds: 3,
    baths: 3,
    type: "House in Pioneertown",
    images: [
      `${G}/v1763770623/production/68df18d0ea1895d9005ea6ad/rgojuyifdkefev9xs5ge.jpg`,
    ],
    price: "242",
  },
  {
    name: "Moonlight Mile",
    guests: 8,
    beds: 3,
    baths: 2,
    type: "House in Pioneertown",
    images: [
      `${G}/v1767556164/production/68df18d0ea1895d9005ea6ad/ksqaaynmnofh8o2loxp2.jpg`,
    ],
  },
  {
    name: "Whistling Rock",
    guests: 8,
    beds: 3,
    baths: 3,
    type: "House in Pioneertown",
    images: [
      `${G}/v1768337449/production/68df18d0ea1895d9005ea6ad/nisb8jvpdap0tqocdzwu.jpg`,
    ],
    badge: "Guest Favorite",
  },
];

const joshuaTree: Stay[] = [
  {
    name: "Prism",
    guests: 6,
    beds: 2,
    baths: 2,
    type: "House in Joshua Tree",
    images: [
      `${G}/listing_images_s3/production/property-photos/37fbd8d6503184919d1773d505e2608c62d0958500918990/68e188d4d1f8d500122a10db/a7bf51f0-53ad-42-6xcIh`,
    ],
    price: "283",
    badge: "Guest Favorite",
  },
  {
    name: "Cielito Lindo Retreat",
    guests: 6,
    beds: 2,
    baths: 1,
    type: "House in Joshua Tree",
    images: [
      `${G}/listing_images_s3/production/property-photos/37fbd8d6503184919d1773d505e2608c62d0958500918990/68e0a688f84fbf0012f27c1d/36e485f6-d6a2-4a-vArrg`,
    ],
    price: "204",
  },
  {
    name: "Moonbeam Ranch",
    guests: 8,
    beds: 3,
    baths: "2.5",
    type: "House in Joshua Tree",
    images: [
      `${G}/v1763153882/production/68df18d0ea1895d9005ea6ad/xc9rn7nrrvuajaomqa4c.jpg`,
    ],
    price: "197",
  },
  {
    name: "Boulders Gate",
    guests: 8,
    beds: 3,
    baths: 3,
    type: "House in Joshua Tree",
    images: [
      `${G}/v1765152133/production/68df18d0ea1895d9005ea6ad/gkpt8qq78dfxkqu76hnm.jpg`,
    ],
    price: "2,300",
    badge: "Guest Favorite",
  },
];

const yuccaValley: Stay[] = [
  {
    name: "Whistling Rock",
    guests: 8,
    beds: 3,
    baths: 3,
    type: "House in Yucca Valley",
    images: [
      `${WP}/2025/05/YV-Whistling-Rock-01.webp`,
    ],
    badge: "Guest Favorite",
  },
  {
    name: "The Artanis Villa",
    guests: 12,
    beds: 5,
    baths: 5,
    type: "Villa in Yucca Valley",
    images: [
      `${G}/v1763770623/production/68df18d0ea1895d9005ea6ad/rgojuyifdkefev9xs5ge.jpg`,
    ],
  },
  {
    name: "Revolve House",
    guests: 4,
    beds: 2,
    baths: 2,
    type: "House in Yucca Valley",
    images: [
      `${G}/v1768337449/production/68df18d0ea1895d9005ea6ad/nisb8jvpdap0tqocdzwu.jpg`,
    ],
  },
  {
    name: "Sunset Grove",
    guests: 8,
    beds: 3,
    baths: 2,
    type: "House in Yucca Valley",
    images: [
      `${WP}/2025/05/YV-Crazy-Heart-Ranch-01.webp`,
    ],
  },
];

const twentyninePalms: Stay[] = [
  {
    name: "Black Butterfly",
    guests: 8,
    beds: 3,
    baths: 2,
    type: "House in Twentynine Palms",
    images: [
      `${G}/v1769390615/production/68df18d0ea1895d9005ea6ad/xflvrxhi0mwvjjvbzbea.jpg`,
    ],
  },
  {
    name: "Daydream Retreat",
    guests: 7,
    beds: 3,
    baths: 2,
    type: "House in Twentynine Palms",
    images: [
      `${G}/v1770253160/production/68df18d0ea1895d9005ea6ad/mj8oslr93qflaiaclhtt.jpg`,
    ],
  },
];

export default function FeaturedStays() {
  return (
    <section id="stays" className="py-24 bg-[#F7F4EF]">
      <div className="max-w-[1120px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-16">
          {/* Left: Section intro — sticky */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[16px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-3">
              Discover
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[44px] font-normal text-[#1C1410] leading-[1.1] mb-5">
              Featured Stays
            </h2>
            <p className="text-[16px] text-[#8A7968] leading-[1.85] mb-8">
              The Cohost homes across the High Desert—each one thoughtfully
              managed and beautifully designed for a 5-star guest experience.
            </p>
            <Link
              href="/stays"
              className="inline-block px-6 py-2.5 border border-[#7B5B3A] text-[#7B5B3A] text-[16px] font-semibold tracking-[0.1em] uppercase hover:bg-[#7B5B3A] hover:text-white transition-colors"
            >
              View All Listings →
            </Link>
          </div>

          {/* Right: Location groups */}
          <div>
            <LocationGroup title="Pioneertown" stays={pioneertown} />
            <LocationGroup title="Joshua Tree" stays={joshuaTree} />
            <LocationGroup title="Yucca Valley" stays={yuccaValley} />
            <LocationGroup title="Twentynine Palms" stays={twentyninePalms} />

            <div className="mt-8 text-center">
              <Link
                href="/stays"
                className="inline-block px-10 py-3.5 bg-[#7B5B3A] text-white text-[16px] font-semibold tracking-[0.12em] uppercase hover:bg-[#5A3E28] transition-colors"
              >
                View All 129 Listings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

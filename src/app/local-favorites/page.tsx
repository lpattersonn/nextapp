"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const BASE = "https://thecohostcompany.com/wp-content/uploads";
const G = "https://assets.guesty.com/image/upload/w_800,q_auto,f_auto";

// ── Data ─────────────────────────────────────────────────────────────────────
const restaurants = [
  {
    name: "La Copine",
    desc: "Creative takes on classic American comfort food with farm-fresh ingredients.",
    images: [
      `${G}/v1763770623/production/68df18d0ea1895d9005ea6ad/rgojuyifdkefev9xs5ge.jpg`,
      `${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`,
    ],
    website: "laccopine.com",
    phone: "(760) 209-0027",
    address: "848 Old Women Springs Rd, Yucca Valley, CA 92284",
  },
  {
    name: "The Pony Tavern",
    desc: "Fun bar with craft cocktails and light bites.",
    images: [
      `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`,
      `${G}/v1765152133/production/68df18d0ea1895d9005ea6ad/gkpt8qq78dfxkqu76hnm.jpg`,
    ],
    website: "thetinypony.com",
    phone: "(760) 409-1062",
    address: "57256 29 Palms Hwy, Yucca Valley, CA 92284",
  },
  {
    name: "Red Fish Saloon",
    desc: "Relaxed saloon with live music and pub grub.",
    images: [
      `${G}/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg`,
      `${BASE}/2025/05/Historic-film-set-turned-charming-Old-West-town.webp`,
    ],
    website: null,
    phone: "(760) 365-4233",
    address: "52890 29 Palms Hwy, Pioneertown, CA",
  },
  {
    name: "Copper Basin",
    desc: "Upscale dining with locally sourced seasonal ingredients.",
    images: [
      `${BASE}/2025/05/Hiking-Rock-Climbing.webp.webp`,
      `${G}/v1763153882/production/68df18d0ea1895d9005ea6ad/xc9rn7nrrvuajaomqa4c.jpg`,
    ],
    website: "copperbasinjt.com",
    phone: "(760) 200-4637",
    address: "57550 Aviation Dr, Yucca Valley, CA 92284",
  },
  {
    name: "The Den",
    desc: "Casual eatery serving hearty Southwestern fare in relaxed surroundings.",
    images: [
      `${G}/v1768337449/production/68df18d0ea1895d9005ea6ad/nisb8jvpdap0tqocdzwu.jpg`,
      `${BASE}/2025/05/Frame-26.webp`,
    ],
    website: "thedenjtca.com",
    phone: "(760) 974-5225",
    address: "64769 29 Palms Hwy 40, Joshua Tree, CA 92252",
  },
  {
    name: "Pappy & Harriet's",
    desc: "Legendary Pioneertown roadhouse — live music, BBQ, cold beers.",
    images: [
      `${BASE}/2025/05/Historic-film-set-turned-charming-Old-West-town.webp`,
      `${G}/v1763770623/production/68df18d0ea1895d9005ea6ad/rgojuyifdkefev9xs5ge.jpg`,
    ],
    website: "pappyandharriets.com",
    phone: "(760) 228-2222",
    address: "53688 Pioneertown Rd, Pioneertown, CA 92268",
  },
  {
    name: "Joshua Tree Saloon",
    desc: "Classic western-style saloon, as seen in Find Matinee movies.",
    images: [
      `${G}/v1765152133/production/68df18d0ea1895d9005ea6ad/gkpt8qq78dfxkqu76hnm.jpg`,
      `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`,
    ],
    website: "joshuatreesaloon.com",
    phone: "(760) 366-2250",
    address: "61835 29 Palms Hwy, Joshua Tree, CA 92252",
  },
  {
    name: "Joshua Tree Coffee Company",
    desc: "Coffee and WiFi. Enjoy a fresh, locally-made cup of coffee with Joshua Tree charm.",
    images: [
      `${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`,
      `${G}/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg`,
    ],
    website: "jtcc.com",
    phone: "(760) 974-9000",
    address: "61738 29 Palms Hwy, Joshua Tree, CA 92252",
  },
  {
    name: "Snake Bite",
    desc: "Iconic desert hang-out, comfort food and cold drinks.",
    images: [
      `${G}/v1763153882/production/68df18d0ea1895d9005ea6ad/xc9rn7nrrvuajaomqa4c.jpg`,
      `${BASE}/2025/05/Hiking-Rock-Climbing.webp.webp`,
    ],
    website: "snakebitejtca.com",
    phone: "(760) 800-1015",
    address: "56426 29 Palms Hwy, Yucca Valley, CA",
  },
  {
    name: "Giant Rock Meeting Room",
    desc: "Venue with live music and more. Built into a site with a pioneering rock & roll history.",
    images: [
      `${BASE}/2025/05/Historic-film-set-turned-charming-Old-West-town.webp`,
      `${G}/v1768337449/production/68df18d0ea1895d9005ea6ad/nisb8jvpdap0tqocdzwu.jpg`,
    ],
    website: "giantrocksmeetingroom.com",
    phone: "(760) 873-5871",
    address: "5026 Old Mamie Coleman Springs Rd J14, Yucca Valley, CA",
  },
  {
    name: "Luna Bakery",
    desc: "Hand-made sourdough bread, perfect pastries and savory breakfast options.",
    images: [
      `${BASE}/2025/05/Frame-26.webp`,
      `${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`,
    ],
    website: "lunabakoughton.com",
    phone: "(760) 820-4433",
    address: "59744 29 Palms Hwy, Yucca Valley, CA 92284",
  },
  {
    name: "In Cahoots",
    desc: "The freshest bagels in town! Free delivery to 29 palms, Yucca, and Joshua Tree.",
    images: [
      `${G}/v1765152133/production/68df18d0ea1895d9005ea6ad/gkpt8qq78dfxkqu76hnm.jpg`,
      `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`,
    ],
    website: "29trains.com",
    phone: "(760) 501-1883",
    address: "61695 29 Palms Hwy, Joshua Tree, CA 92252",
  },
];

const activities = [
  {
    name: "Hiking & Rock Climbing",
    desc: "Explore scenic trails and challenging bouldering spots at Joshua Tree National Park.",
    images: [
      `${BASE}/2025/05/Hiking-Rock-Climbing.webp.webp`,
      `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`,
    ],
    website: "nps.gov/jotr",
    phone: "(760) 367-5500",
    address: "74485 National Park Drive, Twentynine Palms, CA 92277",
  },
  {
    name: "Off Roading & ATV Tours",
    desc: "Thrilling desert terrain tours — professionally guided and all gear included.",
    images: [
      `${G}/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg`,
      `${BASE}/2025/05/Hiking-Rock-Climbing.webp.webp`,
    ],
    website: "joshuatreeresources.com",
    phone: null,
    address: "Yucca Valley, CA",
  },
  {
    name: "Cascade Trails Mustang",
    desc: "Horseback tours with rescued Mustangs in the Mojave Desert.",
    images: [
      `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`,
      `${G}/v1763770623/production/68df18d0ea1895d9005ea6ad/rgojuyifdkefev9xs5ge.jpg`,
    ],
    website: "cascadetrailsmustang.com",
    phone: "(760) 361-1220",
    address: "6353 Cascade Road, Joshua Tree, CA 92252",
  },
  {
    name: "Integration Sound Bath",
    desc: "90-minute acoustic sound therapy experiences in the desert.",
    images: [
      `${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`,
      `${G}/v1763153882/production/68df18d0ea1895d9005ea6ad/xc9rn7nrrvuajaomqa4c.jpg`,
    ],
    website: "instagram.com",
    phone: "(760) 848-2918",
    address: "2477 Nallfield Drive, Landers, CA",
  },
  {
    name: "Stargazing",
    desc: "Night-time sky viewing in pristine desert dark skies — one of the best in the US.",
    images: [
      `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`,
      `${G}/v1768337449/production/68df18d0ea1895d9005ea6ad/nisb8jvpdap0tqocdzwu.jpg`,
    ],
    website: "stargazingtrees.com",
    phone: null,
    address: "Tricnear Eden Rd, Yucca Valley, CA 92284",
  },
  {
    name: "Pappy & Harriet's Live Music",
    desc: "Enjoy vibrant live music in a rustic Pioneertown saloon setting.",
    images: [
      `${BASE}/2025/05/Historic-film-set-turned-charming-Old-West-town.webp`,
      `${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`,
    ],
    website: "pappyandharriets.com",
    phone: "(760) 228-2222",
    address: "53688 Pioneertown Rd, Pioneertown, CA 92268",
  },
];

const attractions = [
  {
    name: "Joshua Tree National Park",
    desc: "Massive national park offering iconic desert landscapes, bouldering, and stargazing.",
    images: [
      `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`,
      `${BASE}/2025/05/Hiking-Rock-Climbing.webp.webp`,
    ],
    website: "nps.gov/jotr",
    phone: "(760) 367-5500",
    address: "74485 National Park Drive, Twentynine Palms, CA 92277",
  },
  {
    name: "Pioneertown",
    desc: "Historically famous, film set turned charming Old West town. Don't miss Mane Street.",
    images: [
      `${BASE}/2025/05/Historic-film-set-turned-charming-Old-West-town.webp`,
      `${G}/v1763770623/production/68df18d0ea1895d9005ea6ad/rgojuyifdkefev9xs5ge.jpg`,
    ],
    website: null,
    phone: null,
    address: "Pioneertown, CA",
  },
  {
    name: "Key's View",
    desc: "Dramatic large-scale landscape offering spectacular views of Coachella Valley. Highly recommended for sunset trips.",
    images: [
      `${G}/v1763153882/production/68df18d0ea1895d9005ea6ad/xc9rn7nrrvuajaomqa4c.jpg`,
      `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`,
    ],
    website: "nps.gov",
    phone: null,
    address: "Joshua Tree, CA",
  },
  {
    name: "Skull Rock",
    desc: "Named for the skull-shaped naturally occurring formation, a beloved selfie spot.",
    images: [
      `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`,
      `${G}/v1765152133/production/68df18d0ea1895d9005ea6ad/gkpt8qq78dfxkqu76hnm.jpg`,
    ],
    website: "nps.gov",
    phone: "(760) 367-5500",
    address: "Twentynine Palms, CA 92277",
  },
  {
    name: "Tramway",
    desc: "Dramatic large-scale mountain ride for amazing sunset views, and sculptures by Andreas Rogers.",
    images: [
      `${G}/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg`,
      `${BASE}/2025/05/Hiking-Rock-Climbing.webp.webp`,
    ],
    website: null,
    phone: null,
    address: "Tramway, CA",
  },
  {
    name: "Rhythm Of Life",
    desc: "Stunning large-scale sculpture at a mountain site for amazing sunset views, and sculptures. At the corner of Aberdeen Rd. and Old Woman Springs Road.",
    images: [
      `${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`,
      `${G}/v1763770623/production/68df18d0ea1895d9005ea6ad/rgojuyifdkefev9xs5ge.jpg`,
    ],
    website: "joshuatreeartists.com",
    phone: null,
    address: "Corner of Aberdeen Rd & Old Woman Springs Rd",
  },
  {
    name: "Pioneertown Pronto",
    desc: "Dramatic large-scale hike up a mountain side for amazing sunset views, and sculptures by Andreas Rogers.",
    images: [
      `${BASE}/2025/05/Historic-film-set-turned-charming-Old-West-town.webp`,
      `${G}/v1768337449/production/68df18d0ea1895d9005ea6ad/nisb8jvpdap0tqocdzwu.jpg`,
    ],
    website: "joshuatreehiking.com",
    phone: null,
    address: "Pioneertown, CA",
  },
];

const CATEGORIES = [
  { id: "restaurants", label: "Restaurants" },
  { id: "activities", label: "Activities" },
  { id: "attractions", label: "Attractions" },
];

// ── Card ──────────────────────────────────────────────────────────────────────
function PlaceCard({
  name,
  desc,
  images,
  website,
  phone,
  address,
}: {
  name: string;
  desc: string;
  images: string[];
  website: string | null;
  phone: string | null;
  address: string;
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#EDE8DF] hover:shadow-md transition-shadow duration-200">
      {/* Square image */}
      <div className="relative aspect-square overflow-hidden bg-[#EDE8DF]">
        <Image src={images[0]} alt={name} fill className="object-cover" unoptimized />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-[#1C1410] text-[15px] leading-snug mb-1">{name}</h3>
        <p className="text-[#8A7968] text-[12.5px] leading-[1.65] mb-3">{desc}</p>

        <div className="space-y-1.5">
          {website && (
            <a
              href={`https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-[12px] text-[#7B5B3A] hover:text-[#1C1410] transition-colors"
            >
              <FontAwesomeIcon icon={faGlobe} className="w-[11px] h-[11px] mt-[2px] shrink-0" />
              <span className="truncate">{website}</span>
            </a>
          )}
          {phone && (
            <div className="flex items-start gap-2 text-[12px] text-[#5A4A3A]">
              <FontAwesomeIcon icon={faPhone} className="w-[11px] h-[11px] mt-[2px] shrink-0 text-[#7B5B3A]" />
              <span>{phone}</span>
            </div>
          )}
          {address && (
            <div className="flex items-start gap-2 text-[12px] text-[#5A4A3A]">
              <FontAwesomeIcon icon={faLocationDot} className="w-[11px] h-[11px] mt-[2px] shrink-0 text-[#7B5B3A]" />
              <span className="leading-snug">{address}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
type Place = { name: string; desc: string; images: string[]; website: string | null; phone: string | null; address: string };

function Section({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: Place[];
}) {
  return (
    <section id={id} className="scroll-mt-[100px] py-12">
      <div className="max-w-[1120px] mx-auto px-6">
        <h2 className="font-[family-name:var(--font-playfair)] text-[#1C1410] text-[32px] font-normal mb-8">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <PlaceCard key={item.name} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LocalFavoritesPage() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: 360 }}>
        <div className="absolute inset-0">
          <Image
            src={`${BASE}/2025/05/Joshua-Tree-National-Park-.webp`}
            alt="Local favorites"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(20,10,4,0.72) 0%, rgba(20,10,4,0.78) 100%)" }} />
        </div>
        <div className="relative z-10 text-center px-6 py-20 w-full max-w-[640px] mx-auto">
          <h1
            className="font-[family-name:var(--font-playfair)] text-white font-normal mb-4"
            style={{ fontSize: "clamp(36px, 5vw, 52px)" }}
          >
            Local Favorites
          </h1>
          <p className="text-white/70 text-[15px] leading-[1.85] max-w-[440px] mx-auto mb-8">
            Discover local restaurants, unique activities and one-of-a-kind attractions that our team personally recommends.
          </p>
          {/* Filter pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollTo(cat.id)}
                className="px-5 py-2 rounded-full border border-white/40 text-white text-[13px] font-medium hover:bg-white hover:text-[#1C1410] transition-all duration-200 cursor-pointer"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <div className="bg-[#FAF8F5]">
        <Section id="restaurants" title="Restaurants" items={restaurants} />
        <div className="border-t border-[#EDE8DF]" />
        <Section id="activities" title="Activities" items={activities} />
        <div className="border-t border-[#EDE8DF]" />
        <Section id="attractions" title="Attractions" items={attractions} />
      </div>

      <Footer />
    </>
  );
}

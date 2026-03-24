import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const BASE = "https://thecohostcompany.com/wp-content/uploads";
const G = "https://assets.guesty.com/image/upload/w_900,q_auto,f_auto";

// ── Stylised publication name renderer ─────────────────────────────────────
function PubName({ name }: { name: string }) {
  const lower = name.toLowerCase();
  if (lower === "dwell")
    return <span className="font-[family-name:var(--font-playfair)] italic text-[22px] text-[#1C1410] tracking-tight">dwell</span>;
  if (lower === "netflix")
    return <span className="text-[20px] font-black tracking-[-0.02em] text-[#E50914]">NETFLIX</span>;
  if (lower === "afar")
    return <span className="font-[family-name:var(--font-playfair)] text-[20px] tracking-[0.18em] text-[#1C1410] uppercase">AFAR</span>;
  if (lower === "jetset")
    return <span className="text-[20px] font-light italic tracking-wide text-[#1C1410]">Jetset</span>;
  if (lower === "jones")
    return <span className="text-[20px] font-black tracking-[0.12em] text-[#1C1410] uppercase">JONES</span>;
  if (lower === "women")
    return <span className="text-[20px] font-bold tracking-[0.08em] text-[#1C1410] uppercase">WOMEN</span>;
  if (lower === "vrbo")
    return <span className="text-[20px] font-black tracking-[-0.01em] text-[#3D6BE8]">Vrbo</span>;
  if (lower === "territory")
    return <span className="text-[20px] font-black tracking-[0.14em] text-[#1C1410] uppercase">TERRITORY</span>;
  if (lower === "inside out")
    return <span className="font-[family-name:var(--font-playfair)] italic text-[20px] text-[#1C1410]">Inside Out</span>;
  if (lower.includes("palm springs"))
    return <span className="font-[family-name:var(--font-playfair)] text-[18px] tracking-[0.06em] text-[#7B5B3A] font-normal italic">Palm Springs Life</span>;
  if (lower.includes("travel") && lower.includes("leisure"))
    return <span className="text-[18px] font-semibold tracking-[0.04em] text-[#1C1410]">Travel + Leisure</span>;
  if (lower.includes("culture"))
    return <span className="text-[18px] font-semibold tracking-[0.1em] uppercase text-[#1C1410]">CULTURE TAGS</span>;
  if (lower.includes("travelblogger") || lower.includes("travel blogger"))
    return <span className="text-[18px] font-semibold text-[#1C1410]">TravelBlogger</span>;
  if (lower.includes("about your dream"))
    return <span className="font-[family-name:var(--font-playfair)] italic text-[18px] text-[#7B5B3A]">About Your Dream</span>;
  if (lower.includes("7 ") || lower === "7stars" || lower === "7 stars")
    return <span className="text-[18px] font-bold tracking-[0.06em] text-[#1C1410]">7 <span className="text-[#C4A882]">★</span> Travel</span>;
  if (lower.includes("field"))
    return <span className="text-[18px] font-bold tracking-[0.12em] uppercase text-[#1C1410]">FIELD</span>;
  if (lower.includes("design") || lower.includes("dezeen"))
    return <span className="font-[family-name:var(--font-playfair)] text-[18px] italic text-[#1C1410]">{name}</span>;
  if (lower.includes("de la mer") || lower.includes("provence"))
    return <span className="font-[family-name:var(--font-playfair)] text-[18px] italic tracking-wide text-[#7B5B3A]">{name}</span>;
  return <span className="text-[18px] font-semibold tracking-[0.06em] text-[#1C1410] uppercase">{name}</span>;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const logoNames = ["dwell", "WOMEN", "7 Stars", "AFAR", "Jetset", "JONES"];

const articles = [
  {
    publication: "Palm Springs Life",
    headline: "The High Desert Airbnb Game",
    excerpt: "The Cohost Company founders were recognized for their deep understanding of the Joshua Tree market, offering a data-driven approach that delivers returns and peace of mind to property owners.",
    img: `${G}/v1763770623/production/68df18d0ea1895d9005ea6ad/rgojuyifdkefev9xs5ge.jpg`,
    href: "#",
  },
  {
    publication: "Netflix",
    headline: "The World's Most Amazing Vacation Rentals",
    excerpt: "The Outlaw in Pioneertown was featured on Netflix for its stunning design and unforgettable guest experience — placing it among the most recognized vacation homes in the world.",
    img: `${G}/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg`,
    href: "#",
  },
  {
    publication: "dwell",
    headline: "16 Ultimate Joshua Tree Airbnbs",
    excerpt: "Dwell named Cielito Lindo Retreat among the greatest desert escapes in California for its hot tub sunken into a wraparound infinity deck and breathtaking High Desert views.",
    img: `${G}/v1765152133/production/68df18d0ea1895d9005ea6ad/gkpt8qq78dfxkqu76hnm.jpg`,
    href: "#",
  },
  {
    publication: "Travel + Leisure",
    headline: "Best Desert Vacation Rentals in the American Southwest",
    excerpt: "The Cohost Company's portfolio was highlighted as a benchmark for quality and hospitality in the short-term rental industry across the High Desert region.",
    img: `${G}/v1763153882/production/68df18d0ea1895d9005ea6ad/xc9rn7nrrvuajaomqa4c.jpg`,
    href: "#",
  },
  {
    publication: "Culture Tags",
    headline: "Why Joshua Tree is the New Palm Springs",
    excerpt: "Culture Tags explored the rising appeal of the Hi-Desert, citing The Cohost Company's collection of design-driven properties as central to the shift in traveler preferences.",
    img: `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`,
    href: "#",
  },
  {
    publication: "Vrbo",
    headline: "Most Wishlisted Properties on Vrbo — Desert Edition",
    excerpt: "Three Cohost Company properties appeared in Vrbo's annual roundup of the most saved and wishlisted vacation rentals across Southern California.",
    img: `${G}/v1768337449/production/68df18d0ea1895d9005ea6ad/nisb8jvpdap0tqocdzwu.jpg`,
    href: "#",
  },
  {
    publication: "TravelBlogger",
    headline: "The Outlaw: A Pioneertown Icon You Have to Experience",
    excerpt: "An immersive feature reviewing The Outlaw — from the cowboy-boot tub to the fire pit under desert stars — named it one of the most memorable rental experiences in the US.",
    img: `${BASE}/2025/05/Historic-film-set-turned-charming-Old-West-town.webp`,
    href: "#",
  },
  {
    publication: "TravelBlogger",
    headline: "10 Desert Stays That Will Make You Never Want to Leave",
    excerpt: "Whistling Rock and Boulders Gate were featured as top picks for guests seeking secluded luxury in the Yucca Valley and Joshua Tree corridor.",
    img: `${BASE}/2025/05/YV-Whistling-Rock-01.webp`,
    href: "#",
  },
  {
    publication: "Inside Out",
    headline: "Desert Modernism: Inside the High Desert's Most Distinctive Homes",
    excerpt: "A design deep-dive into the interiors and architecture of Cohost Company-managed properties, celebrating mid-century and brutalist vernacular design in the Mojave.",
    img: `${G}/v1763770623/production/68df18d0ea1895d9005ea6ad/rgojuyifdkefev9xs5ge.jpg`,
    href: "#",
  },
  {
    publication: "About Your Dream",
    headline: "Living the Dream: Passive Income Through Short-Term Rentals",
    excerpt: "About Your Dream interviewed The Cohost Company founders on how they help property owners build income-producing vacation homes without lifting a finger.",
    img: `${G}/v1765152133/production/68df18d0ea1895d9005ea6ad/gkpt8qq78dfxkqu76hnm.jpg`,
    href: "#",
  },
  {
    publication: "7 Stars",
    headline: "7 Rentals That Deliver a Truly 5-Star Desert Experience",
    excerpt: "Seven standout desert stays were curated for travelers who refuse to compromise — with two Cohost Company properties earning top honors for hospitality and design.",
    img: `${BASE}/2025/05/Hiking-Rock-Climbing.webp.webp`,
    href: "#",
  },
  {
    publication: "JONES",
    headline: "The Modern Joshua Tree: Design-Led Rentals Redefining Hospitality",
    excerpt: "JONES profiled The Cohost Company's approach to pairing thoughtful interior design with seamless property management, earning praise for setting a new industry standard.",
    img: `${G}/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg`,
    href: "#",
  },
  {
    publication: "Territory",
    headline: "The Untamed Allure of Joshua Tree's Luxury Rental Scene",
    excerpt: "Territory magazine explored why Joshua Tree has become one of the fastest-growing luxury vacation rental markets in the US, with The Cohost Company leading the charge.",
    img: `${G}/v1763153882/production/68df18d0ea1895d9005ea6ad/xc9rn7nrrvuajaomqa4c.jpg`,
    href: "#",
  },
  {
    publication: "WOMEN",
    headline: "Women in Real Estate: Building an Airbnb Empire in the Desert",
    excerpt: "WOMEN magazine spotlighted the women behind The Cohost Company's growth story, celebrating their role in redefining the short-term rental landscape in the High Desert.",
    img: `${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`,
    href: "#",
  },
  {
    publication: "De La Mer + Provence",
    headline: "Where the Desert Meets Luxury: The Cohost Company's Vision",
    excerpt: "An editorial feature celebrating the brand's aesthetic and hospitality philosophy — blending rustic desert character with elevated modern comfort.",
    img: `${G}/v1768337449/production/68df18d0ea1895d9005ea6ad/nisb8jvpdap0tqocdzwu.jpg`,
    href: "#",
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────
export default function PressPage() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="relative h-[360px] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src={`${G}/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg`}
            alt="Press"
            fill
            priority
            className="object-cover object-top"
            unoptimized
          />
          <div className="absolute inset-0 bg-[#0D0603]/78" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1
            className="font-[family-name:var(--font-playfair)] text-white font-normal tracking-[0.18em] uppercase"
            style={{ fontSize: "clamp(48px, 7vw, 80px)" }}
          >
            Press
          </h1>
        </div>
      </section>

      {/* ── PUBLICATION LOGOS STRIP ── */}
      <div className="bg-[#FAF8F5] border-b border-[#EDE8DF] py-7">
        <div className="max-w-[1000px] mx-auto px-8 flex items-center justify-center gap-8 flex-wrap">
          {logoNames.map((name) => (
            <div key={name} className="opacity-50 hover:opacity-90 transition-opacity">
              <PubName name={name} />
            </div>
          ))}
        </div>
      </div>

      {/* ── ARTICLES ── */}
      <section className="bg-[#FAF8F5] py-6">
        <div className="max-w-[900px] mx-auto px-6">
          {articles.map((article, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 sm:grid-cols-[1fr_280px] gap-8 items-center py-12 ${
                i < articles.length - 1 ? "border-b border-[#EDE8DF]" : ""
              }`}
            >
              {/* Left: text */}
              <div>
                <div className="mb-4">
                  <PubName name={article.publication} />
                </div>
                <h2
                  className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal leading-[1.3] mb-4"
                  style={{ fontSize: "clamp(18px, 2.2vw, 24px)" }}
                >
                  {article.headline}
                </h2>
                <p className="text-[14px] text-[#6A5A4A] leading-[1.85] mb-6">
                  {article.excerpt}
                </p>
                <Link
                  href={article.href}
                  className="inline-block px-5 py-2 border border-[#7B5B3A] text-[#7B5B3A] text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-[#7B5B3A] hover:text-white transition-colors rounded-sm"
                >
                  Read More
                </Link>
              </div>

              {/* Right: image */}
              <div className="relative h-[200px] sm:h-[180px] rounded-xl overflow-hidden bg-[#EDE8DF] shadow-sm">
                <Image
                  src={article.img}
                  alt={article.headline}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRESS INQUIRY ── */}
      <section className="py-16 bg-[#1C1410] text-center">
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#C4A882] font-semibold mb-4">Media</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-white font-normal mb-4"
            style={{ fontSize: "clamp(26px, 3.5vw, 38px)" }}>
            Press Inquiries
          </h2>
          <p className="text-white/65 text-[15px] mb-7 max-w-[420px] mx-auto leading-[1.85]">
            Interested in featuring The Cohost Company? We&apos;d love to connect.
          </p>
          <Link
            href="mailto:reservations@thecohostcompany.com"
            className="inline-block px-9 py-3.5 border border-white/40 text-white text-[12px] font-semibold tracking-[0.14em] uppercase hover:bg-white hover:text-[#1C1410] transition-colors rounded-sm"
          >
            reservations@thecohostcompany.com
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

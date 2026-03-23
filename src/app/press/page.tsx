import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const BASE = "https://thecohostcompany.com/wp-content/uploads";
const G = "https://assets.guesty.com/image/upload/w_1200,q_auto,f_auto";

const pressLogos = [
  { name: "Logo-01", src: `${BASE}/2025/05/Logo-01.svg`, cls: "h-7 w-32" },
  { name: "Logo-02", src: `${BASE}/2025/05/Logo-02.svg`, cls: "h-7 w-40" },
  { name: "Logo-03", src: `${BASE}/2025/05/Logo-03.svg`, cls: "h-5 w-20" },
  { name: "Logo-04", src: `${BASE}/2025/05/Logo-04.svg`, cls: "h-5 w-20" },
  { name: "Logo-05", src: `${BASE}/2025/05/Logo-05.svg`, cls: "h-5 w-20" },
];

const pressArticles = [
  {
    publication: "Netflix",
    logo: `${BASE}/2025/05/Logo-01.svg`,
    headline: "The World's Most Amazing Vacation Rentals",
    excerpt: "The Outlaw in Pioneertown was featured on Netflix for its stunning design and unforgettable guest experience.",
    property: "The Outlaw",
    propertyImg: `${G}/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg`,
    link: "#",
    type: "feature",
  },
  {
    publication: "Dwell",
    logo: `${BASE}/2025/05/Logo-02.svg`,
    headline: "16 Ultimate Joshua Tree Airbnbs",
    excerpt: "Cielito Lindo Retreat was named among Dwell's picks for its hot tub sunken into a wraparound infinity deck.",
    property: "Cielito Lindo Retreat",
    propertyImg: `${G}/listing_images_s3/production/property-photos/37fbd8d6503184919d1773d505e2608c62d0958500918990/68e0a688f84fbf0012f27c1d/36e485f6-d6a2-4a-vArrg`,
    link: "#",
    type: "feature",
  },
  {
    publication: "Condé Nast Traveler",
    logo: `${BASE}/2025/05/Logo-03.svg`,
    headline: "Best Desert Escapes in Southern California",
    excerpt: "The Cohost Company's portfolio of thoughtfully managed homes was highlighted for exceptional design and service.",
    property: null,
    propertyImg: null,
    link: "#",
    type: "mention",
  },
  {
    publication: "VICE",
    logo: `${BASE}/2025/05/Logo-04.svg`,
    headline: "The Wildest Houses You Can Rent in Joshua Tree",
    excerpt: "The Artanis and Mod West Ranch were featured in VICE's roundup of the most extraordinary short-term rentals in the High Desert.",
    property: "The Artanis Villa",
    propertyImg: `${G}/v1763770623/production/68df18d0ea1895d9005ea6ad/rgojuyifdkefev9xs5ge.jpg`,
    link: "#",
    type: "feature",
  },
  {
    publication: "Palm Springs Life",
    logo: `${BASE}/2025/05/Logo-05.svg`,
    headline: "The High Desert Airbnb Game",
    excerpt: "A deep-dive into The Cohost Company's model of partnering with homeowners and cash-flow investors to manage and market high-end desert rentals.",
    property: null,
    propertyImg: null,
    link: "#",
    type: "feature",
  },
  {
    publication: "Big Seven Travel",
    logo: `${BASE}/2025/05/Logo-01.svg`,
    headline: "Most Instagrammable Desert Rentals",
    excerpt: "Whistling Rock and Boulders Gate were named among the most share-worthy properties in the American Southwest.",
    property: "Boulders Gate",
    propertyImg: `${G}/v1765152133/production/68df18d0ea1895d9005ea6ad/gkpt8qq78dfxkqu76hnm.jpg`,
    link: "#",
    type: "feature",
  },
  {
    publication: "Lodgify",
    logo: `${BASE}/2025/05/Logo-02.svg`,
    headline: "15 Social Media Stars Inspiring Vacation Rental Hosts in 2023",
    excerpt: "The Cohost Company was included among Lodgify's top vacation rental hosts driving the industry forward.",
    property: null,
    propertyImg: null,
    link: "#",
    type: "award",
  },
  {
    publication: "Whimsy Soul",
    logo: `${BASE}/2025/05/Logo-03.svg`,
    headline: "The Gaslight: 360° Views Atop a Joshua Tree Hillside",
    excerpt: "An in-depth feature on The Gaslight, one of The Cohost Company's most dramatic and design-forward properties.",
    property: null,
    propertyImg: null,
    link: "#",
    type: "feature",
  },
  {
    publication: "Field Magazine",
    logo: `${BASE}/2025/05/Logo-04.svg`,
    headline: "Desert Living Done Right",
    excerpt: "The Cohost Company's approach to high-desert hospitality was celebrated as a model for the modern vacation rental industry.",
    property: null,
    propertyImg: null,
    link: "#",
    type: "mention",
  },
];

export default function PressPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="relative h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`${BASE}/2025/05/Joshua-Tree-National-Park-.webp`}
            alt="Press"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-[#1C0A04]/72" />
        </div>
        <div className="relative z-10 max-w-[1120px] mx-auto px-8 w-full text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#C4A882] font-semibold mb-5">Media</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-white font-normal text-[72px] leading-[1.0] mb-5">
            Press
          </h1>
          <p className="text-white/80 text-[17px] leading-[1.75] max-w-[560px] mx-auto">
            As featured in top publications across travel, design, and hospitality—here&apos;s what the world is saying about us.
          </p>
        </div>
      </section>

      {/* Featured publications strip */}
      <div className="bg-white border-b border-[#EDE8DF] py-8">
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="text-center text-[10px] tracking-[0.25em] uppercase text-[#8A7968] mb-6">Featured In</p>
          <div className="flex items-center justify-center gap-10 flex-wrap">
            {pressLogos.map((logo) => (
              <div key={logo.name} className={`relative ${logo.cls} opacity-40 hover:opacity-70 transition-opacity`}>
                <Image src={logo.src} alt={logo.name} fill className="object-contain" unoptimized />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Press articles grid */}
      <section className="py-24 bg-[#F7F4EF]">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-3">Coverage</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[44px] font-normal text-[#1C1410] leading-[1.1]">
              Press Features
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pressArticles.map((article, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                {article.propertyImg && (
                  <div className="relative h-[200px] overflow-hidden">
                    <Image src={article.propertyImg} alt={article.property || article.publication} fill className="object-cover hover:scale-105 transition-transform duration-700" unoptimized />
                    {article.type === "award" && (
                      <span className="absolute top-3 left-3 bg-[#7B5B3A] text-white text-[10px] font-semibold tracking-[0.08em] uppercase px-3 py-1.5 rounded-full">Award</span>
                    )}
                  </div>
                )}
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative h-5 w-20 opacity-60">
                      <Image src={article.logo} alt={article.publication} fill className="object-contain object-left" unoptimized />
                    </div>
                    {!article.propertyImg && (
                      <span className={`text-[10px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full ${article.type === "award" ? "bg-[#7B5B3A] text-white" : "bg-[#F7F4EF] text-[#8A7968]"}`}>
                        {article.type === "award" ? "Award" : article.publication}
                      </span>
                    )}
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-[18px] font-normal text-[#1C1410] leading-snug mb-3">
                    {article.headline}
                  </h3>
                  <p className="text-[13px] text-[#8A7968] leading-[1.8] mb-5">{article.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <Link href={article.link} className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[#7B5B3A] hover:underline">
                      View Article →
                    </Link>
                    {article.property && (
                      <>
                        <span className="text-[#D0C8BD]">|</span>
                        <Link href="/stays" className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[#8A7968] hover:text-[#7B5B3A] hover:underline">
                          Book {article.property} →
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press inquiry CTA */}
      <section className="py-16 bg-[#3D1810] text-center">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-[38px] font-normal text-white mb-4">
            Press Inquiries
          </h2>
          <p className="text-white/75 text-[16px] mb-8 max-w-[480px] mx-auto">
            Interested in featuring The Cohost Company? We&apos;d love to connect with you.
          </p>
          <Link
            href="mailto:reservations@thecohostcompany.com"
            className="inline-block px-10 py-4 border border-white text-white text-[12px] font-semibold tracking-[0.15em] uppercase hover:bg-white hover:text-[#1C1410] transition-colors"
          >
            reservations@thecohostcompany.com
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const BASE = "https://thecohostcompany.com/wp-content/uploads";

const values = [
  "Trust", "Support", "Peace-of-Mind", "Expertise",
  "Visibility", "Care", "Consistency", "Growth",
];

const qualities = ["Reliable", "Experienced", "Transparent", "Detail-Oriented", "Proactive"];

const team = [
  { name: "Cassie Cortright", title: "Chief Operating Officer", photo: `${BASE}/2025/12/LLA-Photos-54.jpg` },
  { name: "Paige", title: "Operations Manager", photo: `${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp` },
  { name: "Shannon Rohland", title: "Cleaning Manager", photo: `${BASE}/2025/12/LLA-Photos-07.jpg` },
  { name: "Eric", title: "Senior Property Lead", photo: `${BASE}/2025/05/Hosting-1.webp` },
  { name: "Scott Greenwald", title: "Property Lead", photo: `${BASE}/2025/05/Work-With-US.webp` },
  { name: "Alyssa", title: "Property Lead", photo: `${BASE}/2025/05/2Container-1.webp` },
];

export default function AboutPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="relative h-[480px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`}
            alt="The Cohost Team"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,9,5,0.82) 40%, rgba(15,9,5,0.35) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-[1120px] mx-auto px-8 w-full">
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/60 mb-4">About Us</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-white font-normal text-[64px] leading-[1.05] mb-5">
            Get to know us
          </h1>
          <p className="text-white/85 text-[17px] leading-[1.75] max-w-[520px] mb-8">
            Meet the team behind The Cohost Company. We treat every stay like it&apos;s our own—offering guests a seamless experience while providing 5-star service through full-service hospitality and care.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 bg-[#7B5B3A] text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-[#5A3E28] transition-colors"
          >
            Contact Us →
          </Link>
        </div>
      </section>

      {/* Heritage banner */}
      <div className="bg-[#3D1810] py-5">
        <div className="max-w-[1120px] mx-auto px-8 flex items-center justify-center gap-3">
          <div className="w-16 h-px bg-[#C4A882]/50" />
          <p className="text-[13px] tracking-[0.2em] uppercase text-[#C4A882] font-medium text-center">
            Pioneering Airbnb in Joshua Tree since 2014
          </p>
          <div className="w-16 h-px bg-[#C4A882]/50" />
        </div>
      </div>

      {/* Owners */}
      <section className="py-24 bg-[#F7F4EF]">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-3">Leadership</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[48px] font-normal text-[#1C1410] leading-[1.1]">
              The Founders
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Josh */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-[360px]">
                <Image
                  src={`${BASE}/2025/12/LLA-Photos-07.jpg`}
                  alt="Josh"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
              <div className="p-8">
                <h3 className="font-[family-name:var(--font-playfair)] text-[32px] font-normal text-[#1C1410] mb-1">Josh</h3>
                <p className="text-[13px] tracking-[0.12em] uppercase text-[#8A7968] font-semibold mb-4">Co-Founder & CEO</p>
                <p className="text-[15px] text-[#5A4A3A] leading-[1.85]">
                  Focused on operational efficiency and scale, Josh leads the day-to-day management and growth strategy of The Cohost Company, ensuring every property and guest experience meets the highest standard.
                </p>
              </div>
            </div>
            {/* Patryk */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-[360px]">
                <Image
                  src={`${BASE}/2025/12/LLA-Photos-54.jpg`}
                  alt="Patryk Swietek"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
              <div className="p-8">
                <h3 className="font-[family-name:var(--font-playfair)] text-[32px] font-normal text-[#1C1410] mb-1">Patryk Swietek</h3>
                <p className="text-[13px] tracking-[0.12em] uppercase text-[#8A7968] font-semibold mb-4">Co-Founder & Vacation Rental Industry Thought Leader</p>
                <p className="text-[15px] text-[#5A4A3A] leading-[1.85]">
                  A recognized voice in the vacation rental industry, Patryk shapes The Cohost Company&apos;s brand, strategy, and community. Follow him for insights on hospitality, travel, and building the future of short-term rentals.
                </p>
                <div className="flex gap-3 mt-5">
                  <Link href="https://linkedin.com" target="_blank" className="w-9 h-9 rounded-full bg-[#7B5B3A] flex items-center justify-center text-white hover:bg-[#5A3E28] transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                  </Link>
                  <Link href="https://instagram.com" target="_blank" className="w-9 h-9 rounded-full bg-[#7B5B3A] flex items-center justify-center text-white hover:bg-[#5A3E28] transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                  </Link>
                  <Link href="https://youtube.com" target="_blank" className="w-9 h-9 rounded-full bg-[#7B5B3A] flex items-center justify-center text-white hover:bg-[#5A3E28] transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.96C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full team */}
      <section className="py-20 bg-white">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-3">Our People</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[44px] font-normal text-[#1C1410] leading-[1.1]">
              The Team
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-full aspect-square rounded-full overflow-hidden mb-4 border-2 border-[#EDE8DF]">
                  <Image src={member.photo} alt={member.name} fill className="object-cover" unoptimized />
                </div>
                <h4 className="font-[family-name:var(--font-playfair)] text-[15px] font-normal text-[#1C1410] mb-1 leading-snug">{member.name}</h4>
                <p className="text-[11px] text-[#8A7968] leading-snug">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-3">What We Stand For</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[44px] font-normal text-[#1C1410] leading-[1.1]">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {values.map((value) => (
              <div key={value} className="bg-white rounded-xl px-6 py-8 text-center shadow-sm">
                <div className="w-8 h-px bg-[#C4A882] mx-auto mb-5" />
                <p className="text-[13px] tracking-[0.18em] uppercase text-[#7B5B3A] font-semibold">{value}</p>
                <div className="w-8 h-px bg-[#C4A882] mx-auto mt-5" />
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {qualities.map((q) => (
              <span key={q} className="px-5 py-2.5 border border-[#C4A882] text-[#7B5B3A] text-[13px] tracking-[0.12em] uppercase font-semibold rounded-full">
                {q}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage full-bleed */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`${BASE}/2025/05/Joshua-Tree-National-Park-.webp`}
            alt="Joshua Tree National Park"
            fill
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-[#1C0A04]/75" />
        </div>
        <div className="relative z-10 max-w-[1120px] mx-auto px-8 text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#C4A882] font-semibold mb-5">Our Heritage</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[54px] font-normal text-white leading-[1.1] mb-6">
            Pioneering Airbnb in Joshua Tree
          </h2>
          <p className="text-white/80 text-[17px] leading-[1.75] max-w-[600px] mx-auto mb-10">
            Since 2014, we&apos;ve been at the forefront of short-term rental hospitality in the High Desert—building a portfolio of thoughtfully managed homes and a reputation for exceptional guest experiences.
          </p>
          <Link href="/stays" className="inline-block px-10 py-4 border border-white text-white text-[12px] font-semibold tracking-[0.15em] uppercase hover:bg-white hover:text-[#1C1410] transition-colors">
            Browse Our Stays →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

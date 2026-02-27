import Link from "next/link";
import Image from "next/image";

const BASE = "https://thecohostcompany.com/wp-content/uploads";

const phoneImages = [
  { src: `${BASE}/2025/05/La-Copine-1.webp`, alt: "La Copine" },
  { src: `${BASE}/2025/05/Pappy-Harrietts.jpg`, alt: "Pappy & Harriet's" },
  { src: `${BASE}/2025/05/Frame-26.webp`, alt: "Live music" },
  { src: `${BASE}/2025/05/Hiking-Rock-Climbing.webp.webp`, alt: "Hiking" },
  { src: `${BASE}/2025/05/Joshua-Tree-National-Park-.webp`, alt: "Joshua Tree NP" },
  { src: `${BASE}/2025/05/Historic-film-set-turned-charming-Old-West-town.webp`, alt: "Pioneertown" },
];

export default function LocalFavorites() {
  return (
    <section className="relative overflow-hidden h-[680px]">
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <Image
          src={`${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`}
          alt="Local Desert backdrop"
          fill
          className="object-cover object-center"
          unoptimized
        />
        <div className="absolute inset-0 bg-[#1C0A04]/82" />
      </div>

      {/* Two-column grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Col 1 — text card */}
        <div className="flex items-center justify-center p-10 lg:p-12">
          <div
            className="rounded-2xl p-8 max-w-[320px] text-center lg:text-left"
            style={{ background: "rgba(55, 22, 8, 0.65)", backdropFilter: "blur(6px)" }}
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-[42px] font-normal text-white leading-[1.1] mb-5">
              Local Favorites
            </h2>
            <p className="text-[14px] text-white/80 leading-[1.85] mb-7">
              Whether you&apos;re unwinding in the High Desert or escaping to
              the forests of Broken Bow, each of our properties is surrounded by
              experiences worth exploring. From scenic trails and outdoor
              adventures to cozy cafés and local gems, your perfect stay starts
              right outside the door.
            </p>
            <Link
              href="/guidebook"
              className="inline-block px-7 py-3 bg-[#1C0E06] text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-black transition-colors rounded-sm"
            >
              Learn More →
            </Link>
          </div>
        </div>

        {/* Col 2 — phone mockup with image grid */}
        <div className="hidden lg:flex items-center justify-center p-8">
          <div className="relative w-[250px] h-[500px] bg-white rounded-[38px] border-[6px] border-[#111] shadow-2xl overflow-hidden flex flex-col">
            {/* Phone notch */}
            <div className="shrink-0 h-6 bg-white flex items-center justify-center">
              <div className="w-20 h-4 bg-[#111] rounded-full" />
            </div>
            {/* 2×3 image grid fills rest of phone */}
            <div className="flex-1 grid grid-cols-2 grid-rows-3 overflow-hidden">
              {phoneImages.map((img) => (
                <div key={img.src} className="relative overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

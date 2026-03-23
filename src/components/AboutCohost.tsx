import Link from "next/link";
import Image from "next/image";

const G = "https://assets.guesty.com/image/upload/w_1200,q_auto,f_auto";
const BASE = "https://thecohostcompany.com/wp-content/uploads";

export default function AboutCohost() {
  return (
    <section id="about" className="py-28 bg-[#F7F4EF]">
      <div className="max-w-[1120px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left: Text */}
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-5">
            About
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[58px] font-normal text-[#1C1410] leading-[1.05] mb-4">
            The Cohost
          </h2>
          <p className="font-[family-name:var(--font-playfair)] text-[17px] text-[#7B5B3A] mb-7 leading-snug">
            Pioneertown · Joshua Tree · Yucca Valley And Beyond
          </p>
          <p className="text-[15px] text-[#5A4A3A] leading-[1.85] mb-10">
            Whether you&apos;re a guest searching for the perfect desert escape
            or a homeowner ready to turn your space into a top-tier rental, The
            Cohost Company is here for you. We thoughtfully manage unique stays
            across Joshua Tree and the High Desert—combining local care, expert
            hosting, and beautiful design so every experience feels personal,
            seamless, and memorable.
          </p>
          <Link
            href="/about"
            className="inline-block px-8 py-3.5 bg-[#7B5B3A] text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-[#5A3E28] transition-colors"
          >
            Learn More →
          </Link>
        </div>

        {/* Right: Star of David geometric photo collage */}
        <div className="relative flex items-center justify-center h-[520px]">
          {/* Decorative star outline watermark */}
          <svg
            viewBox="0 0 420 480"
            className="absolute inset-0 w-full h-full"
            fill="none"
            aria-hidden
          >
            {/* Triangle pointing up — outline */}
            <polygon
              points="210,18 398,352 22,352"
              stroke="#C4A882"
              strokeWidth="1.2"
              fill="none"
              opacity="0.25"
            />
            {/* Triangle pointing down — outline */}
            <polygon
              points="210,462 22,128 398,128"
              stroke="#C4A882"
              strokeWidth="1.2"
              fill="none"
              opacity="0.25"
            />
          </svg>

          {/* Photo collage: two overlapping triangular clips */}
          <div className="relative w-[340px] h-[392px]">
            {/* Triangle pointing up — desert landscape (Boulders Gate) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: "polygon(50% 0%, 0% 73%, 100% 73%)" }}
            >
              <Image
                src={`${G}/v1765152133/production/68df18d0ea1895d9005ea6ad/gkpt8qq78dfxkqu76hnm.jpg`}
                alt="High Desert property"
                fill
                className="object-cover object-center scale-110"
              />
            </div>

            {/* Triangle pointing down — property aerial (The Outlaw) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: "polygon(50% 100%, 0% 27%, 100% 27%)" }}
            >
              <Image
                src={`${G}/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg`}
                alt="The Outlaw aerial"
                fill
                className="object-cover object-center scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

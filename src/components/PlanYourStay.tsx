import Link from "next/link";
import Image from "next/image";

export default function PlanYourStay() {
  return (
    <section className="relative h-[420px] flex items-center overflow-hidden">
      {/* Background collage */}
      <div className="absolute inset-0 grid grid-cols-[1fr_1.4fr]">
        <div className="relative">
          <Image
            src="https://thecohostcompany.com/wp-content/uploads/2025/05/Hosting-1.webp"
            alt="Property lifestyle"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="relative">
          <Image
            src="https://thecohostcompany.com/wp-content/uploads/2025/11/Featured-Image-The-Cohost.webp"
            alt="The Cohost desert stay"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Dark overlay on right side */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent" />

      {/* Content – right aligned */}
      <div className="relative z-10 w-full max-w-[1120px] mx-auto px-10 flex justify-end">
        <div className="text-center text-white max-w-[400px]">
          <h2 className="font-[family-name:var(--font-playfair)] text-[50px] font-normal leading-[1.15] mb-8">
            Plan Your Stay<br />with us today!
          </h2>
          <Link
            href="#stays"
            className="inline-block px-12 py-4 border border-white text-white text-[12px] font-semibold tracking-[0.15em] uppercase hover:bg-white hover:text-[#1C1410] transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Real press logos */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center items-center gap-6 opacity-70">
        {[1,2,3,4,5].map((n) => (
          <div key={n} className="relative h-4 w-16 brightness-0 invert">
            <Image
              src={`https://thecohostcompany.com/wp-content/uploads/2025/05/Logo-0${n}.svg`}
              alt={`Press logo ${n}`}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        ))}
      </div>
    </section>
  );
}

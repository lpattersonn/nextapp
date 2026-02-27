"use client";
import { useState } from "react";
import Image from "next/image";

const BASE = "https://thecohostcompany.com/wp-content/uploads";

const teamPhotos = [
  { src: `${BASE}/2025/12/LLA-Photos-54.jpg`, alt: "The Cohost Team" },
  { src: `${BASE}/2025/12/LLA-Photos-07.jpg`, alt: "The Cohost Team" },
  { src: `${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`, alt: "The Cohost Team" },
];

export default function ThankYou() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + teamPhotos.length) % teamPhotos.length);
  const next = () => setCurrent((c) => (c + 1) % teamPhotos.length);

  return (
    <section className="py-24 bg-[#F9F7F4]">
      <div className="max-w-[1240px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Text */}
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-3">
            The Cohost Company
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[48px] font-normal text-[#1C1410] leading-[1.1] mb-8">
            Thank you!
          </h2>
          <div className="space-y-4 text-[15px] text-[#8A7968] leading-[1.9]">
            <p>
              We&apos;re so glad you chose one of our homes for your time in
              the High Desert. Whether you&apos;re here for rest, adventure, or
              inspiration, we hope your stay offers a little of everything this
              magical place has to offer.
            </p>
            <p>
              Each home we manage is thoughtfully cared for by our local team —
              professionally hosted but never impersonal. We believe in creating
              beautiful, welcoming spaces where guests feel at home, and owners
              feel proud to share them.
            </p>
            <p>
              As locals, we&apos;re always nearby if you need anything. And if
              you&apos;re loving your stay, don&apos;t hesitate to tag us or
              leave a review — your feedback means the world.
            </p>
            <p>
              Thanks again for being here. We can&apos;t wait to host you again
              soon.
            </p>
            <p>With love and gratitude,</p>
          </div>
          <div className="mt-7">
            <div className="font-[family-name:var(--font-playfair)] italic text-[28px] text-[#7B5B3A] mb-1">
              Josh &amp; Patryk
            </div>
            <div className="text-[11px] tracking-[0.12em] uppercase text-[#8A7968] font-semibold">
              The Cohost Team
            </div>
          </div>
        </div>

        {/* Team photo carousel */}
        <div className="relative h-[520px] rounded-[4px] overflow-hidden group">
          <Image
            key={current}
            src={teamPhotos[current].src}
            alt={teamPhotos[current].alt}
            fill
            className="object-cover object-center"
            unoptimized
          />

          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-md"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3A2F25" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-md"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3A2F25" strokeWidth="2" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {teamPhotos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Photo ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white w-5" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

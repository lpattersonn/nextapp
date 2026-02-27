import Link from "next/link";

const cards = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 4 L29 28 H5 Z" />
        <path d="M11 28 L17 14 L23 28" />
      </svg>
    ),
    title: "Desert Comfort Redefined",
    body: "From modern desert retreats to vintage-inspired hideaways, every home is thoughtfully designed and fully equipped for your comfort. Enjoy plush beds, curated interiors, stocked kitchens, and outdoor spaces made for stargazing.",
    cta: "Book Your Getaway →",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="7" width="24" height="21" rx="2" />
        <path d="M5 13 H29" />
        <path d="M11 4 V10 M23 4 V10" />
      </svg>
    ),
    title: "Personalize Your Stay",
    body: "Whether you're celebrating or simply escaping, we make your stay feel special. From pre-arrival setups to romantic add-ons, we're happy to personalize your experience. Let us handle the details — so you can just enjoy.",
    cta: "Customize Your Stay →",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13" cy="13" r="6" />
        <circle cx="23" cy="13" r="6" />
        <path d="M5 30 C5 23 9 19 17 19 C25 19 29 23 29 30" />
      </svg>
    ),
    title: "The Cohost Community",
    body: "Get early access to new stays, exclusive offers, and insider tips from our local team. Join our community of curious travelers and desert dreamers — we'd love to host you.",
    cta: "Join Us Here →",
  },
];

export default function WhatWeOffer() {
  return (
    <section className="py-24 bg-[#F7F4EF]">
      <div className="max-w-[1240px] mx-auto px-10">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-3">
            Discover Adventure and Relaxation
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[44px] font-normal text-[#1C1410] leading-[1.15]">
            What we offer
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-14">
          {cards.map((card) => (
            <div key={card.title} className="bg-white rounded-[4px] p-9">
              <div className="text-[#7B5B3A] mb-5">{card.icon}</div>
              <h3 className="font-[family-name:var(--font-playfair)] text-[20px] font-medium text-[#1C1410] mb-4 leading-snug">
                {card.title}
              </h3>
              <p className="text-[14px] text-[#8A7968] leading-[1.85] mb-5">
                {card.body}
              </p>
              <Link href="#" className="text-[13px] text-[#7B5B3A] hover:underline">
                {card.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="#stays"
            className="inline-block px-10 py-3.5 bg-[#7B5B3A] text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-[#5A3E28] transition-colors"
          >
            Book Your Stay →
          </Link>
        </div>
      </div>
    </section>
  );
}

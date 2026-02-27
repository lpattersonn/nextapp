import Image from "next/image";

const BASE = "https://thecohostcompany.com/wp-content/uploads";

const benefits = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C4A882" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="10" />
        <path d="M14 8 V10 M14 18 V20" />
        <path d="M11 11 C11 9.5 12.3 8.5 14 8.5 C15.7 8.5 17 9.5 17 11 C17 13 14 14.5 14 14.5 C14 14.5 14 15.5 14 16" />
      </svg>
    ),
    title: "The Best Rates",
    body: "Our guests often save 10–15% on fees compared to booking through Airbnb or VRBO.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C4A882" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4 C9 4 5 8 5 13 C5 18 14 24 14 24 C14 24 23 18 23 13 C23 8 19 4 14 4 Z" />
        <path d="M11 13 L13 15 L17 11" />
      </svg>
    ),
    title: "Premium Service",
    body: "Guests have direct contact with our team before, during, and after their stays.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C4A882" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14 L14 4 L24 14 L14 24 Z" />
        <circle cx="18" cy="10" r="1.5" fill="#C4A882" />
      </svg>
    ),
    title: "Exclusive Offers",
    body: "Enjoy special promotions and exclusive deals available only on our website.",
  },
];

export default function Benefits() {
  return (
    <section id="services" className="relative py-28 overflow-hidden">
      {/* Dark background image */}
      <div className="absolute inset-0">
        <Image
          src={`${BASE}/2025/05/Hiking-Rock-Climbing.webp.webp`}
          alt="Desert landscape"
          fill
          className="object-cover object-center"
          unoptimized
        />
        <div className="absolute inset-0 bg-[#1C0A04]/78" />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-10">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#C4A882] font-semibold mb-3">
            Book Your Stay
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[52px] font-normal text-white leading-[1.1]">
            Benefits of Booking With Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="text-center px-10 py-14 bg-[#F7F4EF] rounded-2xl hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 rounded-full bg-[#EDE8DF] flex items-center justify-center">
                  {b.icon}
                </div>
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-[20px] italic font-normal text-[#7B5B3A] mb-4">
                {b.title}
              </h3>
              <p className="text-[14px] text-[#5A4A3A] leading-[1.85]">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { Tag, ShieldCheck, Gift } from "lucide-react";

const BASE = "https://thecohostcompany.com/wp-content/uploads";

const benefits = [
  {
    Icon: Tag,
    title: "The Best Rates",
    body: "Our guests often save 10–15% on fees compared to booking through Airbnb or VRBO.",
  },
  {
    Icon: ShieldCheck,
    title: "Premium Service",
    body: "Guests have direct contact with our team before, during, and after their stays.",
  },
  {
    Icon: Gift,
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

      <div className="relative z-10 max-w-[1120px] mx-auto px-10">
        <div className="text-center mb-14">
          <p className="section-label" style={{ color: "#C4A882" }}>
            Book Your Stay
          </p>
          <h2
            className="font-[family-name:var(--font-playfair)] font-normal text-white leading-[1.1]"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Benefits of Booking With Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="card text-center px-10 py-14"
            >
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 rounded-full bg-[#EDE8DF] flex items-center justify-center">
                  <b.Icon size={22} color="#C4A882" strokeWidth={1.75} />
                </div>
              </div>
              <h3
                className="font-[family-name:var(--font-playfair)] font-normal text-[#7B5B3A] mb-4"
                style={{ fontSize: "var(--text-h4)" }}
              >
                {b.title}
              </h3>
              <p className="text-[#5A4A3A] leading-[1.85]" style={{ fontSize: "var(--text-sm)" }}>
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

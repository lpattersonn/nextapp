"use client";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const G = "https://assets.guesty.com/image/upload/w_1200,q_auto,f_auto";

const guestCards = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="1.6" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Chat with Support!",
    desc: "We're here to help.",
    cta: "reservations@thecohostcompany.com",
    href: "mailto:reservations@thecohostcompany.com",
    ctaLabel: null,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="1.6" strokeLinecap="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.82 12 19.79 19.79 0 0 1 1.78 3.41 2 2 0 0 1 3.77 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.28-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/>
      </svg>
    ),
    title: "Call Us",
    desc: "24/7 customer support",
    cta: "+1 (760) 624-8481",
    href: "tel:+17606248481",
    ctaLabel: null,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="1.6" strokeLinecap="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    title: "Virtual Concierge",
    desc: "Get the full experience of Joshua Tree with our popular add-ons and activities.",
    cta: null,
    href: "/concierge",
    ctaLabel: "Send Request",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="1.6" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Join Our Community",
    desc: "Get early access to new stays and exclusive offers.",
    cta: null,
    href: "/#signup",
    ctaLabel: "Join Our Community",
  },
];

export default function ContactPage() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="relative flex items-center justify-center" style={{ minHeight: 300 }}>
        <div className="absolute inset-0">
          <Image
            src={`${G}/v1767380085/production/68df18d0ea1895d9005ea6ad/pexzqqzgr8xsj1cdn2ry.jpg`}
            alt="Contact"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-[#0D0603]/80" />
        </div>
        <div className="relative z-10 text-center px-6 py-20">
          <h1
            className="font-[family-name:var(--font-playfair)] text-white font-normal mb-3"
            style={{ fontSize: "clamp(36px, 5vw, 52px)" }}
          >
            Contact
          </h1>
          <p className="text-white/70 text-[14px] mb-6">We&apos;d love to hear from you</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => scrollTo("for-guests")}
              className="px-5 py-2 rounded-full bg-white text-[#1C1410] text-[13px] font-semibold hover:bg-white/90 transition-colors cursor-pointer"
            >
              For Guests
            </button>
            <button
              onClick={() => scrollTo("for-hosts")}
              className="px-5 py-2 rounded-full border border-white/60 text-white text-[13px] font-semibold hover:bg-white/10 transition-colors cursor-pointer"
            >
              For Hosts
            </button>
          </div>
        </div>
      </section>

      {/* ── FOR GUESTS ── */}
      <section id="for-guests" className="py-20 bg-white scroll-mt-[80px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16 items-start">

            {/* Left */}
            <div className="pt-2">
              <span className="inline-block px-4 py-1.5 rounded-full border border-[#C4A882] text-[#7B5B3A] text-[12px] font-semibold tracking-[0.08em] mb-6">
                For Guests
              </span>
              <h2
                className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal leading-[1.15] mb-4"
                style={{ fontSize: "clamp(26px, 3vw, 34px)" }}
              >
                Get In Touch
              </h2>
              <p className="text-[14px] text-[#6A5A4A] leading-[1.85]">
                Whether you&apos;re planning your trip, have questions during your stay, or just want local tips — we&apos;re here to help.
              </p>
            </div>

            {/* Right: 2×2 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {guestCards.map((card) => (
                <div key={card.title} className="bg-[#FAFAF9] border border-[#EDE8DF] rounded-xl p-6">
                  <div className="mb-4">{card.icon}</div>
                  <h3 className="font-semibold text-[#1C1410] text-[15px] mb-1">{card.title}</h3>
                  <p className="text-[13px] text-[#8A7968] leading-[1.7] mb-3">{card.desc}</p>
                  {card.cta && (
                    <Link href={card.href} className="text-[13px] text-[#7B5B3A] hover:underline break-all">
                      {card.cta}
                    </Link>
                  )}
                  {card.ctaLabel && (
                    <Link href={card.href} className="text-[13px] text-[#7B5B3A] hover:underline font-medium">
                      {card.ctaLabel}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH IMAGE ── */}
      <div className="relative h-[320px] overflow-hidden">
        <Image
          src={`${G}/v1763153882/production/68df18d0ea1895d9005ea6ad/xc9rn7nrrvuajaomqa4c.jpg`}
          alt="The Cohost Company"
          fill
          className="object-cover object-center"
          unoptimized
        />
      </div>

      {/* ── FOR HOSTS ── */}
      <section id="for-hosts" className="py-20 bg-[#FAF8F5] scroll-mt-[80px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16 items-start">

            {/* Left */}
            <div className="pt-2">
              <span className="inline-block px-4 py-1.5 rounded-full border border-[#C4A882] text-[#7B5B3A] text-[12px] font-semibold tracking-[0.08em] mb-6">
                For Hosts
              </span>
              <h2
                className="font-[family-name:var(--font-playfair)] text-[#1C1410] font-normal leading-[1.15] mb-4"
                style={{ fontSize: "clamp(26px, 3vw, 34px)" }}
              >
                Contact Us
              </h2>
              <p className="text-[14px] text-[#6A5A4A] leading-[1.85]">
                We love working with passionate hosts and property owners. Whether you&apos;re just getting started or looking to level up, our friendly team is here to help. Drop us a message — we&apos;d love to hear your story and explore how we can support your goals.
              </p>
            </div>

            {/* Right: form card */}
            <HostsForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

// ── Hosts contact form ────────────────────────────────────────────────────────
function HostsForm() {
  return (
    <div className="bg-white rounded-2xl border border-[#EDE8DF] shadow-sm p-8">
      <h3 className="font-[family-name:var(--font-playfair)] text-[#1C1410] text-[22px] font-normal mb-6">
        Share Your Details
      </h3>
      <form
        action="https://formspree.io/f/your-form-id"
        method="POST"
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <Field label="First Name *" name="firstName" type="text" required />
          <Field label="Last Name *" name="lastName" type="text" required />
        </div>
        <Field label="Email Address * (required)" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Subject (required)" name="subject" type="text" required />
        <Field label="Vacation Rental Address" name="propertyAddress" type="text" />
        <Field label="Airbnb Link (or VRBO)" name="listingLink" type="url" />
        <div>
          <label className="block text-[12px] text-[#5A4A3A] mb-1.5">What can we help you with? (required)</label>
          <textarea
            name="helpText"
            required
            rows={5}
            className="w-full px-3 py-2.5 border border-[#D8D0C8] rounded-sm text-[13px] text-[#1C1410] outline-none focus:border-[#7B5B3A] transition-colors resize-none bg-white"
          />
        </div>
        <Field label="Where did you hear about us? (required)" name="hearAboutUs" type="text" required />

        {/* reCAPTCHA placeholder */}
        <div className="flex items-center gap-3 border border-[#D8D0C8] rounded-sm px-4 py-3 bg-[#F9F9F9] w-fit">
          <input type="checkbox" id="robot" className="w-4 h-4 accent-[#7B5B3A]" />
          <label htmlFor="robot" className="text-[13px] text-[#3A3A3A] cursor-pointer select-none">I&apos;m not a robot</label>
          <div className="ml-4 text-right">
            <div className="text-[9px] text-[#8A8A8A] leading-tight">reCAPTCHA<br/>Privacy — Terms</div>
          </div>
        </div>

        <button
          type="submit"
          className="px-7 py-2.5 bg-[#7B5B3A] text-white text-[12px] font-semibold tracking-[0.1em] uppercase hover:bg-[#5A3E28] transition-colors rounded-sm cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function Field({ label, name, type, required }: { label: string; name: string; type: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-[12px] text-[#5A4A3A] mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full px-3 py-2.5 border border-[#D8D0C8] rounded-sm text-[13px] text-[#1C1410] outline-none focus:border-[#7B5B3A] transition-colors bg-white"
      />
    </div>
  );
}

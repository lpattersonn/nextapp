import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Script from "next/script";

const G = "https://assets.guesty.com/image/upload/w_1200,q_auto,f_auto";
const BASE = "https://thecohostcompany.com/wp-content/uploads";

const guestContacts = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    label: "Chat Support",
    desc: "Chat with us directly",
    href: "#",
    cta: "Start Chat",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M22 7l-10 7L2 7"/>
      </svg>
    ),
    label: "Email",
    desc: "reservations@thecohostcompany.com",
    href: "mailto:reservations@thecohostcompany.com",
    cta: "Send Email",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.82 12 19.79 19.79 0 0 1 1.78 3.41 2 2 0 0 1 3.77 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.28-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/>
      </svg>
    ),
    label: "Phone",
    desc: "+1 (760) 624-8481",
    href: "tel:+17606248481",
    cta: "Call Now",
    note: "24/7 customer support",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    label: "Virtual Concierge",
    desc: "Activities, add-ons & local services",
    href: "/guidebook",
    cta: "Explore",
  },
];

export default function ContactPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="relative h-[360px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`${G}/v1765152133/production/68df18d0ea1895d9005ea6ad/gkpt8qq78dfxkqu76hnm.jpg`}
            alt="Contact The Cohost Company"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,9,5,0.4) 0%, rgba(15,9,5,0.78) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-[1120px] mx-auto px-8 pb-12 w-full">
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/60 mb-3">We&apos;re Here For You</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-white font-normal italic text-[58px] leading-[1.05]">
            Get in Touch
          </h1>
        </div>
      </section>

      {/* For Guests */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-3">Existing Guests</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[44px] font-normal text-[#1C1410] leading-[1.1]">
              For Guests
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {guestContacts.map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-7 shadow-sm flex flex-col">
                <div className="w-12 h-12 rounded-full bg-[#F7F4EF] flex items-center justify-center text-[#7B5B3A] mb-5">
                  {item.icon}
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-[20px] font-normal text-[#1C1410] mb-1">{item.label}</h3>
                <p className="text-[14px] text-[#8A7968] leading-snug mb-1 flex-1">{item.desc}</p>
                {item.note && <p className="text-[12px] text-[#C4A882] mb-4">{item.note}</p>}
                <Link
                  href={item.href}
                  className="mt-4 self-start text-[13px] font-semibold tracking-[0.08em] uppercase text-[#7B5B3A] hover:underline"
                >
                  {item.cta} →
                </Link>
              </div>
            ))}
          </div>

          {/* Community signup */}
          <div className="bg-[#3D1810] rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-[28px] font-normal text-white mb-2">
                Join Our Community
              </h3>
              <p className="text-[15px] text-white/75 leading-[1.75] max-w-[480px]">
                Get early access to new stays and exclusive offers, including 10% OFF your first booking.
              </p>
            </div>
            <Link
              href="/#signup"
              className="shrink-0 px-8 py-3.5 border border-white text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-white hover:text-[#1C1410] transition-colors"
            >
              Sign Up →
            </Link>
          </div>
        </div>
      </section>

      {/* For Hosts */}
      <section className="py-20 bg-white">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-3">Property Owners</p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[44px] font-normal text-[#1C1410] leading-[1.1] mb-6">
                For Hosts
              </h2>
              <p className="text-[15px] text-[#5A4A3A] leading-[1.85] mb-8">
                Ready to turn your property into a top-tier vacation rental? Fill out the form and our team will be in touch within 24 hours to discuss how we can help you succeed.
              </p>
              <div className="relative h-[320px] rounded-2xl overflow-hidden">
                <Image src={`${BASE}/2025/05/Work-With-US.webp`} alt="Work with The Cohost Company" fill className="object-cover" unoptimized />
              </div>
            </div>
            <div>
              <div
                className="rounded-2xl p-8"
                style={{ background: "#F7F4EF" }}
              >
                <h3 className="font-[family-name:var(--font-playfair)] text-[28px] font-normal text-[#1C1410] mb-8">
                  Get in Touch
                </h3>
                <form className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">First Name</label>
                      <input type="text" placeholder="First name" className="w-full px-4 py-3 rounded-lg bg-white border border-[#EDE8DF] text-[14px] text-[#2D1B0E] placeholder-[#C4A882] outline-none focus:border-[#7B5B3A] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">Last Name</label>
                      <input type="text" placeholder="Last name" className="w-full px-4 py-3 rounded-lg bg-white border border-[#EDE8DF] text-[14px] text-[#2D1B0E] placeholder-[#C4A882] outline-none focus:border-[#7B5B3A] transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">Email Address *</label>
                    <input type="email" required placeholder="your@email.com" className="w-full px-4 py-3 rounded-lg bg-white border border-[#EDE8DF] text-[14px] text-[#2D1B0E] placeholder-[#C4A882] outline-none focus:border-[#7B5B3A] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">Phone Number</label>
                    <input type="tel" placeholder="+1 (000) 000-0000" className="w-full px-4 py-3 rounded-lg bg-white border border-[#EDE8DF] text-[14px] text-[#2D1B0E] placeholder-[#C4A882] outline-none focus:border-[#7B5B3A] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">Subject *</label>
                    <input type="text" required placeholder="How can we help?" className="w-full px-4 py-3 rounded-lg bg-white border border-[#EDE8DF] text-[14px] text-[#2D1B0E] placeholder-[#C4A882] outline-none focus:border-[#7B5B3A] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">Vacation Rental Address</label>
                    <input type="text" placeholder="Property address" className="w-full px-4 py-3 rounded-lg bg-white border border-[#EDE8DF] text-[14px] text-[#2D1B0E] placeholder-[#C4A882] outline-none focus:border-[#7B5B3A] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">Airbnb or VRBO Listing Link</label>
                    <input type="url" placeholder="https://" className="w-full px-4 py-3 rounded-lg bg-white border border-[#EDE8DF] text-[14px] text-[#2D1B0E] placeholder-[#C4A882] outline-none focus:border-[#7B5B3A] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">What can we help you with?</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-white border border-[#EDE8DF] text-[14px] text-[#2D1B0E] outline-none focus:border-[#7B5B3A] transition-colors appearance-none cursor-pointer">
                      <option value="">Select an option…</option>
                      <option>Full-service property management</option>
                      <option>Marketing only</option>
                      <option>Hosting services</option>
                      <option>General inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">How did you hear about us?</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-white border border-[#EDE8DF] text-[14px] text-[#2D1B0E] outline-none focus:border-[#7B5B3A] transition-colors appearance-none cursor-pointer">
                      <option value="">Select an option…</option>
                      <option>Instagram</option>
                      <option>Google Search</option>
                      <option>Referral</option>
                      <option>Press / Media</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#7B5B3A] text-white text-[13px] font-semibold tracking-[0.12em] uppercase hover:bg-[#5A3E28] transition-colors rounded-lg cursor-pointer"
                  >
                    Send Message →
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
      <Footer />
    </>
  );
}

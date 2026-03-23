"use client";

import { useState, FormEvent } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/guesty/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: fd.get("firstName"),
          lastName: fd.get("lastName"),
          email: fd.get("email"),
          phone: fd.get("phone") || undefined,
          subject: fd.get("subject"),
          propertyAddress: fd.get("propertyAddress") || undefined,
          listingLink: fd.get("listingLink") || undefined,
          helpType: fd.get("helpType") || undefined,
          hearAboutUs: fd.get("hearAboutUs") || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setState("success");
    } catch (err) {
      setErrorMsg((err as Error).message);
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl p-8 bg-[#F7F4EF] flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-14 h-14 rounded-full bg-[#3D1810] flex items-center justify-center mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h3 className="font-[family-name:var(--font-playfair)] text-[28px] font-normal text-[#1C1410] mb-3">
          Message Received
        </h3>
        <p className="text-[15px] text-[#5A4A3A] leading-[1.75] max-w-[360px]">
          Thank you for reaching out. Our team will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-white border border-[#EDE8DF] text-[14px] text-[#2D1B0E] placeholder-[#C4A882] outline-none focus:border-[#7B5B3A] transition-colors";

  return (
    <div className="rounded-2xl p-8" style={{ background: "#F7F4EF" }}>
      <h3 className="font-[family-name:var(--font-playfair)] text-[28px] font-normal text-[#1C1410] mb-8">
        Get in Touch
      </h3>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">First Name</label>
            <input name="firstName" type="text" placeholder="First name" className={inputClass} />
          </div>
          <div>
            <label className="block text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">Last Name</label>
            <input name="lastName" type="text" placeholder="Last name" className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">Email Address *</label>
          <input name="email" type="email" required placeholder="your@email.com" className={inputClass} />
        </div>
        <div>
          <label className="block text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">Phone Number</label>
          <input name="phone" type="tel" placeholder="+1 (000) 000-0000" className={inputClass} />
        </div>
        <div>
          <label className="block text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">Subject *</label>
          <input name="subject" type="text" required placeholder="How can we help?" className={inputClass} />
        </div>
        <div>
          <label className="block text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">Vacation Rental Address</label>
          <input name="propertyAddress" type="text" placeholder="Property address" className={inputClass} />
        </div>
        <div>
          <label className="block text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">Airbnb or VRBO Listing Link</label>
          <input name="listingLink" type="url" placeholder="https://" className={inputClass} />
        </div>
        <div>
          <label className="block text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">What can we help you with?</label>
          <select name="helpType" className={`${inputClass} appearance-none cursor-pointer`}>
            <option value="">Select an option…</option>
            <option>Full-service property management</option>
            <option>Marketing only</option>
            <option>Hosting services</option>
            <option>General inquiry</option>
          </select>
        </div>
        <div>
          <label className="block text-[12px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">How did you hear about us?</label>
          <select name="hearAboutUs" className={`${inputClass} appearance-none cursor-pointer`}>
            <option value="">Select an option…</option>
            <option>Instagram</option>
            <option>Google Search</option>
            <option>Referral</option>
            <option>Press / Media</option>
            <option>Other</option>
          </select>
        </div>

        {state === "error" && (
          <p className="text-[13px] text-red-600">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={state === "loading"}
          className="w-full py-4 bg-[#7B5B3A] text-white text-[13px] font-semibold tracking-[0.12em] uppercase hover:bg-[#5A3E28] transition-colors rounded-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state === "loading" ? "Sending…" : "Send Message →"}
        </button>
      </form>
    </div>
  );
}

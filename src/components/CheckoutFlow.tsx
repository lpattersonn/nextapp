"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/data/properties";
import type { GuestyQuote } from "@/lib/guesty";

type BookingState = "idle" | "submitting" | "success" | "error";

function fmt(n: number, currency = "USD") {
  return n.toLocaleString("en-US", { style: "currency", currency, maximumFractionDigits: 0 });
}

function nightsBetween(checkIn: string, checkOut: string) {
  return Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000));
}

function formatDate(d: string) {
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function CheckoutFlow({
  property,
  listingId,
  checkIn,
  checkOut,
  guests,
}: {
  property: Property;
  listingId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}) {
  const [quote, setQuote] = useState<GuestyQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [quoteError, setQuoteError] = useState(false);
  const [bookingState, setBookingState] = useState<BookingState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmation, setConfirmation] = useState<{ code: string; total: number; currency: string } | null>(null);

  const nights = nightsBetween(checkIn, checkOut);

  // Fetch live quote on mount
  useEffect(() => {
    fetch("/api/guesty/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listingId, checkIn, checkOut, guests }),
    })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data: GuestyQuote) => { setQuote(data); setQuoteLoading(false); })
      .catch(() => { setQuoteError(true); setQuoteLoading(false); });
  }, [listingId, checkIn, checkOut, guests]);

  const nightly = parseInt(property.price.replace(",", ""), 10);
  const estCleaning = Math.round(nightly * 0.12);

  const displaySubtotal = quote ? (quote.money.fareAccommodationAdjusted ?? quote.money.fareAccommodation) : nights * nightly;
  const displayCleaning = quote ? quote.money.cleaningFee : estCleaning;
  const displayTaxes = quote ? quote.money.totalTaxes : 0;
  const displayTotal = quote ? quote.money.total : displaySubtotal + displayCleaning;
  const currency = quote?.money.currency ?? "USD";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBookingState("submitting");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/guesty/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId,
          checkIn,
          checkOut,
          guests,
          firstName: fd.get("firstName"),
          lastName: fd.get("lastName"),
          email: fd.get("email"),
          phone: fd.get("phone") || undefined,
          specialRequests: fd.get("specialRequests") || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking failed. Please try again.");

      setConfirmation({
        code: data.confirmationCode,
        total: data.money?.total ?? displayTotal,
        currency: data.money?.currency ?? currency,
      });
      setBookingState("success");
    } catch (err) {
      setErrorMsg((err as Error).message);
      setBookingState("error");
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (bookingState === "success" && confirmation) {
    return (
      <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center px-5 py-20">
        <div className="bg-white rounded-2xl shadow-xl max-w-[540px] w-full p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-[#3D1810] flex items-center justify-center mx-auto mb-6">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#8A7968] mb-3">Booking Confirmed</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[38px] font-normal text-[#1C1410] leading-[1.1] mb-4">
            You&apos;re all set!
          </h2>
          <p className="text-[15px] text-[#5A4A3A] leading-[1.75] mb-8">
            Your stay at <span className="font-semibold text-[#1C1410]">{property.name}</span> is confirmed.
            A confirmation email is on its way.
          </p>
          <div className="bg-[#F7F4EF] rounded-xl px-6 py-5 mb-8 text-left space-y-3">
            <div className="flex justify-between text-[14px]">
              <span className="text-[#8A7968]">Confirmation code</span>
              <span className="font-semibold text-[#1C1410] font-mono tracking-wider">{confirmation.code}</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-[#8A7968]">Check-in</span>
              <span className="text-[#1C1410]">{formatDate(checkIn)}</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-[#8A7968]">Check-out</span>
              <span className="text-[#1C1410]">{formatDate(checkOut)}</span>
            </div>
            <div className="flex justify-between text-[14px] pt-2 border-t border-[#EDE8DF]">
              <span className="text-[#8A7968] font-semibold">Total charged</span>
              <span className="font-semibold text-[#1C1410]">{fmt(confirmation.total, confirmation.currency)}</span>
            </div>
          </div>
          <Link href="/" className="inline-block px-8 py-3.5 bg-[#7B5B3A] text-white text-[13px] font-semibold tracking-[0.1em] uppercase hover:bg-[#5A3E28] transition-colors rounded-xl">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // ── Checkout form ──────────────────────────────────────────────────────────
  const inputClass = "w-full px-4 py-3 rounded-lg bg-[#F7F4EF] border border-[#EDE8DF] text-[14px] text-[#2D1B0E] placeholder-[#C4A882] outline-none focus:border-[#7B5B3A] transition-colors";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#EDE8DF] bg-white sticky top-0 z-40">
        <div className="max-w-[1080px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/property/${property.slug}`} className="flex items-center gap-2 text-[13px] text-[#7B5B3A] hover:underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            {property.name}
          </Link>
          <Link href="/" className="font-[family-name:var(--font-playfair)] text-[18px] text-[#1C1410] font-normal">
            The Cohost Company
          </Link>
        </div>
      </div>

      <div className="max-w-[1080px] mx-auto px-6 py-12">
        <h1 className="font-[family-name:var(--font-playfair)] text-[38px] font-normal text-[#1C1410] mb-10">
          Confirm your booking
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">

          {/* ── LEFT: Guest details form ── */}
          <div>
            {/* Trip details summary */}
            <div className="bg-[#F7F4EF] rounded-2xl p-6 mb-8">
              <h2 className="font-[family-name:var(--font-playfair)] text-[20px] font-normal text-[#1C1410] mb-5">Your trip</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-[11px] tracking-[0.14em] uppercase text-[#8A7968] font-semibold mb-1">Check-in</p>
                  <p className="text-[15px] font-semibold text-[#1C1410]">{formatDate(checkIn)}</p>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.14em] uppercase text-[#8A7968] font-semibold mb-1">Check-out</p>
                  <p className="text-[15px] font-semibold text-[#1C1410]">{formatDate(checkOut)}</p>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.14em] uppercase text-[#8A7968] font-semibold mb-1">Guests</p>
                  <p className="text-[15px] font-semibold text-[#1C1410]">{guests} guest{guests !== 1 ? "s" : ""}</p>
                </div>
              </div>
            </div>

            {/* Guest details form */}
            <h2 className="font-[family-name:var(--font-playfair)] text-[24px] font-normal text-[#1C1410] mb-6">Guest details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">First Name *</label>
                  <input name="firstName" type="text" required placeholder="First name" className={inputClass} />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">Last Name *</label>
                  <input name="lastName" type="text" required placeholder="Last name" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">Email Address *</label>
                <input name="email" type="email" required placeholder="your@email.com" className={inputClass} />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">Phone Number</label>
                <input name="phone" type="tel" placeholder="+1 (000) 000-0000" className={inputClass} />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase text-[#8A7968] font-semibold mb-2">Special Requests</label>
                <textarea
                  name="specialRequests"
                  rows={3}
                  placeholder="Early check-in, dietary needs, celebrations…"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Cancellation notice */}
              <div className="border border-[#EDE8DF] rounded-xl p-5 mt-6">
                <h3 className="text-[14px] font-semibold text-[#1C1410] mb-1">Cancellation policy</h3>
                <p className="text-[13px] text-[#5A4A3A] leading-[1.7]">
                  Free cancellation within 48 hours of booking. After that, contact us directly to discuss your options.
                </p>
              </div>

              {bookingState === "error" && (
                <p className="text-[13px] text-red-600 mt-2">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={bookingState === "submitting" || quoteLoading}
                className="w-full py-4 bg-[#7B5B3A] text-white text-[13px] font-bold tracking-[0.12em] uppercase hover:bg-[#5A3E28] transition-colors rounded-xl cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {bookingState === "submitting" ? "Confirming…" : `Confirm Booking — ${quoteLoading ? "…" : fmt(displayTotal, currency)}`}
              </button>

              <p className="text-center text-[12px] text-[#8A7968]">
                You won&apos;t be charged until your booking is confirmed by our team.
              </p>
            </form>
          </div>

          {/* ── RIGHT: Property summary + price ── */}
          <div className="lg:sticky lg:top-[88px]">
            {/* Property card */}
            <div className="bg-white border border-[#EDE8DF] rounded-2xl overflow-hidden shadow-sm mb-5">
              <div className="relative h-[200px]">
                <Image
                  src={property.images[0]}
                  alt={property.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-5">
                <p className="text-[11px] tracking-[0.14em] uppercase text-[#8A7968] font-semibold mb-1">{property.type}</p>
                <h3 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#1C1410] mb-1">{property.name}</h3>
                <p className="text-[13px] text-[#8A7968]">{property.location}</p>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="bg-[#F7F4EF] rounded-2xl p-6">
              <h3 className="font-[family-name:var(--font-playfair)] text-[20px] font-normal text-[#1C1410] mb-5">Price details</h3>

              {quoteLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-4 bg-[#EDE8DF] rounded w-32 animate-pulse" />
                      <div className="h-4 bg-[#EDE8DF] rounded w-16 animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between text-[14px] text-[#5A4A3A]">
                    <span className="underline decoration-dotted underline-offset-2">
                      {quote ? fmt(quote.money.fareAccommodation / nights, currency) : `$${property.price}`} × {nights} night{nights !== 1 ? "s" : ""}
                    </span>
                    <span>{fmt(displaySubtotal, currency)}</span>
                  </div>
                  <div className="flex justify-between text-[14px] text-[#5A4A3A]">
                    <span className="underline decoration-dotted underline-offset-2">Cleaning fee</span>
                    <span>{fmt(displayCleaning, currency)}</span>
                  </div>
                  {displayTaxes > 0 && (
                    <div className="flex justify-between text-[14px] text-[#5A4A3A]">
                      <span className="underline decoration-dotted underline-offset-2">Taxes & fees</span>
                      <span>{fmt(displayTaxes, currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[15px] font-semibold text-[#1C1410] pt-4 border-t border-[#EDE8DF]">
                    <span>Total</span>
                    <span>{fmt(displayTotal, currency)}</span>
                  </div>
                  {quoteError && (
                    <p className="text-[11px] text-[#8A7968]">Estimated price — final amount confirmed at booking</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

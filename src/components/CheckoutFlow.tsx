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

// ── Reusable field component ──────────────────────────────────────────────────
function Field({
  label, name, type = "text", required, placeholder, autoComplete,
}: {
  label: string; name: string; type?: string; required?: boolean;
  placeholder?: string; autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-[#3D2B1E] mb-1.5">{label}{required && <span className="text-[#C4A882] ml-0.5">*</span>}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full px-4 py-3 rounded-[8px] border border-[#DDD6CE] bg-white text-[14px] text-[#1C1410] placeholder-[#B8A898] outline-none focus:border-[#7B5B3A] focus:ring-2 focus:ring-[#7B5B3A]/10 transition-all"
      />
    </div>
  );
}

export default function CheckoutFlow({
  property, listingId, checkIn, checkOut, guests,
}: {
  property: Property; listingId: string;
  checkIn: string; checkOut: string; guests: number;
}) {
  const [quote, setQuote] = useState<GuestyQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [quoteError, setQuoteError] = useState(false);
  const [bookingState, setBookingState] = useState<BookingState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmation, setConfirmation] = useState<{ code: string; total: number; currency: string } | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const nights = nightsBetween(checkIn, checkOut);

  // ── Fetch live quote ──────────────────────────────────────────────────────
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
  const displayTaxes    = quote ? quote.money.totalTaxes : 0;
  const displayTotal    = quote ? quote.money.total : displaySubtotal + displayCleaning;
  const currency        = quote?.money.currency ?? "USD";

  // ── Submit handler — API logic unchanged ──────────────────────────────────
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
          listingId, checkIn, checkOut, guests,
          firstName: fd.get("firstName"),
          lastName:  fd.get("lastName"),
          email:     fd.get("email"),
          phone:     fd.get("phone") || undefined,
          specialRequests: fd.get("specialRequests") || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking failed. Please try again.");
      setConfirmation({ code: data.confirmationCode, total: data.money?.total ?? displayTotal, currency: data.money?.currency ?? currency });
      setBookingState("success");
    } catch (err) {
      setErrorMsg((err as Error).message);
      setBookingState("error");
    }
  }

  // ── Success screen ────────────────────────────────────────────────────────
  if (bookingState === "success" && confirmation) {
    return (
      <div className="min-h-screen bg-[#F7F4EF] flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-[#EDE8DF]">
          <div className="max-w-[1040px] mx-auto px-6 h-16 flex items-center justify-center">
            <Link href="/" className="font-[family-name:var(--font-playfair)] text-[20px] text-[#1C1410]">
              The Cohost Company
            </Link>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center px-5 py-16">
          <div className="bg-white rounded-[16px] shadow-lg max-w-[500px] w-full p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-[#1C1410] flex items-center justify-center mx-auto mb-6">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#8A7968] mb-2">Booking Confirmed</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[34px] font-normal text-[#1C1410] leading-[1.1] mb-3">
              You&apos;re all set!
            </h2>
            <p className="text-[14px] text-[#5A4A3A] leading-[1.8] mb-8">
              Your stay at <span className="font-semibold text-[#1C1410]">{property.name}</span> is confirmed.
              A confirmation email is on its way.
            </p>
            <div className="bg-[#F7F4EF] rounded-[12px] px-6 py-5 mb-8 text-left divide-y divide-[#EDE8DF]">
              {[
                ["Confirmation code", <span key="code" className="font-semibold font-mono tracking-wider text-[#1C1410]">{confirmation.code}</span>],
                ["Check-in",  formatDate(checkIn)],
                ["Check-out", formatDate(checkOut)],
                ["Total charged", <span key="total" className="font-semibold text-[#1C1410]">{fmt(confirmation.total, confirmation.currency)}</span>],
              ].map(([label, value]) => (
                <div key={String(label)} className="flex justify-between text-[13px] py-3 first:pt-0 last:pb-0">
                  <span className="text-[#8A7968]">{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
            <Link href="/" className="inline-block w-full py-3.5 bg-[#1C1410] text-white text-[13px] font-semibold tracking-[0.08em] uppercase rounded-[10px] hover:bg-[#3D2B1E] transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Checkout page ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Header ── */}
      <header className="border-b border-[#EDE8DF] bg-white sticky top-0 z-40">
        <div className="max-w-[1040px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href={`/property/${property.slug}`}
            className="flex items-center gap-2 text-[13px] text-[#7B5B3A] hover:text-[#1C1410] transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </Link>
          <Link href="/" className="font-[family-name:var(--font-playfair)] text-[20px] text-[#1C1410] font-normal">
            The Cohost Company
          </Link>
          <div className="flex items-center gap-1.5 text-[12px] text-[#8A7968]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Secure
          </div>
        </div>
      </header>

      {/* ── Mobile order summary toggle ── */}
      <div className="lg:hidden border-b border-[#EDE8DF] bg-[#F7F4EF]">
        <button
          type="button"
          onClick={() => setSummaryOpen(o => !o)}
          className="w-full flex items-center justify-between px-5 py-4 cursor-pointer"
        >
          <span className="flex items-center gap-2 text-[13px] font-medium text-[#7B5B3A]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            {summaryOpen ? "Hide" : "Show"} order summary
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`transition-transform ${summaryOpen ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6"/></svg>
          </span>
          <span className="text-[14px] font-semibold text-[#1C1410]">
            {quoteLoading ? "…" : fmt(displayTotal, currency)}
          </span>
        </button>

        {summaryOpen && (
          <div className="px-5 pb-5">
            <OrderSummary
              property={property} nights={nights} checkIn={checkIn} checkOut={checkOut} guests={guests}
              quoteLoading={quoteLoading} quoteError={quoteError} quote={quote}
              displaySubtotal={displaySubtotal} displayCleaning={displayCleaning}
              displayTaxes={displayTaxes} displayTotal={displayTotal} currency={currency} nightly={nightly}
            />
          </div>
        )}
      </div>

      {/* ── Main two-column layout ── */}
      <div className="flex-1 max-w-[1040px] mx-auto w-full px-5 lg:px-8 py-10 lg:py-14">
        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-16 items-start">

          {/* ── LEFT: form ── */}
          <div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[12px] text-[#8A7968] mb-8">
              <span className="text-[#1C1410] font-medium">Contact</span>
              <span>›</span>
              <span>Review</span>
              <span>›</span>
              <span>Confirmation</span>
            </nav>

            <form onSubmit={handleSubmit} noValidate>

              {/* ── Section: Contact information ── */}
              <section className="mb-8">
                <h2 className="text-[17px] font-semibold text-[#1C1410] mb-5">Contact information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="First name" name="firstName" required placeholder="Jane" autoComplete="given-name" />
                    <Field label="Last name"  name="lastName"  required placeholder="Smith" autoComplete="family-name" />
                  </div>
                  <Field label="Email address" name="email" type="email" required placeholder="jane@example.com" autoComplete="email" />
                  <Field label="Phone number" name="phone" type="tel" placeholder="+1 (555) 000-0000" autoComplete="tel" />
                </div>
              </section>

              <hr className="border-[#EDE8DF] mb-8" />

              {/* ── Section: Trip details ── */}
              <section className="mb-8">
                <h2 className="text-[17px] font-semibold text-[#1C1410] mb-5">Trip details</h2>
                <div className="rounded-[12px] border border-[#EDE8DF] divide-y divide-[#EDE8DF] overflow-hidden">
                  {[
                    ["Check-in",  formatDate(checkIn)],
                    ["Check-out", formatDate(checkOut)],
                    ["Guests",    `${guests} guest${guests !== 1 ? "s" : ""}`],
                    ["Property",  property.name],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-[13px] text-[#8A7968]">{label}</span>
                      <span className="text-[13px] font-medium text-[#1C1410]">{value}</span>
                    </div>
                  ))}
                </div>
              </section>

              <hr className="border-[#EDE8DF] mb-8" />

              {/* ── Section: Special requests ── */}
              <section className="mb-8">
                <h2 className="text-[17px] font-semibold text-[#1C1410] mb-1.5">Special requests</h2>
                <p className="text-[13px] text-[#8A7968] mb-4">Optional — early check-in, celebrations, dietary needs…</p>
                <textarea
                  name="specialRequests"
                  rows={3}
                  placeholder="Let us know anything that would make your stay special"
                  className="w-full px-4 py-3 rounded-[8px] border border-[#DDD6CE] bg-white text-[14px] text-[#1C1410] placeholder-[#B8A898] outline-none focus:border-[#7B5B3A] focus:ring-2 focus:ring-[#7B5B3A]/10 transition-all resize-none"
                />
              </section>

              {/* ── Cancellation policy ── */}
              <div className="bg-[#F7F4EF] rounded-[12px] px-5 py-4 mb-8 flex gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <div>
                  <p className="text-[13px] font-semibold text-[#1C1410] mb-0.5">Cancellation policy</p>
                  <p className="text-[13px] text-[#5A4A3A] leading-[1.65]">
                    Free cancellation within 48 hours of booking. After that, contact us to discuss your options.
                  </p>
                </div>
              </div>

              {/* ── Error ── */}
              {bookingState === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-[10px] px-4 py-3 mb-6">
                  {errorMsg}
                </div>
              )}

              {/* ── Submit button ── */}
              <button
                type="submit"
                disabled={bookingState === "submitting" || quoteLoading}
                className="w-full py-4 bg-[#1C1410] text-white text-[14px] font-semibold tracking-[0.04em] rounded-[10px] hover:bg-[#3D2B1E] active:bg-[#1C1410] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                {bookingState === "submitting"
                  ? "Confirming your booking…"
                  : `Complete booking — ${quoteLoading ? "calculating…" : fmt(displayTotal, currency)}`}
              </button>

              <p className="text-center text-[12px] text-[#8A7968] mt-3 leading-[1.6]">
                By completing this booking you agree to our terms of service.
                <br />You won&apos;t be charged until confirmed.
              </p>
            </form>
          </div>

          {/* ── RIGHT: sticky order summary (desktop) ── */}
          <div className="hidden lg:block lg:sticky lg:top-[80px]">
            <OrderSummary
              property={property} nights={nights} checkIn={checkIn} checkOut={checkOut} guests={guests}
              quoteLoading={quoteLoading} quoteError={quoteError} quote={quote}
              displaySubtotal={displaySubtotal} displayCleaning={displayCleaning}
              displayTaxes={displayTaxes} displayTotal={displayTotal} currency={currency} nightly={nightly}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Order Summary sub-component ───────────────────────────────────────────────
function OrderSummary({
  property, nights, checkIn, checkOut, guests,
  quoteLoading, quoteError, quote,
  displaySubtotal, displayCleaning, displayTaxes, displayTotal, currency, nightly,
}: {
  property: Property; nights: number; checkIn: string; checkOut: string; guests: number;
  quoteLoading: boolean; quoteError: boolean; quote: GuestyQuote | null;
  displaySubtotal: number; displayCleaning: number; displayTaxes: number;
  displayTotal: number; currency: string; nightly: number;
}) {
  return (
    <div className="rounded-[16px] border border-[#EDE8DF] overflow-hidden bg-white">
      {/* Property image + info */}
      <div className="flex gap-4 p-5 border-b border-[#EDE8DF]">
        <div className="relative w-20 h-20 rounded-[10px] overflow-hidden shrink-0 bg-[#EDE8DF]">
          {property.images[0] && (
            <Image src={property.images[0]} alt={property.name} fill className="object-cover" unoptimized />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#8A7968] font-medium mb-0.5">{property.type}</p>
          <p className="font-[family-name:var(--font-playfair)] text-[16px] text-[#1C1410] leading-snug mb-1">{property.name}</p>
          <p className="text-[12px] text-[#8A7968]">{property.location}</p>
        </div>
      </div>

      {/* Stay details */}
      <div className="px-5 py-4 border-b border-[#EDE8DF] bg-[#FAFAF8]">
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            ["Check-in",  formatDate(checkIn)],
            ["Check-out", formatDate(checkOut)],
            ["Guests",    `${guests}`],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#8A7968] font-medium mb-0.5">{label}</p>
              <p className="text-[12px] font-semibold text-[#1C1410] leading-snug">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Price breakdown */}
      <div className="px-5 py-5">
        <p className="text-[12px] uppercase tracking-[0.12em] text-[#8A7968] font-medium mb-4">Price breakdown</p>
        {quoteLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between">
                <div className="h-3.5 bg-[#EDE8DF] rounded w-28 animate-pulse" />
                <div className="h-3.5 bg-[#EDE8DF] rounded w-14 animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between text-[13px] text-[#5A4A3A]">
              <span>
                {quote ? fmt(quote.money.fareAccommodation / nights, currency) : `$${nightly}`} × {nights} night{nights !== 1 ? "s" : ""}
              </span>
              <span>{fmt(displaySubtotal, currency)}</span>
            </div>
            <div className="flex justify-between text-[13px] text-[#5A4A3A]">
              <span>Cleaning fee</span>
              <span>{fmt(displayCleaning, currency)}</span>
            </div>
            {displayTaxes > 0 && (
              <div className="flex justify-between text-[13px] text-[#5A4A3A]">
                <span>Taxes & fees</span>
                <span>{fmt(displayTaxes, currency)}</span>
              </div>
            )}
            <div className="flex justify-between text-[15px] font-bold text-[#1C1410] pt-4 border-t border-[#EDE8DF]">
              <span>Total</span>
              <span>{fmt(displayTotal, currency)}</span>
            </div>
            {quoteError && (
              <p className="text-[11px] text-[#8A7968]">Estimated — final amount confirmed at booking</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * POST /api/guesty/webhook
 *
 * Receives Guesty reservation events and purges the Netlify CDN cache
 * for the affected listing's calendar, so availability shows in real-time.
 *
 * Required env vars:
 *   GUESTY_WEBHOOK_SECRET  — signing secret from Guesty dashboard (Webhooks → secret)
 *   NETLIFY_SITE_ID        — your Netlify site ID (Site settings → General → Site ID)
 *   NETLIFY_AUTH_TOKEN     — personal access token from app.netlify.com/user/applications
 *
 * In Guesty dashboard, set the webhook URL to:
 *   https://<your-site>.netlify.app/api/guesty/webhook
 * Subscribe to events: reservation.create, reservation.update, reservation.cancel
 */

function verifyGuestySignature(secret: string, body: string, header: string): boolean {
  // Guesty sends "sha256=<hex>" in X-Guesty-Signature
  const expected = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
  try {
    return timingSafeEqual(Buffer.from(header), Buffer.from(expected));
  } catch {
    // Lengths differ — definitely wrong
    return false;
  }
}

async function purgeCalendarCache(listingId: string): Promise<void> {
  const siteId = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_AUTH_TOKEN;

  if (!siteId || !token) {
    console.warn("[guesty/webhook] NETLIFY_SITE_ID or NETLIFY_AUTH_TOKEN not set — skipping purge");
    return;
  }

  const res = await fetch("https://api.netlify.com/api/v1/purge", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      site_id: siteId,
      cache_tags: [`calendar-${listingId}`],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`[guesty/webhook] Netlify purge failed (${res.status}):`, text);
  } else {
    console.log(`[guesty/webhook] Cache purged for listing ${listingId}`);
  }
}

function extractListingId(payload: Record<string, unknown>): string | null {
  // Shape 1: { data: { listingId: "..." } }  — most common
  const data = payload.data;
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    if (typeof d.listingId === "string") return d.listingId;
    // Shape 2: { data: { reservation: { listingId: "..." } } }
    const res = d.reservation;
    if (res && typeof res === "object") {
      const r = res as Record<string, unknown>;
      if (typeof r.listingId === "string") return r.listingId;
    }
    // Shape 3: { data: { listing: { _id: "..." } } }
    const lst = d.listing;
    if (lst && typeof lst === "object") {
      const l = lst as Record<string, unknown>;
      if (typeof l._id === "string") return l._id;
    }
  }
  // Shape 4: top-level listingId
  if (typeof payload.listingId === "string") return payload.listingId;
  return null;
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  // Verify signature if secret is configured
  const secret = process.env.GUESTY_WEBHOOK_SECRET;
  if (secret) {
    const sig = req.headers.get("x-guesty-signature") ?? req.headers.get("x-webhook-signature") ?? "";
    if (!verifyGuestySignature(secret, rawBody, sig)) {
      console.warn("[guesty/webhook] Signature verification failed");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = typeof payload.event === "string" ? payload.event : typeof payload.eventName === "string" ? payload.eventName : "unknown";
  console.log(`[guesty/webhook] Received event: ${event}`);

  const listingId = extractListingId(payload);
  if (!listingId) {
    console.log("[guesty/webhook] No listingId found — payload sample:", JSON.stringify(payload).slice(0, 300));
    // Still return 200 so Guesty doesn't retry
    return NextResponse.json({ ok: true, note: "no listingId extracted" });
  }

  await purgeCalendarCache(listingId);

  return NextResponse.json({ ok: true, event, listingId });
}

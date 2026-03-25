import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";

export const dynamic = "force-dynamic";

/**
 * POST /api/guesty/seed-token
 *
 * Manually injects a Guesty OAuth token into the Blobs cache.
 * Use this when the OAuth endpoint is rate-limited and you have a valid token
 * obtained from another source (e.g. curl from localhost).
 *
 * Protected by GUESTY_SEED_SECRET env var.
 *
 * Body: { token: string, expiresIn?: number }
 * Header: x-seed-secret: <GUESTY_SEED_SECRET>
 */
export async function POST(req: NextRequest) {
  const secret = process.env.GUESTY_SEED_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "GUESTY_SEED_SECRET env var not set" }, { status: 500 });
  }
  if (req.headers.get("x-seed-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json() as { token?: string; expiresIn?: number };
  if (!body.token) {
    return NextResponse.json({ error: "token is required" }, { status: 400 });
  }

  const expiresIn = body.expiresIn ?? 86400; // default 24h
  const expiresAt = Date.now() + (expiresIn - 300) * 1000;

  try {
    const store = getStore("guesty-auth");
    // Store the token
    await store.set("token", JSON.stringify({ value: body.token, expiresAt }));
    // Clear any existing backoff so the site starts working immediately
    await store.set("backoff", JSON.stringify({ until: 0 }));

    return NextResponse.json({
      ok: true,
      cachedUntil: new Date(expiresAt).toISOString(),
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

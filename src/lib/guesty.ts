/**
 * Guesty Open API client
 * Handles OAuth2 token acquisition + caching, and authenticated fetch.
 *
 * Required env vars:
 *   GUESTY_CLIENT_ID
 *   GUESTY_CLIENT_SECRET
 */

const BASE = "https://open-api.guesty.com/v1";
const TOKEN_URL = "https://open-api.guesty.com/oauth2/token";

// Module-level token cache (survives across requests in the same server process)
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.GUESTY_CLIENT_ID!,
      client_secret: process.env.GUESTY_CLIENT_SECRET!,
      scope: "open-api",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Guesty auth failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  // Buffer 60 s before actual expiry
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };

  return cachedToken.value;
}

export async function guestyFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAccessToken();

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Guesty API error (${res.status}) ${path}: ${text}`);
  }

  return res.json() as Promise<T>;
}

// ─── Typed helpers ─────────────────────────────────────────────────────────────

export interface GuestyQuote {
  _id: string;
  nights: number;
  money: {
    fareAccommodation: number;
    fareAccommodationAdjusted?: number;
    cleaningFee: number;
    totalTaxes: number;
    total: number;
    currency: string;
  };
}

export interface GuestyAvailabilityDay {
  date: string;
  status: "available" | "unavailable" | "booked" | "blocked";
  price?: number;
  minNights?: number;
}

export interface GuestyAvailabilityResponse {
  days: GuestyAvailabilityDay[];
}

export interface GuestyGuest {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface GuestyReservation {
  _id: string;
  confirmationCode: string;
  status: string;
  checkIn: string;
  checkOut: string;
  nightsCount: number;
  guestsCount: number;
  money: GuestyQuote["money"];
}

export interface GuestyPicture {
  _id: string;
  original: string;
  thumbnail?: string;
  large?: string;
  caption?: string;
  sortOrder?: number;
}

export interface GuestyListing {
  _id: string;
  title: string;
  pictures: GuestyPicture[];
}

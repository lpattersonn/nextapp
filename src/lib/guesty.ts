/**
 * Guesty Pro API client
 *
 * Authentication (in order of precedence):
 *   1. GUESTY_API_KEY          — direct Bearer token (Guesty Pro API key)
 *   2. GUESTY_CLIENT_ID +
 *      GUESTY_CLIENT_SECRET    — OAuth2 client_credentials flow
 *
 * Other env vars:
 *   GUESTY_BASE_URL            — defaults to https://open-api.guesty.com/v1
 */

const BASE_URL =
  (process.env.GUESTY_BASE_URL ?? "https://open-api.guesty.com/v1").replace(
    /\/$/,
    ""
  );
const TOKEN_URL = "https://open-api.guesty.com/oauth2/token";

// ─── Utilities ────────────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// HTTP status codes that are safe to retry
const RETRYABLE_STATUSES = new Set([429, 502, 503, 504]);

// ─── Token cache ──────────────────────────────────────────────────────────────
// Stored on globalThis so it survives Next.js hot-reloads in development and
// is shared across all concurrent requests in the same Node.js process,
// preventing redundant /oauth2/token calls that trigger Guesty rate limits.
declare global {
  // eslint-disable-next-line no-var
  var __guestyToken: { value: string; expiresAt: number } | undefined;
  // eslint-disable-next-line no-var
  var __guestyTokenFlight: Promise<string> | undefined;
  // eslint-disable-next-line no-var
  var __guestyListings: { value: GuestyListingFull[]; expiresAt: number } | undefined;
  // eslint-disable-next-line no-var
  var __guestyListingsFlight: Promise<GuestyListingFull[]> | undefined;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
async function getAccessToken(): Promise<string> {
  // 1. Direct API key — no OAuth needed
  const apiKey = process.env.GUESTY_API_KEY;
  if (apiKey) return apiKey;

  // 2. Cached token still valid → return immediately
  if (global.__guestyToken && Date.now() < global.__guestyToken.expiresAt) {
    return global.__guestyToken.value;
  }

  // 3. In-flight request already running → join it (prevents concurrent token fetches)
  if (global.__guestyTokenFlight) {
    return global.__guestyTokenFlight;
  }

  // 4. Fetch a fresh token (with retry for transient errors)
  const clientId = process.env.GUESTY_CLIENT_ID;
  const clientSecret = process.env.GUESTY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new GuestyAPIError(
      "Guesty: set GUESTY_API_KEY or both GUESTY_CLIENT_ID and GUESTY_CLIENT_SECRET",
      0,
      "/oauth2/token"
    );
  }

  const fetchToken = async (): Promise<string> => {
    let lastErr: Error | null = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      const res = await fetch(TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId!,
          client_secret: clientSecret!,
          scope: "open-api",
        }),
        cache: "no-store",
      });

      if (res.ok) {
        const data = (await res.json()) as { access_token: string; expires_in: number };
        // Cache with a 5-minute buffer before actual expiry
        global.__guestyToken = {
          value: data.access_token,
          expiresAt: Date.now() + Math.max(0, data.expires_in - 300) * 1000,
        };
        global.__guestyTokenFlight = undefined;
        return data.access_token;
      }

      const text = await res.text();
      lastErr = new GuestyAPIError(
        `Guesty auth failed (${res.status}): ${text}`,
        res.status,
        "/oauth2/token"
      );

      // Only retry on transient errors, not on 401/403
      if (!RETRYABLE_STATUSES.has(res.status)) break;
      if (attempt < 3) await sleep(Math.min(1000 * Math.pow(2, attempt - 1), 8000));
    }
    global.__guestyTokenFlight = undefined;
    throw lastErr;
  };

  global.__guestyTokenFlight = fetchToken();
  return global.__guestyTokenFlight;
}

// ─── Retry fetch with exponential backoff ─────────────────────────────────────
async function fetchWithRetry(
  url: string,
  init: RequestInit,
  maxAttempts = 3
): Promise<Response> {
  let lastRes: Response | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(url, init);

      if (!RETRYABLE_STATUSES.has(res.status) || attempt === maxAttempts) {
        return res;
      }

      lastRes = res;

      // Respect Retry-After header if present; otherwise use exponential backoff
      const retryAfterRaw = res.headers.get("Retry-After");
      const delay = retryAfterRaw
        ? parseInt(retryAfterRaw, 10) * 1000
        : Math.min(500 * Math.pow(2, attempt - 1), 8_000);

      console.warn(
        `[guesty] HTTP ${res.status} on attempt ${attempt}/${maxAttempts} — retrying in ${delay}ms`
      );
      await sleep(delay);
    } catch (networkErr) {
      if (attempt === maxAttempts) throw networkErr;
      const delay = Math.min(500 * Math.pow(2, attempt - 1), 8_000);
      console.warn(
        `[guesty] Network error on attempt ${attempt}/${maxAttempts} — retrying in ${delay}ms`
      );
      await sleep(delay);
    }
  }

  // Reached only if all retries returned retryable status codes
  return lastRes!;
}

// ─── Core authenticated fetch ─────────────────────────────────────────────────
export async function guestyFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAccessToken();

  const res = await fetchWithRetry(
    `${BASE_URL}${path}`,
    {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options.headers ?? {}),
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const text = await res.text();
    const err = new GuestyAPIError(
      `Guesty API error (${res.status}) on ${path}: ${text}`,
      res.status,
      path
    );
    console.error("[guesty]", err.message);
    throw err;
  }

  return res.json() as Promise<T>;
}

// ─── Typed error class ────────────────────────────────────────────────────────
export class GuestyAPIError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly path: string
  ) {
    super(message);
    this.name = "GuestyAPIError";
  }

  get isNotFound() {
    return this.statusCode === 404;
  }
  get isConflict() {
    return this.statusCode === 409;
  }
  get isRateLimited() {
    return this.statusCode === 429;
  }
}

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface GuestyMoney {
  fareAccommodation: number;
  fareAccommodationAdjusted?: number;
  cleaningFee: number;
  totalTaxes: number;
  total: number;
  currency: string;
}

export interface GuestyQuote {
  _id: string;
  nights: number;
  money: GuestyMoney;
}

export interface GuestyAvailabilityDay {
  date: string; // YYYY-MM-DD
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
  money: GuestyMoney;
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

/** Extended listing shape — returned by GET /listings with additional fields */
export interface GuestyListingFull extends GuestyListing {
  nickname?: string;
  accommodates: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  active?: boolean;
  address?: {
    city?: string;
    state?: string;
    country?: string;
    full?: string;
  };
  prices?: {
    basePrice?: number;
    currency?: string;
    weekendPrice?: number;
  };
}

/** Normalized availability search result returned to the frontend */
export interface PropertySearchResult {
  propertyId: string;
  slug: string;
  title: string;
  images: string[];
  pricePerNight: number;
  totalPrice: number;
  currency: string;
  availabilityStatus: "available" | "unavailable";
  location: string;
  guests: number;
  beds: number;
  baths: number | string;
  nights: number;
}

/** Input for createReservation */
export interface ReservationParams {
  listingId: string;
  checkIn: string;   // YYYY-MM-DD
  checkOut: string;  // YYYY-MM-DD
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  specialRequests?: string;
}

/** Output of createReservation */
export interface ReservationConfirmation {
  reservationId: string;
  confirmationCode: string;
  status: string;
  money: GuestyMoney;
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

function nightsBetween(checkIn: string, checkOut: string): number {
  return Math.max(
    1,
    Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86_400_000
    )
  );
}

// ─── High-level domain functions ──────────────────────────────────────────────

/**
 * Fetch raw calendar days for a listing between two dates.
 *
 * @param listingId  Guesty listing _id
 * @param startDate  YYYY-MM-DD (inclusive)
 * @param endDate    YYYY-MM-DD (exclusive checkout convention)
 */
export async function getCalendarDays(
  listingId: string,
  startDate: string,
  endDate: string
): Promise<GuestyAvailabilityDay[]> {
  const data = await guestyFetch<GuestyAvailabilityResponse>(
    `/availability-pricing/api/v3/listings/${listingId}?startDate=${startDate}&endDate=${endDate}`
  );
  return data.days ?? [];
}

/**
 * Check if a date range is fully available for a listing.
 * Returns `available: true` only when every day in the range reports "available".
 */
export async function checkAvailability(
  listingId: string,
  checkIn: string,
  checkOut: string
): Promise<{ available: boolean; days: GuestyAvailabilityDay[] }> {
  const days = await getCalendarDays(listingId, checkIn, checkOut);
  const available =
    days.length > 0 && days.every((d) => d.status === "available");
  return { available, days };
}

/**
 * Search available properties across a set of local listings that have a
 * Guesty listing ID attached.  Availability is checked in parallel.
 *
 * The `localProperties` param is intentionally accepted here (rather than
 * imported) so the function stays data-layer agnostic and fully testable.
 */
export async function searchAvailability(params: {
  checkIn: string;
  checkOut: string;
  guests: number;
  localProperties: Array<{
    guestyId?: string;
    slug: string;
    name: string;
    images: string[];
    price: string;
    location: string;
    guests: number;
    beds: number;
    baths: number | string;
  }>;
}): Promise<PropertySearchResult[]> {
  const { checkIn, checkOut, guests, localProperties } = params;
  const nights = nightsBetween(checkIn, checkOut);

  // Only check properties that have a Guesty ID and can accommodate the guest count
  const candidates = localProperties.filter(
    (p) => p.guestyId && p.guests >= guests
  );

  const settled = await Promise.allSettled(
    candidates.map(
      async (property): Promise<PropertySearchResult> => {
        const days = await getCalendarDays(
          property.guestyId!,
          checkIn,
          checkOut
        );
        const isAvailable =
          days.length > 0 && days.every((d) => d.status === "available");
        const pricePerNight = parseInt(property.price.replace(",", ""), 10);

        return {
          propertyId: property.guestyId!,
          slug: property.slug,
          title: property.name,
          images: property.images,
          pricePerNight,
          totalPrice: pricePerNight * nights,
          currency: "USD",
          availabilityStatus: isAvailable ? "available" : "unavailable",
          location: property.location,
          guests: property.guests,
          beds: property.beds,
          baths: property.baths,
          nights,
        };
      }
    )
  );

  // Log any failures for observability but don't surface them as a hard error
  settled.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(
        `[guesty/searchAvailability] Failed for ${candidates[i]?.slug}:`,
        r.reason
      );
    }
  });

  return settled
    .filter(
      (r): r is PromiseFulfilledResult<PropertySearchResult> =>
        r.status === "fulfilled"
    )
    .map((r) => r.value);
}

/**
 * Full reservation creation flow:
 *   1. Validate availability
 *   2. Create price quote
 *   3. Create / upsert guest record
 *   4. Create reservation
 *
 * Throws `GuestyAPIError` (statusCode 409) if dates are no longer available.
 */
export async function createReservation(
  params: ReservationParams
): Promise<ReservationConfirmation> {
  const {
    listingId,
    checkIn,
    checkOut,
    guests,
    firstName,
    lastName,
    email,
    phone,
    specialRequests,
  } = params;

  // 1. Availability guard
  const { available } = await checkAvailability(listingId, checkIn, checkOut);
  if (!available) {
    throw new GuestyAPIError(
      "Selected dates are no longer available",
      409,
      "/availability-pricing"
    );
  }

  // 2. Price quote
  const quote = await guestyFetch<GuestyQuote>("/reservations/quotes", {
    method: "POST",
    body: JSON.stringify({
      checkInDateLocalized: checkIn,
      checkOutDateLocalized: checkOut,
      listingId,
      numberOfGuests: guests,
    }),
  });

  // 3. Guest record (Guesty will upsert by email internally)
  const guest = await guestyFetch<GuestyGuest>("/guests", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      ...(phone ? { phone } : {}),
    }),
  });

  // 4. Reservation
  const reservation = await guestyFetch<GuestyReservation>("/reservations", {
    method: "POST",
    body: JSON.stringify({
      checkInDateLocalized: checkIn,
      checkOutDateLocalized: checkOut,
      listingId,
      numberOfGuests: guests,
      guestId: guest._id,
      quoteId: quote._id,
      source: "direct",
      ...(specialRequests ? { notes: specialRequests } : {}),
    }),
  });

  return {
    reservationId: reservation._id,
    confirmationCode: reservation.confirmationCode,
    status: reservation.status,
    money: reservation.money,
  };
}

/**
 * Fetch every active listing in the Guesty account (handles pagination).
 * Results are cached on globalThis for 10 minutes to avoid hammering the API.
 * Concurrent calls join the in-flight request instead of issuing duplicates.
 */
export async function getAllListings(): Promise<GuestyListingFull[]> {
  // 1. Cache hit
  if (global.__guestyListings && Date.now() < global.__guestyListings.expiresAt) {
    return global.__guestyListings.value;
  }

  // 2. Join an in-flight fetch
  if (global.__guestyListingsFlight) {
    return global.__guestyListingsFlight;
  }

  // 3. Start a fresh paginated fetch
  const fetchAll = async (): Promise<GuestyListingFull[]> => {
    const all: GuestyListingFull[] = [];
    let skip = 0;
    const limit = 100;

    while (true) {
      const data = await guestyFetch<{ results?: GuestyListingFull[] }>(
        `/listings?limit=${limit}&skip=${skip}`
      );
      const page = data.results ?? [];
      all.push(...page);
      if (page.length < limit) break;
      skip += limit;
    }

    const active = all.filter((l) => l.active !== false);

    // Cache for 1 hour — listings/images are synced from Guesty once per hour
    global.__guestyListings = { value: active, expiresAt: Date.now() + 60 * 60 * 1000 };
    global.__guestyListingsFlight = undefined;
    return active;
  };

  global.__guestyListingsFlight = fetchAll().catch((err) => {
    global.__guestyListingsFlight = undefined;
    throw err;
  });

  return global.__guestyListingsFlight;
}

/** Generate a URL-safe slug from a Guesty listing title/nickname. */
export function slugifyListing(listing: GuestyListingFull): string {
  const base = (listing.nickname || listing.title || listing._id)
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return base || listing._id;
}

/** Guesty MongoDB ObjectId pattern (24 hex chars). */
export function isGuestyId(s: string): boolean {
  return /^[0-9a-f]{24}$/i.test(s);
}

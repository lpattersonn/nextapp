/**
 * Fetches all Guesty listings and prints id + title.
 * Run with:
 *   node --env-file=.env.local scripts/fetch-listings.mjs
 */

const TOKEN_URL = "https://open-api.guesty.com/oauth2/token";
const BASE_URL  = "https://open-api.guesty.com/v1";

async function getToken() {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type:    "client_credentials",
      client_id:     process.env.GUESTY_CLIENT_ID,
      client_secret: process.env.GUESTY_CLIENT_SECRET,
      scope:         "open-api",
    }),
  });
  if (!res.ok) throw new Error(`Auth failed (${res.status}): ${await res.text()}`);
  const { access_token } = await res.json();
  return access_token;
}

async function fetchAllListings(token) {
  const all = [];
  let skip = 0;
  const limit = 100;
  while (true) {
    const res = await fetch(
      `${BASE_URL}/listings?limit=${limit}&skip=${skip}`,
      { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
    );
    if (!res.ok) throw new Error(`Listings failed (${res.status}): ${await res.text()}`);
    const data = await res.json();
    const page = data.results ?? data;
    all.push(...page);
    if (page.length < limit) break;
    skip += limit;
  }
  return all;
}

// Properties we want to match from properties.ts
const TARGETS = [
  { slug: "the-outlaw",       name: "Outlaw",        address: "53174 Wyandot",       city: "Pioneertown" },
  { slug: "heavens-door",     name: "Heaven",        address: "5688 Mountain View",  city: "Pioneertown" },
  { slug: "moonlight-mile",   name: "Moonlight",     address: "53253 Boulder",       city: "Pioneertown" },
  { slug: "whistling-rock",   name: "Whistling",     address: "55850 Acoma",         city: "Yucca Valley" },
  { slug: "the-artanis-villa",name: "Artanis",       address: "58466 San Andreas",   city: "Yucca Valley" },
];

function matches(listing, target) {
  const nick    = (listing.nickname   || "").toLowerCase();
  const title   = (listing.title      || "").toLowerCase();
  const street  = (listing.address?.street || "").toLowerCase();
  const city    = (listing.address?.city   || "").toLowerCase();
  const tName   = target.name.toLowerCase();
  const tAddr   = target.address.toLowerCase();
  const tCity   = target.city.toLowerCase();
  return (
    (nick.includes(tName) || title.includes(tName) || street.includes(tAddr.split(" ")[1])) &&
    city.includes(tCity.split(" ")[0])
  );
}

const token    = await getToken();
const listings = await fetchAllListings(token);

console.log(`\nTotal listings in account: ${listings.length}\n`);
console.log("── Matched properties for thecohostcompany site ──\n");

const found = {};
for (const target of TARGETS) {
  const match = listings.find(l => matches(l, target));
  if (match) {
    found[target.slug] = match._id;
    console.log(`✅ ${target.slug.padEnd(22)} → ${match._id}  (${match.nickname || match.title})`);
  } else {
    console.log(`❌ ${target.slug.padEnd(22)} → NOT FOUND`);
  }
}

console.log("\n── All active Pioneertown / Yucca Valley / Joshua Tree listings ──\n");
listings
  .filter(l => {
    const city = (l.address?.city || "").toLowerCase();
    return (city.includes("pioneertown") || city.includes("yucca") || city.includes("joshua")) && l.active;
  })
  .forEach(l => {
    console.log(`  ${l._id}  ${(l.nickname || l.title || "").padEnd(45)}  ${l.address?.street || ""}, ${l.address?.city || ""}`);
  });

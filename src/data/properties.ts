// Guesty CDN helpers
const G = "https://assets.guesty.com/image/upload";
const WP = "https://thecohostcompany.com/wp-content/uploads";
// Portfolio-level path used by older/main property photos
const PROD = `${G}/w_1200,q_auto,f_auto/production/68df18d0ea1895d9005ea6ad`;
// Per-property listing_images path
const LP = `${G}/listing_images_s3/production/property-photos/37fbd8d6503184919d1773d505e2608c62d0958500918990`;

export interface AmenityGroup {
  category: string;
  icon: string;
  items: string[];
}

export interface NearbyItem {
  time: string;
  name: string;
}

export interface Property {
  slug: string;
  /** Guesty listing ID — required for live availability & booking */
  guestyId?: string;
  name: string;
  badge?: string;
  type: string;
  location: string;
  address: string;
  guests: number;
  beds: number;
  baths: number | string;
  price: string;
  images: string[];
  description: string;
  highlights: string[];
  amenities: AmenityGroup[];
  nearby: NearbyItem[];
  houseRules: string[];
}

export const properties: Property[] = [
  // ─── PIONEERTOWN ─────────────────────────────────────────────────────────────
  {
    slug: "the-outlaw",
    guestyId: "68e186e56cf6cf0011674201",
    name: "The Outlaw",
    badge: "Most Popular",
    type: "House",
    location: "Pioneertown, California",
    address: "53174 Wyandot Road, Pioneertown, CA 92268",
    guests: 10,
    beds: 5,
    baths: 4.5,
    price: "1,100",
    images: [
      `${WP}/2025/10/pexzqqzgr8xsj1cdn2ry-1.jpg`,
      `${PROD}/ksqaaynmnofh8o2loxp2.jpg`,
      `${PROD}/kzmxiz4fnm4ijudhe6aq.jpg`,
      `${PROD}/nisb8jvpdap0tqocdzwu.jpg`,
      `${PROD}/rgojuyifdkefev9xs5ge.jpg`,
      `${PROD}/xc9rn7nrrvuajaomqa4c.jpg`,
    ],
    description: `Featured on Netflix's "World's Most Amazing Vacation Rentals"! Step into the Wild West at The Outlaw, a unique vacation rental with rustic interior and western-style décor transporting guests to a bygone era.

Set on 17 private acres of rolling High Desert land, The Outlaw sleeps up to 10 guests across five beautifully appointed bedrooms. The property blends authentic western charm with modern luxury — a fully-stocked saloon, private hot tub and cowboy tub under the stars, hammocks strung between boulders, and multiple fire pits for unforgettable desert evenings.

The open-concept living space features soaring ceilings, an indoor fireplace, premium sound system, and a gourmet kitchen fully stocked for large groups. Starlink WiFi at 100 Mbps keeps you connected when needed — but the real draw is the silence, the space, and the endless sky.

Steps from Pioneertown's legendary Pappy & Harriet's and just 20 minutes from the west entrance of Joshua Tree National Park.`,
    highlights: [
      "Featured on Netflix's World's Most Amazing Vacation Rentals",
      "17 acres of private rolling desert land",
      "Private hot tub + cowboy tub under the stars",
      "100 Mbps Starlink WiFi",
      "Full western-style saloon & entertainment bar",
      "Multiple fire pits, hammocks & outdoor lounging",
    ],
    amenities: [
      {
        category: "Outdoor",
        icon: "🌵",
        items: ["Private Hot Tub", "Cowboy Tub", "Outdoor Pool", "Fire Pit", "BBQ Grill", "Hammocks", "Outdoor Seating", "Patio / Balcony", "Garden / Backyard", "Desert View", "Private Entrance", "Garage"],
      },
      {
        category: "Kitchen",
        icon: "🍳",
        items: ["Full Kitchen", "Refrigerator", "Freezer", "Oven", "Stove", "Microwave", "Dishwasher", "Coffee Maker", "Kettle", "Toaster", "Cookware", "Dishes & Silverware", "Baking Sheet", "BBQ Utensils", "Wine Glasses", "Children's Dinnerware"],
      },
      {
        category: "Entertainment",
        icon: "🎵",
        items: ["Western Saloon / Bar", "Premium Sound System", "Cable TV", "Vinyl Record Player", "Board Games", "Indoor Fireplace"],
      },
      {
        category: "Sleeping",
        icon: "🛏",
        items: ["5 Bedrooms", "Luxury Bed Linens", "Extra Pillows & Blankets", "Room Darkening Shades", "Clothing Storage", "Hangers", "Crib Available", "Pack 'n Play", "High Chair"],
      },
      {
        category: "Bathroom",
        icon: "🚿",
        items: ["4.5 Bathrooms", "Bathtub", "Hot Water", "Hair Dryer", "Shampoo", "Conditioner", "Body Soap", "Shower Gel"],
      },
      {
        category: "Connectivity & Work",
        icon: "💻",
        items: ["Starlink WiFi (100 Mbps)", "Laptop-Friendly Workspace", "Air Conditioning", "Heating", "Ceiling Fans", "Portable Fans"],
      },
      {
        category: "Safety",
        icon: "🛡",
        items: ["Smoke Detector", "Carbon Monoxide Detector", "Fire Extinguisher", "First Aid Kit", "Outlet Covers"],
      },
      {
        category: "Laundry & Extras",
        icon: "🧺",
        items: ["Washer", "Dryer", "Iron", "Essentials", "Cleaning Products", "Luggage Drop-off", "Single Level Home", "Pets Allowed", "Babysitter Recommendations"],
      },
    ],
    nearby: [
      { time: "1 min", name: "Pioneertown & Pappy & Harriet's" },
      { time: "15 min", name: "La Copine Restaurant" },
      { time: "20 min", name: "Joshua Tree National Park" },
      { time: "25 min", name: "Yucca Valley dining & shopping" },
      { time: "35 min", name: "Palm Springs" },
    ],
    houseRules: [
      "Check-in: 3:00 PM – 11:00 PM",
      "Checkout: 11:00 AM",
      "No smoking on premises",
      "No parties or events",
      "Pets allowed (with prior approval)",
      "Quiet hours: 10:00 PM – 8:00 AM",
      "Maximum 10 guests",
    ],
  },
  {
    slug: "heavens-door",
    guestyId: "68e0af4cc98aea0012358333",
    name: "Heaven's Door",
    type: "House",
    location: "Pioneertown, California",
    address: "5688 Mountain View Lane, Pioneertown, CA 92268",
    guests: 8,
    beds: 3,
    baths: 3,
    price: "599",
    images: [
      `${LP}/68e0af4cc98aea0012358333/15a97e98-3195-46-9M2uh`,
      `${LP}/68e0af4cc98aea0012358333/86bcdfa0-83bf-4f-SzdSs`,
      `${WP}/2025/10/af4145d3-c77c-42-8am6-1-1.jpg`,
      `${PROD}/rgojuyifdkefev9xs5ge.jpg`,
      `${PROD}/xc9rn7nrrvuajaomqa4c.jpg`,
    ],
    description: `Heaven's Door is a stunning desert retreat on 5 private acres in Pioneertown, where the boulder-filled backyard becomes your personal hiking trail and the sky becomes your ceiling.

This beautifully designed 3-bedroom home features three en-suite bathrooms — including a unique shark-cage outdoor shower that has to be seen to be believed. The main house has 2 bedrooms, plus a separate 3rd bedroom casita for ultimate privacy. Unwind in the hot tub, soak in one of the two cowboy tubs, or gather around the propane fire pit under an ocean of stars.

The full kitchen is stocked and ready for cooking, the EV charger keeps you powered up, and the vinyl player sets the mood. Steps from Pappy & Harriet's, with Joshua Tree National Park just 20 minutes away.`,
    highlights: [
      "5 private acres with boulder-filled backyard",
      "Hot tub + 2 cowboy tubs",
      "Unique shark-cage outdoor shower",
      "Separate 3rd bedroom casita",
      "EV charger on property",
      "3 en-suite bathrooms",
    ],
    amenities: [
      { category: "Outdoor", icon: "🌵", items: ["Hot Tub", "2 Cowboy Tubs", "Outdoor Shower (Shark Cage)", "Propane Fire Pit", "Propane BBQ Grill", "Outdoor Seating", "Desert Views", "5 Acres Private Land"] },
      { category: "Kitchen", icon: "🍳", items: ["Full Kitchen", "Refrigerator", "Oven", "Stove", "Dishwasher", "Coffee Maker", "Cookware", "Dishes & Silverware", "Wine Glasses"] },
      { category: "Entertainment", icon: "🎵", items: ["Sound System", "Vinyl Player", "TV", "Board Games"] },
      { category: "Sleeping", icon: "🛏", items: ["3 Bedrooms + Separate Casita", "1 King + 2 Queen Beds", "Luxury Bed Linens", "Blackout Curtains", "Clothing Storage"] },
      { category: "Bathroom", icon: "🚿", items: ["3 En-Suite Bathrooms", "Hot Water", "Hair Dryer", "Shampoo", "Conditioner", "Body Soap"] },
      { category: "Connectivity", icon: "💻", items: ["High-Speed WiFi", "EV Charger", "Air Conditioning", "Heating", "Workspace Desk"] },
      { category: "Safety", icon: "🛡", items: ["Smoke Detector", "Carbon Monoxide Detector", "Fire Extinguisher", "First Aid Kit"] },
      { category: "Laundry", icon: "🧺", items: ["Washer", "Dryer", "Iron", "Essentials", "Pets Allowed"] },
    ],
    nearby: [
      { time: "1 min", name: "Pioneertown" },
      { time: "2 min", name: "Pappy & Harriet's Pioneertown Palace" },
      { time: "15 min", name: "La Copine Restaurant" },
      { time: "20 min", name: "Joshua Tree National Park" },
      { time: "25 min", name: "Yucca Valley" },
    ],
    houseRules: [
      "Check-in: 3:00 PM",
      "Checkout: 11:00 AM",
      "No smoking indoors",
      "No parties or events",
      "Pets allowed",
      "Quiet hours: 10:00 PM – 8:00 AM",
    ],
  },
  {
    slug: "moonlight-mile",
    guestyId: "68e0b56f06627a00129155ab",
    name: "Moonlight Mile",
    type: "House",
    location: "Pioneertown, California",
    address: "53253 Boulder View Drive, Pioneertown, CA 92268",
    guests: 8,
    beds: 3,
    baths: 3.5,
    price: "299",
    images: [
      `${LP}/68e0b56f06627a00129155ab/5784991c-5015-4b-v7m2W`,
      `${LP}/68e0b56f06627a00129155ab/e0323e41-f05d-40-3hjNO`,
      `${LP}/68e0b56f06627a00129155ab/8107a0d9-ffcb-46-LKJKq`,
      `${LP}/68e0b56f06627a00129155ab/81211a15-2aee-42-9oBRE`,
      `${LP}/68e0b56f06627a00129155ab/a2a390f3-437d-4e-lgtpu`,
      `${LP}/68e0b56f06627a00129155ab/f59325ee-6768-42-z0CIY`,
      `${LP}/68e0b56f06627a00129155ab/cac37a26-2a1b-48-lBxRj`,
      `${LP}/68e0b56f06627a00129155ab/eeb64e72-c783-4f-8nZJH`,
    ],
    description: `Moonlight Mile is a newly constructed luxury retreat steps from Sand to Snow National Monument — with 6,000+ acres of pristine wilderness right outside the door.

Set on a quiet boulder-lined road in Pioneertown, this 3-bedroom, 3.5-bathroom home sleeps 8 comfortably across 1 King and 3 Queen beds. Soak in the hot tub or cowboy tub, take a shower under the open sky, gather around the propane fire pit beneath the Milky Way, or step inside to play vinyl records by the indoor fireplace.

The covered private patio and yoga mats make every morning feel like a retreat. Minutes from Pappy & Harriet's, La Copine, and the heart of the High Desert.`,
    highlights: [
      "Steps from Sand to Snow National Monument (6,000+ acres)",
      "Hot tub + cowboy tub + 2 outdoor showers",
      "Indoor fireplace & vinyl record player",
      "Covered private patio",
      "EV charger on property",
      "Yoga mats & wellness amenities",
    ],
    amenities: [
      { category: "Outdoor", icon: "🌵", items: ["Hot Tub", "Cowboy Tub", "2 Outdoor Showers", "Propane Fire Pit", "Propane BBQ Grill", "Covered Private Patio", "Desert Views"] },
      { category: "Kitchen", icon: "🍳", items: ["Fully Equipped Kitchen", "Refrigerator", "Oven", "Stove", "Coffee Maker", "Cookware", "Dishes & Silverware"] },
      { category: "Entertainment", icon: "🎵", items: ["Sound System", "Vinyl Player", "TV", "Indoor Fireplace", "Board Games"] },
      { category: "Sleeping", icon: "🛏", items: ["3 Bedrooms", "1 King + 3 Queens", "Luxury Bed Linens", "Extra Pillows & Blankets"] },
      { category: "Bathroom", icon: "🚿", items: ["3.5 Bathrooms", "Hot Water", "Hair Dryer", "Shampoo", "Conditioner"] },
      { category: "Connectivity", icon: "💻", items: ["High-Speed WiFi", "EV Charger", "Air Conditioning", "Heating", "Yoga Mats"] },
      { category: "Safety", icon: "🛡", items: ["Smoke Detector", "Fire Extinguisher", "First Aid Kit"] },
      { category: "Laundry", icon: "🧺", items: ["Washer", "Dryer", "Essentials"] },
    ],
    nearby: [
      { time: "8 min", name: "Pappy & Harriet's" },
      { time: "8 min", name: "Pioneertown" },
      { time: "10 min", name: "La Copine Restaurant" },
      { time: "20 min", name: "Joshua Tree National Park" },
      { time: "25 min", name: "Yucca Valley" },
    ],
    houseRules: [
      "Check-in: 3:00 PM",
      "Checkout: 11:00 AM",
      "No smoking",
      "No parties or events",
      "Quiet hours after 10 PM",
    ],
  },
  // ─── YUCCA VALLEY ────────────────────────────────────────────────────────────
  {
    slug: "whistling-rock",
    guestyId: "68e192d99e441d001299f4a8",
    name: "Whistling Rock",
    badge: "Guest Favorite",
    type: "House",
    location: "Yucca Valley, California",
    address: "55850 Acoma Terrace, Yucca Valley, CA 92284",
    guests: 8,
    beds: 3,
    baths: 3,
    price: "500",
    images: [
      `${WP}/2025/05/YV-Whistling-Rock-01.webp`,
      `${PROD}/nisb8jvpdap0tqocdzwu.jpg`,
      `${PROD}/ksqaaynmnofh8o2loxp2.jpg`,
      `${PROD}/rgojuyifdkefev9xs5ge.jpg`,
    ],
    description: `Whistling Rock is a newly constructed luxury home with endless boulder views and a comprehensive outdoor oasis that sets a new standard for High Desert living.

This 3-bedroom, 3-bathroom retreat features an incredible pool with spa, outdoor kitchen with custom BBQ grill station, a meditation yoga deck overlooking endless desert vistas, and a cozy intimate fire pit. The motorized pergola with shades creates the perfect ambiance for any time of day.

Two master suites include indoor/outdoor access — wake up, step outside, and breathe in the desert air before the rest of the world is awake. Impeccably designed, spotlessly maintained, and consistently 5-star rated.`,
    highlights: [
      "Pool with spa and outdoor dining",
      "Yoga & meditation deck with boulder views",
      "Outdoor kitchen with custom BBQ station",
      "Pergola with motorized shades",
      "2 master suites with indoor/outdoor access",
      "Vinyl player & premium sound system",
    ],
    amenities: [
      { category: "Outdoor", icon: "🌵", items: ["Swimming Pool", "Hot Tub / Spa", "Fire Pit", "Yoga / Meditation Deck", "Outdoor Kitchen", "Custom BBQ Grill", "Pergola with Motorized Shades", "Outdoor Dining", "Desert Views"] },
      { category: "Kitchen", icon: "🍳", items: ["Fully Equipped Kitchen", "Refrigerator", "Oven", "Stove", "Dishwasher", "Coffee Maker", "Cookware", "Wine Glasses"] },
      { category: "Entertainment", icon: "🎵", items: ["Sound System", "Vinyl Player", "TV", "Board Games"] },
      { category: "Sleeping", icon: "🛏", items: ["3 Bedrooms", "2 Master Suites", "Luxury Bed Linens", "Blackout Curtains"] },
      { category: "Bathroom", icon: "🚿", items: ["3 Bathrooms", "Hot Water", "Hair Dryer", "Premium Toiletries"] },
      { category: "Connectivity", icon: "💻", items: ["High-Speed WiFi", "Air Conditioning", "Heating", "Garage", "Free Parking"] },
      { category: "Safety", icon: "🛡", items: ["Smoke Detector", "Fire Extinguisher", "First Aid Kit"] },
      { category: "Laundry", icon: "🧺", items: ["Washer", "Dryer", "Essentials"] },
    ],
    nearby: [
      { time: "10 min", name: "Yucca Valley dining & shopping" },
      { time: "20 min", name: "Joshua Tree National Park" },
      { time: "25 min", name: "Pioneertown & Pappy & Harriet's" },
      { time: "40 min", name: "Palm Springs" },
    ],
    houseRules: [
      "Check-in: 3:00 PM",
      "Checkout: 11:00 AM",
      "No smoking",
      "No parties",
      "Pets allowed",
      "Quiet hours after 10 PM",
    ],
  },
  {
    slug: "the-artanis-villa",
    guestyId: "68e09636d151410014a715aa",
    name: "The Artanis Villa",
    type: "House",
    location: "Yucca Valley, California",
    address: "58466 San Andreas Road, Yucca Valley, CA 92284",
    guests: 12,
    beds: 5,
    baths: 4.5,
    price: "1,499",
    images: [
      `${PROD}/rgojuyifdkefev9xs5ge.jpg`,
      `${PROD}/xc9rn7nrrvuajaomqa4c.jpg`,
      `${PROD}/gkpt8qq78dfxkqu76hnm.jpg`,
      `${PROD}/ksqaaynmnofh8o2loxp2.jpg`,
    ],
    description: `Step into Hollywood's golden era at The Artanis Villa — a 5,295 sq ft Italian-style midcentury estate combining 1950s Hollywood glamour with the peaceful grandeur of the High Desert.

This former Frank Sinatra-owned residence sits on 5.2 private acres and blends original architectural details — hand-laid tile work, wood beams, and graceful arches — with thoughtfully curated décor and picture walls that tell the story of the home's storied past. The result is a space that feels simultaneously timeless and alive.

Sleep 12 guests across 5 bedrooms, entertain around the pool, challenge each other to a tennis match, unwind in the hot tub at 104°, or let the piano set the mood for an unforgettable evening. Featured in VICE's "The Wildest Houses You Can Rent in Joshua Tree."`,
    highlights: [
      "5,295 sq ft on 5.2 private acres",
      "Former Frank Sinatra residence",
      "Featured in VICE Magazine",
      "Pool, hot tub, tennis court & yoga room",
      "Grand piano & full bar",
      "Original 1950s Italian-style architecture",
    ],
    amenities: [
      { category: "Outdoor", icon: "🌵", items: ["Private Pool", "Hot Tub (104°)", "Tennis Court", "Fire Pit", "Outdoor Seating", "5.2 Acres Private Land", "Desert Views"] },
      { category: "Kitchen", icon: "🍳", items: ["Professional Kitchen", "Refrigerator", "Oven", "Dishwasher", "Coffee Maker", "Cookware", "Wine Glasses", "Full Bar Setup"] },
      { category: "Entertainment", icon: "🎵", items: ["Grand Piano", "Premium Sound System", "TV", "Board Games", "Yoga Room"] },
      { category: "Sleeping", icon: "🛏", items: ["5 Bedrooms", "Premium Linens", "Blackout Shades", "Crib / High Chair Available"] },
      { category: "Bathroom", icon: "🚿", items: ["4.5 Bathrooms", "Hot Water", "Hair Dryer", "Shampoo", "Conditioner"] },
      { category: "Connectivity", icon: "💻", items: ["High-Speed WiFi", "Air Conditioning", "Heating"] },
      { category: "Safety", icon: "🛡", items: ["Smoke Detector", "Fire Extinguisher", "First Aid Kit"] },
      { category: "Laundry", icon: "🧺", items: ["Washer", "Dryer", "Iron", "Essentials", "Pets Allowed"] },
    ],
    nearby: [
      { time: "10 min", name: "Yucca Valley dining & shopping" },
      { time: "20 min", name: "Joshua Tree National Park" },
      { time: "25 min", name: "Pioneertown" },
      { time: "40 min", name: "Palm Springs" },
    ],
    houseRules: [
      "Check-in: 4:00 PM",
      "Checkout: 11:00 AM",
      "No smoking indoors",
      "No large events without prior approval",
      "Pets allowed",
      "Maximum 12 guests",
    ],
  },
  {
    slug: "black-butterfly",
    name: "Black Butterfly",
    type: "House",
    location: "Yucca Valley, California",
    address: "4975 Linda Lee Drive, Yucca Valley, CA 92284",
    guests: 6,
    beds: 2,
    baths: 2,
    price: "3,000",
    images: [
      `${PROD}/xflvrxhi0mwvjjvbzbea.jpg`,
      `${PROD}/gkpt8qq78dfxkqu76hnm.jpg`,
      `${PROD}/xc9rn7nrrvuajaomqa4c.jpg`,
    ],
    description: `Black Butterfly is a 2-acre, beautifully designed home offering a tranquil escape where eastern, western, and modern design converge into something completely unique.

The exterior combines high-grade galvanized steel and stucco for a sophisticated industrial-desert aesthetic, while the interior is warm, curated, and immaculately styled. The property features a hot tub, swimming pool, and cozy fire pit set among Joshua trees — perfect for evenings of stargazing, storytelling, and deep silence.

A converted garage space with heater adds versatile living space. Family-friendly, pet-friendly, and consistently rated one of the most memorable stays in the High Desert.`,
    highlights: [
      "2 acres with Joshua trees & desert garden",
      "Pool + hot tub (104°) + fire pit",
      "Unique eastern/western/modern design fusion",
      "High-grade galvanized steel & stucco exterior",
      "Converted garage bonus space",
      "Pet & family friendly",
    ],
    amenities: [
      { category: "Outdoor", icon: "🌵", items: ["Swimming Pool", "Hot Tub (104°)", "Fire Pit", "BBQ Grill", "Landscaped Garden", "Patio Seating", "2 Acres Private Land", "Joshua Trees"] },
      { category: "Kitchen", icon: "🍳", items: ["Fully Equipped Kitchen", "Refrigerator", "Oven", "Dishwasher", "Coffee Maker", "Cookware", "Dishes & Silverware"] },
      { category: "Entertainment", icon: "🎵", items: ["Vinyl Player", "TV", "Sound System"] },
      { category: "Sleeping", icon: "🛏", items: ["2 Bedrooms", "Luxury Bed Linens", "Extra Pillows"] },
      { category: "Bathroom", icon: "🚿", items: ["2 Bathrooms", "Hot Water", "Hair Dryer", "Toiletries"] },
      { category: "Connectivity", icon: "💻", items: ["High-Speed WiFi", "Air Conditioning", "Heating", "Garage"] },
      { category: "Safety", icon: "🛡", items: ["Smoke Detector", "Fire Extinguisher", "First Aid Kit"] },
      { category: "Laundry", icon: "🧺", items: ["Washer", "Dryer", "Essentials", "Pets Allowed", "Child-Friendly"] },
    ],
    nearby: [
      { time: "10 min", name: "Yucca Valley dining & shopping" },
      { time: "20 min", name: "Joshua Tree National Park" },
      { time: "25 min", name: "Pioneertown & Pappy & Harriet's" },
      { time: "40 min", name: "Palm Springs" },
    ],
    houseRules: [
      "Check-in: 3:00 PM",
      "Checkout: 11:00 AM",
      "No smoking indoors",
      "Pets allowed",
      "Family friendly",
      "Quiet hours after 10 PM",
    ],
  },
  // ─── JOSHUA TREE ─────────────────────────────────────────────────────────────
  {
    slug: "prism",
    name: "Prism",
    badge: "Guest Favorite",
    type: "House",
    location: "Joshua Tree, California",
    address: "1824 Mountain Shadow Drive, Joshua Tree, CA 92252",
    guests: 6,
    beds: 2,
    baths: 2.5,
    price: "600",
    images: [
      `${LP}/68e188d4d1f8d500122a10db/a7bf51f0-53ad-42-6xcIh`,
      `${PROD}/gkpt8qq78dfxkqu76hnm.jpg`,
      `${PROD}/xc9rn7nrrvuajaomqa4c.jpg`,
    ],
    description: `A luxury desert home nestled among boulders, offering a truly immersive Joshua Tree experience — starry night skies, personal hiking trails, desert views, and surrounding wildlife all within steps of your door.

Prism earns its name: light plays differently here, shifting through glass and boulders throughout the day to paint every hour in a different desert palette. The master bedroom features a hybrid indoor/outdoor shower, and large sliding glass doors blur the boundary between inside and the ancient landscape surrounding you. Remote-controlled room-darkening shades let you wake up on your terms.

Unwind in the above-ground pool and hot tub on the deck, grill at sunset, curl up in the reading nook, or spread out at the workspace desk. Pet-friendly and consistently 5-star rated.`,
    highlights: [
      "Nestled among private boulders with personal hiking trails",
      "Above-ground pool + hot tub with deck",
      "Hybrid indoor/outdoor master shower",
      "Large sliding glass doors opening to desert",
      "Remote-controlled blackout shades",
      "Pet friendly",
    ],
    amenities: [
      { category: "Outdoor", icon: "🌵", items: ["Above-Ground Pool", "Hot Tub", "Deck with Boulder Views", "Fire Pit", "BBQ Grill", "Private Hiking Trails", "Desert Views"] },
      { category: "Kitchen", icon: "🍳", items: ["Full Kitchen", "Refrigerator", "Oven", "Microwave", "Stove", "Toaster", "Blender", "Coffee Maker", "Dishwasher", "Cookware"] },
      { category: "Entertainment", icon: "🎵", items: ["TV", "Vinyl Player", "Sound System", "Board Games"] },
      { category: "Sleeping", icon: "🛏", items: ["2 Bedrooms", "2 King Beds", "Luxury Linens", "Remote Blackout Shades", "Clothing Storage", "Hangers"] },
      { category: "Bathroom", icon: "🚿", items: ["2.5 Bathrooms", "Indoor/Outdoor Master Shower", "Hot Water", "Hair Dryer", "Shampoo", "Conditioner", "Soap"] },
      { category: "Connectivity", icon: "💻", items: ["High-Speed WiFi", "Air Conditioning", "Heating", "Workspace Desk", "Garage"] },
      { category: "Safety", icon: "🛡", items: ["Smoke Detector", "Carbon Monoxide Detector", "Fire Extinguisher", "First Aid Kit"] },
      { category: "Laundry", icon: "🧺", items: ["Washer", "Dryer", "Essentials", "Pets Allowed"] },
    ],
    nearby: [
      { time: "5 min", name: "Joshua Tree National Park (West Entrance)" },
      { time: "10 min", name: "Joshua Tree Village" },
      { time: "25 min", name: "Pioneertown & Pappy & Harriet's" },
      { time: "45 min", name: "Palm Springs" },
    ],
    houseRules: [
      "Check-in: 3:00 PM",
      "Checkout: 11:00 AM",
      "No smoking",
      "No parties or events",
      "Pets allowed",
      "Quiet hours after 10 PM",
    ],
  },
  {
    slug: "cielito-lindo-retreat",
    name: "Cielito Lindo Retreat",
    type: "House",
    location: "Joshua Tree, California",
    address: "7201 Alturas Drive, Joshua Tree, CA 92252",
    guests: 6,
    beds: 2,
    baths: 2,
    price: "400",
    images: [
      `${LP}/68e0a688f84fbf0012f27c1d/36e485f6-d6a2-4a-vArrg`,
      `${PROD}/xc9rn7nrrvuajaomqa4c.jpg`,
      `${PROD}/gkpt8qq78dfxkqu76hnm.jpg`,
    ],
    description: `Cielito Lindo — "little piece of sky" — is a sacred space for quality time, creative projects, and genuine digital detoxing. This remodeled former homesteader cabin on 2 acres sits walking distance from downtown Joshua Tree, yet feels like another world entirely.

Featured in Dwell's "16 Ultimate Joshua Tree Airbnbs," the property is famous for its hot tub at 104° and two 4-foot cowboy tubs. The 2,000 sq ft chef's kitchen is fully stocked, the standalone bathtub is a statement piece, and the covered outdoor dining area invites long breakfasts and slower mornings.

The vinyl player, lay-flat lounge chairs, hammock, and propane fire pit take care of the evenings. Consistently 5-star rated — one guest called it "A1. Everything you want and need."`,
    highlights: [
      "Featured in Dwell Magazine",
      "Hot tub (104°) + 2 cowboy tubs",
      "2,000 sq ft chef's kitchen",
      "Walking distance to Joshua Tree Village",
      "Standalone bathtub & covered outdoor dining",
      "2 acres with complete seclusion",
    ],
    amenities: [
      { category: "Outdoor", icon: "🌵", items: ["Hot Tub (104°)", "2 Cowboy Tubs", "Propane Fire Pit", "Propane BBQ Grill", "Covered Outdoor Dining", "Hammock", "Lay-Flat Lounge Chairs", "2 Acres Private Land"] },
      { category: "Kitchen", icon: "🍳", items: ["Chef's Kitchen (2,000 sq ft)", "Refrigerator", "Oven", "Stove", "Dishwasher", "Coffee Maker", "Cookware", "Wine Glasses"] },
      { category: "Entertainment", icon: "🎵", items: ["Sound System", "Vinyl Player", "TV"] },
      { category: "Sleeping", icon: "🛏", items: ["2 Bedrooms", "1 King + 1 Queen + 1 Double", "Luxury Bed Linens", "Extra Pillows"] },
      { category: "Bathroom", icon: "🚿", items: ["2 Bathrooms", "Standalone Bathtub", "Hot Water", "Hair Dryer", "Shampoo", "Conditioner"] },
      { category: "Connectivity", icon: "💻", items: ["High-Speed WiFi", "Air Conditioning", "Heating"] },
      { category: "Safety", icon: "🛡", items: ["Smoke Detector", "Fire Extinguisher", "First Aid Kit"] },
      { category: "Laundry", icon: "🧺", items: ["Washer", "Dryer", "Essentials"] },
    ],
    nearby: [
      { time: "1 min", name: "Joshua Tree Village" },
      { time: "5 min", name: "Joshua Tree National Park" },
      { time: "20 min", name: "Pappy & Harriet's, Pioneertown, La Copine" },
      { time: "45 min", name: "Palm Springs" },
    ],
    houseRules: [
      "Check-in: 3:00 PM",
      "Checkout: 11:00 AM",
      "No smoking",
      "No parties",
      "Quiet hours after 10 PM",
    ],
  },
  {
    slug: "moonbeam-ranch",
    name: "Moonbeam Ranch",
    type: "House",
    location: "Joshua Tree, California",
    address: "7354 Quail Springs Road, Joshua Tree, CA 92252",
    guests: 8,
    beds: 3,
    baths: 2.5,
    price: "1,000",
    images: [
      `${PROD}/xc9rn7nrrvuajaomqa4c.jpg`,
      `${PROD}/gkpt8qq78dfxkqu76hnm.jpg`,
      `${PROD}/ksqaaynmnofh8o2loxp2.jpg`,
    ],
    description: `Moonbeam Ranch is a private spa oasis in Joshua Tree — a luxury desert retreat designed for complete relaxation and complete escape.

The viewing deck overlooks expansive desert vistas that stretch to the horizon. The modern pool, hot tub at 104°, and sauna create a wellness sanctuary; the outdoor shower and fire pit bookend your evenings perfectly. Inside, a fully equipped kitchen, hanging bed, outdoor bar with cooler, and a casita with arcade games ensure there's something for everyone.

The garage and private entrance add to the sense of seclusion. Pet-friendly, consistently 5-star rated, and everything the High Desert should feel like.`,
    highlights: [
      "Private spa oasis — pool, hot tub (104°) & sauna",
      "Viewing deck with panoramic desert vistas",
      "Casita with arcade games",
      "Outdoor bar, hanging bed & fire pit",
      "Private garage & entrance",
      "Pet friendly",
    ],
    amenities: [
      { category: "Outdoor", icon: "🌵", items: ["Swimming Pool", "Hot Tub (104°)", "Sauna", "Outdoor Shower", "Fire Pit", "Viewing Deck", "Outdoor Bar with Cooler", "Outdoor Dining", "Desert Views"] },
      { category: "Kitchen", icon: "🍳", items: ["Fully Equipped Kitchen", "Refrigerator", "Oven", "Stove", "Dishwasher", "Coffee Maker", "Cookware", "Wine Glasses"] },
      { category: "Entertainment", icon: "🎵", items: ["Casita with Arcade Games", "Sound System", "TV", "Hanging Bed", "Board Games"] },
      { category: "Sleeping", icon: "🛏", items: ["3 Bedrooms", "Luxury Bed Linens", "Blackout Curtains", "Clothing Storage"] },
      { category: "Bathroom", icon: "🚿", items: ["2.5 Bathrooms", "Hot Water", "Hair Dryer", "Premium Toiletries"] },
      { category: "Connectivity", icon: "💻", items: ["High-Speed WiFi", "Air Conditioning", "Heating", "Workspace", "Garage", "Private Entrance"] },
      { category: "Safety", icon: "🛡", items: ["Smoke Detector", "Fire Extinguisher", "First Aid Kit"] },
      { category: "Laundry", icon: "🧺", items: ["Washer", "Dryer", "Iron", "Essentials", "Pets Allowed"] },
    ],
    nearby: [
      { time: "10 min", name: "Joshua Tree Village" },
      { time: "10 min", name: "Joshua Tree National Park" },
      { time: "30 min", name: "Pioneertown & Pappy & Harriet's" },
    ],
    houseRules: [
      "Check-in: 3:00 PM",
      "Checkout: 11:00 AM",
      "No smoking indoors",
      "Pets allowed",
      "No parties",
      "Quiet hours after 10 PM",
    ],
  },
  {
    slug: "boulders-gate",
    name: "Boulders Gate",
    badge: "Guest Favorite",
    type: "House",
    location: "Joshua Tree, California",
    address: "63845 Elliott Lane, Joshua Tree, CA 92252",
    guests: 8,
    beds: 3,
    baths: 3,
    price: "2,300",
    images: [
      `${G}/v1765152197/production/68df18d0ea1895d9005ea6ad/ywdv80ra32npl9i3ted0.jpg`,
      `${G}/v1765151718/production/68df18d0ea1895d9005ea6ad/me8zotgmme9tilkhdgvy.jpg`,
      `${G}/v1765149256/production/68df18d0ea1895d9005ea6ad/krqcoo2talwoyoxmfrbk.jpg`,
      `${PROD}/gkpt8qq78dfxkqu76hnm.jpg`,
      `${PROD}/xc9rn7nrrvuajaomqa4c.jpg`,
    ],
    description: `An ultra-luxury experience camouflaged amongst the raw, beautiful boulder land of Joshua Tree — directly along the quiet edge of Joshua Tree National Park.

Boulders Gate is thoughtfully curated with the highest-end finishes and furnishings, offering unobstructed views of iconic boulders, desert flora, and star-filled skies from every room. The outdoor pool overlooks city lights with mountain vistas in the distance — a scene that genuinely takes your breath away.

Three all-King bedrooms, three impeccable bathrooms, a sauna, gym, EV charger, and a level of design sophistication rarely found in short-term rentals. This is a once-in-a-lifetime stay.`,
    highlights: [
      "Directly along Joshua Tree National Park edge",
      "Pool overlooking city lights & mountain vistas",
      "All King beds — three impeccable bedrooms",
      "Sauna, gym & EV charger",
      "Highest-end finishes and furnishings",
      "Unobstructed boulder, flora & sky views",
    ],
    amenities: [
      { category: "Outdoor", icon: "🌵", items: ["Private Pool", "Hot Tub", "Fire Pit", "Sauna", "Boulder Views", "City Light Views", "Mountain Vistas", "Patio / Balcony"] },
      { category: "Kitchen", icon: "🍳", items: ["Designer Kitchen", "Refrigerator", "Freezer", "Oven", "Microwave", "Dishwasher", "Coffee Maker", "Cookware", "Wine Glasses"] },
      { category: "Entertainment", icon: "🎵", items: ["Home Gym", "Premium Sound System", "Smart TV", "Board Games"] },
      { category: "Sleeping", icon: "🛏", items: ["3 Bedrooms", "3 King Beds", "Luxury Linens", "Blackout Shades", "Walk-in Closets"] },
      { category: "Bathroom", icon: "🚿", items: ["3 Bathrooms", "Soaking Tub", "Rain Shower", "Hot Water", "Premium Toiletries"] },
      { category: "Connectivity", icon: "💻", items: ["High-Speed WiFi", "EV Charger", "Air Conditioning", "Heated Floors"] },
      { category: "Safety", icon: "🛡", items: ["Smoke Detector", "Carbon Monoxide Detector", "Fire Extinguisher", "First Aid Kit"] },
      { category: "Laundry", icon: "🧺", items: ["Washer", "Dryer", "Iron", "Full Essentials"] },
    ],
    nearby: [
      { time: "2 min", name: "Joshua Tree National Park (boundary)" },
      { time: "15 min", name: "Joshua Tree Village" },
      { time: "30 min", name: "Pioneertown & Pappy & Harriet's" },
      { time: "50 min", name: "Palm Springs" },
    ],
    houseRules: [
      "Check-in: 4:00 PM",
      "Checkout: 11:00 AM",
      "No smoking",
      "No parties or events",
      "No pets",
      "Quiet hours after 9 PM",
    ],
  },
  // ─── TWENTYNINE PALMS ────────────────────────────────────────────────────────
  {
    slug: "daydream-retreat",
    name: "Daydream Retreat",
    type: "House",
    location: "Twentynine Palms, California",
    address: "71415 Mesa Drive, Twentynine Palms, CA 92277",
    guests: 7,
    beds: 3,
    baths: 3,
    price: "300",
    images: [
      `${PROD}/mj8oslr93qflaiaclhtt.jpg`,
      `${PROD}/rgojuyifdkefev9xs5ge.jpg`,
      `${PROD}/gkpt8qq78dfxkqu76hnm.jpg`,
    ],
    description: `Fire up the BBQ grill and savor a delicious meal under the stars, or gather around the fire pit with hammock in hand for a cozy desert evening — Daydream Retreat is the ultimate laid-back escape in Twentynine Palms.

This 3-bedroom, 3-bathroom home on the quieter east side of the High Desert sleeps 7 guests comfortably. The in-ground pool and jacuzzi provide the perfect anchor for long afternoons, while the game room — stocked with air hockey, foosball, and basketball — keeps the evenings lively.

The fully equipped kitchen, dishwasher, vinyl player, and sound system handle the rest. Pet-friendly, family-friendly, and consistently rated the best Airbnb guests have ever stayed at.`,
    highlights: [
      "In-ground pool + jacuzzi (104°)",
      "Game room: air hockey, foosball, pool table, basketball",
      "BBQ grill, fire pit & hammock",
      "Vinyl player & premium sound system",
      "Pet & family friendly",
      "Close to JTNP east entrance",
    ],
    amenities: [
      { category: "Outdoor", icon: "🌵", items: ["In-Ground Pool", "Jacuzzi (104°)", "BBQ Grill", "Fire Pit", "Hammock", "Outdoor Kitchen", "Desert Views", "Joshua Trees"] },
      { category: "Kitchen", icon: "🍳", items: ["Fully Equipped Kitchen", "Refrigerator", "Oven", "Stove", "Dishwasher", "Coffee Maker", "Cookware"] },
      { category: "Entertainment", icon: "🎵", items: ["Game Room (Air Hockey, Foosball, Basketball)", "Sound System", "Vinyl Player", "TV"] },
      { category: "Sleeping", icon: "🛏", items: ["3 Bedrooms", "Luxury Bed Linens", "Extra Pillows & Blankets"] },
      { category: "Bathroom", icon: "🚿", items: ["3 Bathrooms", "Hot Water", "Hair Dryer", "Essentials"] },
      { category: "Connectivity", icon: "💻", items: ["High-Speed WiFi", "Air Conditioning", "Heating", "Workspace", "Single Level Home"] },
      { category: "Safety", icon: "🛡", items: ["Smoke Detector", "Fire Extinguisher", "First Aid Kit"] },
      { category: "Laundry", icon: "🧺", items: ["Washer", "Dryer", "Essentials", "Pets Allowed", "Family Friendly"] },
    ],
    nearby: [
      { time: "5 min", name: "Joshua Tree National Park (East Entrance)" },
      { time: "15 min", name: "Twentynine Palms dining" },
      { time: "30 min", name: "Joshua Tree Village" },
      { time: "35 min", name: "Pioneertown" },
    ],
    houseRules: [
      "Check-in: 3:00 PM",
      "Checkout: 11:00 AM",
      "No smoking",
      "Pets allowed",
      "Family friendly",
      "No parties",
    ],
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

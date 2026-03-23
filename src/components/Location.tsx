import Link from "next/link";

const driveItems = [
  { time: "5–10 min", desc: "drive to local coffee shops & farm-to-table dining" },
  { time: "10–15 min", desc: "drive to Joshua Tree National Park entrances" },
  { time: "5–10 min", desc: "drive to art galleries, vintage shops & local markets" },
  { time: "10–20 min", desc: "drive to live music, stargazing spots & desert hikes" },
];

function CaliforniaMap() {
  const hLines = [60, 85, 110, 135, 160, 185, 210, 235, 258, 280];
  const vLines = [55, 85, 115, 145, 170, 195];

  return (
    <svg viewBox="0 0 260 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <clipPath id="ca-clip">
          <path d="M48,6 L168,4 L188,18 L196,38 L200,58 L198,80 L202,102
                   L198,124 L196,148 L190,170 L184,190 L178,208
                   L170,224 L162,238 L152,252 L140,264 L128,274
                   L114,280 L100,282 L86,278 L74,268 L64,256
                   L56,240 L48,222 L42,204 L36,184 L30,162
                   L26,140 L22,118 L18,96 L16,74 L18,52
                   L26,34 L36,18 Z" />
        </clipPath>
      </defs>

      {/* State fill */}
      <path
        d="M48,6 L168,4 L188,18 L196,38 L200,58 L198,80 L202,102
           L198,124 L196,148 L190,170 L184,190 L178,208
           L170,224 L162,238 L152,252 L140,264 L128,274
           L114,280 L100,282 L86,278 L74,268 L64,256
           L56,240 L48,222 L42,204 L36,184 L30,162
           L26,140 L22,118 L18,96 L16,74 L18,52
           L26,34 L36,18 Z"
        fill="#F7F4EF"
        stroke="#C4A882"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* County grid lines — horizontal */}
      {hLines.map((y) => (
        <line key={y} x1="16" y1={y} x2="202" y2={y}
          stroke="#C4A882" strokeWidth="0.5" strokeOpacity="0.35"
          clipPath="url(#ca-clip)" />
      ))}
      {/* County grid lines — vertical */}
      {vLines.map((x) => (
        <line key={x} x1={x} y1="6" x2={x} y2="282"
          stroke="#C4A882" strokeWidth="0.5" strokeOpacity="0.3"
          clipPath="url(#ca-clip)" />
      ))}

      {/* "California" diagonal script watermark */}
      <text
        x="0" y="0"
        fontFamily="Georgia, serif"
        fontSize="34"
        fill="#C4A882"
        fillOpacity="0.30"
        fontStyle="italic"
        transform="translate(185, 230) rotate(-68)"
      >
        California
      </text>

      {/* Heart pin — High Desert / Joshua Tree area */}
      <g transform="translate(148, 265)">
        <path
          d="M0 0C-3.5 0-6 2.5-6 5.5C-6 9.5 0 16 0 16S6 9.5 6 5.5C6 2.5 3.5 0 0 0Z"
          fill="#C4A882" stroke="#A08060" strokeWidth="0.5"
        />
      </g>

      {/* Small island */}
      <ellipse cx="110" cy="298" rx="8" ry="4" fill="#F7F4EF" stroke="#C4A882" strokeWidth="1.2" />
    </svg>
  );
}

function OklahomaMap() {
  const hLines = [72, 92, 112, 132, 152, 168];
  const vLines = [36, 62, 88, 114, 140, 166, 192, 218, 244];

  return (
    <svg viewBox="0 0 278 210" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <clipPath id="ok-clip">
          <path d="M4,54 L68,54 L68,4 L272,4 L272,166 L4,166 Z" />
        </clipPath>
      </defs>

      {/* "Oklahoma" script watermark at top */}
      <text
        x="172" y="42"
        fontFamily="Georgia, serif"
        fontSize="32"
        fill="#C4A882"
        fillOpacity="0.45"
        fontStyle="italic"
        textAnchor="middle"
      >
        Oklahoma
      </text>

      {/* State fill */}
      <path
        d="M4,54 L68,54 L68,4 L272,4 L272,166 L4,166 Z"
        fill="#F7F4EF"
      />

      {/* County grid lines — horizontal */}
      {hLines.map((y) => (
        <line key={y} x1={y < 54 ? 68 : 4} y1={y} x2={272} y2={y}
          stroke="#C4A882" strokeWidth="0.6" strokeOpacity="0.4"
          clipPath="url(#ok-clip)" />
      ))}
      {/* County grid lines — vertical */}
      {vLines.map((x) => (
        <line key={x} x1={x} y1="4" x2={x} y2="166"
          stroke="#C4A882" strokeWidth="0.6" strokeOpacity="0.4"
          clipPath="url(#ok-clip)" />
      ))}
      {/* Panhandle vertical separator */}
      <line x1="68" y1="4" x2="68" y2="54"
        stroke="#C4A882" strokeWidth="0.6" strokeOpacity="0.4" />

      {/* State border */}
      <path
        d="M4,54 L68,54 L68,4 L272,4 L272,166 L4,166 Z"
        fill="none"
        stroke="#C4A882"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Heart pin — Broken Bow (far east OK) */}
      <g transform="translate(250, 128)">
        <path
          d="M0 0C-3.5 0-6 2.5-6 5.5C-6 9.5 0 16 0 16S6 9.5 6 5.5C6 2.5 3.5 0 0 0Z"
          fill="#C4A882" stroke="#A08060" strokeWidth="0.5"
        />
      </g>
    </svg>
  );
}

export default function Location() {
  return (
    <section id="location" className="py-24 bg-[#F7F4EF]">
      <div className="max-w-[1120px] mx-auto px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[16px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-4">
            Find Us
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[52px] font-normal text-[#1C1410] leading-[1.1]">
            Where are we located?
          </h2>
        </div>

        {/* Top row: two large cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5 mb-5">
          {/* California card — drive times + map */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm p-8 flex gap-8 items-center">
            {/* Drive times */}
            <div className="space-y-6 shrink-0 w-[260px]">
              {driveItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex-1">
                    <span className="font-semibold text-[#1C1410] text-[16px]">{item.time} </span>
                    <span className="text-[16px] text-[#8A7968]">{item.desc}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-[10px] shrink-0">
                    <div className="w-6 h-px bg-[#C4A882]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C4A882]" />
                  </div>
                </div>
              ))}
            </div>

            {/* California map */}
            <div className="flex-1 h-[320px]">
              <CaliforniaMap />
            </div>
          </div>

          {/* Oklahoma card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="flex-1 p-6">
              <div className="h-[260px]">
                <OklahomaMap />
              </div>
            </div>
            <div className="px-6 py-5 bg-[#F0EBE3] flex items-center justify-between">
              <div>
                <p className="text-[16px] tracking-[0.14em] uppercase text-[#8A7968] font-semibold mb-1">
                  Broken Bow, OK – 8 Listings
                </p>
                <h4 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#1C1410]">
                  Oklahoma, USA
                </h4>
              </div>
              <Link
                href="#"
                className="flex items-center gap-1.5 text-[16px] text-[#7B5B3A] font-medium border border-[#C4A882] px-4 py-2 rounded-full hover:bg-[#7B5B3A] hover:text-white hover:border-[#7B5B3A] transition-colors whitespace-nowrap"
              >
                View Map ↗
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row: two info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* California info */}
          <div className="bg-[#F0EBE3] rounded-2xl px-8 py-7 shadow-sm flex items-center justify-between gap-6">
            <div>
              <p className="text-[16px] text-[#8A7968] mb-2">
                Pioneertown, Joshua Tree, Yucca Valley, and beyond
              </p>
              <h4 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#1C1410]">
                In High Desert in California, USA
              </h4>
            </div>
            <Link
              href="#"
              className="flex items-center gap-1.5 text-[16px] text-[#7B5B3A] font-medium border border-[#C4A882] px-4 py-2 rounded-full hover:bg-[#7B5B3A] hover:text-white hover:border-[#7B5B3A] transition-colors whitespace-nowrap shrink-0"
            >
              View Map ↗
            </Link>
          </div>

          {/* For hosts */}
          <div className="bg-[#F0EBE3] rounded-2xl px-8 py-7 shadow-sm flex items-center justify-between gap-6">
            <div>
              <p className="text-[16px] tracking-[0.14em] uppercase text-[#8A7968] font-semibold mb-2">
                For Host
              </p>
              <h4 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal text-[#1C1410]">
                Join The Cohost
              </h4>
            </div>
            <Link
              href="/contact"
              className="flex items-center gap-1.5 text-[16px] text-[#7B5B3A] font-medium border border-[#C4A882] px-4 py-2 rounded-full hover:bg-[#7B5B3A] hover:text-white hover:border-[#7B5B3A] transition-colors whitespace-nowrap shrink-0"
            >
              Contact Us ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

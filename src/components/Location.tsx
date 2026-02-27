import Link from "next/link";

const driveItems = [
  { time: "5–10 min", desc: "drive to local coffee shops & farm-to-table dining" },
  { time: "10–15 min", desc: "drive to Joshua Tree National Park entrances" },
  { time: "5–10 min", desc: "drive to art galleries, vintage shops & local markets" },
  { time: "10–20 min", desc: "drive to live music, stargazing spots & desert hikes" },
];

function HeartPin() {
  return (
    <path
      d="M0 0C-3.5 0-6 2.5-6 5.5C-6 9.5 0 16 0 16S6 9.5 6 5.5C6 2.5 3.5 0 0 0Z"
      fill="#C4A882"
      stroke="#A08060"
      strokeWidth="0.5"
    />
  );
}

function CaliforniaMap() {
  return (
    <svg
      viewBox="0 0 210 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* State outline — simplified but recognisable California */}
      <path
        d="M40,8 L158,2 L185,28 L196,70 L192,108 L196,142 L188,176
           L178,205 L168,230 L155,252 L140,268 L124,278 L108,282
           L92,278 L78,268 L66,254 L56,236 L46,216 L38,196
           L32,175 L27,153 L22,130 L18,108 L14,86 L12,64
           L15,44 L25,28 Z"
        fill="#F7F4EF"
        stroke="#C4A882"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Internal county-style lines — horizontal */}
      {[55, 80, 108, 135, 162, 190, 215, 242].map((y, i) => {
        const left = i < 3 ? 14 : 20;
        const right = i > 5 ? 165 : 190;
        return (
          <line
            key={y}
            x1={left} y1={y} x2={right} y2={y}
            stroke="#C4A882" strokeWidth="0.5" strokeOpacity="0.35"
          />
        );
      })}
      {/* Vertical county lines */}
      {[55, 90, 125, 158].map((x) => (
        <line
          key={x}
          x1={x} y1={30} x2={x} y2={280}
          stroke="#C4A882" strokeWidth="0.5" strokeOpacity="0.3"
        />
      ))}

      {/* "California" diagonal script watermark */}
      <text
        x="0"
        y="0"
        fontFamily="Georgia, serif"
        fontSize="38"
        fill="#C4A882"
        fillOpacity="0.28"
        fontStyle="italic"
        transform="translate(168, 215) rotate(-68)"
      >
        California
      </text>

      {/* Heart pin — High Desert / Joshua Tree area */}
      <g transform="translate(152, 248)">
        <HeartPin />
      </g>
    </svg>
  );
}

function OklahomaMap() {
  // County grid params
  const panhandleRight = 68;
  const panhandleBottom = 68;
  const bodyRight = 268;
  const bodyBottom = 162;

  const hLines = [32, 52, 72, 92, 112, 132, 152];
  const vLines = [92, 118, 144, 170, 196, 222, 248];

  return (
    <svg
      viewBox="0 0 278 175"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <clipPath id="ok-state">
          <path d="M4,4 L268,4 L268,162 L68,162 L68,68 L4,68 Z" />
        </clipPath>
      </defs>

      {/* State fill */}
      <path
        d="M4,4 L268,4 L268,162 L68,162 L68,68 L4,68 Z"
        fill="#F7F4EF"
      />

      {/* County grid lines (clipped inside state) */}
      {hLines.map((y) => (
        <line
          key={y}
          x1={y < panhandleBottom ? 4 : panhandleRight}
          y1={y}
          x2={bodyRight}
          y2={y}
          stroke="#C4A882"
          strokeWidth="0.6"
          strokeOpacity="0.4"
          clipPath="url(#ok-state)"
        />
      ))}
      {vLines.map((x) => (
        <line
          key={x}
          x1={x}
          y1={4}
          x2={x}
          y2={bodyBottom}
          stroke="#C4A882"
          strokeWidth="0.6"
          strokeOpacity="0.4"
        />
      ))}
      {/* Panhandle vertical line */}
      <line x1={4} y1={4} x2={4} y2={panhandleBottom} stroke="#C4A882" strokeWidth="0.6" strokeOpacity="0.4" />

      {/* State border on top */}
      <path
        d="M4,4 L268,4 L268,162 L68,162 L68,68 L4,68 Z"
        fill="none"
        stroke="#C4A882"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* "Oklahoma" script watermark */}
      <text
        x="172"
        y="52"
        fontFamily="Georgia, serif"
        fontSize="26"
        fill="#C4A882"
        fillOpacity="0.35"
        fontStyle="italic"
        textAnchor="middle"
      >
        Oklahoma
      </text>

      {/* Heart pin — Broken Bow (far east OK) */}
      <g transform="translate(242, 118)">
        <HeartPin />
      </g>
    </svg>
  );
}

export default function Location() {
  return (
    <section id="location" className="py-24 bg-[#F7F4EF]">
      <div className="max-w-[1240px] mx-auto px-10">
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
          {/* California card — map + drive times */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm p-8 grid grid-cols-[200px_1fr] gap-6 items-center">
            {/* Drive times */}
            <div className="space-y-5">
              {driveItems.map((item) => (
                <div key={item.time} className="flex gap-3 items-start">
                  <div className="shrink-0 mt-0.5">
                    <span className="font-semibold text-[#1C1410] text-[16px] block leading-tight">
                      {item.time}
                    </span>
                    <span className="text-[16px] text-[#8A7968] leading-snug block mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* California map */}
            <div className="h-[340px]">
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
            <div className="px-6 py-5 border-t border-[#F0EBE2] flex items-center justify-between">
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
          <div className="bg-white rounded-2xl px-8 py-7 shadow-sm flex items-center justify-between gap-6">
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
          <div className="bg-white rounded-2xl px-8 py-7 shadow-sm flex items-center justify-between gap-6">
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

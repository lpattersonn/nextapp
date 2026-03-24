"use client";
import { useEffect, useRef } from "react";
import type { GuestyListingFull } from "@/lib/guesty";

function cityKey(l: GuestyListingFull) {
  const c = l.address?.city ?? "";
  if (/pioneer/i.test(c)) return "Pioneertown";
  if (/yucca/i.test(c)) return "Yucca Valley";
  if (/joshua/i.test(c)) return "Joshua Tree";
  if (/twentynine|29 palms/i.test(c)) return "Twentynine Palms";
  if (/morongo/i.test(c)) return "Morongo Valley";
  return c || "Hi-Desert";
}

const CITY_COORDS: Record<string, [number, number]> = {
  "Joshua Tree":      [34.1342, -116.3130],
  "Pioneertown":      [34.1650, -116.5100],
  "Yucca Valley":     [34.1144, -116.4322],
  "Twentynine Palms": [34.1356, -116.0542],
  "Morongo Valley":   [34.0496, -116.7254],
  "Hi-Desert":        [34.1342, -116.3130],
};

interface Props {
  listings: GuestyListingFull[];
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}

export default function PropertyMap({ listings, hoveredId, onHover }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Map<string, any>>(new Map());

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    import("leaflet").then((L) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current!, {
        center: [34.13, -116.31],
        zoom: 10,
        zoomControl: false,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        { attribution: "© OpenStreetMap © CARTO", maxZoom: 18 }
      ).addTo(map);

      L.control.zoom({ position: "topright" }).addTo(map);
      mapRef.current = map;
      addMarkers(L, map, listings, hoveredId, onHover, markersRef);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current.clear();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-render markers when listings or hover state changes
  useEffect(() => {
    if (!mapRef.current) return;
    import("leaflet").then((L) => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current.clear();
      addMarkers(L, mapRef.current, listings, hoveredId, onHover, markersRef);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings, hoveredId]);

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div ref={containerRef} className="w-full h-full" />
    </>
  );
}

function pinHtml(label: string, isHovered: boolean) {
  return `<div style="
    background:${isHovered ? "#1C1410" : "#fff"};
    color:${isHovered ? "#fff" : "#1C1410"};
    border:2px solid ${isHovered ? "#1C1410" : "#C4A882"};
    padding:4px 10px;
    border-radius:20px;
    font-size:12px;
    font-weight:700;
    white-space:nowrap;
    box-shadow:0 2px 8px rgba(0,0,0,0.18);
    cursor:pointer;
    font-family:system-ui,sans-serif;
  ">${label}</div>`;
}

function cityPinHtml(city: string, count: number, minPrice: number | null) {
  const priceStr = minPrice && minPrice > 0 ? `From $${minPrice.toLocaleString()}` : city;
  return `<div style="
    background:#fff;
    color:#1C1410;
    border:2px solid #C4A882;
    padding:5px 12px;
    border-radius:20px;
    font-size:12px;
    font-weight:700;
    white-space:nowrap;
    box-shadow:0 2px 8px rgba(0,0,0,0.18);
    cursor:default;
    font-family:system-ui,sans-serif;
    text-align:center;
    line-height:1.4;
  ">${priceStr}<br/><span style="font-size:10px;font-weight:400;color:#7B5B3A">${count} ${count === 1 ? "property" : "properties"}</span></div>`;
}

function addMarkers(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  L: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map: any,
  listings: GuestyListingFull[],
  hoveredId: string | null,
  onHover: (id: string | null) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  markersRef: React.MutableRefObject<Map<string, any>>
) {
  // Split: listings with real GPS coords vs those without
  const withCoords  = listings.filter((l) => l.address?.lat && l.address?.lng);
  const withoutCoords = listings.filter((l) => !l.address?.lat || !l.address?.lng);

  // ── Individual pins for listings with real coordinates ──────────────────────
  withCoords.forEach((l) => {
    const lat = l.address!.lat!;
    const lng = l.address!.lng!;
    const price = l.prices?.basePrice;
    const isHovered = l._id === hoveredId;
    const label = price && price > 0 ? `$${price.toLocaleString()}` : "–";

    const icon = L.divIcon({
      className: "",
      html: pinHtml(label, isHovered),
      iconAnchor: [28, 16],
    });

    const marker = L.marker([lat, lng], { icon })
      .addTo(map)
      .on("mouseover", () => onHover(l._id))
      .on("mouseout",  () => onHover(null))
      .on("click",     () => { window.location.href = `/property/${l._id}`; });

    markersRef.current.set(l._id, marker);
  });

  // ── City-level aggregate pins for listings without GPS coords ───────────────
  // Groups into one clean bubble per city instead of hundreds of overlapping pins
  const cityGroups: Record<string, GuestyListingFull[]> = {};
  withoutCoords.forEach((l) => {
    const city = cityKey(l);
    if (!cityGroups[city]) cityGroups[city] = [];
    cityGroups[city].push(l);
  });

  Object.entries(cityGroups).forEach(([city, group]) => {
    const coords = CITY_COORDS[city] ?? CITY_COORDS["Hi-Desert"];
    const prices = group
      .map((l) => l.prices?.basePrice)
      .filter((p): p is number => !!p && p > 0);
    const minPrice = prices.length > 0 ? Math.min(...prices) : null;

    const icon = L.divIcon({
      className: "",
      html: cityPinHtml(city, group.length, minPrice),
      iconAnchor: [55, 24],
    });

    const marker = L.marker(coords, { icon }).addTo(map);
    markersRef.current.set(`city:${city}`, marker);
  });
}

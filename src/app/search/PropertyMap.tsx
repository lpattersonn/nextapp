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

// Approximate center coords for each city
const CITY_COORDS: Record<string, [number, number]> = {
  "Joshua Tree":      [34.1342, -116.3130],
  "Pioneertown":      [34.1650, -116.5100],
  "Yucca Valley":     [34.1144, -116.4322],
  "Twentynine Palms": [34.1356, -116.0542],
  "Morongo Valley":   [34.0496, -116.7254],
  "Hi-Desert":        [34.1342, -116.3130],
};

// Jitter so overlapping pins spread slightly
function jitter(base: [number, number], index: number): [number, number] {
  const angle = (index * 137.5 * Math.PI) / 180;
  const radius = 0.005 * Math.ceil((index + 1) / 8);
  return [base[0] + radius * Math.sin(angle), base[1] + radius * Math.cos(angle)];
}

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

    // Dynamic import — Leaflet needs window
    import("leaflet").then((L) => {
      // Fix default icon paths
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

      // Custom zoom control top-right
      L.control.zoom({ position: "topright" }).addTo(map);

      mapRef.current = map;

      // Add markers
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

  // Update markers when listings or hoveredId change
  useEffect(() => {
    if (!mapRef.current) return;
    import("leaflet").then((L) => {
      // Clear existing markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current.clear();
      addMarkers(L, mapRef.current, listings, hoveredId, onHover, markersRef);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings, hoveredId]);

  return (
    <>
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div ref={containerRef} className="w-full h-full" />
    </>
  );
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
  // Group by city so we can jitter within each
  const cityIndexes: Record<string, number> = {};

  listings.forEach((l) => {
    // Use actual lat/lng if available, else city centroid
    let lat = l.address?.lat;
    let lng = l.address?.lng;

    if (!lat || !lng) {
      const city = cityKey(l);
      const base = CITY_COORDS[city] ?? CITY_COORDS["Hi-Desert"];
      const idx = cityIndexes[city] ?? 0;
      cityIndexes[city] = idx + 1;
      [lat, lng] = jitter(base, idx);
    }

    const price = l.prices?.basePrice;
    const isHovered = l._id === hoveredId;
    const label = price ? `$${price.toLocaleString()}` : "–";

    const icon = L.divIcon({
      className: "",
      html: `<div style="
        background:${isHovered ? "#1C1410" : "#fff"};
        color:${isHovered ? "#fff" : "#1C1410"};
        border:2px solid ${isHovered ? "#1C1410" : "#C4A882"};
        padding:4px 9px;
        border-radius:20px;
        font-size:12px;
        font-weight:700;
        white-space:nowrap;
        box-shadow:0 2px 8px rgba(0,0,0,0.18);
        cursor:pointer;
        transition:all 0.15s;
        font-family:system-ui,sans-serif;
      ">${label}</div>`,
      iconAnchor: [28, 16],
    });

    const marker = L.marker([lat, lng], { icon })
      .addTo(map)
      .on("mouseover", () => onHover(l._id))
      .on("mouseout",  () => onHover(null))
      .on("click",     () => { window.location.href = `/property/${l._id}`; });

    markersRef.current.set(l._id, marker);
  });
}

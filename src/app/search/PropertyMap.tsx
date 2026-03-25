"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
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

/** Group nearby listings into clusters based on current zoom level */
function clusterListings(
  listings: GuestyListingFull[],
  zoom: number
): Array<{ items: GuestyListingFull[]; lat: number; lng: number }> {
  // At zoom 13+ show every pin individually; below that cluster nearby ones
  const threshold = zoom <= 10 ? 0.05 : zoom <= 11 ? 0.02 : zoom <= 12 ? 0.008 : 0;

  const assigned = new Set<string>();
  const clusters: Array<{ items: GuestyListingFull[]; lat: number; lng: number }> = [];

  for (const l of listings) {
    if (assigned.has(l._id) || !l.address?.lat || !l.address?.lng) continue;

    const group: GuestyListingFull[] = [l];
    assigned.add(l._id);

    if (threshold > 0) {
      for (const other of listings) {
        if (assigned.has(other._id) || !other.address?.lat || !other.address?.lng) continue;
        if (
          Math.abs(other.address.lat - l.address.lat!) < threshold &&
          Math.abs(other.address.lng - l.address.lng!) < threshold
        ) {
          group.push(other);
          assigned.add(other._id);
        }
      }
    }

    const avgLat = group.reduce((s, g) => s + g.address!.lat!, 0) / group.length;
    const avgLng = group.reduce((s, g) => s + g.address!.lng!, 0) / group.length;
    clusters.push({ items: group, lat: avgLat, lng: avgLng });
  }

  return clusters;
}

// ── Pin HTML builders ─────────────────────────────────────────────────────────

function singlePinHtml(label: string, isHovered: boolean) {
  const bg          = isHovered ? "#1C1410" : "#fff";
  const color       = isHovered ? "#fff"    : "#1C1410";
  const border      = isHovered ? "#1C1410" : "#C4A882";
  const caretBorder = isHovered ? "#1C1410" : "#C4A882";
  const shadow      = isHovered
    ? "0 4px 16px rgba(28,20,16,0.40)"
    : "0 2px 8px rgba(0,0,0,0.15)";

  return `
    <div style="display:inline-flex;flex-direction:column;align-items:center;">
      <div style="
        background:${bg};
        color:${color};
        border:2px solid ${border};
        padding:5px 11px;
        border-radius:20px;
        font-size:12px;
        font-weight:700;
        white-space:nowrap;
        box-shadow:${shadow};
        cursor:pointer;
        font-family:system-ui,sans-serif;
        line-height:1.2;
        letter-spacing:-0.01em;
      ">${label}</div>
      <div style="
        width:0;height:0;
        border-left:5px solid transparent;
        border-right:5px solid transparent;
        border-top:6px solid ${caretBorder};
        margin-top:-1px;
      "></div>
    </div>`;
}

function clusterPinHtml(count: number, minPrice: number | null) {
  const priceStr = minPrice ? `$${minPrice.toLocaleString()}+` : `${count} homes`;
  return `
    <div style="display:inline-flex;flex-direction:column;align-items:center;">
      <div style="
        background:#fff;
        color:#1C1410;
        border:2px solid #C4A882;
        padding:5px 12px;
        border-radius:20px;
        font-size:12px;
        font-weight:700;
        white-space:nowrap;
        box-shadow:0 2px 10px rgba(0,0,0,0.14);
        cursor:pointer;
        font-family:system-ui,sans-serif;
        text-align:center;
        line-height:1.2;
      ">
        ${priceStr}
        <span style="display:block;font-size:10px;font-weight:500;color:#7B5B3A;margin-top:1px;">
          ${count} ${count === 1 ? "home" : "homes"}
        </span>
      </div>
      <div style="
        width:0;height:0;
        border-left:5px solid transparent;
        border-right:5px solid transparent;
        border-top:6px solid #C4A882;
        margin-top:-1px;
      "></div>
    </div>`;
}

function cityPinHtml(city: string, count: number, minPrice: number | null) {
  const priceStr = minPrice ? `From $${minPrice.toLocaleString()}` : city;
  return `
    <div style="display:inline-flex;flex-direction:column;align-items:center;">
      <div style="
        background:#fff;
        color:#1C1410;
        border:2px solid #C4A882;
        padding:5px 12px;
        border-radius:20px;
        font-size:12px;
        font-weight:700;
        white-space:nowrap;
        box-shadow:0 2px 8px rgba(0,0,0,0.13);
        cursor:default;
        font-family:system-ui,sans-serif;
        text-align:center;
        line-height:1.3;
      ">
        ${priceStr}
        <span style="display:block;font-size:10px;font-weight:400;color:#7B5B3A;">
          ${count} ${count === 1 ? "property" : "properties"}
        </span>
      </div>
      <div style="
        width:0;height:0;
        border-left:5px solid transparent;
        border-right:5px solid transparent;
        border-top:6px solid #C4A882;
        margin-top:-1px;
      "></div>
    </div>`;
}

// ── Marker placement ──────────────────────────────────────────────────────────

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
  const zoom = map.getZoom();

  const withCoords    = listings.filter((l) =>  l.address?.lat && l.address?.lng);
  const withoutCoords = listings.filter((l) => !l.address?.lat || !l.address?.lng);

  // ── Clustered / individual pins for listings with real GPS ──────────────────
  const clusters = clusterListings(withCoords, zoom);

  clusters.forEach(({ items, lat, lng }) => {
    if (items.length === 1) {
      const l = items[0];
      const price = l.prices?.basePrice;
      const isHovered = l._id === hoveredId;
      const label = price && price > 0 ? `$${price.toLocaleString()}` : "–";

      const icon = L.divIcon({
        className: "",
        html: singlePinHtml(label, isHovered),
        iconAnchor: [30, 34],
      });

      const marker = L.marker([lat, lng], { icon, zIndexOffset: isHovered ? 1000 : 0 })
        .addTo(map)
        .on("mouseover", () => onHover(l._id))
        .on("mouseout",  () => onHover(null))
        .on("click",     () => { window.location.href = `/property/${l._id}`; });

      markersRef.current.set(l._id, marker);
    } else {
      // Cluster bubble — click to zoom in
      const prices = items
        .map((l) => l.prices?.basePrice)
        .filter((p): p is number => !!p && p > 0);
      const minPrice = prices.length > 0 ? Math.min(...prices) : null;

      const icon = L.divIcon({
        className: "",
        html: clusterPinHtml(items.length, minPrice),
        iconAnchor: [38, 40],
      });

      const marker = L.marker([lat, lng], { icon })
        .addTo(map)
        .on("click", () => map.setView([lat, lng], zoom + 2));

      markersRef.current.set(`cluster:${lat}:${lng}`, marker);
    }
  });

  // ── City-level aggregate pins for listings without GPS ──────────────────────
  const cityGroups: Record<string, GuestyListingFull[]> = {};
  withoutCoords.forEach((l) => {
    const city = cityKey(l);
    if (!cityGroups[city]) cityGroups[city] = [];
    cityGroups[city].push(l);
  });

  Object.entries(cityGroups).forEach(([city, group]) => {
    const coords  = CITY_COORDS[city] ?? CITY_COORDS["Hi-Desert"];
    const prices  = group.map((l) => l.prices?.basePrice).filter((p): p is number => !!p && p > 0);
    const minPrice = prices.length > 0 ? Math.min(...prices) : null;

    const icon = L.divIcon({
      className: "",
      html: cityPinHtml(city, group.length, minPrice),
      iconAnchor: [50, 44],
    });

    const cityMarker = L.marker(coords, { icon }).addTo(map);
    markersRef.current.set(`city:${city}`, cityMarker);
  });
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function PropertyMap({ listings, hoveredId, onHover }: Props) {
  const containerRef  = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef        = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef    = useRef<Map<string, any>>(new Map());
  const listingsRef   = useRef(listings);
  const hoveredIdRef  = useRef(hoveredId);

  // Keep refs current for the zoom event listener
  useEffect(() => { listingsRef.current  = listings;  }, [listings]);
  useEffect(() => { hoveredIdRef.current = hoveredId; }, [hoveredId]);

  // Initialise map once
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

      addMarkers(L, map, listingsRef.current, hoveredIdRef.current, onHover, markersRef);

      // Re-cluster on every zoom change
      map.on("zoomend", () => {
        markersRef.current.forEach((m) => m.remove());
        markersRef.current.clear();
        addMarkers(L, map, listingsRef.current, hoveredIdRef.current, onHover, markersRef);
      });
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

  return <div ref={containerRef} className="w-full h-full" />;
}

import Image from "next/image";

const BASE = "https://thecohostcompany.com/wp-content/uploads";

const photos = [
  { src: `${BASE}/2025/05/Hosting-1.webp`, alt: "Hosting" },
  { src: `${BASE}/2025/05/2Container-1.webp`, alt: "Desert property" },
  { src: `${BASE}/2025/05/Work-With-US.webp`, alt: "Work with us" },
];

export default function LifestyleStrip() {
  return (
    <div className="grid grid-cols-3 h-[340px]">
      {photos.map((p) => (
        <div key={p.src} className="relative overflow-hidden">
          <Image
            src={p.src}
            alt={p.alt}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}

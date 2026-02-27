import Image from "next/image";

export function CohostLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="https://thecohostcompany.com/wp-content/uploads/2025/05/Logos.svg"
        alt="The Cohost Company"
        fill
        className="object-contain brightness-0 invert"
        unoptimized
      />
    </div>
  );
}

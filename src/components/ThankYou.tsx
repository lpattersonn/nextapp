import Image from "next/image";

const BASE = "https://thecohostcompany.com/wp-content/uploads";

export default function ThankYou() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1240px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Text */}
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#8A7968] font-semibold mb-3">
            The Cohost Company
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[48px] font-normal text-[#1C1410] leading-[1.1] mb-8">
            Thank you!
          </h2>
          <div className="space-y-4 text-[15px] text-[#8A7968] leading-[1.9]">
            <p>
              We&apos;re so glad you chose one of our homes for your time in
              the High Desert. Whether you&apos;re here for rest, adventure, or
              inspiration, we hope your stay offers a little of everything this
              magical place has to offer.
            </p>
            <p>
              Each home we manage is thoughtfully cared for by our local team —
              professionally hosted but never impersonal. We believe in creating
              beautiful, welcoming spaces where guests feel at home, and owners
              feel proud to share them.
            </p>
            <p>
              As locals, we&apos;re always nearby if you need anything. And if
              you&apos;re loving your stay, don&apos;t hesitate to tag us or
              leave a review — your feedback means the world.
            </p>
            <p>
              Thanks again for being here. We can&apos;t wait to host you again
              soon.
            </p>
            <p>With love and gratitude,</p>
          </div>
          <div className="mt-7">
            <div className="font-[family-name:var(--font-playfair)] italic text-[28px] text-[#7B5B3A] mb-1">
              Patryk &amp; Josh
            </div>
            <div className="text-[11px] tracking-[0.12em] uppercase text-[#8A7968] font-semibold">
              The Cohost Team
            </div>
          </div>
        </div>

        {/* Real team photo */}
        <div className="relative h-[480px] rounded-[4px] overflow-hidden">
          <Image
            src={`${BASE}/2025/10/NEW-ABOUT-PHOTO-.webp`}
            alt="The Cohost Team"
            fill
            className="object-cover object-center"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}

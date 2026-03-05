import Image from "next/image";
import Script from "next/script";

const G = "https://assets.guesty.com/image/upload/w_1200,q_auto,f_auto";

export default function SignUp() {
  return (
    <section id="signup" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={`${G}/v1765152133/production/68df18d0ea1895d9005ea6ad/gkpt8qq78dfxkqu76hnm.jpg`}
          alt="Desert landscape"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#B8936A]/20" />
      </div>

      {/* Card */}
      <div className="relative z-10 max-w-[1120px] mx-auto px-6">
        <div
          className="rounded-2xl px-14 py-14 grid grid-cols-1 md:grid-cols-2 gap-14 items-center"
          style={{
            background: "rgba(185, 155, 115, 0.30)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          {/* Left: text */}
          <div className="text-center md:text-left">
            <h2 className="font-[family-name:var(--font-playfair)] text-[42px] font-normal italic text-white leading-[1.2] mb-5">
              Sign Up &amp; Get 10% OFF
            </h2>
            <p className="text-[14px] text-white/85 leading-[1.85]">
              Stay updated with our latest additions and upgrades, last-minute
              openings, and get exclusive access to special offers, including
              10% OFF your first stay!
            </p>
          </div>

          {/* Right: LeadConnector embedded form */}
          <div>
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/JMOPYLHw05kL4wVTv6wQ"
              style={{ width: "100%", height: "260px", border: "none", borderRadius: "0px" }}
              id="inline-JMOPYLHw05kL4wVTv6wQ"
              data-layout='{"id":"INLINE"}'
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Website Form - Inline"
              data-height="260"
              data-layout-iframe-id="inline-JMOPYLHw05kL4wVTv6wQ"
              data-form-id="JMOPYLHw05kL4wVTv6wQ"
              title="Website Form - Inline"
            />
          </div>
        </div>
      </div>

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </section>
  );
}

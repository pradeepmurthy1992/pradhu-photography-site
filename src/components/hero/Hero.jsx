import React from "react";
import { HERO_BG_URL, WHATSAPP_NUMBER, CONTAINER } from "@/app/config";
import { trackEvent } from "@/app/track";

export default function Hero() {
  const waText = encodeURIComponent("Hi! I’d like to book a shoot via your website (Hero CTA).");
  const waHref =
    WHATSAPP_NUMBER && !WHATSAPP_NUMBER.includes("X")
      ? `https://wa.me/${WHATSAPP_NUMBER.replace(/[^\d]/g, "")}?text=${waText}&utm_source=site&utm_medium=hero_cta&utm_campaign=booking`
      : "";

  return (
    <section className="relative min-h-[68vh] md:min-h-[78vh]">
      <img
        src={HERO_BG_URL}
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover pointer-events-none"
        loading="eager"
        decoding="async"
        fetchpriority="high"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 z-[1] bg-black/45" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      <div className="absolute inset-x-0 bottom-0 z-[2]">
        <div className={`${CONTAINER} pb-10 md:pb-14 text-white`}>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Collect the Treasure. <span className="opacity-90">ONE PIECE at a time.</span>
          </h1>
          <p className="mt-3 max-w-3xl text-sm md:text-base text-neutral-200">
            Fashion · Portraits · Candids · Portfolio · Professional headshots · Events .
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="#/contact"
              className="rounded-xl bg-white text-black px-5 py-2.5 font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/70"
              aria-label="Book a Shoot"
              onClick={() => trackEvent("cta_click", { location: "hero", cta: "book" })}
            >
              Book a Shoot
            </a>

            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="md:hidden rounded-xl border border-white/40 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
                onClick={() => trackEvent("cta_click", { location: "hero", cta: "whatsapp_mobile" })}
              >
                WhatsApp
              </a>
            )}
            <a
              href="tel:+919322584410"
              className="md:hidden rounded-xl border border-white/40 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
              onClick={() => trackEvent("cta_click", { location: "hero", cta: "call_mobile" })}
            >
              Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

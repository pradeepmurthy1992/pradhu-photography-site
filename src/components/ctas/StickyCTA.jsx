// src/components/ctas/StickyCTA.jsx
import React from "react";
import { WHATSAPP_NUMBER, CALENDLY_URL } from "@/app/config";
import { trackEvent } from "@/app/track";

export default function StickyCTA({ T, hide }) {
  if (hide) return null;

  const waText = encodeURIComponent(
    "Hi! I’d like to book a shoot via your website (Sticky CTA)."
  );

  const waNumber = (WHATSAPP_NUMBER || "").replace(/[^\d]/g, "");
  const waHref = `https://wa.me/${waNumber}?text=${waText}&utm_source=site&utm_medium=sticky_cta&utm_campaign=booking`;

  // Guard against empty / undefined CALENDLY_URL
  const calHref = CALENDLY_URL
    ? `${CALENDLY_URL}${
        CALENDLY_URL.includes("?") ? "&" : "?"
      }utm_source=site&utm_medium=sticky_cta&utm_campaign=booking`
    : null;

  return (
    <div className="hidden sm:flex fixed right-4 bottom-6 z-[70] items-center gap-2 rounded-full shadow-lg border px-3 py-2 backdrop-blur bg-white/90 text-black">
      {/* Primary: go to Contact page */}
      <a
        href="#/contact"
        className="rounded-full bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90"
        onClick={() =>
          trackEvent("cta_click", { location: "sticky", cta: "book" })
        }
      >
        Book a Shoot
      </a>

      {/* Schedule via Calendly – falls back to Contact if CALENDLY_URL missing */}
      <a
        href={calHref || "#/contact"}
        target={calHref ? "_blank" : undefined}
        rel={calHref ? "noreferrer" : undefined}
        className="rounded-full border px-4 py-2 text-sm hover:bg-black/5"
        onClick={() =>
          trackEvent("cta_click", { location: "sticky", cta: "calendly" })
        }
      >
        Schedule
      </a>

      {/* WhatsApp */}
      <a
        href={waHref}
        target="_blank"
        rel="noreferrer"
        className="rounded-full border px-3 py-2 text-sm hover:bg-black/5"
        onClick={() =>
          trackEvent("cta_click", { location: "sticky", cta: "whatsapp" })
        }
      >
        WhatsApp
      </a>
    </div>
  );
}

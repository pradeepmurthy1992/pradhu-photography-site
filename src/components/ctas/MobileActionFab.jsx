// src/components/ctas/MobileActionFab.jsx
import React, { useState } from "react";
import { WHATSAPP_NUMBER, CALENDLY_URL } from "@/app/config";
import { trackEvent } from "@/app/track";

export default function MobileActionFab({ hide }) {
  const [open, setOpen] = useState(false);
  if (hide) return null;

  const waText = encodeURIComponent(
    "Hi! I’d like to book a shoot via your website (Mobile FAB)."
  );

  const waNumber = (WHATSAPP_NUMBER || "").replace(/[^\d]/g, "");
  const waHref = `https://wa.me/${waNumber}?text=${waText}&utm_source=site&utm_medium=fab&utm_campaign=booking`;

  const calHref = CALENDLY_URL
    ? `${CALENDLY_URL}${
        CALENDLY_URL.includes("?") ? "&" : "?"
      }utm_source=site&utm_medium=fab&utm_campaign=booking`
    : null;

  return (
    <div className="sm:hidden fixed right-3 bottom-4 z-[75]">
      {/* Expanded pill */}
      <div
        className={[
          "transition-all duration-200 overflow-hidden rounded-full shadow-xl border",
          "bg-white/95 text-black",
          open
            ? "w-[360px] opacity-100 translate-y-0"
            : "w-0 opacity-0 translate-y-2 pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div className="flex divide-x">
          {/* Book → contact page */}
          <a
            href="#/contact"
            className="flex-1 bg-black text-white py-3 font-medium text-center"
            onClick={() => {
              setOpen(false);
              trackEvent("cta_click", {
                location: "mobile_fab",
                cta: "book",
              });
            }}
          >
            Book
          </a>

          {/* Schedule (Calendly or fallback contact) */}
          <a
            href={calHref || "#/contact"}
            target={calHref ? "_blank" : undefined}
            rel={calHref ? "noreferrer" : undefined}
            className="w-[40%] bg-white py-3 text-center text-sm font-medium"
            onClick={() => {
              setOpen(false);
              trackEvent("cta_click", {
                location: "mobile_fab",
                cta: "calendly",
              });
            }}
          >
            Schedule
          </a>

          {/* WhatsApp */}
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="w-[36%] bg-white py-3 text-center text-sm font-medium"
            onClick={() => {
              setOpen(false);
              trackEvent("cta_click", {
                location: "mobile_fab",
                cta: "whatsapp",
              });
            }}
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* Round toggle */}
      <button
        type="button"
        aria-label={open ? "Close actions" : "Open actions"}
        onClick={() => setOpen((v) => !v)}
        className={[
          "mt-2 h-12 w-12 rounded-full shadow-lg border grid place-items-center",
          "bg-white/95 text-black active:scale-95 transition",
        ].join(" ")}
      >
        <span className="text-lg leading-none">{open ? "×" : "⋯"}</span>
      </button>
    </div>
  );
}

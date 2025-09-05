// src/components/ctas/MobileActionFab.jsx
import React, { useState } from "react";
import { Icon } from "@/components/common/Icon";
import { WHATSAPP_NUMBER } from "@/app/config";

export default function MobileActionFab() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-[70] sm:hidden">
      {/* Main FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open contact options"
        className="flex items-center justify-center h-14 w-14 rounded-full shadow-lg text-white bg-[#25D366] hover:bg-[#20b954] transition"
      >
        <Icon name="whatsapp" className="h-7 w-7" />
      </button>

      {/* Expanded options */}
      {open && (
        <div className="absolute bottom-16 right-0 flex flex-col gap-2">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20shoot`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[#25D366] text-white px-3 py-2 text-sm shadow-md"
          >
            WhatsApp Me
          </a>
          <a
            href="tel:+919876543210"
            className="rounded-lg bg-black text-white px-3 py-2 text-sm shadow-md"
          >
            Call Now
          </a>
        </div>
      )}
    </div>
  );
}

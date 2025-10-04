// src/components/pages/HomeTiles.jsx
import React from "react";
import { usePageMeta } from "@/app/seo";
import { Icon } from "@/components/common/Icon";

export default function HomeTiles({ T }) {
  usePageMeta(
    "PRADHU Photography | Professional Portraits & Fashion",
    "Fashion, portrait, and editorial photography studio. Book cinematic shoots with natural skin tones, simple direction, and clean color."
  );

  const items = [
    { id: "/portfolio", label: "Portfolio", icon: "grid" },
    { id: "/services", label: "Services", icon: "briefcase" },
    { id: "/pricing", label: "Pricing", icon: "tag" },
    { id: "/about", label: "About", icon: "user" },
    { id: "/contact", label: "Contact", icon: "mail" },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto whitespace-nowrap pb-2" style={{ scrollbarWidth: "none" }}>
      {items.map((t) => (
        <a
          key={t.id}
          href={`#${t.id}`}
          className={`flex items-center gap-2 rounded-2xl border px-4 py-2 transition shadow-sm ${T.chipInactive}`}
        >
          <Icon name={t.icon} className="h-4 w-4 opacity-60" />
          <span className="text-sm">{t.label}</span>
        </a>
      ))}
    </div>
  );
}

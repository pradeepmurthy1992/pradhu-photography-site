// src/components/pages/AboutBlock.jsx
import React from "react";
import { usePageMeta } from "@/app/seo";
import { CONTACT_EMAIL, IG_USERNAME, SERVICE_CITIES } from "@/app/config";
import { Icon } from "@/components/common/Icon";

export default function AboutBlock({ T }) {
  usePageMeta(
    "About PRADHU Photography",
    "Pradeep Moorthy — photographer behind PRADHU. Fashion, portrait, and editorial work with clean color, natural skin, and simple direction."
  );

  return (
    <section className="py-6">
      <h1 className={`text-4xl md:text-5xl font-['Playfair_Display'] uppercase tracking-[0.08em] ${T.navTextStrong}`}>
        About PRADHU
      </h1>
      <p className={`mt-3 ${T.muted}`}>
        Aspiring photographer from Kanchipuram, working across fashion, portraits, candids and events. Client-first
        process with tailored recommendations on looks, lighting, locations and timelines.
      </p>
      <ul className={`mt-4 text-sm list-disc pl-5 space-y-1 ${T.muted}`}>
        <li>Genres: Fashion, High Fashion, Portraits, Editorials, Candids, Portfolio, Headshots, Street, Studio</li>
        <li>Kit: Nikon D7500, softboxes (octa & strip), multiple flashes, modifiers</li>
        <li>{SERVICE_CITIES}</li>
      </ul>
      <div className="mt-5 flex items-center gap-3">
        <a
          href={`https://www.instagram.com/${IG_USERNAME}/`}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center justify-center h-12 w-12 rounded-2xl border ${T.panelBorder} ${T.panelBg}`}
          title="Instagram"
        >
          <Icon name="grid" className="h-5 w-5" />
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className={`inline-flex items-center justify-center h-12 w-12 rounded-2xl border ${T.panelBorder} ${T.panelBg}`}
          title="Email"
        >
          <Icon name="mail" className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

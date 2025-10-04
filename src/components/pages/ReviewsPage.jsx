// src/components/pages/ReviewsPage.jsx
import React from "react";
import { usePageMeta } from "@/app/seo";

export default function ReviewsPage({ T }) {
  usePageMeta(
    "Client Reviews | PRADHU Photography",
    "Real client testimonials about portraits, fashion, and event shoots with PRADHU Photography."
  );

  return (
    <section className="py-6">
      <h1 className={`text-4xl md:text-5xl font-['Playfair_Display'] uppercase tracking-[0.08em] ${T.navTextStrong}`}>
        Reviews
      </h1>
      <p className={`mt-2 ${T.muted}`}>Coming soon — client testimonials with headshots and ratings.</p>
    </section>
  );
}

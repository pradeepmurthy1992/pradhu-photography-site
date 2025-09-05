import React from "react";

export default function ReviewsPage({ T }) {
  return (
    <section className="py-6">
      <h1 className={`text-4xl md:text-5xl font-['Playfair_Display'] uppercase tracking-[0.08em] ${T.navTextStrong}`}>Reviews</h1>
      <p className={`mt-2 ${T.muted}`}>Coming soon — client testimonials with headshots and ratings.</p>
    </section>
  );
}

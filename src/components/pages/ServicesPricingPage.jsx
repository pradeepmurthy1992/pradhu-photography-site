import React from "react";

export default function ServicesPricingPage({ T }) {
  const tiers = [
    {
      name: "Portrait Session",
      price: "from ₹4,500",
      includes: [
        "60–90 min · up to 2 outfits",
        "6 lightly retouched hero shots",
        "Curated 3–5 edited images per outfit",
        "Location & styling guidance",
      ],
    },
    {
      name: "Headshots (Solo/Team)",
      price: "from ₹5,000",
      includes: [
        "Consistent lighting & framing",
        "On-location or studio",
        "Curated 3–5 edited images per outfit",
      ],
    },
    {
      name: "Fashion / Editorial (Half-day)",
      price: "from ₹10,000",
      includes: [
        "Pre-production & moodboard",
        "Lighting & look management",
        "Team coordination on request",
      ],
    },
    {
      name: "Event Coverage (2 hrs)",
      price: "from ₹8,000",
      includes: ["Focused coverage of key moments", "Colour-graded selects", "Extendable by hour"],
    },
  ];

  return (
    <section className="py-6">
      <h1 className={`text-4xl md:text-5xl font-['Playfair_Display'] uppercase tracking-[0.08em] ${T.navTextStrong}`}>
        Services & Pricing
      </h1>
      <p className={`mt-2 ${T.muted}`}>
        Multi-genre coverage designed around your brief. Share your concept and I’ll tailor looks, lighting windows and
        locations. Final quotes depend on scope, team and timelines.
      </p>

      {/* Services overview (cards) */}
      <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[
          [
            "Portraits & Headshots",
            ["60–90 min · up to 2 outfits", "Natural retouching with clean skin tones", "Wardrobe & posing guidance", "On-location or studio"],
          ],
          [
            "Fashion / Editorial",
            ["Moodboard & looks planning", "On-set lighting & styling coordination", "Clean, contemporary colour and skin tones", "Half-day / full-day options"],
          ],
          [
            "Events & Candids",
            ["By hours or blocks", "Key moments & people, storytelling frames", "Balanced set of colour-graded selects"],
          ],
        ].map(([title, lines]) => (
          <article key={title} className={`rounded-2xl border p-5 shadow-sm ${T.panelBg} ${T.panelBorder}`}>
            <h2 className={`text-lg font-medium ${T.navTextStrong}`}>{title}</h2>
            <ul className={`mt-2 text-sm list-disc pl-5 ${T.muted}`}>
              {lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* Pricing tiers */}
      <div className="mt-10">
        <h2 className={`text-2xl md:text-3xl font-['Playfair_Display'] uppercase tracking-[0.08em] ${T.navTextStrong}`}>Indicative Packages</h2>
        <p className={`mt-2 ${T.muted}`}>Request a custom estimate for multi-day shoots, larger teams or special deliverables.</p>

        <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <article key={t.name} className={`rounded-2xl border p-5 shadow-sm ${T.panelBg} ${T.panelBorder}`}>
              <div className="flex items-baseline justify-between">
                <h3 className={`text-lg font-medium ${T.navTextStrong}`}>{t.name}</h3>
                <span className="text-sm opacity-80">{t.price}</span>
              </div>
              <ul className={`mt-3 text-sm list-disc pl-5 ${T.muted}`}>
                {t.includes.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <a
                href="#/contact"
                className={`${T.link} text-sm mt-4 inline-block`}
              >
                Request a quote →
              </a>
            </article>
          ))}
        </div>
      </div>

      {/* Add-ons + Policy */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className={`rounded-2xl border p-5 ${T.panelBg} ${T.panelBorder}`}>
          <h2 className={`text-lg font-medium ${T.navTextStrong}`}>Add-ons</h2>
          <ul className={`mt-2 text-sm list-disc pl-5 ${T.muted}`}>
            <li>HMUA / Styling coordination (billed at cost)</li>
            <li>Studio rental (venue rates apply)</li>
            <li>Assistant / extra lighting</li>
            <li>Travel & stay outside base city (at actuals)</li>
            <li>Rush teasers / same-day selects</li>
            <li>Prints, albums and frames</li>
          </ul>
        </div>

        <div className={`rounded-2xl border p-5 ${T.panelBg} ${T.panelBorder}`}>
          <h2 className={`text-lg font-medium ${T.navTextStrong}`}>Turnaround & Booking</h2>
          <ul className={`mt-2 text-sm list-disc pl-5 ${T.muted}`}>
            <li>Portraits / Fashion: 7–12 days; Weddings/Events: ~3–4 weeks for full gallery.</li>
            <li>Entire shoot previews shared within 3–5 days.</li>
            <li>Editing timeline starts after shortlisting.</li>
            <li>Advance to reserve date; adjustable in final invoice.</li>
            <li>One complimentary reschedule with 72h notice (subject to availability).</li>
            <li>Outstation travel/stay billed at actuals; two editing revision rounds included.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// src/components/chrome/HeadFonts.jsx
import { useEffect } from "react";

export default function HeadFonts() {
  useEffect(() => {
    const head = document.head;

    // Preconnects for faster TLS
    const pre1 = document.createElement("link");
    pre1.rel = "preconnect";
    pre1.href = "https://fonts.googleapis.com";

    const pre2 = document.createElement("link");
    pre2.rel = "preconnect";
    pre2.href = "https://fonts.gstatic.com";
    pre2.crossOrigin = "anonymous";

    // Load stylesheet non-blocking
    const sheet = document.createElement("link");
    sheet.rel = "preload";
    sheet.as = "style";
    sheet.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700;800;900&display=swap";
    sheet.onload = function () {
      this.onload = null;
      this.rel = "stylesheet";
    };

    head.appendChild(pre1);
    head.appendChild(pre2);
    head.appendChild(sheet);

    return () => {
      [pre1, pre2, sheet].forEach((el) => {
        try { head.removeChild(el); } catch {}
      });
    };
  }, []);

  // noscript fallback for fonts (keeps Lighthouse happy)
  return (
    <noscript>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700;800;900&display=swap"
      />
    </noscript>
  );
}

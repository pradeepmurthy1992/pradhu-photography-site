// src/app/seo.js
import { useEffect } from "react";

export function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title;

    const upsertMeta = (selector, makeEl, setAttrs) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = makeEl();
        document.head.appendChild(el);
      }
      setAttrs(el);
    };

    if (description) {
      upsertMeta('meta[name="description"]',
        () => {
          const m = document.createElement("meta");
          m.setAttribute("name", "description");
          return m;
        },
        (m) => m.setAttribute("content", description)
      );
      upsertMeta('meta[property="og:description"]',
        () => {
          const m = document.createElement("meta");
          m.setAttribute("property", "og:description");
          return m;
        },
        (m) => m.setAttribute("content", description)
      );
    }

    if (title) {
      upsertMeta('meta[property="og:title"]',
        () => {
          const m = document.createElement("meta");
          m.setAttribute("property", "og:title");
          return m;
        },
        (m) => m.setAttribute("content", title)
      );
    }
  }, [title, description]);
}

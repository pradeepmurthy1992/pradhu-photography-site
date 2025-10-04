// src/app/seo.js
import { useEffect } from "react";

export function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title;

    const setMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const setOG = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    if (description) {
      setMeta("description", description);
      setOG("og:description", description);
    }
    if (title) {
      setOG("og:title", title);
    }
  }, [title, description]);
}

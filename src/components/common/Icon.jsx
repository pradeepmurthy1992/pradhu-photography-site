// src/components/common/Icon.jsx
import React from "react";

/**
 * Minimal inline icon set for the site.
 * Add more cases as you need (home, phone, whatsapp, etc.).
 */
function Icon({ name, className = "", ...props }) {
  switch (name) {
    case "menu":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden="true"
          {...props}
        >
          <path
            d="M3 6h18M3 12h18M3 18h18"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "x":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden="true"
          {...props}
        >
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "phone":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden="true"
          {...props}
        >
          <path
            d="M6.5 4.5l3 2.5-2 3.5s1.5 3 4 5.5 5.5 4 5.5 4l3.5-2 2.5 3c0 0-1.5 2.5-4 3.5s-7-1-11-5-6.5-8.5-5.5-11 3.5-4 3.5-4z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );

    case "whatsapp":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden="true"
          {...props}
        >
          <path
            d="M12 3.1A8.9 8.9 0 0 0 4.3 17L3 21l4-1.3A8.9 8.9 0 1 0 12 3.1z"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
          />
          <path
            d="M9.5 8.8c-.2-.4-.4-.3-.6-.3h-.5c-.2 0-.5.1-.8.4s-1.1 1.1-1.1 2.7 1.1 3.1 1.3 3.3.9 1.4 2.3 1.9 1.4.5 1.7.5.8-.1 1-.4.5-.8.6-1 .3-.7.2-.8-.2-.2-.5-.3-.8-.4-.9-.5-.2-.1-.4.1-.5.6-.6.7-.2.1-.4 0c-.2-.1-.8-.3-1.5-1-.5-.4-.9-1.1-1-1.3-.1-.2 0-.3.1-.4.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1.1-.2.1-.4s-.1-.3-.1-.4-.5-1.2-.7-1.6z"
            fill="currentColor"
          />
        </svg>
      );

    default:
      // Unknown icon → render nothing (avoids breaking build)
      return null;
  }
}

// IMPORTANT: default export + named export
export default Icon;
export { Icon };

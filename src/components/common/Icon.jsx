// src/components/common/Icon.jsx
import React from "react";

export function Icon({ name, className = "h-4 w-4" }) {
  const p = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (name) {
    case "home":
      return (
        <svg {...p}>
          <path d="M3 11.5L12 4l9 7.5" />
          <path d="M5 10.5V20h5v-6h4v6h5v-9.5" />
        </svg>
      );
    case "grid":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...p}>
          <path d="M3.5 8.5h17A1.5 1.5 0 0122 10v7a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 014 17v-7a1.5 1.5 0 01-1.5-1.5z" />
          <path d="M8 6V4h8v2" />
        </svg>
      );
    case "user":
      return (
        <svg {...p}>
          <circle cx="12" cy="7" r="4" />
          <path d="M5.5 21a7.5 7.5 0 0113 0" />
        </svg>
      );
    case "mail":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case "sun":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m17.071 7.071l-1.414-1.414M6.343 6.343L4.929 4.929m12.142 0l-1.414 1.414M6.343 17.657l-1.414 1.414" />
        </svg>
      );
    case "moon":
      return (
        <svg {...p}>
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010 9.79z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg className={className} viewBox="0 0 32 32" fill="currentColor">
          <path d="M16.04 2.99c-7.18 0-13.01 5.83-13.01 13.01 0 2.29.6 4.54 1.73 6.52L3 30l7.72-1.99a13.06 13.06 0 005.32 1.11h.01c7.18 0 13.01-5.83 13.01-13.01S23.22 2.99 16.04 2.99zm6.53 18.61c-.27.76-1.54 1.46-2.12 1.55-.54.08-1.23.11-1.99-.12-.46-.14-1.05-.34-1.8-.66-3.16-1.37-5.21-4.58-5.37-4.8-.16-.22-1.28-1.7-1.28-3.24 0-1.55.82-2.31 1.11-2.63.29-.32.63-.41.84-.41.21 0 .42 0 .61.01.2.01.47-.08.73.55.27.65.91 2.24.99 2.4.08.16.13.34.02.55-.1.21-.15.34-.3.53-.16.18-.31.4-.44.54-.15.15-.3.31-.13.61.18.3.8 1.31 1.72 2.13 1.18 1.05 2.17 1.38 2.47 1.53.3.15.48.13.66-.08.18-.21.76-.88.96-1.19.21-.3.41-.25.69-.15.29.1 1.84.87 2.15 1.03.32.16.53.24.61.38.08.14.08.82-.19 1.58z" />
        </svg>
      );
    default:
      return null;
  }
}

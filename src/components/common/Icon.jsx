// src/components/common/Icon.jsx
import React from "react";

// Simple path set for feather-style icons
const ICON_PATHS = {
  home: "M3 11L12 3l9 8v9H3z",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  briefcase:
    "M4 7h16v11H4z M9 7V5a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v2 M4 12h16",
  tag: "M3 12l9-9 9 9-9 9z",
  user:
    "M12 12a4 4 0 1 0-0.001-8.001A4 4 0 0 0 12 12zm-7 9a7 7 0 0 1 14 0H5z",
  mail: "M4 5h16v14H4z M4 7l8 6 8-6",
  sun: "M12 4V2M12 22v-2M4.22 4.22L5.64 5.64M18.36 18.36l1.42 1.42M2 12h2m16 0h2M4.22 19.78L5.64 18.36M18.36 5.64l1.42-1.42M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z",
  moon:
    "M21 12.79A9 9 0 0 1 12.21 3 7 7 0 1 0 21 12.79z",
  menu: "M3 7h18M3 12h18M3 17h18",
  x: "M5 5l14 14M19 5L5 19",
  phone:
    "M6.5 3h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5L16 12.5l4 1.5v3a2 2 0 0 1-2.2 2 16 16 0 0 1-7.3-2.7A15.8 15.8 0 0 1 4.5 9.2 15.9 15.9 0 0 1 1.8 2 2 2 0 0 1 3.8 0h2.7z",
  instagram:
    "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4a5 5 0 1 0 0.001 10.001A5 5 0 0 0 12 7zm6.5-1.5a1.5 1.5 0 1 0 0.001 3.001A1.5 1.5 0 0 0 18.5 5.5z",
  whatsapp:
    "M4 20l1.5-4A8 8 0 1 1 12 20a8.3 8.3 0 0 1-3.8-.9L4 20z M9.5 9.5c.3-.3.5-.3.8-.2l1.1.6c.2.1.4.1.5 0l1-.5c.3-.1.5 0 .6.2l1 1.7c.1.2 0 .4-.1.6-.5.6-1.3 1.3-2.3 1.4-1 .1-2.2-.3-3.5-1.5-1.3-1.2-1.7-2.3-1.6-3.3.1-1 .8-1.6 1.4-2 .2-.2.4-.2.6 0l1 1.6c.1.2.1.4-.1.6l-.4.4c-.1.1-.1.3 0 .5.1.3.4.7.9 1.1s.9.7 1.1.8c.2.1.4.1.5 0l.5-.4z",
  dot: "M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
};

export function Icon({ name = "dot", size = 20, className = "", ...rest }) {
  const path = ICON_PATHS[name] || ICON_PATHS["dot"];

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 👇 This is the important bit for your error
export default Icon;

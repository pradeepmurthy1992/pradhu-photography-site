import React from "react";
import { Icon } from "./Icon";

export default function ThemeSlider({ theme, setTheme }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Light mode"
        className={`p-2 rounded-full ${theme === "light" ? "bg-yellow-100" : ""}`}
      >
        <Icon name="sun" className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Dark mode"
        className={`p-2 rounded-full ${theme === "dark" ? "bg-teal-900 text-white" : ""}`}
      >
        <Icon name="moon" className="h-5 w-5" />
      </button>
    </div>
  );
}

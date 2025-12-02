// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";

// Fonts (self-hosted)
import "@/styles/fonts.css";

// Global styles
import "@/styles/globals.css";
import "@/styles/cinematic.css";

// Root app
import App from "@/app/App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

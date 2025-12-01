// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";

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

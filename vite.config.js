// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  // IMPORTANT: base must match your GitHub Pages repo name
  // https://pradeepmurthy1992.github.io/pradhu-photography-site/
  base: "/pradhu-photography-site/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      // Normal SPA entry point
      input: "index.html",
    },
  },
});

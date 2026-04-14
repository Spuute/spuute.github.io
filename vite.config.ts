import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "spa-fallback",
      closeBundle() {
        // GitHub Pages serves 404.html for unknown routes.
        // Copy index.html → 404.html so client-side routing works.
        const fs = require("fs");
        const path = require("path");
        const dist = path.resolve(__dirname, "dist");
        const index = path.join(dist, "index.html");
        const fallback = path.join(dist, "404.html");
        if (fs.existsSync(index)) {
          fs.copyFileSync(index, fallback);
        }
      },
    },
  ],
});

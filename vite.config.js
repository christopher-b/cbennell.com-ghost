import { defineConfig } from "vite";
// import fs from "fs";
import prism from "vite-plugin-prismjs";
import tailwindcss from "@tailwindcss/vite";
import ghostManifestPartials from "./lib/vite/ghost-manifest-partials.js";

export default defineConfig({
  publicDir: false,
  manifest: true,
  css: {
    devSourcemap: true,
  },
  build: {
    outDir: "assets/built",
    assetsDir: ".", // Don't write to assets/built/assets/*; it triggers a gscan warning
    emptyOutDir: true,
    manifest: "manifest.json", // Output a manifest so we can build static references to built assets
    rollupOptions: {
      input: "assets/js/index.js",
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/": {
        target: "http://localhost:2368",
        changeOrigin: true,
        bypass: (req) => {
          // Serve Vite client and local assets directly — do NOT proxy
          if (
            req.url.startsWith("/@vite/client") || // Vite HMR client
            req.url.startsWith("/assets") || // local assets
            req.url.startsWith("/src") || // source files (optional)
            req.url.startsWith("/node_modules") // node modules (optional)
          ) {
            return req.url; // serve locally from Vite server
          }
          // Proxy everything else to Ghost backend
          return null;
        },
      },
    },
    watch: {
      ignored: ["**/node_modules/**", "**/build/**"],
    },
  },
  plugins: [
    {
      // Simple plugin for full reload on .hbs changes during dev
      name: "reload-hbs",
      handleHotUpdate({ file, server }) {
        if (file.endsWith(".hbs")) {
          server.ws.send({ type: "full-reload" });
        }
      },
    },
    ghostManifestPartials(
      "assets/built/manifest.json",
      "partials/vite_assets/head.hbs",
      "partials/vite_assets/foot.hbs",
    ),
    tailwindcss(),
    prism({
      languages: ["javascript", "css", "html", "bash"],
      plugins: ["line-numbers"],
      css: true,
    }),
  ],
});

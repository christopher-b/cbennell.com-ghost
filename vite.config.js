import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import ghostManifestPartials from "./lib/vite/ghost-manifest-partials.js";
import ViteRestart from "vite-plugin-restart";
// import reloadHbs from "./lib/vite/reload-hbs.js";

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
    manifest: "manifest.json", // Output a manifest so we can include static references to built assets
    rollupOptions: {
      input: "assets/js/index.js",
    },
  },
  plugins: [
    ViteRestart({
      reload: ["**/*.hbs"],
    }),
    ghostManifestPartials(
      "assets/built/manifest.json",
      "partials/vite_assets/head.hbs",
      "partials/vite_assets/foot.hbs",
    ),
    tailwindcss(),
  ],
});

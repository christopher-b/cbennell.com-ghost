/**
 * Vite Plugin: reload-hbs
 *
 * This plugin triggers a full browser reload whenever a `.hbs` (Handlebars)
 * file is modified during development.
 *
 * Usage in vite.config.js:
 * ------------------------
 *   import { defineConfig } from "vite";
 *   import reloadHbs from "./lib/vite/reload-hbs.js";
 *
 *   export default defineConfig({
 *     plugins: [
 *       reloadHbs(),
 *       // other plugins...
 *     ],
 *   });
 *
 * How it works:
 * - Listens for Vite's `handleHotUpdate` hook.
 * - Checks if the changed file ends with `.hbs`.
 * - Sends a WebSocket `full-reload` signal to the client.
 */
export default function reloadHbs() {
  return {
    name: "reload-hbs",
    handleHotUpdate({ file, server }) {
      if (file.endsWith(".hbs")) {
        server.ws.send({ type: "full-reload" });
      }
    },
  };
}

import fs from "fs";

/**
 * Vite Plugin: build-manifest-partials
 *
 * Generates Ghost-compatible Handlebars partials from Vite's manifest.json.
 *
 * Why:
 * ----
 * Ghost can't parse Vite's manifest.json at runtime, so this plugin produces
 * static partials you can include in your theme (`vite_assets/head.hbs`,
 * `vite_assets-foot.hbs`), ensuring the correct cache-busted files are loaded.
 *
 * Behavior:
 * ---------
 * - Reads the generated manifest.json after `vite build`.
 * - Iterates over all JS entrypoints (skips CSS-only chunks).
 * - Writes:
 *   • partials/vite-assets/head.hbs → preload + stylesheet tags for <head>
 *   • partials/vite-assets/foot.hbs → <script type="module"> tags for <body>
 *
 * Usage in vite.config.js:
 * ------------------------
 * import { defineConfig } from "vite";
 * import ghostManifestPartials from "./lib/vite/ghost-manifest-partials.js";
 *
 * export default defineConfig({
 *   build: {
 *     outDir: "assets/built",
 *     manifest: { fileName: "manifest.json" },
 *   },
 *   plugins: [
 *     ghostManifestPartials(
 *       "assets/built/manifest.json",
 *       "partials/vite_assets/head.hbs",
 *       "partials/vite_assets/foot.hbs",
 *     ),
 *   ],
 * });
 *
 * Usage in Ghost theme (default.hbs):
 * -----------------------------------
 * {{#unless @custom.development_mode}}
 *   {{> "vite_assets/head"}}
 * {{/unless}}
 * ...
 * {{#unless @custom.development_mode}}
 *   {{> "vite_assets/foot"}}
 * {{/unless}}
 */
export default function ghostManifestPartials(
  manifestPath,
  outputHeadPath,
  outputFootPath,
) {
  return {
    name: "vite-plugin-ghost-manifest-partials",
    apply: "build",
    closeBundle() {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

      let outputHead =
        "{{!-- This file is generated during a vite build. Do not edit. --}}\n";
      let outputFoot =
        "{{!-- This file is generated during a vite build. Do not edit. --}}\n";

      for (const [, entryData] of Object.entries(manifest)) {
        if (!entryData.file.endsWith(".js")) continue;

        // preload script
        outputHead += `<link rel="preload" as="script" href="{{asset "built/${entryData.file}"}}">\n`;

        // preload + stylesheet
        if (entryData.css) {
          entryData.css.forEach((css) => {
            outputHead += `<link rel="preload" as="style" href="{{asset "built/${css}"}}">\n`;
            outputHead += `<link rel="stylesheet" href="{{asset "built/${css}"}}">\n`;
          });
        }

        // load script at end of body
        outputFoot += `<script type="module" src="{{asset "built/${entryData.file}"}}"></script>\n`;
      }

      fs.writeFileSync(outputHeadPath, outputHead, "utf8");
      fs.writeFileSync(outputFootPath, outputFoot, "utf8");

      console.log(`✓ wrote ${outputHeadPath}`);
      console.log(`✓ wrote ${outputFootPath}`);
    },
  };
}

# Wraith: A Ghost theme using Vite & TailwindCSS

This theme is intended as a starting point for Ghost themes powered by Vite and TailwindCSS, and any other modern JS goodness you want to bring. The visual design is intentionally bare bones, but it is intended to be fully-featured out of the box.

This theme is based on the [Ghost Starter theme](https://github.com/TryGhost/Starter), and was inspired by [biswajit-saha/vite-ghost-theme](https://github.com/biswajit-saha/vite-ghost-theme).

## Theme Features

There are a few problems we need to solve when using Vite with Ghost:

- We can't use the Vite server in development, so we need to provide the Vite assets in development and the built assets in production. We solve this by providing a `development_mode` custom theme setting. We turn it on in our development environment and leave defaulted to off in production.
- We want to include built assets with cache-busting fingerprinted filenames in our production deployments. This means we can't hard-code built asset filenames in our templates. We solve this with a Vite plugin that reads the Vite [asset manifest](https://vite.dev/config/build-options.html#build-manifest) and outputs dynamically-generated Handlbars templates that include the assets listed in the manifest.We can include these templates in our layouts, using the `development_mode` setting to ensure they're only loaded in production.

This theme also offers:

- TailwindCSS working out of the box, with examples for custom theme colors, spacing tokens, etc.
- Support for font overrides in the theme setting UI, with fallback options from [modernfontstacks.com](https:////modernfontstacks.com).
- [TailwindTypography](https://github.com/tailwindlabs/tailwindcss-typography), which includes customizable styles for CMS content via the `prose` utilities.
- Support for code highlighting with [Prism](https://prismjs.com/), including customizable languages, themes and plugins. Only JavaScript is enabled by default, but other languages can be added in vite.config.js. Use one of the default themes by specifiying in `vite.config.js`, or add an additional theme from [PrismJS/prism-themes](https://github.com/PrismJS/prism-themes).
- Hot module replacement via Vite, and autoreload for Handlebar templates files.
- [GH Deploy Action](.github/workflows/deploy-theme.yml) included by default. [Learn more how to deploy your theme automatically](https://github.com/TryGhost/action-deploy-theme)

## How to Use This Theme

### Start development mode

From the Starter theme folder, start development mode:

```bash
yarn dev
```

### Build, zip, and test your theme

Compile your CSS and JavaScript assets for production with the following command:

```bash
yarn build
```

Create a zip archive:

```bash
yarn zip
```

Use `gscan` to test your theme for compatibility with Ghost:

```bash
yarn test
```

Changes you make to your styles, scripts, and Handlebars files will show up automatically in the browser. CSS and Javascript will be compiled and output to the `built` folder.

Press `ctrl + c` in the terminal to exit development mode.

## Todo

- [] Asses vite proxy server config

## Copyright & License

Copyright (c) 2013-2025 - Released under the [MIT license](LICENSE).

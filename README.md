# Wraith: A Ghost theme using Vite & TailswindCSS

This theme is intended as a starting point for Ghost themes powered by Vite and TailwindCSS, and any other modern JS goodness you want to bring. The visual design is intentionally bare bones, but it is intended to be fully-featured out of the box. It also solves some problems around compatibility between Vite and Ghost.

It also includes Prism as a Vite module, so you can easily customize your code highlights.

This theme is based on the [Ghost Starter theme](https://github.com/TryGhost/Starter), and was inspired by [biswajit-saha/vite-ghost-theme](https://github.com/biswajit-saha/vite-ghost-theme).

## How to Use This Theme

Develoment mode theme setting.

## Theme Features

Production / development assets

## Todo

 - [] Asses vite proxy server config


## Starter theme features

🔁&nbsp;Livereload by default. See changes instantly in the browser whenever you save a file.

🔎&nbsp;Optimized for VS Code. Find the files you're looking for more easily.

🗃️&nbsp;Write modern JavaScript. Use ESM out of the box to write more manageable Javascript.

🗜️&nbsp;Assets optimized automatically. JavaScript and CSS are minified and transpiled by default.

👟&nbsp;Fast compile times, powered by [Rollup](https://rollupjs.org).

🦋&nbsp;Write next-gen CSS for today's browsers with [PostCSS](https://postcss.org/). Add the CSS tools you love via [`rollup.config.js`](rollup.config.js).

🚢&nbsp;Ghost's [GH Deploy Action](.github/workflows/deploy-theme.yml) included by default. [Learn more how to deploy your theme automatically](https://github.com/TryGhost/action-deploy-theme)

➕&nbsp;Extensible by design. Rollup's configuration structure makes it easy to add [any number of plugins easily](https://github.com/rollup/plugins).

&nbsp;

## Theme structure

The main files are:

- [`default.hbs`](default.hbs) - The main template file
- [`index.hbs`](index.hbs) - Used for the home page
- [`post.hbs`](post.hbs) - Used for individual posts
- [`page.hbs`](page.hbs) - Used for individual pages
- [`tag.hbs`](tag.hbs) - Used for tag archives
- [`author.hbs`](author.hbs) - Used for author archives


## Development guide

### Start development mode

From the Starter theme folder, start development mode:

```bash
yarn dev
```

Changes you make to your styles, scripts, and Handlebars files will show up automatically in the browser. CSS and Javascript will be compiled and output to the `built` folder.

Press `ctrl + c` in the terminal to exit development mode.

&nbsp;

### Build, zip, and test your theme

Compile your CSS and JavaScript assets for production with the following command:

```bash
npm run build
```

Create a zip archive:

```bash
npm run zip
```

Use `gscan` to test your theme for compatibility with Ghost:

```bash
npm run test
```



## Copyright & License

Copyright (c) 2013-2025 - Released under the [MIT license](LICENSE).

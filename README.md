# cbennell.com Ghost Theme

This is the Ghost CMS theme for cbennell.com. It's based on [Vapour](github.com/christopher-b/vapour), a Vite/TailwindCSS starter theme.

## How to Use This Theme

### Start development mode

From the theme folder, start development mode:

```bash
yarn dev
```

Open the Ghost admin dashboard on your development server. Open settings and navigate to Design & Branding > Customize > Theme, and enable the "Development mode" setting.

Changes you make to your styles, scripts, and Handlebars files will show up automatically in the browser. CSS and Javascript will be compiled and output to the `built` folder.

Press `ctrl + c` in the terminal to exit development mode.

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

## Copyright & License

Copyright (c) 2013-2025 - Released under the [MIT license](LICENSE).

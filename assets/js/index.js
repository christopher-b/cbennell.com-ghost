// As per https://vite.dev/guide/backend-integration.html
import "vite/modulepreload-polyfill";

// Code syntax highlighting
import "prismjs";

// CSS entrypoint
import "../css/index.css";

// Vite hot module reload
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log("HMR: JS updated");
  });
}

import "vite/modulepreload-polyfill"; // As per https://vite.dev/guide/backend-integration.html
import "./prism"; // Code syntax highlighting
import "../css/index.css"; // CSS entrypoint

// document.addEventListener("DOMContentLoaded", () => { });

// Vite hot module reload
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log("HMR: JS updated");
  });
}

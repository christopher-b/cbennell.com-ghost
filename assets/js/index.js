import "../css/index.css";
import "prismjs";

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log("HMR: JS updated");
  });
}

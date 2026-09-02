import { route } from "preact-router";
import "mdui/components/button.js";
import "../App.css";

export default function Welcome() {
  return (
    <main class="center-container">
      <h1 class="main-title">{import.meta.env.VITE_BUSINESS_NAME}</h1>
      <mdui-button icon="chevron_right" variant="outlined" onClick={() => route("/login")}>
        Let Start
      </mdui-button>
    </main>
  );
}

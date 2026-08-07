import { route } from "preact-router";
import "mdui/components/button.js";
import "@mdui/icons/chevron-right.js";
import "../App.css";

export default function Welcome() {
  return (
    <main class="center-container">
      <h1 class="main-title">{import.meta.env.VITE_BUSINESS_NAME}</h1>
      <mdui-button variant="outlined" onClick={() => route("/login")}>
        Let Start
        <mdui-icon-chevron-right slot="end-icon"></mdui-icon-chevron-right>
      </mdui-button>
    </main>
  );
}

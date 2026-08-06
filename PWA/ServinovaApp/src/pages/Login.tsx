import "../App.css";
import "mdui/components/card.js";
import "mdui/components/text-field.js";
import "@mdui/icons/person.js";
import "@mdui/icons/key.js";

export default function Login() {
  return (
    <main class="center-container">
      <h1 class="main-title">Servinova</h1>
      <mdui-card variant="elevated" class="box">
        <h2 class="main-title">Login</h2>
        <mdui-text-field variant="outlined" label="Username">
          <mdui-icon-person slot="icon"></mdui-icon-person>
        </mdui-text-field>
        <mdui-text-field variant="outlined" label="Password" type="password">
          <mdui-icon-key slot="icon"></mdui-icon-key>
        </mdui-text-field>
        <mdui-button variant="outlined" class="login-button">
          Login
        </mdui-button>
      </mdui-card>
    </main>
  );
}
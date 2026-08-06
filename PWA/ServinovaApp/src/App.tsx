import { useState } from "preact/hooks";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

import 'mdui/components/button.js';
import type { Button } from 'mdui/components/button.js';
import '@mdui/icons/chevron-right.js';

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main class="center-container">
      <h1 class="main-title">Servinova</h1>
      <mdui-button 
        variant="outlined"
        >
        Let Start
        <mdui-icon-chevron-right slot="end-icon"></mdui-icon-chevron-right>
      </mdui-button>
    </main>
  );
}

export default App;

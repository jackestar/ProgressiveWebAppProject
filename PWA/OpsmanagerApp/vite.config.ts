import { defineConfig, loadEnv } from "vite";
import preact from "@preact/preset-vite";
import { VitePWA } from 'vite-plugin-pwa';

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig(async ({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
return {
  plugins: [
    preact(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: env.VITE_BUSINESS_APP_NAME,
        short_name: env.VITE_BUSINESS_APP_NAME_SHORT,
        theme_color: '#fff0f0',
        icons: [
          // Add your PWA icon definitions here
        ]
      }
    })
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}
}
  
  );

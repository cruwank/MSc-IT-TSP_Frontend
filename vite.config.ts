import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';

declare module 'vite-plugin-favicons-inject' {
  const vitePluginFaviconsInject: (path: string) => any;
  export default vitePluginFaviconsInject;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePluginFaviconsInject('src/assets/letter-e.png'),
    ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})

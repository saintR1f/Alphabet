import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { loadEnv } from "vite";
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_DEPLOY_ENV === "GH_PAGES" ? "/Alphabet/" : "/";

  return {
    base,
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/styles/scss/_fonts" as *;
            @use "@/assets/styles/scss/_resets" as *;
            @use "@/assets/styles/scss/_mixins" as *;
            @use "@/assets/styles/scss/_variables" as *;
          `,
        },
      },
    },
    test: {
      globals: true,
      environment: "happy-dom",
    },
  };
});
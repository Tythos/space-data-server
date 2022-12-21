import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from "path";
import { viteSingleFile } from "vite-plugin-singlefile"
import postcss from './postcss.config.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({

    onwarn: (warning, handler) => {
      const { code, frame } = warning;
      if (code === "css-unused-selector")
        return;

      handler(warning);
    },
  }), viteSingleFile()],
  css: {
    postcss
  },
  resolve: {
    alias: {
      "@": resolve("../")
    }
  }
})

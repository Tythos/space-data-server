import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from "path";
import { viteSingleFile } from "vite-plugin-singlefile"
import postcss from './postcss.config.js';
import buildEnd from "./scripts/buildEnd.mjs";
import wasm from "vite-plugin-wasm";
import {nodePolyfills} from 'vite-plugin-node-polyfills'


// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: "window",
  },
  plugins: [
    nodePolyfills(),
    wasm(),
    buildEnd(),
    svelte({
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
      "@": resolve("../"),
      process: "process/browser",
      buffer: "./node_modules/buffer/index.js",
      stream: "./node_modules/stream-browserify/index.js",
    }
  }
})

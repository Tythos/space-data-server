// vite.config.ts
import { defineConfig } from "file:///Users/tj/software/space-data-server/UI/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///Users/tj/software/space-data-server/UI/node_modules/@sveltejs/vite-plugin-svelte/dist/index.js";
import { resolve } from "path";
import { viteSingleFile } from "file:///Users/tj/software/space-data-server/UI/node_modules/vite-plugin-singlefile/dist/esm/index.js";

// postcss.config.js
import tailwind from "file:///Users/tj/software/space-data-server/UI/node_modules/tailwindcss/lib/index.js";

// tailwind.config.js
import twElements from "file:///Users/tj/software/space-data-server/UI/node_modules/tw-elements/dist/plugin.js";
var tailwind_config_default = {
  content: ["./src/**/*.{html,js}", "./node_modules/tw-elements/dist/js/**/*.js"],
  plugins: [twElements],
  theme: {
    extend: {}
  },
  purge: ["./index.html", "./src/**/*.{svelte,js,ts}"],
  variants: {
    extend: {}
  },
  darkMode: "media"
};

// postcss.config.js
import autoprefixer from "file:///Users/tj/software/space-data-server/UI/node_modules/autoprefixer/lib/autoprefixer.js";
var postcss_config_default = {
  plugins: [tailwind(tailwind_config_default), autoprefixer]
};

// scripts/buildEnd.mjs
import { execSync } from "node:child_process";
function buildEnd_default(options) {
  let Config = null;
  return {
    name: "show-config",
    config(config) {
      Config = config;
    },
    buildEnd() {
      setTimeout(() => {
        execSync("cd .. && node ./scripts/uiBuild.mjs");
      }, 1e3);
    }
  };
}

// vite.config.ts
import wasm from "file:///Users/tj/software/space-data-server/UI/node_modules/vite-plugin-wasm/exports/import.mjs";
import { nodePolyfills } from "file:///Users/tj/software/space-data-server/UI/node_modules/vite-plugin-node-polyfills/dist/index.js";
var vite_config_default = defineConfig({
  define: {
    global: "window"
  },
  plugins: [
    nodePolyfills(),
    wasm(),
    buildEnd_default(),
    svelte({
      onwarn: (warning, handler) => {
        const { code, frame } = warning;
        if (code === "css-unused-selector")
          return;
        handler(warning);
      }
    }),
    viteSingleFile()
  ],
  css: {
    postcss: postcss_config_default
  },
  resolve: {
    alias: {
      "@": resolve("../"),
      process: "process/browser",
      buffer: "./node_modules/buffer/index.js",
      stream: "./node_modules/stream-browserify/index.js"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicG9zdGNzcy5jb25maWcuanMiLCAidGFpbHdpbmQuY29uZmlnLmpzIiwgInNjcmlwdHMvYnVpbGRFbmQubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3RqL3NvZnR3YXJlL3NwYWNlLWRhdGEtc2VydmVyL1VJXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdGovc29mdHdhcmUvc3BhY2UtZGF0YS1zZXJ2ZXIvVUkvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3RqL3NvZnR3YXJlL3NwYWNlLWRhdGEtc2VydmVyL1VJL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IHN2ZWx0ZSB9IGZyb20gJ0BzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGUnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IHZpdGVTaW5nbGVGaWxlIH0gZnJvbSBcInZpdGUtcGx1Z2luLXNpbmdsZWZpbGVcIlxuaW1wb3J0IHBvc3Rjc3MgZnJvbSAnLi9wb3N0Y3NzLmNvbmZpZy5qcyc7XG5pbXBvcnQgYnVpbGRFbmQgZnJvbSBcIi4vc2NyaXB0cy9idWlsZEVuZC5tanNcIjtcbmltcG9ydCB3YXNtIGZyb20gXCJ2aXRlLXBsdWdpbi13YXNtXCI7XG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSAndml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMnXG5cblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGRlZmluZToge1xuICAgIGdsb2JhbDogXCJ3aW5kb3dcIixcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIG5vZGVQb2x5ZmlsbHMoKSxcbiAgICB3YXNtKCksXG4gICAgYnVpbGRFbmQoKSxcbiAgICBzdmVsdGUoe1xuICAgICAgb253YXJuOiAod2FybmluZywgaGFuZGxlcikgPT4ge1xuICAgICAgICBjb25zdCB7IGNvZGUsIGZyYW1lIH0gPSB3YXJuaW5nO1xuICAgICAgICBpZiAoY29kZSA9PT0gXCJjc3MtdW51c2VkLXNlbGVjdG9yXCIpXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGhhbmRsZXIod2FybmluZyk7XG4gICAgICB9LFxuICAgIH0pLCB2aXRlU2luZ2xlRmlsZSgpXSxcbiAgY3NzOiB7XG4gICAgcG9zdGNzc1xuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiByZXNvbHZlKFwiLi4vXCIpLFxuICAgICAgcHJvY2VzczogXCJwcm9jZXNzL2Jyb3dzZXJcIixcbiAgICAgIGJ1ZmZlcjogXCIuL25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanNcIixcbiAgICAgIHN0cmVhbTogXCIuL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9pbmRleC5qc1wiLFxuICAgIH1cbiAgfVxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3RqL3NvZnR3YXJlL3NwYWNlLWRhdGEtc2VydmVyL1VJXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdGovc29mdHdhcmUvc3BhY2UtZGF0YS1zZXJ2ZXIvVUkvcG9zdGNzcy5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3RqL3NvZnR3YXJlL3NwYWNlLWRhdGEtc2VydmVyL1VJL3Bvc3Rjc3MuY29uZmlnLmpzXCI7aW1wb3J0IHRhaWx3aW5kIGZyb20gJ3RhaWx3aW5kY3NzJ1xuaW1wb3J0IHRhaWx3aW5kQ29uZmlnIGZyb20gJy4vdGFpbHdpbmQuY29uZmlnLmpzJ1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcGx1Z2luczpbdGFpbHdpbmQodGFpbHdpbmRDb25maWcpLGF1dG9wcmVmaXhlcl1cbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy90ai9zb2Z0d2FyZS9zcGFjZS1kYXRhLXNlcnZlci9VSVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3RqL3NvZnR3YXJlL3NwYWNlLWRhdGEtc2VydmVyL1VJL3RhaWx3aW5kLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdGovc29mdHdhcmUvc3BhY2UtZGF0YS1zZXJ2ZXIvVUkvdGFpbHdpbmQuY29uZmlnLmpzXCI7aW1wb3J0IHR3RWxlbWVudHMgZnJvbSBcInR3LWVsZW1lbnRzL2Rpc3QvcGx1Z2luXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29udGVudDogWycuL3NyYy8qKi8qLntodG1sLGpzfScsICcuL25vZGVfbW9kdWxlcy90dy1lbGVtZW50cy9kaXN0L2pzLyoqLyouanMnXSxcbiAgcGx1Z2luczogW3R3RWxlbWVudHNdLFxuICB0aGVtZToge1xuICAgIGV4dGVuZDoge30sXG4gIH0sXG4gIHB1cmdlOiBbXCIuL2luZGV4Lmh0bWxcIiwgJy4vc3JjLyoqLyoue3N2ZWx0ZSxqcyx0c30nXSwgLy8gZm9yIHVudXNlZCBDU1NcbiAgdmFyaWFudHM6IHtcbiAgICBleHRlbmQ6IHt9LFxuICB9LFxuICBkYXJrTW9kZTogXCJtZWRpYVwiXG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdGovc29mdHdhcmUvc3BhY2UtZGF0YS1zZXJ2ZXIvVUkvc2NyaXB0c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3RqL3NvZnR3YXJlL3NwYWNlLWRhdGEtc2VydmVyL1VJL3NjcmlwdHMvYnVpbGRFbmQubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy90ai9zb2Z0d2FyZS9zcGFjZS1kYXRhLXNlcnZlci9VSS9zY3JpcHRzL2J1aWxkRW5kLm1qc1wiO2ltcG9ydCB7IGV4ZWNTeW5jIH0gZnJvbSBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIGxldCBDb25maWcgPSBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IFwic2hvdy1jb25maWdcIixcbiAgICAgICAgY29uZmlnKGNvbmZpZykge1xuICAgICAgICAgICAgQ29uZmlnID0gY29uZmlnO1xuICAgICAgICB9LFxuICAgICAgICBidWlsZEVuZCgpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4ZWNTeW5jKFwiY2QgLi4gJiYgbm9kZSAuL3NjcmlwdHMvdWlCdWlsZC5tanNcIik7XG4gICAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICB9XG4gICAgfTtcblxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVMsU0FBUyxvQkFBb0I7QUFDcFUsU0FBUyxjQUFjO0FBQ3ZCLFNBQVMsZUFBZTtBQUN4QixTQUFTLHNCQUFzQjs7O0FDSDhRLE9BQU8sY0FBYzs7O0FDQW5CLE9BQU8sZ0JBQWdCO0FBRXRVLElBQU8sMEJBQVE7QUFBQSxFQUNiLFNBQVMsQ0FBQyx3QkFBd0IsNENBQTRDO0FBQUEsRUFDOUUsU0FBUyxDQUFDLFVBQVU7QUFBQSxFQUNwQixPQUFPO0FBQUEsSUFDTCxRQUFRLENBQUM7QUFBQSxFQUNYO0FBQUEsRUFDQSxPQUFPLENBQUMsZ0JBQWdCLDJCQUEyQjtBQUFBLEVBQ25ELFVBQVU7QUFBQSxJQUNSLFFBQVEsQ0FBQztBQUFBLEVBQ1g7QUFBQSxFQUNBLFVBQVU7QUFDWjs7O0FEWEEsT0FBTyxrQkFBa0I7QUFFekIsSUFBTyx5QkFBUTtBQUFBLEVBQ2IsU0FBUSxDQUFDLFNBQVMsdUJBQWMsR0FBRSxZQUFZO0FBQ2hEOzs7QUVOMlQsU0FBUyxnQkFBZ0I7QUFFclUsU0FBUixpQkFBa0IsU0FBUztBQUM5QixNQUFJLFNBQVM7QUFDYixTQUFPO0FBQUEsSUFDSCxNQUFNO0FBQUEsSUFDTixPQUFPLFFBQVE7QUFDWCxlQUFTO0FBQUEsSUFDYjtBQUFBLElBQ0EsV0FBVztBQUNQLGlCQUFXLE1BQU07QUFDYixpQkFBUyxxQ0FBcUM7QUFBQSxNQUNsRCxHQUFHLEdBQUk7QUFBQSxJQUNYO0FBQUEsRUFDSjtBQUVKOzs7QUhWQSxPQUFPLFVBQVU7QUFDakIsU0FBUyxxQkFBcUI7QUFJOUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLGNBQWM7QUFBQSxJQUNkLEtBQUs7QUFBQSxJQUNMLGlCQUFTO0FBQUEsSUFDVCxPQUFPO0FBQUEsTUFDTCxRQUFRLENBQUMsU0FBUyxZQUFZO0FBQzVCLGNBQU0sRUFBRSxNQUFNLE1BQU0sSUFBSTtBQUN4QixZQUFJLFNBQVM7QUFDWDtBQUVGLGdCQUFRLE9BQU87QUFBQSxNQUNqQjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQUcsZUFBZTtBQUFBLEVBQUM7QUFBQSxFQUN0QixLQUFLO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssUUFBUSxLQUFLO0FBQUEsTUFDbEIsU0FBUztBQUFBLE1BQ1QsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

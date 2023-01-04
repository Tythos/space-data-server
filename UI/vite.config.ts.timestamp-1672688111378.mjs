// vite.config.ts
import { defineConfig } from "file:///home/tj/software/space-data-server/UI/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///home/tj/software/space-data-server/UI/node_modules/@sveltejs/vite-plugin-svelte/dist/index.js";
import { resolve } from "path";
import { viteSingleFile } from "file:///home/tj/software/space-data-server/UI/node_modules/vite-plugin-singlefile/dist/esm/index.js";

// postcss.config.js
import tailwind from "file:///home/tj/software/space-data-server/UI/node_modules/tailwindcss/lib/index.js";

// tailwind.config.js
var tailwind_config_default = {
  plugins: [],
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
import autoprefixer from "file:///home/tj/software/space-data-server/UI/node_modules/autoprefixer/lib/autoprefixer.js";
var postcss_config_default = {
  plugins: [tailwind(tailwind_config_default), autoprefixer]
};

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [svelte({
    onwarn: (warning, handler) => {
      const { code, frame } = warning;
      if (code === "css-unused-selector")
        return;
      handler(warning);
    }
  }), viteSingleFile()],
  css: {
    postcss: postcss_config_default
  },
  resolve: {
    alias: {
      "@": resolve("../")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicG9zdGNzcy5jb25maWcuanMiLCAidGFpbHdpbmQuY29uZmlnLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvdGovc29mdHdhcmUvc3BhY2UtZGF0YS1zZXJ2ZXIvVUlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3RqL3NvZnR3YXJlL3NwYWNlLWRhdGEtc2VydmVyL1VJL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3RqL3NvZnR3YXJlL3NwYWNlLWRhdGEtc2VydmVyL1VJL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IHN2ZWx0ZSB9IGZyb20gJ0BzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGUnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IHZpdGVTaW5nbGVGaWxlIH0gZnJvbSBcInZpdGUtcGx1Z2luLXNpbmdsZWZpbGVcIlxuaW1wb3J0IHBvc3Rjc3MgZnJvbSAnLi9wb3N0Y3NzLmNvbmZpZy5qcyc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbc3ZlbHRlKHtcblxuICAgIG9ud2FybjogKHdhcm5pbmcsIGhhbmRsZXIpID0+IHtcbiAgICAgIGNvbnN0IHsgY29kZSwgZnJhbWUgfSA9IHdhcm5pbmc7XG4gICAgICBpZiAoY29kZSA9PT0gXCJjc3MtdW51c2VkLXNlbGVjdG9yXCIpXG4gICAgICAgIHJldHVybjtcblxuICAgICAgaGFuZGxlcih3YXJuaW5nKTtcbiAgICB9LFxuICB9KSwgdml0ZVNpbmdsZUZpbGUoKV0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3NcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcmVzb2x2ZShcIi4uL1wiKVxuICAgIH1cbiAgfVxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvdGovc29mdHdhcmUvc3BhY2UtZGF0YS1zZXJ2ZXIvVUlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3RqL3NvZnR3YXJlL3NwYWNlLWRhdGEtc2VydmVyL1VJL3Bvc3Rjc3MuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3RqL3NvZnR3YXJlL3NwYWNlLWRhdGEtc2VydmVyL1VJL3Bvc3Rjc3MuY29uZmlnLmpzXCI7aW1wb3J0IHRhaWx3aW5kIGZyb20gJ3RhaWx3aW5kY3NzJ1xuaW1wb3J0IHRhaWx3aW5kQ29uZmlnIGZyb20gJy4vdGFpbHdpbmQuY29uZmlnLmpzJ1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcGx1Z2luczpbdGFpbHdpbmQodGFpbHdpbmRDb25maWcpLGF1dG9wcmVmaXhlcl1cbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3RqL3NvZnR3YXJlL3NwYWNlLWRhdGEtc2VydmVyL1VJXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS90ai9zb2Z0d2FyZS9zcGFjZS1kYXRhLXNlcnZlci9VSS90YWlsd2luZC5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvdGovc29mdHdhcmUvc3BhY2UtZGF0YS1zZXJ2ZXIvVUkvdGFpbHdpbmQuY29uZmlnLmpzXCI7ZXhwb3J0IGRlZmF1bHQge1xuICBwbHVnaW5zOiBbXSxcbiAgdGhlbWU6IHtcbiAgICBleHRlbmQ6IHt9LFxuICB9LFxuICBwdXJnZTogW1wiLi9pbmRleC5odG1sXCIsICcuL3NyYy8qKi8qLntzdmVsdGUsanMsdHN9J10sIC8vIGZvciB1bnVzZWQgQ1NTXG4gIHZhcmlhbnRzOiB7XG4gICAgZXh0ZW5kOiB7fSxcbiAgfSxcbiAgZGFya01vZGU6IFwibWVkaWFcIlxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1MsU0FBUyxvQkFBb0I7QUFDalUsU0FBUyxjQUFjO0FBQ3ZCLFNBQVMsZUFBZTtBQUN4QixTQUFTLHNCQUFzQjs7O0FDSDJRLE9BQU8sY0FBYzs7O0FDQW5CLElBQU8sMEJBQVE7QUFBQSxFQUN6VCxTQUFTLENBQUM7QUFBQSxFQUNWLE9BQU87QUFBQSxJQUNMLFFBQVEsQ0FBQztBQUFBLEVBQ1g7QUFBQSxFQUNBLE9BQU8sQ0FBQyxnQkFBZ0IsMkJBQTJCO0FBQUEsRUFDbkQsVUFBVTtBQUFBLElBQ1IsUUFBUSxDQUFDO0FBQUEsRUFDWDtBQUFBLEVBQ0EsVUFBVTtBQUNaOzs7QURSQSxPQUFPLGtCQUFrQjtBQUV6QixJQUFPLHlCQUFRO0FBQUEsRUFDYixTQUFRLENBQUMsU0FBUyx1QkFBYyxHQUFFLFlBQVk7QUFDaEQ7OztBRENBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxPQUFPO0FBQUEsSUFFZixRQUFRLENBQUMsU0FBUyxZQUFZO0FBQzVCLFlBQU0sRUFBRSxNQUFNLE1BQU0sSUFBSTtBQUN4QixVQUFJLFNBQVM7QUFDWDtBQUVGLGNBQVEsT0FBTztBQUFBLElBQ2pCO0FBQUEsRUFDRixDQUFDLEdBQUcsZUFBZSxDQUFDO0FBQUEsRUFDcEIsS0FBSztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsS0FBSztBQUFBLElBQ3BCO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
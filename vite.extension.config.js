import { defineConfig } from "vite";

export default defineConfig({
  build: {
    cssCodeSplit: true,
    emptyOutDir: false,
    minify: true,
    outDir: "extensions/theme-extension/",
    rollupOptions: {
      input: [
        "extensions/theme-extension/src/app.js",
        "extensions/theme-extension/src/app.css",
      ],
      output: {
        assetFileNames: "assets/app.[ext]",
        format: "es",
        strict: false,
        entryFileNames: "assets/app.js",
      },
    },
  },
});

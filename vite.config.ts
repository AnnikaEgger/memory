import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        settings: resolve(__dirname, "./html/settings.html"),
        game: resolve(__dirname, "./html/game.html"),
        endscreen: resolve(__dirname, "./html/endscreen.html"),
      },
    },
  },
});

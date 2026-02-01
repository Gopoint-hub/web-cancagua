import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import vike from "vike/plugin";

const plugins = [react(), tailwindcss(), jsxLocPlugin(), vike({ prerender: false })];

export default defineConfig({
  plugins,
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    assetsDir: "assets",
  },
  server: {
    host: true,
    allowedHosts: true, // Allow all hosts for Render deployment
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  ssr: {
    noExternal: ['wouter'], // Para coexistencia temporal con Wouter durante la migración
  },
});

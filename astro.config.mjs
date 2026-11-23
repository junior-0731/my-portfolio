// @ts-check
import { defineConfig } from "astro/config";

// Sitio 100% estático: HTML pre-renderizado y JS solo donde hace falta.
export default defineConfig({
  site: "https://junior-herrera.vercel.app",
  build: { inlineStylesheets: "auto" },
});

// @ts-check
import { defineConfig } from "astro/config";

// Sitio 100% estático: HTML pre-renderizado y JS solo donde hace falta.
export default defineConfig({
  site: "https://example.com", // cámbialo por tu dominio al publicar
  build: { inlineStylesheets: "auto" },
});

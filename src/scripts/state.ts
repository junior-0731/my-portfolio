import type { Lang, MaterialMode } from "@/data/portfolio";

/** Modo del lienzo 3D según la sección visible (atributo data-gl). */
export type GlMode = "hero" | "vistas" | "dim" | "contact";

/** Estado compartido entre el DOM (GSAP/scroll) y la escena 3D. */
export const state = {
  mode: "hero" as GlMode,
  /** Progreso 0..1 de la sección "vistas" fijada. */
  vProgress: 0,
  /** Giro extra que el usuario aplica arrastrando (radianes). */
  dragRot: 0,
  /** Velocidad del scroll (Lenis), sirve para efectos de inercia. */
  velocity: 0,
  mat: "render" as MaterialMode,
  lang: "es" as Lang,
  reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
  finePointer: matchMedia("(hover: hover) and (pointer: fine)").matches,
};

export const emit = (name: string, detail?: unknown) => window.dispatchEvent(new CustomEvent(name, { detail }));
export const on = (name: string, fn: (e: CustomEvent) => void) => window.addEventListener(name, fn as EventListener);

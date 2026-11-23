# Junior Herrera · Portafolio

Sitio personal de Junior Herrera, Power Platform & Full-Stack Developer en Medellín, Colombia.
Bilingüe (ES/EN), estático y ligero.

## Stack

| Pieza | Para qué |
|---|---|
| **Astro 7** | HTML pre-renderizado y JS solo donde hace falta |
| **GSAP + ScrollTrigger** | Animaciones de entrada y de scroll |
| **Lenis** | Scroll suave |
| **TypeScript** | Todo tipado (`npm run check`) |
| Fuentes self-hosted (Fontsource) | Sin peticiones a servicios externos |

## Comandos

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # chequeo de tipos + build a /dist
npm run preview   # sirve /dist
```

## Dónde se edita cada cosa

- **Textos, proyectos, equipo, trayectoria y hojas de vida:** `src/data/casos.ts`
- **Datos generales, navegación, cifras y video:** `src/data/portfolio.ts`
- **Estilos globales:** `src/styles/global.css`; cada sección tiene los suyos en `src/components/*.astro`
- **Hojas de vida (PDF):** `public/cv/`
- **Video de presentación:** `public/videos/`

## Publicación

Se despliega en Vercel desde la rama `main` (detecta Astro solo: `npm run build`, salida en `dist`).

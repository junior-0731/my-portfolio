# Stack y modelos de IA para el desarrollo

Documentación de referencia para el issue #1: define el stack técnico del portfolio y cuándo usar cada modelo de IA (Codex / Claude) durante el desarrollo.

## Stack

- **Framework:** Astro — genera HTML estático por defecto, cero JS salvo que se use una isla interactiva. Es la opción más rápida en Core Web Vitals para un sitio de contenido como un portfolio.
- **Estilos:** Tailwind CSS.
- **Contenido:** Markdown/JSON vía Astro Content Collections (proyectos, experiencia, skills) — sin base de datos.
- **Backend:** no se requiere. El sitio es estático.
  - Formulario de contacto: servicio externo (Formspree / Web3Forms / EmailJS), sin servidor propio.
- **Hosting:** Vercel o Netlify (deploy estático, capa gratuita).

## Modelos de IA para el desarrollo

Se usarán dos asistentes de IA en el flujo de trabajo, cada uno con fortalezas distintas:

### Claude (Claude Code)

Recomendado para:
- Tareas que requieren entender el proyecto completo (arquitectura, múltiples archivos relacionados).
- Refactors, debugging de problemas no triviales y planeación de cambios antes de implementarlos.
- Redacción de documentación, commits, PRs y revisión de código.
- Decisiones de diseño/estructura donde el razonamiento y el contexto amplio importan más que la velocidad.

### Codex

Recomendado para:
- Generación rápida de código acotado: componentes puntuales, funciones, snippets, boilerplate.
- Iteración veloz en tareas bien definidas y de alcance pequeño, sin necesidad de contexto extenso del repo.
- Autocompletado y prototipado rápido durante el desarrollo activo.

### Criterio práctico

- ¿La tarea abarca varios archivos o requiere entender el "por qué" del proyecto? → **Claude**.
- ¿La tarea es puntual, acotada y se puede describir en una frase? → **Codex**.

# Plan: Hero "alter ego" interactivo + descarga de CV

Plan de trabajo derivado del issue #2 (asignación de responsabilidades). Cubre dos entregables:

1. **Hero interactivo**: retrato real al centro; al pasar el cursor, la mitad izquierda se atenúa y la derecha se completa con una versión ilustrada, revelando habilidades.
2. **Sección de descarga de CV**: dos PDFs siempre actualizados — uno con diseño propio y otro bajo normas Harvard.

Stack base ya definido en [`stack-y-modelos.md`](./stack-y-modelos.md): Astro + Tailwind, estático, sin backend.

## Decisiones cerradas

| Tema | Decisión |
|---|---|
| Alter ego | **Ilustración original de Junior citando la gramática Super Saiyan** — la transformación, no el personaje |
| Móvil | **Split estático 50/50**, sin animación ni JS |
| Paleta | **Dark + dual accent**: cian (ingeniería) / ámbar (alter) |
| PDFs | **Generados desde `src/data/cv.ts`** con script, nunca a mano |
| Copy del hero | **"Se activa cuando el problema lo pide."** — una línea, sin nombrar la referencia |

---

## 1. Concepto: dualidad, no disfraz

La idea funciona si se lee como **una metáfora profesional**, no como fan art. El principio rector:

> El visitante debe entender el mensaje en 2 segundos **sin interactuar**. La animación es un premio, no un requisito.

Reglas de contención (lo que mantiene la formalidad):

| Sí | No |
|---|---|
| Ilustración estilizada del propio rostro | Personaje con copyright reconocible (ver riesgo abajo) |
| Un solo acento de color por lado | Explosiones de color, auras multicolor |
| 4–5 chips de tecnologías reales | "Niveles de poder", números de batalla, logos de anime |
| Transición de 300–400 ms, una sola vez | Loops infinitos, partículas, sonido |
| Todo el contenido legible sin hover | Información que solo existe dentro del efecto |

**Decidido:** la mitad derecha es una **ilustración original del propio rostro de Junior** que cita la gramática visual del Super Saiyan, sin reproducir a ningún personaje.

### 1.1 El requisito difícil: reconocible como DBZ, sin leerse como fan

Son dos exigencias que tiran en direcciones opuestas, y **no es un interruptor sino un dial**: cada código visual que se apila acerca a lo reconocible y, a la vez, a lo fan. La salida no es un punto medio tibio, es elegir *cuáles* códigos se usan.

**Principio rector: se cita la transformación, no al personaje.**

Lo más identificable de DBZ no es el rostro de Goku, es el Super Saiyan como gramática: cabello que se levanta y se enciende, aura que fluye **hacia arriba** como llama (frente al brillo genérico, que irradia hacia afuera), arcos eléctricos finos, escombros que ascienden en vez de caer, sombreado cel de contorno duro. Esa gramática es inconfundible para quien la conoce y, para quien no, simplemente lee "está encendido". La transformación es más icónica que el personaje, así que no hace falta su cara — y el estilo visual no goza de la protección que sí tiene un diseño de personaje, con lo que el riesgo legal desaparece.

**Convergencia de paleta:** cian → ámbar coincide con la paleta Super Saiyan (aura dorada, iris turquesa). El color ya hace la mitad del trabajo de identificación.

### 1.2 Cómo se explica visualmente el porqué

Cuatro capas, en orden de importancia:

1. **La interacción es la explicación.** En DBZ la transformación se dispara porque el problema excede a la forma actual: es escalar el esfuerzo cuando la tarea lo exige. Un retrato en reposo que se enciende *solo cuando alguien se acerca* ya cuenta ese argumento sin una palabra.
2. **Continuidad del rostro.** Debe ser evidente que es la misma persona — misma mandíbula, cejas, corte de barba. Si pareciera otro, pasa a ser disfraz. Que sea un *estado* y no un personaje es lo que convierte la referencia en metáfora.
3. **Una línea de copy** (decidido), el explicador más eficiente que existe:
   > **"Se activa cuando el problema lo pide."**

   Quien conoce DBZ lee el doble sentido; quien no, lee una afirmación sobre método de trabajo. La misma frase sirve a ambos públicos sin guiñar el ojo a ninguno. **No se nombra la referencia en ninguna parte del sitio** — mencionarla por escrito es precisamente lo que convertiría el criterio de diseño en declaración de gusto personal.

   Ubicación: bajo el retrato, como subtítulo del rol, en `--muted`. Tamaño discreto; no compite con el nombre.
4. **Chips con tecnologías reales**, para que el "poder" sea técnico y verificable en vez de narrativo.

### 1.3 Brief de la ilustración (issue #3)

Base: la foto ya recortada y enderezada (`junior-cutout.png`), nunca un render desde cero.

**Dosis máxima: cuatro códigos.** La contención es, en sí misma, la señal de criterio de diseño.

| Incluir (los 4 códigos) | Detalle |
|---|---|
| Cabello | Se levanta y se apunta, con luminancia ámbar en las puntas. **Conserva su línea de nacimiento y su patrón de onda real** — nunca la silueta de Goku, que es la parte más protegida del diseño |
| Aura | Vertical, aflamada, fluyendo **hacia arriba**. Es el código que distingue DBZ de cualquier resplandor genérico |
| Arcos eléctricos | Filamentos finos dentro del aura, **escasos (3–5)**. Código SSJ2 |
| Sombreado | Cel de borde duro, dos tonos, contorno grueso y seguro. Estilo Toei |

Complementos de bajo coste: iris desplazado a turquesa con luz interna y párpado superior marcado (estructura ocular Toriyama); 4–6 partículas **ascendiendo**; un brillo duro en pómulo y mandíbula.

| Excluir | Motivo |
|---|---|
| Rostro, silueta de cabello o likeness de cualquier personaje | IP + rompe la continuidad del punto 1.2.2 |
| Gi naranja, camiseta azul, muñequeras | Disfraz |
| Kanji de Capsule Corp / Escuela de la Tortuga, cualquier logo | IP + tell de fan |
| Scouter | Prop con diseño protegido |
| Niveles de poder, cifras de batalla | El tell de fan más inmediato |
| Kamehameha, esfera de energía en la mano | Pose de acción, incompatible con un retrato |
| Tipografía de la franquicia | IP + tell de fan |

Un solo color de energía: `--accent-alter` (ámbar). Nada de auras multicolor. Sin texto dentro de la imagen.

---

## 2. Hero interactivo — diseño técnico

### 2.1 Estructura

```html
<section class="hero">
  <div class="portrait">
    <img  class="portrait__real"  src="junior.avif" alt="Junior Herrera" fetchpriority="high">
    <img  class="portrait__alter" src="alter.avif"  alt="" aria-hidden="true">
    <span class="portrait__seam" aria-hidden="true"></span>
    <ul   class="portrait__skills" aria-hidden="true"> … chips … </ul>
  </div>
  <div class="hero__copy"> nombre + rol + CTAs </div>
</section>
```

- `.portrait__real` es el **elemento LCP**: carga con prioridad alta, sin lazy.
- `.portrait__alter` va recortada con `clip-path: inset(0 0 0 var(--split))` y `opacity: 0`.
- El contenedor tiene `aspect-ratio` fijo → **CLS = 0**.

### 2.2 La animación (y por qué es barata)

Solo se animan **`opacity` y `transform`**: propiedades que el navegador resuelve en el compositor, sin recalcular layout ni repintar. No se animan `clip-path`, `filter: blur`, `width` ni `box-shadow`.

| Elemento | Al entrar el cursor | Duración |
|---|---|---|
| Mitad izquierda (real) | `opacity 1 → 0.55` | 300 ms |
| Mitad derecha (alter) | `opacity 0 → 1` | 350 ms |
| Costura central | `transform: scaleY(0 → 1)` + glow | 250 ms |
| Chips de skills | `opacity` + `translateY(8px → 0)`, stagger 40 ms | 380 ms total |

Curva: `cubic-bezier(.22,.61,.36,1)` — salida rápida, llegada suave. Al salir el cursor, todo revierte en ~180 ms.

El borde entre ambas mitades usa una `mask-image` con degradado de ~24 px para que la unión no sea un corte duro, más las marcas tipo regla de tu referencia (un `repeating-linear-gradient`, coste cero).

### 2.3 Seguimiento del cursor (opcional)

La costura puede seguir el eje X del puntero dentro de un rango acotado (42 %–58 %) para dar sensación de respuesta. Implementación: un único listener `pointermove` que **no escribe en el DOM directamente**, sino que guarda el valor y lo aplica dentro de un `requestAnimationFrame` — máximo una escritura por frame, de una sola custom property (`--split`). Coste despreciable. Si decides que no aporta, se elimina y el efecto queda **100 % CSS, cero JavaScript**.

### 2.4 Accesibilidad

- `prefers-reduced-motion: reduce` → crossfade plano de 120 ms, sin stagger ni seguimiento de cursor.
- El efecto también se dispara con teclado vía `:focus-visible` sobre un contenedor enfocable.
- La imagen alter es `aria-hidden` (decorativa); el `alt` real describe la foto.
- **Los chips se repiten en la sección de habilidades estándar**: ningún dato vive solo dentro del hover.

### 2.5 Móvil / táctil

No hay hover en táctil. **Decidido: split estático 50/50.** En móvil el retrato se muestra ya dividido, con ambas mitades al 100 % de opacidad y la costura visible, sin animación y sin cargar la isla de JS.

Implementación: la interactividad se envuelve en `@media (hover: hover) and (pointer: fine)`, y la isla de Astro se hidrata con `client:media="(hover: hover)"`. En móvil el coste del efecto es literalmente **0 KB de JS**.

### 2.6 Assets (el punto crítico)

#### Foto base elegida

Junior aportó la foto candidata (retrato frontal, buzo negro, fondo de salón con globos).

Lo que ya funciona: ángulo frontal, expresión tranquila con media sonrisa — adecuada para el lado "profesional" —, y ropa oscura coherente con la paleta.

Lo que hay que corregir antes de usarla (**criterio de aceptación del issue #3**):

| # | Problema | Acción |
|---|---|---|
| 1 | Resolución: el archivo recibido es un pegado de pantalla de **866 × 746 px**. El retrato se sirve a ~1024 px y en pantallas 2× exige ~2048 px de región útil; la cabeza aquí ocupa ~1/3 del encuadre. Escalarla ablanda justo la cara, que es el elemento LCP. | **Pedir el original de cámara/celular**, sin captura de pantalla de por medio |
| 2 | ~~Globo verde menta detrás de la cabeza~~ → **retocado**, la masa ya no está. Queda un **velo verdoso en la coronilla**, mezclado con el borde del cabello | Limpiar solo ese tramo. Es crítico: el fondo final es oscuro (el verde se lee como defecto) y ahí mismo va el encendido ámbar de las puntas |
| 3 | Fondo con contexto de fiesta (estantería, marco de puerta) que compite con la mitad ilustrada | **Recorte a PNG con transparencia** y composición sobre el fondo del sitio — no desenfoque. Nota: retocar el fondo es trabajo perdido, se descarta en el recorte; lo único que importa es el contorno del cabello |
| 4 | Leve inclinación de cabeza: el eje nariz-mentón no cae a plomo, así que la costura al 50 % no coincidiría con la línea media facial | Rotar 1–2° para enderezar el eje facial y recortar con esa línea exactamente en el punto de corte |
| 5 | Luz plana y ligeramente fría, sin luz de borde | Pintar en post el rim light ámbar del lado derecho que conecta con `--accent-alter` |
| 6 | Buzo negro sobre fondo oscuro → riesgo de "cabeza flotante" | Rim light frío tenue en el hombro izquierdo, o degradado radial sutil detrás |

Como la ilustración se deriva de esta misma foto ya corregida, la alineación entre ambas mitades queda garantizada por construcción.

#### Requisitos generales

El efecto se cae si las dos imágenes no están **alineadas al píxel**. Requisitos de producción:

- Misma resolución, mismo encuadre, **misma línea de ojos y misma mandíbula**. La ilustración se genera *a partir de* la foto final, no al revés.
- Fondo transparente o idéntico en ambas.
- Luz coherente: si el acento del lado alter es cálido, el rim light del lado real debe insinuarlo.
- Export **AVIF + WebP fallback**, dos anchos (640w / 1024w).
- Presupuesto: **≤ 180 KB** sumando ambas versiones en desktop.
- La imagen alter se precarga en `requestIdleCallback` tras el `load`, para que el primer hover no parpadee.

### 2.7 Presupuesto de rendimiento (criterio de aceptación)

| Métrica | Objetivo |
|---|---|
| LCP | < 1.8 s en 4G simulado |
| CLS | 0 |
| INP | < 200 ms |
| JS de la isla hero | ≤ 3 KB gzip |
| Lighthouse Performance / A11y | ≥ 95 |

---

## 3. Paleta y sistema de diseño

**Decidido**: dark con dual accent. El color le da **lógica a la dualidad** en vez de solo decorar.

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#0B0F14` | Fondo base |
| `--surface` | `#121821` | Tarjetas, secciones |
| `--text` | `#E6EDF3` | Texto principal |
| `--muted` | `#8B98A5` | Texto secundario |
| `--accent-dev` | `#38BDF8` (cian) | Lado izquierdo, enlaces, foco |
| `--accent-alter` | `#F59E0B` (ámbar) | Lado derecho, costura, chips |

Cian = lado racional / ingeniería. Ámbar = lado intenso / energía. El resto del sitio usa cian; el ámbar aparece **solo** en el hero y en micro-acentos, lo que lo convierte en un gesto deliberado en vez de decoración.

Tipografía: sans geométrica para títulos (Space Grotesk o Sora) + sans neutra para cuerpo (Inter), autoalojadas, `font-display: swap`, subset latino.

---

## 4. Sección de descarga de CV

### 4.1 Una fuente de datos, dos salidas

**Decidido**: generación automática. Un solo archivo de datos (`src/data/cv.ts`) alimenta tres consumidores, de modo que nunca se desincronizan y la fecha de "actualizado" es real:

```
src/data/cv.ts
   ├── secciones del sitio (experiencia, proyectos, skills)
   ├── /cv/design   → ruta con CSS de impresión → CV-Junior-Herrera-Design.pdf
   └── /cv/harvard  → ruta con CSS de impresión → CV-Junior-Herrera-Harvard.pdf
```

Generación: script `npm run cv:pdf` que abre ambas rutas con Playwright y ejecuta `page.pdf()` hacia `public/cv/`. Se corre al cambiar el CV; los PDFs quedan versionados en el repo. La fecha de actualización sale del `mtime` del archivo generado, no de un string escrito a mano.

Cada PDF lleva un sello **"Actualizado: &lt;mes&gt; &lt;año&gt;"** y la sección web muestra esa misma fecha más el peso del archivo. Así "PDF actualizado" es verificable y no una promesa.

### 4.2 Versión A — "Design"

Evolución de tu CV actual: barra lateral oscura, foto circular, jerarquía fuerte, acentos de la paleta del sitio. Para enviar por LinkedIn, mostrar en entrevista o adjuntar donde lo lee una persona.

### 4.3 Versión B — "Harvard"

Formato estricto según la guía de resumes de Harvard (que además es la más amable con los filtros ATS):

- **Una sola columna**, sin tablas ni cajas — los parsers ATS rompen con multicolumna.
- **Sin foto**, sin dirección completa; solo ciudad, teléfono, email, LinkedIn y GitHub.
- Orden **Education → Experience → Projects → Skills**, cronológico inverso.
- Fechas alineadas a la derecha, formato consistente.
- Viñetas con estructura **verbo de acción + qué + resultado medible**, sin pronombres personales.
- Tipografía estándar 10–11 pt, márgenes 0.5–1", **una página**.
- Sin gráficos, sin barras de "nivel de habilidad", sin colores.

### 4.4 Contenido: lo que falta para que quede al 100 %

Tu CV actual describe bien *qué* haces, pero casi ninguna viñeta cierra con *cuánto*. Harvard penaliza eso explícitamente, y es lo que separa un CV correcto de uno fuerte. Datos que necesito (aproximados sirven):

- Nº de flujos de Power Automate / apps de Power Apps en producción.
- Tiempo que tomaba la creación de referencias antes vs. ahora (ej. "de 2 días a 10 minutos").
- Nº de personas o áreas que usan las aplicaciones internas que mantienes.
- Nº de sitios de SharePoint administrados / usuarios impactados.
- En Learning Zone: nº de estudiantes, nº de cursos, tamaño del equipo.
- Fecha exacta de inicio de la práctica y de la conversión a contrato a término fijo.
- Cualquier cosa posterior a la versión actual del PDF (sep. 2025 → nov. 2026 es más de un año).

### 4.5 UX de la sección

Dos tarjetas lado a lado, cada una con: nombre de la versión, para qué sirve (una línea), fecha de actualización, peso y botón con atributo `download`. Un enlace secundario "ver en el navegador" apuntando a la ruta HTML — útil en móvil y mejor para SEO que un PDF suelto.

---

## 5. Desglose en issues y asignación (cierra el issue #2)

| # | Issue | Responsable | Esfuerzo |
|---|---|---|---|
| 1 | Scaffold Astro + Tailwind + tokens de diseño | Claude | Medio |
| 2 | Sistema de diseño: paleta, tipografía, escalas | Claude | Bajo |
| 3 | Producción de assets del hero (foto HD + ilustración alineada) | **Junior** (Claude redacta el brief y valida alineación) | Medio |
| 4 | Componente `HeroSplit` estático (HTML + CSS, sin JS) | Codex | Bajo |
| 5 | Isla de interacción: pointer + rAF + reduced-motion + foco | Claude | Medio |
| 6 | Chips de habilidades con stagger | Codex | Bajo |
| 7 | Pipeline de imágenes (AVIF/WebP, srcset, precarga idle) | Codex | Bajo |
| 8 | Fuente única de datos `cv.ts` + tipos | Claude | Medio |
| 9 | Plantilla de impresión "Design" | Codex | Medio |
| 10 | Plantilla de impresión "Harvard" (normas + ATS) | Claude | Medio |
| 11 | Script `cv:pdf` con Playwright | Claude | Medio |
| 12 | Sección de descargas (tarjetas + metadatos) | Codex | Bajo |
| 13 | Auditoría: Lighthouse, teclado, reduced-motion, móvil | Claude | Medio |

Criterio aplicado (de `stack-y-modelos.md`): Codex toma lo acotado y describible en una frase; Claude toma lo que cruza archivos, define contratos o exige criterio.

**Orden sugerido:** 1 → 2 → 3 (en paralelo con 4) → 5 → 6 → 7 → 8 → 9/10 → 11 → 12 → 13.

---

## 6. Preguntas abiertas

Resueltas: alter ego, móvil, paleta y generación de PDFs (ver "Decisiones cerradas").

Pendientes:

1. **Layout del hero**: ¿ocupa pantalla completa, o el retrato convive con el copy (nombre, rol, CTAs) a un costado? La imagen de referencia sugiere lo segundo.
2. **Contenido de los chips**: ¿tecnologías (Angular, .NET, Power Platform…) o atributos (automatización, end-to-end, integración)?
3. **Idioma del sitio**: ¿español, inglés o ambos? Afecta directamente a los PDFs — el formato Harvard se usa habitualmente en inglés.
4. **Las métricas del punto 4.4** — es lo único que bloquea que el CV quede al 100 %.

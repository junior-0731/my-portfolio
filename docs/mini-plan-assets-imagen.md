# Mini plan: producción de los assets del hero

Procedimiento para el issue #3. Complementa [`plan-hero-alter-ego-y-cv.md`](./plan-hero-alter-ego-y-cv.md) §1.3 y §2.6.

## Regla que no se negocia

**La mitad izquierda es una fotografía y sigue siendo una fotografía.** Ningún modelo de imagen la toca.

Si se le pide a una IA que "mejore" o reinterprete la foto, redibuja el rostro: cambia nariz, suaviza mandíbula, inventa otra persona. En ese momento se pierde la premisa — el efecto depende de que se reconozca al *mismo* individuo en otro estado. Dos ilustraciones no son una transformación, son dos dibujos.

Por tanto: **retoque fotográfico manual** para la mitad real, **generación por IA** solo para la alter.

---

## Paso 0 — Conseguir el original

Archivo tal cual sale del dispositivo, ≥ 2000 px en el lado corto. Ver [`assets/source/README.md`](../assets/source/README.md).

Si existe una toma de esa misma sesión **sin el globo detrás**, usar esa: ahorra todo el paso 2.

---

## Paso 1 — Recorte con transparencia

**Herramienta: NO un modelo de lenguaje.** Esto es segmentación, no generación.

| Opción | Cuándo |
|---|---|
| Photoshop → *Select Subject* + *Refine Hair* | Mejor resultado en el pelo, que es lo único difícil |
| Photoroom / remove.bg / Canva BG Remover | Suficiente si el borde del cabello queda limpio; revisar al 200 % |

Salida: `junior-cutout.png`, fondo transparente.

Verificación: abrir sobre un fondo `#0B0F14`. No debe haber halo claro ni mechones recortados en bloque.

---

## Paso 2 — Limpiar el velo verde de la coronilla

Residuo del globo retocado, mezclado con el borde del pelo. Crítico porque el fondo final es oscuro y porque ahí mismo va el encendido ámbar de las puntas.

Sello de clonar desde una zona de pelo limpia, o desaturar selectivamente ese parche. Dos minutos de trabajo manual. **No delegar a un generador** — rellenaría inventando mechones.

---

## Paso 3 — Enderezar el eje facial

Rotar 1–2° hasta que la línea nariz-mentón quede a plomo, y recortar dejando esa línea exactamente en el punto donde caerá la costura (50 %).

Este paso va **antes** de generar la ilustración: así la alineación entre mitades queda garantizada por construcción y no hay que cuadrarlas después.

---

## Paso 4 — Generar la ilustración alter

**Herramienta: img2img con preservación de identidad**, partiendo de `junior-cutout.png` ya enderezado.

Candidatos (conviene comparar el estado actual de cada uno antes de elegir — este campo cambia rápido):

| Modelo | Fortaleza |
|---|---|
| Gemini / Nano Banana (image edit) | Preservación de identidad en edición sobre foto |
| ChatGPT (GPT-Image) | Seguimiento fiel de prompts largos y con restricciones |
| Flux Kontext | Edición localizada manteniendo el resto intacto |
| Midjourney con `--cref` | Estilo fuerte, pero menos control de encuadre |

**Generar la cabeza ilustrada completa, no media.** El recorte a la mitad lo hace el CSS (`clip-path`). Pedir media cara produce salidas asimétricas y raras.

### Prompt (en inglés — los modelos de imagen responden mejor)

```
Transform this portrait into a stylized anime illustration of the SAME man,
in a powered-up state. This is the same person, not a different character.

PRESERVE EXACTLY: jaw shape, eyebrow shape, nose, beard and moustache line,
hairline and natural wave direction of the hair. He must remain recognizable
as the man in the source photo.

STYLE: 1990s Japanese cel animation. Hard-edged two-tone shading, thick
confident black outlines, flat colors. No gradients, no airbrush, no 3D render.

TRANSFORMATION CUES — use exactly these and nothing more:
- Hair lifts and points upward, tips glowing amber-gold (#F59E0B), keeping his
  real hairline and wave direction
- Vertical flame-like aura flowing UPWARD behind the head, amber-gold.
  Flowing upward like fire, NOT a radial glow
- 3 to 5 thin electric filaments crackling inside the aura
- Iris shifted to turquoise with inner light, heavy upper eyelid line
- 4 to 6 small particles rising upward
- Hard specular highlight on cheekbone and jaw

DO NOT INCLUDE: orange gi, blue undershirt, wristbands, any logo, any kanji,
any text or numbers, energy sphere in hands, or the face or hair silhouette of
any existing recognizable character.

FRAMING: identical crop, scale and head position as the source image. Do not
re-pose, do not re-center, do not change the eyeline or head size.
Transparent background. Same output dimensions as input.
```

Si el modelo se resiste al fondo transparente, generar sobre fondo plano uniforme y recortar en el paso 1 otra vez.

---

## Paso 5 — Verificar la alineación (el paso que se suele saltar)

Superponer `junior-cutout.png` y `junior-alter.png` al 50 % de opacidad.

Criterio de aceptación:

- **Pupilas** coinciden dentro de ~5 px.
- **Línea de mandíbula** coincide dentro de ~10 px.
- **Ancho de cabeza** idéntico.

Si no cuadra: escalar y desplazar la ilustración, nunca la foto. Si la diferencia es estructural (el modelo recolocó la cabeza), regenerar — no intentar arreglarlo deformando.

Prueba final: aplicar `clip-path: inset(0 0 0 50%)` sobre la alter encima de la real. La costura debe caer sobre la línea media facial sin que la cara "salte".

---

## Paso 6 — Exportar

AVIF + WebP de respaldo, anchos 640 y 1024. Presupuesto total ≤ 180 KB en desktop.

Salida a `public/img/`. Los originales se quedan en `assets/source/`, fuera del build.

---

## Reparto

| Paso | Quién |
|---|---|
| 0 — original | Junior |
| 1, 2, 3 — recorte, limpieza, enderezado | Junior (herramienta de retoque, no IA) |
| 4 — ilustración | Junior, con el prompt de arriba en el modelo de imagen que elija |
| 5 — verificación de alineación | Junior entrega ambos PNG; Claude define el criterio, la comprobación visual es humana |
| 6 — exportación y pipeline | Claude / Codex (issue #7), automatizable desde `assets/source/` |

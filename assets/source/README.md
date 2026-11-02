# Assets fuente

Originales sin procesar del hero. **No se publican**: de aquí salen los derivados optimizados que terminan en `public/`.

Ver el contexto completo en [`docs/plan-hero-alter-ego-y-cv.md`](../../docs/plan-hero-alter-ego-y-cv.md) §2.6.

## Archivos esperados

| Archivo | Qué es | Estado |
|---|---|---|
| `junior-original.jpg` | Foto original de cámara/celular, sin recortar ni comprimir | ⬜ pendiente |
| `junior-cutout.png` | Recorte con fondo transparente, eje facial enderezado | ⬜ pendiente |
| `junior-alter.png` | Ilustración anime derivada del recorte, alineada al píxel | ⬜ pendiente |

## Requisitos de `junior-original.jpg`

- **El archivo tal cual sale del dispositivo.** No capturas de pantalla, no reenvíos por WhatsApp (recomprime y reduce), no exportes desde visor de imágenes.
- Idealmente ≥ 2000 px en el lado corto. La foto candidata actual (retrato frontal, buzo negro, globo al fondo) sirve de base; solo hace falta su versión original.
- Si existe, adjuntar también la foto sin el globo detrás — ahorraría trabajo de recorte alrededor del cabello, que es la parte más delicada.

## Derivación

```
junior-original.jpg
   └── recorte + rotación 1–2° (eje nariz-mentón a plomo) + rim light
          └── junior-cutout.png
                 ├── junior-alter.png   (ilustración, mismo encuadre exacto)
                 └── public/img/  (AVIF + WebP, 640w / 1024w)
```

La ilustración se genera **a partir de** `junior-cutout.png`, nunca de la foto sin procesar: así la línea de ojos y la mandíbula coinciden por construcción y la costura central del split calza sin ajustes manuales.

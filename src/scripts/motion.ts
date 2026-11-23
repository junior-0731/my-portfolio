import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { state, on } from "./state";

gsap.registerPlugin(ScrollTrigger);

export function initMotion() {
  const { reduced, finePointer } = state;

  /* ---------------- scroll suave sincronizado con GSAP ---------------- */
  let lenis: Lenis | null = null;
  if (!reduced) {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenis.on("scroll", (l: Lenis) => { state.velocity = l.velocity; ScrollTrigger.update(); });
    gsap.ticker.add((t) => lenis!.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href")!;
      const target = id.length > 1 ? document.querySelector<HTMLElement>(id) : null;
      if (!target || a.closest(".contact")) return;
      e.preventDefault();
      lenis ? lenis.scrollTo(target, { duration: 1.4 }) : target.scrollIntoView();
    }),
  );

  /* ----------------------- barra de progreso de la página ----------------------- */
  gsap.to("#progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

  /* ------------------------------ hero ------------------------------ */
  document.querySelectorAll<HTMLElement>("[data-split]").forEach((row) => {
    row.innerHTML = [...(row.textContent ?? "")].map((c) => `<span class="ch">${c}</span>`).join("");
  });
  if (!reduced) {
    gsap.from(".hero-name .ch", { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.035, delay: 0.1 });
    gsap.from("[data-hero-in]", { y: 24, opacity: 0.2, duration: 1, ease: "power3.out", stagger: 0.1, delay: 0.5 });
    // el nombre se abre hacia los lados al hacer scroll
    const st = { trigger: ".hero", start: "top top", end: "bottom top", scrub: true };
    gsap.to(".hero-name .row:first-child", { xPercent: -18, ease: "none", scrollTrigger: st });
    gsap.to(".hero-name .row:last-child", { xPercent: 18, ease: "none", scrollTrigger: st });
    // el retrato baja un poco y se apaga al salir de la portada
    gsap.to(".hero-figure img", { yPercent: 9, opacity: 0.25, ease: "none", scrollTrigger: st });
  }

  /* -------------- vistas: sección fijada, el scroll gira el modelo -------------- */
  const lis = [...document.querySelectorAll<HTMLLIElement>("#view-list li")];
  const angle = document.getElementById("angle");
  const degs = lis.map((l) => parseInt(l.querySelector(".n")?.textContent ?? "0", 10));
  const maxDeg = Math.max(...degs, 1);
  if (document.querySelector(".vistas")) ScrollTrigger.create({
    trigger: ".vistas", start: "top top", end: () => `+=${innerHeight * (reduced ? 1 : 3)}`,
    pin: true, scrub: true,
    onUpdate: (self) => {
      state.vProgress = self.progress;
      const idx = Math.min(lis.length - 1, Math.floor(self.progress * lis.length));
      lis.forEach((l, i) => l.classList.toggle("on", i === idx));
      if (angle) angle.innerHTML = `${String(Math.round(self.progress * maxDeg)).padStart(3, "0")}<sup>°</sup>`;
    },
  });

  /* ----------------- manifiesto: palabras que se encienden ----------------- */
  const litWords = () => {
    ScrollTrigger.getById("mf")?.kill();
    const ws = [...document.querySelectorAll<HTMLElement>("#manifesto .w")];
    ScrollTrigger.create({
      id: "mf", trigger: "#manifesto", start: "top 80%", end: "bottom 45%", scrub: true,
      onUpdate: (self) => { const n = Math.round(self.progress * ws.length); ws.forEach((w, i) => w.classList.toggle("lit", i < n)); },
    });
  };
  litWords();

  /* -------------------- proyectos: recorrido horizontal -------------------- */
  const mm = gsap.matchMedia();
  mm.add("(min-width: 641px)", () => {
    const track = document.getElementById("track");
    if (!track) return;
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    const tw = gsap.to(track, {
      x: () => -dist(), ease: "none",
      scrollTrigger: { trigger: ".pin-h", start: "center center", end: () => `+=${dist()}`, pin: ".work", scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
    });
    return () => tw.kill();
  });

  /* ------------------------- entradas y contadores ------------------------- */
  if (!reduced) {
    gsap.utils.toArray<HTMLElement>(".h2, [data-reveal]").forEach((el) => {
      gsap.from(el, { y: 40, opacity: 0.25, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
    });
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const o = { v: 0 };
      gsap.to(o, { v: Number(el.dataset.count), duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", once: true }, onUpdate: () => { el.textContent = String(Math.round(o.v)); } });
    });
  }

  /* ---------------- puntero: cursor, botón magnético, tarjetas 3D ---------------- */
  if (finePointer && !reduced) {
    const cur = document.querySelector<HTMLElement>(".cursor");
    if (cur) {
      const qx = gsap.quickTo(cur, "x", { duration: 0.35, ease: "power3" });
      const qy = gsap.quickTo(cur, "y", { duration: 0.35, ease: "power3" });
      addEventListener("pointermove", (e) => { cur.style.opacity = "1"; qx(e.clientX); qy(e.clientY); });
      document.addEventListener("pointerover", (e) => {
        const t = e.target as HTMLElement;
        cur.classList.toggle("big", !!t.closest("a,button,label,.card,input[type=range]"));
        cur.classList.toggle("drag", !!t.closest("#drag-surface"));
      });
    }
    const mag = document.getElementById("magnet");
    if (mag?.parentElement) {
      const mx = gsap.quickTo(mag, "x", { duration: 0.6, ease: "elastic.out(1,.4)" });
      const my = gsap.quickTo(mag, "y", { duration: 0.6, ease: "elastic.out(1,.4)" });
      mag.parentElement.addEventListener("pointermove", (e) => {
        const r = mag.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        if (Math.hypot(dx, dy) < 220) { mx(dx * 0.35); my(dy * 0.35); } else { mx(0); my(0); }
      });
      mag.parentElement.addEventListener("pointerleave", () => { mx(0); my(0); });
    }
    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
      gsap.set(card, { transformPerspective: 900 });
      const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
      const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 10);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 10);
      });
      card.addEventListener("pointerleave", () => { rx(0); ry(0); });
    });
  }

  /* ------------------- arrastrar para girar el modelo 3D ------------------- */
  const surf = document.getElementById("drag-surface");
  if (surf) {
    let down = false, lastX = 0;
    surf.addEventListener("pointerdown", (e) => { down = true; lastX = e.clientX; surf.setPointerCapture(e.pointerId); });
    surf.addEventListener("pointermove", (e) => { if (!down) return; state.dragRot += (e.clientX - lastX) * 0.012; lastX = e.clientX; });
    const up = () => { down = false; };
    surf.addEventListener("pointerup", up);
    surf.addEventListener("pointercancel", up);
  }

  on("jh:lang", () => { litWords(); ScrollTrigger.refresh(); });
  addEventListener("load", () => ScrollTrigger.refresh());
}

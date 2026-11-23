import { state } from "./state";

/* ------------------------------------------------------------ reloj */
export function initClock() {
  const el = document.getElementById("clock");
  if (!el) return;
  const fmt = new Intl.DateTimeFormat("es-CO", { timeZone: el.dataset.tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  const tick = () => (el.textContent = `${el.dataset.label} ${fmt.format(new Date())}`);
  tick();
  setInterval(tick, 1000);
}

/* ------------------------------------- arte generativo de tarjetas */
export function initCardArt() {
  document.querySelectorAll<HTMLCanvasElement>("canvas[data-art]").forEach(drawCardArt);
}
function drawCardArt(c: HTMLCanvasElement) {
  const s = Number(c.dataset.art), x = c.getContext("2d");
  if (!x) return;
  const W = c.width, H = c.height, A = "#e39a45";
  x.fillStyle = "#101214"; x.fillRect(0, 0, W, H);
  let r = s * 9301;
  const rnd = () => (r = (r * 16807) % 2147483647) / 2147483647;
  x.lineWidth = 1;
  if (s === 1) { // nodos de flujo RPA
    const pts = [...Array(7)].map((_, i) => [50 + i * 56, H / 2 + Math.sin(i * 1.3) * 50] as const);
    x.strokeStyle = "#3a4046"; x.beginPath(); pts.forEach((p, i) => (i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1]))); x.stroke();
    pts.forEach((p, i) => { x.fillStyle = i === 4 ? A : "#1c1f22"; x.strokeStyle = i === 4 ? A : "#5a6168"; x.beginPath(); x.roundRect(p[0] - 16, p[1] - 12, 32, 24, 4); x.fill(); x.stroke(); });
  } else if (s === 2) { // cuadrícula de registros
    for (let i = 0; i < 9; i++) for (let j = 0; j < 14; j++) { const on = rnd() > 0.8; x.fillStyle = on ? A : rnd() > 0.5 ? "#22262a" : "#181b1e"; x.fillRect(24 + j * 28, 30 + i * 25, 22, 17); }
  } else if (s === 3) { // barras de precios
    for (let i = 0; i < 16; i++) { const h = 40 + rnd() * 170; x.fillStyle = i === 11 ? A : "#2a2f34"; x.fillRect(28 + i * 25, H - 26 - h, 16, h); }
    x.strokeStyle = "#5a6168"; x.beginPath(); x.moveTo(20, H - 26); x.lineTo(W - 20, H - 26); x.stroke();
  } else if (s === 4) { // ventanas de código
    for (let k = 0; k < 3; k++) {
      const ox = 40 + k * 70, oy = 40 + k * 40;
      x.fillStyle = "#16191c"; x.strokeStyle = k === 2 ? A : "#3a4046"; x.beginPath(); x.roundRect(ox, oy, 230, 150, 6); x.fill(); x.stroke();
      for (let l = 0; l < 7; l++) { x.fillStyle = l % 3 === 0 && k === 2 ? A : "#2f353a"; x.fillRect(ox + 16, oy + 20 + l * 17, 40 + rnd() * 140, 6); }
    }
  } else if (s === 5) { // ondas de señal
    for (let k = 0; k < 9; k++) { x.strokeStyle = k === 4 ? A : `rgba(140,148,156,${0.15 + k * 0.05})`; x.beginPath(); x.arc(W / 2, H + 20, 40 + k * 28, Math.PI, 2 * Math.PI); x.stroke(); }
    x.fillStyle = A; x.beginPath(); x.arc(W / 2, H - 6, 7, 0, 7); x.fill();
  } else { // topografía del busto
    for (let k = 0; k < 22; k++) {
      x.strokeStyle = k % 6 === 0 ? A : "#30363b"; x.beginPath();
      for (let a = 0; a <= 64; a++) { const t = (a / 64) * Math.PI * 2, rr = 18 + k * 7 + Math.sin(t * 3 + k * 0.4) * 5; const px = W / 2 + Math.cos(t) * rr * 0.8, py = H / 2 + Math.sin(t) * rr; a ? x.lineTo(px, py) : x.moveTo(px, py); }
      x.stroke();
    }
  }
}

/* --------------------------------------------- reproductor principal */
export function initPlayer() {
  const player = document.getElementById("player");
  const vid = document.getElementById("vid") as HTMLVideoElement | null;
  if (!player || !vid) return;
  const $ = <E extends HTMLElement>(id: string) => document.getElementById(id) as E;
  const pp = $("pp"), ppi = $("ppicon"), prog = $<HTMLInputElement>("prog"), tc = $("tc"), fs = $("fs"), big = $("bigplay");
  const PLAY = '<path d="M7 4.5v15l13-7.5z"/>', PAUSE = '<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>';
  const t2s = (t: number) => { t = Math.max(0, t | 0); return `${String((t / 60) | 0).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`; };
  let userPaused = false;

  const play = () => vid.play().catch(() => {});
  const toggle = () => { if (vid.paused) { userPaused = false; play(); } else { userPaused = true; vid.pause(); } };
  /* sonido: el video arranca en silencio; el visitante decide si lo activa */
  const snd = $("snd"), sndi = $("sndicon"), unmute = $("unmute");
  const ON = '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>', OFF = '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="m22 9-6 6M16 9l6 6"/>';
  const setSound = (on: boolean) => {
    vid.muted = !on;
    player.classList.toggle("sound", on);
    snd?.setAttribute("aria-pressed", String(on));
    if (sndi) sndi.innerHTML = on ? ON : OFF;
  };
  snd?.addEventListener("click", () => setSound(vid.muted));
  unmute?.addEventListener("click", () => { setSound(true); if (vid.paused) { userPaused = false; play(); } });
  big.addEventListener("click", () => setSound(true));   // quien pulsa play quiere verlo con sonido

  /* capítulos: saltan a cada escena y marcan la actual */
  const chaps = [...document.querySelectorAll<HTMLButtonElement>(".chap")];
  const starts = chaps.map((c) => Number(c.dataset.t));
  chaps.forEach((c) => c.addEventListener("click", () => {
    vid.preload = "auto";
    const go = () => { vid.currentTime = Number(c.dataset.t) + 0.05; userPaused = false; play(); };
    if (vid.readyState >= 1) go(); else vid.addEventListener("loadedmetadata", go, { once: true });
  }));
  vid.addEventListener("timeupdate", () => {
    const t = vid.currentTime, d = vid.duration || 26;
    let k = 0; starts.forEach((s, i) => { if (t >= s) k = i; });
    chaps.forEach((c, i) => {
      c.setAttribute("aria-current", String(i === k));
      const a = starts[i]!, b = starts[i + 1] ?? d;
      c.style.setProperty("--fill", `${Math.min(100, Math.max(0, ((t - a) / (b - a)) * 100))}%`);
    });
  });

  [pp, big].forEach((b) => b.addEventListener("click", toggle));
  vid.addEventListener("click", toggle);
  vid.addEventListener("play", () => { ppi.innerHTML = PAUSE; player.classList.remove("paused"); });
  vid.addEventListener("pause", () => { ppi.innerHTML = PLAY; player.classList.add("paused"); });
  vid.addEventListener("timeupdate", () => {
    if (!vid.duration) return;
    const p = vid.currentTime / vid.duration;
    prog.value = String(p * 1000);
    prog.style.setProperty("--p", `${p * 100}%`);
    tc.textContent = `${t2s(vid.currentTime)} / ${t2s(vid.duration)}`;
  });
  prog.addEventListener("input", () => { if (vid.duration) vid.currentTime = (Number(prog.value) / 1000) * vid.duration; });
  fs.addEventListener("click", () => { (document.fullscreenElement ? document.exitFullscreen() : player.requestFullscreen()).catch(() => {}); });

  // cambio de paleta: conserva el punto de reproducción
  document.querySelectorAll<HTMLButtonElement>(".pal").forEach((b) => b.addEventListener("click", () => {
    if (b.getAttribute("aria-pressed") === "true") return;
    const t = vid.currentTime, wasPlaying = !vid.paused;
    document.querySelectorAll(".pal").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    player.style.setProperty("--accent", b.dataset.color ?? "");
    vid.poster = b.dataset.poster ?? "";
    vid.src = b.dataset.src ?? "";
    vid.addEventListener("loadedmetadata", () => { vid.currentTime = t; if (wasPlaying) play(); }, { once: true });
  }));

  // reproduce en silencio al entrar en pantalla y pausa al salir
  if (!state.reduced) {
    new IntersectionObserver(([e]) => {
      if (!e) return;
      if (e.isIntersecting && !userPaused) { vid.preload = "auto"; play(); }
      else if (!e.isIntersecting) vid.pause();
    }, { threshold: 0.45 }).observe(player);
  }
}

/* ---------------------------------------- embeds ligeros (click-to-load) */
export function initLiteEmbeds() {
  document.querySelectorAll<HTMLElement>(".frame").forEach((f) => {
    const btn = f.querySelector(".lite");
    if (!btn) return;
    btn.addEventListener("click", () => {
      if (f.dataset.embed) {
        const ifr = document.createElement("iframe");
        ifr.src = f.dataset.embed;
        ifr.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
        ifr.allowFullscreen = true;
        ifr.title = btn.getAttribute("aria-label") ?? "video";
        f.replaceChildren(ifr);
      } else if (f.dataset.file) {
        const v = document.createElement("video");
        Object.assign(v, { src: f.dataset.file, controls: true, autoplay: true, playsInline: true });
        f.replaceChildren(v);
      }
    });
  });
}

/* --------------------------------------------------------- contacto */
export { initContact } from "./contact";

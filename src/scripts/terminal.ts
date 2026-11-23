import { state } from "./state";

type L = "es" | "en";
type Out = { html: string; cls?: string };
type Ctx = { el: HTMLElement; d: DOMStringMap; lang: L };
type Cmd = { names: [string, string]; hidden?: boolean; desc?: { es: string; en: string }; run: (c: Ctx) => Out[] | Promise<Out[]> | void | Promise<void> };

const esc = (s: string) => s.replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[m]!);
const tr = (lang: L, es: string, en: string) => (lang === "es" ? es : en);
const wait = (ms: number) => new Promise((r) => setTimeout(r, state.reduced ? 0 : ms));

const cmds: Cmd[] = [
  { names: ["ayuda", "help"], desc: { es: "lista de comandos", en: "list of commands" }, run: ({ lang }) => [
    { html: tr(lang, "Comandos disponibles:", "Available commands:"), cls: "acc" },
    ...cmds.filter((c) => !c.hidden).map((c) => ({ html: `  <b class="acc">${c.names[lang === "es" ? 0 : 1].padEnd(10)}</b> <span class="dim">${c.desc![lang]}</span>` })),
    { html: tr(lang, "Tip: usa ↑ ↓ para el historial y Tab para autocompletar.", "Tip: use ↑ ↓ for history and Tab to autocomplete."), cls: "dim" },
  ] },
  { names: ["sobre-mi", "about"], desc: { es: "quién soy", en: "who I am" }, run: ({ lang }) => [
    { html: "Junior Herrera · Power Platform & Full-Stack Developer", cls: "acc" },
    { html: tr(lang,
      "Vivo en Medellín. Automatizo procesos de negocio y construyo aplicaciones web.\nEstudio Ingeniería de Software y me gradúo en 2027.",
      "Based in Medellín. I automate business processes and build web applications.\nSoftware Engineering student, graduating in 2027.") },
  ] },
  { names: ["stack", "stack"], desc: { es: "tecnologías que uso", en: "tech I use" }, run: ({ lang }) => [
    { html: `<span class="acc">${tr(lang, "automatización", "automation")}</span>  Power Apps · Power Automate · PAD · SharePoint · Dataverse` },
    { html: `<span class="acc">frontend</span>        React · Angular · TypeScript · Astro` },
    { html: `<span class="acc">backend</span>         .NET · Python (Django, FastAPI) · Node.js` },
    { html: `<span class="acc">${tr(lang, "datos", "data")}</span>           SQL Server · PostgreSQL · MySQL` },
    { html: `<span class="acc">${tr(lang, "herramientas", "tools")}</span>    Git · Docker · Claude Code · Cursor` },
  ] },
  { names: ["proyectos", "projects"], desc: { es: "ir a mis proyectos", en: "jump to my projects" }, run: ({ lang }) => {
    setTimeout(() => document.getElementById("proyectos")?.scrollIntoView({ behavior: state.reduced ? "auto" : "smooth" }), 500);
    return [{ html: tr(lang, "Llevándote a los proyectos…", "Taking you to the projects…"), cls: "ok" }];
  } },
  { names: ["cv", "cv"], desc: { es: "ir a mi hoja de vida", en: "jump to my résumé" }, run: ({ lang }) => {
    setTimeout(() => document.getElementById("cv")?.scrollIntoView({ behavior: state.reduced ? "auto" : "smooth" }), 500);
    return [{ html: tr(lang, "Abriendo la hoja de vida…", "Opening the résumé…"), cls: "ok" }];
  } },
  { names: ["contacto", "contact"], desc: { es: "cómo escribirme", en: "how to reach me" }, run: ({ d, lang }) => [
    { html: tr(lang, "¿Hablamos? Elige el canal:", "Let's talk. Pick a channel:"), cls: "acc" },
    { html: `  WhatsApp  <a href="${esc(lang === "es" ? d.waEs! : d.waEn!)}" target="_blank" rel="noopener">${tr(lang, "abrir chat", "open chat")} ↗</a>` },
    { html: `  ${tr(lang, "correo", "email")}    <a href="mailto:${esc(d.email!)}">${esc(d.email!)}</a>` },
    { html: `  LinkedIn  <a href="${esc(d.linkedin!)}" target="_blank" rel="noopener">herrerajdev ↗</a>` },
    { html: `  GitHub    <a href="${esc(d.github!)}" target="_blank" rel="noopener">junior-0731 ↗</a>` },
  ] },
  { names: ["cafe", "coffee"], desc: { es: "recargar energía", en: "recharge" }, run: async ({ el, lang }) => {
    print(el, [{ html: "   ( (\n    ) )\n  ........\n  |      |]\n  \\      /\n   `----'", cls: "acc" }]);
    const bar = document.createElement("div");
    bar.className = "ln";
    el.appendChild(bar);
    for (let p = 0; p <= 100; p += 10) {
      bar.textContent = `${tr(lang, "cargando café", "brewing")} [${"█".repeat(p / 10)}${"░".repeat(10 - p / 10)}] ${p}%`;
      scroll(el);
      await wait(110);
    }
    print(el, [{ html: tr(lang, "Listo. Ahora baja hasta el final y llena tu taza de verdad ☕", "Done. Now scroll to the end and fill your real cup ☕"), cls: "ok" }]);
  } },
  { names: ["matrix", "matrix"], desc: { es: "sigue al conejo blanco", en: "follow the white rabbit" }, run: async ({ el, lang }) => {
    if (state.reduced) return [{ html: tr(lang, "Despierta, Neo… (animación desactivada por movimiento reducido)", "Wake up, Neo… (animation off for reduced motion)"), cls: "ok" }];
    const cv = document.createElement("canvas");
    const box = el.getBoundingClientRect();
    cv.width = box.width; cv.height = el.scrollHeight;
    cv.style.top = "0"; cv.style.height = `${el.scrollHeight}px`;
    el.appendChild(cv);
    const g = cv.getContext("2d")!;
    const fs = 14, cols = Math.ceil(cv.width / fs), drops = Array.from({ length: cols }, () => Math.random() * -20);
    const chars = "アイウエオカキクケコサシスセソ01JUNIOR<>{}=";
    const t0 = performance.now();
    await new Promise<void>((done) => {
      const frame = (t: number) => {
        g.fillStyle = "rgba(11,12,13,.18)"; g.fillRect(0, 0, cv.width, cv.height);
        g.fillStyle = "#3ddc84"; g.font = `${fs}px monospace`;
        drops.forEach((y, i) => {
          g.fillText(chars[Math.floor(Math.random() * chars.length)]!, i * fs, y * fs);
          drops[i] = y * fs > cv.height && Math.random() > .96 ? 0 : y + 1;
        });
        if (t - t0 < 2600) requestAnimationFrame(frame); else done();
      };
      requestAnimationFrame(frame);
    });
    cv.remove();
    return [{ html: tr(lang, "Despierta, Neo… el portafolio te tiene.", "Wake up, Neo… the portfolio has you."), cls: "ok" }];
  } },
  { names: ["hola", "hello"], desc: { es: "saludar", en: "say hi" }, run: ({ lang }) => [
    { html: tr(lang, "¡Hola! 👋 Gracias por pasar. Escribe 'contacto' si quieres que trabajemos juntos.", "Hi! 👋 Thanks for stopping by. Type 'contact' if you'd like to work together.") },
  ] },
  { names: ["fecha", "date"], desc: { es: "fecha y hora", en: "date and time" }, run: ({ lang }) => [
    { html: new Date().toLocaleString(lang === "es" ? "es-CO" : "en-US", { dateStyle: "full", timeStyle: "short" }) },
  ] },
  { names: ["limpiar", "clear"], desc: { es: "limpiar la pantalla", en: "clear the screen" }, run: ({ el }) => { el.innerHTML = ""; } },
  { names: ["sudo", "sudo"], hidden: true, run: ({ lang }) => [{ html: tr(lang, "Permiso denegado. Buen intento 😄", "Permission denied. Nice try 😄"), cls: "err" }] },
  { names: ["exit", "exit"], hidden: true, run: ({ lang }) => [{ html: tr(lang, "No hay salida… mejor escríbeme: 'contacto'.", "There's no way out… better reach me: 'contact'."), cls: "dim" }] },
];

function scroll(el: HTMLElement) { el.scrollTop = el.scrollHeight; }
function print(el: HTMLElement, lines: Out[]) {
  for (const l of lines) {
    const div = document.createElement("div");
    div.className = `ln${l.cls ? " " + l.cls : ""}`;
    div.innerHTML = l.html;
    el.appendChild(div);
  }
  scroll(el);
}
const find = (q: string) => cmds.find((c) => c.names.includes(q));
const allNames = () => [...new Set(cmds.filter((c) => !c.hidden).flatMap((c) => c.names))];

export function initTerminal() {
  const term = document.getElementById("term");
  const out = document.getElementById("term-out");
  const form = document.getElementById("term-form") as HTMLFormElement | null;
  const input = document.getElementById("term-input") as HTMLInputElement | null;
  if (!term || !out || !form || !input) return;
  const hist: string[] = [];
  let hi = 0, busy = false, greeted = false;

  const greet = async () => {
    if (greeted) return;
    greeted = true;
    const lang = state.lang as L;
    const msg = tr(lang, "Bienvenido 👋  Escribe 'ayuda' o toca un comando de abajo.", "Welcome 👋  Type 'help' or tap a command below.");
    const div = document.createElement("div");
    div.className = "ln acc";
    out.appendChild(div);
    for (let i = 1; i <= msg.length; i++) { div.textContent = msg.slice(0, i); await wait(18); }
  };
  new IntersectionObserver((es, io) => { if (es.some((e) => e.isIntersecting)) { greet(); io.disconnect(); } }, { threshold: .4 }).observe(term);

  const exec = async (raw: string) => {
    const q = raw.trim().toLowerCase();
    if (!q || busy) return;
    const lang = state.lang as L;
    hist.push(q); hi = hist.length;
    print(out, [{ html: `<b>$</b> ${esc(q)}`, cls: "cmd" }]);
    const c = find(q);
    if (!c) { print(out, [{ html: tr(lang, `Comando no encontrado: ${esc(q)}. Escribe 'ayuda'.`, `Command not found: ${esc(q)}. Type 'help'.`), cls: "err" }]); return; }
    busy = true;
    try {
      const r = await c.run({ el: out, d: term.dataset, lang });
      if (r) print(out, r);
    } finally { busy = false; }
  };

  form.addEventListener("submit", (e) => { e.preventDefault(); const v = input.value; input.value = ""; exec(v); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && hist.length) { e.preventDefault(); hi = Math.max(0, hi - 1); input.value = hist[hi]!; }
    else if (e.key === "ArrowDown" && hist.length) { e.preventDefault(); hi = Math.min(hist.length, hi + 1); input.value = hist[hi] ?? ""; }
    else if (e.key === "Tab") {
      const v = input.value.trim().toLowerCase();
      const m = v && allNames().filter((n) => n.startsWith(v));
      if (m && m.length) { e.preventDefault(); input.value = m[0]!; }
    }
  });
  term.querySelectorAll<HTMLButtonElement>(".chip").forEach((b) =>
    b.addEventListener("click", () => exec((state.lang === "es" ? b.dataset.cmdEs : b.dataset.cmdEn) ?? "")),
  );
  out.addEventListener("click", (e) => { if (!(e.target as HTMLElement).closest("a")) input.focus({ preventScroll: true }); });
}

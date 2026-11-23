import { state } from "./state";

/** Taza de café que se llena con el scroll; al llenarse invita a escribir. */
export function initCoffee() {
  const root = document.getElementById("coffee");
  const liquid = document.getElementById("coffee-liquid");
  const pct = document.getElementById("coffee-pct");
  const bubble = document.getElementById("coffee-bubble");
  const cup = document.getElementById("coffee-cup");
  const go = document.getElementById("coffee-go") as HTMLAnchorElement | null;
  if (!root || !liquid || !pct || !bubble || !cup) return;

  const seen = () => { try { return sessionStorage.getItem("coffee-done") === "1"; } catch { return false; } };
  const mark = () => { try { sessionStorage.setItem("coffee-done", "1"); } catch { /* sin almacenamiento */ } };

  let max = 0, full = false, raf = 0;
  const setHref = () => { if (go) go.href = (state.lang === "en" ? root.dataset.waEn : root.dataset.waEs) ?? go.href; };

  const openBubble = () => { setHref(); bubble.hidden = false; };
  const closeBubble = () => { bubble.hidden = true; mark(); };

  const update = () => {
    raf = 0;
    const h = document.documentElement.scrollHeight - innerHeight;
    const p = h > 0 ? Math.min(1, Math.max(0, scrollY / h)) : 0;
    root.classList.toggle("on", p > 0.04 || full);
    if (p <= max) return;
    max = p;
    // la taza no se vacía al subir: guarda el máximo alcanzado
    liquid.style.transform = `translateY(${56 - max * 32}px)`;
    pct.textContent = `${Math.round(max * 100)}%`;
    if (!full && max >= 0.985) {
      full = true;
      root.classList.add("full", "pop");
      setTimeout(() => root.classList.remove("pop"), 700);
      if (!seen()) openBubble();
    }
  };
  addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  addEventListener("resize", () => { if (!raf) raf = requestAnimationFrame(update); });
  update();

  cup.addEventListener("click", () => {
    if (full) { if (bubble.hidden) openBubble(); else closeBubble(); }
    else document.getElementById("contacto")?.scrollIntoView({ behavior: state.reduced ? "auto" : "smooth" });
  });
  document.getElementById("coffee-x")?.addEventListener("click", closeBubble);
  document.getElementById("coffee-later")?.addEventListener("click", closeBubble);
  go?.addEventListener("click", mark);
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !bubble.hidden) closeBubble(); });
}

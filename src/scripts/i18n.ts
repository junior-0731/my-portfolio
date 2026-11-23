import type { Lang } from "@/data/portfolio";
import { state, emit } from "./state";

/** Convierte "texto con *énfasis*" en palabras animables. */
function renderWords(el: HTMLElement, text: string) {
  el.innerHTML = text
    .split(" ")
    .map((w) => {
      const acc = /^\*.*\*[.,]?$/.test(w);
      return `<span class="w${acc ? " acc" : ""}">${w.replace(/\*/g, "")}</span>`;
    })
    .join(" ");
}

export function applyLang(lang: Lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
  document.querySelectorAll<HTMLElement>("[data-es]").forEach((el) => {
    const v = el.dataset[lang];
    if (v == null) return;
    if (el.hasAttribute("data-html")) el.innerHTML = v;
    else el.textContent = v;
  });
  document.querySelectorAll<HTMLElement>("[data-words-es]").forEach((el) => {
    renderWords(el, (lang === "en" ? el.dataset.wordsEn : el.dataset.wordsEs) ?? "");
  });
  document.querySelectorAll<HTMLButtonElement>(".lang button").forEach((b) =>
    b.setAttribute("aria-pressed", String(b.dataset.lang === lang)),
  );
  emit("jh:lang", lang);
}

export function initI18n() {
  const saved = document.documentElement.dataset.lang === "en" ? "en" : "es";
  applyLang(saved);
  document.querySelectorAll<HTMLButtonElement>(".lang button").forEach((b) =>
    b.addEventListener("click", () => {
      const l = b.dataset.lang === "en" ? "en" : "es";
      try { localStorage.setItem("jh-lang", l); } catch { /* modo privado */ }
      applyLang(l);
    }),
  );
}

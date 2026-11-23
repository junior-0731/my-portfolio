import { state } from "./state";

/** Personas con las que construyo: entrada al llegar a la sección y luz que sigue al cursor. */
export function initTeam() {
  const grid = document.querySelector<HTMLElement>(".people");
  if (!grid) return;
  if (state.reduced || !("IntersectionObserver" in window)) grid.classList.add("in");
  else {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { grid.classList.add("in"); io.disconnect(); } }), { threshold: 0.2 });
    io.observe(grid);
  }
  if (!state.finePointer || state.reduced) return;
  grid.querySelectorAll<HTMLElement>(".person").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty("--my", `${((e.clientY - r.top) / r.width) * 100}%`);
    });
  });
}

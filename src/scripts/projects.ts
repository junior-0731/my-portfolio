

/** Diálogos con el detalle de cada caso. */
export function initProjects() {
  /* ---------------- diálogos de casos ---------------- */
  document.querySelectorAll<HTMLButtonElement>("[data-case]").forEach((b) =>
    b.addEventListener("click", () => {
      const d = document.getElementById(`case-${b.dataset.case}`) as HTMLDialogElement | null;
      if (!d) return;
      if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
    }),
  );
  document.querySelectorAll<HTMLDialogElement>(".case-dlg").forEach((d) => {
    const close = () => (typeof d.close === "function" ? d.close() : d.removeAttribute("open"));
    d.querySelectorAll("[data-close-dlg]").forEach((x) => x.addEventListener("click", close));
    d.addEventListener("click", (e) => { if (e.target === d) close(); });
  });
}

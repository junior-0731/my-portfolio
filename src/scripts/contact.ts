import { state, on } from "./state";

/** Contacto: copiar el correo y mensaje de WhatsApp en el idioma activo. */
export function initContact() {
  const wa = document.getElementById("magnet") as HTMLAnchorElement | null;
  const syncWa = () => { if (wa) wa.href = (state.lang === "en" ? wa.dataset.hrefEn : wa.dataset.hrefEs) ?? wa.href; };
  syncWa(); on("jh:lang", syncWa);

  document.querySelectorAll<HTMLButtonElement>("button.copy[data-email]").forEach((b) => {
    const lbl = b.querySelector<HTMLElement>(".lbl");
    let timer = 0;
    b.addEventListener("click", async () => {
      const mail = b.dataset.email ?? "";
      try { await navigator.clipboard.writeText(mail); }
      catch {
        const ta = document.createElement("textarea"); ta.value = mail; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
      }
      if (!lbl) return;
      const back = { es: lbl.dataset.es ?? "", en: lbl.dataset.en ?? "" };
      lbl.textContent = (state.lang === "en" ? lbl.dataset.doneEn : lbl.dataset.doneEs) ?? "";
      b.classList.add("done");
      clearTimeout(timer);
      timer = window.setTimeout(() => { lbl.textContent = back[state.lang]; b.classList.remove("done"); }, 2200);
    });
  });
}

/**
 * Casos de proyecto, demo de automatización, trayectoria, hojas de vida y equipo.
 * Todo lo visible tiene versión { es, en }. Edita aquí sin tocar los componentes.
 */
import type { T } from "./portfolio";

/* ------------------------------------------------------------------ */
/* Lo que construyo (descrito en general, sin datos de ningún cliente)  */
/* ------------------------------------------------------------------ */
export type Caso = { id: string; kind: T; title: T; summary: T; points: { es: string[]; en: string[] }; stack: string[] };

export const casos: Caso[] = [
  {
    id: "procesos",
    kind: { es: "Power Platform", en: "Power Platform" },
    title: { es: "Automatización de procesos de negocio", en: "Business process automation" },
    summary: {
      es: "Apps y flujos que coordinan el trabajo entre áreas y se conectan con otros sistemas: menos tareas manuales, menos errores y cada paso con trazabilidad.",
      en: "Apps and flows that coordinate work across teams and connect to other systems: fewer manual tasks, fewer errors and every step traceable.",
    },
    points: {
      es: ["Apps en Power Apps y flujos en Power Automate.", "Integración con otros sistemas mediante APIs REST.", "Entornos de desarrollo y despliegues ordenados (ALM)."],
      en: ["Power Apps apps and Power Automate flows.", "Integration with other systems through REST APIs.", "Development environments and orderly deployments (ALM)."],
    },
    stack: ["Power Apps", "Power Automate", "SharePoint", "API REST"],
  },
  {
    id: "rpa",
    kind: { es: "RPA", en: "RPA" },
    title: { es: "Bots de automatización de escritorio", en: "Desktop automation bots" },
    summary: {
      es: "Bots que hacen por las personas las tareas repetitivas, con manejo de errores y registro de cada ejecución.",
      en: "Bots that take repetitive tasks off people's hands, with error handling and a log of every run.",
    },
    points: { es: [], en: [] },
    stack: ["Power Automate Desktop", "RPA"],
  },
  {
    id: "web",
    kind: { es: "Web", en: "Web" },
    title: { es: "Aplicaciones web a medida", en: "Custom web applications" },
    summary: {
      es: "Llevo procesos que viven en hojas de cálculo a aplicaciones web, comprobando que los resultados coincidan con los originales.",
      en: "I move processes that live in spreadsheets into web applications, checking that the results match the originals.",
    },
    points: { es: [], en: [] },
    stack: [".NET", "Angular", "React", "SQL Server"],
  },
];

/* ------------------------------------------------------------------ */
/* Otros proyectos                                                     */
/* ------------------------------------------------------------------ */
export const otros: { title: string | T; kind: T; desc: T; tags: string[]; href?: string }[] = [
  { title: "Learning Zone", kind: { es: "Full-stack · SENA", en: "Full-stack · SENA" },
    desc: { es: "Plataforma de aprendizaje con frontend en React y servicios en FastAPI y Express, construida en equipo.", en: "Learning platform with a React frontend and FastAPI and Express services, built as a team." },
    tags: ["React", "TypeScript", "FastAPI", "Docker", "MySQL"] },
  { title: "Compuerta", kind: { es: "IoT · en desarrollo", en: "IoT · in progress" },
    desc: { es: "Proyecto personal en desarrollo: automatización con microcontroladores para el control remoto de dispositivos.", en: "Personal project in progress: microcontroller automation for remote device control." },
    tags: ["IoT", "Hardware"] },
];

/* ------------------------------------------------------------------ */
/* Trayectoria                                                         */
/* ------------------------------------------------------------------ */
export const experiencia: { when: T; role: T; org: string; desc: T }[] = [
  { when: { es: "Nov 2026 — hoy", en: "Nov 2026 — now" }, role: { es: "Junior Engineer", en: "Junior Engineer" }, org: "NTT DATA",
    desc: { es: "Desarrollo y migración de automatizaciones RPA con Power Automate Desktop.", en: "Building and migrating RPA automations with Power Automate Desktop." } },
  { when: { es: "Mar — Oct 2026", en: "Mar — Oct 2026" }, role: { es: "Auxiliar de Desarrollo", en: "Development Assistant" }, org: "SOCODA S.A.S.",
    desc: { es: "Soporte técnico, mantenimiento de aplicaciones .NET y Angular, y desarrollo de automatizaciones con Power Platform.", en: "Technical support, maintenance of .NET and Angular apps, and building automations with Power Platform." } },
];
export const formacion: { when: T; title: T; org: string; desc: T }[] = [
  { when: { es: "En curso · 2027", en: "In progress · 2027" }, title: { es: "Ingeniería de Software", en: "Software Engineering" }, org: "Corporación Universitaria Iberoamericana",
    desc: { es: "Modalidad virtual, sexto semestre. Graduación prevista en 2027.", en: "Online program, sixth semester. Expected graduation in 2027." } },
  { when: { es: "Tecnólogo", en: "Technologist" }, title: { es: "Análisis y Desarrollo de Software", en: "Software Analysis and Development" }, org: "SENA",
    desc: { es: "Base en desarrollo web, bases de datos y metodologías ágiles.", en: "Grounding in web development, databases and agile methods." } },
];

/* ------------------------------------------------------------------ */
/* Hojas de vida                                                       */
/* ------------------------------------------------------------------ */
export const cvs: { id: string; title: T; tag: T; desc: T; thumb: string; files: { label: string; href: string }[] }[] = [
  { id: "ats", title: { es: "Formato ATS", en: "ATS format" }, tag: { es: "Estándar EE. UU.", en: "US standard" },
    desc: { es: "Una columna, sin diseño ni foto, una página. Lo leen sin problema los filtros automáticos de las empresas.", en: "Single column, no design or photo, one page. Applicant tracking systems read it without trouble." },
    thumb: "/cv/cv-ats.webp",
    files: [{ label: "PDF · Español", href: "/cv/Junior_Herrera_CV_ATS_ES.pdf" }, { label: "PDF · English", href: "/cv/Junior_Herrera_Resume_ATS_EN.pdf" }] },
  { id: "diseno", title: { es: "Con diseño", en: "Designed" }, tag: { es: "Para enviar a una persona", en: "To send to a person" },
    desc: { es: "La misma información con la identidad visual de este sitio, pensada para leerse en pantalla o impresa.", en: "The same information with this site's visual identity, made to read on screen or in print." },
    thumb: "/cv/cv-dis.webp",
    files: [{ label: "PDF · Español", href: "/cv/Junior_Herrera_CV_ES.pdf" }, { label: "PDF · English", href: "/cv/Junior_Herrera_Resume_EN.pdf" }] },
];

/* ------------------------------------------------------------------ */
/* Personas con las que construyo                                      */
/* ------------------------------------------------------------------ */
export const equipo: { name: string; role: T; project: T; href: string; photo: string; accent: string; fx: "scan" | "halo" | "dots" }[] = [
  { name: "Camilo Andrés Ospina", role: { es: "Backend Developer", en: "Backend Developer" },
    project: { es: "Construimos Learning Zone en el SENA.", en: "We built Learning Zone together at SENA." },
    href: "https://www.linkedin.com/in/camilo-andres-ospina-villa-tech-backend-software-developer/", photo: "/img/equipo/camilo", accent: "#5cc8ff", fx: "scan" },
  { name: "Edier Andrés Guerra", role: { es: "Full-Stack Developer", en: "Full-Stack Developer" },
    project: { es: "Construimos Learning Zone en el SENA.", en: "We built Learning Zone together at SENA." },
    href: "https://www.linkedin.com/in/edier-guerra-404094335/", photo: "/img/equipo/edier", accent: "#ff7a59", fx: "halo" },
  { name: "Charif Tatiana Giraldo", role: { es: "Full-Stack Developer", en: "Full-Stack Developer" },
    project: { es: "Construimos Learning Zone en el SENA.", en: "We built Learning Zone together at SENA." },
    href: "https://www.linkedin.com/in/charif-tatiana-giraldo-aroca-1a9a1328b/", photo: "/img/equipo/charif", accent: "#b98cff", fx: "dots" },
];

/* ------------------------------------------------------------------ */
/* Contacto                                                            */
/* ------------------------------------------------------------------ */
export const whatsapp = {
  number: "573112207252",
  text: { es: "Hola Junior, vi tu portafolio y me gustaría hablar contigo.", en: "Hi Junior, I saw your portfolio and I'd like to talk." },
};

/* ------------------------------------------------------------------ */
/* Textos de interfaz nuevos                                           */
/* ------------------------------------------------------------------ */
export const ui2 = {
  heroP: { es: "Desarrollo automatizaciones y aplicaciones que conectan procesos de negocio.", en: "I build automations and applications that connect business processes." },
  heroCta: { es: "Ver proyectos", en: "See projects" },
  heroCv: { es: "Hoja de vida", en: "Résumé" },
  wP: { es: "Los tipos de proyecto en los que trabajo, más algunos proyectos propios.", en: "The kinds of projects I work on, plus a few of my own." },
  playTitle: { es: "Un minuto de <em>pausa</em>", en: "A one-minute <em>break</em>" },
  playP: { es: "Una terminal de verdad: escribe un comando o toca uno de los botones. Hay alguna sorpresa escondida.", en: "A real terminal: type a command or tap one of the buttons. There may be a hidden surprise or two." },
  available: { es: "Disponible para colaborar", en: "Open to collaborate" },
  featured: { es: "Caso principal", en: "Featured case" },
  readCase: { es: "Ver caso completo", en: "Read full case" },
  context: { es: "Contexto", en: "Context" },
  challenge: { es: "El reto", en: "The challenge" },
  contribution: { es: "Mi aporte", en: "What I did" },
  decision: { es: "Decisión técnica", en: "Technical decision" },
  others: { es: "Otros proyectos", en: "Other projects" },
  close: { es: "Cerrar", en: "Close" },
  pExp: { es: "Experiencia", en: "Experience" },
  pEdu: { es: "Formación", en: "Education" },
  cvEyebrow: { es: "05 — Hoja de vida", en: "05 — Résumé" },
  cvTitle: { es: "Hoja de<br><em>vida</em>", en: "My<br><em>résumé</em>" },
  cvP: { es: "Dos versiones con la misma información: una para los filtros automáticos y otra para leer con calma.", en: "Two versions with the same information: one for automated filters and one to read at leisure." },
  tmEyebrow: { es: "06 — Colaboraciones", en: "06 — Collaborations" },
  tmTitle: { es: "Personas con las que he <em>colaborado</em>", en: "People I've <em>collaborated</em> with" },
  tmP: { es: "He compartido proyectos con personas que aportan distintas ideas y habilidades. Conoce a quienes han construido conmigo y explora su trabajo.", en: "I've shared projects with people who bring different ideas and skills. Meet the people who've built with me and explore their work." },
  tmCta: { es: "Ver portafolio", en: "View portfolio" },
  waBtn: { es: "WhatsApp", en: "WhatsApp" },
  copyMail: { es: "Copiar correo", en: "Copy email" },
  copied: { es: "Correo copiado", en: "Email copied" },
};

/** Texto fijo o bilingüe → bilingüe. */
export const tt = (v: string | T): T => (typeof v === "string" ? { es: v, en: v } : v);

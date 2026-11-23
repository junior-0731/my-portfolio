/**
 * Todo el contenido del portafolio vive aquí.
 * Edita textos, proyectos y videos sin tocar los componentes.
 * Cada texto visible tiene versión { es, en }.
 */

export type Lang = "es" | "en";
export type T = Record<Lang, string>;

/* ------------------------------------------------------------------ */
/* Identidad                                                           */
/* ------------------------------------------------------------------ */
export const site = {
  name: "Junior Herrera",
  initials: "JH",
  title: "Junior Herrera · Power Platform & Full-Stack Developer",
  description: {
    es: "Power Platform & Full-Stack Developer. Automatizaciones y aplicaciones que conectan procesos de negocio.",
    en: "Power Platform & Full-Stack Developer. Automations and applications that connect business processes.",
  },
  role: "Power Platform & Full-Stack Developer",
  location: "Medellín, Colombia",
  coords: "6.17° N 75.61° W",
  timezone: "America/Bogota",
  clockLabel: "MDE",
  now: "",
  available: true,
  /** Rellena estos enlaces y el botón de contacto empezará a funcionar. */
  contact: {
    email: "herrerajunior715@gmail.com",
    linkedin: "https://www.linkedin.com/in/herrerajdev/",
    github: "https://github.com/junior-0731",
  },
};


export type MaterialMode = "render" | "wire" | "xray" | "points";

/* ------------------------------------------------------------------ */
/* Manifiesto y cifras                                                 */
/* ------------------------------------------------------------------ */
/** Las palabras entre *asteriscos* se iluminan en ámbar. */
export const manifesto: T = {
  es: "Construyo software que *automatiza* el trabajo repetitivo y hace *visible* lo complejo.",
  en: "I build software that *automates* repetitive work and makes complex things *visible*.",
};

export const facts: { value: string; count?: number; t: T }[] = [
  { value: "3", count: 3, t: { es: "frentes: Power Platform, desarrollo web y RPA", en: "fronts: Power Platform, web development and RPA" } },
  { value: "15+", t: { es: "tecnologías con las que he trabajado", en: "technologies I've worked with" } },
  { value: "2027", t: { es: "graduación como ingeniero de software", en: "graduating as a software engineer" } },
];

/* ------------------------------------------------------------------ */
/* Proyectos                                                           */
/* ------------------------------------------------------------------ */
export type Project = {
  year: string;
  kind: T;
  title: T;
  desc: T;
  tags: string[];
  /** Arte generativo de la tarjeta (1-6). Se ignora si pones `image`. */
  art: 1 | 2 | 3 | 4 | 5 | 6;
  /** Opcional: imagen en /public (ej. "/projects/cotizador.webp"). */
  image?: string;
  /** Opcional: enlace al demo o repo. */
  href?: string;
};

export const projects: Project[] = [
  { year: "2026", kind: { es: "RPA", en: "RPA" }, title: { es: "Migración a Power Automate Desktop", en: "Power Automate Desktop migration" },
    desc: { es: "Bots RPA reconstruidos en PAD con manejo de errores y trazabilidad.", en: "RPA bots rebuilt in PAD with error handling and traceability." },
    tags: ["PAD", "Power Automate", "RPA"], art: 1 },
  { year: "2026", kind: { es: "Power Platform", en: "Power Platform" }, title: { es: "Proceso entre áreas + ERP", en: "Cross-team process + ERP" },
    desc: { es: "App canvas con flujos y SharePoint que coordina un proceso entre áreas y lo integra con un ERP.", en: "Canvas app with flows and SharePoint that coordinates a cross-team process and syncs it to an ERP." },
    tags: ["Power Apps", "Power Automate", "SharePoint", "ERP"], art: 2 },
  { year: "2026", kind: { es: "Web", en: "Web" }, title: { es: "Cotizador", en: "Quote Builder" },
    desc: { es: "Aplicación para crear y consultar cotizaciones con reglas de precios trazables.", en: "App to create and look up quotes with traceable pricing rules." },
    tags: [".NET", "Angular", "SQL Server"], art: 3 },
  { year: "2025", kind: { es: "Full-stack", en: "Full-stack" }, title: { es: "Learning Zone", en: "Learning Zone" },
    desc: { es: "Plataforma de aprendizaje con frontend en React y servicios en FastAPI y Express.", en: "Learning platform with a React frontend and FastAPI and Express services." },
    tags: ["React", "TypeScript", "FastAPI", "Docker", "MySQL"], art: 4 },
  { year: "2026", kind: { es: "IoT", en: "IoT" }, title: { es: "Compuerta", en: "Compuerta" },
    desc: { es: "Dispensador automático de comida y compuerta de agua con ESP32 y control remoto.", en: "Automatic feeder and water gate built on ESP32 with remote control." },
    tags: ["ESP32", "C++", "IoT"], art: 5 },
];

/* ------------------------------------------------------------------ */
/* Videos                                                              */
/* ------------------------------------------------------------------ */
/** Video principal: versiones del intro (HyperFrames) en tres paletas. */
export const featuredVideo = {
  title: { es: "Intro · Junior Herrera", en: "Intro · Junior Herrera" } as T,
  variants: [
    { id: "intro", label: { es: "Intro", en: "Intro" } as T, color: "#e39a45", src: "/videos/junior-herrera-intro.mp4", poster: "/videos/poster-intro.jpg" },
  ],
};

/**
 * Videos adicionales. Tipos:
 *  - { type: "youtube", id: "dQw4w9WgXcQ" }
 *  - { type: "vimeo",   id: "76979871" }
 *  - { type: "file",    src: "/videos/demo.mp4", poster?: "/videos/demo.jpg" }
 * Deja `source` en null para mostrar el espacio como "próximamente".
 * ratio: "16/9" horizontal o "9/16" vertical (reels).
 */
export type VideoSource =
  | { type: "youtube"; id: string }
  | { type: "vimeo"; id: string }
  | { type: "file"; src: string; poster?: string };

export const videos: { title: T; meta: T; ratio: "16/9" | "9/16"; source: VideoSource | null }[] = [
  { title: { es: "Demo de un flujo RPA", en: "RPA flow demo" }, meta: { es: "Reel vertical · 30 s", en: "Vertical reel · 30 s" }, ratio: "9/16", source: null },
  { title: { es: "Recorrido por una app", en: "App walkthrough" }, meta: { es: "Reel vertical · 45 s", en: "Vertical reel · 45 s" }, ratio: "9/16", source: null },
];

/* ------------------------------------------------------------------ */
/* Stack y trayectoria                                                 */
/* ------------------------------------------------------------------ */
export const stack = ["Power Apps", "Power Automate", "PAD", "SharePoint", "Dataverse", "Python", "Django", "FastAPI", "React", "Angular", "TypeScript", ".NET", "Node.js", "PostgreSQL", "SQL Server", "Docker"];

export const timeline: { year: string; title: T; org: T; desc: T }[] = [
  { year: "2026 —", title: { es: "Junior Engineer", en: "Junior Engineer" }, org: { es: "NTT DATA", en: "NTT DATA" },
    desc: { es: "Desarrollo y migración de automatizaciones RPA con Power Automate Desktop.", en: "Building and migrating RPA automations with Power Automate Desktop." } },
  { year: "2026", title: { es: "Auxiliar de Desarrollo", en: "Development Assistant" }, org: { es: "SOCODA S.A.S.", en: "SOCODA S.A.S." },
    desc: { es: "Soporte técnico, mantenimiento de aplicaciones .NET y Angular, y desarrollo de automatizaciones con Power Platform.", en: "Technical support, maintenance of .NET and Angular apps, and building automations with Power Platform." } },
  { year: "2027", title: { es: "Ingeniería de Software", en: "Software Engineering" }, org: { es: "Corporación Universitaria Iberoamericana", en: "Corporación Universitaria Iberoamericana" },
    desc: { es: "En curso, modalidad virtual. Graduación prevista en 2027.", en: "In progress, online program. Expected graduation in 2027." } },
  { year: "SENA", title: { es: "Tecnólogo ADSO", en: "ADSO Technologist" }, org: { es: "Análisis y Desarrollo de Software", en: "Software Analysis and Development" },
    desc: { es: "Base en desarrollo web, bases de datos y metodologías ágiles.", en: "Grounding in web development, databases and agile methods." } },
];

/* ------------------------------------------------------------------ */
/* Textos de interfaz                                                  */
/* ------------------------------------------------------------------ */
export const ui = {
  nav: [
    { href: "#proyectos", t: { es: "Proyectos", en: "Work" } },
    { href: "#trayectoria", t: { es: "Trayectoria", en: "Path" } },
    { href: "#cv", t: { es: "Hoja de vida", en: "Résumé" } },
    { href: "#contacto", t: { es: "Contacto", en: "Contact" } },
  ],
  roleP: { es: "Automatizo procesos de negocio y construyo aplicaciones web.", en: "I automate business processes and build web applications." },
  scroll: { es: "Desliza", en: "Scroll" },
  status: { es: "Disponible para proyectos", en: "Open to projects" },
  modelLoaded: { es: "Modelo cargado desde GLB.", en: "Model loaded from GLB." },
  dragHint: { es: "Arrastra para girar", en: "Drag to rotate" },
  mEyebrow: { es: "01 — Lo que hago", en: "01 — What I do" },
  wEyebrow: { es: "02 — Proyectos", en: "02 — Work" },
  wTitle: { es: "Lo que<br><em>construyo</em>", en: "What I<br><em>build</em>" },
  wP: { es: "Automatización empresarial, aplicaciones web y hardware. Desliza para recorrerlos.", en: "Business automation, web applications and hardware. Scroll to browse them." },
  vdEyebrow: { es: "03 — Presentación", en: "03 — Showreel" },
  vdTitle: { es: "En <em>video</em>", en: "On <em>video</em>" },
  vdSound: { es: "Activar sonido", en: "Turn sound on" },
  vdChapters: [
    { t: 0, es: "Inicio", en: "Start" }, { t: 4, es: "Quién soy", en: "Who I am" }, { t: 8, es: "Qué hago", en: "What I do" },
    { t: 12, es: "Stack", en: "Stack" }, { t: 16, es: "Lo que me mueve", en: "What drives me" }, { t: 20, es: "Hablemos", en: "Let's talk" },
  ],
  palette: { es: "Paleta", en: "Palette" },
  more: { es: "Más videos", en: "More videos" },
  soon: { es: "Próximamente", en: "Coming soon" },
  play: { es: "Reproducir", en: "Play" },
  pause: { es: "Pausa", en: "Pause" },
  pEyebrow: { es: "04 — Trayectoria", en: "04 — Path" },
  pTitle: { es: "Hasta<br><em>hoy</em>", en: "So<br><em>far</em>" },
  ctEyebrow: { es: "07 — Contacto", en: "07 — Contact" },
  ctTitle: { es: "Hable<em>mos</em>", en: "Let's <em>talk</em>" },
  ctBtn: { es: "Escríbeme", en: "Get in touch" },
  fTitle: { es: "Cuéntame tu idea", en: "Tell me about it" },
  fSub: { es: "Te respondo en menos de 48 horas.", en: "I'll reply within 48 hours." },
  fName: { es: "Nombre", en: "Name" },
  fEmail: { es: "Correo", en: "Email" },
  fCompany: { es: "Empresa (opcional)", en: "Company (optional)" },
  fType: { es: "¿De qué se trata?", en: "What is it about?" },
  fTypeProject: { es: "Un proyecto web o app", en: "A web project or app" },
  fTypeAuto: { es: "Automatización / Power Platform", en: "Automation / Power Platform" },
  fTypeJob: { es: "Oferta de empleo", en: "Job offer" },
  fTypeOther: { es: "Otra cosa", en: "Something else" },
  fMsg: { es: "Mensaje", en: "Message" },
  fSend: { es: "Enviar mensaje", en: "Send message" },
  fClose: { es: "Cerrar", en: "Close" },
  ctMissing: { es: "Agrega tu correo en src/data/portfolio.ts para activar este botón.", en: "Add your email in src/data/portfolio.ts to enable this button." },
  foot: { es: "Diseñado y construido por Junior Herrera", en: "Designed and built by Junior Herrera" },
} satisfies Record<string, unknown>;

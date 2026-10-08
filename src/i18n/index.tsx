import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "de";

/* Words wrapped in *asterisks* are rendered in the italic serif accent. */
const dict = {
  en: {
    nav: { about: "About", focus: "Services", work: "Work", timeline: "Path", contact: "Contact", allProjects: "All Projects", certifications: "Certifications", home: "Home", talk: "Let's talk", menu: "Menu", close: "Close" },
    loader: { label: "Loading portfolio" },
    hero: {
      kicker: "Full-Stack & Cloud Engineer",
      statement: "I design and engineer *digital products* — web apps, mobile apps and cloud infrastructure that feel effortless and run without drama.",
      based: "Based in Düsseldorf, DE",
      available: "Available for new projects",
      scroll: "Scroll to explore",
      headPre: "I build",
      headWords: ["web apps", "mobile apps", "landing pages", "cloud platforms"],
      headPost: "that ship.",
      viewWork: "View work",
      talk: "Get in touch",
      folio: "Portfolio",
    },
    about: {
      eyebrow: "About",
      text: "I'm Medin — an engineer who turns *complex requirements* into products that feel simple. Years across .NET, React and Azure taught me one thing: *great software is quiet.* It loads fast, scales calmly and simply works.",
      stats: [
        { v: 35, s: "+", l: "Projects shipped" },
        { v: 30, s: "+", l: "Technologies" },
        { v: 6, s: "+", l: "Years building" },
        { v: 3, s: "", l: "Azure certifications" },
      ],
    },
    focus: {
      eyebrow: "Services",
      title: "What I *build*",
      pillars: [
        { n: "01", t: "Web Apps", d: "Web apps for teams, startups and businesses that need something fast, clear and reliable — from internal tools to full CRM suites.", tags: ["React", "Next.js", "ASP.NET Core", "SQL"] },
        { n: "02", t: "Landing Pages", d: "Landing pages that present a product well, load fast and help turn visitors into customers.", tags: ["Vite", "Motion", "SEO", "Performance"] },
        { n: "03", t: "Mobile Apps", d: "Mobile apps for iPhone and Android with a smooth, simple experience that feels right on both platforms.", tags: ["React Native", "iOS", "Android", "Offline-first"] },
        { n: "04", t: "Games", d: "Interactive game experiences, from lightweight browser concepts to polished app-based ideas.", tags: ["Gameplay", "Mobile", "Interaction", "Play Store"] },
        { n: "05", t: "Azure Infrastructure", d: "Azure environments, deployments and cloud foundations set up so products run cleanly and securely.", tags: ["Terraform", "Azure DevOps", "APIM", "Key Vault"] },
      ],
    },
    work: {
      eyebrow: "Selected Work",
      title: "A few things *worth your time*",
      seeAll: "See all projects",
      visit: "Visit project",
      noLink: "Internal project",
      hint: "Keep scrolling",
    },
    stack: { eyebrow: "Toolbox" },
    timeline: {
      eyebrow: "Path",
      title: "The road *so far*",
      educationLabel: "Education",
      workLabel: "Work",
      items: [
        { year: "2016", category: "education", title: "Computer Science", org: "Heinrich-Heine-Universität Düsseldorf", points: ["Software engineering, algorithms & systems", "Programming languages, databases & networks"] },
        { year: "2018", category: "work", title: "IT Support Specialist", org: "ControlExpert GmbH", points: ["Technical support for internal & external systems", "Assisted in software deployments"] },
        { year: "2020", category: "education", title: "Apprenticeship – IT Specialist", org: "ControlExpert GmbH · Berufskolleg Hilden", points: ["Dual apprenticeship, application development track", "Built & maintained enterprise applications on the job"] },
        { year: "2023", category: "work", title: ".NET · Azure · O365 Developer", org: "RealCore Services GmbH", points: ["Cloud apps with .NET & Azure", "RealOrders, Org Handler, Org Tool, Azure APIM"] },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's build something *worth shipping.*",
      sub: "Have a project in mind? Tell me about it — I'm happy to talk it through.",
      send: "Get in touch",
      links: [
        { k: "Email", v: "medinturkes@gmail.com", href: "mailto:medinturkes@gmail.com" },
        { k: "Phone", v: "+49 160 902 354 89", href: "tel:+4916090235489" },
        { k: "LinkedIn", v: "medin-turkes", href: "https://www.linkedin.com/in/medin-turkes-94182936/" },
        { k: "GitHub", v: "metur100", href: "https://github.com/metur100" },
        { k: "Location", v: "Düsseldorf, Germany", href: null },
      ],
    },
    footer: { top: "Back to top", built: "Designed & engineered by Medin Turkes", time: "Local time" },
    work_page: {
      eyebrow: "Archive",
      title: "All *projects*",
      lead: "35+ shipped products across web, cloud and mobile. Filter, then open any card.",
      filters: { all: "All", web: "Web", mobile: "Mobile", cloud: "Cloud", landing: "Landing", game: "Game" },
      stackLabel: "Stack",
      visit: "Visit project",
      noLink: "Internal / private project",
      back: "Back",
    },
    certs: {
      eyebrow: "Credentials",
      title: "Azure *certifications*",
      lead: "Three certifications — verifiable via Microsoft Learn.",
      verify: "Verify credential",
      back: "Back",
    },
  },
  de: {
    nav: { about: "Über mich", focus: "Leistungen", work: "Projekte", timeline: "Pfad", contact: "Kontakt", allProjects: "Alle Projekte", certifications: "Zertifikate", home: "Start", talk: "Kontakt", menu: "Menü", close: "Schließen" },
    loader: { label: "Portfolio wird geladen" },
    hero: {
      kicker: "Full-Stack- & Cloud-Entwickler",
      statement: "Ich gestalte und entwickle *digitale Produkte* — Web-Apps, mobile Apps und Cloud-Infrastruktur, die mühelos wirken und zuverlässig laufen.",
      based: "Sitz in Düsseldorf, DE",
      available: "Verfügbar für neue Projekte",
      scroll: "Scrollen zum Entdecken",
      headPre: "Ich baue",
      headWords: ["Web-Apps", "Mobile Apps", "Landingpages", "Cloud-Plattformen"],
      headPost: "die überzeugen.",
      viewWork: "Projekte ansehen",
      talk: "Kontakt aufnehmen",
      folio: "Portfolio",
    },
    about: {
      eyebrow: "Über mich",
      text: "Ich bin Medin — ein Entwickler, der *komplexe Anforderungen* in Produkte verwandelt, die sich einfach anfühlen. Jahre mit .NET, React und Azure haben mich eines gelehrt: *gute Software ist leise.* Sie lädt schnell, skaliert ruhig und funktioniert einfach.",
      stats: [
        { v: 35, s: "+", l: "Projekte geliefert" },
        { v: 30, s: "+", l: "Technologien" },
        { v: 6, s: "+", l: "Jahre Erfahrung" },
        { v: 3, s: "", l: "Azure-Zertifikate" },
      ],
    },
    focus: {
      eyebrow: "Leistungen",
      title: "Was ich *baue*",
      pillars: [
        { n: "01", t: "Web-Apps", d: "Web-Apps für Teams, Startups und Unternehmen, die etwas Schnelles, Klares und Zuverlässiges brauchen — vom internen Tool bis zur CRM-Suite.", tags: ["React", "Next.js", "ASP.NET Core", "SQL"] },
        { n: "02", t: "Landingpages", d: "Landingpages, die ein Produkt stark präsentieren, schnell laden und Besucher in Kunden verwandeln.", tags: ["Vite", "Motion", "SEO", "Performance"] },
        { n: "03", t: "Mobile Apps", d: "Mobile Apps für iPhone und Android mit einer einfachen, flüssigen Nutzung auf beiden Plattformen.", tags: ["React Native", "iOS", "Android", "Offline-first"] },
        { n: "04", t: "Games", d: "Interaktive Spielerlebnisse, von leichten Browser-Konzepten bis zu ausgearbeiteten App-Ideen.", tags: ["Gameplay", "Mobile", "Interaktion", "Play Store"] },
        { n: "05", t: "Azure-Infrastruktur", d: "Azure-Umgebungen, Deployments und Cloud-Basis — so eingerichtet, dass Produkte sauber und sicher laufen.", tags: ["Terraform", "Azure DevOps", "APIM", "Key Vault"] },
      ],
    },
    work: {
      eyebrow: "Ausgewählte Arbeiten",
      title: "Ein paar Dinge, *die sich lohnen*",
      seeAll: "Alle Projekte ansehen",
      visit: "Projekt öffnen",
      noLink: "Internes Projekt",
      hint: "Weiter scrollen",
    },
    stack: { eyebrow: "Werkzeuge" },
    timeline: {
      eyebrow: "Pfad",
      title: "Der Weg *bisher*",
      educationLabel: "Ausbildung",
      workLabel: "Beruf",
      items: [
        { year: "2016", category: "education", title: "Informatikstudium", org: "Heinrich-Heine-Universität Düsseldorf", points: ["Softwareentwicklung, Algorithmen & Systeme", "Programmiersprachen, Datenbanken & Netzwerke"] },
        { year: "2018", category: "work", title: "IT-Support-Spezialist", org: "ControlExpert GmbH", points: ["Technischer Support für interne & externe Systeme", "Unterstützung bei Software-Deployments"] },
        { year: "2020", category: "education", title: "Ausbildung zum Fachinformatiker", org: "ControlExpert GmbH · Berufskolleg Hilden", points: ["Duale Ausbildung, Anwendungsentwicklung", "Entwicklung & Wartung von Software im Betrieb"] },
        { year: "2023", category: "work", title: ".NET · Azure · O365 Entwickler", org: "RealCore Services GmbH", points: ["Cloud-Apps mit .NET & Azure", "RealOrders, Org Handler, Org Tool, Azure APIM"] },
      ],
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Lass uns etwas bauen, *das es wert ist.*",
      sub: "Du hast ein Projekt im Kopf? Erzähl mir davon — ich bespreche es gerne mit dir.",
      send: "Kontakt aufnehmen",
      links: [
        { k: "E-Mail", v: "medinturkes@gmail.com", href: "mailto:medinturkes@gmail.com" },
        { k: "Telefon", v: "+49 160 902 354 89", href: "tel:+4916090235489" },
        { k: "LinkedIn", v: "medin-turkes", href: "https://www.linkedin.com/in/medin-turkes-94182936/" },
        { k: "GitHub", v: "metur100", href: "https://github.com/metur100" },
        { k: "Standort", v: "Düsseldorf, Deutschland", href: null },
      ],
    },
    footer: { top: "Nach oben", built: "Gestaltet & entwickelt von Medin Turkes", time: "Ortszeit" },
    work_page: {
      eyebrow: "Archiv",
      title: "Alle *Projekte*",
      lead: "35+ ausgelieferte Produkte in Web, Cloud und Mobile. Filtern, dann Karte öffnen.",
      filters: { all: "Alle", web: "Web", mobile: "Mobile", cloud: "Cloud", landing: "Landing", game: "Game" },
      stackLabel: "Stack",
      visit: "Projekt öffnen",
      noLink: "Internes / privates Projekt",
      back: "Zurück",
    },
    certs: {
      eyebrow: "Nachweise",
      title: "Azure-*Zertifikate*",
      lead: "Drei Zertifikate — verifizierbar über Microsoft Learn.",
      verify: "Nachweis prüfen",
      back: "Zurück",
    },
  },
};

type Dict = (typeof dict)["en"];

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "en", setLang: () => {}, t: dict.en,
});

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "de") return saved;
  } catch { /* storage unavailable */ }
  return navigator.language?.toLowerCase().startsWith("de") ? "de" : "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch { /* storage unavailable */ }
  };
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return <LangCtx.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);

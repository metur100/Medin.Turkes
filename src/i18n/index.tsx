import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "de";

const dict = {
  en: {
    nav: { timeline: "Path", focus: "Focus", work: "Work", contact: "Contact", allProjects: "All Projects", certifications: "Certifications" },
    hero: {
      kicker: "Full-Stack & Cloud Engineer",
      viewWork: "View the work",
    },
    proof: {
      eyebrow: "Trajectory",
      stats: [
        { v: "20+", l: "Projects shipped" },
        { v: "30+", l: "Technologies" },
        { v: "6+", l: "Years building" },
        { v: "2", l: "Azure certs" },
      ],
    },
    timeline: {
      eyebrow: "Path",
      title: "Education & Work",
      educationLabel: "Education",
      workLabel: "Work",
      items: [
        { year: "2016", category: "education", title: "Computer Science", org: "Heinrich-Heine-Universität Düsseldorf", points: ["Software engineering, algorithms & systems", "Programming languages, databases & networks"] },
        { year: "2018", category: "work", title: "IT Support Specialist", org: "ControlExpert GmbH", points: ["Technical support for internal & external systems", "Assisted in software deployments"] },
        { year: "2020", category: "education", title: "Apprenticeship – IT Specialist", org: "ControlExpert GmbH · Berufskolleg Hilden", points: ["Dual apprenticeship, application development track", "Built & maintained enterprise applications on the job"] },
        { year: "2023", category: "work", title: ".NET · Azure · O365 Developer", org: "RealCore Services GmbH", points: ["Cloud apps with .NET & Azure", "RealOrders, Org Handler, Org Tool, Azure APIM"] },
      ],
    },
    focus: {
      eyebrow: "Focus",
      title: "What I build",
      pillars: [
        { n: "01", t: "Full-Stack Development", d: "End-to-end products — React and Next.js on top, ASP.NET Core and Node.js underneath." },
        { n: "02", t: "Cloud & DevOps on Azure", d: "Terraform infrastructure, CI/CD pipelines and systems built to stay observable." },
        { n: "03", t: "Mobile Apps", d: "Cross-platform iOS & Android with React Native, built to feel native." },
        { n: "04", t: "Problem Solving", d: "Business problems dissected into systems that hold up in production." },
      ],
    },
    work: {
      eyebrow: "Signature Work",
      title: "A few things worth your time",
      seeAll: "See all projects",
      visit: "Visit project",
      noLink: "Internal project",
    },
    contact: {
      eyebrow: "Say Hello",
      title: "Let's build something worth shipping.",
      send: "Compose message",
      links: [
        { k: "Email", v: "medinturkes@gmail.com", href: "mailto:medinturkes@gmail.com" },
        { k: "Phone", v: "+49 160 902 354 89", href: "tel:+4916090235489" },
        { k: "LinkedIn", v: "medin-turkes", href: "https://www.linkedin.com/in/medin-turkes-94182936/" },
        { k: "GitHub", v: "metur100", href: "https://github.com/metur100" },
        { k: "Location", v: "Düsseldorf, Germany", href: null },
      ],
    },
    work_page: {
      eyebrow: "Work",
      title: "Selected projects",
      lead: "A slice of 20+ shipped products across web, cloud and mobile. Filter, then open any card.",
      filters: { all: "All", web: "Web", mobile: "Mobile", cloud: "Cloud", landing: "Landing", game: "Game" },
      stackLabel: "Stack",
      visit: "Visit project →",
      noLink: "Internal / private project",
    },
  },
  de: {
    nav: { timeline: "Pfad", focus: "Fokus", work: "Projekte", contact: "Kontakt", allProjects: "Alle Projekte", certifications: "Zertifikate" },
    hero: {
      kicker: "Full-Stack- & Cloud-Entwickler",
      viewWork: "Projekte ansehen",
    },
    proof: {
      eyebrow: "Werdegang",
      stats: [
        { v: "20+", l: "Projekte geliefert" },
        { v: "30+", l: "Technologien" },
        { v: "6+", l: "Jahre Erfahrung" },
        { v: "2", l: "Azure-Zertifikate" },
      ],
    },
    timeline: {
      eyebrow: "Pfad",
      title: "Ausbildung & Beruf",
      educationLabel: "Ausbildung",
      workLabel: "Beruf",
      items: [
        { year: "2016", category: "education", title: "Informatikstudium", org: "Heinrich-Heine-Universität Düsseldorf", points: ["Softwareentwicklung, Algorithmen & Systeme", "Programmiersprachen, Datenbanken & Netzwerke"] },
        { year: "2018", category: "work", title: "IT-Support-Spezialist", org: "ControlExpert GmbH", points: ["Technischer Support für interne & externe Systeme", "Unterstützung bei Software-Deployments"] },
        { year: "2020", category: "education", title: "Ausbildung zum Fachinformatiker", org: "ControlExpert GmbH · Berufskolleg Hilden", points: ["Duale Ausbildung, Anwendungsentwicklung", "Entwicklung & Wartung von Software im Betrieb"] },
        { year: "2023", category: "work", title: ".NET · Azure · O365 Entwickler", org: "RealCore Services GmbH", points: ["Cloud-Apps mit .NET & Azure", "RealOrders, Org Handler, Org Tool, Azure APIM"] },
      ],
    },
    focus: {
      eyebrow: "Fokus",
      title: "Was ich baue",
      pillars: [
        { n: "01", t: "Full-Stack-Entwicklung", d: "End-to-End-Produkte — React und Next.js oben, ASP.NET Core und Node.js darunter." },
        { n: "02", t: "Cloud & DevOps auf Azure", d: "Terraform-Infrastruktur, CI/CD-Pipelines und durchgängig beobachtbare Systeme." },
        { n: "03", t: "Mobile Apps", d: "Plattformübergreifend für iOS & Android mit React Native, mit nativer Anmutung." },
        { n: "04", t: "Problemlösung", d: "Geschäftsprobleme zerlegt in Systeme, die im Betrieb zuverlässig bleiben." },
      ],
    },
    work: {
      eyebrow: "Ausgewählte Arbeiten",
      title: "Ein paar Dinge, die einen Blick wert sind",
      seeAll: "Alle Projekte ansehen",
      visit: "Projekt öffnen",
      noLink: "Internes Projekt",
    },
    contact: {
      eyebrow: "Hallo sagen",
      title: "Lass uns etwas bauen, das es wert ist.",
      send: "Nachricht verfassen",
      links: [
        { k: "E-Mail", v: "medinturkes@gmail.com", href: "mailto:medinturkes@gmail.com" },
        { k: "Telefon", v: "+49 160 902 354 89", href: "tel:+4916090235489" },
        { k: "LinkedIn", v: "medin-turkes", href: "https://www.linkedin.com/in/medin-turkes-94182936/" },
        { k: "GitHub", v: "metur100", href: "https://github.com/metur100" },
        { k: "Standort", v: "Düsseldorf, Deutschland", href: null },
      ],
    },
    work_page: {
      eyebrow: "Projekte",
      title: "Ausgewählte Projekte",
      lead: "Ein Ausschnitt aus 20+ ausgelieferten Produkten in Web, Cloud und Mobile. Filtern, dann Karte öffnen.",
      filters: { all: "Alle", web: "Web", mobile: "Mobile", cloud: "Cloud", landing: "Landing", game: "Game" },
      stackLabel: "Stack",
      visit: "Projekt öffnen →",
      noLink: "Internes / privates Projekt",
    },
  },
};

type Dict = (typeof dict)["en"];

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "en", setLang: () => {}, t: dict.en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return <LangCtx.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);

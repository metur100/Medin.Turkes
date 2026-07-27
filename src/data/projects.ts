export type Localized = { en: string; de: string };

export interface Project {
  id: string;
  initials: string;
  name: string;
  tagline: Localized;
  category: Localized;
  group: "web" | "mobile" | "cloud" | "landing" | "game";
  description: Localized;
  stack: string[];
  image: string; // relative to /images/
  link: string | null;
  featured?: boolean;
}

/* Images live in /public/images. Drop your own files there using the
   filenames below and they appear automatically. Missing files show a
   clean generated placeholder — nothing breaks. */
export const PROJECTS: Project[] = [
  {
    id: "emma-solution", initials: "ES", name: "EMMA Solution", group: "web", featured: true,
    tagline: { en: "Freight & Vehicle Management", de: "Fracht- & Fahrzeugmanagement" },
    category: { en: "Web · Android · Landing", de: "Web · Android · Landing" },
    description: {
      en: "Next-generation freight and vehicle management platform for the logistics industry. Real-time tracking, secure vehicle assignment and seamless shipment coordination across web, Android and a dedicated landing page.",
      de: "Fracht- und Fahrzeugverwaltung der nächsten Generation für die Logistikbranche. Echtzeit-Tracking, sichere Fahrzeugzuweisung und nahtlose Sendungskoordination über Web, Android und dedizierte Landingpage.",
    },
    stack: ["React", "TypeScript", "ASP.NET Core 8", "Azure SQL", "Azure Web App", "JWT"],
    image: "emma.jpg", link: "https://emmasolution.com/",
  },
  {
    id: "teretnjaci", initials: "TB", name: "Teretnjaci.ba", group: "mobile", featured: true,
    tagline: { en: "Trucking Information Platform", de: "LKW-Informationsplattform" },
    category: { en: "Web · Android · iOS", de: "Web · Android · iOS" },
    description: {
      en: "Information platform for the trucking industry — news, maintenance guides, road assistance and industry updates. Shipped as a PWA plus native Android and iOS apps.",
      de: "Informationsplattform für die LKW-Branche — Nachrichten, Wartungsanleitungen, Pannenhilfe und Branchenupdates. Als PWA sowie native Android- und iOS-App ausgeliefert.",
    },
    stack: ["React", "Vite", "TypeScript", "Node.js", "Express", "MySQL", "React Native"],
    image: "teretnjaci.png", link: "https://teretnjaci.ba",
  },
  {
    id: "gentle-suite", initials: "GS", name: "Gentle Suite", group: "web", featured: true,
    tagline: { en: "Full CRM & Business Management", de: "Vollständiges CRM & Unternehmensmanagement" },
    category: { en: "Web · CRM · ERP", de: "Web · CRM · ERP" },
    description: {
      en: "All-in-one business suite: customers, offers, invoicing, employees, onboarding, ticketing, projects, expenses, time tracking and pricelists — replacing several separate tools.",
      de: "All-in-one-Unternehmenssuite: Kunden, Angebote, Rechnungen, Mitarbeiter, Onboarding, Ticketing, Projekte, Ausgaben, Zeiterfassung und Preislisten — ersetzt mehrere Einzeltools.",
    },
    stack: ["Next.js", "React", "TypeScript", "ASP.NET Core", "MS SQL"],
    image: "gentlesuite.png", link: "https://gentlesuite.vercel.app/",
  },
  {
    id: "azure-apim", initials: "AM", name: "Azure APIM Platform", group: "cloud", featured: true,
    tagline: { en: "Infrastructure & DevOps", de: "Infrastruktur & DevOps" },
    category: { en: "Infrastructure", de: "Infrastruktur" },
    description: {
      en: "Production-grade Azure API Management with fully automated infrastructure: Terraform IaC, CI/CD pipelines, policy governance, VNET networking and end-to-end observability.",
      de: "Produktionsreife Azure API Management Plattform mit vollautomatisierter Infrastruktur: Terraform IaC, CI/CD-Pipelines, Policy-Governance, VNET-Netzwerk und durchgängige Observability.",
    },
    stack: ["Terraform", "Azure DevOps", "Azure APIM", "Key Vault", "Log Analytics", "KQL", "WAF"],
    image: "apim.png", link: null,
  },
  {
    id: "logitrack", initials: "LT", name: "LogiTrack", group: "web", featured: true,
    tagline: { en: "Logistics Management System", de: "Logistikmanagementsystem" },
    category: { en: "Web · Logistics", de: "Web · Logistik" },
    description: {
      en: "Full logistics system for drivers and dispatchers: real-time fleet oversight, route management and operational coordination on Cloudflare Pages with an ASP.NET Core backend.",
      de: "Vollständiges Logistiksystem für Fahrer und Disponenten: Echtzeit-Flottenübersicht, Routenmanagement und operative Koordination auf Cloudflare Pages mit ASP.NET Core Backend.",
    },
    stack: ["React", "Vite", "TypeScript", "ASP.NET Core", "MS SQL", "Cloudflare Pages"],
    image: "logitrack.png", link: "https://logistic-management-ui.pages.dev/",
  },
  {
    id: "realorders", initials: "RO", name: "RealOrders", group: "web",
    tagline: { en: "Internal Ordering System", de: "Internes Bestellsystem" },
    category: { en: "Web App", de: "Web-App" },
    description: {
      en: "Internal procurement platform for RealCore Group integrated with Microsoft 365, Azure Logic Apps and Adaptive Cards — automated approvals and real-time order tracking.",
      de: "Internes Bestellsystem für die RealCore Group, integriert mit Microsoft 365, Azure Logic Apps und Adaptive Cards — automatisierte Genehmigungen und Echtzeit-Auftragsverfolgung.",
    },
    stack: ["React", "TypeScript", "Azure Functions", "Entra ID", "Logic Apps", "MS Graph"],
    image: "realorders.jpg", link: "https://wa-real-shopping-app.azurewebsites.net/",
  },
  {
    id: "skinbloom", initials: "SB", name: "Skinbloom", group: "web",
    tagline: { en: "Skincare Booking & Pricing", de: "Hautpflege-Buchung & Preisrechner" },
    category: { en: "Web · Booking", de: "Web · Buchung" },
    description: {
      en: "Booking system for a skincare studio with a dynamic price calculator, full appointment management and a service pricing engine on a Node.js backend.",
      de: "Buchungssystem für ein Hautpflegestudio mit dynamischem Preisrechner, vollständigem Terminmanagement und Service-Preismotor auf Node.js Backend.",
    },
    stack: ["Next.js", "React", "TypeScript", "ASP.NET Core", "Node.js", "Neon DB"],
    image: "skinbloom.png", link: "https://skinbloombooking.gentlegroup.de/",
  },
  {
    id: "vip-shuttle", initials: "VS", name: "VIP Shuttle 24", group: "landing",
    tagline: { en: "Premium Transfer Landing Page", de: "Premium Transfer Landingpage" },
    category: { en: "Landing Page", de: "Landingpage" },
    description: {
      en: "High-performance landing page for a premium shuttle service — fast SSR, clean design and optimised for conversions and local SEO.",
      de: "Hochleistungs-Landingpage für einen Premium-Shuttleservice — schnelles SSR, klares Design, optimiert für Conversions und lokales SEO.",
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    image: "vip.png", link: "https://vipshuttle-24.de/",
  },
  {
    id: "air-clean", initials: "AC", name: "Air Clean", group: "landing",
    tagline: { en: "Commercial Air Cleaning Landing Page", de: "Landingpage fur professionelle Luftreinigung" },
    category: { en: "Landing Page", de: "Landingpage" },
    description: {
      en: "Conversion-focused landing page for Air Clean, built with React, Next.js and TypeScript. Deployed on Vercel with fast loading, clean service sections and strong mobile responsiveness.",
      de: "Conversion-orientierte Landingpage fur Air Clean, entwickelt mit React, Next.js und TypeScript. Auf Vercel deployt mit schnellen Ladezeiten, klaren Service-Bereichen und starker mobiler Responsivitat.",
    },
    stack: ["React", "Next.js", "TypeScript", "Vercel"],
    image: "airclean.png", link: "https://www.airclean-setec.de/",
  },
  {
    id: "bayar-handle", initials: "BH", name: "Bayar Handle", group: "landing",
    tagline: { en: "Brand Landing Page", de: "Marken-Landingpage" },
    category: { en: "Landing Page", de: "Landingpage" },
    description: {
      en: "Modern landing page for Bayar Handle built with React, Next.js and TypeScript. Hosted on Vercel with a lightweight structure optimized for performance and SEO.",
      de: "Moderne Landingpage fur Bayar Handle mit React, Next.js und TypeScript. Auf Vercel gehostet mit leichtgewichtiger Struktur, optimiert fur Performance und SEO.",
    },
    stack: ["React", "Next.js", "TypeScript", "Vercel"],
    image: "bayar.png", link: "https://bayarhandle.de",
  },
  {
    id: "kaymak-bau", initials: "KB", name: "Kaymak Bau", group: "landing",
    tagline: { en: "Construction Company Landing Page", de: "Landingpage fur Bauunternehmen" },
    category: { en: "Landing Page", de: "Landingpage" },
    description: {
      en: "Business landing page for Kaymak Bau developed with React, Vite and TypeScript. Deployed on Vercel with responsive sections, fast navigation and clear service presentation.",
      de: "Business-Landingpage fur Kaymak Bau, entwickelt mit React, Vite und TypeScript. Auf Vercel deployt mit responsiven Bereichen, schneller Navigation und klarer Service-Darstellung.",
    },
    stack: ["React", "Vite", "TypeScript", "Vercel"],
    image: "kaymakbau.png", link: "https://kaymak-bau.de",
  },
  {
    id: "org-handler", initials: "OH", name: "Org Handler", group: "cloud",
    tagline: { en: "Event-Driven Org Management", de: "Ereignisgesteuertes Org-Management" },
    category: { en: "Web API · MS Graph", de: "Web API · MS Graph" },
    description: {
      en: "Event-driven system distributing organizational data across multiple systems at RealCore Group using a pub-sub model over MassTransit and Azure Service Bus.",
      de: "Ereignisgesteuertes System zur Verteilung von Organisationsdaten über mehrere Systeme der RealCore Group per Pub-Sub über MassTransit und Azure Service Bus.",
    },
    stack: [".NET Core", "MassTransit", "Azure Service Bus", "MS Graph", "Docker"],
    image: "org.jpg", link: null,
  },
  {
    id: "org-tool", initials: "OT", name: "Org Tool", group: "web",
    tagline: { en: "Company Hierarchy Visualization", de: "Unternehmenshierarchie-Visualisierung" },
    category: { en: "Web App", de: "Web-App" },
    description: {
      en: "Organizational management system with interactive tree structures to visualize hierarchies, reporting lines and employee relationships with role-based access.",
      de: "Organisationsmanagement mit interaktiven Baumstrukturen zur Visualisierung von Hierarchien, Berichtslinien und Mitarbeiterbeziehungen mit rollenbasiertem Zugriff.",
    },
    stack: ["Angular", "TypeScript", "ASP.NET Core", "MS Graph", "Entra ID"],
    image: "orgtool.png", link: null,
  },
  {
    id: "awalon", initials: "AW", name: "Awalon CRM", group: "web",
    tagline: { en: "CRM with SharePoint Integration", de: "CRM mit SharePoint-Integration" },
    category: { en: "Web App", de: "Web-App" },
    description: {
      en: "CRM for managing customer relationships, offers and business processes, integrated with SharePoint for data management and workflow automation.",
      de: "CRM zur Verwaltung von Kundenbeziehungen, Angeboten und Geschäftsprozessen, integriert mit SharePoint für Datenmanagement und Workflow-Automatisierung.",
    },
    stack: ["Next.js", "React", ".NET", "SharePoint", "TypeScript"],
    image: "awalon.png", link: null,
  },
  {
    id: "gentle-track", initials: "GT", name: "Gentle Track", group: "web", featured: true,
    tagline: { en: "Project Management System", de: "Projektmanagementsystem" },
    category: { en: "Web App", de: "Web-App" },
    description: {
      en: "Web-based project management for tracking projects, customers and team collaboration with real-time dashboards, phase management and auto-generated tracking numbers.",
      de: "Webbasiertes Projektmanagement zur Verfolgung von Projekten, Kunden und Teamzusammenarbeit mit Echtzeit-Dashboards, Phasenmanagement und automatischen Tracking-Nummern.",
    },
    stack: ["React", "Vite", "ASP.NET Core", "MS SQL", "TypeScript"],
    image: "gentletrack.png", link: "https://f7e2b27f.gentle-track-ui.pages.dev/",
  },
  {
    id: "gentle-group", initials: "GG", name: "Gentle Group", group: "landing",
    tagline: { en: "Modern Landing Page", de: "Moderne Landingpage" },
    category: { en: "Landing Page", de: "Landingpage" },
    description: {
      en: "High-performance Next.js landing page with SSR, static generation, motion and Vercel deployment — optimised Core Web Vitals on a global CDN.",
      de: "Hochleistungs-Next.js-Landingpage mit SSR, statischer Generierung, Motion und Vercel-Deployment — optimierte Core Web Vitals auf globalem CDN.",
    },
    stack: ["Next.js 14", "React", "Tailwind CSS", "Framer Motion", "Vercel"],
    image: "gentlegroup.png", link: "https://www.gentlegroup.de/",
  },
  {
    id: "nrw", initials: "NR", name: "NRW Real Estate", group: "landing",
    tagline: { en: "Property Listings Platform", de: "Immobilien-Plattform" },
    category: { en: "Website", de: "Website" },
    description: {
      en: "Responsive real estate platform for North Rhine-Westphalia with advanced filtering by location, price and size.",
      de: "Responsive Immobilienplattform für Nordrhein-Westfalen mit erweiterter Filterung nach Standort, Preis und Größe.",
    },
    stack: ["Next.js", "React", "CSS3", "Vercel"],
    image: "nrw.jpg", link: "https://www.nrwrealestate.de/",
  },
  {
    id: "creative-hair", initials: "CH", name: "Creative Hair", group: "landing",
    tagline: { en: "Hair Salon Website", de: "Friseursalon-Website" },
    category: { en: "Website", de: "Website" },
    description: {
      en: "Elegant responsive website for a modern hair salon with service showcase and integrated appointment booking.",
      de: "Elegante responsive Website für einen modernen Friseursalon mit Servicepräsentation und integrierter Terminbuchung.",
    },
    stack: ["React", "Vite", "CSS3", "Vercel"],
    image: "hairsalon.jpg", link: "https://creative-hairstyling-3u6e.vercel.app/",
  },
  {
    id: "zoey", initials: "ZP", name: "Zoey Preisrechner", group: "web",
    tagline: { en: "Service Price Calculator", de: "Service-Preisrechner" },
    category: { en: "Web · Calculator", de: "Web · Rechner" },
    description: {
      en: "Interactive service price calculator driven entirely by frontend JSON config — fast, lightweight and backend-free.",
      de: "Interaktiver Service-Preisrechner, vollständig durch Frontend-JSON gesteuert — schnell, leichtgewichtig und ohne Backend.",
    },
    stack: ["Next.js", "React", "TypeScript", "JSON"],
    image: "zoey.png", link: "https://zoey-preisrechner.vercel.app/",
  },
  {
    id: "frankenstein", initials: "FK", name: "Frankenstein", group: "mobile",
    tagline: { en: "Interactive Android Novel", de: "Interaktiver Android-Roman" },
    category: { en: "Android App", de: "Android-App" },
    description: {
      en: "Android app bringing Mary Shelley's Frankenstein to life — interactive storytelling, historical context, shareable quotes and offline reading. Published on Google Play.",
      de: "Android-App, die Mary Shelleys Frankenstein zum Leben erweckt — interaktives Storytelling, historischer Kontext, teilbare Zitate und Offline-Lesen. Im Google Play Store veröffentlicht.",
    },
    stack: ["Android Studio", "Java", "XML"],
    image: "frankenstein.jpg", link: "https://play.google.com/store/apps/details?id=com.certidevelopment.frankenstein",
  },
  {
    id: "monthee", initials: "MA", name: "Monthee Adventure", group: "game",
    tagline: { en: "2D Platformer RPG", de: "2D-Plattformer-RPG" },
    category: { en: "Unity Engine", de: "Unity Engine" },
    description: {
      en: "2D platformer with RPG elements for PC and Android — quests, NPC interactions, leveling and puzzle platforming. A 5-month solo project on Google Play.",
      de: "2D-Plattformer mit RPG-Elementen für PC und Android — Quests, NPC-Interaktionen, Levelsystem und Puzzle-Platforming. Ein 5-monatiges Solo-Projekt auf Google Play.",
    },
    stack: ["Unity", "C#", "After Effects", "Audacity"],
    image: "monthee.jpg", link: "https://play.google.com/store/apps/details?id=com.CertiDevelopment.MontheeAdventure",
  },
  {
    id: "ipad", initials: "IM", name: "iPad Management", group: "web",
    tagline: { en: "Device Management for Schools", de: "Geräteverwaltung für Schulen" },
    category: { en: "Windows App", de: "Windows-App" },
    description: {
      en: "Windows app for Berufskolleg Hilden to manage iPad distribution — loan/return tracking, damage reporting, signature capture and an MS Access database.",
      de: "Windows-Anwendung für das Berufskolleg Hilden zur Verwaltung der iPad-Verteilung — Leih-/Rückgabeverfolgung, Schadensberichte, Unterschriftenerfassung und MS Access Datenbank.",
    },
    stack: ["C#", "Windows Forms", "MS Access"],
    image: "ipad.jpg", link: null,
  },
  {
    id: "pos-bestellapp", initials: "PB", name: "POS BestellApp", group: "web",
    tagline: { en: "Internal Equipment Ordering System", de: "Internes Bestellsystem für Geräte" },
    category: { en: "Internal Web App", de: "Interne Web-App" },
    description: {
      en: "Internal ordering platform replacing a manual spreadsheet process for point-of-sale hardware across multiple sites. The requesting team manages the article catalog centrally, including bundled collection items that automatically prompt required companion articles before checkout. Locations place orders independently, which triggers automated email notifications and gives the supplier direct access to keep delivery status up to date. Authenticated with Microsoft Entra ID, hosted on Azure, with an internal admin area for articles, pricing and user roles.",
      de: "Entwicklung einer modernen, webbasierten Bestell-App zur Ablösung der bisherigen manuellen Excel-basierten Lösung für POS-Hardware an mehreren Standorten. Der Fachbereich kann Artikel zentral pflegen, inklusive Sammelartikel, die automatisch zugehörige Pflichtartikel vorschlagen, bevor diese in den Warenkorb gelegt werden können. Standorte können eigenständig Bestellungen aufgeben, was automatisierte E-Mail-Benachrichtigungen auslöst; der Lieferant erhält direkten Zugriff, um den Bestellstatus zu pflegen. Authentifizierung über Microsoft Entra ID, Betrieb auf Azure mit internem Admin-Bereich für Artikel, Preise und Benutzerrollen.",
    },
    stack: ["React", "TypeScript", "Vite", "ASP.NET Core", "Azure SQL", "Entra ID"],
    image: "pos.png", link: null,
  },
  {
    id: "tm-app", initials: "TA", name: "TM App", group: "mobile",
    tagline: { en: "Field Order Capture & Company News", de: "Mobile Auftragserfassung & News" },
    category: { en: "Android · iOS", de: "Android · iOS" },
    description: {
      en: "Mobile app for digital order capture in direct sales, alongside centralized company news and information. After authenticating with Microsoft Entra ID, employees get secure, role-based access to their tools and content — orders are captured quickly on the go, and current company news stays available at any time, including offline.",
      de: "Entwicklung einer modernen, mobilen Anwendung zur digitalen Auftragserfassung im Vertrieb sowie zur zentralen Bereitstellung von News und Unternehmensinformationen. Nach Authentifizierung über Microsoft Entra ID erhalten Mitarbeitende sicheren, rollenbasierten Zugriff auf ihre Funktionen und Inhalte. Aufträge lassen sich schnell mobil erfassen, aktuelle Nachrichten sind jederzeit verfügbar — auch offline.",
    },
    stack: ["React Native", "TypeScript", "SharePoint", "C#", "Entra ID"],
    image: "tm.png", link: null,
  },
];

export const FILTER_GROUPS = ["all", "web", "mobile", "cloud", "landing", "game"] as const;
export type FilterGroup = (typeof FILTER_GROUPS)[number];

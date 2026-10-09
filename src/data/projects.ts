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
    image: "bayar.png", link: null,
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
    image: "kaymakbau.png", link: "https://kaymakbodenverlegung.de/",
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
  {
    id: "document-archive", initials: "DA", name: "RCS Document Archive", group: "cloud",
    tagline: { en: "Audit-Proof Archiving on Azure", de: "Revisionssichere Archivierung auf Azure" },
    category: { en: "Web · Cloud · Compliance", de: "Web · Cloud · Compliance" },
    description: {
      en: "Revision-safe archiving for RealCore: files from SharePoint, Microsoft 365 and Azure Blob are SHA-256 hashed, written to WORM storage, read back to verify and receipted as JSON and PDF. Auditors open a case, assemble a review basket and, once the data owner approves, get a time-limited, hash-verified copy kept apart from the archive. Role-based and isolated per organisation.",
      de: "Revisionssichere Archivierung für RealCore: Dateien aus SharePoint, Microsoft 365 und Azure Blob werden per SHA-256 gehasht, in WORM-Speicher geschrieben, zur Prüfung zurückgelesen und als JSON- und PDF-Beleg quittiert. Prüfer eröffnen einen Fall, stellen einen Prüfkorb zusammen und erhalten nach Freigabe durch den Dateneigentümer eine zeitlich begrenzte, hash-geprüfte Kopie getrennt vom Archiv. Rollenbasiert und je Organisation isoliert.",
    },
    stack: ["React", "TypeScript", "ASP.NET Core", "EF Core", "Azure SQL", "Azure Blob WORM", "Entra ID"],
    image: "document-archive.jpg", link: null,
  },
  {
    id: "starfall-grove", initials: "SG", name: "Starfall Grove", group: "game", featured: true,
    tagline: { en: "Storybook Action RPG", de: "Storybook-Action-RPG" },
    category: { en: "Game · PWA · iOS", de: "Game · PWA · iOS" },
    description: {
      en: "A pop-up storybook action RPG that runs in the browser: four lands, five heroes and one fallen star. Built as an offline-installable PWA with a hand-rolled Canvas 2D engine and Web Audio, plus a marketing site in three languages and an Expo wrapper for iOS.",
      de: "Ein Storybook-Action-RPG direkt im Browser: vier Länder, fünf Helden, ein gefallener Stern. Als offline-installierbare PWA mit eigener Canvas-2D-Engine und Web Audio umgesetzt, dazu eine dreisprachige Website und ein Expo-Wrapper für iOS.",
    },
    stack: ["React", "TypeScript", "Vite", "Canvas 2D", "Web Audio", "PWA", "Expo"],
    image: "starfall-grove.jpg", link: "https://starfallgrove.eu/",
  },
  {
    id: "mini-rift", initials: "MR", name: "Mini Rift", group: "game",
    tagline: { en: "Real-Time Multiplayer MOBA", de: "Echtzeit-Multiplayer-MOBA" },
    category: { en: "Game · Multiplayer", de: "Game · Multiplayer" },
    description: {
      en: "A compact multiplayer MOBA set in the Starfall Grove world. Lane battles and hero duels from 1v1 to 3v3, rating-based matchmaking with bots filling empty seats, and a .NET SignalR server keeping every client in sync.",
      de: "Ein kompaktes Multiplayer-MOBA in der Welt von Starfall Grove. Lane-Kämpfe und Helden-Duelle von 1v1 bis 3v3, Matchmaking nach Rating mit Bots für freie Plätze und ein .NET-SignalR-Server, der alle Clients synchron hält.",
    },
    stack: ["React", "TypeScript", "Canvas 2D", "SignalR", ".NET"],
    image: "mini-rift.jpg", link: "https://metur100.github.io/Starfall.Grove.Moba.UI/",
  },
  {
    id: "dont-touch-that", initials: "DT", name: "Don't Touch That!", group: "game",
    tagline: { en: "Reaction & Trick Puzzle Game", de: "Reaktions- & Trick-Puzzlespiel" },
    category: { en: "Game · Android · iOS", de: "Game · Android · iOS" },
    description: {
      en: "Every level says what not to do, then tries everything to make you do it. 100 hand-made levels in 10 chapters, a procedurally generated Endless mode with boss rounds, and a date-seeded Daily mode. Fully offline: no ads, no accounts, no backend, with haptics, sensors and synthesized sound.",
      de: "Jedes Level sagt, was du nicht tun sollst, und versucht dann alles, damit du es doch tust. 100 handgebaute Level in 10 Kapiteln, ein prozedural erzeugter Endlos-Modus mit Boss-Runden und ein täglicher Modus nach Datum. Komplett offline: keine Werbung, keine Konten, kein Backend, mit Haptik, Sensoren und synthetisiertem Sound.",
    },
    stack: ["Expo", "React Native", "TypeScript", "Expo Router", "Reanimated", "Zustand", "Jest"],
    image: "dont-touch-that.jpg", link: "https://metur100.github.io/Dont.Touch.That.Landing/",
  },
  {
    id: "magnet-mail", initials: "MM", name: "Magnet Mail", group: "game",
    tagline: { en: "Magnetic Physics Puzzle Game", de: "Magnetisches Physik-Puzzlespiel" },
    category: { en: "Game · Android · iOS", de: "Game · Android · iOS" },
    description: {
      en: "Deliver parcels without ever touching them: attract and repel to fling each one past trains, gears and wormholes into the mailbox. 30 levels and a daily challenge on a custom deterministic physics engine, with a beam-search solver that proves every level is solvable.",
      de: "Pakete zustellen, ohne sie je zu berühren: anziehen und abstoßen, um jedes an Zügen, Zahnrädern und Wurmlöchern vorbei in den Briefkasten zu befördern. 30 Level und eine tägliche Herausforderung auf einer eigenen deterministischen Physik-Engine, mit einem Beam-Search-Solver, der jedes Level als lösbar beweist.",
    },
    stack: ["TypeScript", "Phaser 3", "Vite", "Capacitor", "Vitest", "Playwright"],
    image: "magnet-mail.jpg", link: "https://metur100.github.io/Magnet.Mail.Landing/",
  },
  {
    id: "wind-sculptor", initials: "WS", name: "Wind Sculptor", group: "game",
    tagline: { en: "Calm Physics Puzzle Game", de: "Entspanntes Physik-Puzzlespiel" },
    category: { en: "Game · Android · iOS", de: "Game · Android · iOS" },
    description: {
      en: "Swipe to make wind and blow drifting sand, leaves, snow and fireflies into a target shape before time runs out. 30 levels across several worlds, a daily challenge and a collection, all drawn and synthesized in code, with an auto-player that verifies every level can be beaten.",
      de: "Wischen erzeugt Wind, der Sand, Blätter, Schnee und Glühwürmchen in eine Zielform treibt, bevor die Zeit abläuft. 30 Level in mehreren Welten, eine tägliche Herausforderung und eine Sammlung, alles im Code gezeichnet und vertont, mit einem Auto-Player, der jedes Level als schaffbar prüft.",
    },
    stack: ["TypeScript", "Phaser 3", "Vite", "Capacitor", "Vitest", "Playwright"],
    image: "wind-sculptor.jpg", link: "https://metur100.github.io/Wind.Sculptor.Landing/",
  },
  {
    id: "goblin-janitor", initials: "GJ", name: "Goblin Janitor", group: "game",
    tagline: { en: "Turn-Based Dungeon Cleanup Puzzle", de: "Rundenbasiertes Dungeon-Aufräum-Puzzle" },
    category: { en: "Browser Game", de: "Browser-Game" },
    description: {
      en: "The heroes have left and somebody has to clean up. Twelve hand-built rooms: mop slime, sort loot into the right bins, disarm traps and find secret snacks, with move par, star ratings and undo. Offline-first, keyboard-playable and respectful of reduced motion.",
      de: "Die Helden sind weg, jemand muss aufräumen. Zwölf handgebaute Räume: Schleim wischen, Beute in die richtigen Kisten sortieren, Fallen entschärfen und geheime Snacks finden, mit Zug-Par, Sternwertung und Rückgängig. Offline-first, per Tastatur spielbar und mit Rücksicht auf reduzierte Bewegung.",
    },
    stack: ["React", "TypeScript", "Vite", "LocalStorage"],
    image: "goblin-janitor.jpg", link: null,
  },
  {
    id: "islam-apps", initials: "IA", name: "Islamic Learning Apps", group: "mobile", featured: true,
    tagline: { en: "Four Free, Offline Learning Apps", de: "Vier kostenlose Offline-Lern-Apps" },
    category: { en: "Android · iOS · Landing", de: "Android · iOS · Landing" },
    description: {
      en: "A suite of four free learning apps for children, teens and adults: an adventure game, an interactive prophets storybook, a knowledge RPG and the life of the Prophet. No ads, no purchases, no tracking, every lesson cites its sources, and everything works offline in Bosnian, German and English. A pre-rendered, multilingual landing site ties the apps together.",
      de: "Vier kostenlose Lern-Apps für Kinder, Jugendliche und Erwachsene: ein Abenteuerspiel, ein interaktives Prophetenbuch, ein Wissens-RPG und das Leben des Propheten. Keine Werbung, keine Käufe, kein Tracking, jede Lektion nennt ihre Quellen, alles funktioniert offline auf Bosnisch, Deutsch und Englisch. Eine vorgerenderte, mehrsprachige Landingpage bündelt die Apps.",
    },
    stack: ["Expo", "React Native", "TypeScript", "EAS", "React", "Vite"],
    image: "islam-apps.jpg", link: "https://metur100.github.io/Islam.Apps.Landing/",
  },
  {
    id: "lifedash", initials: "LD", name: "Life Dashboard", group: "web",
    tagline: { en: "Personal Life Organizer", de: "Persönliches Ablagesystem" },
    category: { en: "Web App · Full-Stack", de: "Web-App · Full-Stack" },
    description: {
      en: "A private dashboard that keeps life admin in one place: deadlines and alerts, documents, trips and bookings, appointments, family, savings and reminders, with Google Drive and Gmail scanning to pull things in automatically. Google sign-in with an allow-list, a .NET minimal API and SQL Server behind it.",
      de: "Ein privates Dashboard, das den Alltagskram bündelt: Fristen und Erinnerungen, Dokumente, Reisen und Buchungen, Termine, Familie und Sparziele, mit Google-Drive- und Gmail-Scan zum automatischen Erfassen. Google-Login mit Freigabeliste, dahinter eine .NET Minimal API und SQL Server.",
    },
    stack: ["React", "TypeScript", "Vite", ".NET 8", "EF Core", "MS SQL", "Google OAuth"],
    image: "lifedash.jpg", link: "https://lifedash-ui.certidevelopment.workers.dev/",
  },
  {
    id: "daily-gourmet", initials: "DG", name: "Daily Gourmet", group: "web",
    tagline: { en: "Catering Management SaaS", de: "Catering-Management-Plattform" },
    category: { en: "Web App · SaaS", de: "Web-App · SaaS" },
    description: {
      en: "A multi-tenant platform for catering companies, canteens and schools: menu planning, orders, production plans, recipes with allergens, label printing and driver tours, with separate portals for operators, drivers and client facilities.",
      de: "Eine mandantenfähige Plattform für Caterer, Kantinen und Schulen: Speiseplanung, Bestellungen, Produktionspläne, Rezepte mit Allergenen, Etikettendruck und Fahrertouren, mit eigenen Portalen für Betreiber, Fahrer und Einrichtungen.",
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "ASP.NET Core", "EF Core", "MS SQL"],
    image: "daily-gourmet.jpg", link: "https://daily-gourmet.vercel.app/",
  },
  {
    id: "dinobot-academy", initials: "DA", name: "Dinobot Academy", group: "game",
    tagline: { en: "Learning Games for Ages 2–5", de: "Lernspiele für 2- bis 5-Jährige" },
    category: { en: "Web · Kids", de: "Web · Kinder" },
    description: {
      en: "A playful learning app for small children with more than a dozen mini-games (memory, puzzles, shapes, letters, counting and first coding), prompts read aloud, all sounds generated in the browser, German and Bosnian, and full offline play.",
      de: "Eine verspielte Lern-App für kleine Kinder mit über einem Dutzend Minispielen (Memory, Puzzles, Formen, Buchstaben, Zählen und erstes Programmieren), vorgelesenen Aufgaben, im Browser erzeugten Sounds, auf Deutsch und Bosnisch und komplett offline spielbar.",
    },
    stack: ["React", "TypeScript", "Vite", "Web Audio"],
    image: "dinobot-academy.jpg", link: "https://metur100.github.io/Dinobot.Academy/",
  },
  {
    id: "debug-dash", initials: "DD", name: "Debug Dash", group: "game",
    tagline: { en: "60-Second Developer Runner", de: "60-Sekunden-Entwickler-Runner" },
    category: { en: "Browser Game", de: "Browser-Game" },
    description: {
      en: "A tiny endless runner for a developer audience: jump the bugs, grab the coffee, survive sixty seconds. One HTML file, plain JavaScript and Canvas, with no dependencies at all.",
      de: "Ein kleiner Endless-Runner für Entwickler: Bugs überspringen, Kaffee einsammeln, sechzig Sekunden überleben. Eine einzige HTML-Datei mit reinem JavaScript und Canvas, ganz ohne Abhängigkeiten.",
    },
    stack: ["JavaScript", "HTML5 Canvas"],
    image: "debug-dash.jpg", link: "https://metur100.github.io/Debug.Dash/",
  },
  {
    id: "coloring-book", initials: "CB", name: "Adijan's Coloring Book", group: "game",
    tagline: { en: "Coloring App for Kids", de: "Malbuch-App für Kinder" },
    category: { en: "Web · Kids", de: "Web · Kinder" },
    description: {
      en: "A friendly coloring book for children: pick or upload a picture and fill it in with bright colors, with sounds and simple, touch-friendly controls.",
      de: "Ein freundliches Malbuch für Kinder: Bild auswählen oder hochladen und mit kräftigen Farben ausmalen, mit Sounds und einfacher, touch-freundlicher Bedienung.",
    },
    stack: ["React", "Vite", "JavaScript", "Canvas"],
    image: "coloring-book.jpg", link: "https://metur100.github.io/Coloring.Book/",
  },
  {
    id: "income-calculator", initials: "IC", name: "Income & Cost Calculator", group: "web",
    tagline: { en: "Personal Budget Tool", de: "Persönliches Budget-Tool" },
    category: { en: "Web Tool", de: "Web-Tool" },
    description: {
      en: "A quick budgeting tool: group income sources, add income and cost lines, track shared costs and see the net total instantly. Everything is saved locally in the browser.",
      de: "Ein schnelles Budget-Tool: Einkommensquellen gruppieren, Einnahmen und Kosten erfassen, gemeinsame Kosten verfolgen und das Netto-Ergebnis sofort sehen. Alles wird lokal im Browser gespeichert.",
    },
    stack: ["React", "TypeScript", "LocalStorage"],
    image: "income-calculator.jpg", link: "https://metur100.github.io/Income.Calculator/",
  },
  {
    id: "bco-solutions", initials: "BC", name: "BCO Solutions", group: "landing",
    tagline: { en: "Private Chauffeur Service, Munich", de: "Privater Chauffeurservice, München" },
    category: { en: "Landing Page", de: "Landingpage" },
    description: {
      en: "Website for a Munich chauffeur and travel-services company: limousine service, airport transfers, group transport, host and hostess staff and VIP meet & greet, in German and English, with SEO metadata per page and a sticky contact bar.",
      de: "Website für einen Münchner Chauffeur- und Reiseservice: Limousinenservice, Flughafentransfers, Gruppentransporte, Host- und Hostessenservice sowie VIP Meet & Greet, auf Deutsch und Englisch, mit SEO-Metadaten pro Seite und fester Kontaktleiste.",
    },
    stack: ["React", "TypeScript", "Vite", "React Router", "GitHub Pages"],
    image: "bco-solutions.jpg", link: "https://bcosolution.com/",
  },
  {
    id: "gelenkwerk", initials: "GW", name: "Gelenkwerk", group: "landing",
    tagline: { en: "Physiotherapy Practice, Basel", de: "Physiotherapie-Praxis, Basel" },
    category: { en: "Landing Page", de: "Landingpage" },
    description: {
      en: "Website for a physiotherapy and massage practice in Basel, with treatment pages, an online booking form that emails the practice, and subtle three.js motion in the hero.",
      de: "Website für eine Praxis für Physiotherapie und Massage in Basel, mit Behandlungsseiten, einem Online-Buchungsformular mit E-Mail-Versand und dezenten three.js-Animationen im Hero.",
    },
    stack: ["Next.js", "Tailwind", "Framer Motion", "three.js", "Nodemailer"],
    image: "gelenkwerk.jpg", link: "https://www.gelenkwerk.ch/",
  },
  {
    id: "skinbloom-aesthetics", initials: "SA", name: "Skinbloom Aesthetics", group: "landing",
    tagline: { en: "Aesthetics Clinic Website", de: "Website einer Ästhetik-Praxis" },
    category: { en: "Landing Page", de: "Landingpage" },
    description: {
      en: "The multilingual marketing site for an aesthetics clinic in Basel: treatment pages, pricing, blog and reviews, connected to the Skinbloom booking system.",
      de: "Die mehrsprachige Website einer Ästhetik-Praxis in Basel: Behandlungsseiten, Preise, Blog und Bewertungen, angebunden an das Skinbloom-Buchungssystem.",
    },
    stack: ["Next.js", "JavaScript", "next-intl"],
    image: "skinbloom-aesthetics.jpg", link: "https://www.skinbloom-aesthetics.ch/",
  },
  {
    id: "aps-media", initials: "AP", name: "APS Media", group: "landing",
    tagline: { en: "Advertising & Signage Studio", de: "Werbe- und Schilderstudio" },
    category: { en: "Landing Page", de: "Landingpage" },
    description: {
      en: "A bold one-page site for an advertising studio in Tešanj: billboards, illuminated signs, 3D letters, branding and video, with motion-driven sections and a static export.",
      de: "Eine markante One-Page-Website für ein Werbestudio in Tešanj: Werbetafeln, Leuchtreklamen, 3D-Buchstaben, Branding und Video, mit animierten Bereichen und statischem Export.",
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"],
    image: "aps-media.jpg", link: "https://metur100.github.io/APS.Media/",
  },
  {
    id: "ikc-duesseldorf", initials: "IK", name: "IKC Düsseldorf", group: "landing",
    tagline: { en: "Community Website with Prayer Times", de: "Gemeinde-Website mit Gebetszeiten" },
    category: { en: "Website", de: "Website" },
    description: {
      en: "A bilingual (Bosnian/German) website for a Bosnian community association in Düsseldorf, with live prayer times fetched through a small serverless proxy and a fallback source.",
      de: "Eine zweisprachige (Bosnisch/Deutsch) Website für einen bosnischen Gemeindeverein in Düsseldorf, mit Live-Gebetszeiten über einen kleinen Serverless-Proxy und eine Ausweichquelle.",
    },
    stack: ["React", "TypeScript", "Vite", "React Router", "Serverless"],
    image: "ikc-duesseldorf.jpg", link: "https://metur100.github.io/IKC.Duesseldorf/",
  },
  {
    id: "ofbk", initials: "OF", name: "OFBK Offenbach", group: "landing",
    tagline: { en: "Cultural Association Website", de: "Website eines Kulturvereins" },
    category: { en: "Website", de: "Website" },
    description: {
      en: "A bilingual (German/Turkish) website for an education and cultural association in Offenbach, with a prayer-time calendar, Friday prayer notices, events and visitor information.",
      de: "Eine zweisprachige (Deutsch/Türkisch) Website für einen Bildungs- und Kulturverein in Offenbach, mit Gebetszeiten-Kalender, Hinweisen zum Freitagsgebet, Terminen und Besucherinformationen.",
    },
    stack: ["Next.js", "React", "Tailwind", "Static Export"],
    image: "ofbk.jpg", link: "https://metur100.github.io/OFBK.Moschee/",
  },
];

export const FILTER_GROUPS = ["all", "web", "mobile", "cloud", "landing", "game"] as const;
export type FilterGroup = (typeof FILTER_GROUPS)[number];

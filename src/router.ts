import { useEffect, useState } from "react";

export const SECTION_ROUTES = ["about", "services", "path", "contact"] as const;
export type SectionRoute = (typeof SECTION_ROUTES)[number];
export type Route = "home" | "projects" | "certifications" | SectionRoute;

const ROUTES: Route[] = ["projects", "certifications", ...SECTION_ROUTES];
/* old links to the former Work page land on the project archive */
const ALIASES: Record<string, Route> = { work: "projects" };

function parseHash(): Route {
  const h = (window.location.hash || "").replace(/^#\/?/, "");
  const key = h.split("/")[0];
  return ALIASES[key] ?? ROUTES.find((r) => key === r) ?? "home";
}

export function useRoute() {
  const [route, setRoute] = useState<Route>(() => parseHash());
  useEffect(() => {
    const on = () => setRoute(parseHash());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

export function navTo(route: Route) {
  const hash = route === "home" ? "#/" : `#/${route}`;
  window.location.hash = hash;
}

import { useEffect, useState } from "react";

export type Route = "home" | "projects" | "certifications";

function parseHash(): Route {
  const h = (window.location.hash || "").replace(/^#\/?/, "");
  if (h.startsWith("projects")) return "projects";
  if (h.startsWith("certifications")) return "certifications";
  return "home";
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

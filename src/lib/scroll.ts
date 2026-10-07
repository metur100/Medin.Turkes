import Lenis from "lenis";

/* Single Lenis instance shared across the app. Components never touch it
   directly — they call these helpers, which fall back to native scrolling
   when smooth scroll is disabled (reduced motion). */
let lenis: Lenis | null = null;

export const setLenis = (l: Lenis | null) => { lenis = l; };
export const getLenis = () => lenis;

export function scrollToTarget(target: string | number, immediate = false) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, immediate, easing: (t) => 1 - Math.pow(1 - t, 4) });
    return;
  }
  const behavior: ScrollBehavior = immediate ? "auto" : "smooth";
  if (typeof target === "number") window.scrollTo({ top: target, behavior });
  else document.querySelector(target)?.scrollIntoView({ behavior });
}

export function lockScroll(locked: boolean) {
  if (lenis) { locked ? lenis.stop() : lenis.start(); }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

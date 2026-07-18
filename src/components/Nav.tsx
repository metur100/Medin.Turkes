import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLang, Lang } from "../i18n";
import { navTo, useRoute } from "../router";

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const route = useRoute();
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.3 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const homeLinks: [string, string][] = [
    ["#timeline", t.nav.timeline],
    ["#focus", t.nav.focus],
    ["#work", t.nav.work],
    ["#contact", t.nav.contact],
  ];

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <motion.div className="nav-progress" style={{ scaleX: progress }} aria-hidden />

      <a href="#/" className="nav-brand" onClick={(e) => { e.preventDefault(); navTo("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
        <span className="nav-mark">MT</span>
        
      </a>

      <div className="nav-links" aria-label="Primary">
        {route === "home" ? (
          <>
            {homeLinks.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
            <a href="#/projects" onClick={(e) => { e.preventDefault(); navTo("projects"); }}>{t.nav.allProjects}</a>
            <a href="#/certifications" onClick={(e) => { e.preventDefault(); navTo("certifications"); }}>{t.nav.certifications}</a>
          </>
        ) : (
          <>
            <a href="#/" onClick={(e) => { e.preventDefault(); navTo("home"); }}>{lang === "de" ? "Start" : "Home"}</a>
            <a href="#/projects" onClick={(e) => { e.preventDefault(); navTo("projects"); }}>{t.nav.allProjects}</a>
            <a href="#/certifications" onClick={(e) => { e.preventDefault(); navTo("certifications"); }}>{t.nav.certifications}</a>
          </>
        )}
      </div>

      <div className="nav-right">
        <div className="lang-toggle" role="group" aria-label="Language">
          {(["en", "de"] as Lang[]).map((l) => (
            <button key={l} className={lang === l ? "on" : ""} onClick={() => setLang(l)} aria-pressed={lang === l}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

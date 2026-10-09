import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useLang, Lang } from "../i18n";
import { navTo, Route, useRoute } from "../router";
import { EASE, EASE_IN_OUT, useIntroDone } from "../lib/motion";
import { lockScroll, scrollToTarget } from "../lib/scroll";
import Magnetic from "./fx/Magnetic";
import { Roll } from "./fx/Text";

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const route = useRoute();
  const ready = useIntroDone();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.3 });

  /* Tuck away while reading downward, return on any upward scroll. */
  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 40);
    setHidden(v > prev && v > 400);
  });

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [open]);
  useEffect(() => { setOpen(false); }, [route]);

  const pages: [Route, string][] = [
    ["about", t.nav.about],
    ["services", t.nav.focus],
    ["projects", t.nav.work],
    ["path", t.nav.timeline],
    ["certifications", t.nav.certifications],
  ];

  const goPage = (r: Route) => {
    setOpen(false);
    if (r === route) scrollToTarget(0);
    else navTo(r);
  };

  const menuLinks: { label: string; act: () => void }[] = [
    ...pages.slice(0, 4).map(([r, label]) => ({ label, act: () => goPage(r) })),
    { label: t.nav.contact, act: () => goPage("contact") },
    ...pages.slice(4).map(([r, label]) => ({ label, act: () => goPage(r) })),
  ];

  return (
    <>
      <motion.header
        className={`nav${scrolled ? " is-scrolled" : ""}${hidden && !open ? " is-hidden" : ""}${open ? " is-open" : ""}`}
        initial={{ y: -30, opacity: 0 }} animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: EASE, delay: 0.9 }}>
        <motion.div className="nav-progress" style={{ scaleX: progress }} aria-hidden />

        <a href="#/" className="nav-brand" onClick={(e) => { e.preventDefault(); goPage("home"); }} aria-label="Medin Turkes — home">
          <span className="nav-mark">MT</span>
          <span className="nav-brand-name"><Roll>Medin Turkes</Roll></span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {pages.map(([r, label]) => (
            <a key={r} href={`#/${r}`} className={route === r ? "is-active" : ""} aria-current={route === r ? "page" : undefined}
              onClick={(e) => { e.preventDefault(); goPage(r); }}><Roll>{label}</Roll></a>
          ))}
        </nav>

        <div className="nav-right">
          <div className="lang-toggle mono" role="group" aria-label="Language">
            {(["en", "de"] as Lang[]).map((l) => (
              <button key={l} className={lang === l ? "on" : ""} onClick={() => setLang(l)} aria-pressed={lang === l}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Magnetic strength={0.25} className="nav-cta-wrap">
            <a href="#/contact" className="nav-cta" onClick={(e) => { e.preventDefault(); goPage("contact"); }}>
              <i className="pulse" aria-hidden /><Roll>{t.nav.talk}</Roll>
            </a>
          </Magnetic>
          <button className="nav-burger" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}>
            <span /><span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" className="menu" data-lenis-prevent
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }} animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }} transition={{ duration: 0.8, ease: EASE_IN_OUT }}>
            <ul className="menu-list">
              {menuLinks.map((l, i) => (
                <li key={l.label} className="sw">
                  <motion.button className="sw-i" onClick={l.act}
                    initial={{ y: "110%" }} animate={{ y: 0 }} exit={{ y: "110%" }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.05 }}>
                    <span className="menu-idx mono">0{i + 1}</span>{l.label}
                  </motion.button>
                </li>
              ))}
            </ul>
            <motion.div className="menu-foot mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ delay: 0.6 }}>
              <a href="mailto:medinturkes@gmail.com">medinturkes@gmail.com</a>
              <span>Düsseldorf, DE</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

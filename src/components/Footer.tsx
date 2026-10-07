import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "../i18n";
import { useLocalTime } from "../lib/motion";
import { scrollToTarget } from "../lib/scroll";
import { navTo, Route } from "../router";
import { Roll } from "./fx/Text";

export default function Footer() {
  const { t } = useLang();
  const time = useLocalTime();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);
  const nameY = useTransform(scrollYProgress, [0.2, 1], ["60%", "0%"]);

  const pages: [Route, string][] = [["home", t.nav.home], ["projects", t.nav.allProjects], ["certifications", t.nav.certifications]];
  const socials = t.contact.links.filter((l) => l.href?.startsWith("http"));

  return (
    <footer className="footer" ref={ref}>
      <motion.div className="footer-in" style={{ y }}>
        <div className="wrap footer-grid">
          <div className="footer-col">
            <span className="footer-k mono">Index</span>
            {pages.map(([r, label]) => (
              <a key={r} href={r === "home" ? "#/" : `#/${r}`} onClick={(e) => { e.preventDefault(); navTo(r); }}><Roll>{label}</Roll></a>
            ))}
          </div>
          <div className="footer-col">
            <span className="footer-k mono">Social</span>
            {socials.map((l) => (
              <a key={l.k} href={l.href!} target="_blank" rel="noopener noreferrer"><Roll>{l.k}</Roll></a>
            ))}
            <a href="mailto:medinturkes@gmail.com"><Roll>Email</Roll></a>
          </div>
          <div className="footer-col">
            <span className="footer-k mono">{t.footer.time}</span>
            <span className="footer-time">Düsseldorf · {time}</span>
          </div>
          <div className="footer-col footer-col-end">
            <button className="footer-top mono" onClick={() => scrollToTarget(0)}>
              <Roll>{t.footer.top}</Roll> <span aria-hidden>↑</span>
            </button>
          </div>
        </div>

        <div className="footer-mark" aria-hidden>
          <motion.span style={{ y: nameY }}>Medin Turkes</motion.span>
        </div>

        <div className="wrap footer-base mono">
          <span>© {new Date().getFullYear()} Medin Turkes</span>
          <span>{t.footer.built}</span>
        </div>
      </motion.div>
    </footer>
  );
}

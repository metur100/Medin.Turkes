import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLang } from "../i18n";
import { EASE } from "../lib/motion";
import { Eyebrow, SplitReveal } from "./fx/Text";

export default function Timeline() {
  const { t } = useLang();
  const s = t.timeline;
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });

  return (
    <section className="path" id="timeline">
      <div className="wrap">
        <div className="sec-head">
          <Eyebrow index="05" label={s.eyebrow} />
          <SplitReveal as="h2" className="sec-title" text={s.title} />
        </div>

        <ol className="path-list" ref={ref}>
          <span className="path-rail" aria-hidden><motion.i style={{ scaleY: fill }} /></span>
          {s.items.map((it, i) => (
            <motion.li className="path-row" key={it.year + it.title}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 1, ease: EASE, delay: 0.05 * i }}>
              <span className="path-node" aria-hidden />
              <div className="path-year" aria-label={it.year}>
                <span className="path-year-ghost" aria-hidden>{it.year}</span>
                <motion.span className="path-year-fill" aria-hidden
                  initial={{ clipPath: "inset(0% 100% 0% 0%)" }} whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  viewport={{ once: true, margin: "0px 0px -25% 0px" }}
                  transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}>
                  {it.year}
                </motion.span>
              </div>
              <div className="path-main">
                <span className={`path-cat mono is-${it.category}`}>
                  {it.category === "education" ? s.educationLabel : s.workLabel}
                </span>
                <h3>{it.title}</h3>
                <p className="path-org mono">{it.org}</p>
              </div>
              <ul className="path-points">
                {it.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

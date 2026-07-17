import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLang } from "../i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

type TlItem = { year: string; category: string; title: string; org: string; points: string[] };

function TlColumn({ heading, items }: { heading: string; items: TlItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  return (
    <div className="tl-col">
      <h3 className="tl-col-head">{heading}</h3>
      <div className="tl-col-body" ref={ref}>
        <div className="tl-line-track"><motion.div className="tl-line-fill" style={{ scaleY }} /></div>
        <div className="tl-items">
          {items.map((it, i) => (
            <motion.article className="tl-card" key={it.year + it.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}>
              <span className="tl-dot" aria-hidden />
              <span className="tl-year">{it.year}</span>
              <h3>{it.title}</h3>
              <p className="org">{it.org}</p>
              <ul>{it.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  const { t } = useLang();
  const s = t.timeline;
  const education = s.items.filter((it) => it.category === "education");
  const work = s.items.filter((it) => it.category === "work");

  return (
    <section className="spot-sec" id="timeline">
      <div className="wrap">
        <motion.div className="sec-head"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: EASE }}>
          <p className="eyebrow"><span className="idx">01</span> / {s.eyebrow}</p>
          <h2 className="sec-title">{s.title}</h2>
        </motion.div>

        <div className="tl-columns">
          <TlColumn heading={s.educationLabel} items={education} />
          <TlColumn heading={s.workLabel} items={work} />
        </div>
      </div>
    </section>
  );
}

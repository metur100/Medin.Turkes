import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Focus() {
  const { t } = useLang();
  const s = t.focus;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="spot-sec" id="focus">
      <div className="wrap">
        <motion.div className="sec-head"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: EASE }}>
          <p className="eyebrow"><span className="idx">03</span> / {s.eyebrow}</p>
          <h2 className="sec-title">{s.title}</h2>
        </motion.div>

        <div className="focus-list">
          {s.pillars.map((p, i) => {
            const isOpen = open === i;
            return (
              <motion.div className="focus-item" key={p.t}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.9, ease: EASE, delay: i * 0.05 }}>
                <button className="focus-row" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                  <span className="focus-num" aria-hidden>{p.n}</span>
                  <h3>{p.t}</h3>
                  <span className={`focus-toggle${isOpen ? " open" : ""}`} aria-hidden>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div className="focus-panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <p>{p.d}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

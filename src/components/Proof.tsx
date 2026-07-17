import { motion } from "framer-motion";
import { useLang } from "../i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Proof() {
  const { t } = useLang();
  const s = t.proof;

  return (
    <section className="spot-sec spot-sec-tight" id="proof">
      <div className="wrap">
        <motion.p className="eyebrow proof-eyebrow"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: EASE }}>
          <span className="idx">02</span> / {s.eyebrow}
        </motion.p>

        <div className="proof-stats">
          {s.stats.map((st, i) => (
            <motion.div className="proof-stat" key={st.l}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}>
              <b>{st.v}</b>
              <span>{st.l}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

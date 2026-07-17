import { motion } from "framer-motion";
import { useLang } from "../i18n";
import { useMagnetic } from "./useMagnetic";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const { t } = useLang();
  const s = t.contact;
  const cta = useMagnetic(18);

  return (
    <section className="spot-sec spot-sec-close" id="contact">
      <div className="noir-glow noir-glow-close" aria-hidden />
      <div className="wrap noir-close">
        <motion.p className="eyebrow"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: EASE }}>
          <span className="idx">05</span> / {s.eyebrow}
        </motion.p>

        <motion.h2 className="sec-title noir-close-title"
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: EASE, delay: 0.1 }}>
          {s.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: EASE, delay: 0.28 }}>
          <motion.a
            href="mailto:medinturkes@gmail.com" className="btn btn-primary magnetic noir-close-btn"
            ref={cta.ref} style={{ x: cta.x, y: cta.y }}
            onMouseMove={cta.onMouseMove} onMouseLeave={cta.onMouseLeave}
          >
            {s.send}
          </motion.a>
        </motion.div>

        <motion.div className="noir-channels mono"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }} transition={{ duration: 1, delay: 0.5 }}>
          {s.links.map((l, i) => (
            <span key={l.k}>
              {l.href ? (
                <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{l.v}</a>
              ) : (
                <span>{l.v}</span>
              )}
              {i < s.links.length - 1 && <i aria-hidden>·</i>}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

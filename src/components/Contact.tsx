import { motion } from "framer-motion";
import { useLang } from "../i18n";
import { EASE } from "../lib/motion";
import ShaderCanvas from "./fx/ShaderCanvas";
import Magnetic from "./fx/Magnetic";
import { Eyebrow, Roll, SplitReveal } from "./fx/Text";

export default function Contact() {
  const { t } = useLang();
  const s = t.contact;

  return (
    <section className="contact" id="contact">
      <div className="contact-bg"><ShaderCanvas accent={0.8} /></div>
      <div className="grain" aria-hidden />

      <div className="wrap contact-in">
        <Eyebrow index="06" label={s.eyebrow} />
        <SplitReveal as="h2" className="contact-title" text={s.title} stagger={0.06} duration={1.2} />

        <div className="contact-row">
          <motion.p className="contact-sub"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 1, ease: EASE, delay: 0.3 }}>
            {s.sub}
          </motion.p>

          <motion.div initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}>
            <Magnetic strength={0.4}>
              <a href="mailto:medinturkes@gmail.com" className="orb orb-accent">
                <span className="orb-arrow" aria-hidden>↗</span>
                <span className="orb-label"><Roll>{s.send}</Roll></span>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <ul className="contact-links">
          {s.links.map((l, i) => (
            <motion.li key={l.k}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -5% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.07 }}>
              <span className="contact-k mono">{l.k}</span>
              {l.href ? (
                <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="contact-v">
                  <Roll>{l.v}</Roll>
                </a>
              ) : (
                <span className="contact-v">{l.v}</span>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

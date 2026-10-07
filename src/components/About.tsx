import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useLang } from "../i18n";
import { EASE } from "../lib/motion";
import { Eyebrow, plain, richWords } from "./fx/Text";
import Counter from "./fx/Counter";

function Word({ children, em, progress, range }: { children: string; em: boolean; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return <motion.span className={em ? "serif" : undefined} style={{ opacity, y, display: "inline-block" }}>{children}</motion.span>;
}

/* Manifesto paragraph that "reads itself": each word lights up as the
   paragraph travels through the viewport. */
export default function About() {
  const { t } = useLang();
  const s = t.about;
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = richWords(s.text);

  return (
    <section className="about panel-light" id="about">
      <div className="wrap">
        <Eyebrow index="01" label={s.eyebrow} light />

        <p className="about-text" ref={ref}>
          <span className="sr-only">{plain(s.text)}</span>
          {words.map((w, i) => (
            <span key={i} aria-hidden>
              <Word em={w.em} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w.w}</Word>{w.space ? " " : null}
            </span>
          ))}
        </p>

        <div className="about-stats">
          {s.stats.map((st, i) => (
            <motion.div className="about-stat" key={st.l}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.09 }}>
              <span className="about-stat-v"><Counter value={st.v} suffix={st.s} /></span>
              <span className="about-stat-l mono">{st.l}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useRef, useState } from "react";
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

  /* Framed portrait: wipes in once, then drifts slightly inside its frame. */
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress: framePass } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const photoY = useTransform(framePass, [0, 1], ["-6%", "6%"]);
  const [photoFail, setPhotoFail] = useState(false);

  return (
    <section className="about panel-light" id="about">
      <div className="wrap">
        <Eyebrow index="01" label={s.eyebrow} light />

        <div className="about-grid">
        <p className="about-text" ref={ref}>
          <span className="sr-only">{plain(s.text)}</span>
          {words.map((w, i) => (
            <span key={i} aria-hidden>
              <Word em={w.em} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w.w}</Word>{w.space ? " " : null}
            </span>
          ))}
        </p>

        <motion.figure className="about-portrait" ref={frame}
          initial={{ clipPath: "inset(100% 0% 0% 0% round 24px)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)" }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.4, ease: EASE }}>
          {!photoFail ? (
            <motion.img src={`${import.meta.env.BASE_URL}images/profile.png`} alt="Medin Turkes"
              style={{ y: photoY }} loading="lazy" onError={() => setPhotoFail(true)} />
          ) : (
            <span className="about-portrait-fallback">MT</span>
          )}
          <figcaption className="mono">Medin Turkes · Düsseldorf</figcaption>
        </motion.figure>
        </div>

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

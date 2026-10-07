import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useLang } from "../i18n";
import { EASE } from "../lib/motion";
import { Eyebrow, SplitReveal } from "./fx/Text";

/* Abstract line glyphs, one per service, drawn on as the card arrives. */
const GLYPHS: string[][] = [
  ["M10 22h100v76H10z", "M10 36h100", "M18 29h4M26 29h4M34 29h4", "M22 48h36v38H22z", "M66 48h32M66 60h32M66 72h20"],
  ["M14 98V40h92v58", "M30 28h60", "M42 16h36", "M30 84l22-22 14 12 24-26", "M80 48h10v10"],
  ["M38 10h44a6 6 0 0 1 6 6v88a6 6 0 0 1-6 6H38a6 6 0 0 1-6-6V16a6 6 0 0 1 6-6z", "M52 18h16", "M44 34h32v22H44z", "M44 66h32M44 76h22", "M56 98h8"],
  ["M60 20a40 40 0 1 1 0 80a40 40 0 1 1 0-80z", "M60 42v36M42 60h36", "M60 42l6 6M60 42l-6 6", "M90 30l8-8M30 90l-8 8"],
  ["M34 76a18 18 0 0 1 4-35a24 24 0 0 1 46 6a15 15 0 0 1 2 29z", "M60 76v22", "M40 98h40", "M40 98v8M60 98v8M80 98v8"],
];

function Glyph({ i }: { i: number }) {
  return (
    <svg className="svc-glyph" viewBox="0 0 120 120" fill="none" aria-hidden>
      {GLYPHS[i % GLYPHS.length].map((d, k) => (
        <motion.path key={k} d={d} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.2 + k * 0.12 }} />
      ))}
    </svg>
  );
}

type Pillar = { n: string; t: string; d: string; tags: string[] };

function Card({ p, i, total, progress }: { p: Pillar; i: number; total: number; progress: MotionValue<number> }) {
  const target = 1 - (total - i - 1) * 0.035;
  const scale = useTransform(progress, [i / total, 1], [1, target]);
  const dim = useTransform(progress, [i / total, Math.min(1, (i + 1.2) / total)], [0, i === total - 1 ? 0 : 0.45]);

  return (
    <div className="svc-sticky" style={{ top: `calc(13vh + ${i * 26}px)` }}>
      <motion.article className="svc-card" style={{ scale }}>
        <motion.div className="svc-dim" style={{ opacity: dim }} aria-hidden />
        <div className="svc-top">
          <span className="svc-num">{p.n}</span>
          <span className="svc-count mono">{p.n} / {String(total).padStart(2, "0")}</span>
        </div>
        <div className="svc-body">
          <div className="svc-text">
            <h3 className="svc-title">{p.t}</h3>
            <p className="svc-desc">{p.d}</p>
            <ul className="svc-tags">
              {p.tags.map((tag) => <li key={tag} className="mono">{tag}</li>)}
            </ul>
          </div>
          <Glyph i={i} />
        </div>
      </motion.article>
    </div>
  );
}

export default function Focus() {
  const { t } = useLang();
  const s = t.focus;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="svc" id="focus">
      <div className="wrap">
        <div className="sec-head">
          <Eyebrow index="02" label={s.eyebrow} />
          <SplitReveal as="h2" className="sec-title" text={s.title} />
        </div>

        <div className="svc-stack" ref={ref}>
          {s.pillars.map((p, i) => (
            <Card key={p.n} p={p} i={i} total={s.pillars.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

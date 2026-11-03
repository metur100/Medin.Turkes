import { useLayoutEffect, useRef, useState } from "react";
import { motion, MotionValue, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useLang } from "../i18n";
import { PROJECTS, Project } from "../data/projects";
import { EASE, useMediaQuery } from "../lib/motion";
import { navTo } from "../router";
import ProjImage from "./ProjImage";
import Magnetic from "./fx/Magnetic";
import { Eyebrow, Roll, SplitReveal } from "./fx/Text";

const CURATED = ["teretnjaci", "starfall-grove", "daily-gourmet", "skinbloom", "bco-solutions"];

function WorkCard({ p, i, total, progress }: { p: Project; i: number; total: number; progress?: MotionValue<number> }) {
  const { lang, t } = useLang();
  const center = total > 1 ? i / (total - 1) : 0;
  const fallback = useMotionValue(0);
  const imgX = useTransform(progress ?? fallback, [center - 0.5, center + 0.5], ["9%", "-9%"]);

  const body = (
    <>
      <div className="wcard-media">
        <motion.div className="wcard-img" style={progress ? { x: imgX } : undefined}>
          <ProjImage src={p.image} initials={p.initials} alt={p.name} />
        </motion.div>
        <div className="wcard-shade" aria-hidden />
        <span className="wcard-idx mono">{String(i + 1).padStart(2, "0")}</span>
        <span className="wcard-cat mono">{p.category[lang]}</span>
      </div>
      <div className="wcard-info">
        <div>
          <h3 className="wcard-name">{p.name}</h3>
          <p className="wcard-tag">{p.tagline[lang]}</p>
        </div>
        <div className="wcard-side">
          <ul className="wcard-stack">
            {p.stack.slice(0, 3).map((x) => <li key={x} className="mono">{x}</li>)}
          </ul>
          <span className="wcard-cta mono">{p.link ? <>{t.work.visit} ↗</> : t.work.noLink}</span>
        </div>
      </div>
    </>
  );

  return p.link ? (
    <a className="wcard" href={p.link} target="_blank" rel="noopener noreferrer" data-cursor={t.work.visit}>{body}</a>
  ) : (
    <article className="wcard is-static">{body}</article>
  );
}

function SeeAll() {
  const { t } = useLang();
  return (
    <div className="wcard-more">
      <Magnetic strength={0.3}>
        <a href="#/projects" className="orb" onClick={(e) => { e.preventDefault(); navTo("projects"); }}>
          <span className="orb-arrow" aria-hidden>→</span>
          <span className="orb-label"><Roll>{t.work.seeAll}</Roll></span>
        </a>
      </Magnetic>
    </div>
  );
}

function Horizontal({ items }: { items: Project[] }) {
  const { t } = useLang();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [items.length]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.35 });
  const x = useTransform(smooth, (v) => -v * distance);
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(items.length - 1, Math.round(v * (items.length - 0.2))));
  });

  return (
    <section className="hwork" id="work" ref={section} style={{ height: `calc(${distance}px + 100vh)` }}>
      <div className="hwork-sticky">
        <div className="hwork-head wrap">
          <div>
            <Eyebrow index="03" label={t.work.eyebrow} />
            <SplitReveal as="h2" className="sec-title" text={t.work.title} />
          </div>
          <div className="hwork-meta mono">
            <span className="hwork-count">
              <span className="hwork-count-cur">{String(active + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
            </span>
            <span className="hwork-bar"><motion.i style={{ scaleX: bar }} /></span>
            <span className="hwork-hint">{t.work.hint} ↓</span>
          </div>
        </div>

        <motion.div className="hwork-track" ref={track} style={{ x }}>
          {items.map((p, i) => <WorkCard key={p.id} p={p} i={i} total={items.length} progress={smooth} />)}
          <SeeAll />
        </motion.div>
      </div>
    </section>
  );
}

function Vertical({ items }: { items: Project[] }) {
  const { t } = useLang();
  return (
    <section className="vwork" id="work">
      <div className="wrap">
        <div className="sec-head">
          <Eyebrow index="03" label={t.work.eyebrow} />
          <SplitReveal as="h2" className="sec-title" text={t.work.title} />
        </div>
        <div className="vwork-list">
          {items.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 60, clipPath: "inset(12% 0% 0% 0%)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.1, ease: EASE }}>
              <WorkCard p={p} i={i} total={items.length} />
            </motion.div>
          ))}
        </div>
        <SeeAll />
      </div>
    </section>
  );
}

export default function SignatureWork() {
  const wide = useMediaQuery("(min-width: 900px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const items = CURATED.map((id) => PROJECTS.find((p) => p.id === id)).filter((p): p is Project => Boolean(p));
  return wide && !reduced ? <Horizontal items={items} /> : <Vertical items={items} />;
}

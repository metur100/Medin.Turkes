import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useLang } from "../i18n";
import { EASE, useIntroDone, useLocalTime } from "../lib/motion";
import { scrollToTarget } from "../lib/scroll";
import ShaderCanvas from "./fx/ShaderCanvas";
import Magnetic from "./fx/Magnetic";
import { Roll, SplitReveal } from "./fx/Text";

const NAME = "Medin Turkes";

/* One masked line of the headline; rises into place after the preloader. */
function HeadLine({ children, delay, ready, className }: { children: React.ReactNode; delay: number; ready: boolean; className?: string }) {
  return (
    <span className={`hero-head-line ${className ?? ""}`}>
      <motion.span className="hero-head-in"
        initial={{ y: "110%" }} animate={ready ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 1.2, ease: EASE, delay }}>
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const { t } = useLang();
  const ready = useIntroDone();
  const time = useLocalTime();
  const [word, setWord] = useState(0);
  const words = t.hero.headWords;

  /* The hero is sticky; the next section slides over it. Progress runs
     0 → 1 across the first viewport of scroll. */
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (v) => Math.min(Math.max(v / window.innerHeight, 0), 1));
  const smooth = useSpring(progress, { stiffness: 120, damping: 30, mass: 0.4 });
  const innerScale = useTransform(smooth, [0, 1], [1, 0.9]);
  const innerY = useTransform(smooth, [0, 1], ["0vh", "-8vh"]);
  const innerOpacity = useTransform(smooth, [0, 0.85], [1, 0.15]);
  const nameSpread = useTransform(smooth, [0, 1], ["-0.055em", "0.02em"]);
  const fade = useTransform(progress, [0, 1], [1, 0.25]);

  /* Once the next section fully covers the hero, stop painting it (and its
     shader) so scrolling the rest of the page costs nothing extra. */
  const [covered, setCovered] = useState(false);
  useMotionValueEvent(progress, "change", (v) => setCovered(v >= 1));

  useEffect(() => {
    if (!ready) return;
    const id = window.setInterval(() => setWord((w) => (w + 1) % words.length), 2600);
    return () => window.clearInterval(id);
  }, [ready, words.length]);

  const show = ready ? "show" : "hidden";
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section className={`hero${covered ? " is-covered" : ""}`} id="top">
      <div className="hero-bg">
        <ShaderCanvas fade={fade} paused={covered} />
        <motion.div className="hero-bg-veil" initial={{ opacity: 1 }} animate={{ opacity: ready ? 0 : 1 }} transition={{ duration: 2.2, ease: EASE }} />
      </div>
      <div className="grain" aria-hidden />

      <motion.div className="hero-inner" style={{ scale: innerScale, y: innerY, opacity: innerOpacity }}>
        <div className="hero-meta mono">
          <motion.span {...fadeUp(0.5)}>{t.hero.kicker}</motion.span>
          <motion.span {...fadeUp(0.58)} className="hero-meta-mid">{t.hero.based} <b>· {time}</b></motion.span>
          <motion.span {...fadeUp(0.66)} className="hero-meta-end"><i className="pulse" aria-hidden />{t.hero.available}</motion.span>
        </div>

        <p className="hero-head" aria-label={`${t.hero.headPre} ${words.join(", ")} ${t.hero.headPost}`}>
          <HeadLine ready={ready} delay={0.2}>{t.hero.headPre}</HeadLine>
          <HeadLine ready={ready} delay={0.3} className="hero-head-word">
            <AnimatePresence mode="wait" initial={false}>
              <motion.em key={word} className="serif"
                initial={{ y: "105%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} exit={{ y: "-105%", opacity: 0 }}
                transition={{ duration: 0.65, ease: EASE }}>
                {words[word]}
              </motion.em>
            </AnimatePresence>
          </HeadLine>
          <HeadLine ready={ready} delay={0.4}>{t.hero.headPost}</HeadLine>
        </p>

        <div className="hero-mid">
          <div className="hero-statement">
            <SplitReveal as="p" text={t.hero.statement} play={ready} delay={0.7} stagger={0.016} duration={0.9} />
          </div>
          <motion.div className="hero-ctas" {...fadeUp(1.05)}>
            <Magnetic>
              <a href="#work" className="btn btn-light" onClick={(e) => { e.preventDefault(); scrollToTarget("#work"); }}>
                <Roll>{t.hero.viewWork}</Roll><span className="btn-arrow" aria-hidden>↘</span>
              </a>
            </Magnetic>
            <a href="#contact" className="link-line" onClick={(e) => { e.preventDefault(); scrollToTarget("#contact"); }}>
              <Roll>{t.hero.talk}</Roll>
            </a>
          </motion.div>
        </div>

        <motion.h1 className="hero-name" aria-label={NAME} style={{ letterSpacing: nameSpread }}
          initial="hidden" animate={show}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.25 } } }}>
          {NAME.split("").map((ch, i) => (
            <span className="hero-name-mask" key={i} aria-hidden>
              <motion.span className="hero-name-ch"
                variants={{ hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 1.3, ease: EASE } } }}>
                {ch === " " ? " " : ch}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <div className="hero-foot mono">
          <motion.button className="hero-scroll" onClick={() => scrollToTarget(window.innerHeight)} {...fadeUp(1.3)}>
            <span className="hero-scroll-line" aria-hidden><i /></span>{t.hero.scroll}
          </motion.button>
          <motion.span {...fadeUp(1.4)}>{t.hero.folio} ©{new Date().getFullYear()}</motion.span>
        </div>
      </motion.div>
    </section>
  );
}

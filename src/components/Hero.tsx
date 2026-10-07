import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useLang } from "../i18n";
import { EASE, useIntroDone, useLocalTime } from "../lib/motion";
import { scrollToTarget } from "../lib/scroll";
import ShaderCanvas from "./fx/ShaderCanvas";
import Magnetic from "./fx/Magnetic";
import { Roll, SplitReveal } from "./fx/Text";

const NAME = "Medin Turkes";

export default function Hero() {
  const { t } = useLang();
  const ready = useIntroDone();
  const time = useLocalTime();
  const [photoFail, setPhotoFail] = useState(false);
  const [role, setRole] = useState(0);

  /* The hero is sticky; the next section slides over it. Progress runs
     0 → 1 across the first viewport of scroll. */
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (v) => Math.min(Math.max(v / window.innerHeight, 0), 1));
  const smooth = useSpring(progress, { stiffness: 120, damping: 30, mass: 0.4 });
  const innerScale = useTransform(smooth, [0, 1], [1, 0.9]);
  const innerY = useTransform(smooth, [0, 1], ["0vh", "-8vh"]);
  const innerOpacity = useTransform(smooth, [0, 0.85], [1, 0.15]);
  const portraitY = useTransform(smooth, [0, 1], ["0%", "-14%"]);
  const nameSpread = useTransform(smooth, [0, 1], ["-0.055em", "0.02em"]);
  const fade = useTransform(progress, [0, 1], [1, 0.25]);

  /* Pointer parallax: portrait and name drift in opposite directions. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 60, damping: 20 });
  const spy = useSpring(py, { stiffness: 60, damping: 20 });
  const portraitX = useTransform(spx, (v) => v * 18);
  const portraitTiltY = useTransform(spx, (v) => v * 4);
  const portraitTiltX = useTransform(spy, (v) => v * -3);
  const nameX = useTransform(spx, (v) => v * -14);

  useEffect(() => {
    const on = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, [px, py]);

  useEffect(() => {
    if (!ready) return;
    const id = window.setInterval(() => setRole((r) => (r + 1) % t.hero.roles.length), 2400);
    return () => window.clearInterval(id);
  }, [ready, t.hero.roles.length]);

  const show = ready ? "show" : "hidden";
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        <ShaderCanvas fade={fade} />
        <motion.div className="hero-bg-veil" initial={{ opacity: 1 }} animate={{ opacity: ready ? 0 : 1 }} transition={{ duration: 2.2, ease: EASE }} />
      </div>
      {/* Outside .hero-inner so "lighten" blends the photo's black backdrop into the shader. */}
      <motion.div className="hero-portrait"
        style={{ y: portraitY, x: portraitX, rotateY: portraitTiltY, rotateX: portraitTiltX, opacity: innerOpacity }}>
        <motion.div className="hero-portrait-in"
          initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 }}
          animate={ready ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 } : {}}
          transition={{ duration: 1.6, ease: EASE, delay: 0.15 }}>
          {!photoFail ? (
            <img src={`${import.meta.env.BASE_URL}images/profile.png`} alt="Medin Turkes"
              onError={() => setPhotoFail(true)} fetchPriority="high" />
          ) : (
            <div className="hero-portrait-fallback">MT</div>
          )}
        </motion.div>
      </motion.div>
      <div className="grain" aria-hidden />

      <motion.div className="hero-inner" style={{ scale: innerScale, y: innerY, opacity: innerOpacity }}>
        <div className="hero-meta mono">
          <motion.span {...fadeUp(0.5)}>{t.hero.kicker}</motion.span>
          <motion.span {...fadeUp(0.58)} className="hero-meta-mid">{t.hero.based} <b>· {time}</b></motion.span>
          <motion.span {...fadeUp(0.66)} className="hero-meta-end"><i className="pulse" aria-hidden />{t.hero.available}</motion.span>
        </div>

        <div className="hero-mid">
          <div className="hero-statement">
            <SplitReveal as="p" text={t.hero.statement} play={ready} delay={0.55} stagger={0.018} duration={0.9} />
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

          <motion.ul className="hero-roles mono" {...fadeUp(0.8)} aria-label="Services">
            {t.hero.roles.map((r, i) => (
              <li key={r} className={i === role ? "on" : ""}>
                <span className="hero-roles-idx">0{i + 1}</span>{r}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.h1 className="hero-name" aria-label={NAME} style={{ x: nameX, letterSpacing: nameSpread }}
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
          <motion.span className="hero-foot-role" {...fadeUp(1.35)}>
            <AnimatePresence mode="wait">
              <motion.span key={role} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                {t.hero.roles[role]}
              </motion.span>
            </AnimatePresence>
          </motion.span>
          <motion.span {...fadeUp(1.4)}>{t.hero.folio} ©{new Date().getFullYear()}</motion.span>
        </div>
      </motion.div>
    </section>
  );
}

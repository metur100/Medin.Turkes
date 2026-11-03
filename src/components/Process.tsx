import { useRef, useState } from "react";
import { backOut, cubicBezier, easeIn, motion, MotionValue, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useLang } from "../i18n";
import { useMediaQuery } from "../lib/motion";
import { scrollToTarget } from "../lib/scroll";
import Smoke from "./fx/Smoke";
import { Eyebrow, Rich } from "./fx/Text";

/* Scroll-scrubbed build story. The section is tall and its stage is pinned;
   progress 0 → 1 plays five chapters:
     idea   — the browser frame draws itself on an empty stage
     build  — UI pieces fall in and land with a slight overshoot
     ship   — a drop hits Deploy and ripples across the screen
     enter  — the camera pushes through the hero image
     choose — fog rolls in and three glowing doors appear */
const STARTS = [0, 0.17, 0.44, 0.62, 0.8];
const FADE = 0.035;
const DROP = 0.075;
const ZOOM = cubicBezier(0.7, 0, 0.84, 0);
const STILL = 0.62; // reduced motion: the shipped page, before the camera moves

type Box = { l: number; t: number; w: number; h: number };

/* A piece of the page that falls from above the stage into its slot. */
function Piece({ p, at, box, tilt, className, children }: { p: MotionValue<number>; at: number; box: Box; tilt: number; className: string; children?: React.ReactNode }) {
  const y = useTransform(p, [at, at + DROP], ["-90vh", "0vh"], { ease: backOut });
  const rotate = useTransform(p, [at, at + DROP], [tilt, 0], { ease: backOut });
  const opacity = useTransform(p, [at, at + 0.01], [0, 1]);
  return (
    <motion.div className={`proc-piece ${className}`}
      style={{ left: `${box.l}%`, top: `${box.t}%`, width: `${box.w}%`, height: `${box.h}%`, y, rotate, opacity }}>
      {children}
    </motion.div>
  );
}

function Ring({ p, k }: { p: MotionValue<number>; k: number }) {
  const at = 0.52 + k * 0.02;
  const scale = useTransform(p, [at, at + 0.07], [0, 34]);
  const opacity = useTransform(p, [at, at + 0.01, at + 0.07], [0, 0.9, 0]);
  return <motion.i className="proc-ring" style={{ scale, opacity }} />;
}

/* Chapter headline: blurs in, holds, blurs out. The "enter" line also
   opens its tracking as the camera moves, like a title card. */
function Chapter({ p, i, text }: { p: MotionValue<number>; i: number; text: string }) {
  const from = STARTS[i], to = STARTS[i + 1];
  const r = [from - FADE, from, to - FADE, to];
  const opacity = useTransform(p, r, [0, 1, 1, 0]);
  const filter = useTransform(p, r, ["blur(14px)", "blur(0px)", "blur(0px)", "blur(14px)"]);
  const y = useTransform(p, r, [40, 0, 0, -40]);
  const letterSpacing = useTransform(p, [from, to], i === 3 ? ["-0.04em", "0.05em"] : ["-0.04em", "-0.04em"]);
  return <motion.h3 className="proc-title" style={{ opacity, filter, y, letterSpacing }}><Rich text={text} /></motion.h3>;
}

function Door({ p, k, n, label }: { p: MotionValue<number>; k: number; n: string; label: string }) {
  const at = 0.87 + k * 0.025;
  const opacity = useTransform(p, [at, at + 0.04], [0, 1]);
  const x = useTransform(p, [at, at + 0.04], [-24, 0]);
  const filter = useTransform(p, [at, at + 0.04], ["blur(10px)", "blur(0px)"]);
  return (
    <motion.button className="proc-door" style={{ opacity, x, filter }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      }}
      onClick={() => scrollToTarget("#focus")}>
      <span className="proc-door-n mono">{n}</span>
      <span>{label}</span>
      <i className="proc-door-orb" aria-hidden />
    </motion.button>
  );
}

function Browser({ p }: { p: MotionValue<number> }) {
  const { t } = useLang();
  const s = t.process;

  const frame = useTransform(p, [0.02, 0.15], [0, 1]);
  const screen = useTransform(p, [0.1, 0.17], [0, 1]);
  const guides = useTransform(p, [0.03, 0.08, 0.3, 0.42], [0, 1, 1, 0]);
  const guideDraw = useTransform(p, [0.03, 0.15], [0, 1]);
  const caret = useTransform(p, [0.13, 0.18], [1, 0]);
  const glow = useTransform(p, [0.52, 0.6], [0, 1]);
  const live = useTransform(p, [0.53, 0.57], [0, 1]);
  const fill = useTransform(p, [0.52, 0.54], [0, 1]);
  const dropY = useTransform(p, [0.45, 0.52], ["-80vh", "0vh"], { ease: easeIn });
  const dropO = useTransform(p, [0.44, 0.45, 0.52, 0.525], [0, 1, 1, 0]);
  const zoom = useTransform(p, [0.63, 0.8], [1, 9], { ease: ZOOM });
  const fade = useTransform(p, [0.73, 0.79], [1, 0]);

  const at = (k: number) => STARTS[1] + k * 0.028;

  return (
    <motion.div className="proc-browser" style={{ scale: zoom, opacity: fade }}>
      <svg className="proc-frame" viewBox="0 0 160 100" fill="none" aria-hidden>
        <motion.rect x="0.3" y="0.3" width="159.4" height="99.4" rx="3" stroke="currentColor" strokeWidth="0.35" style={{ pathLength: frame }} />
      </svg>
      <motion.div className="proc-screen" style={{ opacity: screen }}>
        <motion.div className="proc-guides" style={{ opacity: guides }} aria-hidden>
          {[24, 50, 71].map((y) => <motion.i key={`h${y}`} className="h" style={{ top: `${y}%`, scaleX: guideDraw }} />)}
          {[5, 50, 95].map((x) => <motion.i key={`v${x}`} className="v" style={{ left: `${x}%`, scaleY: guideDraw }} />)}
        </motion.div>
        <motion.div className="proc-glow" style={{ opacity: glow }} />
      </motion.div>
      <motion.i className="proc-caret" style={{ opacity: caret }} aria-hidden />

      <Piece p={p} at={at(0)} tilt={-3} className="proc-chrome" box={{ l: 0, t: 0, w: 100, h: 8 }}>
        <span className="proc-dots" aria-hidden><i /><i /><i /></span>
        <span className="proc-url mono">medinturkes.de</span>
        <motion.span className="proc-live mono" style={{ opacity: live }}>● {s.live}</motion.span>
      </Piece>
      <Piece p={p} at={at(1)} tilt={4} className="proc-nav" box={{ l: 5, t: 13, w: 90, h: 5 }}>
        <i className="logo" /><span className="links"><i /><i /><i /></span><i className="pill" />
      </Piece>
      <Piece p={p} at={at(2)} tilt={-6} className="proc-head-block" box={{ l: 5, t: 27, w: 44, h: 22 }}>
        <span><Rich text={s.screen} /></span>
        <i /><i className="short" />
      </Piece>
      <Piece p={p} at={at(3)} tilt={7} className="proc-image" box={{ l: 54, t: 24, w: 41, h: 40 }}>
        <i className="sun" /><i className="horizon" />
      </Piece>
      {[0, 1, 2].map((k) => (
        <Piece key={k} p={p} at={at(4 + k)} tilt={k % 2 ? 5 : -5} className="proc-card" box={{ l: 5 + k * 31, t: 71, w: 28, h: 22 }}>
          <i /><i className="short" />
        </Piece>
      ))}
      <Piece p={p} at={at(7)} tilt={-9} className="proc-cta" box={{ l: 5, t: 54, w: 15, h: 7 }}>
        <motion.span className="proc-cta-fill" style={{ opacity: fill }} />
        <span className="mono">{s.deploy}</span>
        <motion.i className="proc-drop" style={{ y: dropY, opacity: dropO }} aria-hidden />
      </Piece>

      <div className="proc-ripples" aria-hidden>
        <span className="proc-ripple-at">{[0, 1, 2].map((k) => <Ring key={k} p={p} k={k} />)}</span>
      </div>
    </motion.div>
  );
}

function Doors({ p, on }: { p: MotionValue<number>; on: boolean }) {
  const { t } = useLang();
  const s = t.process;
  const opacity = useTransform(p, [0.83, 0.89], [0, 1]);
  const filter = useTransform(p, [0.83, 0.89], ["blur(16px)", "blur(0px)"]);
  const y = useTransform(p, [0.83, 0.89], [30, 0]);
  return (
    <div className={`proc-doors${on ? " is-on" : ""}`}>
      <motion.h3 className="proc-doors-title" style={{ opacity, filter, y }}><Rich text={s.doorsTitle} /></motion.h3>
      <div className="proc-door-list">
        {s.doors.map((d, k) => <Door key={d.n} p={p} k={k} n={d.n} label={d.t} />)}
      </div>
    </div>
  );
}

export default function Process() {
  const { t } = useLang();
  const s = t.process;
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const still = useMotionValue(STILL);
  const p = reduced ? still : smooth;
  const done = useMotionValue(1);

  const smokeA = useTransform(p, [0.72, 0.84], [0, 1]);
  const spread = useTransform(p, [0.72, 1], [0, 1]);

  const [active, setActive] = useState(0);
  const [doorsOn, setDoorsOn] = useState(false);
  useMotionValueEvent(smooth, "change", (v) => {
    setActive(STARTS.filter((x) => v >= x).length - 1);
    setDoorsOn(v > 0.86);
  });

  if (reduced) {
    return (
      <section className="proc is-static" id="process">
        <div className="wrap"><Eyebrow index="02" label={s.eyebrow} /></div>
        <div className="proc-scene"><Browser p={still} /></div>
        <Doors p={done} on />
      </section>
    );
  }

  return (
    <section className="proc" id="process" ref={ref}>
      <div className="proc-stage">
        <div className="proc-top wrap">
          <Eyebrow index="02" label={s.eyebrow} />
          <div className="proc-meta mono">
            <span className="proc-count">
              <span className="proc-count-cur">{String(active + 1).padStart(2, "0")}</span> / {String(STARTS.length).padStart(2, "0")}
            </span>
            <span className="proc-key">{s.chapters[active].k}</span>
            <span className="proc-bar"><motion.i style={{ scaleX: smooth }} /></span>
          </div>
        </div>

        <div className="proc-scene"><Browser p={p} /></div>

        <div className="proc-copy">
          {s.chapters.slice(0, 4).map((c, i) => <Chapter key={c.k} p={p} i={i} text={c.t} />)}
        </div>

        <Smoke alpha={smokeA} spread={spread} className="proc-smoke" />
        <Doors p={p} on={doorsOn} />
      </div>
    </section>
  );
}

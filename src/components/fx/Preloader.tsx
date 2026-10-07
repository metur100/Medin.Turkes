import { useEffect, useRef, useState } from "react";
import { animate, AnimatePresence, motion } from "framer-motion";
import { EASE, EASE_IN_OUT } from "../../lib/motion";
import { lockScroll } from "../../lib/scroll";

/* Counter 000 → 100, then the panel lifts like a curtain. `onReveal` fires
   as the curtain starts moving so the hero choreography overlaps it. */
export default function Preloader({ onReveal, label }: { onReveal: () => void; label: string }) {
  const [done, setDone] = useState(false);
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true); onReveal(); return;
    }
    lockScroll(true);
    const controls = animate(0, 100, {
      duration: 1.9, ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (numRef.current) numRef.current.textContent = String(Math.round(v)).padStart(3, "0");
        if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
      },
      onComplete: () => {
        window.setTimeout(() => { setDone(true); onReveal(); lockScroll(false); }, 180);
      },
    });
    return () => { controls.stop(); lockScroll(false); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="loader" role="status" aria-label={label}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.1, ease: EASE_IN_OUT }}>
          <div className="loader-top mono">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
              Medin Turkes
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}>
              Portfolio ©{new Date().getFullYear()}
            </motion.span>
          </div>

          <div className="loader-mid">
            <span className="sw"><motion.span className="sw-i serif" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.15 }}>Crafting</motion.span></span>{" "}
            <span className="sw"><motion.span className="sw-i" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.25 }}>software</motion.span></span>{" "}
            <span className="sw"><motion.span className="sw-i" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.35 }}>that ships.</motion.span></span>
          </div>

          <div className="loader-bottom">
            <span className="loader-count"><span ref={numRef}>000</span></span>
            <span className="loader-bar"><span ref={barRef} /></span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

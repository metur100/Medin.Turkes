import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "../../lib/motion";

/* Precise dot + lagging ring. Grows over interactive elements and shows a
   label for anything tagged with data-cursor="…". Mouse-only. */
export default function Cursor() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });
  const [mode, setMode] = useState<"idle" | "link" | "label" | "solid">("idle");
  const [label, setLabel] = useState("");
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); setHidden(false); };
    const over = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      const tagged = el.closest<HTMLElement>("[data-cursor]");
      if (tagged) { setLabel(tagged.dataset.cursor || ""); setMode("label"); return; }
      /* Filled buttons already react on hover; the ring just steps aside. */
      if (el.closest(".orb, .btn, .nav-cta, .lang-toggle")) { setMode("solid"); return; }
      setMode(el.closest("a, button, [role=button], input, label") ? "link" : "idle");
    };
    const leave = () => setHidden(true);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  return (
    <>
      <motion.div className={`cursor-ring is-${mode}${hidden ? " is-hidden" : ""}`} style={{ x: rx, y: ry }} aria-hidden>
        <span className="cursor-label">{mode === "label" ? label : ""}</span>
      </motion.div>
      <motion.div className={`cursor-dot${hidden || mode === "label" ? " is-hidden" : ""}`} style={{ x, y }} aria-hidden />
    </>
  );
}

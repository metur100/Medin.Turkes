import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/* Cursor "pulls" the element toward it within a small radius, then springs back. */
export function useMagnetic(strength = 16) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.25 });

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(((e.clientX - r.left - r.width / 2) / r.width) * strength);
    y.set(((e.clientY - r.top - r.height / 2) / r.height) * strength);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return { ref, x: sx, y: sy, onMouseMove, onMouseLeave };
}

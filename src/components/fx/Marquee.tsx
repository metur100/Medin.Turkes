import { ReactNode, useRef } from "react";
import {
  motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/* Endless ribbon that drifts on its own and speeds up / reverses / skews
   with the page's scroll velocity. */
export default function Marquee({ children, speed = 2.5, reverse = false }: { children: ReactNode; speed?: number; reverse?: boolean }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(velocity, [-3000, 0, 3000], [6, 0, -6]);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const dir = useRef(reverse ? -1 : 1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * speed * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = reverse ? 1 : -1;
    else if (f > 0) dir.current = reverse ? -1 : 1;
    move += dir.current * move * Math.abs(f);
    baseX.set(baseX.get() - move);
  });

  return (
    <div className="marquee" aria-hidden>
      <motion.div className="marquee-track" style={{ x, skewX: skew }}>
        {[0, 1, 2, 3].map((i) => <div className="marquee-group" key={i}>{children}</div>)}
      </motion.div>
    </div>
  );
}

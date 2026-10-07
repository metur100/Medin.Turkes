import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

/* Counts up from zero the first time it scrolls into view. */
export default function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, value, {
      duration: 2.2, ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { el.textContent = Math.round(v) + suffix; },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

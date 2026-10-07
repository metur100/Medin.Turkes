import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "../../lib/motion";

/* The native cursor stays (zero latency). Over anything tagged with
   data-cursor="…" a small label pill rides alongside it. Position is
   written straight to the DOM — no springs, no re-renders per move. */
export default function Cursor() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!fine) return;

    const move = (e: PointerEvent) => {
      if (ref.current) ref.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    const over = (e: PointerEvent) => {
      const tagged = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setLabel(tagged?.dataset.cursor ?? "");
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <div ref={ref} className="cursor-tag" aria-hidden>
      <span className={`cursor-tag-in${label ? " is-on" : ""}`}>{label}</span>
    </div>
  );
}

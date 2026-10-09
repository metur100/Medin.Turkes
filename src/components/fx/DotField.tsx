import { useEffect, useRef } from "react";
import { MotionValue } from "framer-motion";

/* Reads a #rrggbb custom property so the field follows the theme. */
function cssRGB(name: string, fallback: [number, number, number]): [number, number, number] {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(name).trim().replace("#", "");
  if (hex.length !== 6) return fallback;
  return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
}

/* A quiet grid of dots. A slow diagonal swell runs through it, and the
   cursor parts the dots like a lens, warming the ones nearest to it. */
export default function DotField({ fade, paused = false, gap = 26, className }: { fade?: MotionValue<number>; paused?: boolean; gap?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const [ar, ag, ab] = cssRGB("--accent", [255, 107, 61]);
    const [fr, fg, fb] = cssRGB("--fg", [236, 232, 225]);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const target = { x: -9999, y: -9999 };
    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      if (mouse.x < -999) { mouse.x = target.x; mouse.y = target.y; }
    };
    const onLeave = () => { target.x = -9999; target.y = -9999; };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);

    const R = 190;            // lens radius
    const start = performance.now();
    let raf = 0;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden || pausedRef.current) return;
      const t = reduced ? 0 : (now - start) / 1000;
      mouse.x += (target.x - mouse.x) * 0.12;
      mouse.y += (target.y - mouse.y) * 0.12;
      const f = fade ? fade.get() : 1;

      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      const ox = (w - (cols - 1) * gap) / 2;
      const oy = (h - (rows - 1) * gap) / 2;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          let x = ox + i * gap;
          let y = oy + j * gap;
          /* travelling swell: a soft band that sweeps diagonally */
          const swell = 0.5 + 0.5 * Math.sin(i * 0.22 + j * 0.16 - t * 0.9) * Math.sin(j * 0.11 - t * 0.35 + i * 0.05);
          let a = 0.06 + swell * 0.16;
          let r = 0.8 + swell * 0.5;
          let heat = 0;

          const dx = x - mouse.x, dy = y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const k = 1 - d / R;
            const push = k * k * 18;
            x += (dx / d) * push;
            y += (dy / d) * push;
            heat = k;
            a += k * 0.7;
            r += k * 1.4;
          }

          a *= f;
          if (a < 0.02) continue;
          const cr = fr + (ar - fr) * heat, cg = fg + (ag - fg) * heat, cb = fb + (ab - fb) * heat;
          ctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [fade, gap]);

  return <canvas ref={ref} className={`dotfield ${className ?? ""}`} aria-hidden />;
}

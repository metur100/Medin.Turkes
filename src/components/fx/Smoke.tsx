import { useEffect, useRef } from "react";
import { MotionValue } from "framer-motion";

/* Reads a #rrggbb custom property so the smoke follows the theme. */
function cssRGB(name: string, fallback: string) {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(name).trim().replace("#", "");
  const h = hex.length === 6 ? hex : fallback;
  return `${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)}`;
}

/* One soft radial puff, rendered once and stamped many times per frame. */
function sprite(rgb: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, `rgba(${rgb},1)`);
  grad.addColorStop(0.45, `rgba(${rgb},0.45)`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return c;
}

/* Rising fog that billows outward as `spread` grows. `alpha` drives the
   whole layer, so the field costs nothing while it is scrolled away. */
export default function Smoke({ alpha, spread, className }: { alpha: MotionValue<number>; spread: MotionValue<number>; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fog = sprite(cssRGB("--fg", "ece8e1"));
    const ember = sprite(cssRGB("--accent", "ff6b3d"));
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);

    const puffs = Array.from({ length: 44 }, (_, i) => ({
      x: Math.random() * 2 - 1,
      phase: Math.random(),
      size: 0.45 + Math.random() * 0.55,
      speed: 0.035 + Math.random() * 0.045,
      sway: Math.random() * Math.PI * 2,
      ember: i % 6 === 0,
    }));

    const start = performance.now();
    let raf = 0, clear = true;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      const a = alpha.get();
      if (a < 0.01) {
        if (!clear) { ctx.clearRect(0, 0, w, h); clear = true; }
        return;
      }
      clear = false;
      const t = (now - start) / 1000;
      const sp = spread.get();
      ctx.clearRect(0, 0, w, h);

      for (const p of puffs) {
        const life = (p.phase + t * p.speed) % 1;            // 0 at the floor, 1 at the top
        const x = w / 2 + p.x * w * (0.22 + 0.42 * sp) * (0.7 + life * 0.6) + Math.sin(t * 0.4 + p.sway) * 34;
        const y = h * (1.08 - life * (0.7 + 0.45 * sp));
        const size = Math.max(w, h) * (0.16 + p.size * 0.26) * (0.6 + life * 0.9);
        ctx.globalAlpha = a * Math.sin(life * Math.PI) * (p.ember ? 0.2 : 0.13);
        ctx.drawImage(p.ember ? ember : fog, x - size / 2, y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [alpha, spread]);

  return <canvas ref={ref} className={className} aria-hidden />;
}

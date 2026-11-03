import { useEffect, useMemo, useRef, useState } from "react";
import { motion, MotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useLang } from "../i18n";
import { PROJECTS, Project } from "../data/projects";
import { useMediaQuery } from "../lib/motion";
import { scrollToTarget } from "../lib/scroll";
import { navTo } from "../router";
import SignatureWork from "./SignatureWork";
import Smoke from "./fx/Smoke";
import { Eyebrow, Rich } from "./fx/Text";

/* Pinned, scroll-scrubbed showcase. Every project screenshot is cut into
   tiles that fly in and assemble — each project with its own choreography —
   holds under a numbered caption with a light sweep, then the camera pushes
   through it into the next one. Fog and three glowing doors close it out. */

const CURATED = ["teretnjaci", "starfall-grove", "bco-solutions", "skinbloom", "emma-solution"];
const FINALE = 0.84;            // progress where the doors take over
const ASSEMBLE = 0.48, HOLD = 0.8; // phases inside one project's slice

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a: number, b: number, v: number) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIn = (t: number) => t * t * t;
const backOut = (t: number) => { const c = 1.6; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };

/* Seeded so a project always assembles the same way. */
function rng(seed: number) {
  return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
}

type Tile = { c: number; r: number; delay: number; dx: number; dy: number; rot: number; s: number };
type Style = "scatter" | "drop" | "spiral" | "flip" | "depth";
const STYLES: Style[] = ["drop", "scatter", "spiral", "flip", "depth"];

function makeTiles(cols: number, rows: number, style: Style, seed: number): Tile[] {
  const rand = rng(seed);
  const tiles: Tile[] = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const nx = (c + 0.5) / cols - 0.5, ny = (r + 0.5) / rows - 0.5;
    const dist = Math.hypot(nx, ny);
    const ang = Math.atan2(ny, nx);
    let t: Tile;
    if (style === "drop") {          // falls from above, bottom rows land first
      t = { c, r, delay: (1 - (r + 1) / rows) * 0.6 + rand() * 0.25, dx: (rand() - 0.5) * 0.15, dy: -1.1 - rand() * 0.5, rot: (rand() - 0.5) * 0.9, s: 1 };
    } else if (style === "scatter") { // bursts in from every direction, centre first
      const a = rand() * Math.PI * 2, d = 0.7 + rand() * 0.7;
      t = { c, r, delay: dist * 1.1 + rand() * 0.2, dx: Math.cos(a) * d, dy: Math.sin(a) * d, rot: (rand() - 0.5) * 3, s: 0.3 + rand() * 1.4 };
    } else if (style === "spiral") {  // sweeps round the centre, by angle
      t = { c, r, delay: ((ang + Math.PI) / (Math.PI * 2)) * 0.75 + rand() * 0.1, dx: 0, dy: 0, rot: (rand() - 0.5) * 1.2, s: 0.2 };
    } else if (style === "flip") {    // columns flip open left to right
      t = { c, r, delay: (c / cols) * 0.8 + (r / rows) * 0.12, dx: 0, dy: 0.08, rot: 0, s: 1 };
    } else {                          // flies out of the screen towards its slot
      t = { c, r, delay: rand() * 0.75, dx: nx * 0.9, dy: ny * 0.9, rot: (rand() - 0.5) * 0.6, s: 2 + rand() * 1.2 };
    }
    tiles.push(t);
  }
  return tiles;
}

/* Tiny copy of the image, stretched to full screen: a free, soft "ambilight". */
function ambient(img: HTMLImageElement) {
  const c = document.createElement("canvas");
  c.width = 24; c.height = 15;
  c.getContext("2d")!.drawImage(img, 0, 0, 24, 15);
  return c;
}

function Stage({ items, p }: { items: Project[]; p: MotionValue<number> }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, wide = true;

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight; wide = w >= 900;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const scenes = items.map((it, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = `${import.meta.env.BASE_URL}images/${it.image}`;
      const scene = { img, glow: null as HTMLCanvasElement | null, tiles: [] as Tile[], cols: 0, rows: 0, style: STYLES[i % STYLES.length], seed: 97 + i * 131 };
      img.onload = () => { scene.glow = ambient(img); };
      return scene;
    });

    let visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: "200px 0px" });
    io.observe(canvas);

    const slice = FINALE / items.length;
    let raf = 0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      const v = p.get();
      ctx.clearRect(0, 0, w, h);

      const i = Math.min(items.length - 1, Math.floor(v / slice));
      const sc = scenes[i];
      const img = sc.img;
      if (!img.complete || !img.naturalWidth) return;
      const u = clamp((v - i * slice) / slice);

      /* layout: the frame keeps the screenshot's aspect, right of the copy on desktop */
      const a = img.naturalWidth / img.naturalHeight;
      const maxW = wide ? w * 0.6 : w - 32, maxH = wide ? h * 0.6 : h * 0.4;
      const fw = Math.min(maxW, maxH * a), fh = fw / a;
      const cx = wide ? w * 0.6 : w / 2, cy = wide ? h * 0.52 : h * 0.43;

      const cols = wide ? 12 : 7, rows = Math.max(3, Math.round(cols / a));
      if (sc.cols !== cols || sc.rows !== rows) { sc.tiles = makeTiles(cols, rows, sc.style, sc.seed); sc.cols = cols; sc.rows = rows; }

      const build = clamp(u / ASSEMBLE);
      const exit = smooth(HOLD, 1, u);
      const zoom = 1 + easeIn(exit) * 2.6;
      const fade = 1 - smooth(0.45, 1, exit);
      const enter = i === 0 ? 1 : smooth(0, 0.12, u);   // after a push-through, ease back in from black

      /* ambient light from the screenshot itself */
      if (sc.glow) {
        ctx.globalAlpha = 0.32 * smooth(0.2, 0.9, build) * fade * enter;
        ctx.drawImage(sc.glow, -w * 0.1, -h * 0.1, w * 1.2, h * 1.2);
      }

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(zoom, zoom);
      ctx.translate(-cx, -cy);
      const x0 = cx - fw / 2, y0 = cy - fh / 2;
      const tw = fw / cols, th = fh / rows;
      const sw = img.naturalWidth / cols, sh = img.naturalHeight / rows;

      if (build >= 1) {
        /* assembled: draw once, with a shadow, rounded corners and a sweep of light */
        ctx.globalAlpha = fade;
        ctx.shadowColor = "rgba(0,0,0,0.6)"; ctx.shadowBlur = 60; ctx.shadowOffsetY = 30;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x0, y0, fw, fh, 14); else ctx.rect(x0, y0, fw, fh);
        ctx.fillStyle = "#000"; ctx.fill();
        ctx.shadowColor = "transparent";
        ctx.save();
        ctx.clip();
        ctx.drawImage(img, x0, y0, fw, fh);
        const sweep = smooth(ASSEMBLE, HOLD, u);
        if (sweep > 0 && sweep < 1) {
          const sx = x0 - fw * 0.4 + sweep * fw * 1.8;
          const g = ctx.createLinearGradient(sx - fw * 0.18, y0, sx + fw * 0.18, y0 + fh * 0.4);
          g.addColorStop(0, "rgba(255,255,255,0)");
          g.addColorStop(0.5, "rgba(255,240,228,0.22)");
          g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.globalCompositeOperation = "lighter";
          ctx.fillStyle = g; ctx.fillRect(x0, y0, fw, fh);
          ctx.globalCompositeOperation = "source-over";
        }
        ctx.restore();
      } else {
        for (const t of sc.tiles) {
          const k = clamp((build - t.delay * 0.55) / 0.45);
          if (k <= 0) continue;
          const e = sc.style === "drop" ? backOut(k) : easeOut(k);
          const inv = 1 - e;
          let x = x0 + (t.c + 0.5) * tw, y = y0 + (t.r + 0.5) * th;
          let sx = 1;
          if (sc.style === "spiral") {
            const dx = x - cx, dy = y - cy;
            const ang = inv * Math.PI * 1.6, rad = 1 + inv * 1.8;
            x = cx + (dx * Math.cos(ang) - dy * Math.sin(ang)) * rad;
            y = cy + (dx * Math.sin(ang) + dy * Math.cos(ang)) * rad;
          } else {
            x += t.dx * w * inv;
            y += t.dy * h * inv;
          }
          if (sc.style === "flip") sx = Math.max(0.001, Math.cos(inv * Math.PI * 0.5));
          const s = 1 + (t.s - 1) * inv;
          const gap = 1 - 0.1 * inv;
          ctx.globalAlpha = clamp(k * 2.5) * fade * (sc.style === "depth" ? 0.35 + 0.65 * e : 1);
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(t.rot * inv);
          ctx.scale(s * sx * gap, s * gap);
          ctx.drawImage(img, t.c * sw, t.r * sh, sw, sh, -tw / 2 - 0.3, -th / 2 - 0.3, tw + 0.6, th + 0.6);
          ctx.restore();
        }
      }
      ctx.restore();
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [items, p]);

  return <canvas ref={ref} className="show-canvas" aria-hidden />;
}

/* Numbered caption for one project: blurs in once the tiles have landed. */
function Caption({ p, it, i, total, on }: { p: MotionValue<number>; it: Project; i: number; total: number; on: boolean }) {
  const { lang, t } = useLang();
  const slice = FINALE / total, s0 = i * slice;
  const r = [s0 + slice * (ASSEMBLE - 0.1), s0 + slice * (ASSEMBLE + 0.04), s0 + slice * HOLD, s0 + slice * (HOLD + 0.1)];
  const opacity = useTransform(p, r, [0, 1, 1, 0]);
  const filter = useTransform(p, r, ["blur(14px)", "blur(0px)", "blur(0px)", "blur(14px)"]);
  const y = useTransform(p, r, [36, 0, 0, -30]);
  const spread = useTransform(p, [r[0], r[3]], ["-0.06em", "0.02em"]);
  return (
    <motion.div className={`show-cap${on ? " is-on" : ""}`} style={{ opacity, filter, y }} aria-hidden={!on}>
      <span className="show-cap-n">{String(i + 1).padStart(2, "0")}</span>
      <span className="show-cap-cat mono">{it.category[lang]}</span>
      <motion.h3 className="show-cap-name" style={{ letterSpacing: spread }}>{it.name}</motion.h3>
      <p className="show-cap-tag">{it.tagline[lang]}</p>
      {it.link
        ? <a className="show-cap-link mono" href={it.link} target="_blank" rel="noopener noreferrer" tabIndex={on ? 0 : -1}>{t.work.visit} ↗</a>
        : <span className="show-cap-link mono">{t.work.noLink}</span>}
    </motion.div>
  );
}

function Door({ p, k, n, label, go }: { p: MotionValue<number>; k: number; n: string; label: string; go: () => void }) {
  const at = FINALE + 0.06 + k * 0.025;
  const opacity = useTransform(p, [at, at + 0.04], [0, 1]);
  const x = useTransform(p, [at, at + 0.04], [-24, 0]);
  const filter = useTransform(p, [at, at + 0.04], ["blur(10px)", "blur(0px)"]);
  return (
    <motion.button className="show-door" style={{ opacity, x, filter }} onClick={go}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      }}>
      <span className="show-door-n mono">{n}</span>
      <span>{label}</span>
      <i className="show-door-orb" aria-hidden />
    </motion.button>
  );
}

const GO = [() => navTo("projects"), () => scrollToTarget("#focus"), () => scrollToTarget("#contact")];

function Pinned({ items }: { items: Project[] }) {
  const { t } = useLang();
  const s = t.showcase;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });

  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(-1);
  const [doorsOn, setDoorsOn] = useState(false);
  const slice = FINALE / items.length;
  useMotionValueEvent(p, "change", (v) => {
    const i = Math.min(items.length - 1, Math.floor(v / slice));
    const u = (v - i * slice) / slice;
    setActive(v >= FINALE ? items.length : i);
    setHeld(v < FINALE && u > ASSEMBLE && u < HOLD + 0.05 ? i : -1);
    setDoorsOn(v > FINALE + 0.06);
  });

  const smokeA = useTransform(p, [FINALE - 0.04, FINALE + 0.06], [0, 1]);
  const spread = useTransform(p, [FINALE - 0.04, 1], [0, 1]);
  const titleO = useTransform(p, [FINALE + 0.02, FINALE + 0.07], [0, 1]);
  const titleF = useTransform(p, [FINALE + 0.02, FINALE + 0.07], ["blur(16px)", "blur(0px)"]);
  const titleY = useTransform(p, [FINALE + 0.02, FINALE + 0.07], [30, 0]);
  const headO = useTransform(p, [FINALE - 0.02, FINALE + 0.02], [1, 0]);
  const bar = useTransform(p, [0, FINALE], [0, 1]);

  const total = items.length;
  const label = active < total ? items[active].name : s.finale;

  return (
    <section className="show" id="work" ref={ref} style={{ height: `${total * 120 + 200}vh` }}>
      <div className="show-stage">
        <Stage items={items} p={p} />

        <motion.div className="show-top wrap" style={{ opacity: headO }}>
          <div>
            <Eyebrow index="03" label={t.work.eyebrow} />
            <h2 className="show-title"><Rich text={t.work.title} /></h2>
          </div>
          <div className="show-meta mono">
            <span className="show-count">
              <span className="show-count-cur">{String(Math.min(active + 1, total)).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
            </span>
            <span className="show-key">{label}</span>
            <span className="show-bar"><motion.i style={{ scaleX: bar }} /></span>
          </div>
        </motion.div>

        <div className="show-caps">
          {items.map((it, i) => <Caption key={it.id} p={p} it={it} i={i} total={total} on={held === i} />)}
        </div>

        <Smoke alpha={smokeA} spread={spread} className="show-smoke" />
        <div className={`show-doors${doorsOn ? " is-on" : ""}`}>
          <motion.h3 className="show-doors-title" style={{ opacity: titleO, filter: titleF, y: titleY }}><Rich text={s.doorsTitle} /></motion.h3>
          <div className="show-door-list">
            {s.doors.map((d, k) => <Door key={d.n} p={p} k={k} n={d.n} label={d.t} go={GO[k]} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Showcase() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const items = useMemo(() => CURATED.map((id) => PROJECTS.find((p) => p.id === id)).filter((p): p is Project => Boolean(p)), []);
  return reduced ? <SignatureWork /> : <Pinned items={items} />;
}

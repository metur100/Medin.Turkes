import { useEffect, useRef, useState } from "react";
import { MotionValue } from "framer-motion";

/* Glossy amber liquid rendered in a fragment shader. Pointer moves and taps
   drop ripples into it; `smoke` (0 → 1) drains the pool and lets fog rise
   in its place. Falls back to `fallback` when WebGL is unavailable. */

const VERT = `attribute vec2 a; void main() { gl_Position = vec4(a, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime, uSmoke, uIntro;
uniform vec2 uMouse;
uniform vec3 uRip[8];
uniform vec3 uBg, uAccent, uFg;

/* Rotated layers of sine products: smooth everywhere, so lit normals never seam. */
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * (0.5 + 0.5 * sin(p.x) * sin(p.y)); p = m * p + vec2(0.7, 1.3); a *= 0.5; }
  return v;
}

float height(vec2 p) {
  float h = (fbm(p * 3.2 + vec2(uTime * 0.09, uTime * 0.06)) - 0.5) * 0.05;
  for (int i = 0; i < 8; i++) {
    vec3 r = uRip[i];
    float age = uTime - r.z;
    if (age < 0.0 || age > 7.0) continue;
    float d = length(p - r.xy);
    float front = age * 0.38;
    float env = exp(-pow((d - front) * 7.0, 2.0)) * exp(-age * 0.65);
    h += sin((d - front) * 70.0) * env * 0.05 / (1.0 + d * 1.5);
  }
  return h;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = vec2((uv.x - 0.5) * asp, uv.y - 0.5);

  float e = 1.0 / uRes.y;
  float h = height(p);
  vec2 g = vec2(height(p + vec2(e, 0.0)) - h, height(p + vec2(0.0, e)) - h) / e;
  vec3 n = normalize(vec3(-g * 0.32, 1.0));

  vec3 L = normalize(vec3(-0.4, 0.55, 0.75));
  vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
  float spec = pow(max(dot(n, H), 0.0), 110.0);
  float fres = pow(1.0 - n.z, 1.6);

  float pool = smoothstep(1.3, 0.0, length(p - vec2(0.42 * asp * 0.5, 0.18)));
  vec3 col = mix(uBg, uAccent * 0.13, pool * 0.8);
  col += uAccent * fres * 1.8;
  col += vec3(1.0, 0.88, 0.78) * spec * 0.85;
  col += uAccent * 0.07 * exp(-length(p - uMouse) * 4.0);

  if (uSmoke > 0.001) {
    vec2 q = p * 3.0; q.y -= uTime * 0.2;
    vec2 w = vec2(fbm(q + uTime * 0.05), fbm(q + vec2(5.2, 1.3) - uTime * 0.04));
    float s = smoothstep(0.38, 0.95, fbm(q + w * 1.9));
    s *= smoothstep(-0.5, 0.5, uSmoke * 1.3 - 0.4 - p.y);
    vec3 smoke = mix(uFg * 0.5, uAccent * 0.85, smoothstep(0.45, 0.9, w.x) * 0.55);
    col = mix(col, uBg, uSmoke * 0.75);
    col += smoke * s * uSmoke;
  }

  col *= uIntro;
  col *= 1.0 - 0.9 * dot(uv - 0.5, uv - 0.5);
  gl_FragColor = vec4(col, 1.0);
}`;

function cssVec(name: string, fallback: string): [number, number, number] {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(name).trim().replace("#", "");
  const h = hex.length === 6 ? hex : fallback;
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as [number, number, number];
}

export default function Liquid({ smoke, paused = false, ready, fallback, className }: {
  smoke: MotionValue<number>; paused?: boolean; ready: boolean; fallback?: React.ReactNode; className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const readyRef = useRef(ready);
  readyRef.current = ready;
  const api = useRef<{ drop: (x: number, y: number) => void } | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl) { setFailed(true); return; }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    if (!vs || !fs) { setFailed(true); return; }
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { setFailed(true); return; }
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("uRes"), uTime = u("uTime"), uSmoke = u("uSmoke"), uIntro = u("uIntro"), uMouse = u("uMouse"), uRip = u("uRip[0]");
    gl.uniform3fv(u("uBg"), cssVec("--bg", "070809"));
    gl.uniform3fv(u("uAccent"), cssVec("--accent", "ff6b3d"));
    gl.uniform3fv(u("uFg"), cssVec("--fg", "ece8e1"));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* The shader is soft by nature, so it renders below CSS resolution. */
    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.6;
    let w = 1, h = 1;
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * scale));
      canvas.height = Math.max(1, Math.floor(h * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const start = performance.now();
    const now = () => (performance.now() - start) / 1000;
    const rip = new Float32Array(24).fill(-100);
    let next = 0;
    const toScene = (cx: number, cy: number): [number, number] => {
      const r = canvas.getBoundingClientRect();
      return [((cx - r.left) / r.width - 0.5) * (r.width / r.height), (1 - (cy - r.top) / r.height) - 0.5];
    };
    const drop = (x: number, y: number) => {
      rip[next * 3] = x; rip[next * 3 + 1] = y; rip[next * 3 + 2] = now();
      next = (next + 1) % 8;
    };
    api.current = { drop };

    const mouse = { x: 0, y: 0.1, tx: 0, ty: 0.1 };
    let lastX = -999, lastY = -999, lastT = 0, lastInput = 0;
    const onMove = (e: PointerEvent) => {
      if (pausedRef.current) return;
      const [x, y] = toScene(e.clientX, e.clientY);
      mouse.tx = x; mouse.ty = y;
      const t = now(), dx = e.clientX - lastX, dy = e.clientY - lastY;
      if (dx * dx + dy * dy > 3600 && t - lastT > 0.09) {
        drop(x, y); lastX = e.clientX; lastY = e.clientY; lastT = t;
      }
      lastInput = t;
    };
    const onDown = (e: PointerEvent) => {
      if (pausedRef.current) return;
      const [x, y] = toScene(e.clientX, e.clientY);
      drop(x, y); lastInput = now();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
    io.observe(canvas);

    let intro = 0, idleAt = 0, raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden || pausedRef.current) return;
      const t = reduced ? 0 : now();
      if (readyRef.current) intro = Math.min(1, intro + 0.012);
      /* With no pointer around (touch, idle), the surface still breathes. */
      if (!reduced && readyRef.current && t - lastInput > 3 && t - idleAt > 2.6) {
        idleAt = t;
        drop((Math.random() - 0.5) * (w / h) * 0.8, (Math.random() - 0.5) * 0.6);
      }
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uSmoke, smoke.get());
      gl.uniform1f(uIntro, intro * intro * (3 - 2 * intro));
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform3fv(uRip, rip);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      api.current = null;
    };
  }, [smoke]);

  /* The intro: one heavy drop in the middle, then a softer echo. */
  useEffect(() => {
    if (!ready) return;
    const a = window.setTimeout(() => api.current?.drop(0, 0.04), 350);
    const b = window.setTimeout(() => api.current?.drop(0.02, 0.02), 1250);
    return () => { window.clearTimeout(a); window.clearTimeout(b); };
  }, [ready]);

  if (failed) return <>{fallback}</>;
  return <canvas ref={ref} className={className} aria-hidden />;
}

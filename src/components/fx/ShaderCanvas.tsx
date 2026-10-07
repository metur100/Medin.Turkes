import { useEffect, useRef } from "react";

/* Reads the page accent (--accent: #rrggbb) so the shader follows the theme. */
function accentRGB(): [number, number, number] {
  const hex = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim().replace("#", "");
  const n = parseInt(hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex, 16);
  if (Number.isNaN(n)) return [0.5, 0.6, 1];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
import { MotionValue } from "framer-motion";

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

/* Domain-warped fbm "flow field" with faint topographic contour lines.
   The cursor bends the field locally; uFade dims it as the hero scrolls away. */
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uFade;
uniform float uAccent;
uniform vec3 uTint;

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);
  float t = uTime * 0.045;

  float d = length(p - m);
  float pull = exp(-d * d * 5.0);

  vec2 q = vec2(fbm(p * 1.3 + vec2(0.0, t)), fbm(p * 1.3 + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p * 1.5 + 2.4 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p * 1.5 + 2.4 * q + vec2(8.3, 2.8) - t));
  r += (m - p) * pull * 0.55;
  float f = fbm(p * 1.7 + 3.2 * r);

  vec3 ink   = vec3(0.027, 0.031, 0.036);
  vec3 deep  = vec3(0.075, 0.085, 0.11);
  vec3 tint = uTint;

  vec3 col = mix(ink, deep, smoothstep(0.25, 0.95, f));
  float heat = smoothstep(0.62, 1.15, f * (0.6 + length(r) * 0.75));
  col = mix(col, tint * 0.72, heat * uAccent);

  // topographic contour lines
  float c = abs(fract(f * 9.0) - 0.5);
  float line = smoothstep(0.455, 0.5, c);
  col += line * mix(vec3(0.05), tint * 0.2, heat) * (0.55 + pull * 1.2);

  // soft spotlight around the cursor
  col += tint * pull * 0.045 * uAccent;

  // vignette + fade
  float vig = smoothstep(1.25, 0.25, length((uv - 0.5) * vec2(aspect * 0.8, 1.15)));
  col *= mix(0.35, 1.0, vig);
  col *= uFade;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
  return s;
}

export default function ShaderCanvas({ fade, accent = 1, paused = false, className }: { fade?: MotionValue<number>; accent?: number; paused?: boolean; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl) { canvas.classList.add("shader-fallback"); return; }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) { canvas.classList.add("shader-fallback"); return; }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uFade = gl.getUniformLocation(prog, "uFade");
    const uAccent = gl.getUniformLocation(prog, "uAccent");
    gl.uniform3f(gl.getUniformLocation(prog, "uTint"), ...accentRGB());

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* The field is soft by nature, so a low internal resolution is invisible
       but cuts GPU work by ~4x on high-DPI screens. */
    const scale = window.innerWidth < 760 ? 0.4 : 0.5;

    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const target = { x: 0.62, y: 0.55 };
    const mouse = { x: 0.62, y: 0.55 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);

    const start = performance.now() - 20_000 * Math.random();
    let raf = 0;
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden || pausedRef.current) return;
      mouse.x += (target.x - mouse.x) * 0.08;
      mouse.y += (target.y - mouse.y) * 0.08;
      gl.uniform1f(uTime, reduced ? 12 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uFade, fade ? fade.get() : 1);
      gl.uniform1f(uAccent, accent);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [fade, accent]);

  return <canvas ref={ref} className={`shader ${className ?? ""}`} aria-hidden />;
}

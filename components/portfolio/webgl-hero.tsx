"use client";

import { useEffect, useRef } from "react";

/**
 * Ported from the Claude Design canvas source's `webgl-hero.js` custom
 * element: a WebGL2 procedural torus-knot point cloud. Zero geometry
 * buffers — positions are derived from gl_VertexID in the vertex shader, so
 * per-frame CPU cost is a single drawArrays call. Pauses off-screen, caps
 * DPR, honours prefers-reduced-motion, survives context loss.
 */

const VERT = `#version 300 es
precision highp float;
uniform float uTime, uCount, uScroll, uDpr, uIntro;
uniform vec2 uRes, uMouse;
uniform vec3 uAccent;
out vec3 vCol;
out float vAlpha;
const float TAU = 6.283185307;

vec3 knot(float u){
  float r = cos(3.0 * u) + 2.0;
  return vec3(r * cos(2.0 * u), -sin(3.0 * u), r * sin(2.0 * u));
}
mat3 rotY(float a){ float s = sin(a), c = cos(a); return mat3(c,0.,-s, 0.,1.,0., s,0.,c); }
mat3 rotX(float a){ float s = sin(a), c = cos(a); return mat3(1.,0.,0., 0.,c,-s, 0.,s,c); }

void main(){
  float i = float(gl_VertexID);
  float rings = 1100.0;
  float per = uCount / rings;
  float ri = floor(i / per);
  float ai = i - ri * per;
  float u = (ri / rings) * TAU;
  float v = (ai / per) * TAU + ri * 0.61;

  float e = 0.008;
  vec3 P = knot(u);
  vec3 T = normalize(knot(u + e) - knot(u - e));
  vec3 B = normalize(cross(T, vec3(0.0, 1.0, 0.0)));
  vec3 N = normalize(cross(B, T));

  float breathe = 0.18 * sin(u * 3.0 + uTime * 0.55) + 0.12 * sin(v * 2.0 - uTime * 0.8);
  float tube = 0.40 + breathe * 0.42;
  vec3 pos = P + tube * (cos(v) * N + sin(v) * B);

  float scatter = 1.0 - uIntro;
  pos += scatter * 5.0 * normalize(vec3(sin(i * 12.9898), cos(i * 78.233), sin(i * 43.758))) * (0.4 + 0.6 * fract(i * 0.618));

  mat3 R = rotY(uTime * 0.11 + uMouse.x * 0.55) * rotX(-0.32 + uMouse.y * 0.38);
  vec3 p = R * pos;

  float camZ = 7.4 + uScroll * 5.0;
  float w = max(camZ + p.z, 0.15);
  float persp = 3.5 / w;
  vec2 ndc = vec2(p.x * persp, p.y * persp);
  ndc.x *= uRes.y / max(uRes.x, 1.0);

  gl_Position = vec4(ndc, 0.0, 1.0);
  gl_PointSize = clamp(persp * 1.35 * uDpr, 0.55, 4.5 * uDpr);

  float depth = clamp((p.z + 3.3) / 6.6, 0.0, 1.0);
  vCol = mix(uAccent, vec3(0.94, 0.91, 0.86), pow(depth, 1.5));
  vAlpha = (0.10 + 0.46 * depth) * (1.0 - uScroll * 0.92) * uIntro;
}`;

const FRAG = `#version 300 es
precision highp float;
in vec3 vCol;
in float vAlpha;
out vec4 o;
void main(){
  float r = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.02, r) * vAlpha;
  o = vec4(vCol * a, a);
}`;

const ACCENT: [number, number, number] = [61 / 255, 224 / 255, 255 / 255];
const MAX_COUNT = 58000;

/**
 * The point count is the whole GPU cost here. Mid-range and mobile GPUs read
 * the knot fine at a third of the density, so scale it instead of shipping one
 * count that either melts weak hardware or wastes strong hardware.
 */
const pointCount = () => {
  const cores = (navigator as Navigator).hardwareConcurrency ?? 8;
  const small = window.matchMedia?.("(max-width: 768px)").matches;
  if (small) return Math.round(MAX_COUNT * 0.3);
  if (cores <= 6) return Math.round(MAX_COUNT * 0.5);
  return MAX_COUNT;
};

export default function WebglHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let gl: WebGL2RenderingContext | null = null;
    let uniforms: Record<string, WebGLUniformLocation | null> = {};
    let raf = 0;
    let visible = true;
    const mouse = [0, 0];
    const target = [0, 0];
    let scroll = 0;
    let intro = 0;
    const COUNT = pointCount();

    const compile = (type: number, src: string) => {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        throw new Error(gl!.getShaderInfoLog(s) || "shader compile error");
      }
      return s;
    };

    const boot = () => {
      gl = canvas.getContext("webgl2", {
        antialias: false,
        alpha: true,
        premultipliedAlpha: true,
        depth: false,
        powerPreference: "high-performance",
      });
      if (!gl) {
        canvas.style.display = "none";
        return false;
      }
      const p = gl.createProgram()!;
      gl.attachShader(p, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(p) || "program link error");
      }
      gl.useProgram(p);
      uniforms = {};
      for (const n of ["uTime", "uCount", "uScroll", "uDpr", "uIntro", "uRes", "uMouse", "uAccent"]) {
        uniforms[n] = gl.getUniformLocation(p, n);
      }
      gl.bindVertexArray(gl.createVertexArray());
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE);
      gl.uniform3f(uniforms.uAccent, ACCENT[0], ACCENT[1], ACCENT[2]);
      gl.uniform1f(uniforms.uCount, COUNT);
      resize();
      return true;
    };

    const resize = () => {
      if (!gl) return;
      const dpr = Math.min(devicePixelRatio || 1, 1.75);
      const w = Math.max(1, Math.round(wrap.clientWidth * dpr));
      const h = Math.max(1, Math.round(wrap.clientHeight * dpr));
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uniforms.uRes, w, h);
      gl.uniform1f(uniforms.uDpr, dpr);
    };

    const frame = (now: number) => {
      // Stop the loop rather than scheduling no-op frames: a hidden tab or a
      // scrolled-past hero should cost exactly zero, not one callback per vsync.
      if (!gl || !visible || document.hidden) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
      const t = now / 1000;
      intro = Math.min(1, intro + 0.014);
      const ease = reduced ? 1 : 1 - Math.pow(1 - intro, 3);
      const k = reduced ? 1 : 0.055;
      mouse[0] += (target[0] - mouse[0]) * k;
      mouse[1] += (target[1] - mouse[1]) * k;
      gl.uniform1f(uniforms.uTime, reduced ? 4.2 : t);
      gl.uniform1f(uniforms.uIntro, ease);
      gl.uniform1f(uniforms.uScroll, scroll);
      gl.uniform2f(uniforms.uMouse, mouse[0], mouse[1]);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, COUNT);
      // Reduced motion renders one settled frame, then parks the loop.
      if (reduced && intro >= 1) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      target[0] = (e.clientX / innerWidth) * 2 - 1;
      target[1] = (e.clientY / innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const h = wrap.getBoundingClientRect().height || innerHeight;
      scroll = Math.min(1, Math.max(0, (window.scrollY || 0) / h));
    };
    const onContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const start = () => {
      if (raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(frame);
    };
    const onVisibility = () => start();
    const onContextRestored = () => {
      if (boot()) start();
    };

    if (!boot()) return;

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const io = new IntersectionObserver(
      (es) => {
        visible = es[0].isIntersecting;
        start();
      },
      { rootMargin: "120px" },
    );
    io.observe(wrap);
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);
    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}

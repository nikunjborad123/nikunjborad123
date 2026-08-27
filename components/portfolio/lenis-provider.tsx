"use client";

import { useEffect } from "react";

/**
 * Smooth scroll, but never at the cost of the user's own settings or a
 * background tab's CPU.
 *
 * Lenis replaces native scrolling with a rAF-driven interpolation. That is a
 * deliberate trade — it also means an always-on frame loop and a scroll
 * position the browser is no longer authoritative over, so:
 *   - `prefers-reduced-motion` opts out entirely (native scroll, no loop, no
 *     library work at all — motion sensitivity is a real accessibility need,
 *     not a preference to override);
 *   - a hidden tab stops the loop;
 *   - touch devices keep native momentum scrolling, which Lenis cannot match
 *     and which users expect from their OS.
 */
export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let lenis: import("lenis").default | null = null;
    let raf = 0;
    let cancelled = false;

    const loop = (time: number) => {
      if (!lenis || document.hidden) {
        raf = 0;
        return;
      }
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (raf || !lenis || document.hidden) return;
      raf = requestAnimationFrame(loop);
    };
    const onVisibility = () => start();

    // Dynamic import keeps Lenis out of the initial bundle: the page is fully
    // scrollable without it, so it is pure enhancement and can arrive late.
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
      });
      document.addEventListener("visibilitychange", onVisibility);
      start();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return <>{children}</>;
}

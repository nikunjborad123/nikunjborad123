"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * Client boundary that owns *whether* the WebGL hero is ever loaded.
 *
 * `next/dynamic` with `ssr: false` keeps the shader + 58k-point renderer out of
 * the initial JS payload entirely — the chunk is only requested once this
 * component decides the device can afford it. Hero is a Server Component, and
 * `ssr: false` is not allowed there, which is why this thin wrapper exists.
 *
 * The hero is fully readable without it (it is a decorative background layer),
 * so declining to load is always a safe outcome.
 */
const WebglHero = dynamic(() => import("./webgl-hero"), {
  ssr: false,
  loading: () => null,
});

/** Same budget test the particle field uses — see particle-text.tsx. */
const canAffordWebgl = () => {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  if (nav.connection?.saveData) return false;
  if (nav.connection?.effectiveType && /(^|-)(2g|3g)$/.test(nav.connection.effectiveType)) return false;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) return false;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) return false;
  // A soft WebGL2 probe: cheaper to fail here than to ship the chunk and bail.
  return typeof WebGL2RenderingContext !== "undefined";
};

export default function HeroCanvas() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!canAffordWebgl()) return;

    // Deferred past first paint so fetching/compiling the shader chunk can
    // never compete with LCP or add to the page's first-input latency.
    const w = window as Window & {
      requestIdleCallback?: (cb: IdleRequestCallback, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setEnabled(true), { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setEnabled(true), 400);
    return () => window.clearTimeout(id);
  }, []);

  if (!enabled) return null;
  return <WebglHero />;
}

"use client";

import { RefObject, useEffect } from "react";

/**
 * Ported near-verbatim from the Claude Design canvas source
 * (Portfolio.dc.html's `DCLogic` subclass). Kept as one imperative module,
 * driven by data-* attributes via querySelector, exactly like the source —
 * this is a hot path (cursor + scroll) that deliberately avoids React
 * re-renders.
 */
export function usePortfolioInteractions(rootRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanup: Array<() => void> = [];
    const on = <K extends keyof WindowEventMap | string>(
      target: EventTarget,
      type: K,
      fn: EventListenerOrEventListenerObject,
      opts?: boolean | AddEventListenerOptions,
    ) => {
      target.addEventListener(type as string, fn, opts);
      cleanup.push(() => target.removeEventListener(type as string, fn, opts));
    };

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    initReveals();
    initCursor();
    initProgressAndRail();
    initLab();
    initFilters();
    initPipeline();
    initClock();

    /* ---------- scroll reveal (animation-timeline: view()) ---------- */
    function initReveals() {
      const off = reduced;
      const ok = typeof CSS !== "undefined" && CSS.supports("animation-timeline", "view()");
      root!.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const name = el.dataset.anim;
        if (!name) return;
        if (off || !ok) {
          el.style.animation = "none";
          el.style.opacity = "1";
          el.style.transform = "none";
          el.style.clipPath = "none";
          return;
        }
        el.style.animation = name + " 1s linear both";
        el.style.setProperty("animation-timeline", "view()");
        el.style.setProperty("animation-range", el.dataset.reveal || "");
      });
    }

    /* ---------- inspector-reticle cursor + magnetic hover ---------- */
    function initCursor() {
      const reticle = root!.querySelector<HTMLElement>('[data-js="cursor-reticle"]');
      const dot = root!.querySelector<HTMLElement>('[data-js="cursor-dot"]');
      const label = root!.querySelector<HTMLElement>('[data-js="cursor-label"]');
      if (!reticle || !dot || !label) return;
      const fine = matchMedia("(pointer: fine)").matches;
      if (!fine || reduced) return;

      const HIT = "a,button,[data-magnetic],[role='slider'],[data-cursor-label]";
      const IDLE = 26; // idle bracket box, px
      const PAD = 9; // breathing room around a snapped target
      const PRESS = 3; // how far the brackets tighten while held

      let mx = innerWidth / 2;
      let my = innerHeight / 2;
      // animated bracket box (top-left + size), eased toward `desired()`
      let bx = mx - IDLE / 2;
      let by = my - IDLE / 2;
      let bw = IDLE;
      let bh = IDLE;
      let target: HTMLElement | null = null;
      let magnet: HTMLElement | null = null;
      let pressed = false;
      let raf = 0;

      /**
       * The readout printed in the badge. Empty string = no badge.
       * `data-cursor-label` on any element overrides everything below.
       */
      const labelFor = (el: HTMLElement): string => {
        const custom = el.getAttribute("data-cursor-label");
        if (custom) return custom;
        if (el.getAttribute("role") === "slider") return "drag ↔";
        const a = el.closest("a");
        if (a) {
          const href = a.getAttribute("href") || "";
          if (a.hasAttribute("download")) return "download ↓";
          if (href.startsWith("mailto:")) return "email";
          if (href.startsWith("tel:")) return "call";
          if (a.getAttribute("target") === "_blank") return "open ↗";
          if (href.startsWith("#")) return "jump";
          return "view";
        }
        const btn = el.closest("button");
        if (btn) {
          const expanded = btn.getAttribute("aria-expanded");
          if (expanded === "true") return "collapse";
          if (expanded === "false") return "expand";
          if (btn.getAttribute("aria-pressed") === "true") return "active";
          return "select";
        }
        return "";
      };

      const paintLabel = () => {
        const text = target ? labelFor(target) : "";
        if (label.textContent !== text) label.textContent = text;
        reticle.dataset.label = String(!!text);
      };

      const setTarget = (el: HTMLElement | null) => {
        target = el;
        reticle.dataset.mode = !el ? "idle" : el.getAttribute("role") === "slider" ? "drag" : "snap";
        paintLabel();
        if (magnet && magnet !== el) {
          magnet.style.transform = "";
          magnet = null;
        }
        if (el && el.hasAttribute("data-magnetic")) magnet = el;
      };

      /** Where the brackets want to be this frame. */
      const desired = () => {
        if (target && !target.isConnected) setTarget(null);
        if (target) {
          const r = target.getBoundingClientRect();
          // Wrapping something huge reads as a page border, not a cursor —
          // fall back to a fixed focus box riding the pointer.
          if (r.width <= innerWidth * 0.8 && r.height <= innerHeight * 0.5) {
            const p = pressed ? PAD - PRESS : PAD;
            return { x: r.left - p, y: r.top - p, w: r.width + p * 2, h: r.height + p * 2 };
          }
          return { x: mx - 22, y: my - 22, w: 44, h: 44 };
        }
        const s = pressed ? IDLE - PRESS * 2 : IDLE;
        return { x: mx - s / 2, y: my - s / 2, w: s, h: s };
      };

      const move = (e: PointerEvent) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
        reticle.dataset.visible = "true";
        dot.style.opacity = "1";
        const hit = e.target instanceof Element ? (e.target.closest(HIT) as HTMLElement | null) : null;
        if (hit !== target) setTarget(hit);
        if (magnet) {
          const b = magnet.getBoundingClientRect();
          const dx = (mx - (b.left + b.width / 2)) * 0.16;
          const dy = (my - (b.top + b.height / 2)) * 0.16;
          magnet.style.transform = `translate3d(${dx.toFixed(2)}px,${dy.toFixed(2)}px,0)`;
        }
      };
      const leave = () => {
        reticle.dataset.visible = "false";
        dot.style.opacity = "0";
      };
      const loop = () => {
        const d = desired();
        // Snapped brackets chase harder so they stay glued to a moving target.
        const k = target ? 0.3 : 0.2;
        bx += (d.x - bx) * k;
        by += (d.y - by) * k;
        bw += (d.w - bw) * k;
        bh += (d.h - bh) * k;
        reticle.style.transform = `translate3d(${bx.toFixed(2)}px,${by.toFixed(2)}px,0)`;
        reticle.style.width = bw.toFixed(2) + "px";
        reticle.style.height = bh.toFixed(2) + "px";
        // Flip the badge above the box when it would fall off the fold.
        reticle.dataset.flip = String(by + bh + 34 > innerHeight);

        // An exponential ease never mathematically arrives. Once every axis is
        // inside half a pixel of its goal the next frame would be visually
        // identical, so park the loop; `wake()` restarts it on the next input.
        // Without this the page holds a rAF callback open for its entire life.
        const settled =
          Math.abs(d.x - bx) < 0.5 &&
          Math.abs(d.y - by) < 0.5 &&
          Math.abs(d.w - bw) < 0.5 &&
          Math.abs(d.h - bh) < 0.5;
        raf = settled ? 0 : requestAnimationFrame(loop);
      };
      const wake = () => {
        if (!raf && !document.hidden) raf = requestAnimationFrame(loop);
      };
      on(window, "pointermove", move as EventListener, { passive: true });
      on(window, "pointermove", wake, { passive: true });
      on(window, "scroll", wake, { passive: true });
      on(document, "pointerleave", leave as EventListener);
      on(window, "pointerdown", (() => {
        pressed = true;
        reticle.dataset.press = "true";
        wake();
      }) as EventListener);
      on(window, "pointerup", (() => {
        pressed = false;
        reticle.dataset.press = "false";
        paintLabel(); // aria-expanded / aria-pressed may have just flipped
        wake();
      }) as EventListener);
      raf = requestAnimationFrame(loop);
      cleanup.push(() => cancelAnimationFrame(raf));
      root!.classList.add("has-custom-cursor");
      cleanup.push(() => root!.classList.remove("has-custom-cursor"));
    }

    /* ---------- scroll progress + section rail ---------- */
    function initProgressAndRail() {
      const bar = root!.querySelector<HTMLElement>('[data-js="progress-bar"]');
      if (!bar) return;
      const links = Array.from(root!.querySelectorAll<HTMLElement>("[data-rail]"));

      let ticking = false;
      const paint = () => {
        ticking = false;
        const max = document.documentElement.scrollHeight - innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
        bar.style.width = (p * 100).toFixed(2) + "%";
      };
      on(
        window,
        "scroll",
        () => {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(paint);
          }
        },
        { passive: true },
      );
      paint();

      if (!links.length) return;
      const setActive = (id: string) => {
        links.forEach((l) => {
          const active = l.dataset.rail === id;
          l.dataset.active = String(active);
        });
      };
      const io = new IntersectionObserver(
        (entries) => {
          const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (vis[0]) setActive(vis[0].target.id);
        },
        { threshold: [0.12, 0.4, 0.7], rootMargin: "-20% 0px -35% 0px" },
      );
      links.forEach((l) => {
        const el = document.getElementById(l.dataset.rail || "");
        if (el) io.observe(el);
      });
      cleanup.push(() => io.disconnect());
    }

    /* ---------- interactive load-waterfall playhead ---------- */
    function initLab() {
      const track = root!.querySelector<HTMLElement>("[data-lab-track]");
      const head = root!.querySelector<HTMLElement>("[data-lab-head]");
      const label = root!.querySelector<HTMLElement>("[data-lab-time]");
      if (!track || !head || !label) return;
      const SPAN = 5.4;
      const bars = Array.from(track.querySelectorAll<HTMLElement>("[data-bar]")).map((el) => {
        const [s, e] = (el.dataset.bar || "0,0").split(",").map(Number);
        el.style.transformOrigin = "left";
        return { el, s, e };
      });
      const frames = (["before", "after"] as const)
        .map((key, i) => ({
          root: root!.querySelector<HTMLElement>(`[data-lab-frame="${key}"]`),
          paint: i === 0 ? 3.9 : 0.62,
          skeleton: i === 0 ? 1.8 : 0.2,
        }))
        .filter((f): f is { root: HTMLElement; paint: number; skeleton: number } => !!f.root)
        .map((f) => ({
          ...f,
          states: {
            blank: f.root.querySelector<HTMLElement>('[data-state="blank"]'),
            skeleton: f.root.querySelector<HTMLElement>('[data-state="skeleton"]'),
            painted: f.root.querySelector<HTMLElement>('[data-state="painted"]'),
          },
        }));

      let t = 0;
      const render = () => {
        const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
        const usable = track.clientWidth - pad * 2;
        head.style.left = (pad + (t / SPAN) * usable).toFixed(1) + "px";
        label.textContent = t.toFixed(2) + "s";
        track.setAttribute("aria-valuenow", t.toFixed(2));
        track.setAttribute("aria-valuetext", t.toFixed(2) + " seconds");
        bars.forEach((b) => {
          const done = t >= b.e;
          const active = t >= b.s && t < b.e;
          b.el.style.opacity = t < b.s ? "0.16" : "1";
          b.el.style.transform = active
            ? "scaleX(" + Math.max(0.02, (t - b.s) / (b.e - b.s)).toFixed(3) + ")"
            : done
              ? "scaleX(1)"
              : "scaleX(0.02)";
        });
        frames.forEach((f) => {
          const stage = t >= f.paint ? "painted" : t >= f.skeleton ? "skeleton" : "blank";
          (Object.keys(f.states) as Array<keyof typeof f.states>).forEach((k) => {
            const el = f.states[k];
            if (el) el.dataset.visible = String(k === stage);
          });
        });
      };

      const setFromClientX = (cx: number) => {
        const r = track.getBoundingClientRect();
        const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
        const usable = r.width - pad * 2;
        t = Math.min(SPAN, Math.max(0, ((cx - r.left - pad) / usable) * SPAN));
        render();
      };

      let dragging = false;
      on(track, "pointerdown", ((e: PointerEvent) => {
        dragging = true;
        track.setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      }) as EventListener);
      on(track, "pointermove", ((e: PointerEvent) => {
        if (dragging) setFromClientX(e.clientX);
      }) as EventListener);
      on(track, "pointerup", (() => {
        dragging = false;
      }) as EventListener);
      on(track, "pointercancel", (() => {
        dragging = false;
      }) as EventListener);
      on(track, "keydown", ((e: KeyboardEvent) => {
        const step = e.shiftKey ? 0.5 : 0.1;
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          t = Math.min(SPAN, t + step);
          render();
          e.preventDefault();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          t = Math.max(0, t - step);
          render();
          e.preventDefault();
        } else if (e.key === "Home") {
          t = 0;
          render();
          e.preventDefault();
        } else if (e.key === "End") {
          t = SPAN;
          render();
          e.preventDefault();
        }
      }) as EventListener);
      const ro = new ResizeObserver(() => render());
      ro.observe(track);
      cleanup.push(() => ro.disconnect());

      render();

      const lab = root!.querySelector<HTMLElement>("[data-lab]");
      let played = false;
      if (lab && !reduced) {
        const io = new IntersectionObserver(
          (es) => {
            if (!es[0].isIntersecting || played) return;
            played = true;
            const start = performance.now();
            const tick = (now: number) => {
              if (dragging) return;
              const k = Math.min(1, (now - start) / 2600);
              t = k * SPAN;
              render();
              if (k < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          },
          { threshold: 0.35 },
        );
        io.observe(lab);
        cleanup.push(() => io.disconnect());
      }
    }

    /* ---------- stack filter ---------- */
    function initFilters() {
      const btns = Array.from(root!.querySelectorAll<HTMLButtonElement>("[data-filter]"));
      const cards = Array.from(root!.querySelectorAll<HTMLElement>("[data-cat]"));
      if (!btns.length || !cards.length) return;
      const apply = (key: string) => {
        btns.forEach((b) => {
          const on = b.dataset.filter === key;
          b.setAttribute("aria-pressed", String(on));
        });
        cards.forEach((c) => {
          const show = key === "all" || c.dataset.cat === key;
          c.dataset.hidden = String(!show);
          if (show) {
            c.style.animationName = "none";
            c.style.opacity = "0";
            requestAnimationFrame(() => {
              c.style.transition = "opacity .4s ease";
              c.style.opacity = "1";
            });
          }
        });
      };
      btns.forEach((b) => on(b, "click", () => apply(b.dataset.filter || "all")));
    }

    /* ---------- AI pipeline accordion ---------- */
    function initPipeline() {
      const items = Array.from(root!.querySelectorAll<HTMLElement>("[data-step]"))
        .map((li) => ({
          li,
          btn: li.querySelector<HTMLButtonElement>("[data-step-toggle]"),
          body: li.querySelector<HTMLElement>("[data-step-body]"),
          icon: li.querySelector<HTMLElement>("[data-step-icon]"),
        }))
        .filter((i): i is { li: HTMLElement; btn: HTMLButtonElement; body: HTMLElement; icon: HTMLElement | null } => !!i.btn && !!i.body);
      if (!items.length) return;

      const setOpen = (item: (typeof items)[number], open: boolean) => {
        item.btn.setAttribute("aria-expanded", String(open));
        if (item.icon) item.icon.dataset.open = String(open);
        item.body.style.height = open ? item.body.scrollHeight + "px" : "0px";
        item.body.style.opacity = open ? "1" : "0";
      };
      items.forEach((it, i) => {
        setOpen(it, i === 0);
        on(it.btn, "click", () => {
          const open = it.btn.getAttribute("aria-expanded") !== "true";
          items.forEach((o) => setOpen(o, o === it ? open : false));
        });
      });
      const pipe = root!.querySelector<HTMLElement>("[data-pipeline]");
      if (pipe) {
        const ro = new ResizeObserver(() => {
          items.forEach((it) => {
            if (it.btn.getAttribute("aria-expanded") === "true") it.body.style.height = it.body.scrollHeight + "px";
          });
        });
        ro.observe(pipe);
        cleanup.push(() => ro.disconnect());
      }
    }

    /* ---------- live IST clock ---------- */
    function initClock() {
      const el = root!.querySelector<HTMLElement>("[data-clock]");
      if (!el) return;
      const fmt = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const tick = () => {
        el.textContent = fmt.format(new Date()) + " IST";
      };
      tick();

      // A once-a-second DOM write is cheap but pointless in a background tab,
      // and it keeps timer wakeups (and battery drain) going indefinitely.
      let id = 0;
      const run = () => {
        if (id) return;
        id = window.setInterval(tick, 1000);
      };
      const halt = () => {
        window.clearInterval(id);
        id = 0;
      };
      const onVisibility = () => {
        if (document.hidden) {
          halt();
        } else {
          tick(); // resync immediately; it may have been hidden for minutes
          run();
        }
      };
      run();
      on(document, "visibilitychange", onVisibility);
      cleanup.push(halt);
    }

    return () => cleanup.forEach((fn) => fn());
  }, [rootRef]);
}

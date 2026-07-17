"use client";

import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type ScrollTarget = string | HTMLElement | number;

interface LenisCtx {
  scrollTo: (target: ScrollTarget, opts?: { offset?: number }) => void;
  lenis: Lenis | null;
}

const Ctx = createContext<LenisCtx>({ scrollTo: () => {}, lenis: null });

export const useSmoothScroll = () => useContext(Ctx);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Respect users who prefer reduced motion — no inertia.
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      duration: reduce ? 0 : 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduce,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      lerp: reduce ? 1 : 0.09,
    });

    lenisRef.current = lenis;
    setReady(true);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo: LenisCtx["scrollTo"] = (target, opts) => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    let t: ScrollTarget = target;
    if (typeof target === "string" && !target.startsWith("#")) {
      t = `#${target}`;
    }
    lenis.scrollTo(t as string | number | HTMLElement, {
      offset: opts?.offset ?? 0,
      duration: 1.6,
      easing: (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
    });
  };

  return (
    <Ctx.Provider value={{ scrollTo, lenis: ready ? lenisRef.current : null }}>
      {/* Respect prefers-reduced-motion for every framer-motion animation:
          transform/scale/layout animations are skipped, opacity still resolves. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </Ctx.Provider>
  );
}

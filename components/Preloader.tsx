"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/anim";
import { brand } from "@/data/site";

/**
 * An opening curtain. Counts up while the film buffers, then lifts.
 */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    const DURATION = 2200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 260);
    };
    raf = requestAnimationFrame(tick);
    // Wall-clock safety net: rAF is paused in background tabs, so if the page
    // is loaded unfocused the counter would stall and leave the site locked.
    // setTimeout still fires (throttled) when hidden — guarantee the curtain lifts.
    const safety = window.setTimeout(() => setDone(true), DURATION + 1200);
    // Always restore scroll on unmount — never strand the page as unscrollable.
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(safety);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="flex flex-col items-center"
          >
            {/* Lockup mirrors CinematicHero so the curtain-lift is a match-cut,
                not a reshuffle: city eyebrow above, tagline serif-italic below. */}
            <span className="eyebrow mb-8 text-marble/80">{brand.city}</span>
            <h1 className="display t-hero text-marble">VELMONT</h1>
            <p className="mt-4 font-serif text-2xl italic text-marble/70 md:text-3xl">
              {brand.tagline}
            </p>
          </motion.div>

          <div className="absolute bottom-16 left-0 right-0 px-8">
            <div className="mx-auto flex max-w-6xl items-end justify-between">
              <span className="eyebrow text-[0.6rem] text-marble/50">
                Composing the experience
              </span>
              <span className="display text-4xl text-marble/80 md:text-5xl">
                {count}
              </span>
            </div>
            <div className="mx-auto mt-5 h-px max-w-6xl overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-bronze-light"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

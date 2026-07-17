"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

/**
 * A quiet architectural way-finder pinned to the right margin:
 * current floor + room name, and a thread that fills as you descend.
 */
export default function FloorIndicator() {
  const [room, setRoom] = useState({ floor: "00", name: "Grand Entrance" });
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-room]")
    );
    if (!sections.length) return;

    // Select whichever section crosses the viewport centre — a thin center
    // band — so ratio can't bias against the tall (560vh) hero.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          setRoom({
            floor: el.dataset.floor ?? "",
            name: el.dataset.name ?? "",
          });
          break;
        }
      },
      { threshold: 0, rootMargin: "-50% 0px -49% 0px" }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed right-[clamp(0.9rem,2.4vw,2.4rem)] top-1/2 z-[70] hidden -translate-y-1/2 flex-col items-center gap-5 mix-blend-difference lg:flex">
      <span className="display text-3xl leading-none text-white">
        {room.floor}
      </span>
      <div className="relative h-40 w-px bg-white/25">
        <motion.div
          className="absolute inset-x-0 top-0 origin-top bg-white"
          style={{ scaleY: scrollYProgress, height: "100%" }}
        />
      </div>
      <span
        className="text-[0.6rem] uppercase tracking-[0.3em] text-white"
        style={{ writingMode: "vertical-rl" }}
      >
        {room.name}
      </span>
    </div>
  );
}

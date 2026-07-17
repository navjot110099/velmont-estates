"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import RoomShell from "@/components/ui/RoomShell";
import Reveal from "@/components/ui/Reveal";
import SectionIntro from "@/components/ui/SectionIntro";
import LuxuryImage from "@/components/ui/LuxuryImage";
import { testimonials } from "@/data/site";

// Signature Velmont easing — the same curve used across the site.
const EASE = [0.16, 1, 0.3, 1] as const;
const INTERVAL = 6000;

// Directional crossfade for the on-screen quote.
const quoteVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? 34 : -34,
    filter: "blur(8px)",
  }),
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? -34 : 34,
    filter: "blur(8px)",
  }),
};

/**
 * HOME THEATER — Testimonials as a private screening room.
 * One large quote on screen at a time (auto-advancing crossfade),
 * a decorative "video testimonial" panel, and cinematic controls.
 */
export default function HomeTheater() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const count = testimonials.length;
  const active = testimonials[index];

  // Auto-advance every ~6s; restarts on manual nav; pauses on hover/focus.
  // Never auto-advance for users who prefer reduced motion.
  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % count);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [index, paused, count, reduceMotion]);

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + count) % count);
  };

  const select = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  return (
    <RoomShell id="theater" floor="06" name="Home Theater" theme="dark">
      <div className="edge-x">
        {/* Header */}
        <SectionIntro
          eyebrow="In Their Words"
          title={"The verdict of\nthe *discerning.*"}
          align="center"
          className="mx-auto max-w-3xl"
        />

        {/* Screening room */}
        <div
          className="relative mt-16 md:mt-24"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Ambient bronze glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[70%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, rgba(176,141,87,0.20), transparent 70%)",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* On-screen quote */}
            <div className="relative min-h-[19rem] md:min-h-[21rem]">
              <span
                aria-hidden
                className="font-serif absolute -left-2 -top-8 select-none text-[8rem] leading-none text-bronze/15 md:-top-10 md:text-[10rem]"
              >
                &ldquo;
              </span>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.blockquote
                  key={index}
                  custom={direction}
                  variants={quoteVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.8, ease: EASE }}
                  className="relative"
                >
                  <p className="font-serif text-[clamp(1.5rem,3.4vw,2.9rem)] font-light italic leading-[1.28] text-marble/95">
                    {active.quote}
                  </p>

                  <footer className="mt-9 flex items-center gap-4">
                    <LuxuryImage
                      src={active.img}
                      alt={active.name}
                      className="h-14 w-14 shrink-0 rounded-full"
                      gradient="linear-gradient(135deg,#2a2622,#3a3128)"
                    />
                    <div>
                      <div className="font-serif text-lg font-light text-marble">
                        {active.name}
                      </div>
                      <div className="eyebrow mt-1.5 text-[0.6rem] bronze-text">
                        {active.role}
                      </div>
                    </div>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Decorative video-testimonial panel */}
            <Reveal delay={0.1}>
              <div className="group relative aspect-video w-full overflow-hidden rounded-sm hairline border">
                <AnimatePresence>
                  <motion.div
                    key={index}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: EASE }}
                  >
                    <LuxuryImage
                      src={active.img}
                      alt={`${active.name} — video testimonial still`}
                      className="h-full w-full"
                      gradient="linear-gradient(135deg,#141315,#241f1a)"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Cinematic dark overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/45" />

                {/* Pulsing play button (purely visual) */}
                <div
                  aria-hidden
                  className="absolute inset-0 grid place-items-center"
                >
                  <span className="relative grid place-items-center">
                    {[0, 1.3].map((d) => (
                      <motion.span
                        key={d}
                        className="absolute h-16 w-16 rounded-full border border-bronze/40"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.9, opacity: 0 }}
                        transition={{
                          duration: 2.6,
                          delay: d,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                    <span className="relative grid h-16 w-16 place-items-center rounded-full glass text-bronze-light transition-colors duration-500 ease-luxe group-hover:text-bronze-glow">
                      <svg
                        width="20"
                        height="22"
                        viewBox="0 0 20 22"
                        fill="currentColor"
                        className="ml-1"
                      >
                        <path d="M1 1.3 19 11 1 20.7Z" />
                      </svg>
                    </span>
                  </span>
                </div>

                {/* Panel caption */}
                <div className="pointer-events-none absolute bottom-4 left-5 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-bronze-light" />
                  <span className="eyebrow text-[0.58rem] text-marble/70">
                    Video Testimonial
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Controls */}
          <Reveal delay={0.15} className="relative z-10 mt-14 md:mt-20">
            <div className="flex items-center justify-center gap-7">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(-1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-marble/70 transition-colors duration-500 ease-luxe hover:border-bronze/60 hover:text-marble"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10 2 4 8l6 6"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-3">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    aria-label={`Show testimonial from ${t.name}`}
                    aria-current={i === index}
                    onClick={() => select(i)}
                    className="group flex h-6 items-center"
                  >
                    <span
                      className={
                        "h-[3px] rounded-full transition-all duration-500 ease-luxe " +
                        (i === index
                          ? "w-8 bg-bronze"
                          : "w-3 bg-marble/25 group-hover:bg-marble/50")
                      }
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-marble/70 transition-colors duration-500 ease-luxe hover:border-bronze/60 hover:text-marble"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 2l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6 text-center">
              <span className="eyebrow text-[0.6rem] text-marble/40">
                {String(index + 1).padStart(2, "0")}
                <span className="mx-2 text-bronze/50">/</span>
                {String(count).padStart(2, "0")}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </RoomShell>
  );
}

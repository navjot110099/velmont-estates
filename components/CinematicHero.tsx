"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
} from "framer-motion";
import { brand } from "@/data/site";
import { EASE } from "@/lib/anim";

/**
 * CINEMATIC HERO
 * A fullscreen mansion film scrubbed by scroll. The stage is tall; the
 * video is pinned. Scroll position drives video.currentTime through a
 * frame-rate-independent lerp so the footage feels hand-eased rather than
 * snapped — and stays consistent across 30/60/120 Hz displays. As the
 * camera settles inside the completed residence, the final frame is held
 * and the Grand Entrance resolves over it — an almost invisible handoff
 * from film to website.
 *
 * Performance / accessibility:
 *  • The ~58 MB master is shipped as compressed MP4 + WebM, in desktop and
 *    mobile resolutions; the browser picks the smallest it can play.
 *  • The <video> is attached only after mount (client-side), with
 *    preload="metadata", so the initial document is light and the film is
 *    fetched lazily via range requests as the viewer scrubs.
 *  • Under prefers-reduced-motion we never scrub: a single poster still is
 *    shown in a one-screen hero instead of the tall scroll stage.
 */

const POSTER = "/videos/mansion-poster.jpg";
const SOURCES = {
  desktop: {
    webm: "/videos/mansion-desktop.webm",
    mp4: "/videos/mansion-desktop.mp4",
  },
  mobile: {
    webm: "/videos/mansion-mobile.webm",
    mp4: "/videos/mansion-mobile.mp4",
  },
};

export default function CinematicHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  // Synchronous guard so the prime routine truly runs once (a state flag would
  // read stale inside the effect and re-fire on the first wheel event).
  const primedRef = useRef(false);

  // Resolved after mount so SSR/first paint is a lightweight poster hero and
  // we never cause a hydration mismatch (window is read in an effect only).
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Scrub only once we've mounted and motion is allowed.
  const scrub = mounted && !reduced;

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  // Latest scrub target time (seconds) — updated from scroll, consumed by rAF.
  const targetTime = useMotionValue(0);

  // Reserve the tail of the scroll for the film→site resolution.
  const SCRUB_END = 0.82;
  // Skip the fade-from-black intro so the hero rests on a lit frame (the
  // aerial "vision" of the land, matching the poster) and scrubs from there
  // into the finished residence — vision → reality.
  const FILM_START = 1.5;

  // Detect reduced-motion + viewport tier after mount, and keep them live.
  useEffect(() => {
    setMounted(true);
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 768px)");
    const sync = () => {
      setReduced(mqReduce.matches);
      setIsMobile(mqMobile.matches);
    };
    sync();
    mqReduce.addEventListener("change", sync);
    mqMobile.addEventListener("change", sync);
    return () => {
      mqReduce.removeEventListener("change", sync);
      mqMobile.removeEventListener("change", sync);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!scrub || !duration) return;
    const vp = Math.min(p / SCRUB_END, 1);
    targetTime.set(FILM_START + vp * (duration - FILM_START - 0.05));
  });

  // Prime the decoder (muted play→pause) so seeking is responsive, esp. mobile.
  // Keyed on `scrub` so it attaches once the <video> actually mounts.
  useEffect(() => {
    if (!scrub) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true; // ensure muted so programmatic seek/prime is allowed
    const onMeta = () => {
      setDuration(v.duration || 0);
      // Rest on the lit opening frame rather than the black fade-in.
      if (targetTime.get() < FILM_START) {
        targetTime.set(FILM_START);
        if (v.readyState >= 1) v.currentTime = FILM_START;
      }
    };
    v.addEventListener("loadedmetadata", onMeta);
    if (v.readyState >= 1) onMeta();

    const prime = () => {
      if (primedRef.current) return;
      primedRef.current = true;
      const play = v.play();
      if (play && typeof play.then === "function") {
        play
          .then(() => {
            v.pause();
            // Settle on the lit opening frame if scrubbing hasn't begun —
            // otherwise this would snap the film backward on the first scroll.
            if (targetTime.get() <= FILM_START + 0.02) v.currentTime = FILM_START;
          })
          .catch(() => {});
      }
    };
    prime();
    window.addEventListener("pointerdown", prime, { once: true });
    window.addEventListener("wheel", prime, { once: true, passive: true });
    window.addEventListener("touchstart", prime, { once: true, passive: true });

    return () => {
      v.removeEventListener("loadedmetadata", onMeta);
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("wheel", prime);
      window.removeEventListener("touchstart", prime);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrub]);

  // Frame-rate-independent lerp: ease video.currentTime toward the scroll
  // target using an exponential time-constant, so the feel is identical on a
  // 30 Hz tablet and a 120 Hz laptop. Precise currentTime seeks (not fastSeek)
  // stay cheap because the film is encoded with a dense GOP. The loop idles
  // once the film has fully handed off, freeing a frame slot for Lenis.
  useEffect(() => {
    if (!scrub) return;
    const v = videoRef.current;
    if (!v) return;
    let raf = 0;
    let running = false;
    let last = performance.now();
    const TAU = 0.11; // seconds — time constant of the ease
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05); // clamp to avoid jumps
      last = now;
      if (duration && v.readyState >= 2 && !v.seeking) {
        const target = targetTime.get();
        const cur = v.currentTime;
        const diff = target - cur;
        if (Math.abs(diff) > 0.008) {
          const alpha = 1 - Math.exp(-dt / TAU);
          const next = cur + diff * alpha;
          v.currentTime = Math.max(0, Math.min(next, duration - 0.02));
        }
      }
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    start();
    const unsub = scrollYProgress.on("change", (p) => {
      if (p < 1) start();
      else stop();
    });
    return () => {
      stop();
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrub, duration]);

  // ---- Overlay choreography driven by scroll progress ----
  // Opening title: present at rest, dissolves as the descent begins.
  const introOpacity = useTransform(scrollYProgress, [0, 0.06, 0.13], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.13], [0, -60]);
  const introScale = useTransform(scrollYProgress, [0, 0.13], [1, 1.06]);

  // Scroll cue.
  const cueOpacity = useTransform(scrollYProgress, [0, 0.04, 0.1], [1, 1, 0]);

  // Film grade — a warm vignette deepens as we move inside.
  const vignette = useTransform(scrollYProgress, [0.4, 1], [0.15, 0.72]);

  // Handoff: the Grand Entrance resolves over the held final frame.
  const entranceOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.9, 1],
    [0, 1, 1]
  );
  const entranceY = useTransform(scrollYProgress, [0.72, 1], [40, 0]);
  const filmBlur = useTransform(scrollYProgress, [0.82, 1], [0, 6]);
  const filmScale = useTransform(scrollYProgress, [0.82, 1], [1, 1.08]);
  const filmDim = useTransform(scrollYProgress, [0.82, 1], [1, 0.5]);
  const filmBlurFilter = useTransform(filmBlur, (b) => `blur(${b}px)`);

  const tier = isMobile ? SOURCES.mobile : SOURCES.desktop;

  // ---------------------------------------------------------------
  // Reduced-motion / pre-mount hero: a single poster still, no scrub.
  // ---------------------------------------------------------------
  if (!scrub) {
    return (
      <header
        id="entrance"
        data-room
        data-floor="00"
        data-name="Grand Entrance"
        className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-ink"
      >
        {/* Poster is pre-optimized and full-bleed; a plain <img> (loaded
            eagerly as the LCP element) is lighter here than next/image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={POSTER}
          alt="A Velmont Estates residence — the opening frame of the cinematic tour."
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70"
        />
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <span className="eyebrow mb-8 text-marble/80">{brand.city}</span>
          <h1 className="display t-hero text-marble">VELMONT</h1>
          <p className="mt-4 font-serif text-2xl italic text-marble/70 md:text-3xl">
            {brand.tagline}
          </p>
          <span className="eyebrow mt-14 text-[0.6rem] text-marble/60">
            Scroll to explore the residence
          </span>
        </div>
      </header>
    );
  }

  // ---------------------------------------------------------------
  // Full cinematic scrub hero.
  // ---------------------------------------------------------------
  return (
    <header
      ref={stageRef}
      id="entrance"
      data-room
      data-floor="00"
      data-name="Grand Entrance"
      className="relative h-[560vh] w-full bg-ink"
    >
      {/* Pinned viewport — dynamic viewport height so mobile browser chrome
          doesn't wobble the film on the opening scroll. */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Film */}
        <motion.div
          aria-hidden
          className="absolute inset-0 h-full w-full"
          style={{ filter: filmBlurFilter, scale: filmScale, opacity: filmDim }}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster={POSTER}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src={tier.webm} type="video/webm" />
            <source src={tier.mp4} type="video/mp4" />
          </video>
        </motion.div>

        {/* Base cinematic grade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 45%, transparent 40%, #000 100%)",
            opacity: vignette,
          }}
        />

        {/* Opening title */}
        <motion.div
          style={{ opacity: introOpacity, y: introY, scale: introScale }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.6em", y: 20 }}
            animate={{ opacity: 1, letterSpacing: "0.35em", y: 0 }}
            transition={{ duration: 2, ease: EASE, delay: 0.3 }}
            className="eyebrow mb-8 text-marble/80"
          >
            {brand.city}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: EASE, delay: 0.5 }}
            className="display t-hero text-marble"
          >
            VELMONT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: EASE, delay: 1.1 }}
            className="mt-4 font-serif text-2xl italic text-marble/70 md:text-3xl"
          >
            {brand.tagline}
          </motion.p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          aria-hidden
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="eyebrow text-[0.6rem] text-marble/60">
            Scroll to enter
          </span>
          <span className="relative flex h-12 w-px overflow-hidden bg-marble/20">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-bronze-light"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
            />
          </span>
        </motion.div>

        {/* ---- The handoff: Grand Entrance resolves over the final frame ---- */}
        <motion.div
          style={{ opacity: entranceOpacity, y: entranceY }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
        >
          <span className="eyebrow mb-6 text-bronze-light">
            00 — Grand Entrance
          </span>
          <h2 className="display t-h1 max-w-[14ch] text-marble">
            Welcome to Velmont
          </h2>
          <p className="body-lux mt-8 max-w-md text-marble/70">
            You have arrived. Beyond this threshold, every room tells the story
            of a life composed without compromise.
          </p>
          <motion.div
            aria-hidden
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
            className="mt-14 flex flex-col items-center gap-2 text-marble/50"
          >
            <span className="eyebrow text-[0.58rem]">Continue the tour</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <path
                d="M8 1v22M1 16l7 7 7-7"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Loading whisper until metadata is ready */}
        {!duration && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-ink">
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="eyebrow text-marble/60"
            >
              Velmont
            </motion.span>
          </div>
        )}
      </div>
    </header>
  );
}

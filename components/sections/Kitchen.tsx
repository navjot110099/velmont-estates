"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RoomShell from "@/components/ui/RoomShell";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import LuxuryImage from "@/components/ui/LuxuryImage";
import { services } from "@/data/site";

// Signature Velmont easing — mirrors lib/anim EASE, inlined to stay self-contained.
const EASE = [0.16, 1, 0.3, 1] as const;

// Warm marble/bronze underlays so every preview resolves gracefully.
const GRADIENTS = [
  "linear-gradient(135deg,#e8e2d6 0%,#c9a877 100%)",
  "linear-gradient(135deg,#efe9dd 0%,#b08d57 100%)",
  "linear-gradient(135deg,#dcd4c4 0%,#8a6d3f 100%)",
  "linear-gradient(135deg,#f0ebe0 0%,#c9a877 100%)",
  "linear-gradient(135deg,#e4ddce 0%,#8a6d3f 100%)",
  "linear-gradient(135deg,#efe9dd 0%,#b08d57 100%)",
];

/**
 * KITCHEN — The Atelier's six disciplines, served as a couture menu.
 * A bright Italian-marble editorial index: on desktop a numbered list
 * drives a floating image preview that crossfades on hover; on mobile
 * it degrades to a stacked grid of elegant cards.
 */
export default function Kitchen() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <RoomShell id="kitchen" floor="02" name="Kitchen" theme="light">
      <div className="edge-x">
        {/* Eyebrow + headline + lead */}
        <div className="max-w-5xl">
          <Reveal className="flex items-center gap-4">
            <span className="h-px w-10 bg-bronze/60" />
            <span className="eyebrow bronze-text">The Atelier</span>
          </Reveal>
          <RevealText
            as="h2"
            text={"Six disciplines,\none quiet *obsession.*"}
            delay={0.05}
            className="display t-h2 mt-8 max-w-[16ch] text-ink"
          />
          <Reveal
            as="p"
            delay={0.2}
            className="body-lux mt-8 max-w-xl text-base opacity-70 md:text-lg"
          >
            One studio, one commission at a time. Each discipline is drawn by
            hand and answerable to the same standard — that nothing be left to
            chance, and nothing be repeated.
          </Reveal>
        </div>

        {/* ── Desktop: interactive index + floating preview ───────────── */}
        <div className="mt-20 hidden gap-16 lg:mt-24 lg:grid lg:grid-cols-[1fr_0.72fr] lg:gap-24">
          {/* Left — numbered menu */}
          <ul className="border-t hairline-dark">
            {services.map((s, i) => (
              <li
                key={s.n}
                tabIndex={0}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-label={`${s.title} — ${s.desc}`}
                className="group relative cursor-pointer border-b hairline-dark"
              >
                <div className="flex items-baseline gap-7 py-9 lg:py-10">
                  {/* Number — fades as the title advances */}
                  <span className="eyebrow shrink-0 pt-1 text-[0.7rem] tabular-nums text-ink/40 transition-opacity duration-500 ease-luxe group-hover:opacity-30 group-focus-within:opacity-30">
                    {s.n}
                  </span>

                  <div className="min-w-0">
                    {/* Title — slides right and warms to bronze on hover/focus */}
                    <h3 className="font-serif inline-block text-3xl font-light leading-tight text-ink transition-[transform,color] duration-500 ease-luxe group-hover:translate-x-2 group-hover:text-bronze-dark group-focus-within:translate-x-2 group-focus-within:text-bronze-dark lg:text-[2.6rem]">
                      {s.title}
                      {/* Underline draws in from the left */}
                      <span className="mt-2 block h-px origin-left scale-x-0 bg-bronze-dark/70 transition-transform duration-[650ms] ease-luxe group-hover:scale-x-100 group-focus-within:scale-x-100" />
                    </h3>

                    {/* One-line description reveal (hover or keyboard focus) */}
                    <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-[650ms] ease-luxe group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100">
                      <p className="body-lux overflow-hidden pt-0 text-sm leading-relaxed text-ink/60 group-hover:pt-4 group-focus-within:pt-4">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Right — floating preview panel (hidden below lg) */}
          <div className="relative hidden lg:block">
            <div className="sticky top-[16vh]">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm hairline-dark ring-1 ring-ink/10">
                <AnimatePresence>
                  <motion.div
                    key={current.n}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <LuxuryImage
                      src={current.img}
                      alt={current.title}
                      className="h-full w-full"
                      gradient={GRADIENTS[active]}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Caption overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="pointer-events-none absolute bottom-6 left-6 right-6">
                  <span className="eyebrow text-[0.6rem] text-marble/70">
                    {current.n} · The Atelier
                  </span>
                  <p className="font-serif mt-2 text-2xl font-light text-marble">
                    {current.title}
                  </p>
                </div>
              </div>
              <p className="body-lux mt-6 text-xs uppercase tracking-[0.28em] text-ink/35">
                Hover to preview
              </p>
            </div>
          </div>
        </div>

        {/* ── Mobile & tablet: stacked card grid ──────────────────────── */}
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:hidden">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06} as="figure" className="group">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm ring-1 ring-ink/10">
                <LuxuryImage
                  src={s.img}
                  alt={s.title}
                  className="h-full w-full"
                  gradient={GRADIENTS[i]}
                />
                <span className="absolute left-4 top-4 eyebrow text-[0.6rem] text-marble/80">
                  {s.n}
                </span>
              </div>
              <figcaption className="mt-5 border-b hairline-dark pb-8">
                <h3 className="font-serif text-2xl font-light leading-tight text-ink">
                  {s.title}
                </h3>
                <p className="body-lux mt-3 text-sm leading-relaxed text-ink/60">
                  {s.desc}
                </p>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </RoomShell>
  );
}

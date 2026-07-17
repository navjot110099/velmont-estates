"use client";

import RoomShell from "@/components/ui/RoomShell";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import { features } from "@/data/site";

/**
 * WALK-IN CLOSET — The Standard.
 * Luxury features rendered as a jewelry-case grid: six glass vitrines,
 * each a hairline vitrine holding an index numeral, a minimal bronze
 * line-mark, and a considered promise. Hover lifts the case and lets a
 * warm bronze glow bloom from within.
 */

/** Minimal inline line-marks — one per standard, drawn in bronze. */
const featureMarks = [
  // Intelligent Living — radiating signal
  (
    <>
      <path d="M4 12a8 8 0 0 1 16 0" />
      <path d="M7.5 12a4.5 4.5 0 0 1 9 0" />
      <circle cx="12" cy="12" r="1.35" />
    </>
  ),
  // Wellness by Design — a single droplet
  (
    <>
      <path d="M12 3.5c3 3.6 5 6.2 5 8.9a5 5 0 1 1-10 0c0-2.7 2-5.3 5-8.9Z" />
      <path d="M9.5 13.2a2.6 2.6 0 0 0 2.5 2.4" />
    </>
  ),
  // Sustainable Permanence — a leaf
  (
    <>
      <path d="M5 19c0-7 5-12 14-13-1 9-6 14-13 14a5 5 0 0 1-1-1Z" />
      <path d="M6 18c3.5-4 6.5-6.5 11-8.5" />
    </>
  ),
  // Master Finishes — a cut gem
  (
    <>
      <path d="M5 9.5 12 4l7 5.5-7 10.5-7-10.5Z" />
      <path d="M5 9.5h14M12 4l-3.5 5.5L12 20M12 4l3.5 5.5L12 20" />
    </>
  ),
  // Private Security — a shield
  (
    <>
      <path d="M12 3.5 19 6v5.5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-2.5Z" />
      <path d="m9 12 2 2 4-4.5" />
    </>
  ),
  // Curated Provenance — a wax seal
  (
    <>
      <circle cx="12" cy="10" r="6" />
      <path d="M9.5 20l2.5-3 2.5 3" />
      <path d="M12 6.5 13 9l2.6.2-2 1.7.7 2.5L12 12l-2.3 1.4.7-2.5-2-1.7L11 9l1-2.5Z" />
    </>
  ),
];

export default function WalkInCloset() {
  return (
    <RoomShell id="closet" floor="08" name="Walk-in Closet" theme="ink-soft">
      <div className="edge-x">
        {/* Eyebrow + headline + lead */}
        <div className="max-w-3xl">
          <Reveal className="flex items-center gap-4">
            <span className="h-px w-10 bg-bronze/60" />
            <span className="eyebrow bronze-text">The Standard</span>
          </Reveal>
          <RevealText
            as="h2"
            text={"Everything considered.\nNothing *assumed.*"}
            delay={0.05}
            className="display t-h2 mt-8 max-w-[16ch]"
          />
          <Reveal
            as="p"
            delay={0.2}
            className="body-lux mt-8 max-w-xl text-base opacity-65 md:text-lg"
          >
            The details you will never have to think about — because we already
            have. Every Velmont residence is delivered complete, its
            intelligence, comfort, and permanence engineered in before you ever
            arrive.
          </Reveal>
        </div>

        {/* The vitrine grid — six standards, each a jewelry case */}
        <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-24 md:gap-6 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.t} delay={i * 0.08} className="group h-full">
              <article className="relative h-full overflow-hidden rounded-sm glass hairline p-8 transition-[transform,border-color] duration-700 ease-luxe group-hover:-translate-y-1.5 group-hover:border-bronze/30 md:p-10">
                {/* Bronze glow blooms from within on hover */}
                <div className="pointer-events-none absolute inset-0 noise-card opacity-0 transition-opacity duration-700 ease-luxe group-hover:opacity-100" />

                {/* Watermark index numeral — drifts + warms on hover */}
                <span className="pointer-events-none absolute -top-5 right-3 select-none display text-[5.5rem] leading-none text-white/[0.05] transition-all duration-700 ease-luxe group-hover:-translate-y-1 group-hover:text-bronze/15 md:text-[6.5rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative">
                  {/* Minimal line-mark */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="h-8 w-8 text-bronze transition-all duration-700 ease-luxe group-hover:-translate-y-0.5 group-hover:scale-[1.06] group-hover:text-bronze-light"
                  >
                    {featureMarks[i]}
                  </svg>

                  {/* Growing hairline rule */}
                  <span className="mt-7 block h-px w-10 bg-white/10 transition-all duration-700 ease-luxe group-hover:w-16 group-hover:bg-bronze/50" />

                  <h3 className="font-serif mt-6 text-2xl font-light leading-tight text-marble md:text-[1.6rem]">
                    {f.t}
                  </h3>
                  <p className="body-lux mt-4 text-sm opacity-55 md:text-[0.95rem]">
                    {f.d}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </RoomShell>
  );
}

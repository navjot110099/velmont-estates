"use client";

import RoomShell from "@/components/ui/RoomShell";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import Parallax from "@/components/ui/Parallax";
import LuxuryImage from "@/components/ui/LuxuryImage";
import { philosophy } from "@/data/site";

/**
 * SPA BATHROOM — Architecture philosophy: materials & craftsmanship.
 * A serene marble-white materials study: a statement on detail, a hero
 * slab of Carrara, and the four Velmont materials rendered as refined
 * CSS swatches, arranged as an alternating, gallery-quiet list.
 */

/** Layered swatch recipes — base tone, surface figure, and edge framing. */
const swatches = [
  {
    // Italian Marble — soft light, faint grey veining
    background:
      "linear-gradient(118deg,#ffffff 0%,#f1eee7 28%,#e3dfd5 48%,#f4f1ea 62%,#dad5ca 80%,#efece4 100%)",
    figure:
      "linear-gradient(58deg,transparent 45%,rgba(138,131,118,0.30) 46.5%,transparent 48%),linear-gradient(72deg,transparent 60%,rgba(138,131,118,0.18) 61.5%,transparent 64%),linear-gradient(50deg,transparent 74%,rgba(138,131,118,0.12) 75%,transparent 77%)",
    frame: "border border-ink/10",
  },
  {
    // Natural Walnut — warm, slow-grown timber with fine grain
    background:
      "linear-gradient(120deg,#7c5535 0%,#95643b 34%,#603f24 64%,#7d5231 100%)",
    figure:
      "repeating-linear-gradient(93deg,rgba(0,0,0,0.12) 0 1.5px,transparent 1.5px 10px),radial-gradient(120% 80% at 30% 20%,rgba(255,225,180,0.18),transparent 60%)",
    frame: "border border-white/10",
  },
  {
    // Black Steel — charcoal with a cold brushed sheen
    background:
      "linear-gradient(120deg,#17171a 0%,#2f2f34 42%,#101012 55%,#35353b 74%,#0d0d0f 100%)",
    figure:
      "repeating-linear-gradient(90deg,rgba(255,255,255,0.055) 0 1px,transparent 1px 4px),linear-gradient(115deg,rgba(255,255,255,0.08),transparent 40%)",
    frame: "border border-white/10",
  },
  {
    // Brushed Bronze — the single warm metal, aged never lacquered
    background:
      "linear-gradient(115deg,#8a6d3f 0%,#d8b985 42%,#c9a877 58%,#a07f4c 78%,#8a6d3f 100%)",
    figure:
      "repeating-linear-gradient(90deg,rgba(255,255,255,0.07) 0 1px,transparent 1px 3px),linear-gradient(115deg,rgba(255,255,255,0.14),transparent 45%)",
    frame: "border border-ink/10",
  },
];

export default function SpaBathroom() {
  const statement = philosophy.title.replace("survives the", "*survives*\nthe");

  return (
    <RoomShell id="spa" floor="09" name="Spa Bathroom" theme="light">
      <div className="edge-x">
        {/* Eyebrow + statement + intro */}
        <div className="max-w-6xl">
          <Reveal className="flex items-center gap-4">
            <span className="h-px w-10 bg-bronze/60" />
            <span className="eyebrow">{philosophy.eyebrow}</span>
          </Reveal>
          <RevealText
            as="h2"
            text={statement}
            delay={0.05}
            className="display t-h1 mt-8 max-w-[18ch] text-ink"
          />
          <Reveal
            as="p"
            delay={0.2}
            className="body-lux mt-10 max-w-2xl text-lg text-ink opacity-70"
          >
            Draw close — closer than a photograph permits. Every Velmont
            interior resolves to four materials, chosen less for how they read
            across a room than for how they answer the hand.
          </Reveal>
        </div>

        {/* Hero slab — a single band of real Carrara */}
        <div className="relative mt-16 h-[46vh] overflow-hidden rounded-sm md:mt-24 md:h-[64vh]">
          <Parallax speed={64} className="absolute inset-0 h-[130%] -top-[15%]">
            <LuxuryImage
              src="https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=1600&q=80"
              alt="Book-matched Italian marble, quarried and set by hand"
              className="h-full w-full"
              gradient="linear-gradient(135deg,#e7e3d9,#f6f4ee 45%,#d6d1c6)"
            />
          </Parallax>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          <Reveal className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
            <div className="glass-light hairline-dark inline-flex items-center gap-3 rounded-sm px-4 py-2.5">
              <span className="h-px w-6 bg-bronze-dark/60" />
              <span className="eyebrow text-[0.6rem] text-ink/70">
                Carrara · Book-matched
              </span>
            </div>
          </Reveal>
        </div>

        {/* The four materials — alternating study */}
        <div className="mt-24 space-y-24 md:mt-32 md:space-y-32">
          {philosophy.points.map((p, i) => {
            const s = swatches[i % swatches.length];
            const flip = i % 2 === 1;
            return (
              <Reveal
                key={p.t}
                delay={i * 0.05}
                className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24"
              >
                {/* Material swatch */}
                <div className={flip ? "md:order-2" : ""}>
                  <div
                    className={
                      "group relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-[inset_0_0_60px_rgba(0,0,0,0.18)] md:aspect-[5/4] " +
                      s.frame
                    }
                    style={{ background: s.background }}
                  >
                    {/* surface figure — veining, grain, or brush */}
                    <div
                      className="absolute inset-0"
                      style={{ backgroundImage: s.figure }}
                    />
                    {/* light sweep on hover */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1600ms] ease-luxe group-hover:translate-x-full" />
                  </div>
                </div>

                {/* Material caption */}
                <div className={flip ? "md:order-1" : ""}>
                  <div className="flex items-baseline gap-4">
                    <span className="display text-4xl font-light leading-none text-ink/15 md:text-5xl">
                      0{i + 1}
                    </span>
                    <span className="eyebrow">{p.k}</span>
                  </div>
                  <h3 className="font-serif mt-6 text-3xl font-light leading-tight text-ink md:text-4xl">
                    {p.t}
                  </h3>
                  <p className="body-lux mt-5 max-w-md text-base text-ink opacity-60 md:text-lg">
                    {p.d}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </RoomShell>
  );
}

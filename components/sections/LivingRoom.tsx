"use client";

import RoomShell from "@/components/ui/RoomShell";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import Parallax from "@/components/ui/Parallax";
import LuxuryImage from "@/components/ui/LuxuryImage";
import CountUp from "@/components/ui/CountUp";
import { about } from "@/data/site";

/**
 * LIVING ROOM — About Velmont Estates.
 * Editorial altitude: a declarative headline, a three-part credo,
 * a full-bleed image with parallax, and a quiet stat ledger.
 */
export default function LivingRoom() {
  return (
    <RoomShell id="living" floor="01" name="Living Room" theme="ink-soft">
      <div className="edge-x">
        {/* Eyebrow + headline */}
        <div className="max-w-6xl">
          <Reveal className="flex items-center gap-4">
            <span className="h-px w-10 bg-bronze/60" />
            <span className="eyebrow bronze-text">{about.eyebrow}</span>
          </Reveal>
          <RevealText
            as="h2"
            text={"We do not build houses.\nWe *compose* the way life is lived."}
            delay={0.05}
            className="display t-h1 mt-8 max-w-[18ch]"
          />
          <Reveal
            as="p"
            delay={0.2}
            className="body-lux mt-10 max-w-2xl text-lg opacity-70"
          >
            {about.lead}
          </Reveal>
        </div>

        {/* Credo — vision / mission / philosophy */}
        <div className="mt-24 grid grid-cols-1 gap-px overflow-hidden rounded-sm md:grid-cols-3">
          {about.columns.map((c, i) => (
            <Reveal
              key={c.k}
              delay={i * 0.12}
              className="group relative bg-ink/40 p-8 md:p-10"
            >
              <div className="absolute inset-0 noise-card opacity-0 transition-opacity duration-700 ease-luxe group-hover:opacity-100" />
              <div className="relative">
                <span className="eyebrow bronze-text">{c.k}</span>
                <h3 className="font-serif mt-6 text-2xl font-light leading-tight md:text-3xl">
                  {c.t}
                </h3>
                <p className="body-lux mt-5 text-sm opacity-60 md:text-base">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Full-bleed image with parallax */}
        <div className="relative mt-28 h-[62vh] overflow-hidden rounded-sm md:h-[80vh]">
          <Parallax speed={70} className="absolute inset-0 h-[130%] -top-[15%]">
            <LuxuryImage
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
              alt="Velmont interior — warm architectural light"
              className="h-full w-full"
              gradient="linear-gradient(135deg,#211d18,#3a3025)"
            />
          </Parallax>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />
          <Reveal className="absolute bottom-8 left-8 max-w-sm md:bottom-12 md:left-12">
            <p className="font-serif text-xl italic leading-snug text-marble/90 md:text-2xl">
              &ldquo;A house should feel inevitable — as though it could not
              have been any other way.&rdquo;
            </p>
          </Reveal>
        </div>

        {/* Stat ledger */}
        <div className="mt-24 grid grid-cols-2 gap-y-14 border-t border-white/10 pt-16 md:grid-cols-4">
          {about.stat.map((s, i) => (
            <Reveal key={s.s} delay={i * 0.1} className="px-2">
              <div className="display text-5xl font-light bronze-gradient-text md:text-6xl">
                <CountUp value={s.n} />
              </div>
              <p className="eyebrow mt-4 text-[0.62rem] opacity-50">{s.s}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </RoomShell>
  );
}

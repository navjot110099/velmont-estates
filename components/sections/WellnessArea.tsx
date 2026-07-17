"use client";

import RoomShell from "@/components/ui/RoomShell";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import CountUp from "@/components/ui/CountUp";
import { motion } from "framer-motion";
import { EASE, VIEWPORT } from "@/lib/anim";
import { investment } from "@/data/site";

/**
 * WELLNESS AREA — Investment horizon.
 * Future developments, appreciation, modern living: a stat ledger,
 * an abstract line/area chart that draws itself on scroll, and a
 * quiet register of the developments still to come.
 */

// Shared curve — an abstract, upward-trending appreciation line.
const CHART_LINE =
  "M0 300 C60 296 150 282 220 260 C290 238 340 264 420 220 C480 188 520 198 600 158 C660 130 700 134 770 108 C820 88 850 74 890 56";
const CHART_AREA = `${CHART_LINE} L890 360 L0 360 Z`;
const CHART_GRID = [96, 168, 240, 300];

export default function WellnessArea() {
  return (
    <RoomShell id="wellness" floor="10" name="Wellness Area" theme="dark">
      <div className="edge-x">
        {/* Eyebrow + headline */}
        <div className="max-w-6xl">
          <Reveal className="flex items-center gap-4">
            <span className="h-px w-10 bg-bronze/60" />
            <span className="eyebrow bronze-text">{investment.eyebrow}</span>
          </Reveal>
          <RevealText
            as="h2"
            text={"The rarest addresses\nappreciate in *silence.*"}
            delay={0.05}
            className="display t-h1 mt-8 max-w-[16ch]"
          />
          <Reveal
            as="p"
            delay={0.2}
            className="body-lux mt-10 max-w-2xl text-lg opacity-70"
          >
            {investment.body}
          </Reveal>
        </div>

        {/* Stat ledger */}
        <div className="mt-20 grid grid-cols-1 gap-y-12 border-t border-white/10 pt-14 sm:grid-cols-3 sm:gap-x-8">
          {investment.stats.map((s, i) => (
            <Reveal key={s.s} delay={i * 0.1} className="px-1">
              <div className="display text-5xl font-light bronze-gradient-text md:text-6xl">
                <CountUp value={s.n} />
              </div>
              <p className="eyebrow mt-4 text-[0.62rem] opacity-50">{s.s}</p>
            </Reveal>
          ))}
        </div>

        {/* Appreciation chart — draws on as it enters view */}
        <Reveal delay={0.05} className="mt-24">
          <div className="flex items-center gap-4">
            <span className="eyebrow text-[0.6rem] opacity-50">
              Appreciation index
            </span>
            <span className="h-px flex-1 bg-white/10" />
            <span className="eyebrow text-[0.6rem] text-bronze-light/80">
              2019 — 2026
            </span>
          </div>

          <div className="relative mt-8">
            <svg
              viewBox="0 0 900 360"
              className="h-auto w-full overflow-visible"
              role="img"
              aria-label="Abstract chart of Velmont residence appreciation trending upward over time."
            >
              <defs>
                <linearGradient id="wellnessStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8a6d3f" />
                  <stop offset="55%" stopColor="#d8b985" />
                  <stop offset="100%" stopColor="#c9a877" />
                </linearGradient>
                <linearGradient id="wellnessArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d8b985" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="#d8b985" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Gridlines */}
              <motion.g
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 1.2, ease: EASE }}
              >
                {CHART_GRID.map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2="900"
                    y1={y}
                    y2={y}
                    stroke="rgba(255,255,255,0.07)"
                    strokeWidth="1"
                  />
                ))}
              </motion.g>

              {/* Area fill */}
              <motion.path
                d={CHART_AREA}
                fill="url(#wellnessArea)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 1.6, ease: EASE, delay: 0.6 }}
              />

              {/* Trend line — draws on */}
              <motion.path
                d={CHART_LINE}
                fill="none"
                stroke="url(#wellnessStroke)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="[filter:drop-shadow(0_0_10px_rgba(216,185,133,0.25))]"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 2.4, ease: EASE, delay: 0.15 }}
              />

              {/* Endpoint marker */}
              <motion.g
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, ease: EASE, delay: 2.05 }}
              >
                <line
                  x1="890"
                  x2="890"
                  y1="56"
                  y2="360"
                  stroke="rgba(216,185,133,0.28)"
                  strokeWidth="1"
                  strokeDasharray="3 6"
                />
                <circle cx="890" cy="56" r="12" fill="#d8b985" fillOpacity="0.16" />
                <circle cx="890" cy="56" r="4.5" fill="#c9a877" />
              </motion.g>
            </svg>
          </div>
        </Reveal>

        {/* Future developments */}
        <div className="mt-24">
          <Reveal className="flex items-center gap-4">
            <span className="h-px w-10 bg-bronze/60" />
            <span className="eyebrow bronze-text">On the horizon</span>
          </Reveal>

          <div className="mt-10 border-t border-white/10">
            {investment.future.map((f, i) => (
              <Reveal
                key={f.name}
                delay={i * 0.1}
                className="group flex flex-col gap-3 border-b border-white/10 py-8 md:flex-row md:items-baseline md:justify-between md:gap-8"
              >
                <h3 className="font-serif text-2xl font-light leading-none text-marble transition-colors duration-500 ease-luxe group-hover:text-bronze-light md:text-3xl">
                  {f.name}
                </h3>
                <div className="flex items-center justify-between gap-6 md:justify-end">
                  <span className="body-lux text-sm opacity-55 md:text-base">
                    {f.loc}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-bronze/40 px-3.5 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-bronze-light" />
                    <span className="eyebrow text-[0.58rem] text-bronze-light">
                      {f.status}
                    </span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </RoomShell>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import RoomShell from "@/components/ui/RoomShell";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import Marquee from "@/components/ui/Marquee";
import { timeline, awards } from "@/data/site";

/**
 * EXECUTIVE OFFICE — Why Velmont.
 * The ledger of the house: a scroll-filled bronze timeline of two
 * decades, alternating left and right, closing on an awards ribbon.
 */
export default function ExecutiveOffice() {
  const railRef = useRef<HTMLDivElement>(null);

  // The vertical line "writes itself" as the timeline passes the viewport.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 82%", "end 58%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.4,
  });

  return (
    <RoomShell id="office" floor="05" name="Executive Office" theme="light">
      <div className="edge-x">
        {/* Eyebrow + headline */}
        <div className="max-w-6xl">
          <Reveal className="flex items-center gap-4">
            <span className="h-px w-10 bg-bronze/60" />
            <span className="eyebrow bronze-text">Why Velmont</span>
          </Reveal>
          <RevealText
            as="h2"
            text={"Two decades of\n*quiet* mastery."}
            delay={0.05}
            className="display t-h1 mt-8 max-w-[16ch]"
          />
          <Reveal
            as="p"
            delay={0.2}
            className="body-lux mt-10 max-w-2xl text-lg text-ink/70"
          >
            Every commission is a decision to build for the century, not the
            season. What follows is the record — the milestones that turned a
            single atelier into a house measured in decades.
          </Reveal>
        </div>

        {/* Timeline — a bronze rail that fills on scroll */}
        <div ref={railRef} className="relative mt-24 md:mt-36">
          {/* Track (unlit) */}
          <div className="pointer-events-none absolute bottom-1 left-[6px] top-1 w-px bg-ink/10 md:left-1/2 md:-translate-x-1/2" />
          {/* Fill (lit, scroll-driven) */}
          <motion.div
            style={{ scaleY: fill, transformOrigin: "top" }}
            className="pointer-events-none absolute bottom-1 left-[6px] top-1 w-px bg-gradient-to-b from-bronze-dark via-bronze to-bronze-light/40 md:left-[calc(50%-0.5px)]"
          />

          <div className="space-y-16 md:space-y-24">
            {timeline.map((item, i) => {
              const isRight = i % 2 === 1;
              return (
                <div key={item.year} className="relative">
                  {/* Node */}
                  <span className="absolute left-0 top-[0.4rem] z-10 md:left-1/2 md:-translate-x-1/2">
                    <span className="block h-3 w-3 rounded-full bg-bronze ring-4 ring-marble" />
                  </span>

                  <Reveal
                    delay={0.05}
                    className={[
                      "pl-11 md:w-1/2 md:pl-0",
                      isRight
                        ? "md:ml-auto md:pl-16 md:text-left"
                        : "md:pr-16 md:text-right",
                    ].join(" ")}
                  >
                    <div className="display bronze-gradient-text text-5xl md:text-6xl">
                      {item.year}
                    </div>
                    <h3 className="font-serif mt-4 text-xl font-light leading-tight text-ink md:text-2xl">
                      {item.t}
                    </h3>
                    <p className="body-lux mt-3 text-sm text-ink/60 md:text-base">
                      {item.d}
                    </p>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>

        {/* Awards ribbon */}
        <Reveal className="mt-28 md:mt-40">
          <p className="eyebrow text-center text-[0.62rem] text-ink/40">
            Recognised by
          </p>
          <div className="mt-8 border-y hairline-dark">
            <Marquee
              items={awards}
              duration={40}
              className="eyebrow py-6 text-[0.7rem] text-ink/70"
            />
          </div>
        </Reveal>
      </div>
    </RoomShell>
  );
}

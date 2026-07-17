"use client";

import RoomShell from "@/components/ui/RoomShell";
import Reveal from "@/components/ui/Reveal";
import SectionIntro from "@/components/ui/SectionIntro";
import Parallax from "@/components/ui/Parallax";
import LuxuryImage from "@/components/ui/LuxuryImage";
import MagneticButton from "@/components/ui/MagneticButton";
import { properties } from "@/data/site";

/** Per-residence gradient underlays — warm ink tones that carry the frame
 *  while the photograph decodes, and remain if it never arrives. */
const FALLBACKS = [
  "linear-gradient(135deg,#1b1712 0%,#37301f 100%)",
  "linear-gradient(135deg,#14141a 0%,#2b2822 100%)",
  "linear-gradient(135deg,#1a1610 0%,#332a1c 100%)",
  "linear-gradient(135deg,#101418 0%,#28303a 100%)",
];

/**
 * DINING ROOM — Featured Residences.
 * A cinematic, alternating editorial showcase of the four signature
 * addresses: each a tall parallax frame set against a serif ledger of
 * name, place, spec, price, and a magnetic invitation to view.
 */
export default function DiningRoom() {
  return (
    <RoomShell id="dining" floor="03" name="Dining Room" theme="dark">
      <div className="edge-x">
        {/* Intro header */}
        <SectionIntro
          eyebrow="Featured Residences"
          title={"Four addresses.\nFour ways to *live.*"}
          lead="A private selection from the current portfolio — each residence conceived for a single life, offered once and never repeated."
          className="max-w-3xl"
        />

        {/* Alternating editorial blocks */}
        <div className="mt-24 space-y-28 md:mt-36 md:space-y-44">
          {properties.map((p, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={p.id}
                className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24"
              >
                {/* Media — tall cinematic frame with parallax drift + hover zoom */}
                <Reveal className={reversed ? "md:order-2" : ""}>
                  <div className="group/media relative aspect-[4/5] overflow-hidden rounded-sm">
                    <Parallax
                      speed={46}
                      className="absolute inset-0 h-[120%] -top-[10%]"
                    >
                      <LuxuryImage
                        src={p.img}
                        alt={`${p.name} — ${p.location}`}
                        className="h-full w-full"
                        imgClassName="group-hover/media:scale-[1.06]"
                        gradient={FALLBACKS[i]}
                      />
                    </Parallax>

                    {/* depth + legibility wash */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/10" />

                    {/* tag chip */}
                    <div className="absolute left-5 top-5 z-10">
                      <span className="glass eyebrow inline-flex items-center rounded-full px-4 py-2 text-[0.6rem] text-marble/90">
                        {p.tag}
                      </span>
                    </div>
                  </div>
                </Reveal>

                {/* Ledger — the editorial column */}
                <div className={reversed ? "md:order-1" : ""}>
                  <Reveal className="flex items-center gap-4">
                    <span className="h-px w-10 bg-bronze/60" />
                    <span className="eyebrow bronze-text text-[0.62rem]">
                      {`Residence 0${i + 1}`}
                    </span>
                  </Reveal>

                  <Reveal delay={0.06}>
                    <h3 className="display t-h3 mt-6 font-light leading-[1.05]">
                      {p.name}
                    </h3>
                  </Reveal>

                  <Reveal
                    delay={0.12}
                    className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm opacity-60"
                  >
                    <span>{p.location}</span>
                    <span aria-hidden className="text-bronze/60">
                      ·
                    </span>
                    <span>{p.spec}</span>
                  </Reveal>

                  <Reveal delay={0.16}>
                    <p className="font-serif mt-6 text-2xl font-light text-marble/90 md:text-3xl">
                      {p.price}
                    </p>
                  </Reveal>

                  <Reveal
                    as="p"
                    delay={0.2}
                    className="body-lux mt-6 max-w-md text-base opacity-70"
                  >
                    {p.blurb}
                  </Reveal>

                  {/* Magnetic invitation with a drawn bronze line */}
                  <Reveal delay={0.26}>
                    <MagneticButton
                      ariaLabel={`View ${p.name}`}
                      className="group/cta mt-10 inline-flex cursor-pointer items-center gap-4 text-marble"
                      strength={0.35}
                    >
                      <span className="eyebrow text-[0.66rem]">
                        View residence
                      </span>
                      <span className="relative h-px w-14 overflow-hidden bg-white/15">
                        <span className="absolute inset-0 origin-left scale-x-0 bg-bronze transition-transform duration-700 ease-luxe group-hover/cta:scale-x-100" />
                      </span>
                      <span
                        aria-hidden
                        className="text-bronze-light transition-transform duration-700 ease-luxe group-hover/cta:translate-x-1"
                      >
                        &#8594;
                      </span>
                    </MagneticButton>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </RoomShell>
  );
}

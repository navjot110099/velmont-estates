"use client";

import RoomShell from "@/components/ui/RoomShell";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import Parallax from "@/components/ui/Parallax";
import LuxuryImage from "@/components/ui/LuxuryImage";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { lifestyle } from "@/data/site";

/**
 * MASTER SUITE — The Velmont Life.
 * Immersive editorial storytelling: a declarative serif headline,
 * an offset three-image collage drifting at layered parallax speeds,
 * and a pull-quote on the residence as the instrument a life is played on.
 */
export default function MasterSuite() {
  // The collage figures sit in normal flow, so only drift them where there's
  // room — below md they stack full-width and parallax would jitter the gaps.
  const enableParallax = useMediaQuery("(min-width: 768px)");
  return (
    <RoomShell id="suite" floor="07" name="Master Suite" theme="light">
      <div className="edge-x">
        {/* Eyebrow + headline + body, offset editorial header */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <Reveal className="flex items-center gap-4">
              <span className="h-px w-10 bg-bronze/60" />
              <span className="eyebrow">{lifestyle.eyebrow}</span>
            </Reveal>
            <RevealText
              as="h2"
              text={"A residence is not where the day ends.\nIt is the *instrument* the day is played on."}
              delay={0.05}
              className="display t-h1 mt-8 max-w-[20ch] text-ink"
            />
          </div>
          <div className="md:col-span-4 md:self-end">
            <Reveal
              as="p"
              delay={0.2}
              className="body-lux max-w-md text-base text-ink/65 md:text-lg"
            >
              {lifestyle.body}
            </Reveal>
          </div>
        </div>

        {/* Offset editorial collage — layered parallax for depth */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:mt-28 md:grid-cols-12 md:gap-10 lg:gap-14">
          {/* Primary — large, slow drift */}
          <div className="md:col-span-7">
            <Reveal>
              <Parallax speed={34} disabled={!enableParallax}>
                <figure className="group overflow-hidden rounded-sm ring-1 ring-ink/[0.06]">
                  <div className="transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.04] group-hover:will-change-transform">
                    <LuxuryImage
                      src={lifestyle.images[0]}
                      alt="A suspended garden opening onto a Velmont master suite"
                      className="aspect-[4/5] h-auto w-full"
                      gradient="linear-gradient(140deg,#e8e2d6 0%,#b08d57 100%)"
                    />
                  </div>
                </figure>
              </Parallax>
            </Reveal>
          </div>

          {/* Right column — two offset frames, pushed down, faster drift */}
          <div className="flex flex-col gap-8 md:col-span-5 md:mt-28 md:gap-16">
            <Reveal delay={0.1}>
              <Parallax speed={86} disabled={!enableParallax}>
                <figure className="group overflow-hidden rounded-sm ring-1 ring-ink/[0.06]">
                  <div className="transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.04] group-hover:will-change-transform">
                    <LuxuryImage
                      src={lifestyle.images[1]}
                      alt="Warm architectural light across a private interior"
                      className="aspect-[3/4] h-auto w-full"
                      gradient="linear-gradient(150deg,#d9d1c0 0%,#8a6d3f 100%)"
                    />
                  </div>
                </figure>
              </Parallax>
            </Reveal>
            <Reveal delay={0.2}>
              <Parallax speed={18} disabled={!enableParallax}>
                <figure className="group overflow-hidden rounded-sm ring-1 ring-ink/[0.06]">
                  <div className="transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.04] group-hover:will-change-transform">
                    <LuxuryImage
                      src={lifestyle.images[2]}
                      alt="A Velmont residence composed around the rituals of the day"
                      className="aspect-square h-auto w-full"
                      gradient="linear-gradient(135deg,#f4f1ea 0%,#c9a877 100%)"
                    />
                  </div>
                </figure>
              </Parallax>
            </Reveal>
          </div>
        </div>

        {/* Pull-quote — airy, generous negative space */}
        <Reveal className="mx-auto mt-28 max-w-3xl md:mt-44">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-bronze/60" />
            <span className="eyebrow">In practice</span>
          </div>
          <p className="font-serif mt-8 text-3xl font-light italic leading-[1.15] text-ink/85 md:text-5xl">
            &ldquo;A residence is the instrument a life is played on — each room
            a note, each threshold a change of key.&rdquo;
          </p>
          <p className="body-lux mt-8 text-sm uppercase tracking-[0.22em] text-ink/45">
            The House of Velmont
          </p>
        </Reveal>
      </div>
    </RoomShell>
  );
}

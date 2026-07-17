"use client";

import RoomShell from "@/components/ui/RoomShell";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import Parallax from "@/components/ui/Parallax";
import LuxuryImage from "@/components/ui/LuxuryImage";
import { collection } from "@/data/site";

/**
 * WINE CELLAR — The Exclusive Collection.
 * A dim, jewel-box gallery: an asymmetric CSS-grid where each tile's
 * weight is derived from its span (tall → row-span-2, wide → col-span-2).
 * Dense flow packs the six signature works; a quiet coda card fills the
 * remaining corner so the composition reads whole, never broken.
 */

// Span → grid weight. Row weight only asserts on the wide desktop grid so
// the mobile / two-column stacks stay clean and gapless via dense flow.
const spanClass: Record<(typeof collection)[number]["span"], string> = {
  tall: "lg:row-span-2",
  wide: "sm:col-span-2",
  reg: "",
};

// A couple of tiles drift against the scroll for depth — not all of them.
const parallaxTiles = new Set([1, 4]);

export default function WineCellar() {
  return (
    <RoomShell id="cellar" floor="04" name="Wine Cellar" theme="ink-soft">
      <div className="edge-x">
        {/* Eyebrow + headline + scarcity lead */}
        <div className="max-w-6xl">
          <Reveal className="flex items-center gap-4">
            <span className="h-px w-10 bg-bronze/60" />
            <span className="eyebrow bronze-text">Exclusive Collection</span>
          </Reveal>
          <RevealText
            as="h2"
            text={"Signature works,\nreleased *once.*"}
            delay={0.05}
            className="display t-h2 mt-8 max-w-[16ch]"
          />
          <Reveal
            as="p"
            delay={0.2}
            className="body-lux mt-8 max-w-2xl text-lg opacity-70"
          >
            Six works drawn from a private index — each conceived for a single
            client, revealed to the world exactly once, and never repeated.
          </Reveal>
        </div>

        {/* Asymmetric jewel-box grid */}
        <div
          className={
            "mt-16 grid grid-flow-row-dense grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-24 lg:grid-cols-4 " +
            "[grid-auto-rows:clamp(240px,60vw,360px)] sm:[grid-auto-rows:clamp(200px,30vw,300px)] lg:[grid-auto-rows:clamp(190px,14vw,250px)]"
          }
        >
          {collection.map((item, i) => (
            <Reveal
              key={item.id}
              delay={(i % 3) * 0.08}
              y={30}
              className={[
                "group relative overflow-hidden rounded-sm",
                spanClass[item.span],
              ].join(" ")}
            >
              {/* Image — a subset drifts with parallax inside the frame */}
              {parallaxTiles.has(i) ? (
                <Parallax
                  speed={38}
                  className="absolute inset-0 h-[128%] -top-[14%]"
                >
                  <LuxuryImage
                    src={item.img}
                    alt={item.name}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[1600ms] ease-luxe group-hover:scale-[1.06]"
                    gradient="linear-gradient(135deg,#161318,#241d16)"
                  />
                </Parallax>
              ) : (
                <LuxuryImage
                  src={item.img}
                  alt={item.name}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[1600ms] ease-luxe group-hover:scale-[1.06]"
                  gradient="linear-gradient(135deg,#161318,#241d16)"
                />
              )}

              {/* Dark base wash — deep, dim, jewel-box floor */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent opacity-80 transition-opacity duration-700 ease-luxe group-hover:opacity-95" />
              {/* Bronze bloom — intensifies on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bronze-dark/70 via-bronze/10 to-transparent opacity-0 transition-opacity duration-700 ease-luxe group-hover:opacity-100" />
              {/* Hairline frame warms toward bronze on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-white/5 transition-all duration-700 ease-luxe group-hover:ring-bronze/30" />

              {/* Quiet index numeral */}
              <span className="pointer-events-none absolute left-5 top-4 font-serif text-sm text-marble/40 md:left-6">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Name + meta: shown by default (touch has no hover); on
                  hover-capable desktop it stays hidden until hover. */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <div className="translate-y-0 opacity-100 transition-all duration-700 ease-luxe md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <span className="eyebrow text-[0.6rem] bronze-text">
                    {item.meta}
                  </span>
                  <h3 className="font-serif mt-2 text-xl font-light leading-tight text-marble md:text-2xl">
                    {item.name}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Coda card — fills the remaining corner of the desktop grid so the
              asymmetric composition resolves rather than leaving a hole. */}
          <Reveal
            delay={0.45}
            y={30}
            className="relative hidden overflow-hidden rounded-sm bg-ink/60 noise-card ring-1 ring-white/5 lg:col-start-4 lg:row-start-2 lg:row-span-2 lg:flex lg:flex-col lg:justify-between"
          >
            <div className="p-6">
              <span className="eyebrow text-[0.6rem] bronze-text">The Index</span>
            </div>
            <div className="p-6">
              <p className="font-serif text-2xl font-light leading-tight text-marble">
                Six works.
                <br />
                Each released <span className="italic">once</span>.
              </p>
              <p className="body-lux mt-4 text-xs opacity-55">
                No commission is ever offered twice.
              </p>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-bronze/5" />
          </Reveal>
        </div>
      </div>
    </RoomShell>
  );
}

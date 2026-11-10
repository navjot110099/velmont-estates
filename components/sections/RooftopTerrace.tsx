"use client";

import RoomShell from "@/components/ui/RoomShell";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import LuxuryImage from "@/components/ui/LuxuryImage";
import MagneticButton from "@/components/ui/MagneticButton";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { brand, contact, nav, properties } from "@/data/site";

// Footer navigation — anchors handled via scrollTo / "#".
const companyLinks = ["Our Atelier", "The Journal", "Careers", "Press"];
const legalLinks = ["Privacy Policy", "Terms of Engagement", "Cookie Preferences"];

/**
 * ROOFTOP TERRACE — the finale.
 * A dramatic CTA band over the skyline, the private contact ledger,
 * and a restrained luxury footer with a magnetic return-to-top.
 */
export default function RooftopTerrace() {
  const { scrollTo } = useSmoothScroll();
  // Deterministic (matches the MMXXVI mark) — avoids an SSR/client hydration
  // mismatch across a New Year boundary.
  const year = 2026;

  const mailHref = `mailto:${contact.email}`;
  const telHref = `tel:${contact.phone.replace(/\s+/g, "")}`;

  return (
    <RoomShell id="rooftop" floor="11" name="Rooftop Terrace" theme="dark">
      {/* CTA band — full-bleed skyline at dusk */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <LuxuryImage
            src={properties[3].img}
            alt="Velmont Sky Pavilion — the skyline above Dubai at dusk"
            className="h-full w-full"
            gradient="linear-gradient(160deg,#0a0a0b,#1d1d22 55%,#2a2622)"
          />
          {/* Heavy dark gradients for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/72 to-ink/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/20 to-ink/55" />
          {/* Vignette */}
          <div className="vignette absolute inset-0" />
        </div>

        <div className="edge-x">
          <div className="mx-auto flex min-h-[82vh] max-w-6xl flex-col justify-center py-[clamp(5rem,14vh,10rem)]">
            <Reveal className="flex items-center gap-4">
              <span className="h-px w-10 bg-bronze/60" />
              <span className="eyebrow bronze-text">{contact.eyebrow}</span>
            </Reveal>

            <RevealText
              as="h2"
              text={"From vision\nto *reality.*"}
              delay={0.05}
              className="display t-hero mt-8 max-w-[14ch] text-marble"
            />

            <Reveal
              as="p"
              delay={0.2}
              className="body-lux mt-8 max-w-xl text-lg text-marble/70"
            >
              {contact.body}
            </Reveal>

            <Reveal delay={0.32} className="mt-12">
              <MagneticButton
                as="a"
                href={mailHref}
                className="btn-lux"
                ariaLabel="Begin the commission — write to Velmont Estates"
              >
                Begin the commission
                <span aria-hidden className="text-bronze-light">
                  &rarr;
                </span>
              </MagneticButton>
            </Reveal>

            {/* Contact ledger */}
            <Reveal
              delay={0.4}
              className="mt-16 grid grid-cols-1 gap-10 border-t border-white/12 pt-10 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div>
                <span className="eyebrow text-[0.62rem] text-marble/45">
                  Write to us
                </span>
                <a
                  href={mailHref}
                  className="link-underline mt-4 block font-serif text-xl font-light text-marble/90 md:text-2xl"
                >
                  {contact.email}
                </a>
              </div>
              <div>
                <span className="eyebrow text-[0.62rem] text-marble/45">
                  By telephone
                </span>
                <a
                  href={telHref}
                  className="link-underline mt-4 block font-serif text-xl font-light text-marble/90 md:text-2xl"
                >
                  {contact.phone}
                </a>
              </div>
              <div>
                <span className="eyebrow text-[0.62rem] text-marble/45">
                  Ateliers
                </span>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm uppercase tracking-[0.18em] text-marble/70">
                  {contact.offices.map((office, i) => (
                    <span key={office} className="flex items-center gap-3">
                      {i > 0 && (
                        <span
                          aria-hidden
                          className="h-1 w-1 rounded-full bg-bronze/60"
                        />
                      )}
                      {office}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="edge-x pt-[clamp(4.5rem,11vh,8rem)]">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
          {/* Brand mark */}
          <Reveal className="md:col-span-5">
            <div className="flex items-baseline gap-3">
              <span className="display text-[clamp(2.4rem,6vw,3.5rem)] leading-none text-marble">
                VELMONT
              </span>
              <span className="eyebrow text-[0.58rem] text-bronze-light">
                Estates
              </span>
            </div>
            <p className="font-serif mt-6 max-w-xs text-lg font-light italic text-marble/60">
              {brand.tagline}
            </p>
            <p className="mt-6 text-[0.7rem] uppercase tracking-[0.24em] text-marble/40">
              {brand.city}
            </p>
          </Reveal>

          {/* Navigation columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            <Reveal delay={0.05}>
              <h3 className="eyebrow text-[0.6rem] text-marble/40">Explore</h3>
              <ul className="mt-6 space-y-3">
                {nav.map((n) => (
                  <li key={n.target}>
                    <button
                      onClick={() => scrollTo(n.target, { offset: -10 })}
                      className="link-underline text-sm text-marble/65 transition-colors hover:text-marble"
                    >
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <h3 className="eyebrow text-[0.6rem] text-marble/40">Company</h3>
              <ul className="mt-6 space-y-3">
                {companyLinks.map((l) => (
                  <li key={l}>
                    <a
                      className="link-underline text-sm text-marble/65 transition-colors hover:text-marble"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.19}>
              <h3 className="eyebrow text-[0.6rem] text-marble/40">Legal</h3>
              <ul className="mt-6 space-y-3">
                {legalLinks.map((l) => (
                  <li key={l}>
                    <a
                      className="link-underline text-sm text-marble/65 transition-colors hover:text-marble"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-[clamp(3.5rem,9vh,6rem)] flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.72rem] tracking-[0.14em] text-marble/40">
            &copy; {year} {brand.name} &mdash; MMXXVI. All rights reserved.
          </p>
          <MagneticButton
            onClick={() => scrollTo("entrance")}
            ariaLabel="Back to top"
            className="group inline-flex items-center gap-3"
          >
            <span className="eyebrow text-[0.6rem] text-marble/50 transition-colors duration-500 group-hover:text-marble">
              Back to top
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-marble/70 transition-colors duration-500 ease-luxe group-hover:border-bronze-light group-hover:text-bronze-light">
              <span aria-hidden>&uarr;</span>
            </span>
          </MagneticButton>
        </div>
      </footer>
    </RoomShell>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { brand, nav, rooms } from "@/data/site";
import { EASE } from "@/lib/anim";

export default function Navigation() {
  const { scrollTo } = useSmoothScroll();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Overlay keyboard + focus handling: Escape closes it and returns focus to
  // the toggle; opening moves focus to the first room link.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const first = panelRef.current?.querySelector<HTMLElement>("button");
    first?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (target: string) => {
    setOpen(false);
    // let the overlay begin closing before scrolling
    setTimeout(() => scrollTo(target, { offset: -10 }), 120);
  };

  return (
    <>
      {/* Top bar */}
      <motion.header
        initial={false}
        animate={{ y: visible || open ? 0 : -120, opacity: visible || open ? 1 : 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[80]"
      >
        <div className="glass border-b border-white/5">
          <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between px-[clamp(1.25rem,5vw,4rem)]">
            <button
              onClick={() => go("entrance")}
              className="group flex items-center gap-3"
              aria-label="Velmont Estates — to top"
            >
              <span className="display text-2xl tracking-tight text-marble">
                VELMONT
              </span>
              <span className="hidden text-[0.55rem] uppercase tracking-[0.3em] text-bronze-light sm:block">
                Estates
              </span>
            </button>

            <nav className="hidden items-center gap-10 md:flex">
              {nav.map((n) => (
                <button
                  key={n.target}
                  onClick={() => go(n.target)}
                  className="link-underline text-[0.7rem] uppercase tracking-[0.2em] text-marble/70 transition-colors hover:text-marble"
                >
                  {n.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-5">
              <button
                onClick={() => go("rooftop")}
                className="hidden text-[0.7rem] uppercase tracking-[0.2em] text-bronze-light link-underline lg:block"
              >
                Enquire
              </button>
              <button
                ref={toggleRef}
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="room-directory"
                className="flex h-9 w-9 flex-col items-center justify-center gap-[6px]"
              >
                <motion.span
                  animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }}
                  className="block h-px w-7 bg-marble"
                />
                <motion.span
                  animate={{ rotate: open ? -45 : 0, y: open ? -3 : 0 }}
                  className="block h-px w-7 bg-marble"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Full-screen room directory */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="room-directory"
            role="dialog"
            aria-modal="true"
            aria-label="Room directory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-[75] bg-ink/95 backdrop-blur-xl"
          >
            <div
              data-lenis-prevent
              className="mx-auto flex h-full max-w-[1600px] flex-col justify-start overflow-y-auto overscroll-contain px-[clamp(1.25rem,6vw,6rem)] pb-16 pt-24 md:justify-center"
            >
              <span className="eyebrow mb-10 text-bronze-light">
                The Residence — {brand.city}
              </span>
              <ul className="grid grid-cols-1 gap-x-16 gap-y-1 md:grid-cols-2">
                {rooms.map((r, i) => (
                  <motion.li
                    key={r.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.05 + i * 0.03 }}
                    className="group border-b border-white/8"
                  >
                    <button
                      onClick={() => go(r.id)}
                      className="flex w-full items-baseline justify-between py-4 text-left"
                    >
                      <span className="font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] font-light text-marble/80 transition-colors duration-500 group-hover:text-marble">
                        {r.name}
                      </span>
                      <span className="eyebrow text-[0.6rem] text-marble/40 transition-colors group-hover:text-bronze-light">
                        {r.floor}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import type { Variants } from "framer-motion";

// Signature Velmont easing — the same curve used across the whole site.
export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_IN = [0.7, 0, 0.84, 0] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 44, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.05, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.2, ease: EASE } },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 1.08, filter: "blur(14px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: EASE },
  },
};

// Stagger container — children reveal in sequence.
export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

// Line reveal for headings — clipped mask lifts up.
export const lineChild: Variants = {
  hidden: { y: "115%" },
  show: {
    y: "0%",
    transition: { duration: 1.15, ease: EASE },
  },
};

export const wordChild: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

export const VIEWPORT = { once: true, margin: "-12% 0px -12% 0px" } as const;

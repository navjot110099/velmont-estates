"use client";

import { motion } from "framer-motion";
import { EASE, VIEWPORT } from "@/lib/anim";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: number;
  duration?: number;
  once?: boolean;
  as?: "div" | "section" | "span" | "li" | "figure" | "p";
};

/**
 * Generic scroll-triggered reveal — fade + lift + blur resolve.
 * The default building block for section content.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 42,
  blur = 10,
  duration = 1.05,
  once = true,
  as = "div",
}: Props) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ ...VIEWPORT, once }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

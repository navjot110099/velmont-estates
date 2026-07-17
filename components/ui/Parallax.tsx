"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** vertical travel in px across the viewport pass */
  speed?: number;
  /** subtle opacity fade at the edges */
  fade?: boolean;
  /** render flat, without the scroll transform (e.g. on small screens) */
  disabled?: boolean;
};

/**
 * Layered parallax — content drifts against scroll for depth.
 */
export default function Parallax({
  children,
  className,
  speed = 80,
  fade = false,
  disabled = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.4, 1, 1, 0.4]
  ) as MotionValue<number>;

  if (disabled) {
    return <div className={"relative " + (className ?? "")}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity: fade ? opacity : 1 }}
      // relative so framer-motion can measure scroll offset correctly
      className={"relative " + (className ?? "")}
    >
      {children}
    </motion.div>
  );
}

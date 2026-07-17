"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  ariaLabel?: string;
};

/**
 * Magnetic hover — the element drifts toward the cursor and springs back.
 * A quiet micro-interaction reserved for primary calls-to-action.
 */
export default function MagneticButton({
  children,
  className,
  onClick,
  strength = 0.4,
  as = "button",
  href,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 15, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const shared = {
    onMouseMove: onMove,
    onMouseLeave: reset,
    onClick,
    "aria-label": ariaLabel,
    className,
    style: { x: sx, y: sy },
  } as const;

  if (as === "a") {
    return (
      <motion.a ref={ref as React.Ref<HTMLAnchorElement>} href={href} {...shared}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button ref={ref as React.Ref<HTMLButtonElement>} type="button" {...shared}>
      {children}
    </motion.button>
  );
}

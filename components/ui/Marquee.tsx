"use client";

import { motion } from "framer-motion";

type Props = {
  items: string[];
  className?: string;
  duration?: number;
  reverse?: boolean;
  separator?: string;
};

/**
 * Infinite horizontal marquee — used for awards / accolades ribbons.
 */
export default function Marquee({
  items,
  className,
  duration = 34,
  reverse = false,
  separator = "·",
}: Props) {
  const row = [...items, ...items];
  return (
    <div className={"relative flex overflow-hidden " + (className ?? "")}>
      <motion.div
        className="flex shrink-0 items-center whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-8">{item}</span>
            <span className="text-bronze/60">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { EASE } from "@/lib/anim";

/**
 * Counts a numeric value up when scrolled into view.
 * Accepts decorated strings like "€4.2B", "+11.4%", "100%".
 */
export default function CountUp({
  value,
  className,
  duration = 1800,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [display, setDisplay] = useState(value);

  const match = value.match(/^([^\d-]*)(-?[\d.,]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numStr = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = parseFloat(numStr.replace(/,/g, ""));
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

  useEffect(() => {
    if (!inView || isNaN(target)) {
      if (isNaN(target)) setDisplay(value);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const current = target * easeOut(p);
      setDisplay(
        prefix +
          current.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) +
          suffix
      );
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

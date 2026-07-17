"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query hook. Returns `false` on the server and on first
 * paint, then resolves to the real match after mount — so layout/animation
 * decisions that depend on viewport width never cause a hydration mismatch.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

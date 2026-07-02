"use client";

import { useEffect, useState } from "react";

/**
 * Returns true if the user has enabled "Reduce Motion" in their OS settings.
 * Always wrap animation logic with this check for accessibility compliance.
 *
 * @example
 * const shouldReduce = useReducedMotion();
 * const variants = shouldReduce ? noAnimationVariants : fadeUpVariants;
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return reducedMotion;
}

"use client";

import { useEffect, useState } from "react";
import { BREAKPOINTS, type Breakpoint } from "@/constants/breakpoints";

/**
 * Returns true when the viewport matches the given breakpoint and above.
 *
 * @example
 * const isDesktop = useMediaQuery("lg"); // true when viewport >= 1024px
 */
export function useMediaQuery(breakpoint: Breakpoint): boolean {
  const query = `(min-width: ${BREAKPOINTS[breakpoint]}px)`;
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

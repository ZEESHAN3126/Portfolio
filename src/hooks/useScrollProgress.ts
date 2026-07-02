"use client";

import { useEffect, useState } from "react";

/**
 * Returns the current scroll progress as a value between 0 and 1.
 * 0 = top of page, 1 = bottom of page.
 *
 * @example
 * const progress = useScrollProgress();
 * // Drive a progress bar: width = `${progress * 100}%`
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

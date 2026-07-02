"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/constants/nav";

/**
 * Returns the `id` of whichever section is currently most visible
 * in the viewport, using IntersectionObserver.
 *
 * @example
 * const activeSection = useActiveSection();
 * // Use to highlight the active nav link
 */
export function useActiveSection(): string {
  const [activeId, setActiveId] = useState<string>(NAV_LINKS[0]?.id ?? "");

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return activeId;
}

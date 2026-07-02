"use client";

import { useEffect, useState } from "react";

interface MousePosition {
  x: number; // -1 to 1 (left to right)
  y: number; // -1 to 1 (top to bottom)
}

/**
 * Tracks normalised mouse position (-1 to 1 on each axis).
 * Use for cinematic parallax / 3D tilt effects on the hero.
 *
 * @example
 * const { x, y } = useMouseParallax();
 * style={{ transform: `translate(${x * 20}px, ${y * 20}px)` }}
 */
export function useMouseParallax(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}

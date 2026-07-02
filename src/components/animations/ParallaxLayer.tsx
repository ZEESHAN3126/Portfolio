"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Parallax speed multiplier.
   * Positive = moves up as you scroll down (slower than viewport).
   * Negative = moves down as you scroll down (faster than viewport).
   * Range: -1 to 1 recommended.
   */
  speed?: number;
}

/**
 * Applies a subtle parallax scroll effect to its children.
 * Use for background layers to create cinematic depth.
 *
 * @example
 * <ParallaxLayer speed={0.3}>
 *   <BackgroundGradient />
 * </ParallaxLayer>
 */
export function ParallaxLayer({
  children,
  className,
  speed = 0.3,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : [`${-speed * 100}%`, `${speed * 100}%`]
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

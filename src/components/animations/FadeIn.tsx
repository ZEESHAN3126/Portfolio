"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUpVariants } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Direction of the fade — defaults to "up" */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Trigger once (default) or every time element enters viewport */
  once?: boolean;
}

const directionVariants = {
  up:    { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 50 },  visible: { opacity: 1, x: 0 } },
  none:  { hidden: { opacity: 0 },          visible: { opacity: 1 } },
};

/**
 * Wraps children with a scroll-triggered fade-in animation.
 * Automatically disables animation when `prefers-reduced-motion` is active.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();

  const variants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : directionVariants[direction];

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  /** Delay between each child animation (seconds) */
  stagger?: number;
  /** Initial delay before the first child animates */
  delayChildren?: number;
  once?: boolean;
}

/**
 * Wraps a list of children and staggers their entrance animations.
 * Each direct child should use motion variants (hidden/visible).
 *
 * @example
 * <StaggerChildren>
 *   <motion.div variants={fadeUpVariants}>Item 1</motion.div>
 *   <motion.div variants={fadeUpVariants}>Item 2</motion.div>
 * </StaggerChildren>
 */
export function StaggerChildren({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0.1,
  once = true,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : stagger,
            delayChildren: reduceMotion ? 0 : delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  /** The text string to animate word by word */
  text: string;
  className?: string;
  /** Delay before the first word appears (seconds) */
  delay?: number;
  /** Delay between each word (seconds) */
  stagger?: number;
  /** HTML tag to render as */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  once?: boolean;
}

/**
 * Cinematic word-by-word text reveal animation.
 * Each word slides up from behind a clipping mask.
 *
 * @example
 * <TextReveal text="Building the future, one line at a time." as="h1" />
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  as: Tag = "p",
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement>}
      className={cn("overflow-hidden", className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={
              isInView
                ? { y: "0%", opacity: 1 }
                : { y: "110%", opacity: 0 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: reduceMotion ? 0 : delay + i * stagger,
            }}
            aria-hidden
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

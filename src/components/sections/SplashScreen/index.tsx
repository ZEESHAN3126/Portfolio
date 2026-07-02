"use client";

/**
 * SplashScreen — Full-screen cinematic entry experience.
 *
 * ── Animation Budget: ~2.2 seconds ─────────────────────────────────────────
 *
 *  Time      Event
 *  ──────    ────────────────────────────────────────────────────────────────
 *  0.00s     Mount → Navbar hidden via UIContext
 *  0.00s     Z draws (pathLength 0→1, 700ms)
 *  0.55s     + vertical draws (350ms, overlaps Z tail)
 *  0.65s     + horizontal draws (350ms, staggered after vertical)
 *  0.90s     "ZEESHAN+" characters begin staggered reveal (8 chars × 60ms)
 *  1.32s     Last character starts revealing
 *  1.55s     "Loading Experience..." fades in
 *  1.90s     Exit fade begins (opacity 1 → 0, 300ms)
 *  2.20s     onComplete() fired → parent handles next scene
 *
 * ── Architecture ────────────────────────────────────────────────────────────
 *  - Exposes onComplete callback. Parent decides what happens next.
 *  - Does NOT directly transition to Who's Watching. (PRD requirement)
 *  - Hides Navbar on mount, restores it on complete via UIContext.
 *  - Respects prefers-reduced-motion: returns null immediately (PRD §8 Law 4).
 *  - aria-hidden="true" — entire screen is decorative; skip link handles a11y.
 *
 * ── Performance ─────────────────────────────────────────────────────────────
 *  - Only opacity and transform (y) animated on HTML elements (GPU composited).
 *  - SVG pathLength animated via Framer Motion (also GPU composited).
 *  - No width/height/top/left animation (PRD §13.5).
 *  - will-change-[opacity] on outer container.
 *
 * PRD Reference: §3.2 Scene 1 · §8 Motion Design · §12 Accessibility
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useUIContext } from "@/context/UIContext";
import { SplashMonogram } from "./SplashMonogram";

// ─── Timing (ms) ─────────────────────────────────────────────────────────────

/** When the exit fade-out animation starts */
const EXIT_START_MS = 1900;

/** When onComplete fires — after fade-out completes (EXIT_START_MS + 300ms) */
const COMPLETE_AT_MS = 2200;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SplashScreenProps {
  /**
   * Fired after the splash has fully faded out and the experience is ready.
   * The parent component (SplashGate) decides what renders next.
   * Per PRD: "The parent should decide what happens after completion."
   */
  onComplete: () => void;
}

// ─── Internal ─────────────────────────────────────────────────────────────────

/** Cinematic ease-out — PRD §8.4 */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** "ZEESHAN+" split into individual characters for staggered reveal */
const BRAND_CHARS = "ZEESHAN+".split("");

// ─── Component ────────────────────────────────────────────────────────────────

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const reduceMotion = useReducedMotion();
  const { setNavbarVisible, setSplashComplete } = useUIContext();

  /**
   * exiting — when true, the outer container animates to opacity: 0.
   * Triggered by a setTimeout at EXIT_START_MS.
   */
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Always hide Navbar while Splash is active (PRD §5.2 / §5.4)
    setNavbarVisible(false);

    // PRD §8 Law 4 + §12.2 — skip animation for OS reduced-motion preference.
    // useReducedMotion initialises to false (SSR safe), so this check runs
    // after the first client render. SplashGate also checks synchronously
    // before rendering this component — belt-and-suspenders.
    if (reduceMotion) {
      setSplashComplete(true);
      setNavbarVisible(true);
      onComplete();
      return;
    }

    const exitTimer = setTimeout(() => setExiting(true), EXIT_START_MS);
    const doneTimer = setTimeout(() => {
      setSplashComplete(true);
      setNavbarVisible(true);
      onComplete();
    }, COMPLETE_AT_MS);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
    // Intentionally no deps — runs once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If reduced motion: the effect immediately called onComplete. Render nothing.
  if (reduceMotion) return null;

  return (
    /*
     * Outer container — full-screen fixed overlay.
     * z-[9998]: just below the skip link (z-[9999]) per PRD §12.2.
     *
     * The ONLY CSS property animated here is opacity.
     * opacity → GPU composited layer. No layout thrashing. (PRD §13.5)
     */
    <motion.div
      className={cn(
        "fixed inset-0 z-[9998]",
        "flex items-center justify-center",
        "bg-[#141414]",
        "will-change-[opacity]"
      )}
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      // Entire splash is decorative — screen readers skip to #main-content
      aria-hidden="true"
    >
      {/*
       * Inner layout — centred with a -mt-8 optical offset.
       * This places the monogram slightly above the true vertical centre,
       * which reads as more balanced on most aspect ratios (a common
       * typographic / editorial design convention).
       */}
      <div className="flex flex-col items-center gap-8 -mt-8">

        {/* ── Z+ Monogram ────────────────────────────────────────────────── */}
        <SplashMonogram />

        {/* ── ZEESHAN+ — Character stagger reveal ──────────────────────── */}
        {/*
         * Each character is a separate motion.span animated independently.
         * The + glyph receives the crimson accent colour.
         *
         * Timing:
         *   delay = 0.9 + (index × 0.06)
         *   First char (Z) starts at 0.90s
         *   Last char (+) starts at 0.90 + 7×0.06 = 1.32s
         *   Last char completes at 1.32 + 0.45 = 1.77s
         */}
        <div
          className="flex items-end select-none"
          aria-label="ZEESHAN+"
        >
          {BRAND_CHARS.map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              aria-hidden="true"
              className={cn(
                "inline-block text-[2.5rem] font-bold leading-none",
                // Tight tracking creates the premium display-text feel
                "tracking-[0.18em]",
                // + in crimson, all other characters in white
                char === "+" ? "text-[#C8102E]" : "text-white"
              )}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.9 + i * 0.06,
                ease: EASE,
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* ── "Loading Experience..." ───────────────────────────────────── */}
        {/*
         * Fades in at 1.55s — during the tail of the text reveal.
         * The "..." dots animate as a subtle crimson pulse to add life.
         * Monospace font reinforces the technical, premium feel.
         */}
        <div className="flex items-center gap-0 select-none">
          <motion.span
            className={cn(
              "font-mono text-[0.625rem] tracking-[0.35em] uppercase",
              "text-[#6B6B6B]"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 1.55,
              ease: "easeOut",
            }}
          >
            Loading Experience
          </motion.span>

          {/* Crimson dots — animate in after the label */}
          <motion.span
            className="font-mono text-[0.625rem] text-[#C8102E] tracking-[0.1em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0.4, 1] }}
            transition={{
              duration: 0.7,
              delay: 1.65,
              times: [0, 0.2, 0.4, 0.7, 0.85, 1],
              ease: "easeOut",
            }}
          >
            ...
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

/**
 * SplashMonogram — Animated SVG Z+ monogram.
 *
 * Draws the Z in white and the + in crimson using Framer Motion's pathLength.
 * A feGaussianBlur SVG filter adds an extremely subtle glow to the + bars only.
 *
 * Path geometry (viewBox "0 0 110 74"):
 *  Z  — M 8,8 L 62,8 L 8,66 L 62,66   (top → top-right → bottom-left → bottom-right)
 *  +v — M 82,22 L 82,52                 (vertical bar)
 *  +h — M 68,37 L 96,37                 (horizontal bar)
 *
 * Draw sequence when instant=false:
 *  0.00s → 0.70s  Z draws
 *  0.55s → 0.90s  + vertical draws (overlap with Z tail)
 *  0.65s → 1.00s  + horizontal draws (staggered after vertical)
 *
 * Performance: only pathLength and opacity are animated — both GPU-composited.
 * PRD Reference: §3.2 Scene 1 · §8.2 Animation Tiers · §13.5 Animation Performance
 */

import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SplashMonogramProps {
  /**
   * When true, skip the draw animation and show the monogram instantly.
   * Used for the reduced-motion path (though SplashScreen returns null in that case).
   * Kept as an escape hatch for future uses (e.g. Navbar logo, case study pages).
   */
  instant?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

/** Cinematic ease-out — PRD §8.4 */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STROKE_WIDTH = 2.5;

// ─── Component ────────────────────────────────────────────────────────────────

export function SplashMonogram({ instant = false }: SplashMonogramProps) {
  const d = instant ? 0 : 1; // Duration multiplier: 0 = instant, 1 = full timing

  return (
    <svg
      width="110"
      height="74"
      viewBox="0 0 110 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        {/*
         * Glow filter — applied ONLY to the crimson + bars.
         * stdDeviation="2.5" keeps it subtle (PRD §3.2: "extremely subtle glow").
         * The feMerge composites the blur behind the original crisp stroke.
         */}
        <filter
          id="monogram-glow"
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="2.5"
            result="blur"
          />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Z — white ──────────────────────────────────────────────────────────
          Draws top-left → top-right → bottom-left → bottom-right.
          This directional draw creates the cinematic Z reveal effect.
      ───────────────────────────────────────────────────────────────────────── */}
      <motion.path
        d="M 8,8 L 62,8 L 8,66 L 62,66"
        stroke="#FFFFFF"
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: {
            duration: 0.7 * d,
            ease: EASE,
          },
          opacity: {
            duration: 0.05,
            delay: 0,
          },
        }}
      />

      {/* ── + vertical bar — crimson ────────────────────────────────────────── */}
      <motion.path
        d="M 82,22 L 82,52"
        stroke="#C8102E"
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        filter="url(#monogram-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: {
            duration: 0.35 * d,
            delay: 0.55 * d,
            ease: EASE,
          },
          opacity: {
            duration: 0.05,
            delay: 0.55 * d,
          },
        }}
      />

      {/* ── + horizontal bar — crimson ──────────────────────────────────────── */}
      <motion.path
        d="M 68,37 L 96,37"
        stroke="#C8102E"
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        filter="url(#monogram-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: {
            duration: 0.35 * d,
            delay: 0.65 * d,
            ease: EASE,
          },
          opacity: {
            duration: 0.05,
            delay: 0.65 * d,
          },
        }}
      />
    </svg>
  );
}

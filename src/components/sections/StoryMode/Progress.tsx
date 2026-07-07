"use client";

/**
 * Progress — src/components/sections/StoryMode/Progress.tsx
 *
 * Top-of-screen progress bar for Story Mode.
 * Renders one thin segment per slide — the active segment fills
 * with a crimson bar to show position in the episode sequence.
 *
 * Used at the very top of the Story Mode overlay, above the content.
 *
 * PRD Reference: §9 Color System · §8 Motion Design
 */

import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProgressProps {
  total: number;
  current: number;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Progress({ total, current, className }: ProgressProps) {
  return (
    <div
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Story episode ${current + 1} of ${total}`}
      className={cn("flex gap-1", className)}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/[0.2]"
        >
          <div
            aria-hidden
            className={cn(
              "h-full rounded-full transition-all duration-300",
              i < current
                ? "w-full bg-white"           // completed segments — solid white
                : i === current
                  ? "w-full bg-[#C8102E]"     // active segment — crimson
                  : "w-0 bg-transparent",     // upcoming segments — empty
            )}
          />
        </div>
      ))}
    </div>
  );
}

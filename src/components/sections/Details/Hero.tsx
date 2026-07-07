"use client";

/**
 * DetailHero — src/components/sections/Details/Hero.tsx
 *
 * Full-width cinematic hero for the Detail Overlay.
 *
 * Layout (top → bottom):
 *  • Project image  (aspect-video; falls back to gradient if image is missing)
 *  • Category badge (top-left, absolute)
 *  • Close button   (top-right, absolute)
 *  • Project title  (bottom-left, over image gradient)
 *
 * PRD Reference: §9 Color System · §8 Motion Design
 */

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DetailHeroProps {
  image: string;
  title: string;
  category: string;
  /** Called by the X button and by the parent's ESC handler. */
  onClose: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DetailHero({ image, title, category, onClose }: DetailHeroProps) {
  return (
    <div className="relative w-full aspect-video overflow-hidden">

      {/* ── Fallback gradient (shown when image is missing / loading) ─────── */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-[#2A1A1E] via-[#1A1A1A] to-[#0D0D0D]"
      />

      {/* ── Project image ──────────────────────────────────────────────────── */}
      <img
        src={image}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover select-none"
        onError={(e) => {
          // Hide broken image — fallback gradient will show through
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />

      {/* ── Gradient overlays ──────────────────────────────────────────────── */}

      {/* Top vignette — improves badge and close button readability */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent"
      />

      {/* Bottom fade — blends into the overlay panel background (#141414) */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent"
      />

      {/* ── Category badge ─────────────────────────────────────────────────── */}
      <span
        aria-label={`Category: ${category}`}
        className="
          absolute left-5 top-5
          rounded-full
          bg-[#C8102E]
          px-3 py-1
          text-[0.65rem] font-bold uppercase tracking-[0.15em]
          text-white
          shadow-lg
        "
      >
        {category}
      </span>

      {/* ── Close button ───────────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close detail view"
        className={cn(
          "absolute right-4 top-4",
          "flex h-9 w-9 items-center justify-center",
          "rounded-full",
          "bg-black/50 backdrop-blur-sm",
          "border border-white/10",
          "text-white",
          "transition-all duration-150",
          "hover:bg-black/80 hover:border-white/30 hover:scale-110",
          // Accessibility — Electric Blue focus ring (PRD §12.2)
          "focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-[#3B82F6]",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        )}
      >
        <X size={15} strokeWidth={2.5} aria-hidden />
      </button>

      {/* ── Project title (over hero image) ────────────────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h2
          id="detail-overlay-title"
          className="
            text-[1.75rem] sm:text-[2.25rem]
            font-black
            leading-none
            tracking-tight
            text-white
            drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]
          "
        >
          {title}
        </h2>
      </div>

    </div>
  );
}

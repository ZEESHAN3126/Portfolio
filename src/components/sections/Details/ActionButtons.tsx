"use client";

/**
 * DetailActionButtons — src/components/sections/Details/ActionButtons.tsx
 *
 * Primary CTA row inside the Detail Overlay.
 *
 * Renders:
 *  • "View Live" — primary white button, links to liveUrl
 *  • "GitHub"    — secondary ghost button, links to githubUrl
 *
 * Both buttons are rendered only when the relevant URL exists.
 * Returns null if neither URL is provided.
 *
 * PRD Reference: §12.2 Accessibility (Electric Blue focus ring)
 */

import { ExternalLink, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DetailActionButtonsProps {
  liveUrl?: string;
  githubUrl?: string;
}

// ─── Shared link styles ───────────────────────────────────────────────────────

const base = cn(
  "inline-flex items-center gap-2",
  "rounded-lg px-5 py-2.5",
  "text-sm font-semibold",
  "transition-all duration-150",
  // Focus ring — Electric Blue per PRD §12.2
  "focus-visible:outline-none",
  "focus-visible:ring-2 focus-visible:ring-[#3B82F6]",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]",
);

// ─── Component ────────────────────────────────────────────────────────────────

export function DetailActionButtons({ liveUrl, githubUrl }: DetailActionButtonsProps) {
  if (!liveUrl && !githubUrl) return null;

  return (
    <div className="flex flex-wrap gap-3">

      {/* ── View Live ─────────────────────────────────────────────────────── */}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          className={cn(
            base,
            "bg-white text-black",
            "hover:bg-zinc-100 hover:scale-[1.02]",
            "active:scale-[0.98]",
          )}
        >
          <ExternalLink size={15} strokeWidth={2.5} aria-hidden />
          View Live
        </a>
      )}

      {/* ── GitHub ────────────────────────────────────────────────────────── */}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer noopener"
          className={cn(
            base,
            "bg-white/[0.07] text-white",
            "border border-white/10",
            "hover:bg-white/[0.12] hover:border-white/25 hover:scale-[1.02]",
            "active:scale-[0.98]",
          )}
        >
          <Code2 size={15} strokeWidth={2} aria-hidden />
          GitHub
        </a>
      )}

    </div>
  );
}

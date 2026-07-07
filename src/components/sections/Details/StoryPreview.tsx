"use client";

/**
 * StoryPreview — src/components/sections/Details/StoryPreview.tsx
 *
 * Teaser card for the project's Story Mode episode viewer.
 *
 * Renders when:  project.storyMode !== undefined
 * Auto-hides when: project.storyMode === undefined
 *
 * States:
 *  • slides.length > 0  → "Watch Story" button is active (calls onWatchStory)
 *  • slides.length === 0 → "Coming Soon" disabled button
 *
 * PRD Reference: §8 Motion Design · §9 Color System
 */

import { Clapperboard, Lock, Play } from "lucide-react";
import type { StoryModeData } from "@/types/project-detail";
import { Section } from "./Section";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StoryPreviewProps {
  data?: StoryModeData;
  /** Fired when the "Watch Story" CTA is clicked — parent opens StoryMode */
  onWatchStory?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function StoryPreview({ data, onWatchStory }: StoryPreviewProps) {
  if (!data) return null;

  const {
    slides,
    previewText = "A cinematic, interactive walkthrough of this project is coming soon.",
    ctaLabel = "Watch Story",
  } = data;

  const hasSlides = slides.length > 0;

  return (
    <Section title="Story">
      <div
        className="
          relative overflow-hidden
          rounded-xl
          border border-white/[0.06]
          bg-[#0D0D0D]
        "
      >
        {/* Subtle noise texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")",
            backgroundSize: "180px",
          }}
        />

        {/* Crimson ambient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#C8102E]/[0.05] to-transparent"
        />

        <div className="relative flex flex-col items-center justify-center px-8 py-12 text-center">

          {/* Icon */}
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04]">
            <Clapperboard size={22} strokeWidth={1.5} className="text-[#C8102E]" aria-hidden />
          </div>

  {/* Headline */}
<h4 className="mb-3 text-2xl font-black text-white">
  Watch how I'm building Stylinger.
</h4>

<p className="mb-8 max-w-md text-base leading-relaxed text-white/60">
  Follow the complete journey — from idea, research and product thinking,
  to design, development, pitching, failures and milestones.
</p>

<button
  type="button"
  onClick={() => {
    window.location.href = "/watch/stylinger";
  }}
  className="
    inline-flex items-center gap-3
    rounded-lg
    bg-white
    px-7 py-3
    text-base
    font-bold
    text-black
    transition-all
    duration-200
    hover:scale-[1.03]
    hover:bg-neutral-200
  "
>
  <Play size={18} fill="black" strokeWidth={0} />
  Play
</button>

        </div>
      </div>
    </Section>
  );
}

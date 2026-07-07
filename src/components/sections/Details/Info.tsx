"use client";

/**
 * DetailInfo — src/components/sections/Details/Info.tsx
 *
 * The informational body of the Detail Overlay, rendered below the
 * hero image and action buttons.
 *
 * Sections (rendered only when data is present):
 *  1. Meta row     — year, status badge, category
 *  2. Subtitle     — short tagline
 *  3. Description  — long-form project description
 *  4. Progress bar — build completion percentage
 *  5. Tech stack   — pill tags
 *
 * PRD Reference: §9 Color System · §10 Typography
 */

import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/data/continueWatching";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DetailInfoProps {
  subtitle: string;
  description?: string;
  year?: string;
  status?: ProjectStatus;
  category: string;
  progress: number;
  tech?: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Colour-code the status badge by project health. */
function statusStyles(status: ProjectStatus): string {
  switch (status) {
    case "Completed":
      return "bg-emerald-900/30 text-emerald-400 border-emerald-800/40";
    case "Archived":
      return "bg-white/[0.06] text-[#A3A3A3] border-white/10";
    case "In Progress":
    default:
      return "bg-[#C8102E]/10 text-[#C8102E] border-[#C8102E]/20";
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DetailInfo({
  subtitle,
  description,
  year,
  status,
  category,
  progress,
  tech,
}: DetailInfoProps) {
  return (
    <div className="mt-5 space-y-6">

      {/* ── Meta row ──────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2.5 text-xs">

        {/* Year */}
        {year && (
          <span className="font-medium text-[#A3A3A3]">
            {year}
          </span>
        )}

        {/* Separator */}
        {year && (status || category) && (
          <span aria-hidden className="text-[#3A3A3A]">•</span>
        )}

        {/* Status badge */}
        {status && (
          <span
            className={cn(
              "inline-flex items-center rounded border px-2.5 py-0.5 font-semibold uppercase tracking-[0.1em]",
              statusStyles(status),
            )}
          >
            {status}
          </span>
        )}

        {/* Separator */}
        {(year || status) && (
          <span aria-hidden className="text-[#3A3A3A]">•</span>
        )}

        {/* Category */}
        <span className="uppercase tracking-[0.12em] text-[#6B6B6B]">
          {category}
        </span>

      </div>

      {/* ── Subtitle ──────────────────────────────────────────────────────── */}
      <p className="text-[0.9375rem] leading-relaxed text-[#A3A3A3]">
        {subtitle}
      </p>

      {/* ── Description ───────────────────────────────────────────────────── */}
      {description && (
        <p className="text-sm leading-[1.85] text-[#6B6B6B]">
          {description}
        </p>
      )}

      {/* ── Progress bar ──────────────────────────────────────────────────── */}
      {progress > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="uppercase tracking-[0.12em] text-[#6B6B6B]">
              Build Progress
            </span>
            <span className="font-bold text-white">
              {progress}%
            </span>
          </div>

          {/* Track */}
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Build progress: ${progress}%`}
            className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08]"
          >
            {/* Fill */}
            <div
              aria-hidden
              className="h-full rounded-full bg-[#C8102E] transition-[width] duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* ── Tech stack ────────────────────────────────────────────────────── */}
      {tech && tech.length > 0 && (
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.12em] text-[#6B6B6B]">
            Tech Stack
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
            {tech.map((name) => (
              <li key={name}>
                <span
                  className="
                    inline-block
                    rounded-full
                    border border-white/[0.08]
                    bg-white/[0.04]
                    px-3 py-1
                    text-xs font-medium
                    text-[#A3A3A3]
                    transition-colors duration-150
                    hover:border-white/20 hover:text-white
                  "
                >
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

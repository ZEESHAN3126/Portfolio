"use client";

/**
 * Overview — src/components/sections/Details/Overview.tsx
 *
 * The primary information section of the Detail Overlay, rendered
 * immediately below the hero image.
 *
 * Content (all conditional — omitted when data is absent):
 *  1. Meta row      — year · status badge · category
 *  2. Subtitle      — short tagline
 *  3. Description   — one-paragraph summary
 *  4. Progress bar  — build completion percentage (accessible)
 *  5. Tech Stack    — pill tags
 *
 * This component replaces Info.tsx for the new ProjectDetail architecture.
 * Info.tsx is kept for backward compatibility but is no longer used.
 *
 * PRD Reference: §9 Color System · §10 Typography · §12 Accessibility
 */

import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types/project-detail";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OverviewProps {
  subtitle: string;
  description?: string;
  year?: string;
  status?: ProjectStatus;
  category: string;
  progress: number;
  tech?: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

export function Overview({
  subtitle,
  description,
  year,
  status,
  category,
  progress,
  tech,
}: OverviewProps) {
  const hasMeta = year || status || category;

  return (
    <div className="space-y-5">

      {/* ── Meta row ──────────────────────────────────────────────────────── */}
      {hasMeta && (
        <div className="flex flex-wrap items-center gap-2 text-xs">

          {year && (
            <span className="font-medium text-[#A3A3A3]">{year}</span>
          )}

          {year && (status || category) && (
            <span aria-hidden className="select-none text-[#383838]">•</span>
          )}

          {status && (
            <span
              className={cn(
                "inline-flex items-center rounded border px-2.5 py-[2px]",
                "text-[0.6rem] font-bold uppercase tracking-[0.12em]",
                statusStyles(status),
              )}
            >
              {status}
            </span>
          )}

          {(year || status) && category && (
            <span aria-hidden className="select-none text-[#383838]">•</span>
          )}

          {category && (
            <span className="uppercase tracking-[0.12em] text-[#6B6B6B]">
              {category}
            </span>
          )}

        </div>
      )}

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
          <div className="mb-[7px] flex items-center justify-between text-xs">
            <span className="uppercase tracking-[0.12em] text-[#6B6B6B]">
              Build Progress
            </span>
            <span className="font-bold tabular-nums text-white">
              {progress}%
            </span>
          </div>

          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Build progress: ${progress}%`}
            className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08]"
          >
            <div
              aria-hidden
              className="h-full rounded-full bg-[#C8102E] transition-[width] duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* ── Tech Stack ────────────────────────────────────────────────────── */}
      {tech && tech.length > 0 && (
        <div>
          <p className="mb-3 text-[0.625rem] font-bold uppercase tracking-[0.22em] text-[#6B6B6B]">
            Tech Stack
          </p>
          <ul
            className="flex flex-wrap gap-2"
            aria-label="Technologies used"
          >
            {tech.map((name) => (
              <li key={name}>
                <span
                  className="
                    inline-block rounded-full
                    border border-white/[0.08]
                    bg-white/[0.04]
                    px-3 py-[5px]
                    text-xs font-medium
                    text-[#A3A3A3]
                    transition-colors duration-150
                    hover:border-white/[0.18] hover:text-white
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

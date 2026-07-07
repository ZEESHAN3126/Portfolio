"use client";

/**
 * Achievements — src/components/sections/Details/Achievements.tsx
 *
 * Grid of project achievements, wins, and milestones.
 *
 * Auto-hides when: achievements is undefined or []
 *
 * Visual:
 *  • 1-column mobile, 2-column sm+ grid
 *  • Emoji/icon + title + optional description + optional date
 *
 * PRD Reference: §9 Color System · §11 Spacing
 */

import { cn } from "@/lib/utils";
import type { ProjectAchievement } from "@/types/project-detail";
import { Section } from "./Section";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AchievementsProps {
  items?: ProjectAchievement[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Achievements({ items }: AchievementsProps) {
  if (!items?.length) return null;

  return (
    <Section title="Achievements">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="
              rounded-xl
              border border-white/[0.07]
              bg-white/[0.02]
              p-4
              transition-colors duration-150
              hover:border-white/[0.14] hover:bg-white/[0.04]
            "
          >
            {/* Icon + title row */}
            <div className="flex items-start gap-3">
              {item.icon && (
                <span className="flex-shrink-0 text-2xl leading-none" aria-hidden>
                  {item.icon}
                </span>
              )}

              <div className="min-w-0 flex-1">
                <p className="text-[0.8125rem] font-semibold leading-tight text-white">
                  {item.title}
                </p>
                {item.date && (
                  <p className="mt-[3px] text-[0.625rem] font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">
                    {item.date}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            {item.description && (
              <p className={cn("mt-2.5 text-xs leading-relaxed text-[#6B6B6B]", item.icon && "pl-9")}>
                {item.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

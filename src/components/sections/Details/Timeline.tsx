"use client";

/**
 * Timeline — src/components/sections/Details/Timeline.tsx
 *
 * Vertical project milestone timeline. Supports unlimited entries.
 *
 * Renders when:  items is a non-empty array
 * Auto-hides when: items is undefined, null, or []
 *
 * Visual design:
 *  • Vertical connector line between dots (white/8%)
 *  • Coloured milestone dot: emerald=completed, crimson=in-progress, grey=planned
 *  • Date formatted as "Jan 2024" using the en-US locale
 *  • Title + optional description per milestone
 *
 * Dot colour signals:
 *  completed   → emerald with subtle glow
 *  in-progress → crimson (#C8102E) with subtle glow
 *  planned     → #404040 (muted grey)
 *
 * PRD Reference: §9 Color System · §8 Motion Principles
 */

import { cn } from "@/lib/utils";
import type { TimelineMilestone, MilestoneStatus } from "@/types/project-detail";
import { Section } from "./Section";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TimelineProps {
  items?: TimelineMilestone[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Colour + shadow for each milestone status dot. */
function dotClass(status?: MilestoneStatus): string {
  switch (status) {
    case "completed":
      return "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.45)]";
    case "in-progress":
      return "bg-[#C8102E] shadow-[0_0_8px_rgba(200,16,46,0.45)]";
    case "planned":
    default:
      return "bg-[#404040]";
  }
}

/** Format ISO date string ("2024-01" | "2024-03-15") → "Jan 2024". */
function formatDate(iso: string): string {
  try {
    const [year, month] = iso.split("-");
    if (!year || !month) return iso;
    const d = new Date(Number(year), Number(month) - 1);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Timeline({ items }: TimelineProps) {
  if (!items?.length) return null;

  return (
    <Section title="Project Timeline">
      <ol aria-label="Project milestones" className="relative space-y-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.id} className="relative flex gap-4">

              {/* ── Left column: dot + connector ──────────────────────────── */}
              <div className="relative flex flex-shrink-0 flex-col items-center">

                {/* Milestone dot */}
                <div
                  className={cn(
                    "relative z-[1] mt-[3px]",
                    "h-[13px] w-[13px]",
                    "rounded-full",
                    "border-2 border-[#141414]",   // creates gap from connector line
                    dotClass(item.status),
                  )}
                  aria-hidden
                />

                {/* Connector line — hidden for the last item */}
                {!isLast && (
                  <div
                    aria-hidden
                    className="
                      absolute top-[17px]
                      bottom-0
                      left-1/2
                      w-[1px]
                      -translate-x-1/2
                      bg-white/[0.07]
                    "
                  />
                )}

              </div>

              {/* ── Right column: content ─────────────────────────────────── */}
              <div className={cn("min-w-0 flex-1", isLast ? "pb-0" : "pb-7")}>

                <time
                  dateTime={item.date}
                  className="block text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#6B6B6B]"
                >
                  {formatDate(item.date)}
                </time>

                <h4 className="mt-[5px] text-sm font-semibold leading-snug text-white">
                  {item.title}
                </h4>

                {item.description && (
                  <p className="mt-1.5 text-xs leading-relaxed text-[#6B6B6B]">
                    {item.description}
                  </p>
                )}

              </div>

            </li>
          );
        })}
      </ol>
    </Section>
  );
}

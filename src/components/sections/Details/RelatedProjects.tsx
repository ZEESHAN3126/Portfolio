"use client";

/**
 * RelatedProjects — src/components/sections/Details/RelatedProjects.tsx
 *
 * Horizontal scroll row of mini project cards shown at the bottom
 * of the Detail Overlay.
 *
 * Auto-hides when: relatedProjects is undefined or []
 *
 * Each card:
 *  • aspect-video thumbnail with image + gradient + category badge
 *  • Title + subtitle below
 *  • Hover: slight lift + scale on thumbnail
 *
 * onSelect callback: provided by parent to open the overlay for the related project.
 * When not provided, cards are still rendered but are not interactive.
 *
 * PRD Reference: §9 Color System · §8 Motion Design
 */

import type { RelatedProjectRef } from "@/types/project-detail";
import { Section } from "./Section";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RelatedProjectsProps {
  items?: RelatedProjectRef[];
  /** Called when a related project card is clicked. Pass the project id. */
  onSelect?: (id: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RelatedProjects({ items, onSelect }: RelatedProjectsProps) {
  if (!items?.length) return null;

  return (
    <Section title="Related Projects">
      <div className="-mx-1 flex gap-3.5 overflow-x-auto px-1 pb-2">
        {items.map((project) => (
          <article
            key={project.id}
            onClick={() => onSelect?.(project.id)}
            className="
              group
              relative
              min-w-[190px] max-w-[190px]
              cursor-pointer
              overflow-hidden
              rounded-xl
              bg-[#1A1A1A]
              transition-transform duration-300
              hover:-translate-y-1
            "
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            onKeyDown={onSelect ? (e) => e.key === "Enter" && onSelect(project.id) : undefined}
            aria-label={onSelect ? `Open ${project.title}` : undefined}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#2A1A1E] to-[#0D0D0D]">
              <img
                src={project.image}
                alt={project.title}
                draggable={false}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 to-transparent"
              />
              <span
                className="
                  absolute left-2 top-2
                  rounded-full bg-[#C8102E]
                  px-2 py-[2px]
                  text-[0.55rem] font-bold uppercase tracking-wider text-white
                "
              >
                {project.category}
              </span>
            </div>

            {/* Info */}
            <div className="p-3">
              <p className="text-[0.75rem] font-bold leading-snug text-white">
                {project.title}
              </p>
              <p className="mt-[3px] line-clamp-2 text-[0.65rem] leading-snug text-[#6B6B6B]">
                {project.subtitle}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

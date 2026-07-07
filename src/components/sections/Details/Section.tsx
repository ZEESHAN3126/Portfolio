/**
 * Section — src/components/sections/Details/Section.tsx
 *
 * Reusable section wrapper for every block inside the Detail Overlay.
 *
 * Visual contract:
 *  • Top border — subtle divider between sections (white/6%)
 *  • Section label — 10px caps label in #6B6B6B above content
 *  • Bottom padding — breathing room before the next divider
 *
 * Usage pattern (each section component self-contains this wrapper):
 *
 *   export function Timeline({ items }: TimelineProps) {
 *     if (!items?.length) return null;          // ← auto-hide
 *     return (
 *       <Section title="Project Timeline">
 *         {content}
 *       </Section>
 *     );
 *   }
 *
 * PRD Reference: §11 Spacing System · §9 Color System
 */

import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SectionProps {
  /** Uppercase section label. Omit to render without a label. */
  title?: string;
  children: React.ReactNode;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Section({ title, children, className }: SectionProps) {
  return (
    <div
      className={cn(
        "border-t border-white/[0.06]",
        "pt-7 pb-3",
        className,
      )}
    >
      {title && (
        <p
          className="
            mb-5
            text-[0.625rem]
            font-bold
            uppercase
            tracking-[0.22em]
            text-[#6B6B6B]
          "
        >
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

"use client";

/**
 * SideNav — Fixed right-side dot navigation (desktop only).
 *
 * PRD Reference: §5.1 Navigation Components · §5.2 Navbar Behaviour
 *
 * Behaviour:
 *  - Visible only at ≥ lg breakpoint (PRD §14.3).
 *  - Renders nothing when sections array is empty (Feature 3 default).
 *  - Each dot represents a scrollable section of the page.
 *  - Active dot is a crimson pill; inactive dots are dim circles.
 *  - Hover reveals a tooltip with the section label.
 *  - Clicking a dot smooth-scrolls to the corresponding section ID.
 *
 * Usage:
 *   // In layout.tsx — pass NAV_LINKS when sections are built (Feature 5+)
 *   <SideNav sections={NAV_LINKS} />
 *
 * The component is intentionally stateless regarding section content.
 * It receives section data as props and drives active state via useActiveSection().
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";

// ─── Types ────────────────────────────────────────────────────────────────────

/** A single navigable section descriptor. */
export interface SideNavSection {
  /** The `id` attribute of the target section element. Must match canonical IDs in PRD §4.1. */
  id: string;
  /** Human-readable label shown in the tooltip on hover. */
  label: string;
}

export interface SideNavProps {
  /**
   * Array of sections to render as dot indicators.
   * Pass empty array (default) until sections are implemented.
   * Populated by Feature 5+ via NAV_LINKS from constants/nav.ts.
   */
  sections?: SideNavSection[];
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scrollToSection(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Dot Indicator ────────────────────────────────────────────────────────────

interface DotProps {
  section: SideNavSection;
  isActive: boolean;
}

function Dot({ section, isActive }: DotProps) {
  return (
    <button
      type="button"
      onClick={() => scrollToSection(section.id)}
      aria-label={`Navigate to ${section.label}`}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "group relative flex items-center justify-end",
        // Enlarge click target without changing visual size
        "w-8 h-8 -mr-1",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[#141414] rounded-full"
      )}
    >
      {/* Tooltip — appears on hover to the left of the dot */}
      <span
        aria-hidden
        className={cn(
          "absolute right-full mr-3",
          "px-2 py-1 rounded text-xs font-medium whitespace-nowrap",
          "bg-[#1F1F1F] border border-[#2E2E2E] text-[#A3A3A3]",
          // Show/hide via opacity for smooth transition
          "pointer-events-none",
          "opacity-0 group-hover:opacity-100",
          "translate-x-1 group-hover:translate-x-0",
          "transition-[opacity,transform] duration-200"
        )}
      >
        {section.label}
      </span>

      {/* Dot — animates between inactive circle and active crimson pill */}
      <motion.span
        aria-hidden
        className="block rounded-full"
        animate={{
          width:           isActive ? 20  : 6,
          height:          6,
          backgroundColor: isActive
            ? "#C8102E"                  // Active — crimson accent
            : "rgba(255, 255, 255, 0.2)", // Inactive — dim white
          boxShadow: isActive
            ? "0 0 8px rgba(200, 16, 46, 0.5)"
            : "none",
        }}
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1], // --ease-cinematic
        }}
      />
    </button>
  );
}

// ─── SideNav ──────────────────────────────────────────────────────────────────

export function SideNav({ sections = [], className }: SideNavProps) {
  const activeId = useActiveSection();

  /**
   * Render nothing when no sections are provided.
   * This is the correct state during Feature 3 (Global Shell only).
   * Feature 5+ will pass NAV_LINKS to populate the dots.
   */
  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="Section indicator navigation"
      className={cn(
        // Desktop only — hidden on mobile/tablet per PRD §14.3
        "hidden lg:flex",
        // Positioning — fixed right side, vertically centred
        "fixed right-6 top-1/2 -translate-y-1/2 z-40",
        "flex-col items-end gap-2",
        className
      )}
    >
      {sections.map((section) => (
        <Dot
          key={section.id}
          section={section}
          isActive={activeId === section.id}
        />
      ))}
    </nav>
  );
}

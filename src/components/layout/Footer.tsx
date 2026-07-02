/**
 * Footer — Minimal site footer.
 *
 * PRD Reference: §5.1 Navigation Components · §6 Component Tree
 *
 * Renders at the bottom of the Contact section only (not a sticky footer).
 * Contains:
 *  - Copyright notice
 *  - Built-with attribution (serves as a subtle technical credibility signal)
 *
 * Social links will be added here in Feature 11 (Contact section)
 * once the socials data is wired up.
 *
 * This is a Server Component (no "use client" — no interactivity needed).
 */

import { cn } from "@/lib/utils";
import { SITE } from "@/constants/site";

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className={cn(
        "w-full border-t border-[#2E2E2E]",
        "py-8",
        className
      )}
    >
      <div className="container-main flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        {/* Copyright */}
        <p className="text-sm text-[#6B6B6B]">
          &copy; {currentYear}{" "}
          <span className="text-[#A3A3A3]">{SITE.name}</span>.{" "}
          All rights reserved.
        </p>

        {/* Technical attribution — PRD §5.1 "Built-with credit" */}
        <p className="font-mono text-xs text-[#6B6B6B]">
          Built with{" "}
          <span className="text-[#A3A3A3]">Next.js 15</span>
          {" "}·{" "}
          <span className="text-[#A3A3A3]">Framer Motion</span>
          {" "}·{" "}
          <span className="text-[#C8102E]">❤</span>
        </p>
      </div>
    </footer>
  );
}

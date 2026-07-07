"use client";

/**
 * About — src/components/sections/Details/About.tsx
 *
 * Extended narrative section for a project.
 *
 * Renders when:  project.about is a non-empty string or string[]
 * Auto-hides when: project.about === undefined | null | ""
 *
 * Accepts either a single string (one paragraph) or an array of strings
 * (multiple paragraphs rendered as separate <p> elements with spacing).
 *
 * PRD Reference: §10 Typography System
 */

import type { ReactNode } from "react";
import { Section } from "./Section";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AboutProps {
  content?: string | string[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function About({ content }: AboutProps) {
  // Normalise to array for uniform rendering
  const paragraphs: string[] = !content
    ? []
    : Array.isArray(content)
      ? content.filter(Boolean)
      : [content].filter(Boolean);

  // Auto-hide when no content is provided
  if (!paragraphs.length) return null;

  return (
    <Section title="About">
      <div className="space-y-4">
        {paragraphs.map((text, index) => (
          <p
            key={index}
            className="text-sm leading-[1.9] text-[#A3A3A3]"
          >
            {text}
          </p>
        ))}
      </div>
    </Section>
  );
}

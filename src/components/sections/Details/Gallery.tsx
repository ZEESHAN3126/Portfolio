"use client";

/**
 * Gallery — src/components/sections/Details/Gallery.tsx
 *
 * Responsive image grid for project screenshots, mockups, and visuals.
 *
 * Renders when:  images is a non-empty array
 * Auto-hides when: images is undefined, null, or []
 *
 * Layout:
 *  • 2 columns on mobile, 3 on sm+
 *  • aspect-video cells — consistent proportions regardless of source dimensions
 *  • Broken images fall back to a dark gradient background (no broken img icon)
 *  • Caption slides up on hover
 *
 * Lightbox: reserved for a future phase.
 * Clicking an image currently does nothing but will open a fullscreen viewer.
 *
 * PRD Reference: §8 Motion Design (hover scale) · §9 Color System
 */

import type { GalleryImage } from "@/types/project-detail";
import { Section } from "./Section";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GalleryProps {
  images?: GalleryImage[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Gallery({ images }: GalleryProps) {
  if (!images?.length) return null;

  return (
    <Section title="Gallery">
      <ul
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-3"
        aria-label="Project gallery"
      >
        {images.map((img) => (
          <li
            key={img.id}
            className="group relative aspect-video overflow-hidden rounded-lg bg-[#1A1A1A]"
          >
            {/* ── Image ──────────────────────────────────────────────────── */}
            <img
              src={img.src}
              alt={img.alt}
              draggable={false}
              loading="lazy"
              className="
                h-full w-full object-cover
                transition-transform duration-500
                group-hover:scale-105
              "
              onError={(e) => {
                // Replace broken image with transparent pixel — gradient bg shows through
                (e.target as HTMLImageElement).src =
                  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
              }}
            />

            {/* ── Gradient overlay (always present for visual polish) ─────── */}
            <div
              aria-hidden
              className="
                absolute inset-0
                bg-gradient-to-t from-black/40 to-transparent
                opacity-0
                transition-opacity duration-300
                group-hover:opacity-100
              "
            />

            {/* ── Caption (slide up on hover) ────────────────────────────── */}
            {img.caption && (
              <div
                className="
                  absolute inset-x-0 bottom-0
                  translate-y-full
                  bg-gradient-to-t from-black/90 via-black/60 to-transparent
                  p-3
                  transition-transform duration-300 ease-out
                  group-hover:translate-y-0
                "
              >
                <p className="text-[0.625rem] leading-snug text-white/80">
                  {img.caption}
                </p>
              </div>
            )}

          </li>
        ))}
      </ul>

      {/* Lightbox placeholder — future phase */}
      <p className="mt-3 text-center text-[0.6rem] uppercase tracking-[0.18em] text-[#3A3A3A]">
        Lightbox · Coming Soon
      </p>

    </Section>
  );
}

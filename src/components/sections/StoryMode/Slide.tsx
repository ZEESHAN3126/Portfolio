"use client";

/**
 * Slide — src/components/sections/StoryMode/Slide.tsx
 *
 * Renders one "episode" inside Story Mode.
 * The SlideType determines the layout strategy.
 *
 * Supported types:
 *  image   — full-bleed image with title + caption overlay
 *  video   — <video> element with native controls
 *  pdf     — DocumentViewer in pdf mode
 *  code    — scrollable code block with language label
 *  text    — centered title + body copy
 *  split   — left text / right image two-column layout
 *
 * All slide types are animated by the parent StoryMode component
 * via AnimatePresence + layout key. This component only handles
 * the visual content — not the transition.
 *
 * PRD Reference: §8 Motion Design · §9 Color System
 */

import { DocumentViewer } from "./DocumentViewer";
import type { StorySlide } from "@/types/project-detail";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SlideProps {
  slide: StorySlide;
  slideIndex: number;
  totalSlides: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Slide({ slide, slideIndex, totalSlides }: SlideProps) {
  const counter = `${slideIndex + 1} / ${totalSlides}`;

  switch (slide.type) {

    // ── Image slide ──────────────────────────────────────────────────────────
    case "image": {
      return (
        <div className="relative flex h-full w-full items-end">
          {/* Background image */}
          {slide.src && (
            <img
              src={slide.src}
              alt={slide.alt ?? slide.title ?? ""}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          {/* Gradient overlay */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
          />

          {/* Content */}
          <div className="relative z-10 w-full p-8 md:p-12">
            <SlideCounter label={counter} />
            {slide.title && (
              <h2 className="mt-2 text-3xl font-black leading-tight text-white md:text-5xl">
                {slide.title}
              </h2>
            )}
            {slide.caption && (
              <p className="mt-3 max-w-xl text-base text-white/70">{slide.caption}</p>
            )}
          </div>
        </div>
      );
    }

    // ── Video slide ──────────────────────────────────────────────────────────
    case "video": {
      return (
        <div className="relative flex h-full w-full flex-col items-center justify-center bg-black p-4 md:p-8">
          {slide.videoSrc && (
            <video
              src={slide.videoSrc}
              poster={slide.poster}
              controls
              playsInline
              className="max-h-[70vh] w-full max-w-4xl rounded-xl object-contain shadow-2xl"
              aria-label={slide.title ?? "Project video"}
            />
          )}
          <div className="mt-5 text-center">
            <SlideCounter label={counter} />
            {slide.title && (
              <h2 className="mt-2 text-xl font-bold text-white">{slide.title}</h2>
            )}
            {slide.caption && (
              <p className="mt-2 text-sm text-white/60">{slide.caption}</p>
            )}
          </div>
        </div>
      );
    }

    // ── PDF / Document slide ─────────────────────────────────────────────────
    case "pdf": {
      return (
        <div className="flex h-full w-full flex-col p-4 md:p-8">
          <div className="mb-4 flex items-center justify-between">
            <SlideCounter label={counter} />
            {slide.title && (
              <h2 className="text-lg font-bold text-white">{slide.title}</h2>
            )}
          </div>
          <div className="min-h-0 flex-1">
            {slide.documentUrl ? (
              <DocumentViewer
                url={slide.documentUrl}
                type="pdf"
                title={slide.documentTitle ?? slide.title}
                caption={slide.caption}
                allowDownload={slide.allowDownload ?? false}
                className="h-full"
              />
            ) : (
              <PlaceholderDocument label={slide.documentTitle ?? slide.title ?? "Document"} />
            )}
          </div>
        </div>
      );
    }

    // ── Code slide ───────────────────────────────────────────────────────────
    case "code": {
      return (
        <div className="flex h-full w-full flex-col p-4 md:p-8">
          <div className="mb-4 flex items-center justify-between">
            <SlideCounter label={counter} />
            {slide.language && (
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#A3A3A3]">
                {slide.language}
              </span>
            )}
          </div>

          {slide.title && (
            <h2 className="mb-4 text-xl font-bold text-white">{slide.title}</h2>
          )}

          {/* Code block */}
          <div className="min-h-0 flex-1 overflow-auto rounded-xl border border-white/[0.07] bg-[#0D0D0D] p-5">
            <pre className="text-xs leading-relaxed text-[#A3A3A3] sm:text-sm">
              <code>{slide.code ?? "// Code coming soon"}</code>
            </pre>
          </div>

          {slide.caption && (
            <p className="mt-3 text-center text-xs text-[#6B6B6B]">{slide.caption}</p>
          )}
        </div>
      );
    }

    // ── Text slide ───────────────────────────────────────────────────────────
    case "text": {
      return (
        <div className="flex h-full w-full items-center justify-center p-8 md:p-16">
          <div className="max-w-2xl text-center">
            <SlideCounter label={counter} centered />
            {slide.title && (
              <h2 className="mt-4 text-3xl font-black leading-tight text-white md:text-5xl">
                {slide.title}
              </h2>
            )}
            {slide.body && (
              <p className="mt-6 text-lg leading-relaxed text-white/60">{slide.body}</p>
            )}
            {slide.caption && (
              <p className="mt-4 text-sm text-white/40">{slide.caption}</p>
            )}
          </div>
        </div>
      );
    }

    // ── Split slide (text left / image right) ─────────────────────────────────
    case "split": {
      return (
        <div className="flex h-full w-full flex-col md:flex-row">
          {/* Left — text */}
          <div className="flex flex-1 flex-col justify-center p-8 md:p-12 md:pr-8">
            <SlideCounter label={counter} />
            {slide.title && (
              <h2 className="mt-3 text-2xl font-black leading-tight text-white md:text-4xl">
                {slide.title}
              </h2>
            )}
            {slide.body && (
              <p className="mt-4 text-base leading-relaxed text-white/60 md:text-lg">
                {slide.body}
              </p>
            )}
            {slide.caption && (
              <p className="mt-3 text-sm text-white/40">{slide.caption}</p>
            )}
          </div>

          {/* Right — image */}
          <div className="relative flex-1 overflow-hidden">
            {slide.src ? (
              <img
                src={slide.src}
                alt={slide.alt ?? slide.title ?? ""}
                draggable={false}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-[#2A1A1E] to-[#0D0D0D]" />
            )}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent md:bg-gradient-to-l"
            />
          </div>
        </div>
      );
    }

    // ── Fallback ─────────────────────────────────────────────────────────────
    default: {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-sm text-[#6B6B6B]">Unknown slide type</p>
        </div>
      );
    }
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SlideCounter({ label, centered = false }: { label: string; centered?: boolean }) {
  return (
    <p
      className={cn(
        "text-[0.6rem] font-bold uppercase tracking-[0.25em] text-[#C8102E]",
        centered && "text-center",
      )}
    >
      {label}
    </p>
  );
}

function PlaceholderDocument({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center rounded-xl border border-white/[0.07] bg-[#0D0D0D]">
      <p className="text-sm text-[#6B6B6B]">{label} — URL not yet configured.</p>
    </div>
  );
}

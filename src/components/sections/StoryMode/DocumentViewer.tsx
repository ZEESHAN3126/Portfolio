"use client";

/**
 * DocumentViewer — src/components/sections/StoryMode/DocumentViewer.tsx
 *
 * Renders embedded documents INSIDE the Story Mode experience.
 * Visitors read them without leaving the overlay.
 *
 * Supported types:
 *  • PDF         — iframe embed with optional toolbar/download controls
 *  • Image       — full-height <img> with optional caption
 *  • External    — Figma, Notion, etc. open in new tab with a preview card
 *
 * Download gating:
 *  allowDownload: false (default) → PDF iframe uses ?toolbar=0&navpanes=0
 *                                    hiding the browser's built-in download button
 *  allowDownload: true            → shows an explicit Download button
 *
 * PRD Reference: §8 Accessibility · §9 Color System
 */

import { ExternalLink, Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DocumentViewerProps {
  /** URL of the document to display */
  url: string;
  /** Display type — drives the render strategy */
  type: "pdf" | "image" | "external";
  title?: string;
  caption?: string;
  allowDownload?: boolean;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DocumentViewer({
  url,
  type,
  title,
  caption,
  allowDownload = false,
  className,
}: DocumentViewerProps) {

  // ── PDF Embed ─────────────────────────────────────────────────────────────
  if (type === "pdf") {
    // Append query params to hide browser chrome when download is disabled.
    // Note: behaviour varies by browser — this is best-effort, not a security control.
    const pdfSrc = allowDownload
      ? url
      : `${url}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`;

    return (
      <div className={cn("flex h-full flex-col", className)}>

        {/* Header */}
        {(title || allowDownload) && (
          <div className="flex items-center justify-between px-2 pb-3">
            {title && (
              <div className="flex items-center gap-2.5">
                <FileText size={14} className="text-[#C8102E]" strokeWidth={2} aria-hidden />
                <span className="text-xs font-semibold text-[#A3A3A3]">{title}</span>
              </div>
            )}
            {allowDownload && (
              <a
                href={url}
                download
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5",
                  "text-xs font-semibold text-white",
                  "bg-[#C8102E] hover:bg-[#A50D26]",
                  "transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]",
                )}
              >
                <Download size={12} strokeWidth={2.5} aria-hidden />
                Download
              </a>
            )}
          </div>
        )}

        {/* PDF iframe */}
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-white/[0.07]">
          <iframe
            src={pdfSrc}
            title={title ?? "Document"}
            className="h-full w-full bg-[#0D0D0D]"
            /**
             * Sandbox restricts the iframe:
             *  allow-scripts        — needed for PDF.js-based viewers
             *  allow-same-origin    — required for cross-origin PDFs to load
             * Notably absent: allow-downloads, allow-forms, allow-popups
             */
            sandbox="allow-scripts allow-same-origin"
            loading="lazy"
          />
        </div>

        {caption && (
          <p className="mt-2 px-1 text-center text-[0.65rem] text-[#6B6B6B]">
            {caption}
          </p>
        )}

      </div>
    );
  }

  // ── Image Embed ───────────────────────────────────────────────────────────
  if (type === "image") {
    return (
      <div className={cn("flex h-full flex-col items-center justify-center", className)}>
        <img
          src={url}
          alt={title ?? caption ?? "Document image"}
          draggable={false}
          className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {caption && (
          <p className="mt-3 text-center text-xs text-[#6B6B6B]">{caption}</p>
        )}
      </div>
    );
  }

  // ── External Link Card (Figma, Notion, etc.) ──────────────────────────────
  return (
    <div
      className={cn(
        "flex h-full flex-col items-center justify-center gap-5 text-center",
        className,
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
        <ExternalLink size={24} className="text-[#C8102E]" strokeWidth={1.5} aria-hidden />
      </div>

      {title && (
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#6B6B6B]">Document</p>
          <h4 className="mt-1 text-base font-bold text-white">{title}</h4>
        </div>
      )}

      {caption && (
        <p className="max-w-xs text-sm text-[#6B6B6B]">{caption}</p>
      )}

      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className={cn(
          "inline-flex items-center gap-2 rounded-lg px-5 py-2.5",
          "bg-white text-sm font-semibold text-black",
          "hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98]",
          "transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]",
        )}
      >
        <ExternalLink size={14} strokeWidth={2.5} aria-hidden />
        Open {title ?? "Document"}
      </a>
    </div>
  );
}

"use client";

/**
 * Documents — src/components/sections/Details/Documents.tsx
 *
 * List of project documents inside the Detail Overlay.
 * Renders: PDF · Notion · Figma · Links · Other
 *
 * Auto-hides when:  documents is undefined or []
 *
 * Behaviour:
 *  • Documents with a url → clickable, opens in new tab
 *  • PDFs without a url  → "Preview Soon" badge (future: opens DocumentViewer)
 *  • allowDownload:true  → shows a Download pill alongside the row
 *
 * PRD Reference: §9 Color System · §12 Accessibility
 */

import { FileText, BookOpen, Layers, Link, File, ArrowUpRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectDocument, DocumentType } from "@/types/project-detail";
import { Section } from "./Section";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DocumentsProps {
  items?: ProjectDocument[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function DocIcon({ type }: { type: DocumentType }) {
  const cls = "text-[#A3A3A3]";
  switch (type) {
    case "pdf":    return <FileText  size={15} strokeWidth={1.5} className={cls} aria-hidden />;
    case "notion": return <BookOpen  size={15} strokeWidth={1.5} className={cls} aria-hidden />;
    case "figma":  return <Layers    size={15} strokeWidth={1.5} className={cls} aria-hidden />;
    case "link":   return <Link      size={15} strokeWidth={1.5} className={cls} aria-hidden />;
    default:       return <File      size={15} strokeWidth={1.5} className={cls} aria-hidden />;
  }
}

function typeLabel(type: DocumentType): string {
  switch (type) {
    case "pdf":    return "PDF";
    case "notion": return "Notion";
    case "figma":  return "Figma";
    case "link":   return "Link";
    default:       return "Document";
  }
}

// ─── Row inner content (shared between link and static variants) ──────────────

function DocRowContent({ doc }: { doc: ProjectDocument }) {
  return (
    <>
      {/* Icon */}
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
        <DocIcon type={doc.type} />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.8125rem] font-semibold text-white">{doc.title}</p>
        <p className="mt-[2px] text-[0.7rem] text-[#6B6B6B]">
          {typeLabel(doc.type)}{doc.size ? ` · ${doc.size}` : ""}
        </p>
        {doc.description && (
          <p className="mt-1 line-clamp-1 text-[0.7rem] text-[#6B6B6B]">{doc.description}</p>
        )}
      </div>
    </>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Documents({ items }: DocumentsProps) {
  if (!items?.length) return null;

  return (
    <Section title="Documents">
      <ul className="space-y-2.5">
        {items.map((doc) => {
          const rowBase = cn(
            "flex items-center gap-3.5 rounded-xl p-3.5",
            "border border-white/[0.06]",
            "transition-all duration-200",
          );

          // ── Clickable row ────────────────────────────────────────────────
          if (doc.url) {
            return (
              <li key={doc.id}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={cn(
                    rowBase,
                    "bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]",
                    "group",
                  )}
                >
                  <DocRowContent doc={doc} />

                  {/* Actions */}
                  <div className="ml-auto flex flex-shrink-0 items-center gap-2">
                    {doc.allowDownload && (
                      <a
                        href={doc.url}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-full border border-white/10 p-1.5 text-[#6B6B6B] hover:text-white"
                        aria-label={`Download ${doc.title}`}
                      >
                        <Download size={12} strokeWidth={2.5} aria-hidden />
                      </a>
                    )}
                    <ArrowUpRight
                      size={15}
                      className="text-[#6B6B6B] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                      aria-hidden
                    />
                  </div>
                </a>
              </li>
            );
          }

          // ── Static row (no URL yet) ───────────────────────────────────────
          return (
            <li key={doc.id}>
              <div className={cn(rowBase, "bg-white/[0.02] opacity-70")}>
                <DocRowContent doc={doc} />
                {doc.type === "pdf" && (
                  <span className="ml-auto flex-shrink-0 rounded border border-white/10 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-[#6B6B6B]">
                    Preview Soon
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

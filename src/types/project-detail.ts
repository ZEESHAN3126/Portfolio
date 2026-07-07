/**
 * Project Detail Types — src/types/project-detail.ts
 *
 * THE SINGLE TYPE SYSTEM for the entire ZEESHAN+ Project Engine.
 *
 * Architecture:
 *  • ProjectDetail      — complete data object for one project (source of truth)
 *  • StoryModeData      — episode viewer content (slides array)
 *  • StorySlide         — one "episode" / screen inside StoryMode
 *  • DocumentType       — pdf | notion | figma | link | other
 *  • + all section sub-types (Gallery, Timeline, Achievement, etc.)
 *
 * Visibility rule:
 *  undefined | []  →  section component returns null  →  section auto-hides
 *  populated data  →  section renders normally
 *
 * PRD Reference: §6 Component Tree · §7 Folder Responsibility
 */

// ─── Status ───────────────────────────────────────────────────────────────────

export type ProjectStatus = "In Progress" | "Completed" | "Archived";

// ─── Gallery ─────────────────────────────────────────────────────────────────

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

// ─── Timeline ────────────────────────────────────────────────────────────────

export type MilestoneStatus = "completed" | "in-progress" | "planned";

export interface TimelineMilestone {
  id: string;
  /** ISO date: "2024-01" or "2024-03-15" */
  date: string;
  title: string;
  description?: string;
  status?: MilestoneStatus;
}

// ─── Documents ───────────────────────────────────────────────────────────────

export type DocumentType = "pdf" | "notion" | "figma" | "link" | "other";

export interface ProjectDocument {
  id: string;
  title: string;
  type: DocumentType;
  /** External URL — when absent, shows "Preview Soon" badge */
  url?: string;
  description?: string;
  size?: string;
  /** Allow visitor to download. Default: false */
  allowDownload?: boolean;
}

// ─── Achievements ─────────────────────────────────────────────────────────────

export interface ProjectAchievement {
  id: string;
  title: string;
  description?: string;
  date?: string;
  /** Emoji or short icon key */
  icon?: string;
}

// ─── Related Project Reference ────────────────────────────────────────────────

export interface RelatedProjectRef {
  /** Must match a key in projectDetails */
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
}

// ─── Project Links ────────────────────────────────────────────────────────────

export interface ProjectLinks {
  live?: string;
  github?: string;
  figma?: string;
  notion?: string;
  caseStudy?: string;
}

// ─── Story Mode ───────────────────────────────────────────────────────────────

/**
 * SlideType governs what DocumentViewer / Slide renders.
 *
 *  image   — full-bleed image with caption
 *  video   — <video> element with controls
 *  pdf     — <iframe> embed (download gated by allowDownload)
 *  code    — syntax-highlighted code block
 *  text    — title + body copy only
 *  split   — left text panel + right image
 */
export type SlideType = "image" | "video" | "pdf" | "code" | "text" | "split";

export interface StorySlide {
  id: string;
  type: SlideType;

  // ── Common ────────────────────────────────────────────────────────────────
  title?: string;
  caption?: string;

  // ── image | split (right side) ────────────────────────────────────────────
  src?: string;
  alt?: string;

  // ── video ─────────────────────────────────────────────────────────────────
  videoSrc?: string;
  /** Poster frame shown before playback */
  poster?: string;

  // ── pdf / document ────────────────────────────────────────────────────────
  documentUrl?: string;
  documentTitle?: string;
  /**
   * Controls download access for this specific slide.
   * Inherits ProjectDocument.allowDownload when referenced via documents[].
   * Defaults to false.
   */
  allowDownload?: boolean;

  // ── code ──────────────────────────────────────────────────────────────────
  code?: string;
  /** Language hint for syntax highlighting (e.g. "typescript", "bash") */
  language?: string;

  // ── text | split (left side) ──────────────────────────────────────────────
  body?: string;
}

export interface StoryModeData {
  /** Ordered slides — each slide is one "episode" screen */
  slides: StorySlide[];
  /** Teaser shown in the Overview StoryPreview card */
  previewText?: string;
  /** CTA label on the "Watch Story" button. Default: "Watch Story" */
  ctaLabel?: string;
}

// ─── ProjectDetail (root — single source of truth) ───────────────────────────

export interface ProjectDetail {
  // ── Identity ──────────────────────────────────────────────────────────────
  id: string;
  title: string;
  subtitle: string;
  category: string;
  /** Thumbnail shown on all cards */
  heroImage: string;
  /** 0–100 build completion */
  progress: number;

  // ── Status ────────────────────────────────────────────────────────────────
  year?: string;
  status?: ProjectStatus;

  // ── Overview ──────────────────────────────────────────────────────────────
  description?: string;
  tech?: string[];

  // ── About section ─────────────────────────────────────────────────────────
  about?: string | string[];

  // ── Story Mode ────────────────────────────────────────────────────────────
  /**
   * When defined → StoryPreview card is shown in the overlay.
   * When defined with slides → StoryMode can be launched.
   */
  storyMode?: StoryModeData;

  // ── Timeline ──────────────────────────────────────────────────────────────
  timeline?: TimelineMilestone[];

  // ── Gallery ───────────────────────────────────────────────────────────────
  gallery?: GalleryImage[];

  // ── Documents ─────────────────────────────────────────────────────────────
  documents?: ProjectDocument[];

  // ── Achievements ──────────────────────────────────────────────────────────
  achievements?: ProjectAchievement[];

  // ── Related Projects ──────────────────────────────────────────────────────
  relatedProjects?: RelatedProjectRef[];

  // ── Links ─────────────────────────────────────────────────────────────────
  links?: ProjectLinks;
}

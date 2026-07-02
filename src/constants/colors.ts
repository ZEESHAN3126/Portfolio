// Design token constants — keep in sync with tailwind.config / globals.css

// Brand colors
export const COLORS = {
  accent:       "#C8102E", // Deep Crimson Red — primary brand accent
  accentHover:  "#A50D26", // Darker hover state
  accentMuted:  "#C8102E33", // 20% opacity overlay
  focus:        "#3B82F6", // Electric Blue — ONLY for focus rings & a11y glows
  background:   "#141414", // Netflix-style near-black
  surface:      "#1F1F1F", // Card / panel surface
  surfaceHover: "#2A2A2A",
  border:       "#2E2E2E",
  textPrimary:  "#FFFFFF",
  textSecondary:"#A3A3A3",
  textMuted:    "#6B6B6B",
} as const;

// Typography scale labels (informational — actual values in CSS)
export const FONT_SIZES = {
  displayXL: "clamp(3rem, 8vw, 7rem)",
  displayLG: "clamp(2.25rem, 5vw, 4rem)",
  headingMD: "clamp(1.5rem, 3vw, 2.25rem)",
  body:      "1rem",
  small:     "0.875rem",
  xs:        "0.75rem",
} as const;

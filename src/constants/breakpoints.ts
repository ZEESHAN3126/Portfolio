// Pixel breakpoints — mirroring Tailwind CSS v4 defaults.
// Use these in JS/TS (e.g. useMediaQuery hook) to stay in sync with CSS.

export const BREAKPOINTS = {
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

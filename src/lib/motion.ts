import { Variants, Transition } from "framer-motion";

// ─── Shared transition presets ────────────────────────────────────────────────

export const TRANSITION_EASE: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier — cinematic ease-out
};

export const TRANSITION_SPRING: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

export const TRANSITION_SLOW: Transition = {
  duration: 1.2,
  ease: [0.22, 1, 0.36, 1],
};

// ─── Reusable animation variants ─────────────────────────────────────────────

/** Fade in from transparent */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: TRANSITION_EASE },
};

/** Fade in + rise up */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: TRANSITION_EASE },
};

/** Fade in + slide from left */
export const fadeLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: TRANSITION_EASE },
};

/** Fade in + slide from right */
export const fadeRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: TRANSITION_EASE },
};

/** Scale in from slightly smaller */
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: TRANSITION_EASE },
};

/** Stagger container — apply to the parent of staggered children */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/** Netflix-style card hover */
export const cardHoverVariants: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.04,
    y: -6,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Cinematic text reveal — word by word */
export const wordRevealVariants: Variants = {
  hidden: { opacity: 0, y: "110%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

"use client";

/**
 * Navbar — Fixed top navigation shell.
 *
 * PRD Reference: §5.2 Navbar Behaviour · §6 Component Tree
 *
 * Capabilities implemented in this shell:
 *  ✅ Crimson scroll-progress bar (thin line at absolute top)
 *  ✅ Transparent → glassmorphism transition on scroll > 60px
 *  ✅ "Z+" monogram logo — scrolls to #hero on click
 *  ✅ "Let's Talk" CTA — always visible (scrolls to #contact)
 *  ✅ Mobile hamburger — animated three-bar → X
 *  ✅ Full-screen mobile menu overlay (nav links slot ready)
 *  ✅ Navbar visibility driven by UIContext (hidden during Splash/WhoIsWatching)
 *  ✅ Framer Motion entrance animation (fade in from top)
 *  ✅ Body scroll lock when mobile menu is open
 *  ✅ Keyboard accessible — all interactive elements have focus-visible rings
 *  ✅ ARIA roles, labels, aria-expanded on hamburger
 *
 * TODO (Feature 5 — populate nav links):
 *  - Pass NAV_LINKS from constants/nav.ts into the desktop <nav> and mobile menu.
 *  - Add active-link detection via useActiveSection().
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TRANSITION_EASE } from "@/lib/motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useUIContext } from "@/context/UIContext";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/constants/site";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Public interface — allows parent to pre-configure the Navbar if needed. */
export interface NavbarProps {
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Smooth-scroll to a section by ID.
 * Falls back gracefully if the element is not yet in the DOM.
 */
function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Navbar({ className }: NavbarProps) {
  const { navbarVisible } = useUIContext();
  const scrollProgress = useScrollProgress();

  const [scrolled, setScrolled]           = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  /** Track scroll position to toggle glassmorphism at 60px threshold (PRD §5.2). */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Sync immediately in case page loads mid-scroll
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /** Lock body scroll while the mobile overlay is open (PRD §5.2). */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  /** Auto-close mobile menu if viewport is resized to desktop (PRD §14.3). */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const handleLetsTalk = () => {
    if (mobileMenuOpen) setMobileMenuOpen(false);
    // Small delay when closing menu to avoid scroll fighting the animation
    setTimeout(() => scrollToSection("contact"), mobileMenuOpen ? 150 : 0);
  };

  return (
    <AnimatePresence>
      {navbarVisible && (
        <motion.header
          role="banner"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={TRANSITION_EASE}
          className={cn(
            // Position & size
            "fixed top-0 left-0 right-0 z-50 h-16",
            // Glassmorphism transition on scroll
            "transition-[background-color,border-color,backdrop-filter] duration-500",
            scrolled
              ? "glass border-b border-white/[0.06]"
              : "bg-transparent border-b border-transparent",
            className
          )}
        >
          {/* ── Scroll Progress Bar — PRD §5.3 ─────────────────────────────
              Thin crimson line at the absolute top of the Navbar.
              Width driven by scrollProgress (0→1) via CSS transform.
              Using transform:scaleX instead of width for GPU compositing.
          ────────────────────────────────────────────────────────────────── */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[2px] bg-[#C8102E] origin-left"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />

          {/* ── Main Navbar Content ─────────────────────────────────────── */}
          <div className="container-main flex h-full items-center justify-between">

            {/* ── Logo ───────────────────────────────────────────────────── */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("hero");
              }}
              aria-label={`${SITE.name} — Scroll to top`}
              className={cn(
                "group relative flex items-center",
                "rounded-md transition-opacity duration-200 hover:opacity-90",
                // Focus ring — Electric Blue per PRD §12.2
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2",
                "focus-visible:ring-offset-[#141414]"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "text-[1.5rem] font-bold leading-none tracking-tight",
                  "text-white transition-colors duration-200"
                )}
              >
                Z<span className="text-[#C8102E]">+</span>
              </span>
            </a>

            {/* ── Desktop Nav Links Slot ──────────────────────────────────
                Empty in Feature 3 (Global Shell).
                Feature 5 will inject <NavLinks /> here.
            ─────────────────────────────────────────────────────────────── */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex items-center gap-6"
            >
              {/* Nav links will be added when sections are implemented */}
            </nav>

            {/* ── Right-side Actions ─────────────────────────────────────── */}
            <div className="flex items-center gap-3">
              {/* CTA — always visible, hidden only on very small screens where
                  the hamburger menu provides full navigation */}
              <Button
                variant="primary"
                size="sm"
                onClick={handleLetsTalk}
                className="hidden sm:inline-flex"
                aria-label="Open the contact section"
              >
                Let&apos;s Talk
              </Button>

              {/* ── Mobile Hamburger ─────────────────────────────────────── */}
              <button
                type="button"
                onClick={toggleMobileMenu}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-menu"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                className={cn(
                  "lg:hidden",
                  "flex flex-col items-center justify-center gap-[5px]",
                  "w-10 h-10 rounded-md",
                  "transition-colors duration-200 hover:bg-white/5",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-[#141414]"
                )}
              >
                {/* Three-bar → X morph animation */}
                <span
                  aria-hidden
                  className={cn(
                    "block h-[1.5px] w-5 bg-white rounded-full",
                    "transition-transform duration-300 ease-[var(--ease-cinematic)]",
                    mobileMenuOpen && "translate-y-[6.5px] rotate-45"
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "block h-[1.5px] w-5 bg-white rounded-full",
                    "transition-opacity duration-200",
                    mobileMenuOpen && "opacity-0"
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "block h-[1.5px] w-5 bg-white rounded-full",
                    "transition-transform duration-300 ease-[var(--ease-cinematic)]",
                    mobileMenuOpen && "-translate-y-[6.5px] -rotate-45"
                  )}
                />
              </button>
            </div>
          </div>

          {/* ── Mobile Menu Overlay ─────────────────────────────────────────
              Full-screen overlay — PRD §5.2 "Hamburger menu → full-screen overlay".
              Rendered as a sibling to Navbar content so it covers the viewport.
          ───────────────────────────────────────────────────────────────── */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                id="mobile-nav-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={cn(
                  "lg:hidden",
                  "fixed inset-0 top-16 z-40",
                  "glass",
                  "flex flex-col items-center justify-center gap-10 px-6"
                )}
              >
                {/* ── Mobile Nav Links Slot ───────────────────────────────
                    Feature 5 will inject navigation links here.
                ─────────────────────────────────────────────────────────── */}
                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-col items-center gap-6"
                >
                  {/* Links populated in Feature 5 */}
                </nav>

                {/* Mobile CTA */}
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleLetsTalk}
                  aria-label="Open the contact section"
                >
                  Let&apos;s Talk
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

/**
 * Root Layout — src/app/layout.tsx
 *
 * The single layout that wraps every page in the application.
 * This is a Server Component — providers live in PageWrapper (Client Component).
 *
 * Responsibilities:
 *  ✅ HTML document structure (lang, dir)
 *  ✅ Font variables applied to <body>
 *  ✅ Canonical metadata (from lib/metadata.ts)
 *  ✅ Skip link — first focusable element (PRD §12.2)
 *  ✅ Navbar, SideNav, Footer shell components
 *  ✅ <main> landmark with id for skip link target
 *  ✅ PageWrapper (injects UIProvider + PersonaProvider)
 *  ✅ Dark theme — background colour applied directly so no FOUC
 *
 * PRD Reference: §3 Root Layout · §12 Accessibility Rules
 */

import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { baseMetadata } from "@/lib/metadata";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Navbar } from "@/components/layout/Navbar";
import { SideNav } from "@/components/layout/SideNav";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = baseMetadata;

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      /**
       * `dark` class is set explicitly because ZEESHAN+ is dark-mode only.
       * PRD §9.4 — no light mode variant exists.
       * This prevents any media-query-driven light theme from activating.
       */
      className="dark"
      /**
       * Suppress hydration warning on <html> — next/font injects font-variable
       * class names that differ between SSR and client.
       */
      suppressHydrationWarning
    >
      <body
        className={[
          fontVariables,     // --font-geist-sans, --font-geist-mono CSS vars
          "antialiased",     // Subpixel rendering on dark surfaces
          "bg-[#141414]",    // Prevent FOUC — matches --color-bg token
          "text-white",      // Base text colour
          "overflow-x-hidden", // Prevent horizontal scroll from parallax layers
        ].join(" ")}
      >
        {/* ── Skip Link — PRD §12.2 ─────────────────────────────────────────
            Must be the FIRST focusable element on every page.
            Visible only on :focus — helps keyboard and screen reader users
            bypass the Navbar and jump directly to main content.
        ───────────────────────────────────────────────────────────────────── */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* ── Application Shell ─────────────────────────────────────────────
            PageWrapper: UIProvider + PersonaProvider (Client Component boundary)
            Navbar: Fixed top — hidden during Splash, visible from Hero onwards
            SideNav: Fixed right — dot navigation, desktop only, empty until Feature 5
            main: Page content — sections are composed in page.tsx
            Footer: Bottom of Contact section
        ───────────────────────────────────────────────────────────────────── */}
        <PageWrapper>
          {/* Shell navigation — always present in DOM, visibility managed by UIContext */}
          <Navbar />

          {/* Dot nav — sections={[]} renders nothing; Feature 5+ will pass NAV_LINKS */}
          <SideNav sections={[]} />

          {/* Main content landmark — target for the skip link above */}
          <main
            id="main-content"
            /**
             * tabIndex={-1} allows the skip link to programmatically focus <main>
             * without making it part of the natural tab order.
             * outline-none removes the focus ring on <main> itself
             * (the ring only appears on interactive elements, not landmarks).
             */
            tabIndex={-1}
            className="outline-none"
          >
            {children}
          </main>

          <Footer />
        </PageWrapper>
      </body>
    </html>
  );
}

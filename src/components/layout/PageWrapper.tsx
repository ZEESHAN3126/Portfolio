"use client";

/**
 * PageWrapper — Application provider shell.
 *
 * Wraps all page content and composes the context providers that must be
 * available to any component in the tree. This is the correct place for:
 *  - Global React Context providers (UI state, Persona selection)
 *  - Future: Page transition wrappers (AnimatePresence from Framer Motion)
 *  - Future: Smooth scroll initialisation (Lenis)
 *
 * Placed inside <body> in layout.tsx so Server Components can still be
 * children — only this wrapper itself is a Client Component.
 *
 * PRD Reference: §6 Component Tree · §19 State Management
 */

import { UIProvider } from "@/context/UIContext";
import { PersonaProvider } from "@/context/PersonaContext";

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    /**
     * Provider order:
     * UIProvider (outermost) — provides shell-level state (Navbar visibility, splash)
     * PersonaProvider (inner) — provides visitor persona selection
     *
     * UIProvider wraps PersonaProvider so future features can use UIContext
     * to orchestrate transitions between Splash → WhoIsWatching → Hero.
     */
    <UIProvider>
      <PersonaProvider>
        {children}
      </PersonaProvider>
    </UIProvider>
  );
}

"use client";

/**
 * UIContext — Global UI state for the application shell.
 *
 * Manages state that crosses component boundaries and cannot live in a
 * single component. Currently tracks:
 *  - navbarVisible: Feature 1 (Splash) hides the Navbar, Feature 2/3 shows it.
 *  - splashComplete: Feature 1 sets this true when its animation finishes.
 *
 * PRD Reference: §5.4 (Splash gating) · §5.2 (Navbar visibility)
 */

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UIContextValue {
  /**
   * Controls Navbar visibility.
   * Default: true (Navbar visible).
   * Feature 1 (Splash) sets this to false on mount and back to true on complete.
   */
  navbarVisible: boolean;
  setNavbarVisible: (visible: boolean) => void;

  /**
   * True once the Splash Screen animation has fully completed.
   * Feature 1 sets this to true when the transition to Who's Watching begins.
   * Feature 3 (Hero) can use this to know the experience has started.
   */
  splashComplete: boolean;
  setSplashComplete: (complete: boolean) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const UIContext = createContext<UIContextValue | null>(null);
UIContext.displayName = "UIContext";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function UIProvider({ children }: { children: ReactNode }) {
  /**
   * Navbar is visible by default.
   * Once Feature 1 (Splash Screen) is implemented, it will call
   * setNavbarVisible(false) on mount and setNavbarVisible(true) on complete.
   */
  const [navbarVisible, setNavbarVisible] = useState<boolean>(true);

  /**
   * Splash starts as incomplete.
   * Feature 1 sets to true, which can unlock entrance animations in Hero.
   */
  const [splashComplete, setSplashComplete] = useState<boolean>(false);

  return (
    <UIContext.Provider
      value={{
        navbarVisible,
        setNavbarVisible,
        splashComplete,
        setSplashComplete,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Returns the global UI state and its setters.
 * Must be called inside a component wrapped by <UIProvider>.
 *
 * @example
 * const { navbarVisible, setNavbarVisible } = useUIContext();
 */
export function useUIContext(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) {
    throw new Error(
      "[ZEESHAN+] useUIContext must be called inside <UIProvider>. " +
        "Ensure <PageWrapper> wraps your component tree."
    );
  }
  return ctx;
}

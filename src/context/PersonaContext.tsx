"use client";

/**
 * PersonaContext — PRD §19.3
 *
 * Stores the visitor's self-selected persona from the "Who's Watching" screen.
 * Persisted to sessionStorage so persona survives same-session page refreshes.
 * Components use usePersona() to access persona-aware copy variations.
 *
 * Flow:
 *   Feature 2 (WhoIsWatching) calls setPersona() on card click.
 *   Any section that wants persona-aware copy calls usePersona().
 *   If persona is null, default copy is shown.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

/** The four visitor archetypes defined in PRD §2. */
export type Persona = "recruiter" | "founder" | "developer" | "explorer";

export interface PersonaContextValue {
  /** The selected persona. null until the user makes a selection. */
  persona: Persona | null;
  /**
   * Persist the persona selection to sessionStorage and update context.
   * Called by the WhoIsWatching section (Feature 2).
   */
  setPersona: (persona: Persona) => void;
}

// ─── Internal constants ───────────────────────────────────────────────────────

const SESSION_KEY = "zeeshan_plus_persona" as const;

// ─── Context ──────────────────────────────────────────────────────────────────

const PersonaContext = createContext<PersonaContextValue | null>(null);
PersonaContext.displayName = "PersonaContext";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona | null>(null);

  /**
   * On mount, hydrate from sessionStorage so returning visitors within the
   * same session skip the Who's Watching screen automatically.
   */
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY) as Persona | null;
      const valid: Persona[] = ["recruiter", "founder", "developer", "explorer"];
      if (stored && valid.includes(stored)) {
        setPersonaState(stored);
      }
    } catch {
      // sessionStorage is unavailable (e.g., private browsing restrictions).
      // Persona will work in-memory only for this session.
    }
  }, []);

  const setPersona = (p: Persona): void => {
    setPersonaState(p);
    try {
      sessionStorage.setItem(SESSION_KEY, p);
    } catch {
      // Silently fail — in-memory persona is still usable.
    }
  };

  return (
    <PersonaContext.Provider value={{ persona, setPersona }}>
      {children}
    </PersonaContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Returns the current persona and a setter.
 * Must be called inside a component wrapped by <PersonaProvider>.
 *
 * @example
 * const { persona, setPersona } = usePersona();
 * const headline = persona === "recruiter" ? "Hire me" : "Let's collaborate";
 */
export function usePersona(): PersonaContextValue {
  const ctx = useContext(PersonaContext);
  if (!ctx) {
    throw new Error(
      "[ZEESHAN+] usePersona must be called inside <PersonaProvider>. " +
        "Ensure <PageWrapper> wraps your component tree."
    );
  }
  return ctx;
}

/**
 * useProject — src/hooks/useProject.ts
 *
 * Resolves a projectId string → full ProjectDetail object.
 *
 * This is the single gateway between UI components and the
 * projectDetails data registry. Every card, overlay, and Story Mode
 * session goes through this hook.
 *
 * Usage:
 *   const project = useProject("stylinger");
 *   if (!project) return null;   // unknown id — render nothing
 *
 * Note: This is a pure synchronous hook today (no async fetching).
 * The shape is future-proof for remote data sources — the interface
 * can be widened to return { data, loading, error } without touching callers.
 */

import { useMemo } from "react";
import { getProject } from "@/data/projectDetails";
import type { ProjectDetail } from "@/types/project-detail";

/**
 * @param projectId — must match a key in projectDetails.ts
 * @returns ProjectDetail if found, undefined if the id is unknown
 */
export function useProject(projectId: string): ProjectDetail | undefined {
  // useMemo prevents re-running the lookup on every render.
  // Since projectDetails is a static import, this is essentially free —
  // but the memoization makes the hook safe to use in render-heavy lists.
  return useMemo(() => getProject(projectId), [projectId]);
}

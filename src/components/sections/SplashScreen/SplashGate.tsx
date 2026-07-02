"use client";

import { useEffect, useState } from "react";
import { SplashScreen } from "./index";

const SPLASH_SESSION_KEY = "zeeshan_plus_splash_seen" as const;

interface SplashGateProps {
  onComplete?: () => void;
}

export function SplashGate({
  onComplete,
}: SplashGateProps) {
  const [showSplash, setShowSplash] = useState<boolean | null>(null);

  useEffect(() => {
    const alreadySeen = Boolean(
      sessionStorage.getItem(SPLASH_SESSION_KEY)
    );

    const skipParam =
      new URLSearchParams(window.location.search).get("skip") === "1";

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const shouldSkip =
      alreadySeen || skipParam || reducedMotion;

    setShowSplash(!shouldSkip);
  }, []);

  const handleSplashComplete = () => {
    try {
      sessionStorage.setItem(
        SPLASH_SESSION_KEY,
        "true"
      );
    } catch {
      // Ignore storage failures.
    }

    setShowSplash(false);

    onComplete?.();
  };

  if (!showSplash) return null;

  return (
    <SplashScreen
      onComplete={handleSplashComplete}
    />
  );
}
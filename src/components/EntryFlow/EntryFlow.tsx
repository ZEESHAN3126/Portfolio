"use client";

import { useState } from "react";

import { SplashGate } from "@/components/sections/SplashScreen/SplashGate";
import WhoIsWatching from "@/components/sections/WhosWatching";

import Hero from "@/components/sections/Hero";
import ContinueWatching from "@/components/sections/ContinueWatching";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Contact from "@/components/sections/Contact";

import { usePersona } from "@/context/PersonaContext";

export default function EntryFlow() {
  const { persona } = usePersona();

  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <SplashGate
        onComplete={() => setShowSplash(false)}
      />
    );
  }

  if (!persona) {
    return <WhoIsWatching />;
  }

  return (
    <main className="min-h-screen bg-[#141414]">

      <Hero />

      <ContinueWatching />

      <FeaturedProjects />

      <Contact />

    </main>
  );
}
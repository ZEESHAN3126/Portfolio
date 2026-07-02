"use client";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroButtons from "./HeroButtons";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen overflow-hidden bg-[#141414]"
    >
      <HeroBackground />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-8 lg:px-16">
          <div className="max-w-2xl">

            <HeroContent />

            <HeroButtons />

          </div>
        </div>
      </div>
    </section>
  );
}
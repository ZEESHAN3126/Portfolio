"use client";

import { motion } from "framer-motion";

import { usePersona } from "@/context/PersonaContext";
import { heroContent } from "@/data/heroContent";

export default function HeroContent() {
  const { persona } = usePersona();

  // Fallback to Founder if somehow no persona exists.
  const content = heroContent[persona ?? "founder"];

  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="max-w-2xl"
    >
      <span className="mb-5 inline-flex rounded-full border border-red-700/30 bg-red-700/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#E50914]">
        {content.badge}
      </span>

      <h1 className="text-5xl font-black uppercase leading-[0.95] text-white md:text-7xl lg:text-8xl">
        {content.title}
      </h1>

      <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-300">
        {content.description}
      </p>
    </motion.div>
  );
}
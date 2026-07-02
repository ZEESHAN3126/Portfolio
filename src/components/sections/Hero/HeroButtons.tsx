"use client";

import { motion } from "framer-motion";
import { Info, Play } from "lucide-react";

import { usePersona } from "@/context/PersonaContext";
import { heroContent } from "@/data/heroContent";

export default function HeroButtons() {
  const { persona } = usePersona();

  const content = heroContent[persona ?? "founder"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.35,
        duration: 0.7,
      }}
      className="mt-10 flex flex-wrap gap-4"
    >
      <button
        className="
          group
          flex
          items-center
          gap-3
          rounded-md
          bg-white
          px-8
          py-3.5
          text-lg
          font-bold
          text-black
          transition-all
          duration-300
          hover:scale-105
          hover:bg-zinc-200
        "
      >
        <Play
          size={22}
          className="fill-black transition-transform duration-300 group-hover:scale-110"
        />

        {content.primaryButton}
      </button>

      <button
        className="
          group
          flex
          items-center
          gap-3
          rounded-md
          bg-white/20
          px-8
          py-3.5
          text-lg
          font-bold
          text-white
          backdrop-blur-md
          transition-all
          duration-300
          hover:scale-105
          hover:bg-white/30
        "
      >
        <Info
          size={22}
          className="transition-transform duration-300 group-hover:rotate-12"
        />

        {content.secondaryButton}
      </button>
    </motion.div>
  );
}
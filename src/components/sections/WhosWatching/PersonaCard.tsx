"use client";

import { motion } from "framer-motion";
import { Persona } from "@/context/PersonaContext";

interface PersonaCardProps {
  id: Persona;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  delay?: number;
  onSelect: (persona: Persona) => void;
}

export default function PersonaCard({
  id,
  title,
  subtitle,
  description,
  accent,
  delay = 0,
  onSelect,
}: PersonaCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay,
      }}
      whileHover={{
        scale: 1.04,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={() => onSelect(id)}
      className="group w-[250px] rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05]"
    >
      <div
        className="mb-6 h-20 w-20 rounded-xl"
        style={{
          background: accent,
          opacity: 0.9,
        }}
      />

      <h2 className="mb-2 text-2xl font-semibold text-white">
        {title}
      </h2>

      <p className="mb-4 text-sm text-gray-400">
        {subtitle}
      </p>

      <p className="text-sm leading-6 text-gray-500">
        {description}
      </p>
    </motion.button>
  );
}
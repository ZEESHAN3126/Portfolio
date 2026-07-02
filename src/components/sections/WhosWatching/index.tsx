"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { usePersona, type Persona } from "@/context/PersonaContext";
import { personas } from "@/data/personas";
import PersonaCard from "./PersonaCard";

interface WhoIsWatchingProps {
  onComplete?: () => void;
}

export default function WhoIsWatching({
  onComplete,
}: WhoIsWatchingProps) {
  const { setPersona } = usePersona();

  const [closing, setClosing] = useState(false);

  const handleSelect = (persona: Persona) => {
    setPersona(persona);

    setClosing(true);

    setTimeout(() => {
      onComplete?.();
    }, 600);
  };

  return (
    <AnimatePresence>
      {!closing && (
        <motion.section
          className="fixed inset-0 z-[9997] flex flex-col items-center justify-center bg-[#141414] px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center text-5xl font-bold tracking-wide text-white"
          >
            Who&apos;s Watching?
          </motion.h1>

          <div className="flex flex-wrap justify-center gap-8">
            {personas.map((persona, index) => (
              <PersonaCard
                key={persona.id}
                id={persona.id}
                title={persona.title}
                subtitle={persona.subtitle}
                description={persona.description}
                accent={persona.accent}
                delay={index * 0.1}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
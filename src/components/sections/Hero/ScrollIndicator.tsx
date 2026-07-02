"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 1.2,
        duration: 0.8,
      }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
    >
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.35em] text-zinc-500">
          Scroll
        </span>

        <div className="flex h-12 w-7 justify-center rounded-full border border-white/20">
          <motion.div
            animate={{
              y: [4, 18, 4],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
            }}
            className="mt-2 h-2 w-2 rounded-full bg-[#C8102E]"
          />
        </div>

        <ChevronDown
          size={18}
          className="text-zinc-500"
        />
      </motion.div>
    </motion.div>
  );
}
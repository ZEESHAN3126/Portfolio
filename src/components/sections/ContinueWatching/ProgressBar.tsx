"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({
  progress,
}: ProgressBarProps) {
  return (
    <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${progress}%` }}
        viewport={{ once: true }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
        }}
        className="h-full rounded-full bg-[#E50914]"
      />
    </div>
  );
}
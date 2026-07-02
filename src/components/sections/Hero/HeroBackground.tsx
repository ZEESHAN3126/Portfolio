"use client";

import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      {/* Base Background */}
      <div className="absolute inset-0 bg-[#141414]" />

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=80')",
        }}
      />

      {/* Netflix Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent" />

      {/* Left Gradient */}
      <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#141414] via-[#141414]/80 to-transparent" />

      {/* Cinematic Glow */}
      <motion.div
        animate={{
          opacity: [0.25, 0.45, 0.25],
          scale: [1, 1.08, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[20%]
          top-[35%]
          h-[700px]
          w-[700px]
          rounded-full
          bg-[#C8102E]/20
          blur-[160px]
        "
      />

      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_220px_rgba(0,0,0,0.95)]" />

    </div>
  );
}
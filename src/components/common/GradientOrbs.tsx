import { motion } from "framer-motion";

export function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Orb 1 - Top right */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.18] dark:opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, rgba(251, 146, 60, 0.7) 0%, rgba(249, 115, 22, 0.4) 50%, transparent 100%)",
          filter: "blur(150px)",
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 2 - Bottom left */}
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] rounded-full opacity-[0.15] dark:opacity-[0.1]"
        style={{
          background: "radial-gradient(circle, rgba(249, 115, 22, 0.6) 0%, rgba(234, 88, 12, 0.3) 50%, transparent 100%)",
          filter: "blur(160px)",
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 3 - Center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.12] dark:opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, rgba(253, 186, 116, 0.5) 0%, rgba(251, 146, 60, 0.3) 50%, transparent 100%)",
          filter: "blur(170px)",
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}


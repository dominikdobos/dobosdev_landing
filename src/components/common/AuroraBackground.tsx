import { m } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Aurora orb 1 */}
      <m.div
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.35] dark:opacity-[0.25]"
        style={{
          background: "radial-gradient(circle, rgba(251, 146, 60, 0.5) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Aurora orb 2 */}
      <m.div
        className="absolute top-1/3 -right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.32] dark:opacity-[0.22]"
        style={{
          background: "radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, transparent 70%)",
          filter: "blur(130px)",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Aurora orb 3 */}
      <m.div
        className="absolute bottom-1/4 left-1/3 w-[550px] h-[550px] rounded-full opacity-[0.3] dark:opacity-[0.2]"
        style={{
          background: "radial-gradient(circle, rgba(253, 186, 116, 0.4) 0%, transparent 70%)",
          filter: "blur(140px)",
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, -60, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}


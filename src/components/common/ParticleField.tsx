import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
}

interface ParticleFieldProps {
  particleCount?: number;
}

export function ParticleField({ particleCount = 30 }: ParticleFieldProps) {
  const shouldReduceMotion = useReducedMotion();
  const [particles] = useState<Particle[]>(() => 
    Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
  );

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg className="w-full h-full">
        {particles.map((particle) => (
          <motion.circle
            key={particle.id}
            cx={`${particle.x}%`}
            cy={`${particle.y}%`}
            r="2"
            fill="currentColor"
            className="text-primary"
            animate={{
              cx: [`${particle.x}%`, `${(particle.x + 10) % 100}%`, `${particle.x}%`],
              cy: [`${particle.y}%`, `${(particle.y + 10) % 100}%`, `${particle.y}%`],
            }}
            transition={{
              duration: Math.random() * 30 + 30,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}


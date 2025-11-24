import { useEffect, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';

interface Particle {
  id: number;
  x: number; // pixels
  y: number; // pixels from top of document
  size: number; // 1-2px (smaller)
  delay: number;
  duration: number;
}

export function NaturalParticles() {
  const shouldReduceMotion = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const initParticles = () => {
      const generated: Particle[] = [];
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      // 30 particles in hero section area
      for (let i = 0; i < 30; i++) {
        generated.push({
          id: i,
          x: Math.random() * vw,
          y: Math.random() * vh * 1.2, // Hero section height
          size: Math.random() * 1 + 2, // 2-3px (more visible)
          delay: Math.random() * 10,
          duration: Math.random() * 40 + 50, // 50-90 seconds (slower)
        });
      }
      setParticles(generated);
    };

    // Initialize after DOM is ready
    setTimeout(initParticles, 100);
    window.addEventListener('resize', initParticles);
    return () => window.removeEventListener('resize', initParticles);
  }, []);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ height: '100vh' }}>
      {particles.map((particle) => (
        <m.div
          key={particle.id}
          className="absolute rounded-full bg-primary dark:opacity-20"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            x: [0, Math.random() * 20 - 10, 0],
            y: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}


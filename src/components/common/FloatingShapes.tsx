import { m, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Shape {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  type: 'circle' | 'square' | 'triangle';
}

interface FloatingShapesProps {
  count?: number;
  color?: string;
  opacity?: number;
}

export function FloatingShapes({ count = 5, color = 'primary', opacity = 0.1 }: FloatingShapesProps) {
  const shouldReduceMotion = useReducedMotion();
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const generatedShapes: Shape[] = [];
    for (let i = 0; i < count; i++) {
      generatedShapes.push({
        id: i,
        size: Math.random() * 100 + 50, // 50-150px
        x: Math.random() * 100, // 0-100%
        y: Math.random() * 100, // 0-100%
        duration: Math.random() * 20 + 20, // 20-40s
        delay: Math.random() * 5, // 0-5s delay
        type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
      });
    }
    setShapes(generatedShapes);
  }, [count]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <m.div
          key={shape.id}
          className={`absolute bg-${color}/[${opacity}] blur-2xl`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            borderRadius: shape.type === 'circle' ? '50%' : shape.type === 'square' ? '10%' : '0',
            clipPath: shape.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : undefined,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, Math.random() * 0.5 + 0.8, 1],
            rotate: [0, Math.random() * 360, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}


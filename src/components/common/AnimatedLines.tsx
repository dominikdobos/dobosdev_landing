import { m, useReducedMotion } from 'framer-motion';

interface AnimatedLinesProps {
  lineCount?: number;
  orientation?: 'horizontal' | 'vertical' | 'diagonal';
}

export function AnimatedLines({ lineCount = 5, orientation = 'diagonal' }: AnimatedLinesProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return null;
  }

  const lines = Array.from({ length: lineCount });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {lines.map((_, i) => {
          const offset = (100 / lineCount) * i;
          return (
            <m.line
              key={i}
              x1={orientation === 'vertical' ? `${offset}%` : '0%'}
              y1={orientation === 'horizontal' ? `${offset}%` : '0%'}
              x2={orientation === 'vertical' ? `${offset}%` : '100%'}
              y2={orientation === 'horizontal' ? `${offset}%` : '100%'}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              animate={{
                opacity: [0.2, 0.5, 0.2],
                strokeWidth: [1, 3, 1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}


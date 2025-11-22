"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface HexagonBackgroundProps {
  hexagonSize?: number;
  hexagonMargin?: number;
  hexagonProps?: React.ComponentProps<"div">;
  children?: React.ReactNode;
  className?: string;
}

export function HexagonBackground({
  hexagonSize = 75,
  hexagonMargin = 3,
  hexagonProps,
  children,
  className,
}: HexagonBackgroundProps) {
  const [dimensions, setDimensions] = useState({ rows: 0, cols: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateGrid = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;

        const effectiveSize = hexagonSize + hexagonMargin;
        const verticalSpacing = effectiveSize * 0.8;

        const cols = Math.ceil(width / effectiveSize) + 2;
        const rows = Math.ceil(height / verticalSpacing) + 2;

        setDimensions({ rows, cols });
      }
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, [hexagonSize, hexagonMargin]);

  const hexagons = [];
  for (let row = 0; row < dimensions.rows; row++) {
    for (let col = 0; col < dimensions.cols; col++) {
      const effectiveSize = hexagonSize + hexagonMargin;
      const verticalSpacing = effectiveSize * 0.8;

      const x = col * effectiveSize + (row % 2 === 1 ? effectiveSize / 2 : 0);
      const y = row * verticalSpacing;

      hexagons.push(
        <div
          key={`hex-${row}-${col}`}
          {...hexagonProps}
          className={cn(
            "absolute transition-all duration-300 ease-out pointer-events-auto",
            "bg-neutral-200/60 dark:bg-neutral-700/40",
            "hover:bg-neutral-400 dark:hover:bg-neutral-600/60",
            hexagonProps?.className
          )}
          style={{
            width: `${hexagonSize}px`,
            height: `${hexagonSize}px`,
            left: `${x}px`,
            top: `${y}px`,
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            ...hexagonProps?.style,
          }}
        />
      );
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 w-full h-full overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0">{hexagons}</div>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

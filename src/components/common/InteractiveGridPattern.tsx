"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * InteractiveGridPattern is a component that renders a grid pattern with interactive squares.
 *
 * @param width - The width of each square.
 * @param height - The height of each square.
 * @param squares - The number of squares in the grid. The first element is the number of horizontal squares, and the second element is the number of vertical squares.
 * @param className - The class name of the grid.
 * @param squaresClassName - The class name of the squares.
 */
interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number]; // [horizontal, vertical]
  className?: string;
  squaresClassName?: string;
}

/**
 * The InteractiveGridPattern component.
 *
 * @see InteractiveGridPatternProps for the props interface.
 * @returns A React component.
 */
export const InteractiveGridPattern = React.memo(function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares;

  return (
    <svg
      className={cn("absolute inset-0 h-full w-full", className)}
      style={{ opacity: 1 }}
      {...props}
    >
      {/* If squares contains -1 (mobile flag), render a single static path grid */}
      {horizontal === -1 ? (
        <pattern
          id="grid-pattern-mobile"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${width} 0 L 0 0 0 ${height}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className={cn(
              "stroke-gray-400/30 dark:stroke-gray-500/30",
              squaresClassName
            )}
          />
        </pattern>
      ) : (
        Array.from({ length: horizontal * vertical }).map((_, index) => {
          const col = index % horizontal;
          const row = Math.floor(index / horizontal);
          const x = `${(col / horizontal) * 100}%`;
          const y = `${(row / vertical) * 100}%`;
          const widthPercent = `${(1 / horizontal) * 100}%`;
          const heightPercent = `${(1 / vertical) * 100}%`;

          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={widthPercent}
              height={heightPercent}
              fill="transparent"
              stroke="currentColor"
              strokeWidth="0.6"
              className={cn(
                "stroke-gray-400/30 dark:stroke-gray-500/30",
                "transition-colors duration-1000 ease-in-out hover:duration-100",
                "hover:fill-primary/20 hover:stroke-primary",
                squaresClassName
              )}
            />
          );
        })
      )}
      {horizontal === -1 && <rect width="100%" height="100%" fill="url(#grid-pattern-mobile)" />}
    </svg>
  );
});

export type { InteractiveGridPatternProps };

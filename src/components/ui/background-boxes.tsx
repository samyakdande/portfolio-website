"use client";
import React from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  // Reduced row/col count to prevent catastrophic browser lag (original 150x100 = 15k DOM nodes)
  // Adjusted scale to cover the screen with fewer boxes
  const rows = new Array(60).fill(1);
  const cols = new Array(40).fill(1);
  
  const colors = [
    "rgba(255, 255, 255, 0.15)",
    "rgba(255, 255, 255, 0.10)",
    "rgba(255, 255, 255, 0.20)",
    "rgba(200, 200, 200, 0.15)",
    "rgba(150, 150, 150, 0.10)",
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      backgroundColor: getRandomColor(),
      duration: 0,
      overwrite: true,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      backgroundColor: "transparent",
      duration: 2,
    });
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(1.5) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <div
          key={`row` + i}
          className="w-16 h-8 border-l border-white/10 relative"
        >
          {cols.map((_, j) => (
            <div
              key={`col` + j}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-16 h-8 border-r border-t border-white/10 relative cursor-crosshair transition-colors duration-500"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-white/10 stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);

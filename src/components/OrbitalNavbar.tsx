"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

// Define the orbits for each navigation item
const NAV_ITEMS = [
  { label: "Home", href: "#home", rx: 160, ry: 40, speed: 0.0008, color: "#3B82F6" }, // Inner-most
  { label: "About", href: "#about", rx: 240, ry: 60, speed: 0.0006, color: "#06B6D4" },
  { label: "Projects", href: "#projects", rx: 320, ry: 80, speed: 0.0005, color: "#7C3AED" },
  { label: "Skills", href: "#skills", rx: 400, ry: 100, speed: 0.0004, color: "#ec4899" },
  { label: "Contact", href: "#contact", rx: 480, ry: 120, speed: 0.0003, color: "#eab308" }, // Outer-most
];

export const OrbitalNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timeRef = useRef(0);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const onTick = (time: number, deltaTime: number, frame: number) => {
      if (!isHovered) {
        timeRef.current += deltaTime;
      }

      const t = timeRef.current;

      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        
        const item = NAV_ITEMS[i];
        const phaseOffset = i * ((Math.PI * 2) / NAV_ITEMS.length) * 2.5; 
        const currentAngle = (t * item.speed) + phaseOffset;

        const x = Math.cos(currentAngle) * item.rx;
        const y = Math.sin(currentAngle) * item.ry;
        
        const depth = y / item.ry;
        
        const scale = 1 + depth * 0.3;
        const opacity = 0.4 + ((depth + 1) / 2) * 0.6;
        const zIndex = Math.round(depth * 10) + 20;

        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        el.style.opacity = opacity.toString();
        el.style.zIndex = zIndex.toString();
      });
    };

    gsap.ticker.add(onTick);
    return () => {
      gsap.ticker.remove(onTick);
    };
  }, [isHovered]);

  return (
    <div 
      className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredIndex(null);
      }}
    >
      {/* Container must have size 0, everything absolute relative to center */}
      <div className="relative w-0 h-0 flex items-center justify-center">

        {/* The Central Core / Station */}
        <div className="absolute flex items-center justify-center z-10">
          <div className="w-16 h-16 rounded-full glass-card border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-md">
            {/* Inner glowing energy core */}
            <div className={cn(
              "w-4 h-4 rounded-full bg-white transition-all duration-700",
              isHovered ? "shadow-[0_0_40px_20px_rgba(255,255,255,0.2)] scale-110" : "shadow-[0_0_20px_5px_rgba(255,255,255,0.1)]"
            )} />
          </div>
        </div>

        {/* Render the visible orbital flight paths (SVG Ellipses) */}
        <svg 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          width="1200" 
          height="400" 
          viewBox="0 0 1200 400"
        >
          {NAV_ITEMS.map((item, i) => (
            <ellipse
              key={`orbit-${i}`}
              cx="600"
              cy="200"
              rx={item.rx}
              ry={item.ry}
              fill="none"
              stroke={hoveredIndex === i ? item.color : "rgba(255,255,255,0.05)"}
              strokeWidth={hoveredIndex === i ? "1.5" : "1"}
              strokeDasharray="4 6"
              className="transition-all duration-500"
            />
          ))}
        </svg>

        {/* Orbiting Navigation Items (The "Planets/Aircrafts") */}
        {NAV_ITEMS.map((item, i) => {
          const isFaded = hoveredIndex !== null && hoveredIndex !== i;
          
          return (
            <a
              key={item.label}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              href={item.href}
              onMouseEnter={() => setHoveredIndex(i)}
              className={cn(
                "absolute left-0 top-0 flex items-center gap-3 pointer-events-auto group",
                "px-3 py-1.5 transition-all duration-500",
                isFaded ? "opacity-20 blur-[1px]" : ""
              )}
            >
              {/* Aircraft/Planet indicator */}
              <div className="relative flex items-center justify-center">
                <div 
                  className="w-2 h-2 rounded-full bg-white/40 transition-all duration-300 group-hover:scale-150"
                  style={{ backgroundColor: hoveredIndex === i ? item.color : undefined }}
                />
                {/* Glowing ring on hover */}
                <div 
                  className="absolute inset-0 rounded-full scale-0 opacity-0 group-hover:scale-[2.5] group-hover:opacity-100 transition-all duration-500"
                  style={{ border: `1px solid ${item.color}`, boxShadow: `0 0 10px ${item.color}` }}
                />
              </div>

              {/* Minimalist Premium Font */}
              <span 
                className={cn(
                  "font-hud font-medium tracking-[0.2em] text-[15px] uppercase text-white/70",
                  "transition-all duration-300 drop-shadow-md",
                  hoveredIndex === i ? "text-white scale-110 font-semibold" : ""
                )}
                style={{ textShadow: hoveredIndex === i ? `0 0 12px ${item.color}` : "none" }}
              >
                {item.label}
              </span>
            </a>
          );
        })}
        
      </div>
    </div>
  );
};

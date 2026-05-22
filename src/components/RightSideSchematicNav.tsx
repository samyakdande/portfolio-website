"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "HOME", id: "01", y: 15, x: 20, angle: -90 },
  { label: "ABOUT", id: "02", y: 29, x: 45, angle: -108 },
  { label: "SKILLS", id: "03", y: 43, x: 60, angle: -126 },
  { label: "PROJECTS", id: "04", y: 57, x: 60, angle: -144 },
  { label: "EXPERIENCE", id: "05", y: 71, x: 45, angle: -162 },
  { label: "CONTACT", id: "06", y: 85, x: 20, angle: -180 },
];

export const RightSideSchematicNav = () => {
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" } // Triggers when section hits the center of the viewport
    );

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.label.toLowerCase());
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ======================================================== */}
      {/* DESKTOP HOVER-DISCOVERY SYSTEM */}
      {/* ======================================================== */}
      <nav 
        className="fixed right-0 top-0 h-screen w-48 z-50 overflow-hidden hidden md:block"
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => { setIsNavHovered(false); setHoveredIndex(null); }}
      >
        {/* Invisible hit area to trigger hover */}
        <div className="absolute inset-0 cursor-crosshair" />

        {/* Cinematic ambient glass backdrop (only visible on hover) */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-l from-[#050505]/90 via-[#0a0a0a]/50 to-transparent transition-opacity duration-1000 ease-out pointer-events-none -z-10",
            isNavHovered ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Fragmented Orbital Arcs - Static but dynamic lighting */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 192 800" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="orbit-glow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(6,182,212,0)" />
              <stop offset="20%" stopColor={isNavHovered ? "rgba(124,58,237,0.35)" : "rgba(255,255,255,0.04)"} />
              <stop offset="80%" stopColor={isNavHovered ? "rgba(6,182,212,0.25)" : "rgba(255,255,255,0.04)"} />
              <stop offset="100%" stopColor="rgba(6,182,212,0)" />
            </linearGradient>
            
            <linearGradient id="active-pulse" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(124,58,237,0)" />
              <stop offset="50%" stopColor="rgba(124,58,237,0.6)" />
              <stop offset="100%" stopColor="rgba(124,58,237,0)" />
            </linearGradient>
          </defs>

          {/* Base dim orbit (Outer) */}
          <path 
            d="M 192 0 Q 30 400 192 800" 
            fill="none" 
            stroke="url(#orbit-glow)" 
            strokeWidth="1" 
            className="transition-all duration-1000 ease-out"
          />
          
          {/* Fragmented schematic inner orbit */}
          <path 
            d="M 192 0 Q 50 400 192 800" 
            fill="none" 
            stroke={isNavHovered ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.02)"}
            strokeWidth="1.5" 
            strokeDasharray="4 8 20 12 1 4"
            className="transition-all duration-1000 ease-out"
          />

          {/* Signal Pulse Line (animates softly up and down when hovered) */}
          <path 
            d="M 192 0 Q 30 400 192 800" 
            fill="none" 
            stroke="url(#active-pulse)" 
            strokeWidth="2" 
            className={cn(
              "transition-opacity duration-1000 ease-out",
              isNavHovered ? "opacity-100 animate-[pulse_4s_ease-in-out_infinite]" : "opacity-0"
            )}
          />
        </svg>

        {/* Navigation Nodes */}
        {NAV_ITEMS.map((item, i) => {
          const isHovered = hoveredIndex === i;
          const isActive = activeSection === item.label.toLowerCase() || (activeSection === "" && i === 0);

          return (
            <div
              key={item.label}
              className={cn(
                "absolute flex items-center gap-4 transition-all duration-700 ease-out pointer-events-auto group",
                !isNavHovered 
                  ? (isActive ? "opacity-40 translate-x-4" : "opacity-0 translate-x-8") // Hidden state
                  : (isActive || isHovered ? "opacity-100 translate-x-0" : "opacity-40 translate-x-2") // Hovered state
              )}
              style={{
                top: `${item.y}%`,
                right: `${item.x}px`,
                transform: `translateY(-50%) ${isNavHovered && isHovered ? 'translateX(-8px)' : ''}`
              }}
              onMouseEnter={() => setHoveredIndex(i)}
            >
              {/* The Label */}
              <div className={cn(
                "flex flex-col items-end mr-2 transition-all duration-500",
                !isNavHovered ? "opacity-0 translate-x-4 blur-sm" : "opacity-100 translate-x-0 blur-0"
              )}>
                <span className={cn(
                  "font-hud text-[9px] tracking-[0.3em] mb-[-4px] transition-colors duration-500",
                  isActive || isHovered ? "text-neon-purple font-bold drop-shadow-[0_0_8px_rgba(124,58,237,0.8)]" : "text-white/20"
                )}>
                  {item.id}
                </span>
                <a 
                  href={`#${item.label.toLowerCase()}`}
                  className={cn(
                    "font-heading font-light tracking-[0.3em] text-xs transition-all duration-500 drop-shadow-md cursor-pointer whitespace-nowrap",
                    isActive || isHovered ? "text-white scale-105 font-medium" : "text-white/40"
                  )}
                  style={{
                    textShadow: isActive || isHovered ? "0 0 15px rgba(6,182,212,0.8)" : "none"
                  }}
                >
                  {item.label}_
                </a>
              </div>

              {/* Connecting line to the node */}
              <div 
                className={cn(
                  "h-[1px] transition-all duration-700 ease-out",
                  !isNavHovered 
                    ? "w-2 bg-white/10" 
                    : (isHovered ? "w-8 bg-neon-cyan shadow-[0_0_15px_#06b6d4]" : (isActive ? "w-6 bg-neon-purple shadow-[0_0_10px_#7c3aed]" : "w-4 bg-white/10"))
                )}
              />

              {/* The Node (Planet) */}
              <div 
                className="relative flex items-center justify-center"
              >
                <div 
                  className={cn(
                    "w-1.5 h-1.5 rounded-full border transition-all duration-700 ease-out z-10",
                    !isNavHovered 
                      ? (isActive ? "bg-neon-cyan/50 border-neon-cyan scale-100" : "bg-white/10 border-transparent scale-50")
                      : (isHovered 
                          ? "bg-neon-cyan border-neon-cyan shadow-[0_0_20px_#06b6d4] scale-[2]" 
                          : (isActive ? "bg-neon-purple border-neon-purple shadow-[0_0_15px_#7c3aed] scale-150" : "bg-[#050505] border-white/20 scale-100"))
                  )}
                />
                
                {/* Expanding Orbit Rings on Active (Only when hovered nav system) */}
                {isActive && isNavHovered && !isHovered && (
                  <>
                    <div className="absolute inset-0 rounded-full border border-neon-purple/50 animate-[ping_3s_ease-out_infinite]" />
                    <div className="absolute inset-0 rounded-full border border-neon-cyan/20 animate-[ping_4s_ease-out_infinite_1s]" />
                  </>
                )}

                {/* Hover Ripple */}
                {isHovered && isNavHovered && (
                  <div className="absolute inset-0 rounded-full border border-neon-cyan animate-ping opacity-75" />
                )}
              </div>
            </div>
          );
        })}
      </nav>

      {/* ======================================================== */}
      {/* MOBILE RADIAL NAVIGATION SYSTEM */}
      {/* ======================================================== */}
      <div className="fixed bottom-6 right-6 z-50 block md:hidden">
        {/* Mobile overlay backdrop */}
        <div 
          className={cn(
            "fixed inset-0 bg-[#050505]/80 backdrop-blur-sm -z-10 transition-opacity duration-300",
            isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsMobileOpen(false)}
        />
        
        {/* Radial Menu Items */}
        {NAV_ITEMS.map((item, idx) => {
          const isActive = activeSection === item.label.toLowerCase() || (activeSection === "" && idx === 0);
          const radius = 130; // Orbit radius
          const rad = (item.angle * Math.PI) / 180;
          const x = isMobileOpen ? Math.cos(rad) * radius : 0;
          const y = isMobileOpen ? Math.sin(rad) * radius : 0;
          const scale = isMobileOpen ? 1 : 0.5;
          const opacity = isMobileOpen ? 1 : 0;

          return (
            <a
              key={item.label}
              href={`#${item.label.toLowerCase()}`}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "absolute top-1/2 left-1/2 flex flex-col items-center justify-center gap-2 group transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]",
                !isMobileOpen && "pointer-events-none"
              )}
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
                opacity: opacity,
                transitionDelay: `${isMobileOpen ? idx * 50 : 0}ms`
              }}
            >
              <div className={cn(
                "w-12 h-12 rounded-full border flex items-center justify-center bg-[#0a0a0a] transition-colors",
                isActive ? "border-neon-purple shadow-[0_0_15px_rgba(124,58,237,0.5)]" : "border-white/20"
              )}>
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  isActive ? "bg-neon-cyan shadow-[0_0_10px_#06b6d4]" : "bg-white/30"
                )} />
              </div>
              <span className={cn(
                "font-heading text-[10px] tracking-widest whitespace-nowrap px-2 py-1 rounded bg-[#050505]/80 border border-white/5",
                isActive ? "text-neon-cyan" : "text-white/60"
              )}>
                {item.label}_
              </span>
            </a>
          );
        })}

        {/* Floating Action Button (Neural Node) */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="relative w-14 h-14 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] focus:outline-none z-50"
        >
          {/* Active section tracker pulse on the button itself */}
          <div className="absolute inset-0 rounded-full border border-neon-cyan/30 animate-[ping_4s_ease-out_infinite]" />
          <div className={cn(
            "w-4 h-4 rounded-full transition-all duration-500",
            isMobileOpen ? "bg-neon-purple scale-50 shadow-[0_0_15px_#7c3aed]" : "bg-neon-cyan scale-100 shadow-[0_0_15px_#06b6d4]"
          )} />
        </button>
      </div>
    </>
  );
};

"use client";

import React from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

// Base64 encoded SVG
const LOGO_BASE64 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODQiIGhlaWdodD0iODQiIHZpZXdCb3g9IjAgMCA4NCA4NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMgMzJDMTMgMjAuOTU0MyAyMS45NTQzIDEyIDMzIDEyQzQ0LjA0NTcgMTIgNTMgMjAuOTU0MyA1MyAzMkM1MyA0My4wNDU3IDQ0LjUgNDcuNSAzMyA1Mkg1M0M1MyA2My4wNDU3IDQ0LjA0NTcgNzIgMzMgNzJDMjEuOTU0MyA3MiAxMyA2My4wNDU3IDEzIDUyQzEzIDQwLjk1NDMgMjIuNSAzNCAzMyAzMkgxM1oiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTTUzIDcyQzY0LjczMjQgNjcuMDk3NyA3MyA1NS41MTE3IDczIDQyQzczIDI4LjQ4ODMgNjQuNzMyNCAxNi45MDIzIDUzIDEyVjcyWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=";

// Define mask styles
const maskStyle = {
  WebkitMaskImage: `url('${LOGO_BASE64}')`,
  WebkitMaskSize: '100vw',
  WebkitMaskPosition: 'center',
  WebkitMaskRepeat: 'no-repeat',
  maskImage: `url('${LOGO_BASE64}')`,
  maskSize: '100vw',
  maskPosition: 'center',
  maskRepeat: 'no-repeat',
} as const;

// Define grid config
const GRID_CONFIG = {
  background: {
    color: "#7C3AED", // Neon purple
    maxOpacity: 0.5, // Increased for glittering effect
    flickerChance: 0.8, // High flicker chance for glittering
    squareSize: 4,
    gridGap: 4,
  },
  logo: {
    color: "#7C3AED", // Neon purple
    maxOpacity: 0.80, // Toned down from 0.95
    flickerChance: 0.25,
    squareSize: 3,
    gridGap: 6,
  },
} as const;

export const FlickeringGridDemo = () => {
  return (
    <div className="fixed inset-0 w-full h-screen flex justify-center items-center overflow-hidden z-0 pointer-events-none bg-[#050505]">
      {/* Background grid with glittering purple glow */}
      <FlickeringGrid
        className={`absolute inset-0 z-0 [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)] motion-safe:animate-pulse drop-shadow-[0_0_12px_rgba(124,58,237,0.6)]`}
        {...GRID_CONFIG.background}
      />
      
      {/* Logo grid with moderate purple glow */}
      <div 
        className="absolute inset-0 z-0 translate-y-[2vh] motion-safe:animate-fade-in drop-shadow-[0_0_15px_rgba(124,58,237,0.6)]" 
        style={{
          ...maskStyle,
          animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      >
        <FlickeringGrid {...GRID_CONFIG.logo} />
      </div>
    </div>
  );
};

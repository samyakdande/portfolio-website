"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ScrambleText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    // Start empty
    setDisplayText("");
    const chars = '!<>-_\\/[]{}—=+*^?#01X';
    let iteration = 0;
    
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(prev => 
          text.split('').map((char, index) => {
            if(char === ' ') return ' ';
            if(index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );
        
        if(iteration >= text.length) clearInterval(interval);
        
        iteration += 1 / 3;
      }, 40);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return <>{displayText}</>;
};

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    // Parallax text
    gsap.to(".monolith-text", {
      y: 200,
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Intense erratic RGB glitch
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.85) {
        gsap.to(".glitch-layer", {
          x: () => gsap.utils.random(-30, 30),
          y: () => gsap.utils.random(-10, 10),
          scale: () => gsap.utils.random(0.95, 1.05),
          opacity: () => gsap.utils.random(0.6, 1),
          duration: 0.05,
          yoyo: true,
          repeat: 5,
          onComplete: () => {
            gsap.set(".glitch-layer", { x: 0, y: 0, scale: 1, opacity: 0 });
          }
        });
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, { scope: containerRef });

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-transparent cursor-none"
    >
      {/* Harsh Spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-screen z-0"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 100%)`
        }}
      />
      
      {/* Scanlines / Static Noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat z-20" />
      <div className="absolute inset-0 pointer-events-none z-20 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)" }} />

      <div className="relative z-10 flex flex-col items-center justify-center text-center w-[90%] max-w-5xl mx-auto px-6 py-16 md:px-12 md:py-20 rounded-[2rem] border border-white/[0.05] bg-black/30 backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,0.8)]">
        {/* Main Monolith Text */}
        <h1 className="monolith-text text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter text-white uppercase leading-[0.8] select-none relative group">
          <ScrambleText text="Architecting" delay={0.5} />
          {/* Aggressive RGB Glitch Clones */}
          <span className="glitch-layer absolute top-0 left-0 w-full text-red-600 mix-blend-screen opacity-0 pointer-events-none">NEURAL</span>
          <span className="glitch-layer absolute top-0 left-0 w-full text-blue-600 mix-blend-screen opacity-0 pointer-events-none translate-x-1">NEURAL</span>
        </h1>
        
        <h1 className="monolith-text text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter text-stone-500 uppercase leading-[0.8] select-none relative group mt-2 md:mt-0">
          <ScrambleText text="Intelligence" delay={1.8} />
          {/* Aggressive RGB Glitch Clones */}
          <span className="glitch-layer absolute top-0 left-0 w-full text-red-600 mix-blend-screen opacity-0 pointer-events-none">ARCHITECT</span>
          <span className="glitch-layer absolute top-0 left-0 w-full text-blue-600 mix-blend-screen opacity-0 pointer-events-none -translate-x-1">ARCHITECT</span>
        </h1>
        
        {/* Terminal & Description Subtext */}
        <div className="monolith-text mt-12 md:mt-16 max-w-2xl flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs sm:text-sm font-bold tracking-[0.4em] text-white/50 uppercase">
              <ScrambleText text="Welcome to my digital canvas" delay={3.0} />
            </p>
          </div>

          <p className="text-xs sm:text-sm md:text-base font-medium tracking-wide text-stone-400 leading-relaxed border-t border-white/10 pt-6 px-4">
            <ScrambleText text="Engineering highly scalable AI systems, resilient data pipelines, and aggressive automation logic. Translating complex chaos into deterministic, high-performance architecture." delay={4.5} />
          </p>
        </div>
      </div>

      {/* Cybernetic Crosshair Cursor */}
      <div 
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-50 flex items-center justify-center transition-transform duration-75"
        style={{ transform: `translate(${mousePos.x - 12}px, ${mousePos.y - 12}px)` }}
      >
        <div className="absolute w-full h-[1px] bg-white/50 mix-blend-difference" />
        <div className="absolute h-full w-[1px] bg-white/50 mix-blend-difference" />
        <div className="absolute w-2 h-2 border border-red-500/50 rounded-full animate-ping" />
      </div>
    </section>
  );
};


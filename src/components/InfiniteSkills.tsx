"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SKILLS = [
  "AGENTIC AI", "LANGCHAIN", "RAG SYSTEMS", "DOCKER", "FASTAPI", 
  "ANDROID", "SUPABASE", "AUTOMATION", "LLM SYSTEMS", 
  "MACHINE LEARNING", "REALTIME SYSTEMS"
];

export const InfiniteSkills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Ultra-smooth, effortless, continuous cinematic scroll
    // No bounces, no springs, just an infinite flow
    gsap.to(".marquee-strip", {
      xPercent: -100,
      ease: "none",
      duration: 35,
      repeat: -1,
    });

    // Subtle atmospheric fade when scrolling past
    gsap.to(".skills-atmosphere", {
      opacity: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 10%",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="skills-atmosphere relative w-full py-16 md:py-24 bg-black z-20 overflow-hidden border-y border-white/20"
    >
      {/* Cinematic Fog Edges */}
      <div className="absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />
      
      {/* Infinite Scrolling Strip */}
      <div className="flex whitespace-nowrap overflow-visible opacity-90 relative z-10 w-max">
        
        {/* Copy 1 */}
        <div className="marquee-strip flex items-center gap-8 md:gap-12 pr-8 md:pr-12 w-max">
          {SKILLS.map((skill, idx) => (
            <div 
              key={`strip1-${idx}`} 
              className="flex items-center justify-center px-10 md:px-14 py-4 md:py-6 border border-white/[0.05] rounded-full bg-black/40 backdrop-blur-md shadow-xl"
            >
              <span className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-stone-300">
                {skill}
              </span>
            </div>
          ))}
        </div>

        {/* Copy 2 (For Seamless Loop) */}
        <div className="marquee-strip flex items-center gap-8 md:gap-12 pr-8 md:pr-12 w-max">
          {SKILLS.map((skill, idx) => (
            <div 
              key={`strip2-${idx}`} 
              className="flex items-center justify-center px-10 md:px-14 py-4 md:py-6 border border-white/[0.05] rounded-full bg-black/40 backdrop-blur-md shadow-xl"
            >
              <span className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-stone-300">
                {skill}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

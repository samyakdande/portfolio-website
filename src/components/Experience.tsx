"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    text: "Agilos.in",
    role: "AI Intern ·JAN-2026 to MAR-2026",
  },
  {
    text: "Intel Unnati",
    role: "Training Program Sept-2025 to JAN-2026",
  },
  {
    text: "I-Predict",
    role: "AI Strategist · APr-2026 - Ongoing",
  }
];

export const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".experience-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="experience" ref={containerRef} className="relative py-32 md:py-48 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <h2 className="experience-header text-sm md:text-base font-medium tracking-[0.3em] uppercase text-white/40 font-heading opacity-0">
          03. Experience
        </h2>
      </div>

      <div className="flex flex-col w-full max-w-[1400px] mx-auto">
        {experiences.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 py-12 md:py-16 border-b border-white/10 group cursor-default hover:bg-white/5 transition-colors duration-500 px-6 lg:px-12">
            <h3 className="text-4xl md:text-7xl font-light tracking-tighter text-white transition-all duration-500 group-hover:opacity-40 font-heading uppercase">
              {item.text}
            </h3>
            <p className="text-sm md:text-lg text-white/40 tracking-[0.2em] uppercase font-light transition-all duration-500 group-hover:opacity-100 group-hover:text-white">
              {item.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Award, ShieldCheck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const achievements = [
  "Finalist (Top 5), ACE National Hackathon (NMIMS)",
  "Completed Intel Unnati Training (OPEA-based RAG)",
  "Winner, University Debate Competition",
  "Runner-up, Marketing Campaign Challenge",
];

const certifications = [
"Ultimate RAG Bootcamp (LangChain, LangGraph, LangSmith)",
"Data Science & ML Bootcamp (Udemy)"
];

export const Achievements = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
      gsap.to(".achievement-item", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });
  }, { scope: containerRef });

  return (
    <section id="achievements" ref={containerRef} className="relative py-48 md:py-64 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24">
          
          {/* Achievements */}
          <div className="md:w-1/2 flex flex-col">
            <h2 className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-white/40 font-heading mb-16">
              05. Recognition
            </h2>
            <div className="flex flex-col border-t border-white/5">
              {achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="achievement-item py-8 border-b border-white/5 flex items-center justify-between group hover:bg-white/[0.02] transition-colors duration-500 opacity-0 translate-y-[20px]"
                >
                  <span className="text-xl md:text-3xl font-light text-white tracking-wide group-hover:pl-4 transition-all duration-500">{item}</span>
                  <Award className="text-white/20 group-hover:text-white transition-colors duration-500" size={24} />
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="md:w-1/2 flex flex-col">
            <h2 className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-white/40 font-heading mb-16">
              06. Certifications
            </h2>
            <div className="flex flex-col border-t border-white/5">
              {certifications.map((item, idx) => (
                <div
                  key={idx}
                  className="achievement-item py-8 border-b border-white/5 flex items-center justify-between group hover:bg-white/[0.02] transition-colors duration-500 opacity-0 translate-y-[20px]"
                >
                  <span className="text-xl md:text-3xl font-light text-white tracking-wide group-hover:pl-4 transition-all duration-500">{item}</span>
                  <ShieldCheck className="text-white/20 group-hover:text-white transition-colors duration-500" size={24} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

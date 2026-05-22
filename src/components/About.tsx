"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { TextRevealByWord } from "@/components/ui/text-reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal heading
    gsap.fromTo(".about-heading",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="relative w-full bg-white text-black border-y border-black/5 pb-20">
      
      <div className="w-full relative z-10 pt-32 md:pt-48">
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <h2 className="about-heading text-sm md:text-base font-medium tracking-[0.4em] uppercase text-black/40 font-heading text-center opacity-0">
            01. THE ARCHITECT
          </h2>
        </div>
        
        <TextRevealByWord 
          text="I build intelligent systems and immersive digital experiences that blend brutal engineering with elegant, cinematic human interaction. My work resolves the absolute chaos of complex neural architecture into seamless, deterministic interfaces. I believe the highest form of engineering is invisible—leaving behind an experience that feels pure, atmospheric, and utterly effortless."
        />
      </div>

    </section>
  );
};

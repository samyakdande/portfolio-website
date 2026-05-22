"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { RevealImageListItem, ShowImageListItemProps } from "@/components/ui/reveal-images";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences: ShowImageListItemProps[] = [
  {
    text: "Agilos.in",
    role: "AI Intern · 2026",
    images: [
      { src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=60", alt: "AI Graph" },
      { src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=60", alt: "Neural Net" }
    ]
  },
  {
    text: "Intel Unnati",
    role: "Trainig Program Sept-2025 to JAN-2026",
    images: [
      { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60", alt: "Circuit" },
      { src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=60", alt: "Servers" }
    ]
  },
  {
    text: "I-Predict",
    role: "AI - Stratergist Current",
    images: [
      { src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60", alt: "Matrix" },
      { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=60", alt: "Cyber" }
    ]
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
          <RevealImageListItem key={index} text={item.text} role={item.role} images={item.images} />
        ))}
      </div>
    </section>
  );
};

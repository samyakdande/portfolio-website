"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TestimonialCard } from "@/components/ui/testimonial-cards";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    id: 1,
    testimonial: "I feel like I've learned as much from X as I did completing my masters. It's the first thing I read every morning.",
    author: "Jenn F. - Marketing Director @ Square"
  },
  {
    id: 2,
    testimonial: "My boss thinks I know what I'm doing. Honestly, I just read this newsletter.", 
    author: "Adrian Y. - Product Marketing @ Meta"
  },
  {
    id: 3,
    testimonial: "Can not believe this is free. If X was $5,000 a month, it would be worth every penny. I plan to name my next child after X.",
    author: "Devin R. - Growth Marketing Lead @ OpenAI"
  }
];

export const Testimonials = () => {
  const [positions, setPositions] = useState<("front" | "middle" | "back")[]>(["front", "middle", "back"]);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".testimonials-header",
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

  const handleShuffle = () => {
    const newPositions = [...positions];
    const last = newPositions.pop();
    if (last) newPositions.unshift(last);
    setPositions(newPositions);
  };

  return (
    <section id="testimonials" ref={containerRef} className="relative py-32 md:py-48 bg-slate-900 overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-24">
        <h2 className="testimonials-header text-sm md:text-base font-medium tracking-[0.3em] uppercase text-slate-400 font-heading opacity-0">
          05. Testimonials
        </h2>
      </div>

      <div className="grid place-content-center overflow-hidden px-8 w-full text-slate-50">
        <div className="relative -ml-[100px] h-[450px] w-[350px] md:-ml-[175px]">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              {...testimonial}
              handleShuffle={handleShuffle}
              position={positions[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

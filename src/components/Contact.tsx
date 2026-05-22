"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { MagneticText } from "@/components/ui/morphing-cursor";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
      gsap.to(".contact-content", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });
  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="relative py-48 md:py-64 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24">
          
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="contact-content text-sm md:text-base font-light tracking-[0.3em] uppercase text-white/40 font-heading mb-8 opacity-0 translate-y-[40px]">
                05. Connection
              </h2>
              <div className="contact-content mb-8 opacity-0 translate-y-[40px] flex flex-col items-start gap-0">
                <h3 className="text-5xl md:text-7xl font-light text-white tracking-tighter leading-[0.9] font-heading">
                  INITIATE
                </h3>
                <h3 className="text-5xl md:text-7xl font-medium text-white tracking-tighter leading-[0.9] font-heading">
                  PROTOCOL
                </h3>
              </div>
              <p className="contact-content text-base font-light text-muted leading-relaxed max-w-sm opacity-0 translate-y-[40px]">
                Open for discourse on intelligent systems, architectural challenges, and cinematic digital experiences.
              </p>
            </div>
            
            <div className="contact-content mt-24 opacity-0 translate-y-[40px]">
              <a href="mailto:hello@example.com" className="text-xl font-light text-white border-b border-white pb-1 hover:text-white/60 hover:border-white/60 transition-colors">
                hello@example.com
              </a>
            </div>
          </div>

          <div className="md:w-1/2 contact-content opacity-0 translate-y-[40px]">
            <form className="flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="name" className="text-xs font-medium tracking-[0.2em] uppercase text-white/40">Identification</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl font-light text-white placeholder-white/10 focus:outline-none focus:border-white transition-colors"
                  placeholder="Name or Callsign"
                />
              </div>
              
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="email" className="text-xs font-medium tracking-[0.2em] uppercase text-white/40">Transmission Node</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl font-light text-white placeholder-white/10 focus:outline-none focus:border-white transition-colors"
                  placeholder="Email Address"
                />
              </div>
              
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="message" className="text-xs font-medium tracking-[0.2em] uppercase text-white/40">Encrypted Payload</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl font-light text-white placeholder-white/10 focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  className="group flex items-center justify-between w-full md:w-auto px-12 py-5 bg-white text-black text-sm tracking-[0.2em] uppercase font-medium hover:bg-white/90 transition-colors"
                >
                  <span>Transmit</span>
                  <ArrowRight size={16} className="ml-8 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

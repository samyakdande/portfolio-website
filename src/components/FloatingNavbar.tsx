"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

import { MagneticText } from "@/components/ui/morphing-cursor";

const NAV_ITEMS = [
  { name: "HOME", id: "home" },
  { name: "ABOUT", id: "about" },
  { name: "SKILLS", id: "skills" },
  { name: "PROJECTS", id: "projects" },
  { name: "EXPERIENCE", id: "experience" },
  { name: "CONTACT", id: "contact" },
];

export const FloatingNavbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
    );
  }, { scope: navRef });

  return (
    <div className="fixed top-4 w-full flex justify-center z-50 pointer-events-auto px-4 sm:px-8">
      <nav 
        ref={navRef}
        className="relative flex items-center justify-center gap-2 sm:gap-6 px-4 py-3 sm:px-8 w-auto rounded-none bg-black/50 backdrop-blur-md border border-white/5"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a key={item.id} href={`#${item.id}`} className="relative px-2">
              <span className={cn(
                "text-xs sm:text-sm transition-all duration-300 tracking-[0.2em] sm:tracking-[0.3em] uppercase inline-block",
                isActive ? "text-white font-medium scale-110" : "text-white/40 hover:text-white hover:scale-110 font-light"
              )}>
                {item.name}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};

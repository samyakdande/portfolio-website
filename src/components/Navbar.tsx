"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { MagneticText } from "@/components/ui/morphing-cursor";

const links = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    );
  }, { scope: navRef });

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full px-4 pointer-events-none">
        <nav
          ref={navRef}
          className={cn(
            "pointer-events-auto transition-all duration-700 rounded-2xl border px-8 py-4 flex items-center justify-between gap-8 md:gap-16",
            scrolled ? "bg-black/60 backdrop-blur-xl border-white/10 shadow-2xl" : "bg-white/5 backdrop-blur-md border-white/5"
          )}
        >
          <a href="#" className="text-xl md:text-2xl font-light tracking-[0.3em] text-white uppercase font-heading hidden sm:block">
            Architect
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-xs lg:text-sm uppercase tracking-[0.3em] font-light text-white/50 transition-all duration-300 hover:text-white hover:scale-110"
              >
                {link.name.toUpperCase()}
              </a>
            ))}
            <a 
              href="#contact"
              className="text-xs lg:text-sm uppercase tracking-[0.3em] font-medium text-white hover:text-white/70 transition-colors"
            >
              GET IN TOUCH
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden transition-all duration-300",
          isOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"
        )}
      >
        <div className="flex flex-col space-y-8 text-center mt-12">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-light uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-500"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

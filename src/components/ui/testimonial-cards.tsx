"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

export function TestimonialCard ({ handleShuffle, testimonial, position, id, author, images }: any) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";
  const [isOpen, setIsOpen] = React.useState(false);

  // Reveal images containers (from the user's reveal-images.tsx snippet)
  const container = "absolute -right-8 -top-8 z-50 h-32 w-24 pointer-events-none transition-all duration-500";
  const effect = "relative w-full h-full shadow-2xl overflow-hidden rounded-xl border-2 border-slate-700 bg-slate-900";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? "3" : position === "middle" ? "2" : position === "back" ? "1" : "0",
        opacity: position === "hidden" ? 0 : 1,
        pointerEvents: position === "hidden" ? "none" : "auto"
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : position === "back" ? "6deg" : "0deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : position === "back" ? "66%" : "66%",
        scale: position === "hidden" ? 0.8 : 1
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onDragStart={(e, info) => {
        dragRef.current = info.point.x;
      }}
      onDragEnd={(e, info) => {
        if (Math.abs(info.offset.x) > 100) {
          handleShuffle();
          setIsOpen(false);
        } else {
          // If dragged very little, treat as click to toggle images
          if (isFront) setIsOpen(!isOpen);
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={cn(
        "group absolute left-0 top-0 flex flex-col justify-center h-[450px] w-[350px] select-none space-y-8 rounded-[1.5rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.02)] p-10 shadow-xl backdrop-blur-md transition-all duration-500",
        isFront ? "cursor-grab active:cursor-grabbing hover:border-[rgba(255,255,240,0.3)] hover:shadow-[0_10px_40px_rgba(255,255,240,0.05)] hover:-translate-y-2" : ""
      )}
    >
      <div className="flex flex-col items-center justify-center space-y-6">
        <span className="text-center text-sm font-medium tracking-[0.3em] uppercase text-white/50 font-heading">
          {author}
        </span>
        <span className="text-center text-xl md:text-2xl font-light tracking-wide text-white font-heading uppercase leading-relaxed">
          {testimonial}
        </span>
      </div>

      {/* Image Reveal Effect */}
      {images && (
        <>
          <div 
            className={cn(
              container, 
              isOpen ? "scale-100 opacity-100 translate-x-0 translate-y-0" : "scale-0 opacity-0 translate-x-12 translate-y-12"
            )}
          >
            <div className={effect}>
              <img alt="Skill Visual" src={images[1]?.src} className="h-full w-full object-cover grayscale opacity-60" />
            </div>
          </div>
          <div
            className={cn(
              container,
              "delay-100",
              isOpen ? "scale-100 opacity-100 translate-x-12 -translate-y-8 rotate-12" : "scale-0 opacity-0 translate-x-0 translate-y-0 rotate-0"
            )}
          >
            <div className={effect}>
              <img alt="Skill Visual" src={images[0]?.src} className="h-full w-full object-cover grayscale opacity-60" />
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

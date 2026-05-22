"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

export interface StaggerItem {
  tempId: number;
  content: string;
  title: string;
  imgSrc: string;
}

interface TestimonialCardProps {
  position: number;
  item: StaggerItem;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  item, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border px-8 py-10 transition-all duration-700 ease-in-out backdrop-blur-2xl",
        isCenter 
          ? "z-10 bg-white/80 text-black border-white shadow-[0_0_50px_rgba(255,255,255,0.2)]" 
          : "z-0 bg-black/40 text-white border-white/10 hover:border-white/30"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
      }}
    >
      <span
        className={cn(
          "absolute block origin-top-right rotate-45",
          isCenter ? "bg-black/10" : "bg-white/20"
        )}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 1
        }}
      />
      <img
        src={item.imgSrc}
        alt={item.title}
        className="mb-8 h-16 w-16 object-cover object-center rounded-none grayscale"
        style={{
          boxShadow: isCenter ? "4px 4px 0px rgba(0,0,0,0.1)" : "4px 4px 0px rgba(255,255,255,0.1)"
        }}
      />
      <h3 className={cn(
        "text-xl sm:text-2xl font-light tracking-[0.2em] uppercase font-heading mb-6",
        isCenter ? "text-black" : "text-white"
      )}>
        {item.title}
      </h3>
      <p className={cn(
        "text-lg md:text-xl font-light leading-[1.6]",
        isCenter ? "text-black/80" : "text-white/60"
      )}>
        {item.content}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC<{ items: StaggerItem[] }> = ({ items }) => {
  const [cardSize, setCardSize] = useState(380);
  const [testimonialsList, setTestimonialsList] = useState(items);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 400 : 300);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-transparent"
      style={{ height: 600 }}
    >
      {testimonialsList.map((item, index) => {
        const position = index - Math.floor(testimonialsList.length / 2);
        return (
          <TestimonialCard
            key={item.tempId}
            item={item}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-4 z-50">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-all rounded-full",
            "bg-black border border-white/20 text-white hover:bg-white hover:text-black hover:scale-110",
            "focus-visible:outline-none"
          )}
          aria-label="Previous"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-all rounded-full",
            "bg-black border border-white/20 text-white hover:bg-white hover:text-black hover:scale-110",
            "focus-visible:outline-none"
          )}
          aria-label="Next"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

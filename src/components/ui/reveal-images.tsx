"use client";

import { cn } from "@/lib/utils";

interface ImageSource {
  src: string;
  alt: string;
}

export interface ShowImageListItemProps {
  text: string;
  role: string;
  images: [ImageSource, ImageSource];
}

export function RevealImageListItem({ text, role, images }: ShowImageListItemProps) {
  const container = "absolute right-0 md:right-24 top-1/2 -translate-y-1/2 z-40 h-32 w-24 md:h-56 md:w-40 pointer-events-none";
  const effect =
    "relative duration-500 delay-100 shadow-none group-hover:shadow-2xl scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 group-hover:w-full group-hover:h-full w-24 h-32 md:w-40 md:h-56 overflow-hidden transition-all rounded-none border border-white/20";

  return (
    <div className="group relative h-fit w-full overflow-visible py-12 md:py-16 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors duration-500 px-6 lg:px-12">
      <div className="flex flex-col gap-2 relative z-50 mix-blend-difference">
        <h1 className="text-4xl md:text-7xl font-light tracking-tighter text-white transition-all duration-500 group-hover:opacity-40 font-heading uppercase mix-blend-difference">
          {text}
        </h1>
        <p className="text-sm md:text-lg text-white/40 tracking-[0.2em] uppercase font-light transition-all duration-500 group-hover:opacity-100 group-hover:text-white">
          {role}
        </p>
      </div>
      
      <div className={container}>
        <div className={effect}>
          <img alt={images[1].alt} src={images[1].src} className="h-full w-full object-cover grayscale" />
        </div>
      </div>
      <div
        className={cn(
          container,
          "translate-x-0 translate-y-0 rotate-0 transition-all delay-150 duration-500 group-hover:translate-x-8 md:group-hover:translate-x-12 group-hover:translate-y-8 md:group-hover:translate-y-12 group-hover:rotate-12",
        )}
      >
        <div className={cn(effect, "duration-200")}>
          <img alt={images[0].alt} src={images[0].src} className="h-full w-full object-cover grayscale" />
        </div>
      </div>
    </div>
  );
}

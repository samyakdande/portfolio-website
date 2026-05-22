"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 40%", "end 90%"], // Completes revealing before unpinning
  });
  
  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 min-h-[150vh]", className)}>
      <div className="sticky top-0 mx-auto flex h-screen w-full flex-col items-center justify-center px-4 md:px-12">
        <p
          className={
            "flex flex-wrap text-lg md:text-xl lg:text-3xl font-light tracking-[0.15em] uppercase leading-[1.6] justify-center text-center max-w-4xl mx-auto text-black"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  
  return (
    <span className="relative mx-1.5 lg:mx-3 xl:mx-4 my-1 lg:my-2">
      <span className="absolute opacity-10 text-black">{children}</span>
      <motion.span
        style={{ opacity }}
        className="text-black drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]"
      >
        {children}
      </motion.span>
    </span>
  );
};

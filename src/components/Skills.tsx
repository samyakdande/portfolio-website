"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const MotionDiv = motion.div as any;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Real-time Text Decoder Component
const DecodeText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#";

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;
    
    setDisplayedText(""); // Reset
    
    timeout = setTimeout(() => {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayedText(text.split("").map((char, index) => {
          if (char === " ") return " ";
          if (index < iteration) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join(""));
        
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3; 
      }, 30);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <>{displayedText || "\u00A0"}</>;
};

const skillItems = [
  {
    id: 1,
    title: "PROGRAMMING",
    skills: "Python, C++, Java, Kotlin, TypeScript, Go",
    images: [
      { src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80", alt: "Programming" },
    ]
  },
  {
    id: 2,
    title: "AI & ML",
    skills: "Machine Learning, NLP, RAG, Generative AI, Multi-Agent AI",
    images: [
      { src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=80", alt: "AI Brain" },
    ]
  },
  {
    id: 3,
    title: "FRAMEWORKS",
    skills: "React, Next.js, FastAPI, Flask, LangChain",
    images: [
      { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80", alt: "Framework" },
    ]
  },
  {
    id: 4,
    title: "DATABASES",
    skills: "MongoDB, Supabase, Firebase, Pinecone, ChromaDB",
    images: [
      { src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80", alt: "Servers" },
    ]
  },
  {
    id: 5,
    title: "TOOLS",
    skills: "Docker, Git, AWS ECS, Power BI, Linux",
    images: [
      { src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80", alt: "Matrix" }
    ]
  }
];

export const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".skills-title",
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
    <section id="skills" ref={containerRef} className="relative py-32 md:py-48 bg-black overflow-hidden border-t border-white/5">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <h2 className="skills-title text-sm md:text-base font-bold tracking-[0.4em] uppercase text-white/40 font-heading opacity-0">
          02. TECHNOLOGY ARCHITECTURE
        </h2>
        <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mt-6">
          Tech Stack
        </h3>
      </div>

      <div className="w-full max-w-7xl mx-auto h-[70vh] min-h-[500px] flex flex-col md:flex-row gap-2 px-4 lg:px-12">
        {skillItems.map((skill, index) => (
          <AccordionPanel 
            key={skill.id} 
            skill={skill} 
            index={index} 
            onClick={() => setSelectedSkill(skill)}
          />
        ))}
      </div>
      
      {/* Fullscreen Hack HUD Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

const AccordionPanel = ({ skill, index, onClick }: { skill: any, index: number, onClick: () => void }) => {
  const [isActive, setIsActive] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && panelRef.current) {
      gsap.fromTo(panelRef.current,
        { filter: "brightness(1.5) contrast(150%)" },
        { filter: "brightness(1) contrast(100%)", duration: 0.3, ease: "steps(4)" }
      );
    }
  }, [isActive]);

  useGSAP(() => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        yPercent: -50,
        ease: "none",
        duration: 10,
        repeat: -1
      });
    }
  }, []);

  return (
    <div 
      ref={panelRef}
      onClick={onClick}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className={cn(
        "group relative flex overflow-hidden border-2 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
        isActive ? "flex-[4] bg-black/60 border-white/20" : "flex-1 bg-white/[0.05] border-white/20 hover:border-white/50"
      )}
      style={{ borderRadius: '1rem' }}
    >
      {/* Animated Tracing Borders on Hover */}
      <div className={cn(
        "absolute inset-0 z-50 pointer-events-none overflow-hidden rounded-[1rem] transition-opacity duration-300",
        isActive ? "opacity-0" : "opacity-100"
      )}>
        <div className="absolute top-0 left-0 w-full h-[3px] bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" />
        <div className="absolute bottom-0 right-0 w-full h-[3px] bg-white translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" />
        <div className="absolute top-0 right-0 w-[3px] h-full bg-white -translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] delay-100" />
        <div className="absolute bottom-0 left-0 w-[3px] h-full bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] delay-100" />
      </div>

      {/* Background Image */}
      <div 
        className={cn(
          "absolute inset-0 z-0 transition-all duration-1000 transform",
          isActive ? "opacity-100 scale-100" : "opacity-0 scale-110"
        )}
      >
        <img 
          src={skill.images[0].src} 
          alt={skill.title} 
          className="w-full h-full object-cover grayscale opacity-50 mix-blend-screen transition-all duration-1000"
        />
        <div className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          isActive ? "bg-gradient-to-t from-black via-black/40 to-black/90" : "bg-gradient-to-t from-black/80 to-transparent"
        )} />
      </div>

      {/* Cyber Targeting Brackets Overlay */}
      <div className={cn(
        "absolute inset-6 z-20 pointer-events-none transition-all duration-500",
        isActive ? "opacity-100 scale-100" : "opacity-0 scale-110"
      )}>
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/30" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/30" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/30" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/30" />
      </div>

      {/* Fake Barcode on Expand */}
      <div className={cn(
        "absolute top-8 right-8 z-20 flex gap-1 h-8 transition-opacity duration-700 delay-300",
        isActive ? "opacity-50" : "opacity-0"
      )}>
        {Array.from({length: 12}).map((_, i) => {
          const pseudoRandomWidth = ((i * 7) % 4) + 1.5;
          return <div key={i} className="bg-white" style={{ width: `${pseudoRandomWidth}px` }} />;
        })}
      </div>

      {/* Kinetic Scrolling Marquee (Background) */}
      <div className={cn(
        "absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-1000 mix-blend-overlay",
        isActive ? "opacity-20 delay-300" : "opacity-0"
      )}>
        <div ref={marqueeRef} className="flex flex-col items-center opacity-50">
          {Array(10).fill(skill.title).map((t, i) => (
            <span key={i} className="text-[6rem] sm:text-[10rem] font-black uppercase text-white whitespace-nowrap leading-[0.8] tracking-tighter">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col justify-end w-full h-full p-4 md:p-8">
        <div className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
          isActive ? "opacity-0 pointer-events-none" : "opacity-100 delay-300"
        )}>
          <span className="hidden md:block -rotate-90 whitespace-nowrap text-xl lg:text-2xl font-black tracking-widest text-stone-500 uppercase">
            {skill.title}
          </span>
          <span className="md:hidden text-lg font-black tracking-widest text-stone-500 uppercase">
            {skill.title}
          </span>
        </div>

        <div className={cn(
          "flex flex-col transition-all duration-700 transform w-full",
          isActive ? "translate-y-0 opacity-100 delay-100" : "translate-y-8 opacity-0 pointer-events-none"
        )}>
          <h4 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-2 md:mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <DecodeText text={skill.title} delay={0.2} />
          </h4>
          <div className="w-12 h-1 bg-white mb-4 md:mb-6" />
          <p className="text-xs sm:text-sm md:text-base font-bold tracking-[0.2em] text-stone-300 uppercase leading-relaxed md:max-w-md">
            {skill.skills}
          </p>
        </div>
      </div>

      <div className={cn(
        "absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 shadow-[inset_0_0_40px_rgba(255,255,255,0.03)]",
        isActive ? "opacity-100" : "opacity-0"
      )} />
    </div>
  );
};

// Helper for dynamic logos
const getLogoUrl = (skillName: string) => {
  const name = skillName.toLowerCase().replace(/\s+/g, '').replace('.', '');
  const mapping: Record<string, string> = {
    'c++': 'cplusplus/cplusplus-original.svg',
    'nextjs': 'nextjs/nextjs-original.svg',
    'react': 'react/react-original.svg',
    'python': 'python/python-original.svg',
    'java': 'java/java-original.svg',
    'kotlin': 'kotlin/kotlin-original.svg',
    'typescript': 'typescript/typescript-original.svg',
    'go': 'go/go-original.svg',
    'fastapi': 'fastapi/fastapi-original.svg',
    'flask': 'flask/flask-original.svg',
    'mongodb': 'mongodb/mongodb-original.svg',
    'firebase': 'firebase/firebase-original.svg',
    'supabase': 'supabase/supabase-original.svg',
    'docker': 'docker/docker-original.svg',
    'git': 'git/git-original.svg',
    'linux': 'linux/linux-original.svg',
    'aws': 'amazonwebservices/amazonwebservices-original-wordmark.svg',
  };
  
  if (mapping[name]) {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${mapping[name]}`;
  }
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;
};

// Live Terminal Data Component
const LiveTerminalData = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setData(Array.from({length: 8}).map(() => Math.random().toString(36).substring(2, 10).toUpperCase()).join(" · ") + " · STATUS: ACTIVE");
    }, 80);
    return () => clearInterval(interval);
  }, []);
  return (
    <p className="text-[10px] md:text-xs font-mono text-stone-500 break-all leading-relaxed opacity-70">
      {data}
    </p>
  );
};

const SkillModal = ({ skill, onClose }: { skill: any, onClose: () => void }) => {
  const skillsArray = skill.skills.split(", ");
  const scanlineRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useGSAP(() => {
    gsap.fromTo(scanlineRef.current, 
      { y: "-10%" }, 
      { y: "110%", duration: 3, ease: "none", repeat: -1 }
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    // 3D Parallax Tilt Calculation
    const x = (e.clientX / window.innerWidth - 0.5) * 10; // 10 degree max tilt
    const y = (e.clientY / window.innerHeight - 0.5) * -10;
    setMousePos({ x, y });
  };

  return (
    <MotionDiv 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 bg-black/80 backdrop-blur-xl"
      onMouseMove={handleMouseMove}
      style={{ perspective: "1500px" }}
    >
      <div className="absolute inset-0 cursor-crosshair" onClick={onClose} />
      
      <MotionDiv 
        initial={{ scale: 0.95, y: 20, rotateX: 5 }}
        animate={{ scale: 1, y: 0, rotateX: mousePos.y, rotateY: mousePos.x }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden border border-white/20 bg-[#050505] p-8 md:p-12 shadow-[0_0_120px_rgba(255,255,255,0.05)] rounded-2xl flex flex-col"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* CRT Scanline Overlay - Monochrome */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,255,255,0.03),rgba(200,200,200,0.02),rgba(255,255,255,0.03))] bg-[length:100%_4px,3px_100%] z-50" />
        
        {/* Spinning Cybernetic Reticle */}
        <MotionDiv 
          animate={{ rotate: 360 }} 
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          className="absolute -top-[50%] -right-[20%] w-[1000px] h-[1000px] border border-white/5 rounded-full pointer-events-none opacity-30 z-0 flex items-center justify-center"
        >
          <div className="w-[800px] h-[800px] border border-dashed border-white/10 rounded-full" />
          <div className="absolute w-full h-[1px] bg-white/5" />
          <div className="absolute h-full w-[1px] bg-white/5" />
        </MotionDiv>

        {/* Laser Scanner Line - White */}
        <div ref={scanlineRef} className="absolute left-0 w-full h-[2px] bg-white/50 shadow-[0_0_20px_rgba(255,255,255,0.5)] z-40 pointer-events-none blur-[1px]" />
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6 relative z-10 shrink-0 transform-gpu" style={{ transform: "translateZ(30px)" }}>
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none">
              <DecodeText text={skill.title} delay={0.1} />
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-white/30 hover:text-white hover:rotate-90 transition-all duration-300"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Scrollable Skills Grid with Logos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 overflow-y-auto hide-scrollbar pb-6 pr-2 transform-gpu" style={{ transform: "translateZ(40px)" }}>
          {skillsArray.map((s: string, i: number) => (
            <MotionDiv 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + (i * 0.05) }}
              className="flex items-center justify-between border border-white/5 bg-white/[0.01] p-5 hover:bg-white/10 hover:border-white/30 transition-colors group cursor-default"
            >
              <div className="flex items-center gap-6">
                <span className="text-stone-500 font-mono text-xs opacity-50 group-hover:opacity-100 transition-opacity">
                  SYS.{(i + 1).toString().padStart(2, '0')}
                </span>
                <span className="text-xl md:text-2xl font-bold tracking-widest text-stone-300 uppercase group-hover:text-white transition-colors">
                  <DecodeText text={s} delay={0.2 + (i * 0.05)} />
                </span>
              </div>
              
              {/* Dynamic Logo */}
              <img 
                src={getLogoUrl(s)} 
                alt={`${s} logo`} 
                className="w-8 h-8 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </MotionDiv>
          ))}
        </div>

        {/* Fake Terminal Data */}
        <div className="mt-6 pt-4 border-t border-white/5 relative z-10 shrink-0">
          <LiveTerminalData />
        </div>

      </MotionDiv>
    </MotionDiv>
  );
};

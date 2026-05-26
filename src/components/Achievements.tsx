"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CinematicCard = ({ 
  title, 
  category, 
  images 
}: { 
  title: string; 
  category: string; 
  images: string[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseEnter = contextSafe(() => {
    // Kill existing animations to prevent glitches
    gsap.killTweensOf(".reveal-img");
    gsap.killTweensOf(".folder-card");
    
    // The Cinematic Fan-out animation
    images.forEach((_, i) => {
      const middleIndex = (images.length - 1) / 2;
      const offset = i - middleIndex;
      const angle = offset * 14; 
      const yOffset = -140 + Math.abs(offset) * 20;
      
      gsap.to(`.reveal-img-${i}`, {
        y: yOffset,
        rotationZ: angle,
        scale: 1,
        opacity: 1,
        duration: 1.8,
        ease: "expo.out",
        delay: Math.abs(offset) * 0.08
      });

      // Anti-gravity float loop
      gsap.to(`.reveal-img-${i}`, {
        y: `${yOffset - 8}`,
        rotationZ: angle + (Math.random() * 2 - 1),
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.8 // Start floating after fan-out settles
      });
    });
    
    // Luxury folder interaction
    gsap.to(".folder-card", {
      scale: 0.98,
      borderColor: "rgba(230, 228, 213, 0.3)",
      backgroundColor: "rgba(25, 25, 25, 0.95)",
      y: 10,
      duration: 1.5,
      ease: "power3.out"
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.killTweensOf(".reveal-img");
    gsap.killTweensOf(".folder-card");
    
    images.forEach((_, i) => {
      gsap.to(`.reveal-img-${i}`, {
        y: 0,
        rotationZ: 0,
        scale: 0.5,
        opacity: 0,
        duration: 1.2,
        ease: "power4.inOut"
      });
    });

    gsap.to(".folder-card", {
      scale: 1,
      borderColor: "rgba(230, 228, 213, 0.1)",
      backgroundColor: "rgba(17, 17, 17, 0.9)",
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    });
  });

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center justify-center w-full h-[400px] cursor-crosshair group perspective-[2000px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hidden Stacked Images */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-end justify-center pointer-events-none w-full h-full z-10">
        {images.map((src, i) => {
          const middleIndex = (images.length - 1) / 2;
          const zIndex = 20 - Math.abs(i - middleIndex);
          return (
            <div
              key={i}
              className={`reveal-img reveal-img-${i} absolute bottom-0 w-44 h-64 rounded-xl overflow-hidden border border-[#e6e4d5]/20 shadow-[0_30px_60px_rgba(0,0,0,0.8)] bg-black origin-bottom`}
              style={{ zIndex, opacity: 0, transform: "scale(0.5) translateY(0px) rotate(0deg)" }}
            >
              <img 
                src={src} 
                alt={`Archive item ${i}`} 
                className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 hover:contrast-100 transition-all duration-300 pointer-events-auto"
              />
            </div>
          )
        })}
      </div>

      {/* The Premium Folder / Card */}
      <div className="folder-card relative w-64 h-80 rounded-[2rem] border border-[#e6e4d5]/10 bg-[#111111]/90 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between p-8 z-30 transition-shadow duration-700">
        <div className="flex justify-between items-start opacity-50">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#e6e4d5]">00{category}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#e6e4d5]/30" />
        </div>
        
        <div>
          <h3 className="text-2xl font-sans font-light tracking-tight text-[#e6e4d5] leading-tight">
            {title}
          </h3>
          <p className="text-[#e6e4d5]/40 text-[10px] mt-4 font-mono tracking-[0.2em] uppercase">
            Click to explore
          </p>
        </div>
      </div>
    </div>
  );
};

const archiveData = [
  {
    category: "1",
    title: "AI Certifications",
    images: [
      "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=600&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80"
    ]
  },
  {
    category: "2",
    title: "Hackathons",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80"
    ]
  },
  {
    category: "3",
    title: "Research",
    images: [
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=600&q=80",
      "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=600&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80"
    ]
  },
  {
    category: "4",
    title: "Events",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80"
    ]
  },
  {
    category: "5",
    title: "Workshops",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80"
    ]
  },
  {
    category: "6",
    title: "Leadership",
    images: [
      "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=600&q=80",
      "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=600&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80"
    ]
  },
  {
    category: "7",
    title: "Projects",
    images: [
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=600&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80"
    ]
  },
  {
    category: "8",
    title: "Competitions",
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80"
    ]
  }
];

export const Achievements = () => {
  return (
    <section id="achievements" className="relative py-32 bg-black overflow-hidden border-t border-white/[0.02]">
      
      {/* Immersive Darkness & Smoke Atmosphere */}
      <div className="absolute inset-0 bg-black z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03),_transparent_70%)] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(230,228,213,0.02),_transparent_50%)] z-0 pointer-events-none" />
      
      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay z-0 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat" />
      
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Editorial Section Title */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#e6e4d5]/10 pb-10 gap-6">
          <div>
            <h2 className="text-sm font-mono tracking-[0.4em] uppercase text-[#e6e4d5]/60 mb-6">
              05 // The Archive
            </h2>
            <h3 className="text-5xl md:text-8xl font-sans font-light tracking-tighter text-[#e6e4d5] uppercase leading-[0.9]">
              RECOGNITIONS <br />
              <span className="text-[#e6e4d5]/40 italic">& CERTIFICATIONS</span>
            </h3>
          </div>
          <p className="text-xs md:text-sm font-mono tracking-[0.1em] text-[#e6e4d5]/40 uppercase max-w-xs text-left md:text-right">
            A cinematic log of hidden memories, unfolding dynamically on interaction.
          </p>
        </div>

        {/* Cinematic Archive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-x-12 md:gap-y-20 w-full mt-12">
          {archiveData.map((item) => (
            <CinematicCard 
              key={item.category} 
              title={item.title} 
              category={item.category} 
              images={item.images} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

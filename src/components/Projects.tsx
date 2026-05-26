"use client";

import React from "react";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";

export const Projects = () => {
  return (
    <section id="projects" className="relative w-full overflow-hidden bg-black">
      
      {/* Overarching Massive Heading */}
      <div className="relative pt-48 pb-32 px-6 lg:px-16 bg-[#030303] flex flex-col items-start justify-center min-h-[70vh] border-t border-white/10 overflow-hidden">
        {/* Terminal Header */}
        <div className="absolute top-8 left-8 md:top-16 md:left-16 z-50 flex items-center gap-4">
          <div className="w-2 h-2 bg-white animate-pulse" />
          <h2 className="text-xs md:text-sm font-mono tracking-[0.4em] uppercase text-white/50">
            [ SYS.DIR.04 ]
          </h2>
        </div>
        
        {/* Main Brutalist Typography */}
        <div className="flex flex-col gap-2 w-full relative z-10">
          <p className="text-stone-500 font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-6 md:mb-10">
            // QUERY: SELECT * FROM ARCHIVE
          </p>
          <h2 className="text-[clamp(4rem,14vw,16rem)] font-black text-white uppercase leading-[0.8] tracking-[-0.05em] w-full">
            CASE
          </h2>
          <h2 className="text-[clamp(4rem,14vw,16rem)] font-black uppercase leading-[0.8] tracking-[-0.05em] w-full text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.4)]">
            STUDIES
          </h2>
          
          {/* Status Bar */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-12 text-xs font-mono text-white/30 tracking-widest uppercase border-t border-white/10 pt-6 max-w-2xl">
            <span>STATUS: [ OK ]</span>
            <span>RECORDS: [ 04 ]</span>
            <span className="animate-pulse">DECRYPTING...</span>
          </div>
        </div>

        {/* Decorative Architectural Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} />
      </div>

      <FlowArt aria-label="Portfolio Projects Flow">
        
        {/* Project 1: Deep Cyber Blue */}
        <FlowSection aria-label="Agilos AI Intern" style={{ backgroundColor: '#030712', color: '#fff' }}>
          {/* Architectural Crosshair Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
            <div className="w-full h-[1px] bg-blue-500 absolute top-1/3" />
            <div className="h-full w-[1px] bg-blue-500 absolute left-2/3" />
            <div className="w-[50vw] h-[50vw] border border-blue-500 rounded-full absolute" />
          </div>

          <div className="absolute -top-[10%] -right-[5%] text-[50vw] md:text-[40vw] font-black text-white/[0.02] pointer-events-none leading-none tracking-tighter select-none">
            01
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-blue-500/50">Project 01 — Agilos.in</p>
              <hr className="my-[4vh] border-none border-t border-white/5" />
              <div className="flex flex-col gap-0">
                <h3 className="text-[clamp(4rem,10vw,12rem)] font-black leading-[0.75] uppercase tracking-[-0.05em] text-white">
                  AGENTIC
                </h3>
                <h3 className="text-[clamp(4rem,10vw,12rem)] font-serif italic font-light leading-[0.75] tracking-tight text-blue-100/50">
                  pipeline.
                </h3>
              </div>
            </div>
            
            <div>
              <hr className="mb-[4vh] border-none border-t border-white/5" />
              <p className="max-w-[50ch] text-sm md:text-lg font-light leading-relaxed text-blue-100/60">
                Built a stateful RAG pipeline using LangChain and LangGraph for multi-turn contextual reasoning. Reduced hallucinations by 30% via optimized retrieval and prompt engineering. Developed multilingual AI support using Sarvam AI.
              </p>
            </div>
          </div>
        </FlowSection>

        {/* Project 2: Tungsten Black */}
        <FlowSection aria-label="Intel Unnati" style={{ backgroundColor: '#0a0a0a', color: '#fff' }}>
          {/* Diagonal Hazard Stripes Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 10px)' }} />
          
          <div className="absolute -bottom-[10%] -left-[5%] text-[50vw] md:text-[40vw] font-black text-white/[0.02] pointer-events-none leading-none tracking-tighter select-none">
            02
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between items-end text-right w-full">
            <div className="w-full">
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-stone-500">Project 02 — Intel Unnati</p>
              <hr className="my-[4vh] border-none border-t border-white/5" />
              <div className="flex flex-col gap-0 items-end">
                <h3 className="text-[clamp(4rem,10vw,12rem)] font-black leading-[0.75] uppercase tracking-[-0.05em] text-white/20">
                  MULTILINGUAL
                </h3>
                <h3 className="text-[clamp(4rem,10vw,12rem)] font-serif italic font-light leading-[0.75] tracking-tight text-white">
                  solver.
                </h3>
              </div>
            </div>
            
            <div className="w-full flex justify-end">
              <div className="w-full max-w-[50ch]">
                <hr className="mb-[4vh] border-none border-t border-white/5 w-full" />
                <p className="text-sm md:text-lg font-light leading-relaxed text-stone-400">
                  A multilingual AI-based doubt solving system using RAG to answer academic queries. Engineered to process complex academic material across multiple regional languages.
                </p>
              </div>
            </div>
          </div>
        </FlowSection>

        {/* Project 3: Matrix Green */}
        <FlowSection aria-label="LangGraph Agent" style={{ backgroundColor: '#050a05', color: '#fff' }}>
          <div className="absolute top-[20%] left-[10%] text-[50vw] md:text-[40vw] font-black text-white/[0.02] pointer-events-none leading-none tracking-tighter select-none">
            03
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-center items-center text-center">
            <div className="w-full max-w-4xl">
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-green-500/50 bg-green-500/5 border border-green-500/10 px-4 py-2 inline-block rounded-full backdrop-blur-md mb-8">
                Project 03 — Personal Project
              </p>
              <div className="flex flex-col gap-0 items-center">
                <h3 className="text-[clamp(4rem,10vw,12rem)] font-black leading-[0.75] uppercase tracking-[-0.05em] text-white">
                  MULTISTATE
                </h3>
                <h3 className="text-[clamp(4rem,10vw,12rem)] font-serif italic font-light leading-[0.75] tracking-tight text-green-100/50">
                  workflow.
                </h3>
              </div>
              <hr className="my-[6vh] border-none border-t border-white/5 w-1/2 mx-auto" />
              <p className="max-w-[60ch] text-sm md:text-lg font-light leading-relaxed text-green-100/60 mx-auto">
                Designed a multi-agent workflow using LangGraph for stateful reasoning across multiple steps. Implemented memory-based decision flow and tool-calling for dynamic task execution.
              </p>
            </div>
          </div>
        </FlowSection>

        {/* Project 4: Cold Obsidian */}
        <FlowSection aria-label="Tender Voice AI" style={{ backgroundColor: '#0b0b0d', color: '#fff' }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <div className="w-[150vw] h-[1px] bg-white rotate-45" />
            <div className="w-[150vw] h-[1px] bg-white -rotate-45 absolute" />
          </div>
          <div className="absolute top-8 right-8 text-[15vw] md:text-[10vw] font-black text-white/[0.02] pointer-events-none leading-none tracking-tighter select-none">
            04
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-stone-500">Project 04 — Public Sector</p>
              <hr className="my-[4vh] border-none border-t border-white/5" />
              <div className="flex flex-col gap-0">
                <h3 className="text-[clamp(4rem,10vw,12rem)] font-black leading-[0.75] uppercase tracking-[-0.05em] text-white">
                  TENDER
                </h3>
                <h3 className="text-[clamp(4rem,10vw,12rem)] font-serif italic font-light leading-[0.75] tracking-tight text-stone-400">
                  voice AI.
                </h3>
              </div>
            </div>
            
            <div className="flex justify-between items-end">
              <div className="hidden md:block w-32 h-32 border border-white/10 rounded-full border-dashed animate-spin-slow opacity-30" />
              <div className="max-w-[50ch]">
                <hr className="mb-[4vh] border-none border-t border-white/5" />
                <p className="text-sm md:text-lg font-light leading-relaxed text-stone-400">
                  Built a RAG-based system to analyze government tenders using semantic document retrieval. Integrated speech-to-text and text-to-speech pipelines for seamless voice-based interaction.
                </p>
              </div>
            </div>
          </div>
        </FlowSection>

      </FlowArt>
    </section>
  );
};

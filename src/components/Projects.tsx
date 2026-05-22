"use client";

import React from "react";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import { MagneticText } from "@/components/ui/morphing-cursor";

export const Projects = () => {
  return (
    <section id="projects" className="relative w-full overflow-hidden bg-background">
      <div className="absolute top-8 left-8 md:top-16 md:left-16 z-50">
        <h2 className="text-sm md:text-base font-light tracking-[0.3em] uppercase text-white/40 font-heading">
          04. Case Studies
        </h2>
      </div>

      <FlowArt aria-label="Portfolio Projects Flow">
        
        {/* Project 1: Agilos.in */}
        <FlowSection aria-label="Agilos AI Intern" style={{ backgroundColor: '#050505', color: '#fff' }}>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">Project 01 — Agilos.in</p>
          <hr className="my-[4vh] border-none border-t border-white/10" />
          <div className="flex flex-col gap-0">
            <h3 className="text-[clamp(2.5rem,5vw,5rem)] font-light leading-[0.85] uppercase tracking-tighter font-heading text-white/90">
              AGENTIC RAG
            </h3>
          </div>
          <hr className="my-[4vh] border-none border-t border-white/10" />
          <p className="mt-auto max-w-[60ch] text-sm md:text-lg font-light leading-relaxed text-white/60">
            Built a stateful RAG pipeline using LangChain and LangGraph for multi-turn contextual reasoning. Reduced hallucinations by 30% via optimized retrieval and prompt engineering. Developed multilingual AI support using Sarvam AI.
          </p>
        </FlowSection>

        {/* Project 2: Intel Unnati */}
        <FlowSection aria-label="Intel Unnati" style={{ backgroundColor: '#0a0a0a', color: '#fff' }}>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">Project 02 — Intel Unnati</p>
          <hr className="my-[4vh] border-none border-t border-white/10" />
          <div className="flex flex-col gap-0">
            <h3 className="text-[clamp(2.5rem,5vw,5rem)] font-light leading-[0.85] uppercase tracking-tighter font-heading text-white/90">
              MULTILINGUAL
            </h3>
            <h3 className="text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[0.85] uppercase tracking-tighter font-heading text-white">
              SOLVER
            </h3>
          </div>
          <hr className="my-[4vh] border-none border-t border-white/10" />
          <p className="max-w-[50ch] text-sm md:text-lg font-light leading-relaxed text-white/60">
            A multilingual AI-based doubt solving system using RAG to answer academic queries.
          </p>
        </FlowSection>

        {/* Project 3: LangGraph MultiState */}
        <FlowSection aria-label="LangGraph Agent" style={{ backgroundColor: '#050505', color: '#fff' }}>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">Project 03 — Personal Project</p>
          <hr className="my-[4vh] border-none border-t border-white/10" />
          <div className="flex flex-col gap-0">
            <h3 className="text-[clamp(2.5rem,5vw,5rem)] font-light leading-[0.85] uppercase tracking-tighter font-heading text-white/90">
              MULTISTATE
            </h3>
            <h3 className="text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[0.85] uppercase tracking-tighter font-heading text-white">
              WORKFLOW
            </h3>
          </div>
          <hr className="my-[4vh] border-none border-t border-white/10" />
          <p className="max-w-[50ch] text-sm md:text-lg font-light leading-relaxed text-white/60">
            Designed a multi-agent workflow using LangGraph for stateful reasoning across multiple steps. Implemented memory-based decision flow and tool-calling for dynamic task execution.
          </p>
        </FlowSection>

        {/* Project 4: Tender Voice AI */}
        <FlowSection aria-label="Tender Voice AI" style={{ backgroundColor: '#0a0a0a', color: '#fff' }}>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">Project 04 — Public Sector</p>
          <hr className="my-[4vh] border-none border-t border-white/10" />
          <div className="flex flex-col gap-0">
            <h3 className="text-[clamp(2.5rem,5vw,5rem)] font-light leading-[0.85] uppercase tracking-tighter font-heading text-white/90">
              TENDER
            </h3>
            <h3 className="text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[0.85] uppercase tracking-tighter font-heading text-white">
              VOICE AI
            </h3>
          </div>
          <hr className="my-[4vh] border-none border-t border-white/10" />
          <p className="max-w-[50ch] text-sm md:text-lg font-light leading-relaxed text-white/60">
            Built a RAG-based system to analyze government tenders using semantic document retrieval. Integrated speech-to-text and text-to-speech pipelines for seamless voice-based interaction.
          </p>
        </FlowSection>

      </FlowArt>
    </section>
  );
};

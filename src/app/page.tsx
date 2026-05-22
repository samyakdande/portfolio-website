"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Hero } from "@/components/Hero";
import { InfiniteSkills } from "@/components/InfiniteSkills";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
export default function Home() {
  return (
    <main className="relative min-h-screen text-foreground bg-transparent">
      <Navbar />

      {/* Flickering Lights Background */}
      <div className="fixed inset-0 w-full h-screen bg-background z-0 overflow-hidden pointer-events-none">
        <FlickeringGrid
          className="absolute inset-0 z-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#ffffffff"
          maxOpacity={0.25}
          flickerChance={0.3}
        />
      </div>

      {/* Main Content Sections */}
      <div className="relative z-10 flex flex-col w-full pb-32">
        <Hero />
        <InfiniteSkills />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}

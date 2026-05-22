import React from "react";
import { Github, Twitter, Linkedin, Dribbble } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-white/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-white/60 text-sm">
          © {new Date().getFullYear()} Architect. All rights reserved.
        </p>
        
        <div className="flex items-center space-x-6">
          <a href="#" className="text-white/60 hover:text-white transition-colors">
            <Github size={20} />
          </a>
          <a href="#" className="text-white/60 hover:text-white transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-white/60 hover:text-white transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="#" className="text-white/60 hover:text-white transition-colors">
            <Dribbble size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

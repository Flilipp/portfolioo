import React from 'react';
import Hero from './Hero';
import ProjectsRing from './ProjectsRing';
import Contact from './Contact';

export default function App() {
  return (
    // Globalne tło Vault #111111
    <div className="bg-[#111111] min-h-screen text-white antialiased relative overflow-x-hidden">
      
      {/* GLOBALNE TŁO: Subtelna siatka z liniami muśniętymi kolorem złota */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `linear-gradient(#C8A96E 1px, transparent 1px), linear-gradient(90deg, #C8A96E 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Treść strony */}
      <div className="relative z-10">
        <Hero />
        <ProjectsRing />
        <Contact />
      </div>

    </div>
  );
}
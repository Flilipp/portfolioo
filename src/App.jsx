import React from 'react';
import Hero from './Hero';
import ProjectsRing from './ProjectsRing';
import Contact from './Contact';
import ErrorBoundary from './ErrorBoundary';

export default function App() {
  return (
    <div className="bg-[#111111] min-h-screen text-white antialiased relative overflow-x-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#C8A96E 1px, transparent 1px), linear-gradient(90deg, #C8A96E 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10">
        <Hero />
        <ErrorBoundary>
          <ProjectsRing />
        </ErrorBoundary>
        <Contact />
      </div>
    </div>
  );
}
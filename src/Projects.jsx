import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SpaceBackground from './SpaceBackground';

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    desc: "Ekskluzywna platforma webowa z pełną automatyzacją danych. Skupienie na maksymalnej optymalizacji i architekturze.",
    tech: ["React", "Node.js", "Docker"],
    num: "01",
    roles: { filip: "Infrastruktura, Backend API", wiktor: "State Management, UI Componentry" }
  },
  {
    id: 2,
    title: "Cyber Nexus",
    desc: "Aplikacja WWW oparta na zaawansowanych skryptach asynchronicznych. Przetwarzanie danych w czasie rzeczywistym.",
    tech: ["Python", "FastAPI", "Tailwind CSS"],
    num: "02",
    roles: { filip: "Algorytmy, Integracja danych", wiktor: "Dedykowany design, Animacje" }
  },
  // Dodajcie kolejne obiekty (3, 4, 5, 6) zachowując tę samą strukturę
];

export default function ProjectsSection() {
  const scrollContainerRef = useRef(null);

  // Zamiana scrolla pionowego na poziomy
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY * 1.5; // Mnożnik prędkości scrollowania
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050508]">
      {/* KROK 2: Nasz kosmos 3D w tle */}
      <SpaceBackground />

      {/* Kontener poziomy */}
      <div 
        ref={scrollContainerRef}
        className="w-full h-full overflow-x-auto flex items-center whitespace-nowrap scrollbar-none scroll-smooth snap-x snap-mandatory relative z-10"
        style={{ scrollbarWidth: 'none' }}
      >
        {/* Intro Slide */}
        <div className="w-screen h-full flex-shrink-0 flex flex-col justify-center px-12 md:px-32 snap-start">
          <motion.p 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-cyan-400 font-mono tracking-widest text-sm uppercase mb-4"
          >
            Filip & Wiktor // Dev Duo
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none"
          >
            WE BEND THE<br />
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">DIGITAL SPACE</span>
          </motion.h1>
          <p className="text-gray-500 font-light mt-6 text-lg max-w-xl whitespace-normal">
            Przewiń kółkiem myszy w dół, aby wejść do naszej galerii 6 zaawansowanych realizacji.
          </p>
        </div>

        {/* Slajdy z Projektami */}
        {projects.map((project) => (
          <div 
            key={project.id}
            className="w-screen h-full flex-shrink-0 flex items-center justify-center px-6 md:px-24 snap-start"
          >
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center whitespace-normal">
              
              {/* Wielki, techniczny numer w tle */}
              <div className="absolute text-[25vw] font-black text-white/[0.02] font-mono pointer-events-none select-none left-1/3 translate-x-[-50%]">
                {project.num}
              </div>

              {/* Lewa strona: Interaktywny Mockup z Parallaxem */}
              <motion.div 
                whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
                style={{ perspective: 1000 }}
                className="lg:col-span-7 bg-[#0e0f14] border border-white/10 rounded-2xl h-[50vh] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-30 group-hover:opacity-60 transition-opacity" />
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="w-full h-full flex items-center justify-center text-white/20 font-mono text-sm tracking-widest uppercase">
                  [ Live Application Preview ]
                </div>
              </motion.div>

              {/* Prawa strona: Informacje */}
              <div className="lg:col-span-5 text-white flex flex-col justify-center">
                <span className="text-cyan-400 font-mono text-xs tracking-widest block mb-2">// PROJECT 0{project.id}</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 uppercase">{project.title}</h2>
                <p className="text-gray-400 leading-relaxed font-light mb-6 text-sm md:text-base">
                  {project.desc}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="bg-white/[0.03] text-xs font-mono text-gray-300 px-3 py-1 rounded border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Team & Role Split */}
                <div className="bg-white/[0.01] border border-white/5 rounded-xl p-4 mb-8 text-xs font-mono text-gray-400 space-y-2">
                  <div><span className="text-fuchsia-400 font-bold">&lt;Filip&gt;</span> {project.roles.filip}</div>
                  <div><span className="text-cyan-400 font-bold">&lt;Wiktor&gt;</span> {project.roles.wiktor}</div>
                </div>

                {/* Przyciski akcji */}
                <div className="flex gap-6 font-bold text-sm uppercase tracking-wider">
                  <a href="#" className="text-cyan-400 hover:text-white transition-colors">Launch Project ↗</a>
                  <a href="#" className="text-gray-500 hover:text-white transition-colors">Source Code</a>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
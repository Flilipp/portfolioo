import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const projectsData = [
  { id: 1, title: "ALPHA", tech: ["React", "Node.js", "Docker", "PostgreSQL"], img: "/projects/projekt1.jpg", desc: "Ekskluzywna platforma webowa z pełną automatyzacją danych. Skupienie na architekturze i czystym kodzie.", challenge: "Optymalizacja zapytań SQL i skrócenie czasu odpowiedzi API o 40%.", roles: { filip: "Architektura bazy danych, REST API, Docker", wiktor: "Projekt UI/UX, State Management w React" } },
  { id: 2, title: "NEXUS", tech: ["Python", "FastAPI", "Tailwind CSS", "Redis"], img: "/projects/projekt2.jpg", desc: "Aplikacja WWW oparta na zaawansowanych skryptach asynchronicznych. Przetwarzanie danych w czasie rzeczywistym.", challenge: "Zarządzanie wątkami przy dużym obciążeniu i integracja WebSockets.", roles: { filip: "Logika asynchroniczna, skrypty Pythona", wiktor: "Stylowanie Tailwind, dynamiczne mikro-animacje" } },
  { id: 3, title: "CORE", tech: ["HTML5", "TypeScript", "Sass", "Web Audio API"], img: "/projects/projekt3.jpg", desc: "Interaktywna strona multimedialna stawiająca na najwyższy standard responsywności i semantyki.", challenge: "Zachowanie płynności 60fps przy jednoczesnym renderowaniu audio i efektów CSS.", roles: { filip: "Skrypty TypeScript, obsługa Web Audio", wiktor: "Struktura DOM, zaawansowane arkusze Sass" } },
  { id: 4, title: "PRISM", tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Supabase"], img: "/projects/projekt4.jpg", desc: "Nowoczesny portal w technologii komponentowej z dynamicznym renderowaniem po stronie serwera (SSR).", challenge: "Zbudowanie bezpiecznego systemu autoryzacji opartego na tokenach JWT.", roles: { filip: "Integracja z Supabase, polityki bezpieczeństwa RLS", wiktor: "Komponenty wielokrotnego użytku, animacje wejścia" } },
  { id: 5, title: "VORTEX", tech: ["PHP", "MySQL", "JavaScript", "Bootstrap"], img: "/projects/projekt5.jpg", desc: "Dynamiczny system zarządzania treścią z dedykowanym panelem administracyjnym i bezpieczną bazą.", challenge: "Zabezpieczenie skryptów przed atakami typu SQL Injection oraz XSS.", roles: { filip: "Walidacja danych backendu, zapytania przygotowane PDO", wiktor: "Logika formularzy JS, widoki panelu admina" } },
  { id: 6, title: "QUANTUM", tech: ["WebGL", "Three.js", "React Three Fiber", "GLSL"], img: "/projects/projekt6.jpg", desc: "Zaawansowana witryna eksperymentalna wykorzystująca grafikę trójwymiarową renderowaną na żywo w GPU.", challenge: "Napisanie wydajnych shaderów i optymalizacja geometrii pod słabsze procesory.", roles: { filip: "Matematyka wektorowa, konfiguracja sceny i oświetlenia", wiktor: "Mapowanie tekstur, ostry design UI nakładki" } }
];

// ELEGANCKA PODŁOGA 3D W KOLORZE ZŁOTA
function SceneFloor() {
  const gridRef = useRef();
  useFrame((state) => {
    if (!gridRef.current) return;
    gridRef.current.position.z = (state.clock.getElapsedTime() * 0.05) % 1;
  });
  return (
    <group position={[0, -1.2, 0]}>
      {/* Złote światło odbijające się od podłoża */}
      <pointLight distance={6} intensity={2} color="#C8A96E" position={[0, 0.5, 0]} />
      <gridHelper ref={gridRef} args={[30, 30, "#C8A96E", "#222222"]} />
    </group>
  );
}

function CarouselCard({ project, index, count, scrollRotation, activeIndexRef, setActiveIndex }) {
  const meshRef = useRef();
  const texture = useTexture(project.img);
  const angle = (index / count) * Math.PI * 2;
  const radius = 3.6; 

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const currentAngle = angle + scrollRotation.current;
    meshRef.current.position.x = Math.sin(currentAngle) * radius;
    meshRef.current.position.z = Math.cos(currentAngle) * radius;
    meshRef.current.rotation.y = currentAngle + Math.PI;

    const targetX = state.pointer.x * 0.1;
    const targetY = state.pointer.y * 0.1;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, currentAngle + Math.PI + targetX, 0.1);

    const isFront = Math.cos(currentAngle) > 0.85;
    if (isFront && activeIndexRef.current !== index) {
      activeIndexRef.current = index;
      setActiveIndex(index);
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <boxGeometry args={[2.3, 1.4, 0.04]} />
        <meshPhysicalMaterial 
          map={texture}
          roughness={0.2}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transmission={0.3}
          thickness={0.05}
          // Obramowanie podświetla się na złoto, gdy projekt jest aktywny
          color={activeIndexRef.current === index ? "#ffffff" : "#444444"}
        />
      </mesh>
      <Text
        position={[0, -0.85, 0]}
        fontSize={0.15}
        color={activeIndexRef.current === index ? "#C8A96E" : "#ffffff"}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>
    </group>
  );
}

function Scene({ scrollRotation, targetRotation, activeIndexRef, setActiveIndex, isHovered }) {
  useEffect(() => {
    const handleWheel = (e) => {
      if (!isHovered) return;

      const rotationStep = e.deltaY * 0.0025;
      const nextRotation = targetRotation.current + rotationStep;
      const minRotation = -((projectsData.length - 1) * (Math.PI * 2 / projectsData.length));
      const maxRotation = 0;

      if ((e.deltaY > 0 && nextRotation < minRotation) || (e.deltaY < 0 && nextRotation > maxRotation)) {
        document.body.style.overflow = 'auto';
        return; 
      }

      e.preventDefault();
      document.body.style.overflow = 'hidden';
      targetRotation.current = Math.min(Math.max(nextRotation, minRotation), maxRotation);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = 'auto';
    };
  }, [isHovered]);

  useFrame(() => {
    scrollRotation.current = THREE.MathUtils.lerp(scrollRotation.current, targetRotation.current, 0.08);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <SceneFloor />
      <group position={[0, 0.1, -1.2]}>
        {projectsData.map((project, idx) => (
          <CarouselCard key={project.id} index={idx} count={projectsData.length} project={project} scrollRotation={scrollRotation} activeIndexRef={activeIndexRef} setActiveIndex={setActiveIndex} />
        ))}
      </group>
    </>
  );
}

export default function ProjectsRing() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRotation = useRef(0);
  const targetRotation = useRef(0);
  const activeIndexRef = useRef(0);

  const activeProject = projectsData[activeIndex];

  return (
    <section className="w-full min-h-screen bg-transparent py-20 px-4 md:px-12 flex flex-col justify-center items-center relative">
      <div className="text-center mb-6 font-mono text-xs text-gray-500 pointer-events-none tracking-widest relative z-10">
        <span className="text-[#C8A96E] font-bold">// TECH INSTANCE</span> — SCROLLUJ NAD OKNEM, ABY OBRÓCIĆ
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* LEWY PANEL (OPISY) */}
        <div className="lg:col-span-3 text-white font-mono flex flex-col gap-6 order-2 lg:order-1">
          <div className="border-l border-[#C8A96E] pl-4">
            <span className="text-[#C8A96E] text-[10px] tracking-widest block uppercase">// OPIS PROJEKTU</span>
            <p className="text-gray-400 font-sans font-light text-sm mt-1 leading-relaxed">
              {activeProject.desc}
            </p>
          </div>
          <div className="border-l border-white/20 pl-4">
            <span className="text-gray-400 text-[10px] tracking-widest block uppercase">// WYZWANIE TECHNICZNE</span>
            <p className="text-gray-500 font-sans font-light text-sm mt-1 leading-relaxed">
              {activeProject.challenge}
            </p>
          </div>
        </div>

        {/* ŚRODKOWY PANEL (OKNO PODMIENIONE NA VAULT #111111) */}
        <div 
          className="lg:col-span-6 relative w-full h-[60vh] bg-[#111111] border border-[#C8A96E]/20 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300 hover:border-[#C8A96E]/40"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); document.body.style.overflow = 'auto'; }}
        >
          <Canvas camera={{ position: [0, 0, 3.5], fov: 55 }}>
            <Suspense fallback={null}>
              <Scene scrollRotation={scrollRotation} targetRotation={targetRotation} activeIndexRef={activeIndexRef} setActiveIndex={setActiveIndex} isHovered={isHovered} />
            </Suspense>
          </Canvas>

          <div className="absolute inset-x-0 bottom-6 z-20 pointer-events-none text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[#C8A96E] font-mono uppercase">
              {activeProject.title}
            </h2>
          </div>

          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-[10px] z-20 flex flex-col items-center gap-1">
            <span className="text-[#C8A96E] font-bold">0{activeProject.id}</span>
            <span>/06</span>
          </div>
        </div>

        {/* PRAWY PANEL (TECH STACK) */}
        <div className="lg:col-span-3 text-white font-mono flex flex-col gap-6 order-3">
          <div>
            <span className="text-[#C8A96E] text-[10px] tracking-widest block uppercase mb-2">// UŻYTE TECHNOLOGIE</span>
            <div className="flex flex-wrap gap-1.5">
              {activeProject.tech.map((t, idx) => (
                <span key={idx} className="bg-white/[0.02] border border-white/10 text-[11px] text-gray-400 px-2.5 py-1 rounded font-mono">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white/[0.01] border border-white/5 rounded-xl p-4 space-y-3 text-xs">
            <span className="text-gray-600 text-[10px] tracking-widest block uppercase">// STRUKTURA ZESPOŁU</span>
            <div>
              <span className="text-gray-400 font-bold block">&lt;FILIP&gt;</span>
              <p className="text-gray-500 font-sans font-light mt-0.5 leading-snug">{activeProject.roles.filip}</p>
            </div>
            <div>
              <span className="text-gray-400 font-bold block">&lt;WIKTOR&gt;</span>
              <p className="text-gray-500 font-sans font-light mt-0.5 leading-snug">{activeProject.roles.wiktor}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
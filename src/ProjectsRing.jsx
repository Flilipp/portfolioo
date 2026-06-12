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

function TitleGroup({ project, index, rotationRef, activeIndexRef }) {
  const textRef = useRef();
  const angle = (index / 6) * Math.PI * 2;
  
  useFrame(() => {
    if (!textRef.current) return;
    const currentAngle = angle + rotationRef.current;
    textRef.current.position.x = Math.sin(currentAngle) * 3.5;
    textRef.current.position.z = Math.cos(currentAngle) * 3.5;
    textRef.current.position.y = -0.85;
    textRef.current.color = activeIndexRef.current === index ? "#C8A96E" : "#666666";
  });

  return (
    <Text ref={textRef} fontSize={0.13} font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff" anchorX="center" anchorY="middle">
      {project.title}
    </Text>
  );
}

function CardGroup({ project, index, count, rotationRef, activeIndexRef, setActiveIndex }) {
  const meshRef = useRef();
  const texture = useTexture(project.img);

  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const angle = (index / count) * Math.PI * 2;
  const radius = 3.4; 

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const currentAngle = angle + rotationRef.current;
    meshRef.current.position.x = Math.sin(currentAngle) * radius;
    meshRef.current.position.z = Math.cos(currentAngle) * radius;
    meshRef.current.rotation.y = currentAngle + Math.PI;

    const targetX = state.pointer.x * 0.05;
    const targetY = state.pointer.y * 0.05;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, currentAngle + Math.PI + targetX, 0.1);

    const isFront = Math.cos(currentAngle) > 0.88;
    if (isFront && activeIndexRef.current !== index) {
      activeIndexRef.current = index;
      setActiveIndex(index);
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <boxGeometry args={[2.4, 1.35, 0.02]} />
        <meshStandardMaterial map={texture} roughness={0.5} metalness={0.1} transparent={true} opacity={activeIndexRef.current === index ? 1.0 : 0.25} />
      </mesh>
    </group>
  );
}

function SceneFloor() {
  const gridRef = useRef();
  useFrame((state) => {
    if (!gridRef.current) return;
    gridRef.current.position.z = (state.clock.getElapsedTime() * 0.03) % 1;
  });
  return (
    <group position={[0, -1.2, 0]}>
      <pointLight distance={6} intensity={1.5} color="#C8A96E" position={[0, 0.5, 0]} />
      <gridHelper ref={gridRef} args={[30, 30, "#C8A96E", "#1a1a1a"]} />
    </group>
  );
}

function Scene({ rotationRef, velocityRef, isHovered, activeIndexRef, setActiveIndex, baseIndexRef }) {
  const isMovingToTarget = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!isHovered) return;
      e.preventDefault();

      // Jeśli skrypt właśnie centruje nową kartę, ignorujemy nowe impulsy na ułamek sekundy, żeby zachować spójność
      if (isMovingToTarget.current) return;

      // Dodajemy bezpośredni impuls prędkości (czułość dopasowana pod system)
      velocityRef.current += e.deltaY * 0.00015;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isHovered]);

  useFrame(() => {
    const step = (Math.PI * 2) / projectsData.length;
    const currentBaseRotation = -baseIndexRef.current * step;

    // 1. Aplikowanie prędkości
    rotationRef.current -= velocityRef.current;
    velocityRef.current *= 0.88; // Hamowanie pędu

    // Obliczamy aktualne fizyczne wychylenie ringu od punktu początkowego obecnej karty
    const diff = rotationRef.current - currentBaseRotation;

    // 2. NOWA LOGIKA SPRĘŻYNY I PRZESKOKU (Na bazie odległości kątowej)
    if (!isMovingToTarget.current) {
      // PROG PRZEBITY: Jeśli użytkownik wychylił pierścień o więcej niż 15% odległości między kartami
      if (Math.abs(diff) > step * 0.15) {
        const direction = Math.sign(diff);
        let nextIndex = baseIndexRef.current + direction;

        // Blokada indeksów w zakresie tablicy projektów (0 do 5)
        if (nextIndex >= 0 && nextIndex < projectsData.length) {
          baseIndexRef.current = nextIndex;
          isMovingToTarget.current = true;
          velocityRef.current = 0; // Zerujemy pęd, oddajemy kontrolę interpolacji LERP
        }
      } 
      // OPÓR: Jeśli ruch był zbyt mały, elastyczna sprężyna ściąga pierścień z powrotem na środek obecnego projektu
      else if (Math.abs(velocityRef.current) < 0.001) {
        rotationRef.current = THREE.MathUtils.lerp(rotationRef.current, currentBaseRotation, 0.1);
      }
    }

    // 3. MIĘKKIE I SZYBKIE CENTROWANIE NA DOCELOWYM PROJEKCIE
    if (isMovingToTarget.current) {
      const targetRotation = -baseIndexRef.current * step;
      rotationRef.current = THREE.MathUtils.lerp(rotationRef.current, targetRotation, 0.14);

      // Warunek stopu – pierścień idealnie siedzi na środku
      if (Math.abs(rotationRef.current - targetRotation) < 0.001) {
        rotationRef.current = targetRotation;
        velocityRef.current = 0;
        isMovingToTarget.current = false;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 5, 5]} intensity={0.5} color="#ffffff" />
      <SceneFloor />
      
      <group position={[0, 0.1, -2.5]}>
        {projectsData.map((project, idx) => (
          <React.Fragment key={project.id}>
            <CardGroup project={project} index={idx} count={projectsData.length} rotationRef={rotationRef} activeIndexRef={activeIndexRef} setActiveIndex={setActiveIndex} />
            <TitleGroup project={project} index={idx} rotationRef={rotationRef} activeIndexRef={activeIndexRef} />
          </React.Fragment>
        ))}
      </group>
    </>
  );
}

export default function ProjectsRing() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const activeIndexRef = useRef(0);
  const baseIndexRef = useRef(0); // Punkt odniesienia sprężyny

  const activeProject = projectsData[currentProjectIndex];

  const pushCarousel = (direction) => {
    const step = (Math.PI * 2) / projectsData.length;
    let nextIndex = baseIndexRef.current + (direction === 'next' ? 1 : -1);
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex > projectsData.length - 1) nextIndex = projectsData.length - 1;
    
    baseIndexRef.current = nextIndex;
  };

  return (
    <section id="projects" className="w-full min-h-screen bg-transparent py-20 px-4 md:px-12 flex flex-col justify-center items-center relative">
      <div className="text-center mb-6 font-mono text-xs text-gray-500 pointer-events-none tracking-widest relative z-10">
        <span className="text-[#C8A96E] font-bold">// ELASTIC VAULT INSTANCE</span> — PRZEWIŃ ENERGICZNIE, ABY SKOCZYĆ / LEKKI RUCH ODBIJA
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* PANEL LEWY */}
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

        {/* PANEL ŚRODKOWY */}
        <div className="lg:col-span-6 flex flex-col items-center gap-4 order-1 lg:order-2 w-full">
          <div 
            className="relative w-full h-[55vh] bg-[#111111] border border-[#C8A96E]/20 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300 hover:border-[#C8A96E]/40"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }}>
              <Suspense fallback={null}>
                <Scene 
                  rotationRef={rotationRef}
                  velocityRef={velocityRef}
                  isHovered={isHovered}
                  activeIndexRef={activeIndexRef}
                  setActiveIndex={setCurrentProjectIndex}
                  baseIndexRef={baseIndexRef}
                />
              </Suspense>
            </Canvas>

            <div className="absolute inset-x-0 bottom-6 z-20 pointer-events-none text-center">
              <h2 className="text-2xl font-bold tracking-tight text-[#C8A96E] font-mono uppercase">
                {activeProject.title}
              </h2>
            </div>

            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-[10px] z-20 flex flex-col items-center gap-1">
              <span className="text-[#C8A96E] font-bold">0{activeProject.id}</span>
              <span className="text-gray-600">/06</span>
            </div>
          </div>

          {/* MOBILNE GUZIKI (UKRYTE NA PC) */}
          <div className="flex gap-6 mt-1 md:hidden">
            <button onClick={() => pushCarousel('prev')} className="border border-[#C8A96E]/20 hover:border-[#C8A96E] bg-[#111111] text-[#C8A96E] font-mono text-xs tracking-widest px-5 py-2.5 rounded transition-all duration-300">&lt; PREV</button>
            <button onClick={() => pushCarousel('next')} className="border border-[#C8A96E]/20 hover:border-[#C8A96E] bg-[#111111] text-[#C8A96E] font-mono text-xs tracking-widest px-5 py-2.5 rounded transition-all duration-300">NEXT &gt;</button>
          </div>
        </div>

        {/* PANEL PRAWY */}
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
import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Baza danych projektów (zmienione zdjęcia na monochromatyczne)
const projectsData = [
  { 
    id: 1, 
    title: "ALPHA", 
    tech: ["React", "Node.js", "Docker", "PostgreSQL"], 
    color: "#00f0ff", // CYAN
    img: "/projects/projekt1.jpg",
    desc: "Ekskluzywna platforma webowa z pełną automatyzacją danych. Skupienie na architekturze i czystym kodzie.",
    challenge: "Optymalizacja zapytań SQL i skrócenie czasu odpowiedzi API o 40%.",
    roles: { filip: "Architektura bazy danych, REST API, Docker", wiktor: "Projekt UI/UX, State Management w React" }
  },
  { 
    id: 2, 
    title: "NEXUS", 
    tech: ["Python", "FastAPI", "Tailwind CSS", "Redis"], 
    color: "#ff007f", // FUCHSIA
    img: "/projects/projekt2.jpg",
    desc: "Aplikacja WWW oparta na zaawansowanych skryptach asynchronicznych. Przetwarzanie danych w czasie rzeczywistym.",
    challenge: "Zarządzanie wątkami przy dużym obciążeniu i integracja WebSockets.",
    roles: { filip: "Logika asynchroniczna, skrypty Pythona", wiktor: "Stylowanie Tailwind, dynamiczne mikro-animacje" }
  },
  { 
    id: 3, 
    title: "CORE", 
    tech: ["HTML5", "TypeScript", "Sass", "Web Audio API"], 
    color: "#00ff66", // GREEN
    img: "/projects/projekt3.jpg",
    desc: "Interaktywna strona multimedialna stawiająca na najwyższy standard responsywności i semantyki.",
    challenge: "Zachowanie płynności 60fps przy jednoczesnym renderowaniu audio i efektów CSS.",
    roles: { filip: "Skrypty TypeScript, obsługa Web Audio", wiktor: "Struktura DOM, zaawansowane arkusze Sass" }
  },
  { 
    id: 4, 
    title: "PRISM", 
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Supabase"], 
    color: "#7000ff", // PURPLE
    img: "/projects/projekt4.jpg",
    desc: "Nowoczesny portal w technologii komponentowej z dynamicznym renderowaniem po stronie serwera (SSR).",
    challenge: "Zbudowanie bezpiecznego systemu autoryzacji opartego na tokenach JWT.",
    roles: { filip: "Integracja z Supabase, polityki bezpieczeństwa RLS", wiktor: "Komponenty wielokrotnego użytku, animacje wejścia" }
  },
  { 
    id: 5, 
    title: "VORTEX", 
    tech: ["PHP", "MySQL", "JavaScript", "Bootstrap"], 
    color: "#ffaa00", // ORANGE
    img: "/projects/projekt5.jpg",
    desc: "Dynamiczny system zarządzania treścią z dedykowanym panelem administracyjnym i bezpieczną bazą.",
    challenge: "Zabezpieczenie skryptów przed atakami typu SQL Injection oraz XSS.",
    roles: { filip: "Walidacja danych backendu, zapytania przygotowane PDO", wiktor: "Logika formularzy JS, widoki panelu admina" }
  },
  { 
    id: 6, 
    title: "QUANTUM", 
    tech: ["WebGL", "Three.js", "React Three Fiber", "GLSL"], 
    color: "#ffffff", // WHITE
    img: "/projects/projekt6.jpg",
    desc: "Zaawansowana witryna eksperymentalna wykorzystująca grafikę trójwymiarową renderowaną na żywo w GPU.",
    challenge: "Napisanie wydajnych shaderów i optymalizacja geometrii pod słabsze procesory.",
    roles: { filip: "Matematyka wektorowa, konfiguracja sceny i oświetlenia", wiktor: "Mapowanie tekstur, ostry design UI nakładki" }
  },
];

// Osobna grupa dla tytułu pod projektem (trzyma napisy prosto)
function TitleGroup({ project, index, scrollRotation, activeIndexRef, targetRotation }) {
  const textRef = useRef();
  
  useFrame(() => {
    if (!textRef.current) return;
    
    // Obliczamy aktualny kąt dla napisu w pierścieniu
    const angle = (index / 6) * Math.PI * 2;
    const currentAngle = angle + scrollRotation.current;
    
    // Napisy trzymają stałą pozycję pod kartą, ale nie obracają się wokół własnej osi Y (stoją prosto)
    textRef.current.position.x = Math.sin(currentAngle) * 3.6;
    textRef.current.position.z = Math.cos(currentAngle) * 3.6;
    textRef.current.position.y = -0.82; // Stała wysokość pod kartą

    // Subtelna zmiana koloru przy hoverze
    textRef.current.color = activeIndexRef.current === index ? "#C8A96E" : "#ffffff";
  });

  return (
    <Text
      ref={textRef}
      fontSize={0.13}
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      anchorX="center"
      anchorY="middle"
    >
      {project.title}
    </Text>
  );
}

// Osobna grupa dla karty (trzyma zdjęcie i zarządza logiką)
function CardGroup({ project, index, count, scrollRotation, activeIndexRef, setActiveIndex }) {
  const meshRef = useRef();
  const texture = useTexture(project.img);

  // Bezpieczne filtry dla zachowania ostrości tekstury
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  // Używamy useFrame, żeby obliczyć pozycję karty w pierścieniu
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Obliczamy aktualny kąt dla karty w pierścieniu
    const angle = (index / count) * Math.PI * 2;
    const currentAngle = angle + scrollRotation.current;
    
    // Ustawiamy pozycję karty (x, z) i obracamy ją wokół osi Y (żeby front był do kamery)
    meshRef.current.position.x = Math.sin(currentAngle) * 3.5;
    meshRef.current.position.z = Math.cos(currentAngle) * 3.5;
    meshRef.current.rotation.y = currentAngle + Math.PI; // Front do kamery

    // Subtelny efekt pod ruchem myszy
    const targetX = state.pointer.x * 0.08;
    const targetY = state.pointer.y * 0.08;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, currentAngle + Math.PI + targetX, 0.1);

    // Sprawdzamy, czy karta jest z przodu (frontem do kamery)
    const isFront = Math.cos(currentAngle) > 0.85;
    if (isFront && activeIndexRef.current !== index) {
      activeIndexRef.current = index;
      setActiveIndex(index);
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        {/* Grubość 0.02 dla kinowego formatu */}
        <boxGeometry args={[2.4, 1.35, 0.02]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.5}
          metalness={0.1}
          transparent={true}
          // Płynne przyciemnienie nieaktywnych zamiast zmiany koloru
          opacity={activeIndexRef.current === index ? 1.0 : 0.35}
        />
      </mesh>
    </group>
  );
}

// Osobna grupa dla podłogi 3D
function SceneFloor() {
  const gridRef = useRef();
  useFrame((state) => {
    if (!gridRef.current) return;
    // Delikatny ruch siatki w tył
    gridRef.current.position.z = (state.clock.getElapsedTime() * 0.05) % 1;
  });
  return (
    <group position={[0, -1.2, 0]}>
      {/* Dynamiczne światło rzucane na siatkę */}
      <pointLight distance={6} intensity={1.5} color="#C8A96E" position={[0, 0.5, 0]} />
      <gridHelper ref={gridRef} args={[30, 30, "#C8A96E", "#222222"]} />
    </group>
  );
}

// Komponent silnika logiki sceny 3D
function Scene({ scrollRotation, targetRotation, activeIndexRef, setActiveIndex, isHovered }) {
  useEffect(() => {
    const handleWheel = (e) => {
      if (!isHovered) return;

      const rotationStep = e.deltaY * 0.0025;
      const nextRotation = targetRotation.current + rotationStep;

      const minRotation = -((projectsData.length - 1) * (Math.PI * 2 / projectsData.length));
      const maxRotation = 0;

      // Jeśli jesteśmy na krańcach projektów (1 lub 6) i scrollujemy dalej na zewnątrz, puszczamy blokadę
      if (
        (e.deltaY > 0 && nextRotation < minRotation) || 
        (e.deltaY < 0 && nextRotation > maxRotation)
      ) {
        document.body.style.overflow = 'auto'; // Odblokowanie body w locie
        return; 
      }

      // Wewnątrz pierścienia blokujemy domyślny scroll i kręcimy modelami 3D
      e.preventDefault();
      document.body.style.overflow = 'hidden'; // Blokada body podczas kręcenia pierścieniem
      targetRotation.current = Math.min(Math.max(nextRotation, minRotation), maxRotation);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = 'auto'; // Czyszczenie przy unmouncie
    };
  }, [isHovered]);

  // Płynny obrót pierścienia za pomocą LERP
  useFrame(() => {
    scrollRotation.current = THREE.MathUtils.lerp(scrollRotation.current, targetRotation.current, 0.08);
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 5, 5]} intensity={0.5} color="#ffffff" />
      <SceneFloor />
      
      {/* COFNIĘCIE GRUPY: Przesuwamy cały pierścień głębiej */}
      <group position={[0, 0.1, -2.5]}>
        {projectsData.map((project, idx) => (
          <React.Fragment key={project.id}>
            {/* Osobna grupa dla karty (zdjęcie, logika obrotu) */}
            <CardGroup 
              project={project} 
              index={idx} 
              count={projectsData.length} 
              scrollRotation={scrollRotation} 
              activeIndexRef={activeIndexRef} 
              setActiveIndex={setActiveIndex} 
            />
            {/* Osobna grupa dla tytułu pod projektem (trzyma napisy prosto) */}
            <TitleGroup 
              project={project} 
              index={idx} 
              scrollRotation={scrollRotation} 
              activeIndexRef={activeIndexRef} 
              targetRotation={targetRotation}
            />
          </React.Fragment>
        ))}
      </group>
    </>
  );
}

// Główny komponent sekcji projektów
export default function ProjectsRing() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // Czysty stan Reacta

  // Referencje do śledzenia logiki
  const scrollRotation = useRef(0);
  const targetRotation = useRef(0);
  const activeIndexRef = useRef(0); // Do blokowania re-renderów stanu

  // Wybrany projekt (z bazy danych)
  const activeProject = projectsData[activeIndex];

  return (
    // id="projects" dla kotwicy HTML w Hero.jsx
    <section id="projects" className="w-full min-h-screen bg-transparent py-20 px-4 md:px-12 flex flex-col justify-center items-center relative">
      
      {/* Informacja nad panelem */}
      <div className="text-center mb-6 font-mono text-xs text-gray-500 pointer-events-none tracking-widest relative z-10">
        <span className="text-[#C8A96E] font-bold">// TECH INSTANCE</span> — SCROLLUJ NAD OKNEM, ABY OBRÓCIĆ
      </div>

      {/* GŁÓWNY PANEL: SIATKA 3-KOLUMNOWA */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* PANEL LEWY: OPIS I WYZWANIE (Zajmuje 3 kolumny z 12) */}
        <div className="lg:col-span-3 text-white font-mono flex flex-col gap-6 order-2 lg:order-1 transition-all duration-300">
          <div className="border-l border-[#C8A96E] pl-4">
            <span className="text-[#C8A96E] text-[10px] tracking-widest block uppercase">// OPIS PROJEKTU</span>
            <p className="text-gray-400 font-sans font-light text-sm mt-1 leading-relaxed whitespace-normal">
              {activeProject.desc}
            </p>
          </div>

          <div className="border-l border-white/20 pl-4">
            <span className="text-gray-400 text-[10px] tracking-widest block uppercase">// WYZWANIE TECHNICZNE</span>
            <p className="text-gray-500 font-sans font-light text-sm mt-1 leading-relaxed whitespace-normal">
              {activeProject.challenge}
            </p>
          </div>
        </div>

        {/* PANEL ŚRODKOWY: OKNO INTERAKTYWNE 3D (Zajmuje 6 kolumn z 12) */}
        <div 
          className="lg:col-span-6 relative w-full h-[60vh] bg-[#111111] border border-[#C8A96E]/20 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300 hover:border-[#C8A96E]/40 order-1 lg:order-2"
          // Obsługa hovera bezpośrednio w stanie Reacta
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); document.body.style.overflow = 'auto'; }} // Reset
        >
          {/* Ustawienie pozycji kamery na Z: 4.2 – dodatkowo oddala widok w kadrze */}
          <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }}>
            <Suspense fallback={null}>
              <Scene 
                scrollRotation={scrollRotation} 
                targetRotation={targetRotation} 
                activeIndexRef={activeIndexRef} 
                setActiveIndex={setActiveIndex} 
                isHovered={isHovered}
              />
            </Suspense>
          </Canvas>

          {/* Nazwa projektu wyśrodkowana na dole okna 3D */}
          <div className="absolute inset-x-0 bottom-6 z-20 pointer-events-none text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[#C8A96E] font-mono uppercase transition-colors duration-500">
              {activeProject.title}
            </h2>
          </div>

          {/* Mały licznik boczny */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-[10px] z-20 flex flex-col items-center gap-1">
            <span className="text-[#C8A96E] font-bold">0{activeProject.id}</span>
            <span className="text-gray-600">/06</span>
          </div>
        </div>

        {/* PANEL PRAWY: ROZBUDOWANY TECH STACK I PODZIAŁ RÓL (Zajmuje 3 kolumny z 12) */}
        <div className="lg:col-span-3 text-white font-mono flex flex-col gap-6 order-3 transition-all duration-300">
          <div>
            <span className="text-fuchsia-400 text-[10px] tracking-widest block uppercase mb-2">// UŻYTE TECHNOLOGIE</span>
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
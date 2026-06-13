import { useRef, useState, useEffect, useSyncExternalStore, Suspense, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import ErrorBoundary from './ErrorBoundary';

const projectsData = [
  {
    id: 1,
    title: 'MAKEFORGE',
    tagline: 'Portfolio technologiczne młodego robotyka — prezentuje własne projekty (roboty, gadżety, AI) razem z pełną dokumentacją techniczną.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Arduino'],
    gallery: [
      { src: '/projects/makeforge-hero.jpg', label: 'Strona startowa' },
      { src: '/projects/makeforge-projects.jpg', label: 'Sekcja projektów' },
    ],
    desc: 'Portfolio technologiczne z interaktywnymi kartami projektów (WearAI, Pusheen Arcade, Projekt Chimera) oraz rozbudowaną dokumentacją hardware/software — od UI po kod Arduino i symulację robota.',
    challenge: 'Spójny dark-mode design i czytelna prezentacja zarówno frontendu, jak i głębokiej dokumentacji technicznej.',
    roles: {
      filip: 'Integracja hardware–software, protokół Bluetooth, logika sterowania silnikami',
      wiktor: 'Frontend React, design system, animacje i sekcja projektów',
    },
  },
  {
    id: 2,
    title: 'SEEGEST',
    tagline: 'Aplikacja społecznościowa, w której namierzysz osoby mijane w mieście i umówisz się z nimi na spotkanie.',
    tech: ['React', 'Google Maps', 'REST API', 'CSS'],
    gallery: [
      { src: '/projects/seegest-home.jpg', label: 'Panel główny — kalendarz' },
      { src: '/projects/seegest-map.jpg', label: 'Mapa wydarzeń' },
    ],
    desc: 'Platforma do zgłaszania i wyszukiwania lokalnych wydarzeń. Kalendarz z filtrami czasowymi, interaktywna mapa miasta i system postów z lokalizacją.',
    challenge: 'Responsywny layout z sidebarem, wielokolumnowym kalendarzem i mapą — spójny przepływ od wyszukiwania po szczegóły wydarzenia.',
    roles: {
      filip: 'Backend API, autoryzacja, logika wyszukiwania i mapy',
      wiktor: 'UI komponenty, responsywny layout, panel konta i postów',
    },
  },
  {
    id: 3,
    title: 'AMBERDATA HUB',
    tagline: 'Strona-hub, która zbiera wszystkie nasze projekty w jednym miejscu — jak strona startowa firmy technologicznej.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    gallery: [
      { src: '/projects/amberdata-hero.jpg', label: 'Strona startowa hubu' },
      { src: '/projects/amberdata-projects.jpg', label: 'Kafelki projektów' },
    ],
    desc: 'Centralny hub prezentujący ekosystem naszych projektów — od platformy danych i AI, przez moduły eksperymentalne, po showcase multimedialny. Każda karta to żywy podgląd osobnego produktu z jednego, spójnego miejsca.',
    challenge: 'Zaprojektowanie jednego, eleganckiego punktu wejścia do kilku różnych produktów bez utraty ich indywidualnego charakteru.',
    roles: {
      filip: 'Architektura danych, integracja API poszczególnych modułów',
      wiktor: 'UI hubu, system kart projektów, responsywność',
    },
  },
  {
    id: 4,
    title: 'TRATTORIA ROSSO',
    tagline: 'Strona internetowa dla włoskiej restauracji — apetyczne menu, galeria dań i rezerwacja stolika online.',
    tech: ['HTML', 'Tailwind CSS', 'Responsywny design'],
    gallery: [
      { src: '/projects/rosso/hero.jpg', label: 'Strona startowa' },
      { src: '/projects/rosso/menu.jpg', label: 'Karta menu' },
    ],
    desc: 'Strona promocyjna restauracji z podziałem menu na kategorie (antipasti, pasta, pizza, dolci), sekcją "nasza historia", galerią dań i formularzem rezerwacji stolika.',
    challenge: 'Zbudowanie ciepłego, "apetycznego" nastroju przy użyciu samej typografii, koloru i prostych ilustracji — bez prawdziwych zdjęć potraw.',
    roles: {
      filip: 'Struktura treści, opisy dań i menu, dane kontaktowe',
      wiktor: 'Layout, paleta kolorów, komponenty UI i formularz rezerwacji',
    },
  },
  {
    id: 5,
    title: 'VELORA',
    tagline: 'Sklep internetowy z modą — przegląd kolekcji, karty produktów i zapis do newslettera z rabatem.',
    tech: ['HTML', 'Tailwind CSS', 'E-commerce UI'],
    gallery: [
      { src: '/projects/velora/hero.jpg', label: 'Strona startowa' },
      { src: '/projects/velora/collection.jpg', label: 'Kolekcja sezonowa' },
    ],
    desc: 'Strona sklepu odzieżowego z prezentacją kolekcji sezonowej, siatką produktów bestsellerowych i sekcją "o marce" budującą wizerunek premium.',
    challenge: 'Edytorialski, "modowy" styl — duża typografia, dużo przestrzeni i spokojna, jednolita paleta barw.',
    roles: {
      filip: 'Struktura kategorii produktów, opisy i ceny',
      wiktor: 'Layout, typografia, siatka produktów i formularz newslettera',
    },
  },
  {
    id: 6,
    title: 'PULSEFIT',
    tagline: 'Strona siłowni z grafikiem zajęć, cennikiem karnetów i zapisami na trening — mocny, energetyczny design.',
    tech: ['HTML', 'Tailwind CSS', 'Responsywny design'],
    gallery: [
      { src: '/projects/pulsefit/hero.jpg', label: 'Strona startowa' },
      { src: '/projects/pulsefit/pricing.jpg', label: 'Cennik karnetów' },
    ],
    desc: 'Strona klubu fitness z sekcją statystyk, grafikiem zajęć grupowych, profilami trenerów oraz trzema planami cenowymi karnetów.',
    challenge: 'Mocny, kontrastowy design (czarny + neonowa zieleń) i czytelna tabela grafiku zajęć na urządzeniach mobilnych.',
    roles: {
      filip: 'Struktura grafiku zajęć, dane trenerów i cennik',
      wiktor: 'Layout, paleta neonowa, tabela zajęć i karty cenowe',
    },
  },
  {
    id: 7,
    title: 'GLOW STUDIO',
    tagline: 'Strona salonu kosmetycznego z cennikiem usług, galerią metamorfoz i rezerwacją wizyt online.',
    tech: ['HTML', 'Tailwind CSS', 'Responsywny design'],
    gallery: [
      { src: '/projects/glow/hero.jpg', label: 'Strona startowa' },
      { src: '/projects/glow/services.jpg', label: 'Cennik usług' },
    ],
    desc: 'Strona salonu beauty z cennikiem usług podzielonym na kategorie (twarz, paznokcie, masaże), galerią metamorfoz, opiniami klientek i formularzem rezerwacji.',
    challenge: 'Stworzenie eleganckiej, pastelowej atmosfery spa przy zachowaniu przejrzystego cennika i czytelnego formularza.',
    roles: {
      filip: 'Struktura cennika, opinie klientek, dane kontaktowe',
      wiktor: 'Layout, paleta pastelowa, galeria i formularz rezerwacji',
    },
  },
  {
    id: 8,
    title: 'ROOT & BLOOM',
    tagline: 'Sklep z roślinami i akcesoriami ogrodniczymi — katalog roślin, poradnik pielęgnacji i dostawa do domu.',
    tech: ['HTML', 'Tailwind CSS', 'Responsywny design'],
    gallery: [
      { src: '/projects/rootbloom/hero.jpg', label: 'Strona startowa' },
      { src: '/projects/rootbloom/shop.jpg', label: 'Katalog roślin' },
    ],
    desc: 'Strona sklepu z roślinami doniczkowymi i akcesoriami — katalog bestsellerów, sekcja akcesoriów, poradnik pielęgnacji i zapis do newslettera.',
    challenge: 'Naturalny, "ekologiczny" charakter marki — ciepła, ziemista paleta i przejrzysta prezentacja produktów bez prawdziwych zdjęć.',
    roles: {
      filip: 'Struktura katalogu roślin, opisy i poradnik pielęgnacji',
      wiktor: 'Layout, paleta naturalna, siatka produktów i sekcje informacyjne',
    },
  },
];

function useIsMobile(breakpoint = 1024) {
  const subscribe = useCallback((callback) => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    mq.addEventListener('change', callback);
    return () => mq.removeEventListener('change', callback);
  }, [breakpoint]);

  const getSnapshot = useCallback(() => window.innerWidth < breakpoint, [breakpoint]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

const MAX_W = 3.78;
const MAX_H = 2.1;

function CardGroup({ imageSrc, index, count, rotationRef, activeIndexRef, onBecomeActive }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const backingRef = useRef();
  const texture = useTexture(imageSrc, (tex) => {
    const t = Array.isArray(tex) ? tex[0] : tex;
    t.colorSpace = THREE.SRGBColorSpace;
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.needsUpdate = true;
  });

  const imgAspect = texture.image ? texture.image.width / texture.image.height : 16 / 9;
  const boxAspect = MAX_W / MAX_H;
  let planeW;
  let planeH;
  if (imgAspect > boxAspect) {
    planeW = MAX_W;
    planeH = MAX_W / imgAspect;
  } else {
    planeH = MAX_H;
    planeW = MAX_H * imgAspect;
  }

  const angle = (index / count) * Math.PI * 2;
  const radius = 4.2;

  useFrame((state) => {
    if (!meshRef.current) return;

    const currentAngle = angle + rotationRef.current;
    meshRef.current.position.x = Math.sin(currentAngle) * radius;
    meshRef.current.position.z = Math.cos(currentAngle) * radius;

    const targetX = state.pointer.x * 0.05;
    const targetY = state.pointer.y * 0.05;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      currentAngle + targetX,
      0.1
    );

    const isFront = Math.cos(currentAngle) > 0.88;
    if (isFront && activeIndexRef.current !== index) {
      activeIndexRef.current = index;
      onBecomeActive(index);
    }

    const isActive = activeIndexRef.current === index;
    const targetOpacity = isActive ? 1.0 : 0.28;
    const targetScale = isActive ? 1.0 : 0.92;

    if (materialRef.current) {
      materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, targetOpacity, 0.08);
    }
    if (backingRef.current) {
      backingRef.current.material.opacity = THREE.MathUtils.lerp(
        backingRef.current.material.opacity,
        isActive ? 0.9 : 0.35,
        0.08
      );
    }
    const currentScale = meshRef.current.scale.x;
    const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.08);
    meshRef.current.scale.setScalar(nextScale);
  });

  return (
    <group ref={meshRef}>
      <mesh ref={backingRef} position={[0, 0, -0.03]}>
        <planeGeometry args={[planeW + 0.12, planeH + 0.12]} />
        <meshStandardMaterial color="#0c0c0c" roughness={0.9} transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <planeGeometry args={[planeW, planeH]} />
        <meshStandardMaterial
          ref={materialRef}
          map={texture}
          roughness={0.45}
          metalness={0.05}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function SceneFloor() {
  return (
    <group position={[0, -1.3, 0]}>
      <pointLight distance={7} intensity={2.2} color="#C8A96E" position={[0, 0.6, 0]} />
      <gridHelper args={[30, 30, '#C8A96E', '#1a1a1a']} />
    </group>
  );
}

function Scene({
  rotationRef,
  velocityRef,
  activeIndexRef,
  onBecomeActive,
  baseIndexRef,
  isMovingToTargetRef,
  previewImages,
}) {
  const count = projectsData.length;

  useFrame(() => {
    const step = (Math.PI * 2) / count;
    const currentBaseRotation = -baseIndexRef.current * step;

    rotationRef.current -= velocityRef.current;
    velocityRef.current *= 0.88;

    const diff = rotationRef.current - currentBaseRotation;

    if (!isMovingToTargetRef.current) {
      if (Math.abs(diff) > step * 0.15) {
        const direction = Math.sign(diff);
        baseIndexRef.current -= direction;
        isMovingToTargetRef.current = true;
        velocityRef.current = 0;
      } else if (Math.abs(velocityRef.current) < 0.001) {
        rotationRef.current = THREE.MathUtils.lerp(rotationRef.current, currentBaseRotation, 0.1);
      }
    }

    if (isMovingToTargetRef.current) {
      const targetRotation = -baseIndexRef.current * step;
      rotationRef.current = THREE.MathUtils.lerp(rotationRef.current, targetRotation, 0.14);

      if (Math.abs(rotationRef.current - targetRotation) < 0.001) {
        rotationRef.current = targetRotation;
        velocityRef.current = 0;
        isMovingToTargetRef.current = false;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[0, 5, 5]} intensity={0.6} color="#ffffff" />
      <pointLight position={[0, 1.5, -4]} intensity={1.2} color="#C8A96E" distance={10} />
      <SceneFloor />

      <group position={[0, 0.1, -2.5]}>
        {projectsData.map((project, idx) => (
          <CardGroup
            key={`${project.id}-${previewImages[project.id]}`}
            imageSrc={previewImages[project.id]}
            index={idx}
            count={count}
            rotationRef={rotationRef}
            activeIndexRef={activeIndexRef}
            onBecomeActive={onBecomeActive}
          />
        ))}
      </group>
    </>
  );
}

function ProjectPreview({ src, title, className = '' }) {
  return (
    <div className={`relative w-full h-full bg-[#0a0a0a] ${className}`}>
      <img
        src={src}
        alt={`Podgląd projektu ${title}`}
        className="w-full h-full object-contain"
        draggable={false}
      />
    </div>
  );
}

function MobileProjectViewer({
  project,
  projectIndex,
  totalProjects,
  galleryIndex,
  onPrevProject,
  onNextProject,
  onPrevGallery,
  onNextGallery,
}) {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const shot = project.gallery[galleryIndex];

  return (
    <div
      className="w-full"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
      }}
      onTouchEnd={(e) => {
        const dx = touchStartX.current - e.changedTouches[0].clientX;
        const dy = touchStartY.current - e.changedTouches[0].clientY;
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;

        if (dx > 0) {
          if (galleryIndex < project.gallery.length - 1) onNextGallery();
          else onNextProject();
        } else {
          if (galleryIndex > 0) onPrevGallery();
          else onPrevProject();
        }
      }}
    >
      <div className="relative w-full aspect-[16/9] bg-[#0a0a0a] border border-[#C8A96E]/20 rounded-2xl overflow-hidden shadow-lg">
        <ProjectPreview src={shot.src} title={project.title} />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 py-3">
          <h2 className="text-lg font-bold tracking-tight text-[#C8A96E] font-mono uppercase">
            {project.title}
          </h2>
          <p className="text-[10px] text-gray-400 font-mono mt-0.5">{shot.label}</p>
        </div>
        <div className="absolute right-3 top-3 text-gray-400 font-mono text-[10px] bg-black/50 px-2 py-1 rounded">
          <span className="text-[#C8A96E] font-bold">0{project.id}</span>
          <span className="text-gray-600"> /0{totalProjects}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 gap-3">
        <button
          onClick={() => (galleryIndex > 0 ? onPrevGallery() : onPrevProject())}
          disabled={projectIndex === 0 && galleryIndex === 0}
          className="flex-1 border border-[#C8A96E]/20 hover:border-[#C8A96E] disabled:opacity-30 disabled:pointer-events-none bg-[#111111] text-[#C8A96E] font-mono text-xs tracking-widest px-4 py-2.5 rounded transition-all"
        >
          &lt; PREV
        </button>

        <div className="flex gap-1.5 shrink-0">
          {project.gallery.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === galleryIndex ? 'w-5 bg-[#C8A96E]' : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() =>
            galleryIndex < project.gallery.length - 1 ? onNextGallery() : onNextProject()
          }
          disabled={
            projectIndex === totalProjects - 1 && galleryIndex === project.gallery.length - 1
          }
          className="flex-1 border border-[#C8A96E]/20 hover:border-[#C8A96E] disabled:opacity-30 disabled:pointer-events-none bg-[#111111] text-[#C8A96E] font-mono text-xs tracking-widest px-4 py-2.5 rounded transition-all"
        >
          NEXT &gt;
        </button>
      </div>

      <p className="text-center text-[10px] text-gray-600 font-mono mt-2 tracking-wider">
        przesuń w bok — najpierw zdjęcia, potem projekty
      </p>
    </div>
  );
}

export default function ProjectsRing() {
  const [view, setView] = useState(() => ({
    index: 0,
    gallery: Object.fromEntries(projectsData.map((p) => [p.id, 0])),
    preview: Object.fromEntries(projectsData.map((p) => [p.id, p.gallery[0].src])),
  }));
  const isMobile = useIsMobile();
  const carouselRef = useRef(null);

  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const activeIndexRef = useRef(0);
  const baseIndexRef = useRef(0);
  const isMovingToTargetRef = useRef(false);

  const currentProjectIndex = view.index;
  const activeProject = projectsData[currentProjectIndex];
  const activePreview = view.preview[activeProject.id];
  const galleryIndex = view.gallery[activeProject.id] ?? 0;
  const previewImages = view.preview;
  const count = projectsData.length;

  const goToIndex = useCallback((nextIndex) => {
    const wrapped = ((nextIndex % count) + count) % count;
    const currentMod = ((baseIndexRef.current % count) + count) % count;
    let delta = wrapped - currentMod;
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;

    baseIndexRef.current += delta;
    activeIndexRef.current = wrapped;
    isMovingToTargetRef.current = true;
    velocityRef.current = 0;
    const project = projectsData[wrapped];
    setView((prev) => ({
      index: wrapped,
      gallery: { ...prev.gallery, [project.id]: 0 },
      preview: { ...prev.preview, [project.id]: project.gallery[0].src },
    }));
  }, [count]);

  const setGalleryForProject = (projectId, index) => {
    const project = projectsData.find((p) => p.id === projectId);
    if (!project) return;
    const shot = project.gallery[index];
    if (!shot) return;
    setView((prev) => ({
      ...prev,
      gallery: { ...prev.gallery, [projectId]: index },
      preview: { ...prev.preview, [projectId]: shot.src },
    }));
  };

  const pushCarousel = (direction) => {
    goToIndex(currentProjectIndex + (direction === 'next' ? 1 : -1));
  };

  const handleBecomeActive = useCallback((index) => {
    setView((prev) => {
      if (prev.index === index) return prev;
      const project = projectsData[index];
      return {
        index,
        gallery: { ...prev.gallery, [project.id]: 0 },
        preview: { ...prev.preview, [project.id]: project.gallery[0].src },
      };
    });
  }, []);

  // Scroll kółkiem — zawsze aktywny nad karuzelą (desktop)
  useEffect(() => {
    if (isMobile) return;
    const container = carouselRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (isMovingToTargetRef.current) return;
      velocityRef.current += e.deltaY * 0.00015;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isMobile]);

  const staticFallback = (
    <ProjectPreview src={activePreview} title={activeProject.title} />
  );

  return (
    <section
      id="projects"
      className="w-full bg-transparent py-12 md:py-16 px-4 sm:px-6 lg:px-10 flex flex-col items-center relative"
    >
      <div className="text-center mb-6 md:mb-8 font-mono text-xs text-gray-500 pointer-events-none tracking-widest relative z-10 max-w-lg">
        <span className="text-[#C8A96E] font-bold">// ELASTIC VAULT INSTANCE</span>
        <span className="hidden md:inline"> — NAJEŻDŹ KURSOREM I PRZEWIŃ KÓŁKIEM</span>
        <span className="md:hidden block mt-1 text-gray-600">przesuń palcem w bok</span>
      </div>

      <div className="text-center mb-8 md:mb-10 max-w-2xl relative z-10 px-4">
        <p className="text-base sm:text-lg md:text-xl text-white font-semibold leading-snug">
          {activeProject.tagline}
        </p>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-5 items-start relative z-10">
        <div className="hidden lg:flex lg:col-span-2 text-white font-mono flex-col gap-4">
          <div className="border-l border-[#C8A96E] pl-4">
            <span className="text-[#C8A96E] text-[10px] tracking-widest block uppercase">
              // OPIS PROJEKTU
            </span>
            <p className="text-gray-400 font-sans font-light text-sm mt-1 leading-relaxed">
              {activeProject.desc}
            </p>
          </div>
          <div className="border-l border-white/20 pl-4">
            <span className="text-gray-400 text-[10px] tracking-widest block uppercase">
              // WYZWANIE TECHNICZNE
            </span>
            <p className="text-gray-500 font-sans font-light text-sm mt-1 leading-relaxed">
              {activeProject.challenge}
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col items-center gap-3 w-full">
          {isMobile ? (
            <MobileProjectViewer
              project={activeProject}
              projectIndex={currentProjectIndex}
              totalProjects={count}
              galleryIndex={galleryIndex}
              onPrevProject={() => pushCarousel('prev')}
              onNextProject={() => pushCarousel('next')}
              onPrevGallery={() => setGalleryForProject(activeProject.id, galleryIndex - 1)}
              onNextGallery={() => setGalleryForProject(activeProject.id, galleryIndex + 1)}
            />
          ) : (
            <div
              ref={carouselRef}
              className="relative w-full aspect-[16/9] max-h-[760px] bg-[#111111] border border-[#C8A96E]/20 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 hover:border-[#C8A96E]/40 cursor-grab active:cursor-grabbing"
            >
              <ErrorBoundary fallback={staticFallback}>
                <Canvas camera={{ position: [0, 0, 5.4], fov: 50 }}>
                  <Suspense fallback={null}>
                    <Scene
                      rotationRef={rotationRef}
                      velocityRef={velocityRef}
                      activeIndexRef={activeIndexRef}
                      onBecomeActive={handleBecomeActive}
                      baseIndexRef={baseIndexRef}
                      isMovingToTargetRef={isMovingToTargetRef}
                      previewImages={previewImages}
                    />
                  </Suspense>
                </Canvas>
              </ErrorBoundary>

              <div className="absolute inset-x-0 bottom-6 z-20 pointer-events-none text-center">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#C8A96E] font-mono uppercase">
                  {activeProject.title}
                </h2>
                <p className="text-xs text-gray-500 font-mono mt-1">
                  {activeProject.gallery[galleryIndex]?.label}
                </p>
              </div>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-[10px] z-20 flex flex-col items-center gap-1">
                <span className="text-[#C8A96E] font-bold">0{activeProject.id}</span>
                <span className="text-gray-600">/0{count}</span>
              </div>
            </div>
          )}

          <div className="flex gap-2 w-full justify-center flex-wrap">
            {activeProject.gallery.map((shot, i) => (
              <button
                key={shot.src}
                onClick={() => setGalleryForProject(activeProject.id, i)}
                title={shot.label}
                className={`group relative w-28 h-16 md:w-36 md:h-20 rounded-lg overflow-hidden border transition-all ${
                  galleryIndex === i
                    ? 'border-[#C8A96E] opacity-100 ring-1 ring-[#C8A96E]/40'
                    : 'border-white/10 opacity-60 hover:opacity-90'
                }`}
              >
                <img src={shot.src} alt={shot.label} className="w-full h-full object-contain bg-[#0a0a0a]" />
                <span className="absolute inset-x-0 bottom-0 bg-black/70 text-[8px] text-gray-300 font-mono px-1 py-0.5 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {shot.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 text-white font-mono flex flex-col gap-4">
          <div className="lg:hidden space-y-4">
            <div className="border-l border-[#C8A96E] pl-4">
              <span className="text-[#C8A96E] text-[10px] tracking-widest block uppercase">
                // OPIS PROJEKTU
              </span>
              <p className="text-gray-400 font-sans font-light text-sm mt-1 leading-relaxed">
                {activeProject.desc}
              </p>
            </div>
            <div className="border-l border-white/20 pl-4">
              <span className="text-gray-400 text-[10px] tracking-widest block uppercase">
                // WYZWANIE TECHNICZNE
              </span>
              <p className="text-gray-500 font-sans font-light text-sm mt-1 leading-relaxed">
                {activeProject.challenge}
              </p>
            </div>
          </div>

          <div>
            <span className="text-[#C8A96E] text-[10px] tracking-widest block uppercase mb-2">
              // UŻYTE TECHNOLOGIE
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeProject.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="bg-white/[0.02] border border-white/10 text-[11px] text-gray-400 px-2.5 py-1 rounded font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.01] border border-white/5 rounded-xl p-4 space-y-3 text-xs">
            <span className="text-gray-600 text-[10px] tracking-widest block uppercase">
              // STRUKTURA ZESPOŁU
            </span>
            <div>
              <span className="text-gray-400 font-bold block">&lt;FILIP&gt;</span>
              <p className="text-gray-500 font-sans font-light mt-0.5 leading-snug">
                {activeProject.roles.filip}
              </p>
            </div>
            <div>
              <span className="text-gray-400 font-bold block">&lt;WIKTOR&gt;</span>
              <p className="text-gray-500 font-sans font-light mt-0.5 leading-snug">
                {activeProject.roles.wiktor}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-6 relative z-10">
        {projectsData.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => goToIndex(idx)}
            aria-label={`Pokaż projekt ${p.title}`}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentProjectIndex ? 'w-8 bg-[#C8A96E]' : 'w-3 bg-white/15 hover:bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

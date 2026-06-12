// --- PLIK: src/Background3D.jsx ---
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Komponent generujący pulsującą, neonową siatkę w tle
function CyberGrid() {
  const meshRef = useRef();

  // Używamy useMemo, żeby geometria nie była regenerowana w każdej klatce
  const gridGeom = useMemo(() => {
    return new THREE.GridHelper(30, 30, "#00f0ff", "#ff007f");
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Płynna rotacja w czasie
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    
    // Delikatne pulsowanie poświaty (geometry, nie opacity)
    const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.02;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <primitive 
      object={gridGeom} 
      ref={meshRef} 
      position={[0, 0, -2]} // Cofnięte w głąb sceny
    />
  );
}

export default function Background3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <CyberGrid />
      </Canvas>
    </div>
  );
}
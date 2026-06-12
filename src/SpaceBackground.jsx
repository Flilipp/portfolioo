import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function ParticleWave() {
  const ref = useRef();
  // Generujemy 2000 punktów wewnątrz sfery
  const sphere = random.inSphere(new Float32Array(2000), { radius: 1.5 });

  useFrame((state, delta) => {
    // Powolny obrót całego kosmosu cząsteczek
    ref.current.rotation.x -= delta * 0.05;
    ref.current.rotation.y -= delta * 0.075;
    
    // Efekt falowania na podstawie czasu
    ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.006}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function SpaceBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleWave />
      </Canvas>
    </div>
  );
}
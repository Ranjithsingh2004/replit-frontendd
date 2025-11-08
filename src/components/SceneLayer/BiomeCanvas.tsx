/**
 * BiomeCanvas - 3D React Three Fiber scene with dynamic lighting
 * Lazy-loaded with SVG fallback for performance
 */

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import type { LightingConfig } from '@/styles/lighting';
import * as THREE from 'three';

interface BiomeSceneProps {
  lighting: LightingConfig;
  growthLevel: number;
}

/**
 * Animated tree in the scene
 */
const AnimatedTree: React.FC<{ growthLevel: number }> = ({ growthLevel }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Gentle breathing animation
    const scale = 0.8 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    meshRef.current.scale.setScalar(scale * (0.5 + growthLevel / 200));
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <coneGeometry args={[0.5, 1.5, 8]} />
      <meshStandardMaterial color="#2d7a5e" roughness={0.8} />
    </mesh>
  );
};

/**
 * Floating particles
 */
const Particles: React.FC<{ config: LightingConfig['particles'] }> = ({ config }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = Math.floor(config.density * 100);

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = Math.random() * 5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * config.speed * 0.05;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color={config.color} opacity={0.6} transparent />
    </points>
  );
};

/**
 * Main 3D scene
 */
const BiomeScene: React.FC<BiomeSceneProps> = ({ lighting, growthLevel }) => {
  return (
    <>
      {/* Lighting */}
      <ambientLight color={lighting.ambient.color} intensity={lighting.ambient.intensity} />
      <hemisphereLight
        color={lighting.hemisphere.skyColor}
        groundColor={lighting.hemisphere.groundColor}
        intensity={lighting.hemisphere.intensity}
      />
      <spotLight
        position={[0, 5, 0]}
        color={lighting.volumetric.color}
        intensity={lighting.volumetric.intensity}
        angle={lighting.volumetric.cone}
        penumbra={0.5}
        castShadow
      />

      {/* Scene objects */}
      <AnimatedTree growthLevel={growthLevel} />
      <Particles config={lighting.particles} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#8FBC8F" roughness={0.9} />
      </mesh>

      {/* Environment */}
      <Environment preset="sunset" />

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

/**
 * SVG Fallback for loading/low graphics
 */
const SVGFallback: React.FC<{ growthLevel: number }> = ({ growthLevel }) => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-blue-100/20 to-green-100/20 dark:from-blue-900/10 dark:to-green-900/10">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle cx="100" cy="150" r="80" fill="#8FBC8F" opacity="0.3" />
        <path
          d="M100 50 L80 100 L120 100 Z"
          fill="#2d7a5e"
          opacity={0.5 + growthLevel / 200}
        />
        <circle
          cx="100"
          cy="100"
          r="30"
          fill="none"
          stroke="var(--accent-teal)"
          strokeWidth="2"
          strokeDasharray="4"
          opacity="0.4"
        />
      </svg>
    </div>
  );
};

/**
 * BiomeCanvas component with lazy loading
 */
const BiomeCanvas: React.FC<BiomeSceneProps & { lowGraphics?: boolean }> = ({
  lighting,
  growthLevel,
  lowGraphics = false,
}) => {
  // Use SVG fallback in low graphics mode
  if (lowGraphics) {
    return <SVGFallback growthLevel={growthLevel} />;
  }

  return (
    <div className="w-full h-full">
      <Suspense fallback={<SVGFallback growthLevel={growthLevel} />}>
        <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
          <BiomeScene lighting={lighting} growthLevel={growthLevel} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default BiomeCanvas;

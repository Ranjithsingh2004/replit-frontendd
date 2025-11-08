/**
 * SceneRoot - Three-layer canvas architecture for cinematic depth
 * Layers: Background (parallax particles) → Scene (3D biome) → UI (glass panels)
 * Manages layer stacking, performance, and Low Graphics Mode fallback
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BiomeCanvas from './BiomeCanvas';
import type { LightingConfig } from '@/styles/lighting';

interface SceneRootProps {
  children: React.ReactNode;
  lighting: LightingConfig;
  growthLevel: number;
  lowGraphics?: boolean;
  showScene?: boolean; // Toggle 3D scene layer
}

/**
 * BackgroundLayer - Subtle parallax particles with mouse tracking
 */
const BackgroundLayer: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [disabled]);

  if (disabled) {
    return (
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-white-soft to-white-warm dark:from-ink-soft dark:to-ink-muted" />
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      animate={{
        x: mousePos.x,
        y: mousePos.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 50,
        damping: 30,
        mass: 1,
      }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white-soft to-white-warm dark:from-ink-soft dark:to-ink-muted" />

      {/* Floating particles */}
      <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20">
        <defs>
          <radialGradient id="particle-glow">
            <stop offset="0%" stopColor="var(--accent-teal)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent-teal)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[...Array(24)].map((_, i) => {
          const x = (i * 137.5) % 100; // Golden angle distribution
          const y = ((i * 47) % 100);
          const delay = i * 0.3;
          return (
            <motion.circle
              key={`bg-particle-${i}`}
              cx={`${x}%`}
              cy={`${y}%`}
              r="2"
              fill="url(#particle-glow)"
              initial={{ opacity: 0.2, scale: 0.8 }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </svg>
    </motion.div>
  );
};

/**
 * SceneLayer - 3D biome visualization with dynamic lighting
 */
const SceneLayer: React.FC<{
  lighting: LightingConfig;
  growthLevel: number;
  lowGraphics?: boolean;
}> = ({ lighting, growthLevel, lowGraphics }) => {
  useEffect(() => {
    // Log when 3D scene initializes (for debugging)
    if (!lowGraphics) {
      console.log('DEV: SCENE LAYER LOADED');
    }
  }, [lowGraphics]);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96">
        <BiomeCanvas
          lighting={lighting}
          growthLevel={growthLevel}
          lowGraphics={lowGraphics}
        />
      </div>
    </div>
  );
};

/**
 * UILayer - Interactive content and glass panels
 */
const UILayer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative z-20">
      {children}
    </div>
  );
};

/**
 * SceneRoot - Orchestrates all three layers
 */
const SceneRoot: React.FC<SceneRootProps> = ({
  children,
  lighting,
  growthLevel,
  lowGraphics = false,
  showScene = true,
}) => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Layer 1: Background with parallax particles */}
      <BackgroundLayer disabled={lowGraphics} />

      {/* Layer 2: 3D Scene with BiomeCanvas */}
      <AnimatePresence>
        {showScene && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SceneLayer
              lighting={lighting}
              growthLevel={growthLevel}
              lowGraphics={lowGraphics}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layer 3: UI content */}
      <UILayer>{children}</UILayer>
    </div>
  );
};

export default SceneRoot;

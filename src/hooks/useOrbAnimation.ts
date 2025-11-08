/**
 * Custom hook for orb breathing and growth animations
 * Calculates tree growth visualization based on growth level
 */

import { useMemo } from 'react';

export interface OrbAnimationState {
  treeScale: number;
  leafCount: number;
  leafPositions: Array<{ x: number; y: number; rotation: number; opacity: number }>;
  glowIntensity: number;
}

/**
 * Calculate orb animation state based on growth level (0-100)
 */
export const useOrbAnimation = (growthLevel: number): OrbAnimationState => {
  return useMemo(() => {
    // Clamp growth level between 0-100
    const level = Math.max(0, Math.min(100, growthLevel));

    // Tree scale grows from 0.5 to 1.2
    const treeScale = 0.5 + (level / 100) * 0.7;

    // Leaf count increases with growth (0 to 12 leaves)
    const leafCount = Math.floor((level / 100) * 12);

    // Generate leaf positions in a circular pattern around the tree
    const leafPositions = Array.from({ length: leafCount }, (_, i) => {
      const angle = (i / leafCount) * Math.PI * 2;
      const radius = 40 + (level / 100) * 20; // Radius increases with growth
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const rotation = (angle * 180) / Math.PI;
      const opacity = 0.7 + (level / 100) * 0.3;

      return { x, y, rotation, opacity };
    });

    // Glow intensity increases with growth
    const glowIntensity = 0.2 + (level / 100) * 0.6;

    return {
      treeScale,
      leafCount,
      leafPositions,
      glowIntensity,
    };
  }, [growthLevel]);
};

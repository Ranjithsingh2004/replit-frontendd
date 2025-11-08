/**
 * useAffectProfile - Maps affect score to motion/color personalities
 * Drives cinematic lighting and motion amplitude
 */

import { useState, useEffect } from 'react';
import type { MoodState } from '@/styles/lighting';
import { getLightingForAffect, type LightingConfig } from '@/styles/lighting';

export interface AffectProfile {
  mood: MoodState;
  affectScore: number; // 0-100
  lighting: LightingConfig;
  motion: {
    amplitude: number; // 0.5-1.5 multiplier
    duration: number; // Motion duration multiplier
  };
  colorTemperature: 'cool' | 'neutral' | 'warm';
}

/**
 * Calculate affect profile based on user state
 */
export const useAffectProfile = (growthLevel: number, recentActions: number): AffectProfile => {
  const [affectScore, setAffectScore] = useState(50);

  useEffect(() => {
    // Simple affect calculation: growth + recent activity
    const baseScore = growthLevel * 0.6; // Growth contributes 60%
    const activityBonus = Math.min(recentActions * 5, 40); // Recent actions add up to 40%
    const newScore = Math.min(100, baseScore + activityBonus);

    setAffectScore(newScore);
  }, [growthLevel, recentActions]);

  // Determine mood state
  let mood: MoodState = 'neutral';
  if (affectScore < 40) mood = 'calm';
  else if (affectScore >= 70) mood = 'energetic';

  // Get lighting config
  const lighting = getLightingForAffect(affectScore);

  // Calculate motion properties
  const motionAmplitude = 0.5 + (affectScore / 100) * 1.0; // 0.5-1.5 range
  const motionDuration = mood === 'calm' ? 1.2 : mood === 'energetic' ? 0.8 : 1.0;

  // Color temperature
  const colorTemperature = mood === 'calm' ? 'cool' : mood === 'energetic' ? 'warm' : 'neutral';

  return {
    mood,
    affectScore,
    lighting,
    motion: {
      amplitude: motionAmplitude,
      duration: motionDuration,
    },
    colorTemperature,
  };
};

/**
 * Get spring physics config based on mood
 */
export const getSpringConfig = (mood: MoodState) => {
  const configs = {
    calm: { stiffness: 50, damping: 20, mass: 1 },
    neutral: { stiffness: 100, damping: 15, mass: 0.8 },
    energetic: { stiffness: 200, damping: 12, mass: 0.5 },
  };

  return configs[mood];
};

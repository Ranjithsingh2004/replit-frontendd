/**
 * LUMEN EARTH Lighting System
 * Dynamic ambient lighting tied to mood and affect score
 */

export type MoodState = 'calm' | 'neutral' | 'energetic';

export interface LightingConfig {
  ambient: {
    color: string;
    intensity: number;
  };
  hemisphere: {
    skyColor: string;
    groundColor: string;
    intensity: number;
  };
  volumetric: {
    color: string;
    intensity: number;
    cone: number;
  };
  particles: {
    color: string;
    density: number;
    speed: number;
  };
}

// Lighting presets for each mood state
export const moodLighting: Record<MoodState, LightingConfig> = {
  calm: {
    ambient: {
      color: '#A8D8EA', // Cool blue
      intensity: 0.4,
    },
    hemisphere: {
      skyColor: '#87CEEB',
      groundColor: '#8FBC8F',
      intensity: 0.6,
    },
    volumetric: {
      color: '#6EC1E4',
      intensity: 0.3,
      cone: 0.15,
    },
    particles: {
      color: '#B0E0E6',
      density: 0.3,
      speed: 0.5,
    },
  },

  neutral: {
    ambient: {
      color: '#E4D7C0', // Warm paper
      intensity: 0.5,
    },
    hemisphere: {
      skyColor: '#F5E6D3',
      groundColor: '#D4C4A8',
      intensity: 0.7,
    },
    volumetric: {
      color: '#1F8775',
      intensity: 0.5,
      cone: 0.2,
    },
    particles: {
      color: '#E4D7C0',
      density: 0.5,
      speed: 1.0,
    },
  },

  energetic: {
    ambient: {
      color: '#FFD700', // Warm gold
      intensity: 0.6,
    },
    hemisphere: {
      skyColor: '#FFA500',
      groundColor: '#FF8C00',
      intensity: 0.8,
    },
    volumetric: {
      color: '#FF6347',
      intensity: 0.7,
      cone: 0.25,
    },
    particles: {
      color: '#FFE4B5',
      density: 0.8,
      speed: 1.5,
    },
  },
};

/**
 * Interpolate between two lighting configs
 */
export const interpolateLighting = (
  from: LightingConfig,
  to: LightingConfig,
  progress: number
): LightingConfig => {
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  return {
    ambient: {
      color: to.ambient.color, // Simple transition
      intensity: lerp(from.ambient.intensity, to.ambient.intensity, progress),
    },
    hemisphere: {
      skyColor: to.hemisphere.skyColor,
      groundColor: to.hemisphere.groundColor,
      intensity: lerp(from.hemisphere.intensity, to.hemisphere.intensity, progress),
    },
    volumetric: {
      color: to.volumetric.color,
      intensity: lerp(from.volumetric.intensity, to.volumetric.intensity, progress),
      cone: lerp(from.volumetric.cone, to.volumetric.cone, progress),
    },
    particles: {
      color: to.particles.color,
      density: lerp(from.particles.density, to.particles.density, progress),
      speed: lerp(from.particles.speed, to.particles.speed, progress),
    },
  };
};

/**
 * Get lighting config for affect score (0-100)
 */
export const getLightingForAffect = (affectScore: number): LightingConfig => {
  if (affectScore < 40) return moodLighting.calm;
  if (affectScore < 70) return moodLighting.neutral;
  return moodLighting.energetic;
};

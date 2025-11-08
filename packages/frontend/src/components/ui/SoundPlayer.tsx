/**
 * SoundPlayer - Micro-audio engine for UI feedback
 * Plays tiny 50ms audio bites, toggleable, off by default
 */

import { useRef, useCallback } from 'react';
import { useLumenStore } from '@/lib/store';

export type SoundEvent =
  | 'action_complete'
  | 'leaf_growth'
  | 'message_received'
  | 'button_click'
  | 'toggle';

// Inline minimal audio data URLs (base64 encoded 50ms tones)
// In production, these would be actual tiny audio files
const SOUND_DATA: Record<SoundEvent, string> = {
  action_complete: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=', // Placeholder
  leaf_growth: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=',
  message_received: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=',
  button_click: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=',
  toggle: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=',
};

/**
 * Hook for playing UI sounds
 */
export const useSoundPlayer = () => {
  const audioRefs = useRef<Map<SoundEvent, HTMLAudioElement>>(new Map());
  const { settings } = useLumenStore();

  const play = useCallback(
    (event: SoundEvent) => {
      // Check if sounds are enabled (default: off)
      const soundsEnabled = (settings as any).soundsEnabled || false;
      if (!soundsEnabled) return;

      try {
        // Get or create audio element
        let audio = audioRefs.current.get(event);
        if (!audio) {
          audio = new Audio(SOUND_DATA[event]);
          audio.volume = 0.3; // Subtle volume
          audioRefs.current.set(event, audio);
        }

        // Play (restart if already playing)
        audio.currentTime = 0;
        audio.play().catch(() => {
          // Silently fail if autoplay blocked
        });
      } catch (error) {
        // Gracefully handle audio errors
        console.warn('Sound playback failed:', event);
      }
    },
    [settings]
  );

  return { play };
};

/**
 * Haptic feedback (vibration)
 */
export const useHaptic = () => {
  const { settings } = useLumenStore();

  const vibrate = useCallback(
    (pattern: number | number[] = 10) => {
      const hapticsEnabled = (settings as any).hapticsEnabled || false;
      if (!hapticsEnabled) return;

      if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    },
    [settings]
  );

  return { vibrate };
};

// Convenience component for sound effects
const SoundPlayer: React.FC = () => {
  // This component doesn't render anything
  // It exists to provide context for sound loading
  return null;
};

export default SoundPlayer;

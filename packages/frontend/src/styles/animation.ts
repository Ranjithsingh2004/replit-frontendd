/**
 * LUMEN EARTH Animation Tokens
 * Centralized motion configuration for Framer Motion
 * Uses organic easing for natural, accessible motion
 */

import type { Transition, Variants } from 'framer-motion';

// Precise motion constants for consistent UX
export const MOTION = {
  FAST: 0.12,
  MED: 0.28,
  SLOW: 0.52,
  EASING: [0.2, 0.9, 0.2, 1] as const, // Organic cubic-bezier
  ORB: { scaleFrom: 0.985, scaleTo: 1.02, period: 3.6 },
} as const;

// Duration constants (in seconds)
export const duration = {
  instant: 0.1,
  fast: MOTION.FAST,
  normal: MOTION.MED,
  slow: MOTION.SLOW,
  slower: 0.8,
  breathe: MOTION.ORB.period,
  float: 6,
} as const;

// Easing curves
export const easing = {
  smooth: [0.43, 0.13, 0.23, 0.96],
  snappy: [0.34, 1.56, 0.64, 1], // Elastic bounce
  gentle: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.68, -0.55, 0.265, 1.55],
  organic: MOTION.EASING, // Primary easing for LUMEN EARTH
} as const;

// Common transitions
export const transitions = {
  default: {
    duration: duration.normal,
    ease: easing.smooth,
  } as Transition,

  snappy: {
    duration: duration.fast,
    ease: easing.snappy,
  } as Transition,

  gentle: {
    duration: duration.slow,
    ease: easing.gentle,
  } as Transition,

  breathe: {
    duration: duration.breathe,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'reverse' as const,
  } as Transition,
} as const;

// Animation variants for common patterns
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const leafPop: Variants = {
  initial: { scale: 0, rotate: 0, opacity: 0 },
  animate: {
    scale: [0, 1.2, 1],
    rotate: [0, 10, 0],
    opacity: [0, 1, 1],
    transition: {
      duration: 0.6,
      ease: easing.snappy,
    },
  },
};

export const breatheVariants: Variants = {
  initial: { scale: MOTION.ORB.scaleFrom },
  animate: {
    scale: [MOTION.ORB.scaleFrom, MOTION.ORB.scaleTo, MOTION.ORB.scaleFrom],
    transition: transitions.breathe,
  },
};

// Stagger children animation
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitions.default,
  },
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get transition config respecting user's motion preference
 */
export const getTransition = (transition: Transition): Transition => {
  if (prefersReducedMotion()) {
    return { duration: 0.01 };
  }
  return transition;
};

/**
 * LUMEN EARTH Design Tokens - Premium Edition
 * Central theme configuration for color, spacing, typography, elevation, and motion
 * Token-driven design system for consistent visual hierarchy
 */

export const colorTokens = {
  // Paper-Warm Theme (Light)
  light: {
    // Backgrounds
    bgPaper: '#FBF6F0', // Softer warm paper
    bgCard: '#FFFFFF',
    bgCardHover: '#FEFDFB',
    bgMuted: '#F5F1EB',

    // Text
    textPrimary: '#1A1A1A', // Improved contrast
    textSecondary: '#4A4A4A',
    textMuted: '#7A7A7A',

    // Accents
    accentTeal: '#1F8775',
    accentTealLight: '#E6F7F4',
    accentWarm: '#E4D7C0',
    accentWarmLight: '#F9F4ED',

    // Borders & Strokes
    borderLight: 'rgba(0, 0, 0, 0.08)',
    borderMedium: 'rgba(0, 0, 0, 0.12)',
    strokeTeal: '#1E6F62',

    // Glass effects
    glass: 'rgba(255, 255, 255, 0.72)',
    glassBorder: 'rgba(255, 255, 255, 0.24)',
  },

  // Midnight Theme (Dark)
  dark: {
    // Backgrounds
    bgPaper: '#0D0F11',
    bgCard: '#161A1D',
    bgCardHover: '#1C2023',
    bgMuted: '#252A2E',

    // Text
    textPrimary: '#F5F5F6',
    textSecondary: '#C1C7CD',
    textMuted: '#8B9299',

    // Accents
    accentTeal: '#2FC9A8',
    accentTealLight: '#1A3F37',
    accentWarm: '#FFE7C4',
    accentWarmLight: '#2A241D',

    // Borders & Strokes
    borderLight: 'rgba(255, 255, 255, 0.08)',
    borderMedium: 'rgba(255, 255, 255, 0.12)',
    strokeTeal: '#2FC9A8',

    // Glass effects
    glass: 'rgba(255, 255, 255, 0.08)',
    glassBorder: 'rgba(255, 255, 255, 0.12)',
  },
} as const;

/**
 * Premium Spacing Scale - 8px baseline grid
 * All major blocks use multiples of 8px for vertical rhythm
 */
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  base: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',

  // Specific gutter sizes
  gutterDesktop: '32px',
  gutterTablet: '16px',
  gutterMobile: '12px',
} as const;

/**
 * Typography Scale - Premium hierarchy
 * Uses clamp() for fluid responsive sizing
 */
export const typography = {
  fontFamily: {
    handwritten: '"Patrick Hand", "Shadows Into Light", cursive',
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  fontSize: {
    // Headings - fluid responsive
    h1: 'clamp(44px, 5.5vw, 56px)', // Large hero
    h2: 'clamp(32px, 4vw, 40px)',   // Section headings
    h3: 'clamp(24px, 3vw, 28px)',   // Card headings
    h4: 'clamp(18px, 2.5vw, 20px)', // Small headings

    // Body text
    bodyLarge: '18px',
    body: '16px',
    bodySmall: '14px',
    caption: '13px',
    tiny: '11px',

    // Display
    display: 'clamp(56px, 7vw, 72px)', // Extra large numbers/stats
  },

  lineHeight: {
    tight: '1.2',
    snug: '1.4',
    normal: '1.6',
    relaxed: '1.75',
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
  },
} as const;

/**
 * Border Radius - Soft, organic feel
 */
export const borderRadius = {
  sm: '6px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  full: '9999px',
} as const;

/**
 * Elevation System - 3-level depth
 * Base (0), Card (1), Hero (2)
 */
export const shadows = {
  // Level 0: Base
  none: 'none',

  // Level 1: Cards
  card: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
  cardHover: '0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',

  // Level 2: Hero/Modal
  hero: '0 12px 48px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)',
  modal: '0 24px 64px rgba(0, 0, 0, 0.16), 0 8px 24px rgba(0, 0, 0, 0.12)',

  // Special: Orb glow
  orb: '0 8px 32px rgba(31, 135, 117, 0.24), 0 0 64px rgba(31, 135, 117, 0.16)',
  orbHover: '0 12px 48px rgba(31, 135, 117, 0.32), 0 0 96px rgba(31, 135, 117, 0.24)',

  // Dark theme
  cardDark: '0 2px 8px rgba(0, 0, 0, 0.24), 0 1px 3px rgba(0, 0, 0, 0.16)',
  heroDark: '0 12px 48px rgba(0, 0, 0, 0.48), 0 4px 16px rgba(0, 0, 0, 0.32)',
} as const;

/**
 * Motion Tokens - Organic easing and durations
 */
export const motion = {
  duration: {
    instant: '80ms',
    fast: '120ms',
    medium: '280ms',
    slow: '520ms',
    slower: '800ms',
  },

  easing: {
    organic: 'cubic-bezier(0.2, 0.9, 0.2, 1)',
    snappy: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: 'cubic-bezier(0.43, 0.13, 0.23, 0.96)',
  },

  // Specific animations
  orb: {
    breathePeriod: '3.6s',
    scaleFrom: 0.985,
    scaleTo: 1.02,
  },

  card: {
    hoverLift: '-6px',
    tapScale: 0.98,
  },
} as const;

/**
 * Z-Index Scale - Layering system
 */
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  header: 30,
  overlay: 40,
  modal: 50,
  toast: 60,
} as const;

export type Theme = 'light' | 'dark';

/**
 * Apply theme to document root with CSS variables
 */
export const applyTheme = (theme: Theme) => {
  const colors = colorTokens[theme];
  const root = document.documentElement;

  root.setAttribute('data-theme', theme);
  root.classList.toggle('dark', theme === 'dark');

  // Apply color CSS variables
  Object.entries(colors).forEach(([key, value]) => {
    const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    root.style.setProperty(cssVar, value);
  });

  // Apply spacing variables
  Object.entries(spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value);
  });

  // Apply shadow variables
  const shadowKey = theme === 'dark' ? 'cardDark' : 'card';
  const heroKey = theme === 'dark' ? 'heroDark' : 'hero';
  root.style.setProperty('--shadow-card', shadows[shadowKey]);
  root.style.setProperty('--shadow-hero', shadows[heroKey]);
  root.style.setProperty('--shadow-orb', shadows.orb);
};

/**
 * Get current theme from localStorage or system preference
 */
export const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem('lumen_earth_theme');
  if (stored === 'light' || stored === 'dark') return stored;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

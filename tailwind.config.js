/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'bg-paper': 'var(--bg-paper)',
        'bg-card': 'var(--bg-card)',
        'bg-card-hover': 'var(--bg-card-hover)',
        'bg-muted': 'var(--bg-muted)',

        // Text
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',

        // Accents
        'accent-teal': 'var(--accent-teal)',
        'accent-teal-light': 'var(--accent-teal-light)',
        'accent-warm': 'var(--accent-warm)',
        'accent-warm-light': 'var(--accent-warm-light)',

        // Borders
        'border-light': 'var(--border-light)',
        'border-medium': 'var(--border-medium)',
        'stroke-teal': 'var(--stroke-teal)',

        // Glass
        'glass': 'var(--glass)',
        'glass-border': 'var(--glass-border)',
      },

      fontFamily: {
        'handwritten': ['Patrick Hand', 'Shadows Into Light', 'cursive'],
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },

      fontSize: {
        // Headings - fluid responsive
        'h1': ['clamp(44px, 5.5vw, 56px)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h2': ['clamp(32px, 4vw, 40px)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h3': ['clamp(24px, 3vw, 28px)', { lineHeight: '1.4' }],
        'h4': ['clamp(18px, 2.5vw, 20px)', { lineHeight: '1.4' }],

        // Body
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.6' }],
        'caption': ['13px', { lineHeight: '1.4' }],
        'tiny': ['11px', { lineHeight: '1.4' }],

        // Display
        'display': ['clamp(56px, 7vw, 72px)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
      },

      spacing: {
        // 8px baseline grid
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '24': '96px',
      },

      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
      },

      boxShadow: {
        // Level 1: Cards
        'card': 'var(--shadow-card)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',

        // Level 2: Hero
        'hero': 'var(--shadow-hero)',
        'modal': '0 24px 64px rgba(0, 0, 0, 0.16), 0 8px 24px rgba(0, 0, 0, 0.12)',

        // Special
        'orb': 'var(--shadow-orb)',
        'orb-hover': '0 12px 48px rgba(31, 135, 117, 0.32), 0 0 96px rgba(31, 135, 117, 0.24)',

        // Focus
        'focus': '0 0 0 3px rgba(31, 135, 117, 0.24)',
      },

      animation: {
        // Orb
        'breathe': 'breathe 3.6s ease-in-out infinite',

        // Cards & interactions
        'leaf-pop': 'leaf-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ripple': 'ripple 0.6s ease-out',
        'toast-in': 'toast-in 0.28s cubic-bezier(0.2, 0.9, 0.2, 1)',

        // Utility
        'fade-in': 'fade-in 0.28s ease-out',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.2, 0.9, 0.2, 1)',
        'float': 'float 6s ease-in-out infinite',
      },

      keyframes: {
        breathe: {
          '0%, 100%': {
            transform: 'scale(0.985)',
            boxShadow: '0 8px 32px rgba(31, 135, 117, 0.24), 0 0 64px rgba(31, 135, 117, 0.16)',
          },
          '50%': {
            transform: 'scale(1.02)',
            boxShadow: '0 12px 48px rgba(31, 135, 117, 0.32), 0 0 96px rgba(31, 135, 117, 0.24)',
          },
        },

        'leaf-pop': {
          '0%': { transform: 'scale(0) rotate(-10deg)', opacity: '0' },
          '60%': { transform: 'scale(1.15) rotate(5deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },

        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.5' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },

        'toast-in': {
          '0%': { transform: 'translateY(100%) scale(0.95)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },

        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },

        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },

        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },

      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '12px',
        xl: '24px',
      },

      zIndex: {
        'base': 0,
        'dropdown': 10,
        'sticky': 20,
        'header': 30,
        'overlay': 40,
        'modal': 50,
        'toast': 60,
      },
    },
  },
  plugins: [],
}

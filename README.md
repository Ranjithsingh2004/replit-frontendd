# 🌍 Lumen Earth

A beautifully crafted, production-grade React + TypeScript front-end application for mindful personal growth and ecological awareness. Features a warm, handwritten paper aesthetic with a modern dark mode alternative.

![Lumen Earth Preview](./public/assets/design-preview.png)

## ✨ Features

- **🎨 Dual Theme System**: Paper-Warm (light) and Midnight (dark) themes with instant switching
- **🌳 Living Biome Visualization**: Animated orb with tree growth based on your actions
- **💬 AI Companion Chat**: Conversational UI with provenance tags and streaming-style responses
- **⚡ Micro-Actions**: Grid of wellness actions with step-by-step guidance
- **📔 Memory Garden**: Personal journal with timeline and pinning
- **📊 Insights Dashboard**: Trends visualization with mood tracking
- **♿ Accessibility First**: WCAG AA compliant, keyboard navigable, reduced motion support
- **🎭 Framer Motion Animations**: Smooth, delightful micro-interactions
- **💾 Local-First Data**: All data stored in localStorage with export capability
- **🎮 Demo Mode**: Auto-simulation for showcasing features

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+

### Installation

```bash
# Navigate to project directory
cd lumen-earth

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:3000**

### Build for Production

```bash
npm run build
```

Build output will be in the `dist/` directory.

### Run Tests

```bash
# Run tests
npm test

# Run tests with UI
npm test:ui
```

## 📁 Project Structure

```
lumen-earth/
├── public/
│   ├── assets/
│   │   ├── paper-texture.svg       # Seamless paper texture
│   │   ├── paper-crumple.svg       # Overlay effect
│   │   ├── orb.svg                 # Default orb graphic
│   │   └── icons/                  # Hand-drawn SVG icons
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ui/                     # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   └── IconButton.tsx
│   │   ├── AvatarOrb.tsx           # Central biome visualization
│   │   ├── Icon.tsx                # Icon wrapper component
│   │   └── Layout.tsx              # App layout with navigation
│   ├── pages/
│   │   ├── Home.tsx                # Dashboard with orb & quick actions
│   │   ├── Chat.tsx                # AI companion interface
│   │   ├── Actions.tsx             # Micro-actions grid
│   │   ├── Memory.tsx              # Journal timeline
│   │   ├── Dashboard.tsx           # Trends & insights
│   │   └── Settings.tsx            # App settings
│   ├── lib/
│   │   ├── store.ts                # Zustand global state
│   │   ├── storage.ts              # localStorage wrapper
│   │   └── themeSwitch.ts          # Theme utilities
│   ├── data/
│   │   └── seed.ts                 # Demo data & types
│   ├── hooks/
│   │   ├── useOrbAnimation.ts      # Orb growth calculations
│   │   └── useDemoMode.ts          # Demo automation
│   ├── styles/
│   │   ├── theme.ts                # Design tokens
│   │   ├── animation.ts            # Motion configuration
│   │   └── tailwind.css            # Global styles
│   ├── tests/                      # Unit tests
│   ├── App.tsx                     # Main app component
│   └── main.tsx                    # Entry point
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Design System

### Color Tokens

| Token           | Light (Paper-Warm) | Dark (Midnight) | Usage                      |
|-----------------|---------------------|------------------|----------------------------|
| `--bg-paper`    | `#FCF7F0`          | `#0D0F11`        | Main background            |
| `--accent-teal` | `#1F8775`          | `#2FC9A8`        | Primary accent             |
| `--accent-warm` | `#E4D7C0`          | `#FFE7C4`        | Secondary accent           |
| `--ink-stroke`  | `#1E6F62`          | `#2FC9A8`        | Icon strokes               |
| `--text-primary`| `#111827`          | `#F5F5F6`        | Main text                  |
| `--muted-text`  | `#6B6B6B`          | `#9CA3AF`        | Secondary text             |

### Typography

- **Display Font**: Patrick Hand (handwritten)
- **Body Font**: Inter (sans-serif)
- **Scales**: H1 (40-56px), H2 (28-36px), Body (16px), Small (13px)

### Spacing Scale

4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

### Animations

All animations use Framer Motion with durations defined in `src/styles/animation.ts`:
- **Breathe**: 4s ease-in-out infinite (orb pulsing)
- **Leaf Pop**: 0.6s elastic (leaf growth)
- **Fade In**: 0.3s ease-out (page transitions)

## 🎯 Usage Guide

### Switching Themes

1. Navigate to **Settings** page
2. Click the "Dark Mode" or "Light Mode" button
3. Theme changes apply instantly and persist to localStorage

### Enabling Demo Mode

1. Go to **Settings**
2. Enable "Demo Mode"
3. The app will auto-simulate activity every 10-30 seconds, showing:
   - Tree growth animations
   - Chat messages appearing
   - Action completions

### Completing Actions

1. Navigate to **Actions** page
2. Click any micro-action card
3. Follow the step-by-step instructions
4. Click "Complete Action" to earn growth

### Accessibility Features

- **Keyboard Navigation**: Tab through all interactive elements, Enter/Space to activate
- **Focus Indicators**: Visible focus rings on all controls
- **Reduced Motion**: Respects `prefers-reduced-motion` setting; can also be toggled in Settings
- **ARIA Labels**: Screen reader support for dynamic content

## 🧪 Testing

Tests are written with Vitest and React Testing Library:

```bash
# Run all tests
npm test

# Run with UI
npm test:ui

# Test coverage includes:
# - Component rendering
# - User interactions
# - Theme switching
# - Orb growth calculations
# - Storage utilities
```

## 🛠️ Development

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

### Project Guidelines

- **TypeScript Strict Mode**: Enabled for type safety
- **ESLint**: Configured with recommended rules + Prettier
- **Component Pattern**: Functional components with hooks
- **State Management**: Zustand for global state, React state for local
- **Styling**: Tailwind CSS with custom theme tokens
- **Animations**: Framer Motion with reduced motion support

## 📦 Data Management

### Export Data

1. Go to **Settings** → **Data Management**
2. Click "Export Data (JSON)"
3. Downloads a JSON file with all your data

### Clear Data

1. Go to **Settings** → **Data Management**
2. Click "Clear All Data"
3. Confirm to reset all progress

All data is stored in `localStorage` under the key `lumen_earth_v1`.

## 🎨 Generating Design Preview

To create a design preview screenshot:

1. Start the dev server: `npm run dev`
2. Open http://localhost:3000 in your browser
3. Use browser dev tools or a screenshot extension to capture:
   - Desktop view (1920x1080 recommended)
   - Mobile view (375x812 recommended)
4. Save as `public/assets/design-preview.png`

## 🤝 Contributing

This is a production-ready front-end template. To extend:

1. **Add new pages**: Create in `src/pages/` and add route in `App.tsx`
2. **New components**: Add to `src/components/ui/` for reusable UI
3. **New actions**: Add to `src/data/seed.ts` micro-actions array
4. **Theme colors**: Update `src/styles/theme.ts` and Tailwind config

## 📄 License

MIT License - Feel free to use this project as a template for your own applications.

## 🙏 Acknowledgments

- **Fonts**: Patrick Hand & Inter (Google Fonts)
- **Icons**: Hand-drawn SVG icon set (included)
- **Animations**: Powered by Framer Motion
- **State**: Zustand for elegant state management

---

**Built with care for mindful growth 🌱**

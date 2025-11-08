/**
 * CinematicDemo - Orchestrated 30-second playback demonstrating all cinematic features
 * Auto-plays sequence: lighting transitions, growth animations, action completion, chat messages
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SceneRoot from '@/components/SceneLayer/SceneRoot';
import AvatarOrb from '@/components/AvatarOrb';
import OrbRadial from '@/components/SceneLayer/OrbRadial';
import GlassPanel from '@/components/ui/GlassPanel';
import Button from '@/components/ui/Button';
import { getLightingForAffect } from '@/styles/lighting';
import { useSoundPlayer } from '@/components/ui/SoundPlayer';
import type { RadialAction } from '@/components/SceneLayer/OrbRadial';


interface DemoStep {
  time: number; // ms from start
  action: 'growth' | 'sound' | 'message' | 'radial';
  data?: any;
}

const demoScript: DemoStep[] = [
  { time: 0, action: 'message', data: 'Starting cinematic demo...' },
  { time: 1000, action: 'growth', data: 20 },
  { time: 1500, action: 'sound', data: 'leaf_growth' },
  { time: 3000, action: 'message', data: 'Watch the tree grow with your progress' },
  { time: 5000, action: 'growth', data: 40 },
  { time: 5500, action: 'sound', data: 'action_complete' },
  { time: 7000, action: 'radial', data: true },
  { time: 8000, action: 'message', data: 'Hover over the orb to reveal actions' },
  { time: 11000, action: 'radial', data: false },
  { time: 12000, action: 'growth', data: 60 },
  { time: 12500, action: 'sound', data: 'leaf_growth' },
  { time: 14000, action: 'message', data: 'Lighting adapts to your mood and energy' },
  { time: 17000, action: 'growth', data: 80 },
  { time: 17500, action: 'sound', data: 'action_complete' },
  { time: 19000, action: 'message', data: 'Glass panels with animated borders' },
  { time: 22000, action: 'growth', data: 100 },
  { time: 22500, action: 'sound', data: 'leaf_growth' },
  { time: 24000, action: 'message', data: 'Full bloom! Your biome is thriving' },
  { time: 27000, action: 'message', data: 'Demo complete - explore the app!' },
];

const CinematicDemo: React.FC = () => {
  const navigate = useNavigate();
  const { play } = useSoundPlayer();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [growthLevel, setGrowthLevel] = useState(0);
  const [message, setMessage] = useState('Click "Start Demo" to begin');
  const [radialOpen, setRadialOpen] = useState(false);

  // Playback control
  useEffect(() => {
    if (!isPlaying) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setCurrentTime(elapsed);

      // Execute demo steps
      demoScript.forEach((step) => {
        if (elapsed >= step.time && elapsed < step.time + 100) {
          switch (step.action) {
            case 'growth':
              setGrowthLevel(step.data);
              break;
            case 'sound':
              play(step.data);
              break;
            case 'message':
              setMessage(step.data);
              break;
            case 'radial':
              setRadialOpen(step.data);
              break;
          }
        }
      });

      // Stop at 30s
      if (elapsed >= 30000) {
        setIsPlaying(false);
        setMessage('Demo complete! Click "Explore App" to continue.');
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, play]);

  const handleStart = () => {
    setIsPlaying(true);
    setCurrentTime(0);
    setGrowthLevel(0);
    setMessage('Starting cinematic demo...');
    setRadialOpen(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setGrowthLevel(0);
    setMessage('Click "Start Demo" to begin');
    setRadialOpen(false);
  };

  // Dynamic lighting based on growth
  const lighting = getLightingForAffect(growthLevel);

  // Radial actions (demo only)
  const radialActions: RadialAction[] = [
    {
      id: 'demo-1',
      icon: 'breathe',
      label: 'Demo Action 1',
      angle: 0,
      onClick: () => {},
    },
    {
      id: 'demo-2',
      icon: 'walk',
      label: 'Demo Action 2',
      angle: 72,
      onClick: () => {},
    },
    {
      id: 'demo-3',
      icon: 'journal',
      label: 'Demo Action 3',
      angle: 144,
      onClick: () => {},
    },
    {
      id: 'demo-4',
      icon: 'leaf',
      label: 'Demo Action 4',
      angle: 216,
      onClick: () => {},
    },
    {
      id: 'demo-5',
      icon: 'tree',
      label: 'Demo Action 5',
      angle: 288,
      onClick: () => {},
    },
  ];

  return (
    <SceneRoot
      lighting={lighting}
      growthLevel={growthLevel}
      lowGraphics={false}
      showScene={true}
    >
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Controls */}
        <motion.div
          className="fixed top-4 left-4 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassPanel blur="md" glow>
            <div className="p-4 space-y-3">
              <h2 className="font-handwritten text-lg text-ink-base dark:text-white-soft">
                Cinematic Demo
              </h2>
              <div className="flex gap-2">
                {!isPlaying ? (
                  <Button size="sm" onClick={handleStart}>
                    Start Demo
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={handleStop}>
                    Pause
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={handleReset}>
                  Reset
                </Button>
                <Button size="sm" variant="ghost" onClick={() => navigate('/')}>
                  Exit
                </Button>
              </div>
              {/* Progress bar */}
              <div className="w-64 h-2 bg-ink-stroke/20 dark:bg-white-soft/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent-teal"
                  animate={{ width: `${(currentTime / 30000) * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="text-xs text-ink-muted dark:text-white-muted">
                {Math.floor(currentTime / 1000)}s / 30s
              </p>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Main demo area */}
        <div className="relative flex flex-col items-center justify-center space-y-8">
          {/* AvatarOrb with radial menu */}
          <div className="relative">
            <AvatarOrb
              growthLevel={growthLevel}
              size={280}
              mood="demo"
              ecoGrade="A+"
            />
            <OrbRadial
              actions={radialActions}
              radius={160}
              isOpen={radialOpen}
              onToggle={setRadialOpen}
            />
          </div>

          {/* Message display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <GlassPanel blur="lg" glow animatedBorder>
                <div className="px-8 py-4 max-w-md">
                  <p className="text-center font-handwritten text-xl text-ink-base dark:text-white-soft">
                    {message}
                  </p>
                </div>
              </GlassPanel>
            </motion.div>
          </AnimatePresence>

          {/* Stats */}
          <GlassPanel blur="md">
            <div className="px-6 py-3 flex gap-8">
              <div className="text-center">
                <p className="text-xs text-ink-muted dark:text-white-muted">Growth</p>
                <p className="text-2xl font-handwritten text-accent-teal">
                  {growthLevel}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-ink-muted dark:text-white-muted">Lighting</p>
                <p className="text-sm font-handwritten text-accent-warm">
                  {growthLevel < 40 ? 'Calm' : growthLevel < 70 ? 'Neutral' : 'Energetic'}
                </p>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* Bottom instruction */}
        {!isPlaying && currentTime >= 29000 && (
          <motion.div
            className="fixed bottom-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button size="lg" onClick={() => navigate('/')}>
              Explore App
            </Button>
          </motion.div>
        )}
      </div>
    </SceneRoot>
  );
};

export default CinematicDemo;

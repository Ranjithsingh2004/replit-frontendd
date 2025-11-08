/**
 * HomeCinematic - Cinematic home page with layered scene architecture
 * Three-column golden-ratio layout with SceneRoot integration
 * Left: Quick Actions | Center: AvatarOrb with BiomeCanvas | Right: Stats & Memory
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SceneRoot from '@/components/SceneLayer/SceneRoot';
import OrbRadial from '@/components/SceneLayer/OrbRadial';
import AvatarOrb from '@/components/AvatarOrb';
import GlassPanel from '@/components/ui/GlassPanel';
import InteractiveCard from '@/components/ui/InteractiveCard';
import Icon from '@/components/Icon';
import { useLumenStore } from '@/lib/store';
import { useAffectProfile } from '@/hooks/useAffectProfile';
import { useSoundPlayer } from '@/components/ui/SoundPlayer';
import { generateNudges } from '@/lib/predictiveNudges';
import { microActions } from '@/data/seed';
import { staggerContainer, staggerItem } from '@/styles/animation';
import type { RadialAction } from '@/components/SceneLayer/OrbRadial';


const HomeCinematic: React.FC = () => {
  const navigate = useNavigate();
  const { play } = useSoundPlayer();

  const {
    growthLevel,
    completedActions,
    journalEntries,
    incrementGrowth,
    completeAction,
    settings,
  } = useLumenStore();

  const [radialOpen, setRadialOpen] = useState(false);

  // Calculate affect profile for dynamic lighting
  const recentActions = completedActions.filter(() => {
    // Count actions from last 72h (mock: just use length)
    return true;
  }).length;

  const affectProfile = useAffectProfile(growthLevel, recentActions);

  // Get predictive nudges
  const nudges = generateNudges({
    timeOfDay: new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening',
    daysSinceLastAction: 0,
  });

  // Radial menu actions
  const radialActions: RadialAction[] = [
    {
      id: 'chat',
      icon: 'lightbulb',
      label: 'Chat',
      angle: 0,
      onClick: () => {
        play('button_click');
        navigate('/chat');
      },
    },
    {
      id: 'actions',
      icon: 'breathe',
      label: 'Actions',
      angle: 72,
      onClick: () => {
        play('button_click');
        navigate('/actions');
      },
    },
    {
      id: 'memory',
      icon: 'journal',
      label: 'Memory',
      angle: 144,
      onClick: () => {
        play('button_click');
        navigate('/memory');
      },
    },
    {
      id: 'dashboard',
      icon: 'tree',
      label: 'Dashboard',
      angle: 216,
      onClick: () => {
        play('button_click');
        navigate('/dashboard');
      },
    },
    {
      id: 'settings',
      icon: 'leaf',
      label: 'Settings',
      angle: 288,
      onClick: () => {
        play('button_click');
        navigate('/settings');
      },
    },
  ];

  // Handle action completion
  const handleQuickAction = (actionId: string) => {
    completeAction(actionId);
    incrementGrowth(7);
    play('action_complete');
  };

  // Pinned memories
  const pinnedMemories = journalEntries
    .filter((entry) => entry.pinned)
    .slice(0, 2);

  return (
    <SceneRoot
      lighting={affectProfile.lighting}
      growthLevel={growthLevel}
      lowGraphics={settings.lowGraphicsMode}
      showScene={!settings.lowGraphicsMode}
    >
      <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
        {/* Three-column golden-ratio grid */}
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Left Column - Quick Actions (3/12 = 25%) */}
          <motion.div
            className="lg:col-span-3 space-y-4"
            variants={staggerItem}
          >
            <GlassPanel blur="md" glow animatedBorder>
              <div className="p-6">
                <h2 className="text-lg font-handwritten text-ink-base dark:text-white-soft mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  {microActions.slice(0, 3).map((action) => (
                    <InteractiveCard
                      key={action.id}
                      tiltStrength={5}
                      showInkFlourish
                    >
                      <button
                        onClick={() => handleQuickAction(action.id)}
                        disabled={completedActions.includes(action.id)}
                        className="w-full text-left p-3 rounded-lg bg-white-soft/40 dark:bg-ink-soft/40 hover:bg-accent-teal/10 dark:hover:bg-accent-teal/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="flex items-center gap-3">
                          <Icon name={action.icon} size={20} />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-ink-base dark:text-white-soft truncate">
                              {action.name}
                            </p>
                            <p className="text-xs text-ink-muted dark:text-white-muted">
                              {action.duration}
                            </p>
                          </div>
                        </div>
                      </button>
                    </InteractiveCard>
                  ))}
                </div>
              </div>
            </GlassPanel>

            {/* Predictive Nudges */}
            {nudges.length > 0 && (
              <GlassPanel blur="sm" glow>
                <div className="p-4">
                  <h3 className="text-sm font-handwritten text-accent-teal mb-2">
                    Suggested for you
                  </h3>
                  <div className="space-y-2">
                    {nudges.slice(0, 2).map((nudge) => (
                      <InteractiveCard key={nudge.action.id} tiltStrength={3}>
                        <div className="p-2 rounded bg-accent-teal/5">
                          <p className="text-xs text-ink-base dark:text-white-soft">
                            {nudge.reason}
                          </p>
                        </div>
                      </InteractiveCard>
                    ))}
                  </div>
                </div>
              </GlassPanel>
            )}
          </motion.div>

          {/* Center Column - AvatarOrb (6/12 = 50%) */}
          <motion.div
            className="lg:col-span-6 flex flex-col items-center justify-center min-h-[400px] relative"
            variants={staggerItem}
          >
            {/* Orb with radial menu */}
            <div className="relative">
              <AvatarOrb
                growthLevel={growthLevel}
                size={240}
                mood={affectProfile.mood}
                ecoGrade="A-"
                onClick={() => navigate('/chat')}
                onLeafGrow={() => play('leaf_growth')}
              />
              <OrbRadial
                actions={radialActions}
                radius={140}
                isOpen={radialOpen}
                onToggle={setRadialOpen}
              />
            </div>

            {/* Growth indicator */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-2xl font-handwritten text-ink-base dark:text-white-soft">
                Level {Math.floor(growthLevel / 10)}
              </p>
              <p className="text-sm text-ink-muted dark:text-white-muted mt-1">
                {affectProfile.mood.charAt(0).toUpperCase() + affectProfile.mood.slice(1)} • {affectProfile.colorTemperature}
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats & Memory (3/12 = 25%) */}
          <motion.div
            className="lg:col-span-3 space-y-4"
            variants={staggerItem}
          >
            {/* Stats */}
            <GlassPanel blur="md" glow animatedBorder>
              <div className="p-6">
                <h2 className="text-lg font-handwritten text-ink-base dark:text-white-soft mb-4">
                  Today
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-ink-muted dark:text-white-muted">
                      Actions
                    </span>
                    <span className="text-xl font-handwritten text-accent-teal">
                      {completedActions.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-ink-muted dark:text-white-muted">
                      Growth
                    </span>
                    <span className="text-xl font-handwritten text-accent-teal">
                      {growthLevel}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-ink-muted dark:text-white-muted">
                      Mood
                    </span>
                    <span className="text-xl font-handwritten text-accent-warm">
                      {affectProfile.mood}
                    </span>
                  </div>
                </div>
              </div>
            </GlassPanel>

            {/* Pinned Memories */}
            {pinnedMemories.length > 0 && (
              <GlassPanel blur="sm">
                <div className="p-4">
                  <h3 className="text-sm font-handwritten text-ink-base dark:text-white-soft mb-3">
                    Pinned Memories
                  </h3>
                  <div className="space-y-2">
                    {pinnedMemories.map((memory) => (
                      <InteractiveCard key={memory.id} tiltStrength={3}>
                        <div className="p-3 rounded bg-white-soft/40 dark:bg-ink-soft/40">
                          <p className="text-xs text-ink-base dark:text-white-soft line-clamp-2">
                            {memory.content}
                          </p>
                          <p className="text-xs text-ink-muted dark:text-white-muted mt-1">
                            {new Date(memory.date).toLocaleDateString()}
                          </p>
                        </div>
                      </InteractiveCard>
                    ))}
                  </div>
                </div>
              </GlassPanel>
            )}
          </motion.div>
        </motion.div>
      </div>
    </SceneRoot>
  );
};

export default HomeCinematic;

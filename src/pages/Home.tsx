/**
 * Home/Dashboard page - Central orb visualization with quick actions
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLumenStore } from '@/lib/store';
import AvatarOrb from '@/components/AvatarOrb';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Icon from '@/components/Icon';
import Badge from '@/components/ui/Badge';
import { staggerContainer, staggerItem } from '@/styles/animation';
import { microActions } from '@/data/seed';

const Home: React.FC = () => {
  const { growthLevel, completeAction, journalEntries, completedActions } = useLumenStore();

  const quickActions = microActions.slice(0, 4); // Show first 4 actions

  const handleActionComplete = (actionId: string) => {
    completeAction(actionId);
  };

  const recentMemory = journalEntries[journalEntries.length - 1];
  const actionsToday = completedActions.length;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Header */}
        <motion.div variants={staggerItem} className="mb-8 text-center">
          <h1 className="heading-handwritten mb-2">Your Lumen Earth</h1>
          <p className="text-muted-text">
            Your personal biome grows with every mindful action
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Quick actions */}
          <motion.div variants={staggerItem} className="lg:col-span-1 space-y-4">
            <h2 className="text-h3 font-handwritten text-accent-teal mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <Card key={action.id} hoverable className="cursor-pointer">
                  <div className="flex items-center gap-4">
                    <Icon name={action.icon as any} size={40} animated />
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary">{action.name}</h3>
                      <p className="text-sm text-muted-text">{action.duration} min</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleActionComplete(action.id)}
                      aria-label={`Complete ${action.name}`}
                    >
                      Do it
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Center column - Orb */}
          <motion.div variants={staggerItem} className="lg:col-span-1 flex flex-col items-center justify-center">
            <Card className="w-full max-w-md p-8">
              <div className="flex flex-col items-center gap-6">
                <AvatarOrb growthLevel={growthLevel} size={200} />
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Badge variant="success">Level {Math.floor(growthLevel / 10)}</Badge>
                    <span className="text-2xl font-handwritten text-accent-teal">
                      {Math.round(growthLevel)}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-text">Growth Progress</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right column - Stats & Memory */}
          <motion.div variants={staggerItem} className="lg:col-span-1 space-y-4">
            {/* Daily stats */}
            <Card>
              <h3 className="font-handwritten text-accent-teal text-lg mb-4">Today's Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-text">Actions completed</span>
                  <span className="font-semibold text-2xl text-accent-teal">{actionsToday}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-text">Growth gained</span>
                  <span className="font-semibold text-2xl text-accent-teal">
                    +{actionsToday * 5}%
                  </span>
                </div>
              </div>
            </Card>

            {/* Recent memory */}
            {recentMemory && (
              <Card>
                <h3 className="font-handwritten text-accent-teal text-lg mb-4">
                  Latest Reflection
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="info">{recentMemory.mood || 'reflective'}</Badge>
                    <span className="text-xs text-muted-text">{recentMemory.date}</span>
                  </div>
                  <p className="text-sm text-text-primary line-clamp-3">{recentMemory.content}</p>
                </div>
              </Card>
            )}

            {/* Eco summary */}
            <Card glass>
              <h3 className="font-handwritten text-accent-teal text-lg mb-2">Eco Impact</h3>
              <p className="text-sm text-muted-text">
                Your mindful actions create positive ripples in your personal ecosystem and beyond.
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Floating help button */}
        <motion.div
          className="fixed bottom-8 right-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button variant="primary" className="rounded-full p-4 shadow-orb">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9 9a3 3 0 0 1 6 0c0 2-3 3-3 3" />
              <circle cx="12" cy="17" r="0.5" fill="currentColor" />
            </svg>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;

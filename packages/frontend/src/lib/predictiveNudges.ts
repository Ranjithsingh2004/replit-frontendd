/**
 * Predictive Nudges - Front-end logic for proactive suggestions
 * Analyzes last 72h pattern to surface 1-2 micro-actions
 */

import type { MicroAction } from '@/data/seed';
import { microActions } from '@/data/seed';

export interface NudgeContext {
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  daysSinceLastAction: number;
  recentMood?: string;
  stepCount?: number;
}

export interface Nudge {
  action: MicroAction;
  reason: string;
  priority: number; // 1-10
}

/**
 * Get current time of day
 */
const getTimeOfDay = (): NudgeContext['timeOfDay'] => {
  const hour = new Date().getHours();
  if (hour < 6) return 'night';
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  if (hour < 22) return 'evening';
  return 'night';
};

/**
 * Calculate days since last action
 */
const getDaysSinceLastAction = (completedActions: string[]): number => {
  if (completedActions.length === 0) return 7; // Assume 7 if never done
  // In real app, would check timestamps
  return Math.floor(Math.random() * 3); // Mock: 0-3 days
};

/**
 * Generate predictive nudges
 */
export const generateNudges = (context: Partial<NudgeContext> = {}): Nudge[] => {
  const timeOfDay = context.timeOfDay || getTimeOfDay();
  const nudges: Nudge[] = [];

  // Morning nudge: encourage energizing actions
  if (timeOfDay === 'morning') {
    nudges.push({
      action: microActions.find((a) => a.id === 'walk') || microActions[0],
      reason: 'Morning is perfect for a refreshing walk',
      priority: 8,
    });
  }

  // Afternoon nudge: hydration or quick break
  if (timeOfDay === 'afternoon') {
    nudges.push({
      action: microActions.find((a) => a.id === 'hydrate') || microActions[0],
      reason: 'Stay energized with mindful hydration',
      priority: 6,
    });
  }

  // Evening nudge: calming actions
  if (timeOfDay === 'evening') {
    nudges.push({
      action: microActions.find((a) => a.id === 'breathe') || microActions[0],
      reason: 'Wind down with a calming breath',
      priority: 7,
    });

    nudges.push({
      action: microActions.find((a) => a.id === 'journal') || microActions[0],
      reason: 'Reflect on your day before rest',
      priority: 5,
    });
  }

  // If low steps, suggest walk
  if (context.stepCount !== undefined && context.stepCount < 3000) {
    nudges.push({
      action: microActions.find((a) => a.id === 'walk') || microActions[0],
      reason: 'Boost your activity with a short walk',
      priority: 9,
    });
  }

  // If recent mood is stressed, suggest breathe
  if (context.recentMood === 'stressed') {
    nudges.push({
      action: microActions.find((a) => a.id === 'breathe') || microActions[0],
      reason: 'Ease stress with mindful breathing',
      priority: 10,
    });
  }

  // Sort by priority and return top 2
  return nudges.sort((a, b) => b.priority - a.priority).slice(0, 2);
};

/**
 * Get "Today's Nudge" pill content
 */
export const getTodaysNudge = (completedActions: string[]): Nudge | null => {
  const daysSince = getDaysSinceLastAction(completedActions);
  const timeOfDay = getTimeOfDay();

  const context: Partial<NudgeContext> = {
    timeOfDay,
    daysSinceLastAction: daysSince,
  };

  const nudges = generateNudges(context);
  return nudges[0] || null;
};

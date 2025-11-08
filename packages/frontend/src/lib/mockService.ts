/**
 * Mock Service Layer
 * Simulates async backend behavior with realistic delays
 */

import type { ChatMessage, MicroAction } from '@/data/seed';
import { microActions } from '@/data/seed';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const randomDelay = () => delay(Math.random() * 400 + 200); // 200-600ms

export interface ActionResult {
  success: boolean;
  growthPoints: number;
  message: string;
  timestamp: string;
}

export interface ChatResponse {
  message: ChatMessage;
  streaming?: boolean;
}

/**
 * Mock chat service with streaming simulation
 */
export const chat = async (
  userMessage: string,
  onToken?: (token: string) => void
): Promise<ChatMessage> => {
  await randomDelay();

  // Generate response based on user message
  const responses: Record<string, string> = {
    'how can i improve my mood':
      'Based on your recent activity, I recommend trying the Mindful Breathing exercise. It typically improves mood by 15% and takes only 2 minutes.',
    'what actions should i try today':
      'I notice your step count is low today. How about a 10-minute Nature Walk? It combines mood boost with eco-connection.',
    'tell me about my progress':
      `You've completed ${Math.floor(Math.random() * 10) + 5} actions this week! Your growth level has increased by ${Math.floor(Math.random() * 20) + 10}%.`,
    "what's good for the environment":
      'Small actions like mindful hydration, tending plants, and reducing screen time all contribute to ecological awareness. Every action ripples outward!',
  };

  const defaultResponse =
    'I understand. Let me help you explore that further. Would you like to try a micro-action related to this?';
  const responseText =
    responses[userMessage.toLowerCase()] ||
    responses[Object.keys(responses).find((k) => userMessage.toLowerCase().includes(k)) || ''] ||
    defaultResponse;

  // Simulate streaming if callback provided
  if (onToken) {
    const tokens = responseText.split(' ');
    for (let i = 0; i < tokens.length; i += 3) {
      const chunk = tokens.slice(i, i + 3).join(' ') + ' ';
      onToken(chunk);
      await delay(50);
    }
  }

  const provenanceReasons = [
    'Reason: pattern analysis of recent activities',
    'Reason: low step count detected',
    'Reason: user reported stress earlier',
    'Reason: optimal time for wellness check-in',
    'Reason: correlation with mood improvement',
  ];

  return {
    id: `msg-${Date.now()}-${Math.random()}`,
    role: 'agent',
    content: responseText,
    timestamp: new Date().toISOString(),
    provenance: provenanceReasons[Math.floor(Math.random() * provenanceReasons.length)],
  };
};

/**
 * Log action completion
 */
export const logAction = async (actionId: string): Promise<ActionResult> => {
  await randomDelay();

  const action = microActions.find((a) => a.id === actionId);
  if (!action) {
    return {
      success: false,
      growthPoints: 0,
      message: 'Action not found',
      timestamp: new Date().toISOString(),
    };
  }

  const growthPoints = 5 + Math.floor(Math.random() * 5); // 5-10 points

  return {
    success: true,
    growthPoints,
    message: `Completed ${action.name}! +${growthPoints} growth`,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Simulate a week of activity
 */
export const simulateWeek = async (
  onProgress?: (day: number, total: number) => void
): Promise<{ totalGrowth: number; actionsCompleted: number }> => {
  let totalGrowth = 0;
  let actionsCompleted = 0;

  for (let day = 1; day <= 7; day++) {
    await delay(300); // Simulate daily processing
    const dailyActions = Math.floor(Math.random() * 4) + 2; // 2-5 actions per day
    actionsCompleted += dailyActions;
    totalGrowth += dailyActions * 5;

    onProgress?.(day, 7);
  }

  return { totalGrowth, actionsCompleted };
};

/**
 * Get suggested action based on context
 */
export const getSuggestedAction = async (context?: {
  mood?: string;
  timeOfDay?: string;
}): Promise<MicroAction> => {
  await randomDelay();

  // Simple logic: suggest based on time or mood
  if (context?.mood === 'stressed') {
    return microActions.find((a) => a.id === 'breathe') || microActions[0];
  }

  if (context?.timeOfDay === 'morning') {
    return microActions.find((a) => a.id === 'walk') || microActions[1];
  }

  // Random suggestion
  return microActions[Math.floor(Math.random() * microActions.length)];
};

/**
 * Export journal entries
 */
export const exportMemories = (memories: any[]): Blob => {
  const data = JSON.stringify(
    {
      export_date: new Date().toISOString(),
      version: '1.0.0',
      memories,
    },
    null,
    2
  );

  return new Blob([data], { type: 'application/json' });
};

/**
 * Offline event queue (demo)
 */
const offlineQueue: Array<{ type: string; data: any; timestamp: string }> = [];

export const queueOfflineEvent = (type: string, data: any) => {
  offlineQueue.push({
    type,
    data,
    timestamp: new Date().toISOString(),
  });
};

export const getOfflineQueue = () => [...offlineQueue];

export const clearOfflineQueue = () => {
  offlineQueue.length = 0;
};

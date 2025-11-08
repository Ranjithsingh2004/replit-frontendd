/**
 * Demo seed data for LUMEN EARTH
 */

import type { IconName } from '@/components/Icon';

export interface MicroAction {
  id: string;
  name: string;
  icon: IconName;
  duration: number; // minutes
  tags: ('Emotion' | 'Eco' | 'Combined')[];
  description: string;
  instructions: string[];
  expectedUplift: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
  provenance?: string;
}

export interface MemoryEntry {
  id: string;
  date: string;
  mood: string;
  content: string;
  biomeSnapshot?: string;
  pinned?: boolean;
}

export interface TrendDataPoint {
  date: string;
  mood: number; // 1-10
  steps: number;
  actions: number;
}

export const microActions: MicroAction[] = [
  {
    id: 'breathe',
    name: 'Mindful Breathing',
    icon: 'breathe',
    duration: 2,
    tags: ['Emotion'],
    description: 'Take 2 minutes to center yourself with focused breathing',
    instructions: [
      'Find a comfortable seated position',
      'Close your eyes gently',
      'Breathe in for 4 counts',
      'Hold for 4 counts',
      'Breathe out for 6 counts',
      'Repeat for 2 minutes',
    ],
    expectedUplift: '+15% calm, reduced stress',
  },
  {
    id: 'walk',
    name: 'Nature Walk',
    icon: 'walk',
    duration: 10,
    tags: ['Combined'],
    description: 'A short walk outside to reconnect with nature',
    instructions: [
      'Step outside',
      'Notice the sky, trees, and sounds',
      'Walk at a comfortable pace',
      'Focus on your senses',
      'Return feeling refreshed',
    ],
    expectedUplift: '+20% mood, +10% eco-connection',
  },
  {
    id: 'journal',
    name: 'Quick Journal',
    icon: 'journal',
    duration: 5,
    tags: ['Emotion'],
    description: 'Reflect on your day with a short journal entry',
    instructions: [
      'Open your journal',
      'Write about one thing you\'re grateful for',
      'Describe how you\'re feeling',
      'Note one thing you learned today',
    ],
    expectedUplift: '+10% clarity, improved self-awareness',
  },
  {
    id: 'hydrate',
    name: 'Hydrate Mindfully',
    icon: 'hydrate',
    duration: 1,
    tags: ['Eco', 'Emotion'],
    description: 'Drink water and appreciate its journey to you',
    instructions: [
      'Fill a glass with water',
      'Hold it and feel its temperature',
      'Think about water\'s journey from nature',
      'Drink slowly and mindfully',
    ],
    expectedUplift: '+5% vitality, eco-gratitude',
  },
  {
    id: 'plant-care',
    name: 'Tend a Plant',
    icon: 'leaf',
    duration: 3,
    tags: ['Eco'],
    description: 'Water and care for a plant',
    instructions: [
      'Check your plant\'s soil',
      'Water if needed',
      'Remove any dead leaves',
      'Spend a moment observing its growth',
    ],
    expectedUplift: '+10% eco-connection, responsibility',
  },
  {
    id: 'gratitude',
    name: 'Gratitude Moment',
    icon: 'lightbulb',
    duration: 2,
    tags: ['Emotion'],
    description: 'Acknowledge three things you\'re grateful for',
    instructions: [
      'Pause and close your eyes',
      'Think of three specific things you\'re grateful for',
      'Feel the appreciation in your body',
      'Smile',
    ],
    expectedUplift: '+15% happiness, contentment',
  },
];

export const demoMessages: ChatMessage[] = [
  {
    id: 'm1',
    role: 'agent',
    content: 'Hello! I noticed you haven\'t logged your steps today. Would you like to go for a short walk?',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    provenance: 'Reason: low step count detected',
  },
  {
    id: 'm2',
    role: 'user',
    content: 'I\'m feeling a bit stressed today',
    timestamp: new Date(Date.now() - 3000000).toISOString(),
  },
  {
    id: 'm3',
    role: 'agent',
    content: 'I understand. Stress is natural. How about trying our 2-minute breathing exercise? It can help calm your nervous system.',
    timestamp: new Date(Date.now() - 2900000).toISOString(),
    provenance: 'Reason: user reported stress',
  },
];

export const demoMemories: MemoryEntry[] = [
  {
    id: 'mem1',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    mood: 'calm',
    content: 'Took a beautiful walk in the park today. The trees were stunning with autumn colors.',
    pinned: true,
  },
  {
    id: 'mem2',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    mood: 'energized',
    content: 'Completed my breathing exercises this morning. Feeling much more centered.',
  },
  {
    id: 'mem3',
    date: new Date().toISOString().split('T')[0],
    mood: 'grateful',
    content: 'Grateful for the small moments today - morning coffee, a friend\'s text, the sunset.',
  },
];

export const demoTrends: TrendDataPoint[] = Array.from({ length: 14 }, (_, i) => ({
  date: new Date(Date.now() - 86400000 * (13 - i)).toISOString().split('T')[0],
  mood: 5 + Math.floor(Math.random() * 4) + (i / 14) * 2, // Trending upward
  steps: 3000 + Math.floor(Math.random() * 5000),
  actions: Math.floor(Math.random() * 6) + 1,
}));

export const quickSuggestions = [
  'How can I improve my mood?',
  'What actions should I try today?',
  'Tell me about my progress',
  'What\'s good for the environment?',
];

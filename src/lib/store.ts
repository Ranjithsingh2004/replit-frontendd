/**
 * Zustand global state store for LUMEN EARTH
 */

import { create } from 'zustand';
import { storage, type StorageData, type JournalEntry, type UserSettings } from './storage';
import type { ChatMessage, MicroAction } from '@/data/seed';
import { demoMessages, microActions } from '@/data/seed';

interface LumenState {
  // Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;

  // Growth & Progress
  growthLevel: number;
  incrementGrowth: (amount: number) => void;

  // Completed actions
  completedActions: string[];
  completeAction: (actionId: string) => void;

  // Chat
  messages: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;

  // Journal
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  togglePinEntry: (id: string) => void;

  // Settings
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;

  // Demo mode
  demoMode: boolean;
  toggleDemoMode: () => void;

  // Available actions
  actions: MicroAction[];

  // Persistence
  saveToStorage: () => void;
  loadFromStorage: () => void;
  clearData: () => void;
}

export const useLumenStore = create<LumenState>((set, get) => ({
  // Initial state
  theme: 'light',
  growthLevel: 0,
  completedActions: [],
  messages: [],
  journalEntries: [],
  settings: {
    reducedMotion: false,
    fontSize: 'medium',
    notifications: true,
  },
  demoMode: false,
  actions: microActions,

  // Actions
  setTheme: (theme) => {
    set({ theme });
    get().saveToStorage();
  },

  incrementGrowth: (amount) => {
    set((state) => ({
      growthLevel: Math.min(100, state.growthLevel + amount),
    }));
    get().saveToStorage();
  },

  completeAction: (actionId) => {
    set((state) => ({
      completedActions: [...state.completedActions, actionId],
    }));
    get().incrementGrowth(5); // Each action adds 5% growth
    get().saveToStorage();
  },

  addMessage: (message) => {
    const newMessage: ChatMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString(),
    };
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  addJournalEntry: (entry) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: `entry-${Date.now()}`,
    };
    set((state) => ({
      journalEntries: [...state.journalEntries, newEntry],
    }));
    get().saveToStorage();
  },

  togglePinEntry: (id) => {
    set((state) => ({
      journalEntries: state.journalEntries.map((entry) =>
        entry.id === id ? { ...entry, pinned: !entry.pinned } : entry
      ),
    }));
    get().saveToStorage();
  },

  updateSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    }));
    get().saveToStorage();
  },

  toggleDemoMode: () => {
    const currentDemoMode = get().demoMode;
    if (!currentDemoMode) {
      // Enable demo mode: load demo data
      set({
        demoMode: true,
        messages: demoMessages,
        growthLevel: 45,
      });
    } else {
      // Disable demo mode: clear demo data
      set({
        demoMode: false,
        messages: [],
        growthLevel: 0,
      });
    }
  },

  saveToStorage: () => {
    const state = get();
    const data: Partial<StorageData> = {
      theme: state.theme,
      growthLevel: state.growthLevel,
      completedActions: state.completedActions,
      journalEntries: state.journalEntries,
      settings: state.settings,
      demoMode: state.demoMode,
    };
    storage.set(data);
  },

  loadFromStorage: () => {
    const data = storage.get();
    set({
      theme: data.theme,
      growthLevel: data.growthLevel,
      completedActions: data.completedActions,
      journalEntries: data.journalEntries,
      settings: data.settings,
      demoMode: data.demoMode,
    });
  },

  clearData: () => {
    storage.clear();
    set({
      growthLevel: 0,
      completedActions: [],
      messages: [],
      journalEntries: [],
    });
  },
}));

// Named export alias for consistency
export const useStore = useLumenStore;

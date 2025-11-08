/**
 * LocalStorage wrapper with namespace and type safety
 */

const STORAGE_KEY = 'lumen_earth_v1';

export interface StorageData {
  theme: 'light' | 'dark';
  growthLevel: number;
  completedActions: string[];
  journalEntries: JournalEntry[];
  settings: UserSettings;
  demoMode: boolean;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood?: string;
  pinned?: boolean;
}

export interface UserSettings {
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
  notifications: boolean;
  lowGraphicsMode?: boolean;
}

const defaultData: StorageData = {
  theme: 'light',
  growthLevel: 0,
  completedActions: [],
  journalEntries: [],
  settings: {
    reducedMotion: false,
    fontSize: 'medium',
    notifications: true,
    lowGraphicsMode: false,
  },
  demoMode: false,
};

export const storage = {
  get: (): StorageData => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return defaultData;
      return { ...defaultData, ...JSON.parse(stored) };
    } catch {
      return defaultData;
    }
  },

  set: (data: Partial<StorageData>): void => {
    try {
      const current = storage.get();
      const updated = { ...current, ...data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  clear: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },

  export: (): string => {
    const data = storage.get();
    return JSON.stringify(data, null, 2);
  },

  import: (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  },
};

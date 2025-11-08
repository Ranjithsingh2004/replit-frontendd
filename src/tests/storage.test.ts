/**
 * Storage utility tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { storage } from '../lib/storage';

describe('Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('gets default data when nothing stored', () => {
    const data = storage.get();
    expect(data.theme).toBe('light');
    expect(data.growthLevel).toBe(0);
  });

  it('sets and retrieves data', () => {
    storage.set({ growthLevel: 50 });
    const data = storage.get();
    expect(data.growthLevel).toBe(50);
  });

  it('exports data as JSON string', () => {
    storage.set({ growthLevel: 75 });
    const exported = storage.export();
    const parsed = JSON.parse(exported);
    expect(parsed.growthLevel).toBe(75);
  });

  it('clears all data', () => {
    storage.set({ growthLevel: 50 });
    storage.clear();
    const data = storage.get();
    expect(data.growthLevel).toBe(0);
  });
});

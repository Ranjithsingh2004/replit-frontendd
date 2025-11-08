/**
 * Theme switching tests
 */

import { describe, it, expect } from 'vitest';
import { toggleTheme } from '../lib/themeSwitch';

describe('Theme Switch', () => {
  it('toggles from light to dark', () => {
    const result = toggleTheme('light');
    expect(result).toBe('dark');
  });

  it('toggles from dark to light', () => {
    const result = toggleTheme('dark');
    expect(result).toBe('light');
  });
});

/**
 * Theme switching utilities
 */

import { applyTheme, type Theme } from '@/styles/theme';

export const toggleTheme = (currentTheme: Theme): Theme => {
  const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
  return newTheme;
};

export const initTheme = (theme: Theme) => {
  applyTheme(theme);
};

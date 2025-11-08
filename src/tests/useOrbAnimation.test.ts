/**
 * useOrbAnimation hook tests
 */

import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useOrbAnimation } from '../hooks/useOrbAnimation';

describe('useOrbAnimation', () => {
  it('calculates correct state for 0% growth', () => {
    const { result } = renderHook(() => useOrbAnimation(0));
    expect(result.current.treeScale).toBe(0.5);
    expect(result.current.leafCount).toBe(0);
  });

  it('calculates correct state for 50% growth', () => {
    const { result } = renderHook(() => useOrbAnimation(50));
    expect(result.current.treeScale).toBeGreaterThan(0.5);
    expect(result.current.leafCount).toBe(6);
  });

  it('calculates correct state for 100% growth', () => {
    const { result } = renderHook(() => useOrbAnimation(100));
    expect(result.current.treeScale).toBe(1.2);
    expect(result.current.leafCount).toBe(12);
  });

  it('clamps values outside 0-100 range', () => {
    const { result: negative } = renderHook(() => useOrbAnimation(-10));
    expect(negative.current.treeScale).toBe(0.5);

    const { result: above } = renderHook(() => useOrbAnimation(150));
    expect(above.current.treeScale).toBe(1.2);
  });
});

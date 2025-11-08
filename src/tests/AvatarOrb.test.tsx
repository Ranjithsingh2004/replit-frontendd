/**
 * AvatarOrb component tests
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import AvatarOrb from '../components/AvatarOrb';

describe('AvatarOrb', () => {
  it('renders with correct growth level', () => {
    const { container } = render(<AvatarOrb growthLevel={50} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders at minimum growth level (0)', () => {
    const { container } = render(<AvatarOrb growthLevel={0} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders at maximum growth level (100)', () => {
    const { container } = render(<AvatarOrb growthLevel={100} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('accepts custom size prop', () => {
    const { container } = render(<AvatarOrb growthLevel={50} size={300} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.width).toBe('300px');
  });
});

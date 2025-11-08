/**
 * Icon component wrapper for hand-drawn SVG icons
 * Supports stroke-based icons with configurable weight and active states
 */

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export type IconName =
  | 'breathe'
  | 'walk'
  | 'journal'
  | 'leaf'
  | 'lightbulb'
  | 'tree'
  | 'hydrate';

// Alias for backwards compatibility
export type IconType = IconName;

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  active?: boolean;
  animated?: boolean;
  strokeWidth?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 48,
  className,
  active = false,
  animated = false,
  strokeWidth = 2.5,
}) => {
  const iconPath = `/assets/icons/${name}.svg`;

  const iconClasses = clsx('icon-handdrawn', active && 'active', className);

  // Motion wrapper for animated icons
  if (animated) {
    return (
      <motion.img
        src={iconPath}
        alt={name}
        width={size}
        height={size}
        className={iconClasses}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        style={{
          filter: active ? 'drop-shadow(0 0 8px rgba(31, 135, 117, 0.3))' : 'none',
        }}
      />
    );
  }

  return (
    <img
      src={iconPath}
      alt={name}
      width={size}
      height={size}
      className={iconClasses}
      style={{
        strokeWidth,
        filter: active ? 'drop-shadow(0 0 8px rgba(31, 135, 117, 0.3))' : 'none',
      }}
    />
  );
};

export default Icon;

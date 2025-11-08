/**
 * GlassPanel - Animated glass card with gradient stroke
 * Provides depth with backdrop blur and scrolling gradient border
 */

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { getTransition, MOTION } from '@/styles/animation';

export interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  animatedBorder?: boolean;
  onClick?: () => void;
}

const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className,
  blur = 'md',
  glow = false,
  animatedBorder = false,
  onClick,
}) => {
  const blurValues = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  };

  return (
    <motion.div
      className={clsx(
        'relative rounded-2xl overflow-hidden',
        blurValues[blur],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02, y: -2 } : undefined}
      transition={getTransition({ duration: MOTION.MED, ease: MOTION.EASING })}
    >
      {/* Glass background */}
      <div
        className={clsx(
          'absolute inset-0 bg-white/10 dark:bg-white/5',
          glow && 'shadow-2xl shadow-accent-teal/20'
        )}
        style={{
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      />

      {/* Animated gradient border */}
      {animatedBorder && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--accent-teal), transparent)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '200% 0%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 p-6">{children}</div>

      {/* Bottom gradient accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-50"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--accent-teal), transparent)',
        }}
      />
    </motion.div>
  );
};

export default GlassPanel;

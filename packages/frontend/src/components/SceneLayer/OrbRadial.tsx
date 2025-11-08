/**
 * OrbRadial - Interactive radial menu around the AvatarOrb
 * Expands on hover/focus to reveal contextual actions
 * Uses spring physics for organic feel
 */

import { useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import Icon from '@/components/Icon';
import type { IconType } from '@/components/Icon';
import { MOTION, easing } from '@/styles/animation';

export interface RadialAction {
  id: string;
  icon: IconType;
  label: string;
  angle: number; // 0-360 degrees
  onClick: () => void;
}

interface OrbRadialProps {
  actions: RadialAction[];
  radius?: number; // Distance from center
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

const OrbRadial: React.FC<OrbRadialProps> = ({
  actions,
  radius = 120,
  isOpen = false,
  onToggle,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Spring for smooth expansion
  const expansion = useSpring(isOpen ? 1 : 0, {
    stiffness: 200,
    damping: 25,
  });

  const opacity = useTransform(expansion, [0, 0.3, 1], [0, 0.5, 1]);
  const scale = useTransform(expansion, [0, 1], [0.5, 1]);

  const handleMouseEnter = () => {
    onToggle?.(true);
  };

  const handleMouseLeave = () => {
    onToggle?.(false);
    setHoveredId(null);
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {actions.map((action) => {
        const angleRad = (action.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius;

        const isHovered = hoveredId === action.id;

        return (
          <motion.div
            key={action.id}
            className="absolute top-1/2 left-1/2 pointer-events-auto"
            style={{
              x: useTransform(expansion, [0, 1], [0, x]),
              y: useTransform(expansion, [0, 1], [0, y]),
              opacity,
              scale,
            }}
            onMouseEnter={() => setHoveredId(action.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <motion.button
              onClick={action.onClick}
              className="relative -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white-soft/80 dark:bg-ink-soft/80 backdrop-blur-md border border-ink-stroke/20 dark:border-white-soft/20 shadow-lg flex items-center justify-center group"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                duration: MOTION.FAST,
                ease: easing.snappy,
              }}
              aria-label={action.label}
            >
              {/* Glow on hover */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-accent-teal/20"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              )}

              {/* Icon */}
              <Icon
                name={action.icon}
                size={24}
                active={isHovered}
                animated
                className="relative z-10"
              />

              {/* Label tooltip */}
              {isHovered && (
                <motion.div
                  className="absolute top-full mt-2 px-3 py-1 bg-ink-base/90 dark:bg-white-soft/90 text-white-soft dark:text-ink-base text-xs font-medium rounded-full whitespace-nowrap shadow-lg"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: MOTION.FAST,
                    ease: easing.smooth,
                  }}
                >
                  {action.label}
                </motion.div>
              )}
            </motion.button>
          </motion.div>
        );
      })}

      {/* Center toggle hint (only when closed) */}
      {!isOpen && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-dashed border-accent-teal/30 pointer-events-none"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </div>
  );
};

export default OrbRadial;

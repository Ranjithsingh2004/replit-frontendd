/**
 * AvatarOrb - Central biome visualization with breathing animation
 * Tree grows leaves based on growthLevel prop, with particle effects on completion
 * Interactive: onClick triggers action, onHover shows tooltip
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrbAnimation } from '@/hooks/useOrbAnimation';
import { breatheVariants, leafPop, getTransition, MOTION } from '@/styles/animation';
import Tooltip from '@/components/ui/Tooltip';

export interface AvatarOrbProps {
  growthLevel: number; // 0-100
  size?: number;
  mood?: string;
  ecoGrade?: string;
  onClick?: () => void;
  onHover?: () => void;
  onLeafGrow?: () => void;
}

interface Particle {
  id: string;
  x: number;
  y: number;
}

const AvatarOrb: React.FC<AvatarOrbProps> = ({
  growthLevel,
  size = 200,
  mood = 'calm',
  ecoGrade = 'B+',
  onClick,
  onHover,
  onLeafGrow,
}) => {
  const { treeScale, leafCount, leafPositions, glowIntensity } = useOrbAnimation(growthLevel);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  // Trigger particle effect when leaf grows
  const handleLeafComplete = (x: number, y: number) => {
    const newParticle: Particle = {
      id: `particle-${Date.now()}-${Math.random()}`,
      x,
      y,
    };
    setParticles((prev) => [...prev, newParticle]);

    // Remove particle after animation
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1000);

    onLeafGrow?.();
  };

  const tooltipContent = `Mood: ${mood} • Eco Grade: ${ecoGrade}`;

  return (
    <Tooltip content={tooltipContent} position="bottom">
      <motion.div
        className="relative flex items-center justify-center cursor-pointer"
        style={{ width: size, height: size }}
        onClick={onClick}
        onMouseEnter={() => {
          setIsHovered(true);
          onHover?.();
        }}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={getTransition({ duration: MOTION.MED, ease: MOTION.EASING })}
        role="button"
        tabIndex={0}
        aria-label={`Biome orb: Growth ${growthLevel}%, ${mood}, eco grade ${ecoGrade}. Click to open chat.`}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        {/* Outer dashed ring */}
        <motion.svg
          className="absolute inset-0"
          viewBox="0 0 200 200"
          variants={breatheVariants}
          initial="initial"
          animate="animate"
        >
          <circle
            cx="100"
            cy="100"
            r="85"
            stroke="var(--ink-stroke)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="8 4"
            opacity="0.4"
          />
        </motion.svg>

        {/* Main orb with breathing animation and hover glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 40% 40%, rgba(47, 201, 168, ${glowIntensity}), rgba(31, 135, 117, ${glowIntensity * 0.8}), rgba(30, 111, 98, ${glowIntensity * 0.4}))`,
            boxShadow: isHovered
              ? `0 12px 48px rgba(31, 135, 117, ${glowIntensity * 0.36}), 0 0 64px rgba(31, 135, 117, ${glowIntensity * 0.24})`
              : `0 8px 32px rgba(31, 135, 117, ${glowIntensity * 0.24}), 0 0 48px rgba(31, 135, 117, ${glowIntensity * 0.12})`,
            filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
            transition: 'all 0.28s ease',
          }}
          variants={breatheVariants}
          initial="initial"
          animate="animate"
        >
          {/* Inner highlight */}
          <div
            className="absolute top-[15%] left-[15%] w-[20%] h-[20%] rounded-full bg-white"
            style={{ opacity: 0.2 }}
          />
        </motion.div>

      {/* Tree visualization */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ scale: treeScale }}
        animate={{ scale: treeScale }}
        transition={getTransition({ duration: 0.8, ease: 'easeOut' })}
      >
        {/* Tree trunk (SVG) */}
        <svg className="absolute" width="40" height="80" viewBox="0 0 40 80">
          <path
            d="M16 80 L16 40 L24 40 L24 80"
            stroke="var(--ink-stroke)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="20" cy="30" r="15" stroke="var(--ink-stroke)" strokeWidth="2.5" fill="none" />
        </svg>

        {/* Animated leaves */}
        <AnimatePresence>
          {leafPositions.map((leaf, index) => (
            <motion.div
              key={`leaf-${index}`}
              className="absolute"
              style={{
                left: `calc(50% + ${leaf.x}px)`,
                top: `calc(50% + ${leaf.y}px)`,
              }}
              variants={leafPop}
              initial="initial"
              animate="animate"
              onAnimationComplete={() => {
                if (index === leafCount - 1) {
                  handleLeafComplete(leaf.x, leaf.y);
                }
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                style={{
                  transform: `rotate(${leaf.rotation}deg)`,
                  opacity: leaf.opacity,
                }}
              >
                <path
                  d="M5 19 Q5 10, 12 6 Q19 10, 19 19"
                  stroke="var(--accent-teal)"
                  strokeWidth="2"
                  fill="rgba(31, 135, 117, 0.2)"
                />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Bloom particles */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute text-accent-teal font-handwritten text-sm pointer-events-none"
              style={{
                left: `calc(50% + ${particle.x}px)`,
                top: `calc(50% + ${particle.y}px)`,
              }}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -30, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              +1
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      </motion.div>
    </Tooltip>
  );
};

export default AvatarOrb;

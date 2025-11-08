/**
 * AvatarOrbEnhanced - Premium biome orb with visible growth ring
 * Features: Breathing animation, progress ring, hover glow, keyboard accessible
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrbAnimation } from '@/hooks/useOrbAnimation';

export interface AvatarOrbEnhancedProps {
  growthLevel: number; // 0-100
  size?: number;
  mood?: string;
  ecoGrade?: string;
  onClick?: () => void;
  onHover?: () => void;
  onLeafGrow?: () => void;
  showTooltip?: boolean;
}

interface Particle {
  id: string;
  x: number;
  y: number;
}

const AvatarOrbEnhanced: React.FC<AvatarOrbEnhancedProps> = ({
  growthLevel,
  size = 240,
  mood = 'calm',
  ecoGrade = 'B+',
  onClick,
  onHover,
  onLeafGrow,
  showTooltip = true,
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

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1000);

    onLeafGrow?.();
  };

  // Calculate ring progress (circumference)
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = (growthLevel / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
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
        transition={{ duration: 0.28, ease: [0.2, 0.9, 0.2, 1] }}
        role="button"
        tabIndex={0}
        aria-label={`Biome orb: Level ${Math.floor(growthLevel / 10)}, Growth ${growthLevel}%, ${mood}, eco grade ${ecoGrade}. Click to interact.`}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        {/* Growth Ring (Background) */}
        <svg
          className="absolute inset-0"
          viewBox="0 0 200 200"
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Background ring */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="var(--border-light)"
            strokeWidth="3"
            fill="none"
          />

          {/* Progress ring */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            stroke="var(--accent-teal)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </svg>

        {/* Main orb with breathing animation */}
        <motion.div
          className="absolute rounded-full shadow-orb"
          style={{
            width: `${size * 0.7}px`,
            height: `${size * 0.7}px`,
            background: `radial-gradient(circle at 40% 40%, rgba(47, 201, 168, ${glowIntensity}), rgba(31, 135, 117, ${glowIntensity * 0.8}), rgba(30, 111, 98, ${glowIntensity * 0.4}))`,
            boxShadow: isHovered
              ? `0 12px 48px rgba(31, 135, 117, ${glowIntensity * 0.36}), 0 0 96px rgba(31, 135, 117, ${glowIntensity * 0.24})`
              : `0 8px 32px rgba(31, 135, 117, ${glowIntensity * 0.24}), 0 0 64px rgba(31, 135, 117, ${glowIntensity * 0.16})`,
          }}
          animate={{
            scale: [0.985, 1.02, 0.985],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Inner highlight */}
          <div
            className="absolute top-[15%] left-[15%] w-[20%] h-[20%] rounded-full bg-white"
            style={{ opacity: 0.2 }}
          />
        </motion.div>

        {/* Tree visualization */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ scale: treeScale }}
          animate={{ scale: treeScale }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Tree trunk (SVG) */}
          <svg className="absolute" width="40" height="80" viewBox="0 0 40 80">
            <path
              d="M16 80 L16 40 L24 40 L24 80"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle
              cx="20"
              cy="30"
              r="15"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="2.5"
              fill="none"
            />
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
                initial={{ scale: 0, rotate: -10, opacity: 0 }}
                animate={{
                  scale: [0, 1.15, 1],
                  rotate: [-10, 5, 0],
                  opacity: [0, 1, 1]
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
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
                    stroke="rgba(255, 255, 255, 0.9)"
                    strokeWidth="2"
                    fill="rgba(255, 255, 255, 0.2)"
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
                className="absolute text-white font-handwritten text-sm pointer-events-none"
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

        {/* Hover tooltip */}
        {showTooltip && isHovered && (
          <motion.div
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 px-4 py-2 bg-bg-card border border-border-medium rounded-xl shadow-card backdrop-blur-md whitespace-nowrap"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-center">
              <p className="text-h4 font-handwritten text-accent-teal">
                Level {Math.floor(growthLevel / 10)}
              </p>
              <p className="text-caption text-text-muted">
                {growthLevel}% growth • {mood} • Grade {ecoGrade}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Growth percentage label */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center">
        <p className="text-display font-bold text-accent-teal">
          {growthLevel}%
        </p>
      </div>
    </div>
  );
};

export default AvatarOrbEnhanced;

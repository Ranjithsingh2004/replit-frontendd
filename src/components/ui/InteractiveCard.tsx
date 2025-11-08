/**
 * InteractiveCard - Card with parallax tilt on hover and ink flourish
 * Provides tactile depth and micro-interaction feedback
 */

import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import clsx from 'clsx';
import { MOTION } from '@/styles/animation';

export interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tiltStrength?: number;
  showInkFlourish?: boolean;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className,
  onClick,
  tiltStrength = 10,
  showInkFlourish = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 15 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Calculate tilt (-tiltStrength to +tiltStrength degrees)
    const tiltX = (y - 0.5) * -tiltStrength;
    const tiltY = (x - 0.5) * tiltStrength;

    rotateX.set(tiltX);
    rotateY.set(tiltY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className={clsx('relative card-paper', onClick && 'cursor-pointer', className)}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: MOTION.FAST }}
    >
      {/* Depth shadow layer */}
      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-teal/5 to-transparent opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: 'translateZ(-10px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>

      {/* Ink flourish on hover */}
      {showInkFlourish && isHovered && (
        <motion.div
          className="absolute top-2 right-2 pointer-events-none"
          initial={{ scale: 0, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 0.6 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'backOut' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2 Q14 4, 16 6 Q18 8, 20 10 L12 12 Z"
              stroke="var(--ink-stroke)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="var(--accent-teal)"
              fillOpacity="0.1"
            />
          </svg>
        </motion.div>
      )}

      {/* Micro shadow shift */}
      <motion.div
        className="absolute -inset-1 rounded-xl -z-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(31, 135, 117, 0.1), transparent)',
          filter: 'blur(8px)',
          opacity: isHovered ? 0.6 : 0,
        }}
        transition={{ duration: MOTION.MED }}
      />
    </motion.div>
  );
};

export default InteractiveCard;

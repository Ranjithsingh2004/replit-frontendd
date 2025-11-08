/**
 * Card component with paper texture aesthetic
 * Supports hover effects and hand-drawn border style
 */

import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import { getTransition, transitions } from '@/styles/animation';

export interface CardProps extends HTMLMotionProps<'div'> {
  hoverable?: boolean;
  glass?: boolean;
  noPadding?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hoverable = false, glass = false, noPadding = false, className, children, ...props }, ref) => {
    const baseClasses = 'rounded-xl transition-all duration-200';

    const classes = clsx(
      baseClasses,
      glass ? 'glass-panel' : 'card-paper',
      !noPadding && 'p-6',
      className
    );

    if (hoverable) {
      return (
        <motion.div
          ref={ref}
          className={classes}
          whileHover={{ y: -4, scale: 1.02 }}
          transition={getTransition(transitions.gentle)}
          {...props}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <motion.div ref={ref} className={classes} {...props}>
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;

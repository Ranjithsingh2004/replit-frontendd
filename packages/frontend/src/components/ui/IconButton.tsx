/**
 * IconButton component for icon-only actions
 */

import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import { getTransition, transitions } from '@/styles/animation';

export interface IconButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost';
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = 'md', variant = 'default', className, children, disabled, ...props }, ref) => {
    const sizeClasses = {
      sm: 'p-1.5',
      md: 'p-2',
      lg: 'p-3',
    };

    const variantClasses = {
      default: 'bg-white/80 dark:bg-white-soft/5 shadow-paper hover:shadow-paper-hover',
      ghost: 'hover:bg-accent-teal/10',
    };

    const classes = clsx(
      'rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    return (
      <motion.button
        ref={ref}
        className={classes}
        disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.1 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        transition={getTransition(transitions.snappy)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;

/**
 * QuickActions - Progressive action cards with clear CTAs
 * Features: Pill-style primary button, hover lift, completion animation, progress indicators
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
import type { MicroAction } from '@/data/seed';
import { motion as motionTokens } from '@/styles/theme';

interface QuickActionsProps {
  actions: MicroAction[];
  completedActions: string[];
  onActionClick: (actionId: string) => void;
  onInfoClick?: (actionId: string) => void;
}

/**
 * Action Card - Individual action with primary CTA
 */
const ActionCard: React.FC<{
  action: MicroAction;
  isCompleted: boolean;
  onClick: () => void;
  onInfoClick?: () => void;
}> = ({ action, isCompleted, onClick, onInfoClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);

  const handleClick = () => {
    if (isCompleted) return;

    setShowCompletionAnimation(true);
    setTimeout(() => setShowCompletionAnimation(false), 1000);
    onClick();
  };

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: [0.2, 0.9, 0.2, 1] }}
    >
      <div
        className={`
          relative bg-bg-card border border-border-light rounded-xl p-6
          transition-shadow duration-280
          ${isHovered ? 'shadow-card-hover' : 'shadow-card'}
          ${isCompleted ? 'opacity-60' : ''}
        `}
      >
        {/* Completion checkmark overlay */}
        {isCompleted && (
          <div className="absolute top-4 right-4 w-8 h-8 bg-accent-teal rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* Completion animation */}
        <AnimatePresence>
          {showCompletionAnimation && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="text-accent-teal">
                <path
                  d="M12 2L8 12h8L12 2z"
                  fill="currentColor"
                  opacity="0.6"
                />
                <circle cx="12" cy="16" r="2" fill="currentColor" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header: Icon + Title */}
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 bg-accent-teal-light rounded-xl flex items-center justify-center">
            <Icon name={action.icon} size={24} active={isHovered} />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-h4 font-medium text-text-primary mb-1">
              {action.name}
            </h3>
            <p className="text-caption text-text-muted">
              {action.duration} min • {action.tags.join(', ')}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-body-sm text-text-secondary mb-4 line-clamp-2">
          {action.description}
        </p>

        {/* Expected uplift hint */}
        <div className="flex items-center gap-2 mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-accent-teal">
            <path
              d="M12 2v20M12 2l-4 4m4-4l4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-caption text-accent-teal font-medium">
            {action.expectedUplift}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          {/* Primary CTA - Pill style */}
          <button
            onClick={handleClick}
            disabled={isCompleted}
            className={`
              flex-1 px-6 py-3 rounded-full font-medium text-body-sm
              transition-all duration-280
              ${isCompleted
                ? 'bg-bg-muted text-text-muted cursor-not-allowed'
                : 'bg-accent-teal text-white hover:shadow-lg hover:scale-105 active:scale-98'
              }
            `}
            aria-label={isCompleted ? `${action.name} completed` : `Start ${action.name}`}
          >
            {isCompleted ? 'Completed' : 'Do it'}
          </button>

          {/* Secondary action - Info */}
          {onInfoClick && (
            <button
              onClick={onInfoClick}
              className="w-12 h-12 rounded-full bg-bg-muted hover:bg-border-light transition-colors flex items-center justify-center"
              aria-label="More info"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-text-secondary">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 16v-4m0-4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Ripple effect on click */}
        {isHovered && !isCompleted && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(31, 135, 117, 0.1) 0%, transparent 70%)',
            }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        )}
      </div>
    </motion.div>
  );
};

/**
 * QuickActions Component - Stacked action cards
 */
const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  completedActions,
  onActionClick,
  onInfoClick,
}) => {
  // Group by priority (mock: show uncompleted first)
  const sortedActions = [...actions].sort((a, b) => {
    const aCompleted = completedActions.includes(a.id);
    const bCompleted = completedActions.includes(b.id);
    if (aCompleted === bCompleted) return 0;
    return aCompleted ? 1 : -1;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-h3 font-handwritten text-text-primary mb-2">
          Quick Actions
        </h2>
        <p className="text-body-sm text-text-muted">
          Small steps for mindful growth
        </p>
      </div>

      {/* Action cards */}
      <motion.div
        className="space-y-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {sortedActions.map((action, index) => (
          <motion.div
            key={action.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.4,
                  ease: [0.2, 0.9, 0.2, 1],
                },
              },
            }}
          >
            <ActionCard
              action={action}
              isCompleted={completedActions.includes(action.id)}
              onClick={() => onActionClick(action.id)}
              onInfoClick={onInfoClick ? () => onInfoClick(action.id) : undefined}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Completion summary */}
      {completedActions.length > 0 && (
        <motion.div
          className="mt-8 p-4 bg-accent-teal-light rounded-xl border border-accent-teal/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-teal rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-body">
                {completedActions.length}
              </span>
            </div>
            <div>
              <p className="text-body-sm font-medium text-text-primary">
                Actions completed today
              </p>
              <p className="text-caption text-text-muted">
                Keep the momentum going! 🌱
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuickActions;

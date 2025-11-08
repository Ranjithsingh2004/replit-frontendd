/**
 * Toast - Notification system with undo capability
 * Slide-in animation, auto-dismiss, aria-live for screen readers
 */

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { zIndex } from '@/styles/theme';

export interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number; // ms, 0 = no auto-dismiss
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextValue {
  showToast: (toast: Omit<Toast, 'id'>) => string;
  dismissToast: (id: string) => void;
  toasts: Toast[];
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/**
 * Toast Provider - Manages toast state
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>): string => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = {
      id,
      duration: 5000, // default 5s
      ...toast,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        dismissToast(id);
      }, newToast.duration);
    }

    return id;
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast, toasts }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

/**
 * useToast hook - Access toast functions
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

/**
 * Toast Container - Renders toasts
 */
const ToastContainer: React.FC<{
  toasts: Toast[];
  onDismiss: (id: string) => void;
}> = ({ toasts, onDismiss }) => {
  return (
    <div
      className="fixed bottom-6 right-6 flex flex-col gap-3 max-w-sm"
      style={{ zIndex: zIndex.toast }}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
};

/**
 * Toast Item - Individual toast
 */
const ToastItem: React.FC<{
  toast: Toast;
  onDismiss: (id: string) => void;
}> = ({ toast, onDismiss }) => {
  const typeColors = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  };

  const typeIcons = {
    success: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-green-600 dark:text-green-400">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    info: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-600 dark:text-blue-400">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M12 16v-4m0-4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    warning: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber-600 dark:text-amber-400">
        <path d="M12 2L2 20h20L12 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 10v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    error: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-red-600 dark:text-red-400">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M15 9l-6 6m0-6l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  };

  const colorClass = toast.type ? typeColors[toast.type] : 'bg-bg-card border-border-medium';
  const icon = toast.type ? typeIcons[toast.type] : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{
        duration: 0.28,
        ease: [0.2, 0.9, 0.2, 1],
      }}
      className={`
        ${colorClass}
        rounded-xl border shadow-card backdrop-blur-md
        p-4 flex items-start gap-3 min-w-[320px]
      `}
      role="alert"
    >
      {/* Icon */}
      {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-body-sm text-text-primary font-medium">
          {toast.message}
        </p>
      </div>

      {/* Action Button */}
      {toast.action && (
        <button
          onClick={() => {
            toast.action?.onClick();
            onDismiss(toast.id);
          }}
          className="flex-shrink-0 px-3 py-1 bg-accent-teal text-white text-caption font-medium rounded-lg hover:bg-opacity-90 transition-all active:scale-95"
        >
          {toast.action.label}
        </button>
      )}

      {/* Dismiss Button */}
      <button
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 w-6 h-6 rounded-md hover:bg-border-light transition-colors flex items-center justify-center"
        aria-label="Dismiss notification"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-text-muted">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </motion.div>
  );
};

/**
 * Helper function to show success toast with undo
 */
export const showSuccessWithUndo = (
  showToast: ToastContextValue['showToast'],
  message: string,
  onUndo: () => void
): string => {
  return showToast({
    message,
    type: 'success',
    duration: 5000,
    action: {
      label: 'Undo',
      onClick: onUndo,
    },
  });
};

export default Toast;

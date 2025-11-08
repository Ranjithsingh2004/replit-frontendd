/**
 * useOptimisticState - Optimistic UI updates with undo capability
 * Updates state immediately, provides 5s undo window before commit
 */

import { useState, useCallback, useRef } from 'react';

export interface UndoItem<T> {
  id: string;
  previousValue: T;
  newValue: T;
  timestamp: number;
  onCommit: () => void;
  onUndo: () => void;
}

const UNDO_WINDOW_MS = 5000; // 5 seconds

export const useOptimisticState = <T,>(
  initialValue: T,
  persistFn?: (value: T) => void
): {
  value: T;
  setValue: (newValue: T, onCommit?: () => void) => string;
  undo: (id: string) => void;
  pendingUndos: UndoItem<T>[];
} => {
  const [value, setValueState] = useState<T>(initialValue);
  const [pendingUndos, setPendingUndos] = useState<UndoItem<T>[]>([]);
  const timeoutRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const setValue = useCallback(
    (newValue: T, onCommit?: () => void): string => {
      const id = `undo-${Date.now()}-${Math.random()}`;
      const previousValue = value;

      // Optimistically update
      setValueState(newValue);

      // Create undo item
      const undoItem: UndoItem<T> = {
        id,
        previousValue,
        newValue,
        timestamp: Date.now(),
        onCommit: () => {
          persistFn?.(newValue);
          onCommit?.();
        },
        onUndo: () => {
          setValueState(previousValue);
        },
      };

      setPendingUndos((prev) => [...prev, undoItem]);

      // Auto-commit after UNDO_WINDOW_MS
      const timeout = setTimeout(() => {
        undoItem.onCommit();
        setPendingUndos((prev) => prev.filter((item) => item.id !== id));
        timeoutRefs.current.delete(id);
      }, UNDO_WINDOW_MS);

      timeoutRefs.current.set(id, timeout);

      return id;
    },
    [value, persistFn]
  );

  const undo = useCallback((id: string) => {
    const timeout = timeoutRefs.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutRefs.current.delete(id);
    }

    setPendingUndos((prev) => {
      const item = prev.find((u) => u.id === id);
      if (item) {
        item.onUndo();
      }
      return prev.filter((u) => u.id !== id);
    });
  }, []);

  return {
    value,
    setValue,
    undo,
    pendingUndos,
  };
};

/**
 * Custom hook for demo mode automation
 * Simulates user activity to demonstrate app features
 */

import { useEffect, useRef } from 'react';
import { useLumenStore } from '@/lib/store';
import { microActions, demoMessages } from '@/data/seed';

export const useDemoMode = () => {
  const { demoMode, incrementGrowth, addMessage, completeAction } = useLumenStore();
  const intervalRef = useRef<number | null>(null);
  const messageIndexRef = useRef(0);

  useEffect(() => {
    if (!demoMode) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Simulate activity every 10-30 seconds
    intervalRef.current = window.setInterval(() => {
      const randomAction = Math.random();

      if (randomAction < 0.3) {
        // 30% chance: increment growth
        incrementGrowth(2);
      } else if (randomAction < 0.6) {
        // 30% chance: complete a random action
        const action = microActions[Math.floor(Math.random() * microActions.length)];
        completeAction(action.id);
      } else if (randomAction < 0.9) {
        // 30% chance: add a message
        if (messageIndexRef.current < demoMessages.length) {
          addMessage(demoMessages[messageIndexRef.current]);
          messageIndexRef.current++;
        }
      }
    }, Math.random() * 20000 + 10000); // 10-30 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [demoMode, incrementGrowth, addMessage, completeAction]);
};

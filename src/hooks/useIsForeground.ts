import { useEffect, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

export const useIsForeground = (): boolean => {
  const [isForeground, setIsForeground] = useState(
    AppState.currentState === 'active', // Initialize with the true current state
  );

  useEffect(() => {
    const onChange = (state: AppStateStatus): void => {
      setIsForeground(state === 'active');
    };

    // Use the returned subscription object for cleanup
    const subscription = AppState.addEventListener('change', onChange);

    return () => {
      subscription.remove();
    };
  }, []); // Empty dependency array

  return isForeground;
};

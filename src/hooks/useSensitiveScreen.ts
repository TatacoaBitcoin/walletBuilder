import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { CaptureProtection } from 'react-native-capture-protection';

type CaptureOptions = {
  screenshot?: boolean;
  record?: boolean;
  appSwitcher?: boolean;
};

const DEFAULT_OPTIONS: CaptureOptions = {
  screenshot: true,
  record: true,
  appSwitcher: true,
};

const useSensitiveScreen = (
  shouldProtect = true,
  options: CaptureOptions = DEFAULT_OPTIONS,
) => {
  useFocusEffect(
    useCallback(() => {
      if (shouldProtect) {
        CaptureProtection.prevent(options);
        return () => {
          CaptureProtection.allow(options);
        };
      }
      return () => {};
    }, [shouldProtect, options]),
  );
};

export default useSensitiveScreen;

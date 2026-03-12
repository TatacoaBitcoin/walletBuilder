import React from 'react';
import { StatusBar } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme as NavDarkTheme,
} from '@react-navigation/native';
import 'react-native-get-random-values';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './i18n.config';
import { useResponseModal } from './src/context/ModalProvider';
import { StackFlow } from './src/navigation/StackFlow';
import { ResponseModal } from './src/molecules';
import { useThemeColors, useIsDarkTheme } from './src/hooks/useThemeColors';

const App = () => {
  const { state, hideModal } = useResponseModal();
  const colors = useThemeColors();
  const isDark = useIsDarkTheme();

  const navigationTheme = {
    ...(isDark ? NavDarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? NavDarkTheme.colors : DefaultTheme.colors),
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.textPrimary,
      border: colors.border,
      notification: colors.error,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <StackFlow />
        <ResponseModal
          visible={state.visible}
          type={state.type}
          message={state.message}
          onClose={hideModal}
        />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;

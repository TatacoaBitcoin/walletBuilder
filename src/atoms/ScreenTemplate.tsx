import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeColors } from '../hooks/useThemeColors';

type Props = {
  children: ReactNode;
};

const ScreenTemplate = ({ children }: Props) => {
  const colors = useThemeColors();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {children}
    </SafeAreaView>
  );
};

export { ScreenTemplate };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

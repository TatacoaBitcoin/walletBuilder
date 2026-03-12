import { useColorScheme } from 'react-native';

import { usePreferencesState } from '../context/PreferencesProvider';
import { ThemeMode } from '../types';
import { LightTheme, DarkTheme, ThemeColors } from '../styles/colors';

export const useIsDarkTheme = (): boolean => {
  const { themeMode } = usePreferencesState();
  const systemScheme = useColorScheme();

  if (themeMode === ThemeMode.light) {
    return false;
  }
  if (themeMode === ThemeMode.dark) {
    return true;
  }
  return systemScheme === 'dark';
};

export const useThemeColors = (): ThemeColors => {
  const isDark = useIsDarkTheme();
  return isDark ? DarkTheme : LightTheme;
};

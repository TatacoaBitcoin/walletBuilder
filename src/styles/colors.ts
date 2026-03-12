export type ThemeColors = {
  primary: string;
  error: string;
  success: string;
  info: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  background: string;
  backgroundSecondary: string;
  surface: string;
  border: string;
  overlay: string;
  transparent: string;
};

export const LightTheme: ThemeColors = {
  primary: '#F7931A',
  error: '#EB5757',
  success: '#27AE60',
  info: '#2D9CDB',
  accent: '#BB6BD9',
  textPrimary: '#000000',
  textSecondary: '#777777',
  textTertiary: '#999999',
  textDisabled: '#BBBBBB',
  background: '#F4F4F4',
  backgroundSecondary: '#EDEDED',
  surface: '#FFFFFF',
  border: '#DEDEDE',
  overlay: 'rgba(0,0,0,0.5)',
  transparent: 'transparent',
};

export const DarkTheme: ThemeColors = {
  primary: '#F89B2A',
  error: '#EC6363',
  success: '#36B46B',
  info: '#3CA3DE',
  accent: '#C075DC',
  textPrimary: '#FFFFFF',
  textSecondary: '#949494',
  textTertiary: '#787878',
  textDisabled: '#5C5C5C',
  background: '#1A1A1A',
  backgroundSecondary: '#2D2D2D',
  surface: '#000000',
  border: '#444444',
  overlay: 'rgba(0,0,0,0.7)',
  transparent: 'transparent',
};

export const Colors = LightTheme;

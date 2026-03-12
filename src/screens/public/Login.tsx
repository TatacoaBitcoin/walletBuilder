import React from 'react';
import { Text } from 'react-native';

import { ScreenTemplate } from '../../atoms';
import { useThemeColors } from '../../hooks/useThemeColors';

const Login = () => {
  const colors = useThemeColors();

  return (
    <ScreenTemplate>
      <Text style={{ color: colors.textPrimary }}>Login</Text>
    </ScreenTemplate>
  );
};

export { Login };

import React from 'react';
import { Text } from 'react-native';
import { Button } from '@react-navigation/elements';

import { ScreenTemplate } from '../../atoms';
import { PublicFlowScreenProps, Routes } from '../../navigation/types';
import { useThemeColors } from '../../hooks/useThemeColors';

const Welcome = ({ navigation }: PublicFlowScreenProps<Routes.Welcome>) => {
  const colors = useThemeColors();

  return (
    <ScreenTemplate>
      <Text style={{ color: colors.textPrimary }}>Welcome</Text>
      <Button onPress={() => navigation.navigate(Routes.Login)}>Login</Button>
    </ScreenTemplate>
  );
};

export { Welcome };

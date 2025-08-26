import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from '@react-navigation/elements';

import { ScreenTemplate } from '../../atoms';
import { PublicFlowScreenProps, Routes } from '../../navigation/types';

const Welcome = ({ navigation }: PublicFlowScreenProps<Routes.Welcome>) => {
  return (
    <ScreenTemplate>
      <Text>Welcome</Text>
      <Button onPress={() => navigation.navigate(Routes.Login)}>Login</Button>
    </ScreenTemplate>
  );
};

export { Welcome };

const styles = StyleSheet.create({});

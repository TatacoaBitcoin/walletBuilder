import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from '@react-navigation/elements';

import { ScreenTemplate } from '../../atoms';
import { Routes } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <ScreenTemplate>
      <Text>Home</Text>
      <Button onPress={() => navigation.navigate(Routes.Language)}>
        Change Language
      </Button>
    </ScreenTemplate>
  );
};

export { Home };

const styles = StyleSheet.create({});

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { useTranslation } from 'react-i18next';

import { ScreenTemplate } from '../../atoms';
import { Routes } from '../../navigation/types';
import { TEST } from '@env';

const Home = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  console.log('var', TEST);

  return (
    <ScreenTemplate>
      <Text>Home</Text>
      <Button onPress={() => navigation.navigate(Routes.Scanner)}>
        {t('Home.ScannerBtn')}
      </Button>
    </ScreenTemplate>
  );
};

export { Home };

const styles = StyleSheet.create({});

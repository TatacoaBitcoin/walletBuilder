import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useTranslation } from 'react-i18next';

import { ScreenTemplate } from '../../atoms';
import { Routes } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <ScreenTemplate>
      <Text>Home</Text>
      <Button onPress={() => navigation.navigate(Routes.Language)}>
        {t('Home.LanguageBtn')}
      </Button>
    </ScreenTemplate>
  );
};

export { Home };

const styles = StyleSheet.create({});

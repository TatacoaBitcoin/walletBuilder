import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useTranslation } from 'react-i18next';

import { ScreenTemplate } from '../../atoms';
import { Routes } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <ScreenTemplate>
      <Text>Settings</Text>
      <Button onPress={() => navigation.navigate(Routes.Language)}>
        {t('Settings.LanguageBtn')}
      </Button>
    </ScreenTemplate>
  );
};

export { Settings };

const styles = StyleSheet.create({});

import React from 'react';
import { StyleSheet, View } from 'react-native';
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
      <View style={styles.container}>
        <Button onPress={() => navigation.navigate(Routes.Language)}>
          {t('Settings.LanguageBtn')}
        </Button>
        <Button onPress={() => navigation.navigate(Routes.Currency)}>
          {t('Settings.CurrencyBtn')}
        </Button>
      </View>
    </ScreenTemplate>
  );
};

export { Settings };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
});

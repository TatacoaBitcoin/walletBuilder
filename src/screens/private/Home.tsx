import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { useTranslation } from 'react-i18next';

import { ScreenTemplate } from '../../atoms';
import { Routes } from '../../navigation/types';
import { usePreferencesState } from '../../context/PreferencesProvider';
import fonts from '../../styles/fonts';

const Home = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { currency } = usePreferencesState();

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={{ fontFamily: fonts.bold }}>Home</Text>
        <Text>Currency: {currency.label}</Text>
        <Button onPress={() => navigation.navigate(Routes.Scanner)}>
          {t('Home.ScannerBtn')}
        </Button>
      </View>
    </ScreenTemplate>
  );
};

export { Home };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
});

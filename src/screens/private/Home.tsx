import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { useTranslation } from 'react-i18next';

import { QrCode, ScreenTemplate } from '../../atoms';
import { Routes } from '../../navigation/types';
import Logo from '../../../assets/images/btc.svg';
import { copyToClipboard, getFromClipboard } from '../../utils/clipboard';
import { getStoredString, storeString } from '../../utils/storage';
import { usePreferencesState } from '../../context/PreferencesProvider';

const Home = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { currency } = usePreferencesState();

  const getClipboard = async () => {
    await getFromClipboard();
  };

  const getString = async () => {
    await getStoredString('box');
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text>Home</Text>
        <Text>Currency: {currency.label}</Text>
        <Logo width={50} height={50} />
        <QrCode data={'https://www.google.com'} />
        <Button onPress={() => navigation.navigate(Routes.Scanner)}>
          {t('Home.ScannerBtn')}
        </Button>
        <Button onPress={() => copyToClipboard('Test')}>
          Copy to clipboard
        </Button>
        <Button onPress={getClipboard}>Get from clipboard</Button>
        <Button onPress={() => storeString('box', 'test2!')}>
          Store to storage
        </Button>
        <Button onPress={getString}>Get from storage</Button>
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

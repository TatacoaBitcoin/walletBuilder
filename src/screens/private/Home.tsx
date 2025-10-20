import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { useTranslation } from 'react-i18next';

import { QrCode, ScreenTemplate } from '../../atoms';
import { Routes } from '../../navigation/types';
import { TEST } from '@env';
import Logo from '../../../assets/images/btc.svg';
import { copyToClipboard, getFromClipboard } from '../../utils/clipboard';
import { getStoredString, storeString } from '../../utils/storage';

const Home = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  console.log('var', TEST);

  const getClipboard = async () => {
    const clipboard = await getFromClipboard();
    console.log(clipboard);
  };

  const getString = async () => {
    const response = await getStoredString('box');
    console.log(response);
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text>Home</Text>
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

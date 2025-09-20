import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ScreenTemplate } from '../../atoms';
import { useBreezState } from '../../context/BreezProvider';

const Home = () => {
  const { t } = useTranslation();
  const { balance } = useBreezState();

  console.log('balance', balance);

  return (
    <ScreenTemplate>
      <Text>Home</Text>
    </ScreenTemplate>
  );
};

export { Home };

const styles = StyleSheet.create({});

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ScreenTemplate } from '../../atoms';

const Home = () => {
  const { t } = useTranslation();

  return (
    <ScreenTemplate>
      <Text>Home</Text>
    </ScreenTemplate>
  );
};

export { Home };

const styles = StyleSheet.create({});

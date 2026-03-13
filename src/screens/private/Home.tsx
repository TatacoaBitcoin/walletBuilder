import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { useTranslation } from 'react-i18next';

import { ScreenTemplate } from '../../atoms';
import { Routes } from '../../navigation/types';
import { usePreferencesState } from '../../context/PreferencesProvider';
import fonts from '../../styles/fonts';
import { useResponseModal } from '../../context/ModalProvider';
import useSensitiveScreen from '../../hooks/useSensitiveScreen';
import { useThemeColors } from '../../hooks/useThemeColors';

const Home = () => {
  useSensitiveScreen();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { currency } = usePreferencesState();
  const { showModal } = useResponseModal();
  const colors = useThemeColors();

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={{ fontFamily: fonts.bold, color: colors.textPrimary }}>
          Home
        </Text>
        <Text style={{ color: colors.textPrimary }}>
          Currency: {currency.label}
        </Text>
        <Button
          onPress={() => navigation.getParent()?.navigate(Routes.Scanner)}
        >
          {t('Home.ScannerBtn')}
        </Button>
        <Button onPress={() => showModal('success', 'This is a success!')}>
          Show Modal
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

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { margin, padding } from '../../../styles/spacing';
import { CURRENCIES } from '../../../config/localization/currencies';
import { usePreferencesState } from '../../../context/PreferencesProvider';
import { Currency as CurrencyType } from '../../../types';
import { useThemeColors } from '../../../hooks/useThemeColors';

const Currency = () => {
  const navigation = useNavigation();
  const { currencySetup } = usePreferencesState();
  const colors = useThemeColors();

  const onPress = (item: CurrencyType) => {
    currencySetup(item);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {CURRENCIES.map(item => (
        <TouchableOpacity
          key={item.value}
          style={[styles.itemContainer, { borderBottomColor: colors.border }]}
          onPress={() => onPress(item)}
        >
          <Text style={[styles.itemText, { color: colors.textPrimary }]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export { Currency };

const styles = StyleSheet.create({
  container: {
    padding: padding.md,
  },
  itemContainer: {
    marginBottom: margin.md,
    borderBottomWidth: 1,
  },
  itemText: {
    paddingBottom: padding.sm,
  },
});

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { margin, padding } from '../../../styles/spacing';
import { CURRENCIES } from '../../../config/localization/currencies';
import { usePreferencesState } from '../../../context/PreferencesProvider';
import { Currency as CurrencyType } from '../../../types';

const Currency = () => {
  const navigation = useNavigation();
  const { currencySetup } = usePreferencesState();

  const onPress = (item: CurrencyType) => {
    currencySetup(item);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {CURRENCIES.map(item => (
        <TouchableOpacity
          key={item.value}
          style={styles.itemContainer}
          onPress={() => onPress(item)}
        >
          <Text style={styles.itemText}>{item.label}</Text>
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
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  itemText: {
    paddingBottom: padding.sm,
  },
});

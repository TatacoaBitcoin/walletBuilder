import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { margin, padding } from '../../../styles/spacing';
import { LANGUAGES } from '../../../config/localization/languages';

const Language = () => {
  const navigation = useNavigation();
  const { i18n } = useTranslation();

  const onPress = (value: string) => {
    i18n.changeLanguage(value);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {LANGUAGES.map(item => (
        <TouchableOpacity
          key={item.value}
          style={styles.itemContainer}
          onPress={() => onPress(item.value)}
        >
          <Text style={styles.itemText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export { Language };

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

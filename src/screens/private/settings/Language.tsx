import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { margin, padding } from '../../../styles/spacing';
import { LANGUAGES_LIST } from '../../../config/localization/languages';
import { usePreferencesState } from '../../../context/PrefencesProvider';
import { Languages } from '../../../types';

const Language = () => {
  const navigation = useNavigation();
  const { languageSetup } = usePreferencesState();

  const onPress = (value: string) => {
    languageSetup(value as Languages);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {LANGUAGES_LIST.map(item => (
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

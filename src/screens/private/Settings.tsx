import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { ScreenTemplate } from '../../atoms';
import { Routes } from '../../navigation/types';
import { usePreferencesState } from '../../context/PreferencesProvider';
import { useThemeColors } from '../../hooks/useThemeColors';
import { ThemeMode } from '../../types';
import { padding } from '../../styles/spacing';

const THEME_OPTIONS = [
  { value: ThemeMode.system, labelKey: 'Settings.ThemeSystem' },
  { value: ThemeMode.light, labelKey: 'Settings.ThemeLight' },
  { value: ThemeMode.dark, labelKey: 'Settings.ThemeDark' },
] as const;

const Settings = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { themeMode, themeSetup } = usePreferencesState();
  const colors = useThemeColors();

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Button onPress={() => navigation.getParent()?.navigate(Routes.Language)}>
          {t('Settings.LanguageBtn')}
        </Button>
        <Button onPress={() => navigation.getParent()?.navigate(Routes.Currency)}>
          {t('Settings.CurrencyBtn')}
        </Button>

        <Text style={[styles.label, { color: colors.textPrimary }]}>
          {t('Settings.ThemeLabel')}
        </Text>
        <View style={styles.themeRow}>
          {THEME_OPTIONS.map(option => {
            const isSelected = themeMode === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.themeOption,
                  { borderColor: isSelected ? colors.primary : colors.border },
                ]}
                onPress={() => themeSetup(option.value)}
              >
                <Text
                  style={[
                    styles.themeOptionText,
                    { color: isSelected ? colors.primary : colors.textSecondary },
                  ]}
                >
                  {t(option.labelKey)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScreenTemplate>
  );
};

export { Settings };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    paddingHorizontal: padding.md,
  },
  themeRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: padding.md,
  },
  themeOption: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  themeOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

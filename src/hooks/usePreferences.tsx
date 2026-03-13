import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Currency, Languages, StorageKeys, ThemeMode } from '../types';
import { storeObject, storeString } from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_CURRENCY: Currency = {
  decimals: true,
  label: 'USD - US Dollar',
  value: 'USD',
};

const DEFAULT_LANG = Languages.en;
const DEFAULT_THEME = ThemeMode.system;

export const usePreferences = () => {
  const { i18n } = useTranslation(); //i18n instance

  const [isLoadingPreferences, setIsLoadingPreferences] = useState(false);
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [language, setLanguage] = useState<Languages>(DEFAULT_LANG);
  const [themeMode, setThemeMode] = useState<ThemeMode>(DEFAULT_THEME);

  const currencySetup = useCallback(async (selectedCurrency: Currency) => {
    try {
      setCurrency(selectedCurrency);
      await storeObject(StorageKeys.CURRENCY, selectedCurrency);
    } catch (error) {
      console.warn('Error setting currency preference', error);
    }
  }, []);

  const languageSetup = useCallback(
    async (value: Languages) => {
      try {
        setLanguage(value);
        await storeString(StorageKeys.LANGUAGE, value);
        await i18n.changeLanguage(value); //changes the app language
      } catch (error) {
        console.warn('Error setting language preference', error);
      }
    },
    [i18n],
  );

  const themeSetup = useCallback(async (value: ThemeMode) => {
    try {
      setThemeMode(value);
      await storeString(StorageKeys.THEME, value);
    } catch (error) {
      console.warn('Error setting theme preference', error);
    }
  }, []);

  const loadPreferences = useCallback(async () => {
    setIsLoadingPreferences(true);
    try {
      const values = await AsyncStorage.getMany([
        StorageKeys.CURRENCY,
        StorageKeys.LANGUAGE,
        StorageKeys.THEME,
      ]);
      const currencyValue = values[StorageKeys.CURRENCY];
      const languageValue = values[StorageKeys.LANGUAGE];
      const themeValue = values[StorageKeys.THEME];

      if (currencyValue) {
        setCurrency(JSON.parse(currencyValue));
      }

      if (languageValue) {
        setLanguage(languageValue as Languages);
        await i18n.changeLanguage(languageValue);
      }

      if (themeValue) {
        setThemeMode(themeValue as ThemeMode);
      }
    } catch (error) {
      console.warn('Error reading settings', error);
    } finally {
      setIsLoadingPreferences(false);
    }
  }, [i18n]);

  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);

  return {
    isLoadingPreferences,
    currency,
    language,
    currencySetup,
    languageSetup,
    themeMode,
    themeSetup,
  };
};

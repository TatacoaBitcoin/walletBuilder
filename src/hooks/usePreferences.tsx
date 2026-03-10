import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Currency, Languages, StorageKeys } from '../types';
import { storeObject, storeString } from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_CURRENCY: Currency = {
  decimals: true,
  label: 'USD - US Dollar',
  value: 'USD',
};

const DEFAULT_LANG = Languages.en;

export const usePreferences = () => {
  const { i18n } = useTranslation(); //i18n instance

  const [isLoadingPreferences, setIsLoadingPreferences] = useState(false);
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [language, setLanguage] = useState<Languages>(DEFAULT_LANG);

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

  const loadPreferences = useCallback(async () => {
    setIsLoadingPreferences(true);
    try {
      const value = await AsyncStorage.multiGet([
        StorageKeys.CURRENCY,
        StorageKeys.LANGUAGE,
      ]);
      const [currencyEntry, languageEntry] = value;

      if (currencyEntry[1]) {
        setCurrency(JSON.parse(currencyEntry[1]));
      }

      if (languageEntry[1]) {
        setLanguage(languageEntry[1] as Languages);
        await i18n.changeLanguage(languageEntry[1]);
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
  };
};

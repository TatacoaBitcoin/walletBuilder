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

  const [isloadingPreferences, setIsLoadingPreferences] = useState(false);
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [language, setLanguage] = useState<Languages>(DEFAULT_LANG);

  const currencySetup = useCallback(async (selectedCurrency: Currency) => {
    try {
      setCurrency(selectedCurrency);
      await storeObject(StorageKeys.CURRENCY, selectedCurrency);
    } catch (error) {
      console.log('Error setting currency preference', error);
    }
  }, []);

  const languageSetup = useCallback(
    async (value: Languages) => {
      try {
        setLanguage(value);
        await storeString(StorageKeys.LANGUAGE, value);
        await i18n.changeLanguage(value); //changes the app language
      } catch (error) {
        console.log('Error setting language preference', error);
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
      if (value[0][1]) {
        languageSetup(value[1][1]);
        setCurrency(JSON.parse(value[0][1]));
      } else {
        setCurrency(DEFAULT_CURRENCY);
        languageSetup(DEFAULT_LANG);
      }
    } catch (error) {
      console.log('Error reading settings', error);
    } finally {
      setIsLoadingPreferences(false);
    }
  }, []);

  useEffect(() => {
    loadPreferences();
  }, []);

  return {
    isloadingPreferences,
    currency,
    language,
    currencySetup,
    languageSetup,
  };
};

import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Currency, Languages, StorageKeys } from '../types';
import { storeObject, storeString } from '../utils/storage';

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

  return { currency, language, currencySetup, languageSetup };
};

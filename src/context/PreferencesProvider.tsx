import React, { createContext, useContext, ReactNode } from 'react';

import { Currency, Languages } from '../types';
import { usePreferences } from '../hooks/usePreferences';

interface PreferencesContextType {
  isLoadingPreferences: boolean;
  currency: Currency;
  language: Languages;
  currencySetup: (selectedCurrency: Currency) => void;
  languageSetup: (value: Languages) => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(
  undefined,
);

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const {
    isLoadingPreferences,
    currency,
    language,
    currencySetup,
    languageSetup,
  } = usePreferences();

  const state = {
    isLoadingPreferences,
    currency,
    language,
    currencySetup,
    languageSetup,
  };

  return (
    <PreferencesContext.Provider value={state}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferencesState = () => {
  const preferencesContext = useContext(PreferencesContext);

  if (!preferencesContext) {
    throw new Error(
      'usePreferencesState has to be used within <PreferencesContext.Provider>',
    );
  }

  return preferencesContext;
};

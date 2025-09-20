import React, { createContext, useContext } from 'react';
import {
  AssetBalance,
  Payment,
} from '@breeztech/react-native-breez-sdk-liquid';

import { useBreez } from '../hooks/useBreez';

interface BreezContextType {
  balance: AssetBalance[];
  payments: Payment[];
}

interface BreezProviderProps {
  children: React.ReactNode;
}

const defaultValue = {
  balance: [],
  payments: [],
};

const BreezContext = createContext<BreezContextType>(defaultValue);

export const useBreezState = () => {
  const breezContext = useContext(BreezContext);

  if (!breezContext) {
    throw new Error(
      'useBreezState has to be used within <BreezContext.Provider>',
    );
  }

  return breezContext;
};

export const BreezProvider: React.FC<BreezProviderProps> = ({ children }) => {
  const { balance, payments } = useBreez();

  const state: BreezContextType = {
    balance,
    payments,
  };

  return (
    <BreezContext.Provider value={state}>{children}</BreezContext.Provider>
  );
};

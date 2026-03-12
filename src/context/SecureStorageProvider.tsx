import React, { createContext, useContext, ReactNode } from 'react';

import { BIOMETRY_TYPE, type AuthenticationPrompt } from 'react-native-keychain';
import { useSecureStorage } from '../hooks/useSecureStorage';

interface SecureStorageContextType {
  biometryType: BIOMETRY_TYPE | null;
  isBiometryAvailable: boolean;
  isLoading: boolean;
  storeSecurely: (
    key: string,
    value: string,
    service: string,
    authPrompt?: AuthenticationPrompt,
  ) => Promise<boolean>;
  retrieveSecurely: (
    service: string,
    authPrompt?: AuthenticationPrompt,
  ) => Promise<{ key: string; value: string } | null>;
  removeSecurely: (service: string) => Promise<boolean>;
  hasSecureData: (service: string) => Promise<boolean>;
  storeObjectSecurely: <T extends Record<string, unknown>>(
    key: string,
    value: T,
    service: string,
    authPrompt?: AuthenticationPrompt,
  ) => Promise<boolean>;
  retrieveObjectSecurely: <T>(
    service: string,
    authPrompt?: AuthenticationPrompt,
  ) => Promise<T | null>;
  refreshBiometry: () => Promise<void>;
}

const SecureStorageContext = createContext<
  SecureStorageContextType | undefined
>(undefined);

export const SecureStorageProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const secureStorage = useSecureStorage();

  return (
    <SecureStorageContext.Provider value={secureStorage}>
      {children}
    </SecureStorageContext.Provider>
  );
};

export const useSecureStorageState = () => {
  const context = useContext(SecureStorageContext);

  if (!context) {
    throw new Error(
      'useSecureStorageState has to be used within <SecureStorageProvider>',
    );
  }

  return context;
};

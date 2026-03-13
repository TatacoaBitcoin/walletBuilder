import { useState, useCallback, useEffect } from 'react';
import {
  BIOMETRY_TYPE,
  type AuthenticationPrompt,
} from 'react-native-keychain';

import {
  setSecureItem,
  getSecureItem,
  removeSecureItem,
  hasSecureItem,
  setSecureObject,
  getSecureObject,
  getSupportedBiometry,
  canAuthenticate,
} from '../utils/secureStorage';

export const useSecureStorage = () => {
  const [biometryType, setBiometryType] = useState<BIOMETRY_TYPE | null>(null);
  const [isBiometryAvailable, setIsBiometryAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshBiometry = useCallback(async () => {
    setIsLoading(true);
    try {
      const [type, available] = await Promise.all([
        getSupportedBiometry(),
        canAuthenticate(),
      ]);
      setBiometryType(type);
      setIsBiometryAvailable(available);
    } catch (error) {
      console.warn('Error checking biometry', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshBiometry();
  }, [refreshBiometry]);

  const storeSecurely = useCallback(
    async (
      key: string,
      value: string,
      service: string,
      authPrompt?: AuthenticationPrompt,
    ) => {
      return setSecureItem(key, value, service, authPrompt);
    },
    [],
  );

  const retrieveSecurely = useCallback(
    async (service: string, authPrompt?: AuthenticationPrompt) => {
      return getSecureItem(service, authPrompt);
    },
    [],
  );

  const removeSecurely = useCallback(async (service: string) => {
    return removeSecureItem(service);
  }, []);

  const hasSecureData = useCallback(async (service: string) => {
    return hasSecureItem(service);
  }, []);

  const storeObjectSecurely = useCallback(
    async <T extends Record<string, unknown>>(
      key: string,
      value: T,
      service: string,
      authPrompt?: AuthenticationPrompt,
    ) => {
      return setSecureObject(key, value, service, authPrompt);
    },
    [],
  );

  const retrieveObjectSecurely = useCallback(
    async <T,>(service: string, authPrompt?: AuthenticationPrompt) => {
      return getSecureObject<T>(service, authPrompt);
    },
    [],
  );

  return {
    biometryType,
    isBiometryAvailable,
    isLoading,
    storeSecurely,
    retrieveSecurely,
    removeSecurely,
    hasSecureData,
    storeObjectSecurely,
    retrieveObjectSecurely,
    refreshBiometry,
  };
};

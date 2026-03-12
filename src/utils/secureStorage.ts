import * as Keychain from 'react-native-keychain';
import { Platform } from 'react-native';

const DEFAULT_AUTH_PROMPT: Keychain.AuthenticationPrompt = {
  title: 'Authenticate to access your wallet',
  cancel: 'Cancel',
};

const getSetOptions = (
  authPrompt?: Keychain.AuthenticationPrompt,
): Keychain.SetOptions => ({
  accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
  accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
  authenticationPrompt: authPrompt ?? DEFAULT_AUTH_PROMPT,
  ...(Platform.OS === 'android' && {
    securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
    storage: Keychain.STORAGE_TYPE.AES_GCM,
  }),
});

const getGetOptions = (
  authPrompt?: Keychain.AuthenticationPrompt,
): Keychain.GetOptions => ({
  accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
  authenticationPrompt: authPrompt ?? DEFAULT_AUTH_PROMPT,
});

export const setSecureItem = async (
  key: string,
  value: string,
  service: string,
  authPrompt?: Keychain.AuthenticationPrompt,
): Promise<boolean> => {
  try {
    const result = await Keychain.setGenericPassword(key, value, {
      ...getSetOptions(authPrompt),
      service,
    });
    return result !== false;
  } catch (e) {
    console.warn('secure storage error (set)', e);
    return false;
  }
};

export const getSecureItem = async (
  service: string,
  authPrompt?: Keychain.AuthenticationPrompt,
): Promise<{ key: string; value: string } | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      ...getGetOptions(authPrompt),
      service,
    });
    if (credentials === false) {
      return null;
    }
    return { key: credentials.username, value: credentials.password };
  } catch (e) {
    console.warn('secure storage error (get)', e);
    return null;
  }
};

export const removeSecureItem = async (service: string): Promise<boolean> => {
  try {
    return await Keychain.resetGenericPassword({ service });
  } catch (e) {
    console.warn('secure storage error (remove)', e);
    return false;
  }
};

export const hasSecureItem = async (service: string): Promise<boolean> => {
  try {
    return await Keychain.hasGenericPassword({ service });
  } catch (e) {
    console.warn('secure storage error (has)', e);
    return false;
  }
};

export const setSecureObject = async <T extends Record<string, unknown>>(
  key: string,
  value: T,
  service: string,
  authPrompt?: Keychain.AuthenticationPrompt,
): Promise<boolean> => {
  return setSecureItem(key, JSON.stringify(value), service, authPrompt);
};

export const getSecureObject = async <T>(
  service: string,
  authPrompt?: Keychain.AuthenticationPrompt,
): Promise<T | null> => {
  const item = await getSecureItem(service, authPrompt);
  if (!item) {
    return null;
  }
  try {
    return JSON.parse(item.value) as T;
  } catch (e) {
    console.warn('secure storage error (parse)', e);
    return null;
  }
};

export const getSupportedBiometry =
  async (): Promise<Keychain.BIOMETRY_TYPE | null> => {
    try {
      return await Keychain.getSupportedBiometryType();
    } catch (e) {
      console.warn('secure storage error (biometry check)', e);
      return null;
    }
  };

export const canAuthenticate = async (): Promise<boolean> => {
  try {
    const biometry = await Keychain.getSupportedBiometryType();
    if (biometry) {
      return true;
    }
    return await Keychain.canImplyAuthentication({
      authenticationType:
        Keychain.AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
    });
  } catch (e) {
    console.warn('secure storage error (auth check)', e);
    return false;
  }
};

import { NetInfoStateType } from '@react-native-community/netinfo';

export enum Languages {
  cz = 'cz',
  en = 'en',
  fr = 'fr',
  it = 'it',
  ja = 'ja',
  ko = 'ko',
  pt = 'pt',
  zh = 'zh',
  es = 'es',
}

export type Currency = {
  decimals: boolean;
  label: string;
  value: string;
};

export enum StorageKeys {
  CURRENCY = 'CURRENCY',
  LANGUAGE = 'LANGUAGE',
}

export enum SecureStorageKeys {
  MNEMONIC = 'MNEMONIC',
  PRIVATE_KEY = 'PRIVATE_KEY',
  PIN = 'PIN',
  WALLET_CREDENTIALS = 'WALLET_CREDENTIALS',
}

export type ModalType = 'success' | 'error' | 'info';

export type DeviceInfo = {
  isLoadingInfo: boolean;
  OS: string;
  brand: string;
  isCameraPresent: boolean;
  carrier: string;
  deviceId: string;
  version: string;
  uniqueId: string;
  userAgent: string;
  isAirplaneMode: boolean;
  isEmulator: boolean;
  isPinOrFingerprintSet: boolean;
  isTablet: boolean;
  isLowRamDevice: boolean;
  isLandscape: boolean;
  hasGms: boolean;
  deviceType: string;
  isLocationEnabled: boolean;
};

export type NetworkInfo = {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  type: NetInfoStateType;
  details: any;
};

export type Location = {
  latitude: number;
  longitude: number;
};

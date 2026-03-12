import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Info from 'react-native-device-info';

import { DeviceInfo } from '../types';

export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    // synchronous values
    brand: Info.getBrand(),
    deviceId: Info.getDeviceId(),
    version: Info.getReadableVersion(),
    isTablet: Info.isTablet(),
    isLowRamDevice: Info.isLowRamDevice(),
    deviceType: Info.getDeviceType(),
    OS: Platform.OS,
    // asynchronous values
    isCameraPresent: false,
    carrier: '',
    uniqueId: '',
    userAgent: '',
    isAirplaneMode: false,
    isEmulator: false,
    isPinOrFingerprintSet: false,
    isLandscape: false,
    hasGms: false,
    isLocationEnabled: false,
    isLoadingInfo: true,
  });

  const fetchInfo = useCallback(async () => {
    try {
      const [
        isCameraPresent,
        carrier,
        userAgent,
        isAirplaneMode,
        isEmulator,
        isPinOrFingerprintSet,
        isLandscape,
        hasGms,
        isLocationEnabled,
        // uniqueId,
      ] = await Promise.all([
        Info.isCameraPresent(),
        Info.getCarrier(),
        Info.getUserAgent(),
        Info.isAirplaneMode(),
        Info.isEmulator(),
        Info.isPinOrFingerprintSet(),
        Info.isLandscape(),
        Info.hasGms(),
        Info.isLocationEnabled(),
        // Info.getUniqueId(), // Use only when necessary
      ]);

      setDeviceInfo(prevInfo => ({
        ...prevInfo,
        isCameraPresent,
        carrier,
        userAgent,
        isAirplaneMode,
        isEmulator,
        isPinOrFingerprintSet,
        isLandscape,
        hasGms,
        isLocationEnabled,
        // uniqueId,
        isLoadingInfo: false,
      }));
    } catch (error) {
      console.error('Failed to fetch device info:', error);
      setDeviceInfo(prevInfo => ({
        ...prevInfo,
        isLoadingInfo: false,
      }));
    }
  }, []);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  return deviceInfo;
};

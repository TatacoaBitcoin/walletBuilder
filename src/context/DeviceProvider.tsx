import React, { createContext, useContext } from 'react';

import { useIpAddress } from '../hooks/useIpAddress';
import { useDeviceInfo } from '../hooks/useDeviceInfo';
import { useNetworkInfo } from '../hooks/useNetworkInfo';
import { DeviceInfo, NetworkInfo } from '../types';

export interface DeviceContextType {
  ipAddress: string;
  device: DeviceInfo;
  network: NetworkInfo;
}

interface DeviceProviderProps {
  children: React.ReactNode;
}

export const DeviceContext = createContext<DeviceContextType | null>(null);

export const useDeviceState = () => {
  const deviceContext = useContext(DeviceContext);

  if (!deviceContext) {
    throw new Error(
      'useDeviceState has to be used within <DeviceContext.Provider>',
    );
  }

  return deviceContext;
};

export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
  const { ipAddress } = useIpAddress();
  const device = useDeviceInfo();
  const network = useNetworkInfo();

  const state: DeviceContextType = {
    ipAddress,
    device,
    network,
  };

  return (
    <DeviceContext.Provider value={state}>{children}</DeviceContext.Provider>
  );
};

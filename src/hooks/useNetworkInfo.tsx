import { useEffect, useState } from 'react';
import {
  NetInfoStateType,
  addEventListener,
} from '@react-native-community/netinfo';
import { NetworkInfo } from '../types';

export const useNetworkInfo = () => {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    isConnected: false,
    isInternetReachable: false,
    type: NetInfoStateType.none,
    details: {},
  });

  useEffect(() => {
    const unsubscribe = addEventListener(state => {
      setNetworkInfo(state);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return networkInfo;
};

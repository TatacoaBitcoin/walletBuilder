import { useEffect, useState } from 'react';
import {
  NetInfoStateType,
  addEventListener,
  fetch,
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

    fetch().then(initialState => {
      setNetworkInfo(initialState);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return networkInfo;
};

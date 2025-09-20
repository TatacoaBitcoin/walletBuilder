import { useCallback, useEffect, useState } from 'react';
import {
  addEventListener,
  AssetBalance,
  connect,
  defaultConfig,
  getInfo,
  LiquidNetwork,
  listPayments,
  Payment,
  SdkEvent,
  SdkEventVariant,
} from '@breeztech/react-native-breez-sdk-liquid';

import { BREEZ_API_KEY, MNEMONICS } from '@env';

export const useBreez = () => {
  const [balance, setBalance] = useState<AssetBalance[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  const getBalance = useCallback(async () => {
    try {
      const walletInfo = await getInfo();
      setBalance(walletInfo?.walletInfo?.assetBalances);
    } catch (error) {
      console.error('getBalance', error);
    }
  }, []);

  const getPayments = useCallback(async () => {
    try {
      const paymentsData = await listPayments({});
      setPayments(paymentsData);
    } catch (error) {
      console.error('getPayments', error);
    }
  }, []);

  const onEvent = useCallback(async (newEvent: SdkEvent) => {
    const { type } = newEvent;

    if (type === SdkEventVariant.SYNCED) {
      await getBalance();
      await getPayments();
    }
  }, []);

  const init = useCallback(async () => {
    const config = await defaultConfig(LiquidNetwork.MAINNET, BREEZ_API_KEY);

    try {
      await connect({ mnemonic: MNEMONICS, config });
      await addEventListener(onEvent);
    } catch (error) {
      console.error('init', error);
      throw new Error('errors.initNode');
    }

    return true;
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return {
    balance,
    payments,
    getPayments,
  };
};

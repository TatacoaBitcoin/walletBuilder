import { useState } from 'react';
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

  const getBalance = async () => {
    try {
      const walletInfo = await getInfo();
      setBalance(walletInfo?.walletInfo?.assetBalances);
    } catch (error) {
      console.error('getBalance', error);
    }
  };

  const getPayments = async () => {
    try {
      const paymentsData = await listPayments({});
      setPayments(paymentsData);
    } catch (error) {
      console.error('getPayments', error);
    }
  };

  const onEvent = async (newEvent: SdkEvent) => {
    const { type } = newEvent;

    if (type === SdkEventVariant.SYNCED) {
      await getBalance();
      await getPayments();
    }
  };

  const init = async () => {
    const config = await defaultConfig(LiquidNetwork.MAINNET, BREEZ_API_KEY);

    try {
      await connect({ mnemonic: MNEMONICS, config });
      await addEventListener(onEvent);
      await getBalance();
      await getPayments();
    } catch (error) {
      console.error('init', error);
      throw new Error('errors.initNode');
    }

    return true;
  };

  return {
    balance,
    payments,
    init,
    getPayments,
  };
};

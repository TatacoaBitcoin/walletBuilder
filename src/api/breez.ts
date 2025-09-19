import {
  addEventListener,
  connect,
  defaultConfig,
  getInfo,
  LiquidNetwork,
  SdkEvent,
} from '@breeztech/react-native-breez-sdk-liquid';

import { BREEZ_API_KEY, MNEMONICS } from '@env';

const init = async () => {
  const mnemonic = MNEMONICS;
  const config = await defaultConfig(LiquidNetwork.MAINNET, BREEZ_API_KEY);

  try {
    await connect({ mnemonic, config });
    await addEventListener(onEvent);
  } catch (error) {
    console.log('init', error);
  }
};

const onEvent = (e: SdkEvent) => {
  console.log(`Received event: ${e.type}`);
};

const getBalance = async () => {
  try {
    const walletInfo = await getInfo();
    console.log(walletInfo?.walletInfo?.assetBalances);
  } catch (error) {
    console.log('error getting info', error);
  }
};

export default {
  init,
  getBalance,
};

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-get-random-values';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './i18n.config';
import { PublicFlow } from './src/navigation/PublicFlow';
import { PrivateFlow } from './src/navigation/PrivateFlow';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        {false ? <PublicFlow /> : <PrivateFlow />}
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PublicFlow } from './src/navigation/PublicFlow';
import { PrivateFlow } from './src/navigation/PrivateFlow';
import './i18n.config';

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

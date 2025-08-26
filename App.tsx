import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PublicFlow } from './src/navigation/PublicFlow';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <PublicFlow />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;

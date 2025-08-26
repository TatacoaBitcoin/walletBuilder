import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Welcome } from './src/screens';

const App = () => {
  return (
    <SafeAreaProvider>
      <Welcome />
    </SafeAreaProvider>
  );
};

export default App;

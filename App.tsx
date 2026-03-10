import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-get-random-values';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './i18n.config';
import { useResponseModal } from './src/context/ModalProvider';
import { StackFlow } from './src/navigation/StackFlow';

const App = () => {
  const { state, hideModal } = useResponseModal();

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StackFlow />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;

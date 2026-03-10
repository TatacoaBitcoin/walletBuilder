import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-get-random-values';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './i18n.config';
import { useResponseModal } from './src/context/ModalProvider';
import { StackFlow } from './src/navigation/StackFlow';
import { ResponseModal } from './src/molecules';

const App = () => {
  const { state, hideModal } = useResponseModal();

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StackFlow />
        <ResponseModal
          visible={state.visible}
          type={state.type}
          message={state.message}
          onClose={hideModal}
        />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;

import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';
import { PreferencesProvider } from './src/context/PreferencesProvider';
import { ResponseModalProvider } from './src/context/ModalProvider';
import { SecureStorageProvider } from './src/context/SecureStorageProvider';

const AppWithProviders = () => {
  return (
    <PreferencesProvider>
      <ResponseModalProvider>
        <SecureStorageProvider>
          <App />
        </SecureStorageProvider>
      </ResponseModalProvider>
    </PreferencesProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppWithProviders);

import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';
import { PreferencesProvider } from './src/context/PreferencesProvider';
import { ResponseModalProvider } from './src/context/ModalProvider';

const AppWithProviders = () => {
  return (
    <PreferencesProvider>
      <ResponseModalProvider>
        <App />
      </ResponseModalProvider>
    </PreferencesProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppWithProviders);

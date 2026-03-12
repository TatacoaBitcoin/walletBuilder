import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';
import { PreferencesProvider } from './src/context/PreferencesProvider';
import { ResponseModalProvider } from './src/context/ModalProvider';
import { DeviceProvider } from './src/context/DeviceProvider';

const AppWithProviders = () => {
  return (
    <DeviceProvider>
      <PreferencesProvider>
        <ResponseModalProvider>
          <App />
        </ResponseModalProvider>
      </PreferencesProvider>
    </DeviceProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppWithProviders);

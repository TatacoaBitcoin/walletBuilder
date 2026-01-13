import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';
import { PreferencesProvider } from './src/context/PrefencesProvider';

const AppWithProviders = () => {
  return (
    <PreferencesProvider>
      <App />
    </PreferencesProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppWithProviders);

import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';
import { BreezProvider } from './src/context/BreezProvider';

const AppWithProviders = () => {
  return (
    <BreezProvider>
      <App />
    </BreezProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppWithProviders);

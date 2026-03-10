import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StackFlowParamList, Routes } from './types';
import { TabsFlow } from './TabsFlow';
import { Currency, Language, Login, Scanner, Welcome } from '../screens';

const Stack = createNativeStackNavigator<StackFlowParamList>();

const STACK_OPTIONS = {};
const isAuthenticated = true;

export const StackFlow = () => {
  return (
    <Stack.Navigator screenOptions={STACK_OPTIONS}>
      {isAuthenticated ? (
        <Stack.Group>
          <Stack.Screen
            name={Routes.Main}
            component={TabsFlow}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.Language}
            component={Language}
            options={{ headerShown: false, presentation: 'modal' }}
          />
          <Stack.Screen
            name={Routes.Currency}
            component={Currency}
            options={{ headerShown: false, presentation: 'modal' }}
          />
          <Stack.Screen name={Routes.Scanner} component={Scanner} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name={Routes.Welcome}
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen name={Routes.Login} component={Login} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

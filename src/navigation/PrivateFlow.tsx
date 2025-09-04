import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PrivateFlowParamList, Routes } from './types';
import { TabsFlow } from './TabsFlow';
import { Language, Scanner } from '../screens';

const Stack = createNativeStackNavigator<PrivateFlowParamList>();

const STACK_OPTIONS = {};

export const PrivateFlow = () => {
  return (
    <Stack.Navigator screenOptions={STACK_OPTIONS}>
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
      <Stack.Screen name={Routes.Scanner} component={Scanner} />
    </Stack.Navigator>
  );
};

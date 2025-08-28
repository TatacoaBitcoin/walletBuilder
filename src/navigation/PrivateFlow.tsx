import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PrivateFlowParamList } from './types';
import { TabsFlow } from './TabsFlow';
import { Language } from '../screens';

const Stack = createNativeStackNavigator<PrivateFlowParamList>();

const STACK_OPTIONS = {};

export const PrivateFlow = () => {
  return (
    <Stack.Navigator screenOptions={STACK_OPTIONS}>
      <Stack.Screen
        name="Main"
        component={TabsFlow}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Language"
        component={Language}
        options={{ headerShown: false, presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
};

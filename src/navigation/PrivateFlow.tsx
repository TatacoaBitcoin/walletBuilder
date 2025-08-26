import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PrivateFlowParamList } from './types';
import { TabsFlow } from './TabsFlow';

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
    </Stack.Navigator>
  );
};

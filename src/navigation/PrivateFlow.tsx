import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PrivateFlowParamList, Routes } from './types';
import { Home } from '../screens';

const Stack = createNativeStackNavigator<PrivateFlowParamList>();

const STACK_OPTIONS = {};

export const PrivateFlow = () => {
  return (
    <Stack.Navigator screenOptions={STACK_OPTIONS}>
      <Stack.Screen
        name={Routes.Home}
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

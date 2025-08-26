import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PublicFlowParamList, Routes } from './types';
import { Login, Welcome } from '../screens';

const Stack = createNativeStackNavigator<PublicFlowParamList>();

const STACK_OPTIONS = {};

export const PublicFlow = () => {
  return (
    <Stack.Navigator screenOptions={STACK_OPTIONS}>
      <Stack.Screen
        name={Routes.Welcome}
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={Routes.Login} component={Login} />
    </Stack.Navigator>
  );
};

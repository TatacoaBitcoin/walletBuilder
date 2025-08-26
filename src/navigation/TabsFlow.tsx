import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Routes } from './types';
import { Home, Settings } from '../screens';

const Tab = createBottomTabNavigator();

export const TabsFlow = () => {
  return (
    <Tab.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name={Routes.Home}
        component={Home}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name={Routes.Settings}
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

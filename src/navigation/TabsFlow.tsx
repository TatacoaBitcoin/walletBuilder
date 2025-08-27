import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

import { Routes } from './types';
import { Home, Settings } from '../screens';

const Tab = createBottomTabNavigator();

export const TabsFlow = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name={Routes.Home}
        component={Home}
        options={{
          tabBarLabel: t('navigation.privateFlow.Home'),
        }}
      />
      <Tab.Screen
        name={Routes.Settings}
        component={Settings}
        options={{
          tabBarLabel: t('navigation.privateFlow.Settings'),
        }}
      />
    </Tab.Navigator>
  );
};

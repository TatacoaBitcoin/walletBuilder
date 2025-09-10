import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import Icon from '@react-native-vector-icons/material-design-icons';

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
          tabBarIcon: ({ color, size }) => (
            <Icon name="wallet-bifold" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.Settings}
        component={Settings}
        options={{
          tabBarLabel: t('navigation.privateFlow.Settings'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

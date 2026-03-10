import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import Icon from '@react-native-vector-icons/material-design-icons';

import { Routes } from './types';
import { Home, Settings } from '../screens';

const Tab = createBottomTabNavigator();

const WalletIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="wallet-bifold" color={color} size={size} />
);

const CogIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="cog" color={color} size={size} />
);

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
          tabBarIcon: WalletIcon,
        }}
      />
      <Tab.Screen
        name={Routes.Settings}
        component={Settings}
        options={{
          tabBarLabel: t('navigation.privateFlow.Settings'),
          tabBarIcon: CogIcon,
        }}
      />
    </Tab.Navigator>
  );
};

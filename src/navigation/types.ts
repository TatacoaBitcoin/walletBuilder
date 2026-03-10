import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum Routes {
  // Public
  Welcome = 'Welcome',
  Login = 'Login',
  // Tabs
  Home = 'Home',
  Settings = 'Settings',
  // Private
  Main = 'Main',
  Scanner = 'Scanner',
  // Settings
  Language = 'Language',
  Currency = 'Currency',
}

export type StackFlowParamList = {
  // Public
  Welcome: undefined;
  Login: undefined;
  // Private
  Main: undefined;
  Language: undefined;
  Currency: undefined;
  Scanner: undefined;
};

export type PublicFlowScreenProps<T extends keyof StackFlowParamList> =
  NativeStackScreenProps<StackFlowParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackFlowParamList {}
  }
}

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
  // Settings
  Language = 'Language',
}

export type PrivateFlowParamList = {
  Main: undefined;
  Language: undefined;
};

export type PublicFlowParamList = {
  Welcome: undefined;
  Login: undefined;
};

export type PrivateFlowScreenProps<T extends keyof PrivateFlowParamList> =
  NativeStackScreenProps<PrivateFlowParamList, T>;

export type PublicFlowScreenProps<T extends keyof PublicFlowParamList> =
  NativeStackScreenProps<PublicFlowParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends PrivateFlowParamList {}
    interface RootParamList extends PublicFlowParamList {}
  }
}

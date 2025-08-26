import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum Routes {
  // Public
  Welcome = 'Welcome',
  Login = 'Login',
  // Private
  Main = 'Main',
  Home = 'Home',
  Settings = 'Settings',
  // Tabs
}

export type PrivateFlowParamList = {
  Main: undefined;
};

export type PublicFlowParamList = {
  Welcome: undefined;
  Login: undefined;
};

export type MainFlowScreenProps<T extends keyof PrivateFlowParamList> =
  NativeStackScreenProps<PrivateFlowParamList, T>;

export type PublicFlowScreenProps<T extends keyof PublicFlowParamList> =
  NativeStackScreenProps<PublicFlowParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends PrivateFlowParamList {}
    interface RootParamList extends PublicFlowParamList {}
  }
}

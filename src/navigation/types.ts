import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum Routes {
  Welcome = 'Welcome',
  Login = 'Login',
}

export type MainFlowParamList = {};

export type PublicFlowParamList = {
  Welcome: undefined;
  Login: undefined;
};

export type MainFlowScreenProps<T extends keyof MainFlowParamList> =
  NativeStackScreenProps<MainFlowParamList, T>;

export type PublicFlowScreenProps<T extends keyof PublicFlowParamList> =
  NativeStackScreenProps<PublicFlowParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainFlowParamList {}
    interface RootParamList extends PublicFlowParamList {}
  }
}

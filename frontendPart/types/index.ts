import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  login: undefined;
  register: undefined;
};

export type PropsLogin = NativeStackScreenProps<AuthStackParamList, "login">;
export type PropsRegister = NativeStackScreenProps<
  AuthStackParamList,
  "register"
>;

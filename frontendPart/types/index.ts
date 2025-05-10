import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReactNode } from "react";

export type AuthStackParamList = {
  login: undefined;
  register: undefined;
};
export type PropsChildren = {
    children: ReactNode;
  };

export type PropsLogin = NativeStackScreenProps<AuthStackParamList, "login">;
export type PropsRegister = NativeStackScreenProps<
  AuthStackParamList,
  "register"
>;
export type FormRegister = {
  name: string;
  email: string;
  password: string;
};

export type InputProps = {
  styles: any;
  name: string;
  control: any;
  placeholder?: string;
};

export type LoginProps = {
  email: string;
  password: string;
};


import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import React from "react";

import NavigationTab from "@/pages/NavigationTab";
import { useThemeContext } from "../Context";
import { COLORS } from "@/constants";
import AuthNavigation from "@/pages/AuthNavigation";
import AuthContext, { useAuthContext } from "../Context/AuthContext";
import { useLogin } from "@/server/useLogin";
import Spinner from "react-native-loading-spinner-overlay";
export default function RootNavigator() {
  const { theme } = useThemeContext();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme ? COLORS.appBackground : COLORS.appBackgroundSecond,
    },
  };

  const { user, initialLoading } = useAuthContext();
  if (initialLoading) {
    return (
      <Spinner
        visible={initialLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
    );
  }

  return (
    <NavigationContainer theme={MyTheme}>
      {user ? <NavigationTab /> : <AuthNavigation />}
    </NavigationContainer>
  );
}

import { View, Text } from "react-native";
import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import NavigationTab from "@/pages/NavigationTab";
import { useThemeContext } from "../Context";
import { COLORS } from "@/constants";
import AuthNavigation from "@/pages/AuthNavigation";

export default function RootNavigator() {
  const { theme } = useThemeContext();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme ? COLORS.appBackground : COLORS.appBackgroundSecond,
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      {/* <NavigationTab /> */}
      <AuthNavigation />
    </NavigationContainer>
  );
}

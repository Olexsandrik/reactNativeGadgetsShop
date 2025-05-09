import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import UserInfo from "../UserInfo";
import ChangeTheme from "../ChangeTheme";
import LogOut from "../LogOut";
import { COLORS } from "@/constants";
const Drawer = createDrawerNavigator();
export default function Settings() {
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          drawerActiveBackgroundColor: COLORS.appBackground,
          drawerActiveTintColor: COLORS.primary900,
          drawerInactiveTintColor: COLORS.primary300,
          headerStyle: {
            backgroundColor: COLORS.appBackground,
          },
          headerTintColor: COLORS.primary900,
          drawerStyle: {
            backgroundColor: COLORS.appBackground,
          },
        }}
      >
        <Drawer.Screen name="User Info" component={UserInfo} />
        <Drawer.Screen name="Theme" component={ChangeTheme} />
        <Drawer.Screen name="LogOut" component={LogOut} />
      </Drawer.Navigator>
    </>
  );
}

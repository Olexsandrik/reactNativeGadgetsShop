import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import UserInfo from "../UserInfo";
import ChangeTheme from "../ChangeTheme";
import { COLORS } from "@/constants";
import { useAuthContext } from "../Context/AuthContext";
import { useOrderItemContext } from "../Context/OrderContextProvider";
const Drawer = createDrawerNavigator();
export default function Settings() {
  const { logout } = useAuthContext();

  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem
                label="LogOut"
                onPress={logout}
                labelStyle={{ color: COLORS.primary300 }}
              />
            </DrawerContentScrollView>
          );
        }}
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
      </Drawer.Navigator>
    </>
  );
}

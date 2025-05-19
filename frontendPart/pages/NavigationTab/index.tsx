import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React from "react";

import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "@/constants";
import Orders from "@/components/Orders";
import Settings from "@/components/Settings";
import ScreenProductNavigation from "../ScreenProductNavigation";
import SearchProductNavigation from "../SearchProductNavigation";
import Location from "@/components/LocationMap";
import LocationMap from "@/components/LocationMap";
const Tab = createBottomTabNavigator();
export default function NavigationTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: COLORS.appBackground },
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTitleAlign: "center",
        headerTintColor: COLORS.primary900,
        tabBarActiveTintColor: COLORS.primary900,
      }}
    >
      <Tab.Screen
        name="assortment"
        component={ScreenProductNavigation}
        options={{
          tabBarLabel: "assortment",
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="list" color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchProductNavigation}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="search" color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="orders"
        component={Orders}
        options={{
          tabBarLabel: "Orders",
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesome name="shopping-cart" color={color} size={size} />
            );
          },
        }}
      />
      <Tab.Screen
        name="location"
        component={LocationMap}
        options={{
          headerShown: false,
          tabBarLabel: "Location",
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="map" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="cog" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListOfGoods from "@/components/ListOfGoods";
import Cart from "@/components/Card";
import { PropsNavigationProductsSearch } from "@/types";
import Search from "@/components/Search";

const Stack = createNativeStackNavigator<PropsNavigationProductsSearch>();
export default function SearchProductNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SearchProducts" component={Search} />

      <Stack.Screen name="ScreenProduct" component={Cart} />
    </Stack.Navigator>
  );
}

import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListOfGoods from "@/components/ListOfGoods";
import Cart from "@/components/Card";

const Stack = createNativeStackNavigator<any>();
export default function ScreenProductNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ScreenProducts" component={ListOfGoods} />
      <Stack.Screen name="ScreenProduct" component={Cart} />
    </Stack.Navigator>
  );
}

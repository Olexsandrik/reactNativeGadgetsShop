import { View, Text } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "@/components/Login";
import Register from "@/components/Register";
import { AuthStackParamList } from "@/types";

const Stack = createNativeStackNavigator<AuthStackParamList>();
export default function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
    </Stack.Navigator>
  );
}

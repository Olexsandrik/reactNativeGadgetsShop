import { View, Text } from "react-native";
import React from "react";

export default function Product({ navigation, route }: any) {
  const { item } = route.params;
  return (
    <View>
      <Text>{item.name} cool</Text>
    </View>
  );
}

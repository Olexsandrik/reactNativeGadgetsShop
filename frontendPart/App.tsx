import { View, Text, StyleSheet } from "react-native";
import React from "react";
import NavigationTab from "./pages/NavigationTab";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <>
      <NavigationTab />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

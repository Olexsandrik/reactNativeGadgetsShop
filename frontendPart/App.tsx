import { View, Text, StyleSheet } from "react-native";
import React from "react";

import ThemeProvider from "./components/Context";

import RootNavigator from "./components/RootNavigator";
import AuthNavigation from "./pages/AuthNavigation";
export default function App() {
  return (
    <>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
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

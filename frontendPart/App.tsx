import { View, Text, StyleSheet } from "react-native";
import React from "react";

import ThemeProvider from "./components/Context";

import RootNavigator from "./components/RootNavigator";
import AuthNavigation from "./pages/AuthNavigation";
import AuthContext from "./components/Context/AuthContext";
export default function App() {
  return (
    <AuthContext>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </AuthContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

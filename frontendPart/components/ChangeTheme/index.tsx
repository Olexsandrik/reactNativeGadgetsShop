import { View, Text, SafeAreaView, Switch, StyleSheet } from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/constants";
import { useThemeContext } from "../Context";

export default function ChangeTheme() {
  const { theme, setTheme } = useThemeContext();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerSwitcher}>
        <Text
          style={{
            color: theme ? COLORS.primary300 : "#fffff",
          }}
        >
          Light
        </Text>
        <Switch
          onValueChange={() => setTheme(!theme)}
          value={theme}
          style={[
            styles.switcher,
            { transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] },
          ]}
        />

        <Text
          style={{
            color: theme ? COLORS.primary300 : "#fffff",
          }}
        >
          Dark
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  containerSwitcher: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  switcher: {
    marginLeft: 20,
    marginRight: 20,
  },
});

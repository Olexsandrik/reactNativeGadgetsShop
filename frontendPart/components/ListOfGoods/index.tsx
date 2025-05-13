import { View, StatusBar, Image } from "react-native";
import { useState } from "react";
import { StyleSheet } from "react-native";

import Spinner from "react-native-loading-spinner-overlay";
import { useAllProduct } from "@/server/useAllProduct";

import Cards from "../Cards";

export default function ListOfGoods() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const { allProducts, fetchProducts, productLoading, setAllProducts } =
    useAllProduct("server/products");

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/logo/logo.png")}
        />
      </View>

      <Cards
        activeSource="all"
        allProducts={allProducts}
        theme={isDarkMode}
        productLoading={productLoading}
        fetchProducts={fetchProducts}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  lightContainer: {
    backgroundColor: "#f5f5f7",
  },
  headerWrapper: {
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  darkHeaderWrapper: {
    backgroundColor: "#1a1a1a",
    borderBottomColor: "#333",
  },
  lightHeaderWrapper: {
    backgroundColor: "#ffffff",
    borderBottomColor: "#e5e7eb",
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 80,
    borderRadius: 10,
  },
  logoText: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
});

import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { HeaderProps } from "@/types";
import { useForm } from "react-hook-form";
import Input from "../Input";

export default function Header({
  theme,
  minMaxPrice,
  control,
  nameInput,
}: any) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/logo/logo.png")}
        />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Image
            source={require("../../assets/images/search.png")}
            style={styles.icon}
            resizeMode="contain"
          />
          <Input
            control={control}
            placeholder="Search products..."
            name={nameInput}
            styles={styles.input}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.filterButton} onPress={minMaxPrice}>
        <Text style={styles.filterText}>Filter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
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
  darkText: {
    color: "#ffffff",
  },
  lightText: {
    color: "#333333",
  },
  searchContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 44,
  },
  darkInputContainer: {
    backgroundColor: "#2a2a2a",
  },
  lightInputContainer: {
    backgroundColor: "#f2f2f7",
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  darkIcon: {
    tintColor: "#ab8bff",
  },
  lightIcon: {
    tintColor: "#7c4dff",
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: "100%",
    padding: 0,
  },
  darkInput: {
    color: "#ffffff",
  },
  lightInput: {
    color: "#333333",
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#7c4dff",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  darkFilterText: {
    color: "#ffffff",
  },
  lightFilterText: {
    color: "#ffffff",
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
});

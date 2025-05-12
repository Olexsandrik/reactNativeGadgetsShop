import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";

export default function Header({ styles, theme, minMaxPrice }: any) {
  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/logo/logo.png")}
          />
        </View>

        <View style={styles.searchContainer}>
          <View
            style={[
              styles.inputContainer,
              theme ? styles.darkInputContainer : styles.lightInputContainer,
            ]}
          >
            <Image
              source={require("../../assets/images/search.png")}
              style={[styles.icon, theme ? styles.darkIcon : styles.lightIcon]}
              resizeMode="contain"
            />
            <TextInput
              placeholder="Search products..."
              placeholderTextColor={theme ? "#a8b5db" : "#6b7280"}
              style={[
                styles.input,
                theme ? styles.darkInput : styles.lightInput,
              ]}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={minMaxPrice}>
          <Text
            style={[
              styles.filterText,
              theme ? styles.darkFilterText : styles.lightFilterText,
            ]}
          >
            Filter
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

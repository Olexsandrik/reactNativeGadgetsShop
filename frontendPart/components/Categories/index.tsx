import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function Categories({
  hanldeAllProducts,
  handleSmartPhone,
  handleSmartLaptops,
  handleSmartAccessories,
}: any) {
  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-around",
      }}
    >
      <TouchableOpacity style={styles.btnStyle} onPress={hanldeAllProducts}>
        <Text style={styles.btnText}>All</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnStyle} onPress={handleSmartPhone}>
        <Text style={styles.btnText}>Smartphones</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnStyle} onPress={handleSmartLaptops}>
        <Text style={styles.btnText}>Laptops</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnStyle}
        onPress={handleSmartAccessories}
      >
        <Text style={styles.btnText}>Accessories</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

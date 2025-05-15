import {
  View,
  Text,
  Pressable,
  Image,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ProductCartProps, Products, ProductsProps } from "@/types";

export default function ProductsCarts({ item, theme }: ProductCartProps) {
  const navigation = useNavigation<ProductsProps>();
  const { width } = useWindowDimensions();
  const handlerProduct = (item: Products) => {
    navigation.navigate("ScreenProduct", { item });
  };
  return (
    <Pressable onPress={() => handlerProduct(item)}>
      <View
        style={[
          styles.itemContainer,
          { width: (width - 36) / 2 },
          theme ? styles.darkItemContainer : styles.lightItemContainer,
        ]}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <Text
            style={[styles.name, theme ? styles.darkText : styles.lightText]}
          >
            {item.name}
          </Text>
          <Text
            style={[styles.price, theme ? styles.darkPrice : styles.lightPrice]}
          >
            ${item.price}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  darkText: {
    color: "#ffffff",
  },
  lightText: {
    color: "#333333",
  },
  darkItemContainer: {
    backgroundColor: "#1e1e1e",
  },
  lightItemContainer: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  darkInput: {
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

  itemContainer: {
    marginBottom: 16,
    marginLeft: 5,
    borderRadius: 12,
    overflow: "hidden",
  },

  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
  },
  darkPrice: {
    color: "#ab8bff",
  },
  lightPrice: {
    color: "#7c4dff",
  },
});

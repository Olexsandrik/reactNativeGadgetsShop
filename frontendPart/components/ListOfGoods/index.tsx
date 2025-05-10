import { View, Text, Image, FlatList, Pressable } from "react-native";
import React from "react";

import { StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";
const products = [
  {
    id: 5,
    name: "iPhone 14 Pro",
    description: "Apple iPhone 14 Pro з камерою 48MP і A16 Bionic чипом",
    price: 1199,
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-1-202209?wid=512&hei=512&fmt=jpeg&qlt=90&.v=1660753619946",
    categoryId: 1,
    createdAt: "2025-05-10T15:59:24.403Z",
    updatedAt: null,
  },
  {
    id: 6,
    name: "Samsung Galaxy S23",
    description: 'Флагман від Samsung з дисплеєм Dynamic AMOLED 6.1"',
    price: 999.99,
    imageUrl:
      "https://images.samsung.com/is/image/samsung/p6pim/ua/2302/gallery/ua-galaxy-s23-s911-sm-s911bzadeua-534379361?$650_519_PNG$",
    categoryId: 1,
    createdAt: "2025-05-10T15:59:24.403Z",
    updatedAt: null,
  },
  {
    id: 7,
    name: "MacBook Air M2",
    description: 'Легкий ноутбук з чипом Apple M2, 13.6" Retina Display',
    price: 1299,
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-m2-select-202206?wid=512&hei=512&fmt=jpeg&qlt=95&.v=1653493200207",
    categoryId: 2,
    createdAt: "2025-05-10T15:59:24.403Z",
    updatedAt: null,
  },
  {
    id: 8,
    name: "Dell XPS 13",
    description:
      "13-дюймовий ультрабук з Intel Core i7 та дисплеєм InfinityEdge",
    price: 1199,
    imageUrl:
      "https://i.dell.com/sites/csimages/Master_Imagery/all/xps-13-9310-laptop.png",
    categoryId: 2,
    createdAt: "2025-05-10T15:59:24.403Z",
    updatedAt: null,
  },
  {
    id: 9,
    name: "Apple MagSafe Charger",
    description: "Магнітна бездротова зарядка для iPhone",
    price: 39,
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=512&hei=512&fmt=jpeg&qlt=90&.v=1601688658000",
    categoryId: 3,
    createdAt: "2025-05-10T15:59:24.403Z",
    updatedAt: null,
  },
  {
    id: 10,
    name: "Logitech MX Master 3",
    description: "Професійна бездротова миша з ергономічним дизайном",
    price: 99,
    imageUrl:
      "https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3/gallery/mx-master-3-top-view.png?v=1",
    categoryId: 3,
    createdAt: "2025-05-10T15:59:24.403Z",
    updatedAt: null,
  },
];

export default function ListOfGoods({ navigation }: any) {
  const { width, height } = useWindowDimensions();

  const handlerProduct = (item: any) => {
    navigation.navigate("ScreenProduct", { item });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlerProduct(item)}>
            <View style={[styles.itemContainer, { width: (width - 36) / 2 }]}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            </View>
          </Pressable>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#a970ff",
    textAlign: "center",
  },
  list: {
    padding: 16,
    alignItems: "center",
  },
  itemContainer: {
    marginBottom: 16,
    marginLeft: 7,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#1e1e1e",
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
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: "#999999",
  },
});

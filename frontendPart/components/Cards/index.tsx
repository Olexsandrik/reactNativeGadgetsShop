import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import ProductsCarts from "../ProductsCards";
import { CardsType } from "@/types";

export default function Cards({
  catalog,
  allProducts,
  theme,
  productLoading,
  fetchProducts,
}: CardsType) {
  return (
    <FlatList
      data={catalog?.products || allProducts}
      keyExtractor={(item, index) => `${item}-${index}`}
      numColumns={2}
      renderItem={({ item }) => <ProductsCarts item={item} theme={theme} />}
      contentContainerStyle={styles.list}
      onEndReached={fetchProducts}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        productLoading ? (
          <View style={{ padding: 20 }}>
            <ActivityIndicator size="large" />
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
    alignItems: "center",
  },
});

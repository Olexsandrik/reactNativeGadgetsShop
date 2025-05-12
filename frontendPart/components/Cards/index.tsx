import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import ProductsCarts from "../ProductsCards";

export default function Cards({
  catalog,
  allProducts,
  theme,
  productLoading,
  styles,
  fetchProducts,
}: any) {
  return (
    <FlatList
      data={catalog?.products || allProducts}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({ item }) => <ProductsCarts item={item} theme={theme} styles={styles} />}
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

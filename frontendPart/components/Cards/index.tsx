import { CardsType } from "@/types";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

import ProductsCarts from "../ProductsCards";
import { COLORS } from "@/constants";

export default function Cards({
  catalog,
  allProducts,
  theme,
  productLoading,
  fetchProducts,
  activeSource,
}: CardsType) {
  let data = null;

  if (activeSource === "all") {
    data = allProducts;
  }
  if (activeSource === "catalog") {
    data = catalog?.products;
  }

  if (!data || productLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#888" />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => `${item.id}-${index}`}
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    minHeight: "100%",
    backgroundColor: COLORS.appBackground,
  },
});

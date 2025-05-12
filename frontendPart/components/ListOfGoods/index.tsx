import { View, StatusBar } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { useCatalog } from "@/server/useCatalog";
import Spinner from "react-native-loading-spinner-overlay";
import { useAllProduct } from "@/server/useAllProduct";

import Header from "../Header";
import Categories from "../Categories";
import Cards from "../Cards";

export default function ListOfGoods() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const { catalog, loading, handleGetCategories, setCatalog } = useCatalog(
    `server/getAllCategories`
  );
  const { allProducts, fetchProducts, productLoading, setAllProducts } =
    useAllProduct("server/products");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>("desc");
  const [activeSource, setActiveSource] = useState<"all" | "catalog">("all");

  const handleSmartPhone = async () => {
    setCatalog(null);
    setActiveSource("catalog");
    await handleGetCategories(1);
  };
  const handleSmartLaptops = async () => {
    setCatalog(null);
    setActiveSource("catalog");
    await handleGetCategories(2);
  };
  const handleSmartAccessories = async () => {
    setCatalog(null);
    setActiveSource("catalog");
    await handleGetCategories(3);
  };
  const hanldeAllProducts = async () => {
    setCatalog(null);
    setActiveSource("all");
    await fetchProducts();
  };

  const minMaxPrice = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);

    if (activeSource === "all") {
      setAllProducts((prev) => {
        return [...prev].sort((a, b) => {
          return newOrder === "asc" ? a.price - b.price : b.price - a.price;
        });
      });
    }
    if (activeSource === "catalog") {
      setCatalog((prev: any) => {
        const sorted = [...(prev.products || [])].sort((a, b) => {
          return newOrder === "asc" ? a.price - b.price : b.price - a.price;
        });

        return {
          ...prev,
          products: sorted,
        };
      });
    }
  };

  useEffect(() => {
    setCatalog(null);

    fetchProducts();
  }, []);

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <View
        style={[
          styles.headerWrapper,
          isDarkMode ? styles.darkHeaderWrapper : styles.lightHeaderWrapper,
        ]}
      >
        <Header theme={isDarkMode} minMaxPrice={minMaxPrice} />

        <Categories
          hanldeAllProducts={hanldeAllProducts}
          handleSmartPhone={handleSmartPhone}
          handleSmartLaptops={handleSmartLaptops}
          handleSmartAccessories={handleSmartAccessories}
        />
      </View>

      {loading ? (
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      ) : (
        <Cards
          catalog={catalog}
          allProducts={allProducts}
          theme={isDarkMode}
          productLoading={productLoading}
          fetchProducts={fetchProducts}
        />
      )}
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
});

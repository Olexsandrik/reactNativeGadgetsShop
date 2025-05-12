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
        <Header styles={styles} theme={isDarkMode} minMaxPrice={minMaxPrice} />

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
